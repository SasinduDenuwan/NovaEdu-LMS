// Index.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BrowseCategories from '../components/BrowseCategories';
import FeaturesSection from '../components/FeaturesSection';
import CTASection from '../components/CTASection';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';

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

  const addToCart = (course: Course): void => {
    setCart(prev => [...prev, course]);
  };

  const removeFromCart = (courseId: number): void => {
    setCart(prev => prev.filter(item => item.id !== courseId));
  };

  const getTotalPrice = (): string => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

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

      <Header 
        cartLength={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <HeroSection />

      <BrowseCategories 
        categories={categories}
        courses={courses}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        addToCart={addToCart}
      />

      <FeaturesSection />

      <CTASection />

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      />

      <Footer />
    </div>
  );
};

export default Index;