import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getInstructors } from '../services/instructor';

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
  objectives?: string[];
  requirements?: string[];
  lessons?: number;
  projects?: number;
}

interface Category {
  id: string;
  name: string;
}

interface Instructor {
  id: number;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  rating: number;
  students: number;
  courses: number;
  image: string;
  bio: string;
  detailedBio: string;
  achievements: string[];
  expertise: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  featuredCourses?: number[];
}

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [cart, setCart] = useState<Course[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [orderSummary, setOrderSummary] = useState<{
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
  }>({
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0
  });
  const [currentBg, setCurrentBg] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [instructors, setInstructors] = useState<Instructor[]>([]);

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
    { id: 'marketing', name: 'Marketing' },
    { id: 'it', name: 'IT & Software' },
    { id: 'personal', name: 'Personal Development' },
    { id: 'photo', name: 'Photography' },
    { id: 'music', name: 'Music' }
  ];
  const courses: Course[] = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      price: 26500,
      rating: 4.8,
      students: 1245,
      duration: '12 hours',
      level: 'Intermediate',
      category: 'development',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      description: 'Master React with hooks, context API, and advanced patterns',
      objectives: [
        'Master React Hooks and Context API',
        'Build complex state management systems',
        'Create reusable component libraries',
        'Implement advanced React patterns'
      ],
      requirements: [
        'Basic JavaScript knowledge',
        'Familiarity with React fundamentals',
        'Node.js installed on your computer'
      ],
      lessons: 45,
      projects: 3
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      instructor: 'Mike Chen',
      price: 23600,
      rating: 4.9,
      students: 892,
      duration: '15 hours',
      level: 'Beginner',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      description: 'Learn professional design principles and tools',
      objectives: [
        'Master design thinking process',
        'Create wireframes and prototypes',
        'Conduct user research and testing',
        'Build design systems'
      ],
      requirements: [
        'No prior experience needed',
        'Creative mindset',
        'Figma account (free)'
      ],
      lessons: 52,
      projects: 4
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      instructor: 'Emma Davis',
      price: 20600,
      rating: 4.7,
      students: 1567,
      duration: '10 hours',
      level: 'Advanced',
      category: 'marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      description: 'Complete guide to digital marketing in 2024',
      objectives: [
        'Develop comprehensive marketing strategies',
        'Master SEO and SEM techniques',
        'Create effective social media campaigns',
        'Analyze marketing performance metrics'
      ],
      requirements: [
        'Basic understanding of marketing',
        'Familiarity with social media platforms',
        'Analytical thinking skills'
      ],
      lessons: 38,
      projects: 2
    },
    {
      id: 4,
      title: 'Business Analytics',
      instructor: 'David Wilson',
      price: 28000,
      rating: 4.6,
      students: 734,
      duration: '14 hours',
      level: 'Intermediate',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      description: 'Data-driven decision making for business growth',
      objectives: [
        'Master data analysis techniques',
        'Create business intelligence dashboards',
        'Make data-driven decisions',
        'Predict business trends'
      ],
      requirements: [
        'Basic Excel knowledge',
        'Understanding of business concepts',
        'Analytical mindset'
      ],
      lessons: 48,
      projects: 3
    },
    {
      id: 5,
      title: 'Full Stack JavaScript',
      instructor: 'Alex Rodriguez',
      price: 29500,
      rating: 4.8,
      students: 2034,
      duration: '20 hours',
      level: 'Advanced',
      category: 'development',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      description: 'Become a full-stack developer with modern JavaScript',
      objectives: [
        'Build full-stack applications',
        'Master Node.js and Express',
        'Implement authentication systems',
        'Deploy applications to production'
      ],
      requirements: [
        'Intermediate JavaScript',
        'Basic HTML/CSS knowledge',
        'Understanding of databases'
      ],
      lessons: 65,
      projects: 5
    },
    {
      id: 6,
      title: 'Advanced Figma Prototyping',
      instructor: 'Lisa Wang',
      price: 22100,
      rating: 4.9,
      students: 567,
      duration: '8 hours',
      level: 'Intermediate',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400',
      description: 'Create interactive prototypes like a pro',
      objectives: [
        'Master advanced Figma features',
        'Create interactive prototypes',
        'Design complex animations',
        'Collaborate with development teams'
      ],
      requirements: [
        'Basic Figma knowledge',
        'Understanding of UI design principles',
        'Creative problem-solving skills'
      ],
      lessons: 32,
      projects: 3
    },
    {
      id: 7,
      title: 'Cybersecurity Essentials',
      instructor: 'Jane Smith',
      price: 25000,
      rating: 4.7,
      students: 1200,
      duration: '10 hours',
      level: 'Beginner',
      category: 'it',
      image: 'https://images.unsplash.com/photo-1555064440-951de77b1d5f?w=400',
      description: 'Learn the basics of cybersecurity and protect digital assets',
      objectives: [
        'Understand cybersecurity fundamentals',
        'Implement basic security measures',
        'Identify common threats',
        'Learn ethical hacking basics'
      ],
      requirements: [
        'No prior experience needed',
        'Basic computer skills',
        'Interest in security'
      ],
      lessons: 40,
      projects: 2
    },
    {
      id: 8,
      title: 'Public Speaking Mastery',
      instructor: 'Tom Harris',
      price: 17700,
      rating: 4.8,
      students: 900,
      duration: '8 hours',
      level: 'Intermediate',
      category: 'personal',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400',
      description: 'Master the art of public speaking and communication',
      objectives: [
        'Develop confident speaking skills',
        'Structure effective presentations',
        'Handle audience questions',
        'Overcome stage fright'
      ],
      requirements: [
        'Basic communication skills',
        'Willingness to practice',
        'Access to recording device'
      ],
      lessons: 30,
      projects: 3
    },
    {
      id: 9,
      title: 'Digital Photography Basics',
      instructor: 'Anna Lee',
      price: 20600,
      rating: 4.9,
      students: 1500,
      duration: '12 hours',
      level: 'Beginner',
      category: 'photo',
      image: 'https://images.unsplash.com/photo-1502920514313-52581002a659?w=400',
      description: 'Learn digital photography from basics to advanced techniques',
      objectives: [
        'Understand camera settings',
        'Master composition rules',
        'Edit photos professionally',
        'Capture different genres'
      ],
      requirements: [
        'Digital camera or smartphone',
        'Basic computer skills',
        'Photo editing software'
      ],
      lessons: 42,
      projects: 4
    },
    {
      id: 10,
      title: 'Guitar for Beginners',
      instructor: 'Mike Brown',
      price: 14700,
      rating: 4.6,
      students: 800,
      duration: '6 hours',
      level: 'Beginner',
      category: 'music',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400',
      description: 'Learn to play guitar from scratch with easy lessons',
      objectives: [
        'Learn basic chords',
        'Play simple songs',
        'Understand music theory basics',
        'Develop strumming patterns'
      ],
      requirements: [
        'Acoustic or electric guitar',
        'No prior experience',
        'Practice time'
      ],
      lessons: 25,
      projects: 2
    }
  ];

  // Fetch instructors from backend
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await getInstructors();
        if (!response.ok) {
          throw new Error('Failed to fetch instructors');
        }
        const data: Instructor[] = await response.json();
        setInstructors(data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchInstructors();
  }, []);

  // Check localStorage for accessToken
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLoggedIn(true);
    }
  }, []);

  // Prevent background scroll when modals are open
  useEffect(() => {
    const body = document.body;
    if (isDetailsOpen || isCartOpen || isCheckoutOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
    return () => {
      body.style.overflow = '';
    };
  }, [isDetailsOpen, isCartOpen, isCheckoutOpen]);

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

  // Calculate order summary when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
      const discount = subtotal * 0.1; // 10% discount
      const tax = (subtotal - discount) * 0.13; // 13% tax
      const total = subtotal - discount + tax;
      setOrderSummary({
        subtotal,
        discount,
        tax,
        total
      });
    }
  }, [cart]);

  const filteredCourses = activeTab === 'all'
    ? courses
    : courses.filter(course => course.category === activeTab);

  const addToCart = (course: Course, openCart: boolean = true): void => {
    if (!isLoggedIn) {
      // Prevent adding to cart if not logged in
      alert('Please sign in to add courses to your cart.');
      return;
    }
    setCart(prev => [...prev, course]);
    if (openCart) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (courseId: number): void => {
    setCart(prev => prev.filter(item => item.id !== courseId));
  };

  const getTotalPrice = (): string => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(0);
  };

  const getInstructorInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const viewCourseDetails = (course: Course): void => {
    setSelectedCourse(course);
    setIsDetailsOpen(true);
  };

  const purchaseCourse = (course: Course): void => {
    addToCart(course);
    setIsDetailsOpen(false);
    setIsCartOpen(true);
  };

  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Advanced': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleProceedToCheckout = (): void => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    setPaymentStep('details');
  };

  const handlePaymentSuccess = (): void => {
    setPaymentStep('confirmation');
    // In a real app, you would process the payment here
    setTimeout(() => {
      setCart([]);
      setIsCheckoutOpen(false);
      setPaymentStep('details');
    }, 3000);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const accessToken = localStorage.getItem("accessToken");

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
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
        className="bg-white/90 backdrop-blur-md shadow-lg fixed top-0 w-full z-50 border-b border-white/20"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <motion.div
                animate={{ rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">NE</span>
              </motion.div>
              <span className="text-2xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                NovaEdu
              </span>
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              {['home', 'courses', 'instructors', 'about', 'contact'].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{
                    color: '#14B8A6',
                    y: -2
                  }}
                  onClick={() => scrollToSection(item)}
                  className={`${
                    activeNav === item ? 'text-teal-500' : 'text-gray-600'
                  } hover:text-teal-500 font-medium cursor-pointer transition-all duration-300 relative capitalize`}
                >
                  {item}
                  <motion.span
                    whileHover={{ width: '100%' }}
                    className={`absolute bottom-0 left-0 ${
                      activeNav === item ? 'w-full' : 'w-0'
                    } h-0.5 bg-teal-500 transition-all duration-300`}
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
              {isLoggedIn ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >

                  <button className="flex items-center space-x-2 bg-white/80 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                      U
                    </div>
                    <span className="text-gray-800 font-semibold">Profile</span>
                  </button>
                </motion.div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </motion.header>
      {/* Hero Section */}
      <section id="home" className="relative pt-36 pb-20 overflow-hidden">
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
                  onClick={() => scrollToSection('courses')}
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
      {/* Categories & Courses */}
      <section id="courses" className="py-16 relative z-10">
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
                  {course.price > 25000 && (
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
                      Rs. {course.price.toFixed(0)}
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
              
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addToCart(course)}
                        className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10">Add to Cart</span>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => viewCourseDetails(course)}
                        className="px-4 bg-white text-blue-500 border-2 border-blue-500 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      {/* Instructors Section */}
      <section id="instructors" className="py-20 relative z-10 bg-gradient-to-br from-white/50 to-teal-50/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Meet Our Expert Instructors</h2>
            <p className="text-gray-600 text-lg bg-white/50 backdrop-blur-sm inline-block px-6 py-3 rounded-2xl shadow-lg">
              Learn from industry professionals with real-world experience
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-teal-600 px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
                    {instructor.rating} ⭐
                  </div>
                </div>
          
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                        {instructor.name}
                      </h3>
                      <p className="text-teal-600 font-semibold">{instructor.role}</p>
                    </div>
                  </div>
            
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {instructor.bio}
                  </p>
            
                  {/* Enhanced Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center bg-teal-50/50 rounded-xl p-3 group-hover:bg-teal-100/50 transition-colors duration-300">
                      <div className="text-lg font-bold text-teal-600">{instructor.experience}</div>
                      <div className="text-xs text-gray-600 font-medium">Experience</div>
                    </div>
                    <div className="text-center bg-blue-50/50 rounded-xl p-3 group-hover:bg-blue-100/50 transition-colors duration-300">
                      <div className="text-lg font-bold text-blue-600">{instructor.courses}</div>
                      <div className="text-xs text-gray-600 font-medium">Courses</div>
                    </div>
                    <div className="text-center bg-purple-50/50 rounded-xl p-3 group-hover:bg-purple-100/50 transition-colors duration-300">
                      <div className="text-lg font-bold text-purple-600">{instructor.students.toLocaleString()}</div>
                      <div className="text-xs text-gray-600 font-medium">Students</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
      {/* About Section */}
      <section id="about" className="py-20 relative z-10 bg-gradient-to-br from-blue-50/50 to-teal-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  🎯 Our Mission
                </span>
              </motion.div>
        
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                Transforming Education Through
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500 block">
                  Innovation
                </span>
              </h2>
        
              <p className="text-lg text-gray-600 mb-8 leading-relaxed bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                EduLearn was founded with a simple yet powerful vision: to make quality education accessible to everyone,
                everywhere. We believe that learning should be engaging, interactive, and tailored to individual needs.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { number: '2018', label: 'Founded In' },
                  { number: '50+', label: 'Countries' },
                  { number: '98%', label: 'Satisfaction Rate' },
                  { number: '24/7', label: 'Support' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="text-center bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20"
                  >
                    <div className="text-2xl font-bold text-teal-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Learn Our Story
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10">
                <motion.img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600"
                  alt="About EduLearn"
                  className="rounded-3xl shadow-2xl border-8 border-white/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
          
                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
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
                    <span className="text-sm font-semibold text-gray-800">Global Community</span>
                  </div>
                </motion.div>
          
                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
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
                    <span className="text-sm font-semibold text-gray-800">Innovative Learning</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-gray-600 text-lg bg-white/50 backdrop-blur-sm inline-block px-6 py-3 rounded-2xl shadow-lg">
              We'd love to hear from you. Let's start a conversation!
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Have questions about our courses or need assistance?
                  Reach out to our friendly team - we're here to help you succeed.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  {
                    icon: '📧',
                    title: 'Email Us',
                    content: 'hello@edulearn.com',
                    description: 'Send us an email anytime'
                  },
                  {
                    icon: '📞',
                    title: 'Call Us',
                    content: '+1 (555) 123-4567',
                    description: 'Mon to Fri 9am to 6pm'
                  },
                  {
                    icon: '📍',
                    title: 'Visit Us',
                    content: '123 Learning Street, EduCity',
                    description: 'Feel free to visit our campus'
                  },
                  {
                    icon: '💬',
                    title: 'Live Chat',
                    content: 'Available 24/7',
                    description: 'Instant support via chat'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="text-3xl group-hover:text-teal-600 transition-colors duration-300"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{item.title}</h4>
                      <p className="text-teal-600 font-medium">{item.content}</p>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Social Links */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h4 className="font-semibold text-gray-800 text-lg mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    { name: 'Twitter', icon: '🐦', color: 'hover:bg-blue-400' },
                    { name: 'Facebook', icon: '📘', color: 'hover:bg-blue-600' },
                    { name: 'Instagram', icon: '📷', color: 'hover:bg-pink-500' },
                    { name: 'LinkedIn', icon: '💼', color: 'hover:bg-blue-700' },
                    { name: 'YouTube', icon: '📺', color: 'hover:bg-red-500' }
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      href="#"
                      className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 ${social.color} hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            {/* Contact Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h3>
        
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 15px 40px -10px rgba(20, 184, 166, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Send Message</span>
                  <motion.div
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                </motion.button>
              </form>
            </motion.div>
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
      {/* Course Details Modal */}
      <AnimatePresence>
        {isDetailsOpen && selectedCourse && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
              onClick={() => setIsDetailsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-2 md:inset-4 z-50 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-h-full flex items-center justify-center p-4">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl overflow-hidden">
                  {/* Header */}
                  <div className="relative h-80 md:h-96 overflow-hidden">
                    <img
                      src={selectedCourse.image}
                      alt={selectedCourse.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
                    <div className="absolute top-6 right-6 flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsDetailsOpen(false)}
                        className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-all duration-300"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm border ${getLevelColor(selectedCourse.level)}`}>
                          {selectedCourse.level}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium">
                          {selectedCourse.category}
                        </span>
                        <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span className="font-bold">{selectedCourse.rating}</span>
                          <span className="text-white/80">({selectedCourse.students} students)</span>
                        </div>
                      </div>
                
                      <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedCourse.title}</h1>
                      <p className="text-xl text-white/90 max-w-3xl">{selectedCourse.description}</p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Content */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Instructor */}
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                          <h3 className="text-2xl font-bold text-gray-800 mb-4">About the Instructor</h3>
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                              {getInstructorInitials(selectedCourse.instructor)}
                            </div>
                            <div>
                              <h4 className="text-xl font-semibold text-gray-800">{selectedCourse.instructor}</h4>
                              <p className="text-gray-600">Senior Instructor at EduLearn</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                  </svg>
                                  <span className="text-gray-700 font-semibold">{selectedCourse.rating} Instructor Rating</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Course Objectives */}
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                          <h3 className="text-2xl font-bold text-gray-800 mb-4">What You'll Learn</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedCourse.objectives?.map((objective, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-teal-50/80 p-4 rounded-xl text-gray-700 font-medium border border-teal-100 hover:shadow-md transition-shadow duration-300"
                              >
                                {objective}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        {/* Requirements */}
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                          <h3 className="text-2xl font-bold text-gray-800 mb-4">Requirements</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedCourse.requirements?.map((requirement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-blue-50/80 p-4 rounded-xl text-gray-700 font-medium border border-blue-100 hover:shadow-md transition-shadow duration-300"
                              >
                                {requirement}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Sidebar */}
                      <div className="space-y-6">
                        {/* Pricing Card */}
                        <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl p-6 shadow-2xl text-white">
                          <div className="text-center mb-6">
                            <div className="text-4xl font-bold mb-2">Rs. {selectedCourse.price.toFixed(0)}</div>
                            <div className="text-teal-100">One-time payment</div>
                          </div>
                          <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center">
                              <span>Lessons</span>
                              <span className="font-semibold">{selectedCourse.lessons}+</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Duration</span>
                              <span className="font-semibold">{selectedCourse.duration}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Projects</span>
                              <span className="font-semibold">{selectedCourse.projects}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Level</span>
                              <span className="font-semibold">{selectedCourse.level}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <motion.button
                              whileHover={{
                                scale: 1.02,
                                boxShadow: "0 15px 30px -5px rgba(255, 255, 255, 0.3)"
                              }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => purchaseCourse(selectedCourse)}
                              className="w-full bg-white text-teal-600 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              Enroll Now
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                addToCart(selectedCourse, false);
                                setIsCartOpen(true);
                              }}
                              className="w-full bg-white/20 backdrop-blur-sm text-white py-4 rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                            >
                              Add to Cart
                            </motion.button>
                          </div>
                          <div className="text-center mt-4 text-teal-100 text-sm">
                            30-day money-back guarantee
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
                            <p className="text-teal-600 font-bold text-lg">Rs. {item.price.toFixed(0)}</p>
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
                        <span className="text-2xl font-bold text-teal-600">Rs. {getTotalPrice()}</span>
                      </div>
                      <motion.button
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 15px 30px -5px rgba(20, 184, 166, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleProceedToCheckout}
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
      {/* Payment Checkout Section - Centered Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
              onClick={() => setIsCheckoutOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (paymentStep === 'details') {
                          setIsCheckoutOpen(false);
                          setIsCartOpen(true);
                        } else {
                          setPaymentStep('details');
                        }
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {paymentStep === 'details' && 'Checkout'}
                      {paymentStep === 'payment' && 'Payment Method'}
                      {paymentStep === 'confirmation' && 'Order Confirmed!'}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCheckoutOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                {/* Progress Steps */}
                {paymentStep !== 'confirmation' && (
                  <div className="flex items-center justify-center py-6 bg-white/50 backdrop-blur-sm border-b border-gray-200/50">
                    <div className="flex items-center space-x-4">
                      {[
                        { step: 'details', label: 'Details' },
                        { step: 'payment', label: 'Payment' }
                      ].map((stepObj, index) => (
                        <div key={stepObj.step} className="flex items-center">
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                              paymentStep === stepObj.step
                                ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {index + 1}
                          </motion.div>
                          {index < 1 && (
                            <div className="w-12 h-1 bg-gray-200 mx-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: paymentStep === 'payment' ? '100%' : '0%' }}
                                className="h-full bg-gradient-to-r from-teal-500 to-blue-500"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Checkout Content */}
                <div className="flex-1 overflow-y-auto">
                  {paymentStep === 'details' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 space-y-6"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Forms */}
                        <div className="space-y-6">
                          {/* Contact Information */}
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                  type="email"
                                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                  placeholder="your@email.com"
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="emailUpdates" className="rounded text-teal-500 focus:ring-teal-500" />
                                <label htmlFor="emailUpdates" className="text-sm text-gray-600">
                                  Email me with news and offers
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* Payment Method Selection */}
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h3>
                            <div className="grid grid-cols-2 gap-4">
                              {[
                                { id: 'card', label: 'Credit Card', icon: '💳' },
                                { id: 'paypal', label: 'PayPal', icon: '🔵' },
                                { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                                { id: 'crypto', label: 'Crypto', icon: '₿' }
                              ].map((method) => (
                                <motion.button
                                  key={method.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="p-4 rounded-xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-300 bg-white/50 backdrop-blur-sm text-center group"
                                >
                                  <div className="text-2xl mb-2">{method.icon}</div>
                                  <div className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                                    {method.label}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Right Column - Order Summary */}
                        <div className="space-y-6">
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 sticky top-0">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                              {cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200/50">
                                  <div className="flex items-center space-x-3">
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-12 h-12 object-cover rounded-lg shadow-md"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">{item.title}</h4>
                                      <p className="text-gray-500 text-xs">{item.instructor}</p>
                                    </div>
                                  </div>
                                  <span className="font-bold text-teal-600">Rs. {item.price.toFixed(0)}</span>
                                </div>
                              ))}
                            </div>
                      
                            <div className="space-y-2 mt-4 pt-4 border-t border-gray-200/50">
                              <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>Rs. {orderSummary.subtotal.toFixed(0)}</span>
                              </div>
                              <div className="flex justify-between text-green-600">
                                <span>Discount (10%)</span>
                                <span>- Rs. {orderSummary.discount.toFixed(0)}</span>
                              </div>
                              <div className="flex justify-between text-gray-600">
                                <span>Tax (13%)</span>
                                <span>Rs. {orderSummary.tax.toFixed(0)}</span>
                              </div>
                              <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-200/50">
                                <span>Total</span>
                                <span>Rs. {orderSummary.total.toFixed(0)}</span>
                              </div>
                            </div>
                          </div>
                          {/* Continue to Payment Button */}
                          <motion.button
                            whileHover={{
                              scale: 1.02,
                              boxShadow: "0 15px 30px -5px rgba(20, 184, 166, 0.4)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPaymentStep('payment')}
                            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                          >
                            <span className="relative z-10">Continue to Payment</span>
                            <motion.div
                              animate={{ x: [-100, 100] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {paymentStep === 'payment' && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 space-y-6"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Payment Forms */}
                        <div className="space-y-6">
                          {/* Card Details */}
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Card Details</h3>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm pr-12"
                                    placeholder="1234 5678 9012 3456"
                                  />
                                  <div className="absolute right-3 top-3 flex space-x-1">
                                    {['💳', '🔵', '🟡'].map((icon, index) => (
                                      <motion.span
                                        key={index}
                                        whileHover={{ scale: 1.2 }}
                                        className="text-lg cursor-pointer"
                                      >
                                        {icon}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                        
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                  <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                    placeholder="MM/YY"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                                  <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                    placeholder="123"
                                  />
                                </div>
                              </div>
                        
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                  placeholder="John Doe"
                                />
                              </div>
                            </div>
                          </div>
                          {/* Billing Address */}
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Billing Address</h3>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                  <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                    placeholder="John"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                  <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                    placeholder="Doe"
                                  />
                                </div>
                              </div>
                        
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                  placeholder="123 Main Street"
                                />
                              </div>
                        
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                  <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                    placeholder="New York"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                                  <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                    placeholder="10001"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Right Column - Order Summary & Security */}
                        <div className="space-y-6">
                          {/* Order Summary */}
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                            <div className="space-y-3 max-h-40 overflow-y-auto">
                              {cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200/50">
                                  <div className="flex items-center space-x-3">
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-10 h-10 object-cover rounded-lg shadow-md"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">{item.title}</h4>
                                      <p className="text-gray-500 text-xs">{item.instructor}</p>
                                    </div>
                                  </div>
                                  <span className="font-bold text-teal-600 whitespace-nowrap text-sm">Rs. {item.price.toFixed(0)}</span>
                                </div>
                              ))}
                            </div>
                      
                            <div className="space-y-2 mt-4 pt-4 border-t border-gray-200/50">
                              <div className="flex justify-between text-gray-600 text-sm">
                                <span>Subtotal</span>
                                <span>Rs. {orderSummary.subtotal.toFixed(0)}</span>
                              </div>
                              <div className="flex justify-between text-green-600 text-sm">
                                <span>Discount (10%)</span>
                                <span>- Rs. {orderSummary.discount.toFixed(0)}</span>
                              </div>
                              <div className="flex justify-between text-gray-600 text-sm">
                                <span>Tax (13%)</span>
                                <span>Rs. {orderSummary.tax.toFixed(0)}</span>
                              </div>
                              <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-200/50">
                                <span>Total</span>
                                <span>Rs. {orderSummary.total.toFixed(0)}</span>
                              </div>
                            </div>
                          </div>
                          {/* Security Badge */}
                          <div className="bg-green-50/80 backdrop-blur-sm rounded-2xl p-4 border border-green-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-semibold text-green-800">Secure Payment</div>
                                <div className="text-green-600 text-sm">Your payment information is encrypted and secure</div>
                              </div>
                            </div>
                          </div>
                          {/* Pay Now Button */}
                          <motion.button
                            whileHover={{
                              scale: 1.02,
                              boxShadow: "0 15px 30px -5px rgba(20, 184, 166, 0.4)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePaymentSuccess}
                            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                          >
                            <span className="relative z-10">Pay Rs. {orderSummary.total.toFixed(0)}</span>
                            <motion.div
                              animate={{ x: [-100, 100] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {paymentStep === 'confirmation' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-6 shadow-2xl"
                      >
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l2 4L19 7" />
                        </svg>
                      </motion.div>
                
                      <h3 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h3>
                      <p className="text-gray-600 mb-8 max-w-md">
                        Thank you for your purchase! You now have lifetime access to {cart.length} course{cart.length !== 1 ? 's' : ''}.
                        Check your email for the receipt and course access details.
                      </p>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 w-full max-w-sm mb-8">
                        <h4 className="font-semibold text-gray-800 mb-4">Order Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Order ID</span>
                            <span className="font-mono text-gray-800">EDU{Date.now().toString().slice(-6)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date</span>
                            <span className="text-gray-800">{new Date().toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Paid</span>
                            <span className="font-bold text-teal-600">Rs. {orderSummary.total.toFixed(0)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setIsCheckoutOpen(false);
                            setPaymentStep('details');
                          }}
                          className="px-8 py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-300"
                        >
                          Continue Learning
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setIsCheckoutOpen(false);
                            setPaymentStep('details');
                          }}
                          className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          View Courses
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </div>
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