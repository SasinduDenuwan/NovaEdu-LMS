// HeroSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                🚀 Transform Your Career
              </span>
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 leading-tight mb-6">
              Learn Without
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500 block">
                Limits
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
              Discover thousands of courses from industry experts. 
              Start your learning journey today and unlock your potential with our interactive platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 40px -10px rgba(20, 184, 166, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Explore Courses</span>
                <motion.div
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-teal-500 text-teal-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-50 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <span>Watch Demo</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ▶
                  </motion.div>
                </div>
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              {[
                { number: '50K+', label: 'Students' },
                { number: '2.5K+', label: 'Courses' },
                { number: '98%', label: 'Success Rate' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="text-center bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20"
                >
                  <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10">
              <motion.img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" 
                alt="Students learning"
                className="rounded-3xl shadow-2xl border-8 border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Floating cards */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 3, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-teal-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-800">2,500+ Courses</span>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-800">Expert Instructors</span>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-20 h-20 border-4 border-teal-200/50 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-8 -left-8 w-16 h-16 border-4 border-blue-200/50 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;