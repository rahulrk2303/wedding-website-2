import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type OptimizedImage = {
  id: string;
  fallback: string;
  jpgSrcSet: string;
  sizes: string;
};

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<OptimizedImage[]>([]);

  // Load optimized manifest from public/optimized-gallery/manifest.json
  useEffect(() => {
    let mounted = true;
    fetch('/optimized-gallery/manifest.json')
      .then((r) => r.ok ? r.json() : Promise.reject('no manifest'))
      .then((data: OptimizedImage[]) => {
        if (mounted && Array.isArray(data)) {
          // Shuffle images to randomize gallery order on each load
          const shuffle = <T,>(arr: T[]) => {
            const a = arr.slice();
            for (let i = a.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
          };
          setImages(shuffle(data));
          setCurrentIndex(0);
        }
      })
      .catch(() => {
        // If manifest missing, keep images empty (fallback could be implemented)
        console.warn('optimized-gallery manifest not found; run `npm run optimize-images`');
      });

    return () => { mounted = false };
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (images.length ? (prev + 1) % images.length : 0));
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length, currentIndex]);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    const { offset } = info;

    if (offset.x > swipeThreshold) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (offset.x < -swipeThreshold) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const getImageStyle = (index: number) => {
    const length = images.length;
    let d = index - currentIndex;
    while (d > length / 2) d -= length;
    while (d < -length / 2) d += length;

    if (d === 0) {
      return { x: "0%", scale: 1.1, zIndex: 20, opacity: 1, filter: "grayscale(0%)", display: "block" };
    } else if (d === -1) {
      return { x: "-85%", scale: 0.75, zIndex: 10, opacity: 0.8, filter: "grayscale(100%)", display: "block" };
    } else if (d === 1) {
      return { x: "85%", scale: 0.75, zIndex: 10, opacity: 0.8, filter: "grayscale(100%)", display: "block" };
    } else if (d === -2) {
      return { x: "-150%", scale: 0.5, zIndex: 5, opacity: 0, filter: "grayscale(100%)", display: "block" };
    } else if (d === 2) {
      return { x: "150%", scale: 0.5, zIndex: 5, opacity: 0, filter: "grayscale(100%)", display: "block" };
    } else {
      return { x: "0%", scale: 0.5, zIndex: 0, opacity: 0, filter: "grayscale(100%)", display: "none" };
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <p className="font-sans text-gold-600 tracking-widest uppercase text-sm mb-2">Moments</p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-800">Gallery</h2>
        </div>

        {/* Mobile Carousel View (Unchanged) */}
        <div className="md:hidden relative h-[450px] flex items-center justify-center w-full touch-pan-y">
          <motion.div
            className="absolute inset-0 z-30"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ cursor: 'grab' }}
          />
          <div className="relative w-full h-full flex items-center justify-center">
             {images.map((img, index) => (
                <motion.div
                  key={index}
                  className="absolute w-64 h-80 rounded-xl overflow-hidden shadow-2xl border-4 border-white"
                  initial={false}
                  animate={getImageStyle(index)}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ transformOrigin: "center" }}
                >
                  <img
                    src={img.fallback}
                    srcSet={img.jpgSrcSet}
                    sizes={img.sizes}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </motion.div>
             ))}
          </div>
          <div className="absolute bottom-4 flex gap-2 z-30">
             {images.map((_, idx) => (
               <div key={idx} className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-gold-500' : 'bg-stone-300'}`} />
             ))}
          </div>
        </div>

{/* --- DESKTOP MASONRY VIEW --- */}
        {/* Changed to 4 columns on medium screens, 6 on large screens */}
        <div className="hidden md:block columns-4 lg:columns-6 gap-4 space-y-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }} // Faster stagger
              className="break-inside-avoid mb-4 overflow-hidden rounded-lg group cursor-pointer relative"
            >
              <img
                src={img.fallback}
                srcSet={img.jpgSrcSet}
                sizes={img.sizes}
                alt={`Gallery ${index + 1}`}
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
        {/* --- DESKTOP MASONRY VIEW END --- */}

      </div>
    </section>
  );
};

export default Gallery;