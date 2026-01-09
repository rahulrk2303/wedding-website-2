import React from 'react';
import { motion } from 'framer-motion';

const RSVP: React.FC = () => {
  // ---------------------------------------------------------
  // TODO: Replace this URL with your specific Google Form URL
  // Go to Google Form > Send > <> (Embed) > Copy the 'src' URL inside the iframe tag
  // ---------------------------------------------------------
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc4JqUEwpL6VA8ao-Nl3P416eVv3ORdHhaSYeJU6AtYAMT_pg/viewform?embedded=true";

  return (
    <section id="rsvp" className="py-20 bg-gold-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
           <p className="font-sans text-gold-600 tracking-widest uppercase text-sm mb-2">Join Us</p>
           <h2 className="font-serif text-4xl md:text-5xl text-stone-800">RSVP</h2>
           <p className="mt-4 text-stone-600">Please respond by March 2, 2026</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          // Removed internal padding (p-8) so the Google Form fills the white box completely
          className="bg-blue-50 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="w-full relative">
            <iframe 
              src={googleFormUrl} 
              width="100%" 
              height="900" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0}
              title="RSVP Form"
              className="w-full"
            >
              Loading…
            </iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;