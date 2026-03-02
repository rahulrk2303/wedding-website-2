import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Story', href: '#story' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Locations', href: '#locations' },
    { name: 'RSVP', href: '#rsvp' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`font-serif text-2xl tracking-widest flex items-center gap-2 ${scrolled ? 'text-stone-800' : 'text-stone-800 md:text-white'}`}>
          {/* logo from public folder */}
          <img src="/logo.png" alt="S and R logo" className="h-10 w-auto" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm uppercase tracking-wider font-sans font-medium hover:text-gold-500 transition-colors ${
                scrolled ? 'text-stone-600' : 'text-white/90'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-stone-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className={`w-6 h-6 ${scrolled ? 'text-stone-800' : 'text-stone-800 md:text-white'}`} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-stone-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-stone-600 font-serif text-lg hover:text-gold-500"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;