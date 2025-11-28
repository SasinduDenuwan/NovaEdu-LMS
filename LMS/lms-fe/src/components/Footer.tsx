// components/Footer.tsx
import React from 'react';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-xl">
                <BookOpen className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold">LearnHub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering learners worldwide with world-class education and expert-led courses.
            </p>
          </motion.div>

          {['Company', 'Resources', 'Legal'].map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-lg mb-5">{title}</h4>
              <ul className="space-y-3 text-gray-400">
                {title === 'Company' && ['About Us', 'Careers', 'Press', 'Blog'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-teal-400 transition">{item}</a></li>
                ))}
                {title === 'Resources' && ['Help Center', 'Community', 'Contact', 'Status'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-teal-400 transition">{item}</a></li>
                ))}
                {title === 'Legal' && ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Licenses'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-teal-400 transition">{item}</a></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm"
        >
          © {new Date().getFullYear()} LearnHub. All rights reserved. Made with love.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;