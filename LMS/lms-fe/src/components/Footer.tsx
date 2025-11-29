// Footer.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800/95 backdrop-blur-lg text-white py-12 relative z-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-4"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-linear-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">EL</span>
              </motion.div>
              <span className="text-2xl font-bold">EduLearn</span>
            </motion.div>
            <p className="text-gray-400 leading-relaxed">
              Empowering learners worldwide with quality education and expert-led courses. 
              Transform your career with our innovative learning platform.
            </p>
            <div className="flex space-x-4 mt-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-teal-500 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-lg">{social[0].toUpperCase()}</span>
                </motion.a>
              ))}
            </div>
          </div>
          
          {['Company', 'Categories', 'Support', 'Legal'].map((section) => (
            <div key={section}>
              <h3 className="font-semibold text-lg mb-4 text-white">{section}</h3>
              <ul className="space-y-3">
                {['About', 'Careers', 'Contact'].map((item) => (
                  <motion.li 
                    key={item}
                    whileHover={{ x: 5, color: '#14B8A6' }}
                    className="text-gray-400 hover:text-teal-400 cursor-pointer transition-all duration-300"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="border-t border-gray-700/50 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2024 EduLearn. All rights reserved. Transforming education through innovation.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;