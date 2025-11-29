// Index.tsx
import React, { useState, useEffect } from 'react';
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

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [cart, setCart] = useState<Course[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [currentBg, setCurrentBg] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const backgroundImages = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600',
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600'
  ];

  const categories: Category[] = [
    { id: 'all', name: 'All Courses' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
    { id: 'marketing', name: 'Marketing' }
  ];

  const courses: Course[] = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      price: 89.99,
      rating: 4.8,
      students: 1245,
      duration: '12 hours',
      level: 'Intermediate',
      category: 'development',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      description: 'Master React with hooks, context API, and advanced patterns'
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      instructor: 'Mike Chen',
      price: 79.99,
      rating: 4.9,
      students: 892,
      duration: '15 hours',
      level: 'Beginner',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      description: 'Learn professional design principles and tools'
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      instructor: 'Emma Davis',
      price: 69.99,
      rating: 4.7,
      students: 1567,
      duration: '10 hours',
      level: 'Advanced',
      category: 'marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      description: 'Complete guide to digital marketing in 2024'
    },
    {
      id: 4,
      title: 'Business Analytics',
      instructor: 'David Wilson',
      price: 94.99,
      rating: 4.6,
      students: 734,
      duration: '14 hours',
      level: 'Intermediate',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      description: 'Data-driven decision making for business growth'
    },
    {
      id: 5,
      title: 'Full Stack JavaScript',
      instructor: 'Alex Rodriguez',
      price: 99.99,
      rating: 4.8,
      students: 2034,
      duration: '20 hours',
      level: 'Advanced',
      category: 'development',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      description: 'Become a full-stack developer with modern JavaScript'
    },
    {
      id: 6,
      title: 'Advanced Figma Prototyping',
      instructor: 'Lisa Wang',
      price: 74.99,
      rating: 4.9,
      students: 567,
      duration: '8 hours',
      level: 'Intermediate',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400',
      description: 'Create interactive prototypes like a pro'
    }
  ];

  // Background image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Floating elements visibility
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredCourses = activeTab === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  const addToCart = (course: Course): void => {
    setCart(prev => [...prev, course]);
  };

  const removeFromCart = (courseId: number): void => {
    setCart(prev => prev.filter(item => item.id !== courseId));
  };

  const getTotalPrice = (): string => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const getInstructorInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
          />
        </AnimatePresence>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isVisible ? [0.3, 0.6, 0.3] : 0,
                scale: isVisible ? [1, 1.2, 1] : 0,
                x: isVisible ? [0, 100, 0] : 0,
                y: isVisible ? [0, -50, 0] : 0,
              }}
              transition={{
                duration: 8 + item * 2,
                repeat: Infinity,
                delay: item * 0.5,
                ease: "easeInOut"
              }}
              className={`absolute w-${item % 2 === 0 ? '4' : '6'} h-${item % 2 === 0 ? '4' : '6'} rounded-full bg-gradient-to-r from-teal-400 to-blue-400 opacity-30`}
              style={{
                left: `${(item * 15) % 100}%`,
                top: `${(item * 20) % 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
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
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">EL</span>
              </motion.div>
              <span className="text-2xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                EduLearn
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
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 text-gray-600 hover:text-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                  >
                    {cart.length}
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

      {/* Hero Section */}
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

      {/* Categories */}
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

      {/* Features Section */}
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

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="relative p-12 text-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1.1, 1, 1.1]
                }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity }
                }}
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full"
              />
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have transformed their careers with our courses. 
                Start learning today and unlock your potential.
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-teal-600 px-12 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                Get Started Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-lg shadow-2xl z-50 overflow-y-auto border-l border-white/20"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-8xl mb-6"
                    >
                      🛒
                    </motion.div>
                    <p className="text-gray-600 mb-4 text-lg">Your cart is empty</p>
                    <p className="text-gray-500 mb-8">Add some courses to get started!</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCartOpen(false)}
                      className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Browse Courses
                    </motion.button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
                      {cart.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          exit={{ opacity: 0, x: 50 }}
                          className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-16 h-12 object-cover rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-teal-600 font-bold text-lg">${item.price}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1, color: "#EF4444" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-1"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200/50 pt-4 bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-gray-800">Total:</span>
                        <span className="text-2xl font-bold text-teal-600">${getTotalPrice()}</span>
                      </div>
                      <motion.button
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 15px 30px -5px rgba(20, 184, 166, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10">Proceed to Checkout</span>
                        <motion.div
                          animate={{ x: [-100, 100] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        />
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
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
                  className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center"
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
    </div>
  );
};

export default Index;