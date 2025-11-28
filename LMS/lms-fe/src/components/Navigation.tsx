// components/Navigation.tsx
import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="bg-white/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
              LearnHub
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {['Courses', 'Instructors', 'About'].map((item) => (
              <a
                key={item}
                href="#"
                className="relative text-gray-700 font-medium hover:text-teal-600 transition duration-200"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 hover:w-full" />
              </a>
            ))}

            <div className="flex items-center space-x-4">
              <button className="p-2.5 hover:bg-gray-100 rounded-full transition">
                <ShoppingCart size={22} className="text-gray-700" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 rounded-full transition">
                <User size={22} className="text-gray-700" />
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                Sign Up
              </motion.button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-t"
      >
        <div className="px-6 py-6 space-y-5">
          {['Courses', 'Instructors', 'About'].map((item) => (
            <a key={item} href="#" className="block text-lg font-medium text-gray-700 hover:text-teal-600">
              {item}
            </a>
          ))}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg"
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;