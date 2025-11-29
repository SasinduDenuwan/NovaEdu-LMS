// FeaturesSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Why Choose EduLearn?</h2>
          <p className="text-gray-600 text-lg bg-white/50 backdrop-blur-sm inline-block px-6 py-3 rounded-2xl shadow-lg">
            Experience learning like never before with our cutting-edge platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '👨‍🏫',
              title: 'Expert Instructors',
              description: 'Learn from industry professionals with real-world experience and proven track records'
            },
            {
              icon: '⚡',
              title: 'Lifetime Access',
              description: 'Get lifetime access to all course materials, updates, and future content additions'
            },
            {
              icon: '🏆',
              title: 'Certification',
              description: 'Receive industry-recognized certificates upon course completion to boost your career'
            },
            {
              icon: '📱',
              title: 'Mobile Learning',
              description: 'Access your courses anywhere, anytime with our mobile-optimized platform'
            },
            {
              icon: '🔄',
              title: 'Flexible Schedule',
              description: 'Learn at your own pace with self-paced courses and flexible deadlines'
            },
            {
              icon: '💼',
              title: 'Career Support',
              description: 'Get career guidance, resume reviews, and job placement assistance'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -5
              }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 border border-white/20 group"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-5xl mb-6 inline-block group-hover:shadow-lg rounded-2xl p-4 bg-gradient-to-br from-teal-50 to-blue-50"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-teal-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;