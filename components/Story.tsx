import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import brideImg from '../assets/bride.jpeg';
import groomImg from '../assets/groom.jpeg';
import comicBride from '../assets/comic_bride1.png';
import comicGroom from '../assets/comic_groom1.png';

const Story: React.FC = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: animationRef,
    offset: ["start end", "center center"]
  });

  // Animation values
  // Start far apart and come to natural position (0%)
  const brideX = useTransform(scrollYProgress, [0, 0.8], ["-100vw", "0%"]);
  const groomX = useTransform(scrollYProgress, [0, 0.8], ["100vw", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const heartScale = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <section id="story" className="py-20 md:py-32 bg-stone-0 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-stone-800 mb-4"
          >
            Our Story
          </motion.h2>
          <div className="w-16 h-[2px] bg-gold-500 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-0 mb-20">
          {/* Bride Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-center text-center px-4 md:border-r border-stone-200"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 mb-8 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
               <img
                src={brideImg}
                alt="Sruthi"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-3xl text-stone-800 mb-2">Sruthi</h3>
            <p className="font-sans text-xs uppercase tracking-widest text-gold-600 mb-6">The Bride</p>
            <p className="font-sans text-stone-600 leading-relaxed max-w-sm">
              Sruthi (Ammu) is a gentle soul with a fierce heart. She brings light into every room she enters and has found her perfect counterpart in Rahul. Her journey has been one of grace, art, and finding joy in the little things.
            </p>
          </motion.div>

          {/* Groom Section */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="flex-1 flex flex-col items-center text-center px-4"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 mb-8 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={groomImg}
                alt="Rahul"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-3xl text-stone-800 mb-2">Rahul</h3>
            <p className="font-sans text-xs uppercase tracking-widest text-gold-600 mb-6">The Groom</p>
            <p className="font-sans text-stone-600 leading-relaxed max-w-sm">
              Rahul is the calm to Sruthi's storm, a pillar of strength and kindness. He loves deeply and laughs freely. Meeting Sruthi was the beginning of his greatest adventure, and he can't wait to start this new chapter.
            </p>
          </motion.div>
        </div>

        {/* Animated Meeting Section */}
        <div ref={animationRef} className="relative h-48 md:h-64 flex items-center justify-center overflow-visible mb-12">
           <div className="flex items-center gap-4 md:gap-12 relative z-10">
             {/* Simple Girl */}
             <motion.div 
               style={{ x: brideX, opacity }}
               className="w-32 h-32 md:w-48 md:h-48"
             >
                <img 
                  src={comicBride} 
                  alt="Girl" 
                  // className="w-full h-full"
                />
             </motion.div>

             {/* Heart Icon appearing when they meet */}
             <motion.div style={{ scale: heartScale }} className="text-red-500">
                <Heart fill="currentColor" size={48} className="md:w-16 md:h-16" />
             </motion.div>

             {/* Simple Boy */}
             <motion.div 
               style={{ x: groomX, opacity }}
               className="w-28 h-28 md:w-40 md:h-40"
             >
                <img 
                  src={comicGroom} 
                  alt="Boy" 
                  // className="w-full h-full"
                />
             </motion.div>
           </div>
           
           {/* Decorative track line */}
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-200 -z-0"></div>
        </div>
        <div className="w-16 h-[2px] bg-gold-500 mx-auto mb-12"></div>
        
        {/* Joint Story */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
        >
            <h4 className="font-serif text-2xl text-stone-800 mb-6 italic">"Two souls, one heart."</h4>
            <p className="text-stone-600 leading-relaxed">
                We met by chance, but stayed together by choice. From our first coffee date to countless long drives, our love story has been nothing short of magical. We are thrilled to invite you to celebrate the beginning of our forever.
            </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;