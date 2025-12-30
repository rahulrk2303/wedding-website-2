import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="font-serif text-2xl">Sruthi</span>
          <Heart className="w-4 h-4 text-gold-500 fill-current" />
          <span className="font-serif text-2xl">Rahul</span>
        </div>
        <p className="font-sans text-stone-400 text-sm mb-8">
          We can't wait to celebrate our special day with you!
        </p>
        <div className="w-12 h-[1px] bg-stone-700 mx-auto mb-8"></div>
        <p className="text-xs text-stone-500 font-sans tracking-wide">
          © 2026 Sruthi & Rahul. Made with love.
        </p>
      </div>
    </footer>
  );
};

export default Footer;