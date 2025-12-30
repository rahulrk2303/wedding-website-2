import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import backgroundImg from '../assets/background1.jpeg';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-04-03T09:00:00+05:30").getTime();
    const calculate = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8 mb-4">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-white/90 tabular-nums font-light">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-amber-200/70 mt-3 font-semibold">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// ... (CountdownTimer remains the same)

const Hero: React.FC = memo(() => {
  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full overflow-hidden flex flex-col justify-between bg-stone-950">
      
      {/* Cinematic Background */}
      <motion.div 
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backgroundImg})`,
          backgroundPosition: 'center 35%' 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
      </motion.div>

      {/* 1. TOP SECTION: Names */}
      <div className="relative z-10 text-center pt-28 md:pt-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="inline-block px-1 py-1 border-y border-white/20 text-[9px] md:text-xs uppercase tracking-[0.6em] text-amber-100/80 mb-8">
            The Wedding Celebration of
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="font-serif text-5xl md:text-8xl text-white leading-tight flex flex-wrap items-center justify-center"
        >
          <span className="relative">Sruthi</span>

          <motion.span
            // 1. Entrance Animation: Scale, Rotate, and Fade
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              // 2. Continuous Floating/Glow Effect
              textShadow: [
                "0px 0px 0px rgba(251, 191, 36, 0)",
                "0px 0px 20px rgba(251, 191, 36, 0.5)",
                "0px 0px 0px rgba(251, 191, 36, 0)"
              ]
            }}
            transition={{
              // Entrance timing
              opacity: { delay: 1.2, duration: 0.8 },
              scale: { delay: 1.2, duration: 0.8, type: "spring", stiffness: 100 },
              rotate: { delay: 1.2, duration: 0.8 },
              // Shimmer/Glow loop
              textShadow: {
                delay: 2,
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="block md:inline-block text-3xl md:text-7xl mx-3 my-4 md:my-0 italic font-light bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent select-none"
          >
            &
          </motion.span>

          <span className="relative">Rahul</span>
        </motion.h1>
      </div>

      {/* 2. MIDDLE SECTION: Clear gap for faces */}
      <div className="flex-grow min-h-[120px]" />

      {/* 3. BOTTOM SECTION: Info, Timer, RSVP */}
      <div className="relative z-10 text-center pb-14 md:pb-18 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/40"></div>
            <p className="font-sans text-xl md:text-2xl font-extralight tracking-[0.4em] text-white">
              April 3, 2026
            </p>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/40"></div>
          </div>

          <CountdownTimer />

          <motion.a
            href="#rsvp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative mt-8 inline-block px-14 py-4 overflow-hidden border border-white/20 backdrop-blur-sm transition-all duration-500 hover:border-amber-200/50"
          >
            <span className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
            <span className="relative text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold text-white group-hover:text-stone-900 transition-colors duration-500">
              Kindly RSVP
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* Elegant Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30">
        <motion.div 
          animate={{ height: [20, 50, 20], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-[1px] bg-white"
        />
      </div> */}
    </section>
  );
});

export default Hero;