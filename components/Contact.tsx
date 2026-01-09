import React from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <h2 className="font-serif text-4xl text-stone-800 mb-6">Get in Touch</h2>
          <p className="text-stone-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Have any questions about the events, accommodation, or travel? 
            Please feel free to reach out to us. We are here to help make your experience comfortable and memorable.
          </p>
          
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Phone */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 group-hover:bg-gold-100 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-stone-500 font-semibold uppercase mb-1">WhatsApp</p>
                <a className="text-stone-800 font-medium" href="https://wa.me/19848109241">+1 9848109241 (Rahul)</a>
                <p></p>
                <a className="text-stone-800 font-medium" href="https://wa.me/18484829711">+1 8484829711 (Sruthi)</a>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 group-hover:bg-gold-100 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-stone-500 font-semibold uppercase mb-1">Phone</p>
                <p className="text-stone-800 font-medium">+91 9629439241 (Rahul)</p>
                <p className="text-stone-800 font-medium">+91 9597520840 (Sruthi)</p>
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 group-hover:bg-gold-100 transition-colors">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-stone-500 font-semibold uppercase mb-1">Social</p>
                 <a href="https://www.instagram.com/the.srk.story" className="text-stone-800 font-medium hover:text-gold-600 transition-colors">
                  @the.srk.story
                </a>
                <p></p>
                <a href="https://www.instagram.com/sruthi_vandhana/" className="text-stone-800 font-medium hover:text-gold-600 transition-colors">
                  @sruthi_vandhana
                </a>
                <p></p>
                <a href="https://www.instagram.com/rahul.kannan.23/" className="text-stone-800 font-medium hover:text-gold-600 transition-colors">
                  @rahul.kannan.23
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;