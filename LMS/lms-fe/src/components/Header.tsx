// Header.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  cartLength: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartLength, onOpenCart }) => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/20"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <motion.div 
              className="w-8 h-8 bg-linear-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">NE</span>
            </motion.div>
            <span className="text-2xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
              NovaEdu
            </span>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {['Home', 'Courses', 'Instructors', 'About', 'Contact'].map((item) => (
              <motion.a
                key={item}
                whileHover={{ 
                  color: '#14B8A6',
                  y: -2
                }}
                className="text-gray-600 hover:text-teal-500 font-medium cursor-pointer transition-all duration-300 relative"
              >
                {item}
                <motion.span
                  whileHover={{ width: '100%' }}
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300"
                />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative p-3 text-gray-600 hover:text-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartLength > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                >
                  {cartLength}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px -5px rgba(20, 184, 166, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign In</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;