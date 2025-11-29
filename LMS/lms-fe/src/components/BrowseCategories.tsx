// BrowseCategories.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
}

interface BrowseCategoriesProps {
  categories: Category[];
  courses: Course[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  addToCart: (course: Course) => void;
}

const BrowseCategories: React.FC<BrowseCategoriesProps> = ({
  categories,
  courses,
  activeTab,
  setActiveTab,
  addToCart
}) => {
  const filteredCourses = activeTab === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  const getInstructorInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Browse Categories</h2>
          <p className="text-gray-600 text-lg bg-white/50 backdrop-blur-sm inline-block px-6 py-3 rounded-2xl shadow-lg">
            Find the perfect course for your learning journey
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ 
                scale: 1.05,
                background: activeTab === category.id 
                  ? 'linear-gradient(135deg, #14B8A6, #3B82F6)'
                  : 'linear-gradient(135deg, #F3F4F6, #E5E7EB)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(category.id)}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
                activeTab === category.id
                  ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-2xl border-transparent'
                  : 'bg-white/70 text-gray-600 hover:bg-white/90 border-white/20 shadow-lg hover:shadow-xl'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Course Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 relative group"
              >
                {/* Premium badge */}
                {course.price > 90 && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      PREMIUM
                    </span>
                  </div>
                )}

                <div className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-teal-600 px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
                    ${course.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm border ${
                      course.level === 'Beginner' 
                        ? 'bg-teal-50/80 text-teal-600 border-teal-200'
                        : course.level === 'Intermediate'
                        ? 'bg-blue-50/80 text-blue-600 border-blue-200'
                        : 'bg-indigo-50/80 text-indigo-600 border-indigo-200'
                    }`}>
                      {course.level}
                    </span>
                    <div className="flex items-center space-x-1 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-lg">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="text-gray-700 font-bold">{course.rating}</span>
                      <span className="text-gray-500">({course.students})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {getInstructorInitials(course.instructor)}
                      </div>
                      <div>
                        <span className="text-gray-700 font-semibold block">{course.instructor}</span>
                        <span className="text-gray-500 text-sm">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(course)}
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Add to Cart</span>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default BrowseCategories;