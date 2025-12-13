// StudentDashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Library,
  Clock,
  Flame,
  FileText,
  Video,
  Package,
  Laptop,
  ClipboardList,
  Paperclip,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  Bell,
  Play,
  Download,
  Star
} from 'lucide-react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600'
];

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
  enrolledDate?: string;
  lastAccessed?: string;
}

interface Lesson {
  id: number;
  courseId: number;
  title: string;
  duration: string;
  videoUrl: string; // Now using YouTube embed URLs
  description: string;
  isLocked: boolean;
  resources?: {
    type: 'pdf' | 'zip' | 'doc';
    name: string;
    url: string;
    size: string;
  }[];
}

interface Resource {
  id: number;
  title: string;
  type: 'pdf' | 'video' | 'zip' | 'code' | 'document';
  category: string;
  size: string;
  uploadDate: string;
  course: string;
  downloadUrl: string;
  description: string;
}

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'my-courses' | 'resources'>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isCoursePlayerOpen, setIsCoursePlayerOpen] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [activeSidebar, setActiveSidebar] = useState<'lessons' | 'resources' | 'discussion'>('lessons');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [resourceFilter, setResourceFilter] = useState<string>('all');
  const [currentBg, setCurrentBg] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data for enrolled courses
  const enrolledCourses: Course[] = [
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
      enrolledDate: '2024-01-15',
      lastAccessed: '2024-03-20',
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
      enrolledDate: '2024-02-10',
      lastAccessed: '2024-03-18',
      lessons: 52,
      projects: 4
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
      enrolledDate: '2024-03-01',
      lastAccessed: '2024-03-19',
      lessons: 65,
      projects: 5
    }
  ];

  // Mock lessons data with YouTube embed URLs
  const lessons: Lesson[] = [
    {
      id: 1,
      courseId: 1,
      title: 'Introduction to React Hooks',
      duration: '15:30',
      videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q', // Sample React Hooks intro video
      description: 'Learn the fundamentals of React Hooks and how they simplify state management',
      isLocked: false,
      resources: [
        { type: 'pdf', name: 'Lecture Notes.pdf', url: '#', size: '2.4 MB' },
        { type: 'zip', name: 'Starter Code.zip', url: '#', size: '1.2 MB' }
      ]
    },
    {
      id: 2,
      courseId: 1,
      title: 'useState and useEffect Deep Dive',
      duration: '22:15',
      videoUrl: 'https://www.youtube.com/embed/-p0VspoXWC8', // Sample useState/useEffect video
      description: 'Master the most commonly used hooks with practical examples',
      isLocked: false,
      resources: [
        { type: 'pdf', name: 'Cheat Sheet.pdf', url: '#', size: '1.8 MB' }
      ]
    },
    {
      id: 3,
      courseId: 1,
      title: 'Custom Hooks and Composition',
      duration: '18:45',
      videoUrl: 'https://www.youtube.com/embed/6ThXsUwLWvc', // Sample custom hooks video
      description: 'Create reusable custom hooks and understand hook composition patterns',
      isLocked: false
    },
    // Add sample lessons for other courses if needed
    {
      id: 4,
      courseId: 2,
      title: 'Introduction to UI/UX',
      duration: '10:00',
      videoUrl: 'https://www.youtube.com/embed/5RjkPoDeVZS',
      description: 'Basics of UI/UX design',
      isLocked: false
    },
    {
      id: 5,
      courseId: 5,
      title: 'JavaScript Fundamentals',
      duration: '20:00',
      videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
      description: 'Core JavaScript concepts',
      isLocked: false
    }
  ];

  // Mock resources data
  const resources: Resource[] = [
    {
      id: 1,
      title: 'React Hooks Cheat Sheet',
      type: 'pdf',
      category: 'development',
      size: '2.1 MB',
      uploadDate: '2024-03-15',
      course: 'Advanced React Development',
      downloadUrl: '#',
      description: 'Complete reference guide for React Hooks with examples'
    },
    {
      id: 2,
      title: 'Design System Components',
      type: 'zip',
      category: 'design',
      size: '4.5 MB',
      uploadDate: '2024-03-10',
      course: 'UI/UX Design Masterclass',
      downloadUrl: '#',
      description: 'Figma components and design system assets'
    },
    {
      id: 3,
      title: 'JavaScript Best Practices',
      type: 'document',
      category: 'development',
      size: '1.8 MB',
      uploadDate: '2024-03-12',
      course: 'Full Stack JavaScript',
      downloadUrl: '#',
      description: 'Modern JavaScript coding standards and best practices'
    },
    {
      id: 4,
      title: 'API Integration Examples',
      type: 'code',
      category: 'development',
      size: '3.2 MB',
      uploadDate: '2024-03-08',
      course: 'Full Stack JavaScript',
      downloadUrl: '#',
      description: 'Sample code for REST API integration and authentication'
    },
    {
      id: 5,
      title: 'User Research Template',
      type: 'pdf',
      category: 'design',
      size: '1.5 MB',
      uploadDate: '2024-03-05',
      course: 'UI/UX Design Masterclass',
      downloadUrl: '#',
      description: 'Templates for conducting user research and interviews'
    },
    {
      id: 6,
      title: 'Project Setup Guide',
      type: 'video',
      category: 'development',
      size: '15.7 MB',
      uploadDate: '2024-03-18',
      course: 'Advanced React Development',
      downloadUrl: '#',
      description: 'Step-by-step video guide for project setup and configuration'
    }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={24} />, color: 'teal' },
    { id: 'my-courses', label: 'My Courses', icon: <BookOpen size={24} />, color: 'blue' },
    { id: 'resources', label: 'Resources', icon: <Library size={24} />, color: 'purple' },
  ];

  const openCoursePlayer = (course: Course) => {
    setSelectedCourse(course);
    const firstUnlockedLesson = lessons.find(lesson =>
      lesson.courseId === course.id && !lesson.isLocked
    );
    setCurrentLesson(firstUnlockedLesson || null);
    setIsCoursePlayerOpen(true);
  };

  const getNextLesson = () => {
    if (!selectedCourse || !currentLesson) return null;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    return lessons[currentIndex + 1] || null;
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'video': return '🎬';
      case 'zip': return '📦';
      case 'code': return '💻';
      case 'document': return '📝';
      default: return '📎';
    }
  };

  const filteredResources = resourceFilter === 'all'
    ? resources
    : resources.filter(resource => resource.category === resourceFilter);

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-blue-50 flex relative overflow-hidden">
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
              className={`absolute w-${item % 2 === 0 ? '4' : '6'} h-${item % 2 === 0 ? '4' : '6'} rounded-full bg-linear-to-r from-teal-400 to-blue-400 opacity-30`}
              style={{
                left: `${(item * 15) % 100}%`,
                top: `${(item * 20) % 100}%`,
              }}
            />
          ))}
        </div>
      </div>
      {/* Sidebar Navigation */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`bg-white/80 backdrop-blur-xl border-r border-white/20 flex flex-col ${
          isSidebarCollapsed ? 'w-24' : 'w-80'
        } transition-all duration-300 fixed h-full z-40 shadow-xl`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <div className="w-10 h-10 bg-linear-to-r from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">EL</span>
            </div>
            {!isSidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1"
              >
                <span className="text-xl font-bold text-gray-800">EduLearn</span>
                <div className="text-xs text-teal-600 font-medium">Student Portal</div>
              </motion.div>
            )}
          </motion.div>
        </div>
        {/* User Profile */}
        <div className="p-6 border-b border-white/20">
          <div className={`flex items-center space-x-4 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
             <div className="relative">
               <div className="w-12 h-12 bg-linear-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">JS</div>
               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-white"></div>
             </div>
            {!isSidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 min-w-0"
              >
                <div className="font-bold text-gray-800 truncate">John Student</div>
                <div className="text-sm text-teal-600 truncate">Pro Member</div>
              </motion.div>
            )}
          </div>
        </div>
        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-3">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-4 p-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-white shadow-lg border border-white/50 text-gray-800'
                  : 'text-gray-600 hover:bg-white/50 hover:shadow-md'
              } ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}
            >
              <span className="text-gray-600">{item.icon}</span>
              {!isSidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 text-left text-lg"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>
        {/* Collapse Button */}
        <div className="p-4 border-t border-white/20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-2xl transition-all duration-300 ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <motion.div
              animate={{ rotate: isSidebarCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
               {isSidebarCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </motion.div>
            {!isSidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Collapse Sidebar
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.div>
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        {/* Top Header */}
        <header className="bg-white/60 backdrop-blur-xl border-b border-white/20 sticky top-0 z-30">
          <div className="flex items-center justify-between px-8 py-6">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-br from-teal-600 to-indigo-600 bg-clip-text text-transparent capitalize">
                {activeTab.replace('-', ' ')}
              </h1>
              <p className="text-gray-600">
                {activeTab === 'dashboard' && 'Welcome to your learning dashboard'}
                {activeTab === 'my-courses' && 'Continue your learning journey'}
                {activeTab === 'resources' && 'Access learning materials'}

              </p>
            </div>
          </div>
        </header>
        {/* Dashboard Content */}
        <main className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Welcome Section */}
                <div className="bg-linear-to-r from-teal-500 to-blue-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Welcome back, John! 👋
                      </h1>
                      <p className="text-teal-100 text-lg">
                        Continue your learning journey where you left off
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 md:mt-0 bg-white text-teal-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Browse New Courses
                    </motion.button>
                  </div>
                </div>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Courses Enrolled', value: '3', icon: <GraduationCap size={24} />, color: 'teal' },
                    { label: 'Hours Learned', value: '24', icon: <Clock size={24} />, color: 'blue' },
                    { label: 'Resources', value: '12', icon: <Library size={24} />, color: 'purple' },
                    { label: 'Learning Streak', value: '12 days', icon: <Flame size={24} />, color: 'orange' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                          <div className="text-gray-600 text-sm">{stat.label}</div>
                        </div>
                        <div className={`w-12 h-12 bg-${stat.color}-100 rounded-2xl flex items-center justify-center text-${stat.color}-600`}>
                          {stat.icon}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Continue Learning */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Continue Learning</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-teal-500 hover:text-teal-600 font-semibold"
                    >
                      View All
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    {enrolledCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-teal-50 transition-all duration-300 cursor-pointer group"
                        onClick={() => openCoursePlayer(course)}
                      >
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-16 h-16 object-cover rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 text-sm">{course.instructor}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="bg-teal-500 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Play size={20} fill="currentColor" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Recent Resources */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Recent Resources</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setActiveTab('resources')}
                      className="text-teal-500 hover:text-teal-600 font-semibold"
                    >
                      View All Resources
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resources.slice(0, 3).map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-teal-300 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-gray-500">{resource.course}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{resource.size}</span>
                          <span>{resource.uploadDate}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === 'my-courses' && (
              <motion.div
                key="my-courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
                    <p className="text-gray-600 mt-2">Continue your learning journey</p>
                  </div>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-300"
                    >
                      Filter
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Browse Courses
                    </motion.button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        y: -10,
                        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
                      }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:border-teal-300 transition-all duration-300 cursor-pointer group"
                      onClick={() => openCoursePlayer(course)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                          <h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
                          <p className="text-white/80 text-sm">{course.instructor}</p>
                        </div>
                      </div>
                     
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            course.level === 'Beginner'
                              ? 'bg-green-100 text-green-800'
                              : course.level === 'Intermediate'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {course.level}
                          </span>
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <Star size={16} fill="currentColor" />
                            <span className="text-gray-700 font-semibold">{course.rating}</span>
                          </div>
                        </div>
                       
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                          <div className="text-sm text-gray-600">
                            Last accessed: {course.lastAccessed}
                          </div>
                            <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="bg-teal-500 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Play size={20} fill="currentColor" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'resources' && (
              <motion.div
                key="resources"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">Learning Resources</h1>
                    <p className="text-gray-600 mt-2">Access course materials and downloads</p>
                  </div>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Upload Resource
                    </motion.button>
                  </div>
                </div>
                {/* Resource Filters */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Resources</h3>
                  <div className="flex flex-wrap gap-3">
                    {['all', 'development', 'design'].map((filter) => (
                      <motion.button
                        key={filter}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setResourceFilter(filter)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 capitalize ${
                          resourceFilter === filter
                            ? 'bg-teal-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600'
                        }`}
                      >
                        {filter === 'all' ? 'All Resources' : filter}
                      </motion.button>
                    ))}
                  </div>
                </div>
                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:border-teal-300 transition-all duration-300 group"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                                {resource.title}
                              </h3>
                              <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium mt-1 ${
                                resource.category === 'development'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-purple-100 text-purple-800'
                              }`}>
                                {resource.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{resource.size}</span>
                          <span>{resource.uploadDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{resource.course}</span>
                          <motion.a
                            href={resource.downloadUrl}
                            whileHover={{ scale: 1.1 }}
                            className="bg-teal-500 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Download size={20} />
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {filteredResources.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="flex justify-center mb-4">
                      <Library size={64} className="text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No Resources Found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more resources.</p>
                  </motion.div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
      {/* Course Player Modal */}
      <AnimatePresence>
        {isCoursePlayerOpen && selectedCourse && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
              onClick={() => setIsCoursePlayerOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-4 z-50 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCoursePlayerOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedCourse.title}</h2>
                    <p className="text-gray-600">{selectedCourse.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Playback Controls */}
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setPlaybackRate(prev => Math.max(0.5, prev - 0.25))}
                      className="p-2 text-gray-600 hover:text-teal-500 transition-colors duration-300"
                    >
                      {playbackRate}x
                    </motion.button>
                    <div className="flex items-center space-x-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setVolume(prev => Math.max(0, prev - 0.1))}
                        className="p-2 text-gray-600 hover:text-teal-500 transition-colors duration-300"
                      >
                        🔈
                      </motion.button>
                      <div className="w-20 bg-gray-200 rounded-full h-1">
                        <motion.div
                          className="bg-teal-500 h-1 rounded-full"
                          style={{ width: `${volume * 100}%` }}
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setVolume(prev => Math.min(1, prev + 0.1))}
                        className="p-2 text-gray-600 hover:text-teal-500 transition-colors duration-300"
                      >
                        🔊
                      </motion.button>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowNotes(!showNotes)}
                    className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                      showNotes
                        ? 'bg-teal-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-teal-500 hover:text-white'
                    }`}
                  >
                    📝 Notes
                  </motion.button>
                </div>
              </div>
              {/* Main Content */}
              <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-80 border-r border-gray-200 bg-gray-50 overflow-y-auto">
                  <div className="p-4">
                    {/* Navigation Tabs */}
                    <div className="flex space-x-2 mb-4">
                      {[
                        { id: 'lessons', label: 'Lessons', icon: '🎬' },
                        { id: 'resources', label: 'Resources', icon: '📚' },
                        { id: 'discussion', label: 'Q&A', icon: '💬' }
                      ].map((tab) => (
                        <motion.button
                          key={tab.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveSidebar(tab.id as any)}
                          className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl font-medium transition-all duration-300 ${
                            activeSidebar === tab.id
                              ? 'bg-teal-500 text-white shadow-lg'
                              : 'bg-white text-gray-600 hover:bg-teal-50'
                          }`}
                        >
                          <span>{tab.icon}</span>
                          <span className="text-sm">{tab.label}</span>
                        </motion.button>
                      ))}
                    </div>
                    {/* Lessons List */}
                    {activeSidebar === 'lessons' && (
                      <div className="space-y-2">
                        {lessons
                          .filter(lesson => lesson.courseId === selectedCourse.id)
                          .map((lesson, index) => (
                            <motion.div
                              key={lesson.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                                currentLesson?.id === lesson.id
                                  ? 'bg-teal-500 text-white shadow-lg'
                                  : lesson.isLocked
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-white text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                              }`}
                              onClick={() => !lesson.isLocked && setCurrentLesson(lesson)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    currentLesson?.id === lesson.id
                                      ? 'bg-white/20'
                                      : 'bg-gray-100 text-gray-400'
                                  }`}>
                                    {index + 1}
                                  </div>
                                  <div>
                                    <div className={`font-medium text-sm ${
                                      currentLesson?.id === lesson.id ? 'text-white' : ''
                                    }`}>
                                      {lesson.title}
                                    </div>
                                    <div className={`text-xs ${
                                      currentLesson?.id === lesson.id ? 'text-white/80' : 'text-gray-500'
                                    }`}>
                                      {lesson.duration}
                                    </div>
                                  </div>
                                </div>
                                {lesson.isLocked && (
                                  <span className="text-xs">🔒</span>
                                )}
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    )}
                    {/* Resources */}
                    {activeSidebar === 'resources' && currentLesson && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 mb-3">Lesson Resources</h4>
                        {currentLesson.resources?.map((resource, index) => (
                          <motion.a
                            key={resource.name}
                            href={resource.url}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                                {resource.type === 'pdf' ? '📄' : resource.type === 'zip' ? '📦' : '📝'}
                              </div>
                              <div>
                                <div className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                                  {resource.name}
                                </div>
                                <div className="text-sm text-gray-500">{resource.size}</div>
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </motion.a>
                        ))}
                       
                        {(!currentLesson.resources || currentLesson.resources.length === 0) && (
                          <div className="text-center text-gray-500 py-8">
                            No resources available for this lesson
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* Video Player & Content */}
                <div className="flex-1 flex flex-col">
                  {currentLesson ? (
                    <>
                      {/* Video Player */}
                      <div className="flex-1 bg-black flex items-center justify-center relative">
                        <iframe
                          src={currentLesson.videoUrl}
                          title={currentLesson.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                      {/* Lesson Content */}
                      <div className="h-1/3 border-t border-gray-200 overflow-y-auto">
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-4">
                            {currentLesson.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {currentLesson.description}
                          </p>
                         
                          {/* Next Lesson Button */}
                          {getNextLesson() && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                              onClick={() => setCurrentLesson(getNextLesson())}
                            >
                              <span>Next: {getNextLesson()?.title}</span>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                      Select a lesson to start learning
                    </div>
                  )}
                </div>
                {/* Notes Panel */}
                {showNotes && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="w-80 border-l border-gray-200 bg-white overflow-y-auto"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">My Notes</h3>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Take notes for this lesson..."
                        className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 resize-none"
                      />
                      <div className="flex space-x-3 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                        >
                          Clear
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 bg-teal-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Save Notes
                        </motion.button>
                      </div>
                     
                      {/* Saved Notes */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-800 mb-3">Saved Notes</h4>
                        <div className="space-y-3">
                          {[1, 2, 3].map((note) => (
                            <div key={note} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                              <div className="text-sm text-gray-600">
                                Note from Lesson {note} - {new Date().toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;