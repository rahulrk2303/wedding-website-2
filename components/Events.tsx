import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import engagementImg from '../assets/engagement1.png';
import haldiImg from '../assets/haldi1.png';
import sangeetImg from '../assets/sangeet1.png';
import weddingImg from '../assets/wedding1.png';
import receptionChennaiImg from '../assets/reception_chennai.png';
import receptionMannargudiImg from '../assets/reception_mannargudi.png';
import oonjalImg from '../assets/oonjal.png';
import pooramImg from '../assets/pooram.png';

interface EventItem {
  title: string;
  time: string;
  desc: string;
  img: string;
  venue: string;
  date?: string;
  featured?: boolean;
}

interface EventSection {
  category: string;
  date?: string;
  items: EventItem[];
}

// 2. Updated data with venue details based on your previous messages
const events: EventSection[] = [
  {
    category: "Pre-Wedding",
    date: "April 02, 2026", // Note: Updated year to 2026 to match your other files
    items: [
      {
        title: "Engagement",
        time: "11:00 AM",
        desc: "The official ring exchange ceremony marking the beginning of our festivities.",
        img: engagementImg,
        venue: "MGM Beach Resort (PH1 Lawn)"
      },
      {
        title: "Haldi",
        time: "2:00 PM",
        desc: "A colorful afternoon filled with turmeric, laughter, and joy.",
        img: haldiImg,
        venue: "MGM Beach Resort (PH1 Lawn)"
      },
      {
        title: "Sangeet",
        time: "6:30 PM",
        desc: "An evening of music and dance. Get your dancing shoes ready!",
        img: sangeetImg,
        venue: "MGM Beach Resort (Lighthouse Lawn)"
      },
      {
        title: "Pooram",
        time: "9:30 PM",
        desc: "A traditional celebration for the bride by family members.",
        img: pooramImg,
        venue: "MGM Beach Resort (Lighthouse Lawn)"
      }
    ]
  },
  {
    category: "The Wedding",
    date: "April 03, 2026",
    items: [
      {
        title: "Muhurtham",
        time: "8:45 AM",
        desc: "The sacred moment where we tie the knot surrounded by blessings.",
        img: weddingImg,
        featured: true,
        venue: "MGM Beach Resort (Waterfront Lawn)"
      },
      {
        title: "Oonjal",
        time: "12:30 PM",
        desc: "A traditional ritual symbolizing balance and harmony in our married life.",
        img: oonjalImg,
        featured: true,
        venue: "MGM Beach Resort (Waterfront Lawn)"
      }
    ]
  },
  {
    category: "Receptions",
    items: [
      {
        title: "Chennai Reception",
        date: "April 04, 2026",
        time: "7:00 PM",
        desc: "Join us for a grand dinner reception in Chennai.",
        img: receptionChennaiImg,
        venue: "M Weddings & Conventions, Vanagaram (The Grand Ballroom)"
      },
      {
        title: "Mannargudi Reception",
        date: "April 07, 2026",
        time: "7:00 PM",
        desc: "Celebrating with our extended family in our hometown.",
        img: receptionMannargudiImg,
        venue: "PP Mahall, Mannargudi"
      }
    ]
  }
];

const Events: React.FC = () => {
  return (
    <section id="events" className="py-20 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-sans text-gold-600 tracking-widest uppercase text-sm mb-2">Celebration</p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-800">Event Details</h2>
        </div>

        <div className="space-y-16">
          {events.map((section, idx) => (
            <div key={idx} className="relative">
               <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-8 pl-4 border-l-4 border-gold-400"
               >
                 <h3 className="font-serif text-3xl text-stone-800">{section.category}</h3>
                 {section.date && <p className="font-sans text-stone-500 font-medium">{section.date}</p>}
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {section.items.map((item, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className={`bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col ${item.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
                   >
                     <div className={`relative overflow-hidden ${item.featured ? 'h-100 md:h-120' : 'h-80'}`}>
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1">
                           <Clock className="w-3 h-3" />
                           {item.time}
                        </div>
                     </div>
                     
                     <div className="p-6 flex flex-col flex-grow">
                        {/* Date and Venue Row */}
                        <div className="mb-3 space-y-1">
                            {item.date && (
                              <div className="flex items-center gap-2 text-gold-600 text-sm font-medium">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span>{item.date}</span>
                              </div>
                            )}
                            
                            {/* --- VENUE ADDED HERE --- */}
                            <div className="flex items-center gap-2 text-stone-500 text-sm">
                                <MapPin className="w-4 h-4 flex-shrink-0 text-gold-500" />
                                <span>{item.venue}</span>
                            </div>
                        </div>

                        <h4 className="font-serif text-2xl text-stone-800 mb-2">{item.title}</h4>
                        <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;