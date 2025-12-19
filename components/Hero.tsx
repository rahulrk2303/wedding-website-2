import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: April 03, 2026 09:00:00 IST (UTC+5:30)
    const targetDate = new Date("2026-04-03T09:00:00+05:30").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        // Date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/1920/1080?grayscale&blur=2"
          alt="Couple Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="font-sans text-sm md:text-lg uppercase tracking-[0.2em] mb-4 text-gold-200">
            We're getting married!
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 text-white leading-none"
        >
          Sruthi <br className="md:hidden" />
          <span className="text-4xl md:text-6xl align-middle mx-2 font-light text-gold-300">&</span> 
          Rahul
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="h-[1px] w-24 bg-white/50 mb-2"></div>
          <p className="font-sans text-lg md:text-xl font-light tracking-wide">
            April 03, 2026 • MGM Beach Resort
          </p>

          {/* Countdown Timer */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6 mb-2">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center min-w-[60px]">
                <span className="font-serif text-3xl md:text-4xl lg:text-5xl leading-none">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gold-200 mt-2 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#rsvp"
            className="mt-6 px-8 py-3 border border-white/80 hover:bg-white hover:text-stone-900 transition-all duration-300 uppercase text-xs tracking-widest font-semibold"
          >
            RSVP Now
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto"></div>
      </motion.div>
    </section>
  );
};

export default Hero;