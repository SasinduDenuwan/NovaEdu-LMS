// AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  CreditCard,
  LogOut,
  Plus,
  Target,
  Image as ImageIcon,
  Trash2,
  Edit,
  Mail,
  Phone,
  MapPin,
  Camera,
  User,
  FileText,
  X,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { getInstructors, addInstructor, updateInstructor, deleteInstructor } from '../services/instructor';
// --- Interfaces ---
interface Student {
  id: number | string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  roles: string;
  createdAt: string;
  updatedAt: string;
}
interface Instructor {
  id?: number | string;
  _id?: string;
  name: string;
  role?: string;
  experience?: number;
  students?: number;
  courses?: number;
  image?: string;
  bio?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}
interface Course {
  id: number;
  title: string;
  instructor: number | string; // Instructor ID (matches backend reference)
  price: number;
  rating: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
  description: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  revenue: number;
  videos?: CourseVideo[];   
  resources?: CourseResource[];
}
interface CourseVideo {
  video_title: string;
  video_url: string;
  video_order: number;
}
interface CourseResource {
  resource_title: string;
  resource_url: string;
  resource_order: number;
}
interface Payment {
  id: number;
  student: string;
  course: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  method: string;
  transactionId: string;
}
const backgroundImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600'
];
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  // --- State ---
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'instructors' | 'courses' | 'payments'>('dashboard');
 
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentBg, setCurrentBg] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // --- Modal / Form State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'student' | 'instructor' | 'course' | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // --- Mock Data ---
  // --- Mock Data ---
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      firstname: 'John',
      lastname: 'Smith',
      email: 'john.smith@example.com',
      roles: 'STUDENT',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      firstname: 'Sarah',
      lastname: 'Johnson',
      email: 'sarah.j@example.com',
      roles: 'STUDENT',
      createdAt: '2024-02-10',
      updatedAt: '2024-02-10'
    },
    {
      id: 3,
      firstname: 'Mike',
      lastname: 'Chen',
      email: 'mike.chen@example.com',
      roles: 'STUDENT',
      createdAt: '2024-01-28',
      updatedAt: '2024-03-10'
    },
  ]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await getInstructors();
        if (response.code === 200) {
            setInstructors(response.data);
        } else {
            console.error("Failed to fetch instructors:", response.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchInstructors();
  }, []);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 1, // Instructor ID
      price: 26500,
      rating: 4.8,
      students: 1245,
      duration: '12 hours',
      level: 'Intermediate',
      category: 'development',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      description: 'Master React with hooks, context API, and advanced patterns',
      status: 'published',
      createdAt: '2024-01-10',
      revenue: 32992500,
      videos: [
        { video_title: 'Introduction to React Hooks', video_url: 'https://youtube.com/watch?v=example1', video_order: 1 },
        { video_title: 'Context API Mastery', video_url: 'https://youtube.com/watch?v=example2', video_order: 2 }
      ],
      resources: [
        { resource_title: 'Project Source Code', resource_url: 'https://github.com/example/repo', resource_order: 1 },
        { resource_title: 'React Cheatsheet PDF', resource_url: 'https://example.com/cheatsheet.pdf', resource_order: 2 }
      ]
    },
    { id: 2, title: 'UI/UX Design Masterclass', instructor: 2, price: 23600, rating: 4.9, students: 892, duration: '15 hours', level: 'Beginner', category: 'design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400', description: 'Learn professional design principles and tools', status: 'published', createdAt: '2024-02-05', revenue: 21051200, videos: [], resources: [] },
    { id: 3, title: 'Full Stack JavaScript', instructor: 3, price: 29500, rating: 4.8, students: 2034, duration: '20 hours', level: 'Advanced', category: 'development', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', description: 'Become a full-stack developer with modern JavaScript', status: 'draft', createdAt: '2024-03-01', revenue: 0, videos: [], resources: [] }
  ]);
  const payments: Payment[] = [
    { id: 1, student: 'John Smith', course: 'Advanced React Development', amount: 26500, date: '2024-03-20', status: 'completed', method: 'Credit Card', transactionId: 'TXN_001' },
    { id: 2, student: 'Sarah Johnson', course: 'UI/UX Design Masterclass', amount: 23600, date: '2024-03-19', status: 'completed', method: 'PayPal', transactionId: 'TXN_002' },
    { id: 3, student: 'Mike Chen', course: 'Full Stack JavaScript', amount: 29500, date: '2024-03-18', status: 'pending', method: 'Bank Transfer', transactionId: 'TXN_003' },
  ];
  // --- Effects ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  useEffect(() => {
    if (isModalOpen) {
      if (modalMode === 'add') {
        if (modalType === 'student') {
          setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            roles: 'STUDENT',
          });
        } else if (modalType === 'instructor') {
          setFormData({
            name: '',
            role: '',
            experience: 0,
            students: 0,
            courses: 0,
            image: '',
            bio: '',
          });
        } else if (modalType === 'course') {
          setFormData({
            title: '',
            description: '',
            level: 'Beginner',
            category: 'development',
            image: '',
            students: 0,
            instructor: '', // Instructor ID
            price: 0,
            duration: '0 hours',
            status: 'draft',
            videos: [],
            resources: [],
            rating: 0,
            revenue: 0,
          });
        }
      } else {
        setFormData({ ...selectedItem });
      }
    }
  }, [isModalOpen, modalMode, modalType, selectedItem]);
  const deleteStudent = (id: number | string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(student => student.id !== id));
      toast.success('Student deleted successfully');
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: any) => {
           // Determine field name based on modal type or object structure
           if (modalType === 'student') {
             return { ...prev, profilePicLink: reader.result as string };
           } else {
             // For instructor and course
             return { ...prev, image: reader.result as string, imageFile: file };
           }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteCourse = (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(course => course.id !== id));
      toast.success('Course deleted successfully');
    }
  };
  const getInstructorName = (id: number | string) => {
    return instructors.find(i => i.id === id)?.name || 'Unknown';
  };
  // --- Handlers ---
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate('/login');
  };
  const openModal = (type: 'student' | 'instructor' | 'course', mode: 'add' | 'edit' | 'view', item?: any) => {
    setModalType(type);
    setModalMode(mode);
    setSelectedItem(item || null);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedItem(null);
      setModalType(null);
      setFormData(null);
    }, 300);
  };
  const handleSave = async () => {
    if (modalType === 'student') {
      if (modalMode === 'add') {
        const newStudent = {
          ...formData,
          id: students.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setStudents([...students, newStudent]);
        toast.success('Student added successfully');
      } else if (modalMode === 'edit') {
        setStudents(prev => prev.map(s => s.id === formData.id ? { ...formData, updatedAt: new Date().toISOString() } : s));
        toast.success('Student updated successfully');
      }
    } else if (modalType === 'instructor') {
      if (modalMode === 'add') {
        try {
          setIsSubmitting(true);
          // Use FormData for file upload
          const instructorData = new FormData();
          instructorData.append('name', formData.name);
          instructorData.append('role', formData.role);
          instructorData.append('experience', formData.experience.toString());
          // instructorData.append('students', formData.students.toString()); // Backend likely calculates this
          // instructorData.append('courses', formData.courses.toString());   // Backend likely calculates this
          instructorData.append('bio', formData.bio);
          if (formData.imageFile) {
            instructorData.append('image', formData.imageFile);
          }

          const response = await addInstructor(instructorData);
          if (response.code === 201 || response.code === 200) {
              setInstructors([...instructors, response.data]);
              toast.success('Instructor added successfully');
          } else {
              toast.error(response.message || 'Failed to add instructor');
          }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while adding instructor');
        } finally {
            setIsSubmitting(false);
          }
        } else if (modalMode === 'edit') {
        try {
          setIsSubmitting(true);
          const instructorData = new FormData();
          instructorData.append('id', formData.id || formData._id); // Ensure ID is sent
          instructorData.append('name', formData.name);
          instructorData.append('role', formData.role);
          instructorData.append('experience', formData.experience.toString());
          instructorData.append('bio', formData.bio);
          if (formData.imageFile) {
            instructorData.append('image', formData.imageFile);
          }

          const instructorId = formData.id || formData._id;
          const response = await updateInstructor(instructorId, instructorData);
          
          if (response.code === 200 || response.code === 201) {
            setInstructors(prev => prev.map(i => (i.id === formData.id || i.id === formData._id) ? response.data : i));
            toast.success('Instructor updated successfully');
          } else {
             toast.error(response.message || 'Failed to update instructor');
          }
        } catch (error) {
             console.error(error);
             toast.error('An error occurred while updating instructor');
        } finally {
             setIsSubmitting(false);
        }
      }
    } else if (modalType === 'course') {
      if (modalMode === 'add') {
        const newCourse = {
          ...formData,
          id: courses.length + 1,
          createdAt: new Date().toISOString(),
          revenue: 0,
          rating: 0,
          students: 0,
          // In real backend, videos and resources would be saved separately via CourseVideo and CourseResource models
          // Here, mock keeps them in course object
        };
        setCourses([...courses, newCourse]);
        toast.success('Course added successfully');
      } else if (modalMode === 'edit') {
        setCourses(prev => prev.map(c => c.id === formData.id ? { ...formData } : c));
        toast.success('Course updated successfully');
      }
    }
    closeModal();
  };

  const deleteInstructorHandler = async (id: string | number) => {
      if (window.confirm('Are you sure you want to disable this instructor?')) {
        try {
            const response = await deleteInstructor(id.toString());
            if (response.code === 200) {
                 toast.success('Instructor disabled successfully');
                 // For soft delete, we might want to keep it but mark inactive, or just remove from view.
                 // Assuming "disable" means remove from active list for now.
                 setInstructors(prev => prev.filter(inst => (inst.id !== id && inst._id !== id)));
            } else {
                 toast.error(response.message || 'Failed to disable instructor');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to disable instructor');
        }
      }
  };
  // --- Navigation ---
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={24} />, color: 'teal' },
    { id: 'students', label: 'Students', icon: <GraduationCap size={24} />, color: 'blue' },
    { id: 'instructors', label: 'Instructors', icon: <Users size={24} />, color: 'purple' },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={24} />, color: 'indigo' },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={24} />, color: 'teal' },
  ];
  // --- Filters ---
  // --- Filters ---
  const filteredStudents = students.filter(student =>
    (student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPayments = payments.filter(payment =>
    payment.student.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // --- Calculations ---
  const totalStudents = students.length;
  const totalInstructors = instructors.length;
  const publishedCourses = courses.filter(c => c.status === 'published').length;
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  // --- Helper Colors ---
  // --- Helper Colors ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': case 'published': case 'completed': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'INACTIVE': case 'draft': case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'REJECTED': case 'suspended': case 'archived': case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'refunded': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Advanced': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
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
              className={`absolute w-${item % 2 === 0 ? '4' : '6'} h-${item % 2 === 0 ? '4' : '6'} rounded-full bg-linear-to-r from-teal-400 to-blue-400 opacity-30`}
              style={{
                left: `${(item * 15) % 100}%`,
                top: `${(item * 20) % 100}%`,
              }}
            />
          ))}
        </div>
      </div>
      {/* Admin Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl border-r border-white/20 flex flex-col w-80 transition-all duration-500 fixed h-full z-40 shadow-xl"
      >
        {/* Admin Profile */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-linear-to-br from-teal-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">AD</div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-400 rounded-full border-2 border-white"></div>
            </div>
           
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
              <div className="font-bold text-gray-800 truncate text-lg">Admin User</div>
              <div className="text-sm text-teal-600 truncate">Super Administrator</div>
            </motion.div>
           
          </div>
        </div>
        {/* Navigation Menu */}
        <nav className="flex-1 p-6 space-y-3">
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
              }`}
            >
              <span className="text-gray-600">{item.icon}</span>
             
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 text-left text-lg">{item.label}</motion.span>
             
            </motion.button>
          ))}
        </nav>
        <div className="px-6 pb-2">
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 p-4 rounded-2xl font-semibold transition-all duration-300 text-red-500 hover:bg-red-50 hover:shadow-md"
            >
              <span className="text-gray-600"><LogOut size={24} /></span>
             
              <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 text-left text-lg"
                >
                  Logout
                </motion.span>
             
            </motion.button>
        </div>
      </motion.div>
      {/* Main Content */}
      <div className="flex-1 transition-all duration-500 ml-80 relative z-10">
       
        {/* Admin Header */}
        <header className="bg-white/60 backdrop-blur-xl border-b border-white/20 sticky top-0 z-30">
          <div className="flex items-center justify-between px-8 py-6">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-br from-teal-600 to-indigo-600 bg-clip-text text-transparent capitalize">
                {activeTab}
              </h1>
              <p className="text-gray-500 text-lg mt-2">
                {activeTab === 'dashboard' && 'Platform overview and analytics'}
                {activeTab === 'students' && 'Manage student accounts and progress'}
                {activeTab === 'instructors' && 'Manage instructors and teaching staff'}
                {activeTab === 'courses' && 'Course management and content'}
                {activeTab === 'payments' && 'Payment history and transactions'}
              </p>
            </div>
          </div>
        </header>
        {/* Admin Content */}
        <main className="p-8">
          <AnimatePresence mode="wait">
           
            {/* --- DASHBOARD TAB --- */}
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                {/* Welcome Section - REMOVED for cleaner look */}
               
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Students', value: totalStudents.toString(), icon: <GraduationCap size={24} />, color: 'teal', change: '+12%' },
                    { label: 'Total Instructors', value: totalInstructors.toString(), icon: <Users size={24} />, color: 'purple', change: '+4%' },
                    { label: 'Active Courses', value: publishedCourses.toString(), icon: <BookOpen size={24} />, color: 'blue', change: '+5%' },
                    { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: <CreditCard size={24} />, color: 'indigo', change: '+23%' },
                  ].map((stat, index) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02, y: -5 }} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-${stat.color}-100 rounded-2xl flex items-center justify-center text-${stat.color}-600`}>{stat.icon}</div>
                        <span className="text-teal-600 font-bold text-sm bg-teal-50 px-2 py-1 rounded-lg">{stat.change}</span>
                      </div>
                      <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                {/* Quick Actions */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => openModal('student', 'add')} className="bg-white border border-gray-200 rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 group">
                      <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-teal-600"><Plus size={32} /></span>
                      </div>
                      <div className="font-semibold text-gray-800">Add Student</div>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => openModal('instructor', 'add')} className="bg-white border border-gray-200 rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 group">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-purple-600"><Users size={32} /></span>
                      </div>
                      <div className="font-semibold text-gray-800">Add Instructor</div>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => openModal('course', 'add')} className="bg-white border border-gray-200 rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 group">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-blue-600"><FileText size={32} /></span>
                      </div>
                      <div className="font-semibold text-gray-800">Create Course</div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
            {/* --- STUDENTS TAB --- */}
            {activeTab === 'students' && (
              <motion.div key="students" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
                    <p className="text-gray-600 text-lg mt-2">Manage student accounts, progress, and access</p>
                  </div>
                  <div className="flex space-x-4">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent opacity-0 pointer-events-none">
                      <option value="all">All Status</option>
                    </select>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => openModal('student', 'add')} className="px-6 py-3 bg-teal-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      Add Student
                    </motion.button>
                  </div>
                </div>
                {/* Students Table (Reverted to Modern Table) */}
                <div className="bg-white/80 backdrop-blur-xl rounded-4xl shadow-xl border border-white/60 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                          <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
                          <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Info</th>
                          <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Joined Date</th>
                          <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredStudents.map((student, index) => (
                          <motion.tr
                            key={student.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-white/60 transition-colors duration-200 group"
                          >
                            <td className="px-8 py-5">
                              <div className="flex items-center space-x-4">
                                <div className="p-0.5 rounded-2xl bg-linear-to-br from-blue-400 to-teal-400 shadow-sm">
                                  <User size={24} />
                                </div>
                                <div>
                                  <div className="font-bold text-gray-800 text-base">{student.firstname} {student.lastname}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                                <div className="space-y-1">
                                  <div className="flex items-center text-gray-700 font-medium text-sm">
                                    <Mail size={12} className="mr-2 text-teal-500" />
                                    {student.email}
                                  </div>
                                </div>
                            </td>
                            <td className="px-8 py-5 text-gray-600 text-sm font-medium">
                                {new Date(student.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex space-x-2">
                                <button onClick={() => openModal('student', 'edit', student)} className="p-2 text-teal-600 hover:bg-teal-50 rounded-xl transition-colors" title="Edit">
                                  <Edit size={18}/>
                                </button>
                                <button onClick={() => deleteStudent(student.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="Delete">
                                  <Trash2 size={18}/>
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
            {/* --- INSTRUCTORS TAB --- */}
            {activeTab === 'instructors' && (
              <motion.div key="instructors" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                 <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">Instructor Management</h1>
                    <p className="text-gray-600 text-lg mt-2">Manage course instructors and teaching staff</p>
                  </div>
                  <div className="flex space-x-4">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent opacity-0 pointer-events-none">
                      <option value="all">All Status</option>
                    </select>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => openModal('instructor', 'add')} className="px-6 py-3 bg-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      Add Instructor
                    </motion.button>
                  </div>
                </div>
                {/* Instructors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredInstructors.map((instructor, index) => (
                    <motion.div
                      key={instructor.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -10 }}
                      className="group relative"
                    >
                      {/* Animated Gradient Border */}
                      <div className="absolute -inset-0.5 bg-linear-to-r from-teal-400 via-purple-500 to-blue-500 rounded-[2.1rem] blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                     
                      {/* Card Content */}
                      <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-4xl p-6 border border-white/60 shadow-xl transition-all duration-500 overflow-hidden hover:bg-white/90">
                         {/* Decorative Background Elements */}
                         <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-purple-100/50 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-110"></div>
                        
                         <div className="relative z-10 flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                              <div className="relative">
                                <div className="p-1 rounded-2xl bg-linear-to-br from-teal-400 to-purple-500 shadow-lg">
                                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-white">
                                        <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-3 -right-3 bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">
                                  {instructor.experience}+ Years
                                </div>
                              </div>
                             
                              <div className="flex space-x-2">
                                 <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => openModal('instructor', 'edit', instructor)} className="p-2.5 bg-white text-gray-700 hover:text-purple-600 rounded-xl shadow-sm border border-gray-100 transition-colors">
                                    <Edit size={16} />
                                 </motion.button>
                                 <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => deleteInstructorHandler(instructor._id || instructor.id!)} className="p-2.5 bg-white text-gray-700 hover:text-red-500 rounded-xl shadow-sm border border-gray-100 transition-colors">
                                    <Trash2 size={16} />
                                 </motion.button>
                              </div>
                            </div>
                            {/* Info */}
                            <div className="mb-4">
                               <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">{instructor.name}</h3>
                               <p className="text-sm font-semibold text-purple-600 tracking-wide uppercase">{instructor.role}</p>
                            </div>
                           
                            <p className="text-gray-500 text-sm mb-8 grow line-clamp-3 leading-relaxed">
                              {instructor.bio}
                            </p>
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                               <div className="bg-white/60 rounded-2xl p-3 border border-gray-100 group-hover:border-purple-200 group-hover:bg-purple-50/50 transition-all duration-300">
                                  <div className="flex items-center justify-between mb-1">
                                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Courses</div>
                                      <BookOpen size={14} className="text-purple-400" />
                                  </div>
                                  <div className="font-bold text-gray-800 text-lg">{instructor.courses}</div>
                               </div>
                               <div className="bg-white/60 rounded-2xl p-3 border border-gray-100 group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-all duration-300">
                                  <div className="flex items-center justify-between mb-1">
                                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Students</div>
                                      <Users size={14} className="text-blue-400" />
                                  </div>
                                  <div className="font-bold text-gray-800 text-lg">{instructor.students}</div>
                               </div>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {/* --- COURSES TAB --- */}
            {activeTab === 'courses' && (
              <motion.div key="courses" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
                    <p className="text-gray-600 text-lg mt-2">Create, edit, and manage course content</p>
                  </div>
                  <div className="flex space-x-4">
                    {/* <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select> */}
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => openModal('course', 'add')} className="px-6 py-3 bg-teal-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      Add Course
                    </motion.button>
                  </div>
                </div>
                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }} 
                      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                      className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:border-teal-200 transition-all duration-500"
                    >
                      <div className="relative overflow-hidden">
                        <img src={course.image} alt={course.title} className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110" />
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6 text-white">
                          <h3 className="font-bold text-xl mb-2 line-clamp-2">{course.title}</h3>
                          <p className="text-white/80 text-sm">{getInstructorName(course.instructor)}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-4 py-2 rounded-2xl text-sm font-semibold border ${getLevelColor(course.level)}`}>{course.level}</span>
                          <div className="flex items-center space-x-1 text-yellow-500">
                            {/* <span className="text-lg">★</span>
                            <span className="text-gray-700 font-bold">{course.rating}</span> */}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-6 line-clamp-2">{course.description}</p>
                        <div className="mb-6">
                          <div className="flex items-center justify-center space-x-2 bg-gray-50/50 rounded-2xl p-3">
                             <Users size={20} className="text-blue-500" />
                             <span className="text-2xl font-bold text-gray-800">{course.students}</span>
                             <span className="text-sm font-medium text-gray-500">Students</span>
                          </div>
                        </div>
                        <div className="flex space-x-3 pt-4 border-t border-gray-100">
                          <button onClick={() => openModal('course', 'view', course)} className="flex-1 py-3 text-teal-600 border border-teal-200 rounded-2xl font-bold hover:bg-teal-50 transition-colors">View</button>
                          <button onClick={() => openModal('course', 'edit', course)} className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/30">Edit</button>
                          <button onClick={() => deleteCourse(course.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="Delete">
                            <Trash2 size={18}/>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {/* --- PAYMENTS TAB --- */}
            {activeTab === 'payments' && (
              <motion.div key="payments" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="flex items-center justify-between">
                   <h1 className="text-3xl font-bold text-gray-800">Payment Management</h1>
                   <button className="px-6 py-3 bg-teal-500 text-white rounded-2xl font-semibold shadow-lg">Export Report</button>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-200">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Transaction ID</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Student</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredPayments.map((payment, index) => (
                          <motion.tr key={payment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4 font-mono text-sm text-gray-600">{payment.transactionId}</td>
                            <td className="px-6 py-4 font-semibold text-gray-800">{payment.student}</td>
                            <td className="px-6 py-4 font-bold text-gray-800">₹{payment.amount}</td>
                            <td className="px-6 py-4 text-gray-600">{payment.date}</td>
                            <td className="px-6 py-4"><span className={`px-3 py-1 rounded-2xl text-xs font-semibold border ${getStatusColor(payment.status)}`}>{payment.status}</span></td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      {/* --- CENTERED MODAL (Add/Edit/View) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 w-full shadow-2xl overflow-hidden border border-white/50 max-h-[90vh] flex flex-col ${modalType === 'course' ? 'max-w-4xl' : 'max-w-2xl'}`}
            >
                {/* Decorative Elements */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-teal-200/30 via-purple-200/30 to-transparent rounded-bl-full pointer-events-none -mr-20 -mt-20"></div>
              <div className="relative z-10 flex flex-col flex-1 min-h-0">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8 shrink-0">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 bg-clip-text bg-linear-to-r from-teal-600 to-purple-600">
                        {modalMode === 'add' ? `New ${modalType === 'student' ? 'Student' : modalType === 'instructor' ? 'Instructor' : 'Course'}` :
                         modalMode === 'edit' ? `Edit ${modalType === 'student' ? 'Student' : modalType === 'instructor' ? 'Instructor' : 'Course'}` : 'View Details'}
                        </h2>
                         <p className="text-gray-500 mt-1">Fill in the details below to update the system.</p>
                    </div>
                    <button onClick={closeModal} className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  {/* MODAL BODY (Scrollable) */}
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {/* --- STUDENT FIELDS --- */}
                   {modalType === 'student' && formData && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">First Name</label>
                           <input disabled={modalMode === 'view'} value={formData.firstname || ''} onChange={(e) => setFormData({...formData, firstname: e.target.value})} type="text" className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/50 text-gray-800 font-medium placeholder-gray-400 transition-all" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Last Name</label>
                           <input disabled={modalMode === 'view'} value={formData.lastname || ''} onChange={(e) => setFormData({...formData, lastname: e.target.value})} type="text" className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/50 text-gray-800 font-medium placeholder-gray-400 transition-all" placeholder="Doe" />
                        </div>
                      </div>
                     
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                         <input disabled={modalMode === 'view'} value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/50 text-gray-800 font-medium placeholder-gray-400 transition-all" placeholder="email@example.com" />
                      </div>

                      {modalMode === 'add' && (
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                           <div className="relative">
                             <input value={formData.password || ''} onChange={(e) => setFormData({...formData, password: e.target.value})} type={showPassword ? "text" : "password"} className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/50 text-gray-800 font-medium placeholder-gray-400 transition-all pr-12" placeholder="••••••••" />
                             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors">
                               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                             </button>
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                  {/* --- INSTRUCTOR FIELDS --- */}
                  {modalType === 'instructor' && formData && (
                    <div className="space-y-6">
                        {/* Image Upload Area */}
                      <div className="flex flex-col items-center justify-center mb-6">
                        <div className="relative group cursor-pointer" onClick={() => modalMode !== 'view' && document.getElementById('instructor-upload')?.click()}>
                            <div className="w-32 h-32 rounded-4xl overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center relative">
                                {formData.image ? <img src={formData.image} className="w-full h-full object-cover" alt="Avatar" /> : <User size={48} className="text-gray-300" />}
                                {modalMode !== 'view' && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera size={24} className="text-white" />
                                    </div>
                                )}
                            </div>
                            {modalMode !== 'view' && (
                                <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-xl shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                                   <Plus size={16} />
                                </div>
                            )}
                        </div>
                        {modalMode !== 'view' && (
                           <>
                             <input id="instructor-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                             <p className="text-xs text-gray-400 mt-3 font-medium">Click to upload photo</p>
                           </>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                           <input disabled={modalMode === 'view'} value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-purple-500/50 text-gray-800 font-medium placeholder-gray-400 transition-all" placeholder="Dr. Smith" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Role</label>
                           <input disabled={modalMode === 'view'} value={formData.role || ''} onChange={(e) => setFormData({...formData, role: e.target.value})} type="text" className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-purple-500/50 text-gray-800 font-medium placeholder-gray-400 transition-all" placeholder="Senior Lecturer" />
                        </div>
                      </div>
                     
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Experience (Years)</label>
                           <input disabled={modalMode === 'view'} value={formData.experience || 0} onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value) || 0})} type="number" className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-purple-500/50 text-gray-800 font-medium placeholder-gray-400 transition-all" placeholder="5" />
                        </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Bio</label>
                         <textarea disabled={modalMode === 'view'} value={formData.bio || ''} onChange={(e) => setFormData({...formData, bio: e.target.value})} rows={4} className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-purple-500/50 text-gray-800 font-medium placeholder-gray-400 transition-all resize-none" placeholder="Brief biography..." />
                      </div>
                    </div>
                  )}
                  {/* --- COURSE FIELDS --- */}
                  {modalType === 'course' && formData && (
                    <div className="space-y-6">
                      <div className="h-48 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 relative">
                        {formData.image ? <img src={formData.image} className="w-full h-full object-cover" alt="Course" /> : <ImageIcon size={40} className="text-gray-400" />}
                      </div>
                      {/* Basic Info */}
                       <div className="space-y-6">
                          <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">Basic Information</h3>
                          <div className="flex flex-col items-center justify-center mb-6">
                            <div className="relative group cursor-pointer" onClick={() => modalMode !== 'view' && document.getElementById('course-upload')?.click()}>
                                <div className="w-full h-48 rounded-4xl overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center relative">
                                    {formData.image ? <img src={formData.image} className="w-full h-full object-cover" alt="Course" /> : <div className="text-gray-300 flex flex-col items-center"><User size={48} /> <span className="text-sm mt-2">Cover Image</span></div>}
                                    {modalMode !== 'view' && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera size={24} className="text-white" />
                                        </div>
                                    )}
                                </div>
                                {modalMode !== 'view' && (
                                    <div className="absolute -bottom-2 -right-2 bg-teal-500 text-white p-2 rounded-xl shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                                       <Plus size={16} />
                                    </div>
                                )}
                            </div>
                            {modalMode !== 'view' && (
                               <>
                                 <input id="course-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                 <p className="text-xs text-gray-400 mt-3 font-medium">Click to upload cover image</p>
                               </>
                            )}
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Course Title</label>
                             <input disabled={modalMode === 'view'} value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} type="text" className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/50 text-gray-800 font-medium placeholder-gray-400 transition-all" placeholder="Mastering React..." />
                          </div>
                         
                          <div className="space-y-2">
                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Description</label>
                             <textarea disabled={modalMode === 'view'} value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/50 text-gray-800 font-medium placeholder-gray-400 transition-all h-32 resize-none" placeholder="Course description..." />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Level</label>
                                <select disabled={modalMode === 'view'} value={formData.level || 'Beginner'} onChange={(e) => setFormData({...formData, level: e.target.value})} className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/50 text-gray-800 font-medium transition-all cursor-pointer">
                                  <option value="Beginner">Beginner</option>
                                  <option value="Intermediate">Intermediate</option>
                                  <option value="Advanced">Advanced</option>
                                </select>
                             </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Category</label>
                                <select disabled={modalMode === 'view'} value={formData.category || 'development'} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/50 text-gray-800 font-medium transition-all cursor-pointer">
                                  <option value="development">Development</option>
                                  <option value="design">Design</option>
                                  <option value="business">Business</option>
                                  <option value="marketing">Marketing</option>
                                </select>
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Price (₹)</label>
                               <input disabled={modalMode === 'view'} value={formData.price || 0} onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})} type="number" className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/50 text-gray-800 font-medium placeholder-gray-400 transition-all" placeholder="4999" />
                            </div>
                            {/* Status field removed as per requirement */}
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Instructor</label>
                            <select disabled={modalMode === 'view'} value={formData.instructor || ''} onChange={(e) => setFormData({...formData, instructor: e.target.value})} className="w-full px-5 py-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/50 text-gray-800 font-medium transition-all cursor-pointer">
                              <option value="">Select Instructor</option>
                              {instructors.map((inst) => (
                                <option key={inst.id} value={inst.id}>
                                  {inst.name}
                                </option>
                              ))}
                            </select>
                          </div>
                      </div>
                      {/* Content Management (Videos & Resources) */}
                      {(modalMode !== 'view' || (formData.videos?.length > 0 || formData.resources?.length > 0)) && (
                        <div className="space-y-8 pt-6 border-t border-gray-100">
                          {/* Videos Section */}
                          <div className="space-y-4">
                             <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800">Course Videos ({formData.videos?.length || 0})</h3>
                             </div>
                            
                             <div className="space-y-3">
                                {formData.videos?.map((video: any, idx: number) => (
                                   <div key={idx} className="bg-white/50 rounded-2xl p-4 border border-gray-100 flex gap-4 items-start group hover:border-indigo-200 transition-colors">
                                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 mt-2">
                                         {video.video_order || idx + 1}
                                      </div>
                                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                         <input
                                            disabled={modalMode === 'view'}
                                            placeholder="Video Title"
                                            value={video.video_title}
                                            onChange={(e) => {
                                                const newVideos = [...formData.videos];
                                                newVideos[idx].video_title = e.target.value;
                                                setFormData({ ...formData, videos: newVideos });
                                            }}
                                            className="w-full px-4 py-3 bg-white rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium border-none"
                                         />
                                         <div className="relative w-full">
                                            <input
                                                disabled={modalMode === 'view'}
                                                placeholder="Video URL (e.g. YouTube/Vimeo)"
                                                value={video.video_url}
                                                onChange={(e) => {
                                                    const newVideos = [...formData.videos];
                                                    newVideos[idx].video_url = e.target.value;
                                                    setFormData({ ...formData, videos: newVideos });
                                                }}
                                                className="w-full px-4 py-3 bg-white rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm border-none font-mono text-gray-600 pr-10"
                                            />
                                            {modalMode === 'view' && video.video_url && (
                                                <a href={video.video_url} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-3 text-indigo-600 hover:text-indigo-800" title="Open Link">
                                                    <ExternalLink size={16} />
                                                </a>
                                            )}
                                         </div>
                                      </div>
                                      {modalMode !== 'view' && (
                                          <button
                                            onClick={() => {
                                                const newVideos = formData.videos.filter((_: any, i: number) => i !== idx);
                                                setFormData({ ...formData, videos: newVideos });
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
                                          >
                                              <Trash2 size={16} />
                                          </button>
                                      )}
                                   </div>
                                ))}
                                {modalMode !== 'view' && (
                                    <button
                                      onClick={() => setFormData((prev: any) => ({
                                          ...prev,
                                          videos: [...(prev.videos || []), { video_title: '', video_url: '', video_order: (prev.videos?.length || 0) + 1 }]
                                      }))}
                                      className="w-full py-4 border-2 border-dashed border-indigo-200 rounded-2xl flex items-center justify-center text-indigo-500 font-bold hover:bg-indigo-50/50 hover:border-indigo-400 transition-all group"
                                    >
                                      <div className="flex items-center space-x-2 group-hover:scale-105 transition-transform">
                                          <span className="p-1 rounded-lg bg-indigo-100"><Plus size={20} /></span>
                                          <span>Add Video</span>
                                      </div>
                                    </button>
                                )}
                                {(!formData.videos || formData.videos.length === 0) && modalMode === 'view' && (
                                    <div className="text-center py-6 text-gray-400 text-sm italic border-2 border-dashed border-gray-200 rounded-2xl">
                                        No videos added yet.
                                    </div>
                                )}
                             </div>
                          </div>
                          {/* Resources Section */}
                          <div className="space-y-4">
                             <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800">Resources ({formData.resources?.length || 0})</h3>
                             </div>
                            
                             <div className="space-y-3">
                                {formData.resources?.map((resource: any, idx: number) => (
                                   <div key={idx} className="bg-white/50 rounded-2xl p-4 border border-gray-100 flex gap-4 items-start group hover:border-teal-200 transition-colors">
                                      <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0 mt-2">
                                         {resource.resource_order || idx + 1}
                                      </div>
                                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                         <input
                                            disabled={modalMode === 'view'}
                                            placeholder="Resource Title (e.g. PDF Guide)"
                                            value={resource.resource_title}
                                            onChange={(e) => {
                                                const newResources = [...formData.resources];
                                                newResources[idx].resource_title = e.target.value;
                                                setFormData({ ...formData, resources: newResources });
                                            }}
                                            className="w-full px-4 py-3 bg-white rounded-xl focus:ring-2 focus:ring-teal-500/20 text-sm font-medium border-none"
                                         />
                                         <div className="relative w-full">
                                            <input
                                                disabled={modalMode === 'view'}
                                                placeholder="Resource URL (Download Link)"
                                                value={resource.resource_url}
                                                onChange={(e) => {
                                                    const newResources = [...formData.resources];
                                                    newResources[idx].resource_url = e.target.value;
                                                    setFormData({ ...formData, resources: newResources });
                                                }}
                                                className="w-full px-4 py-3 bg-white rounded-xl focus:ring-2 focus:ring-teal-500/20 text-sm border-none font-mono text-gray-600 pr-10"
                                            />
                                            {modalMode === 'view' && resource.resource_url && (
                                                <a href={resource.resource_url} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-3 text-teal-600 hover:text-teal-800" title="Open Link">
                                                    <ExternalLink size={16} />
                                                </a>
                                            )}
                                         </div>
                                      </div>
                                      {modalMode !== 'view' && (
                                          <button
                                            onClick={() => {
                                                const newResources = formData.resources.filter((_: any, i: number) => i !== idx);
                                                setFormData({ ...formData, resources: newResources });
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
                                          >
                                              <Trash2 size={16} />
                                          </button>
                                      )}
                                   </div>
                                ))}
                                {modalMode !== 'view' && (
                                    <button
                                      onClick={() => setFormData((prev: any) => ({
                                          ...prev,
                                          resources: [...(prev.resources || []), { resource_title: '', resource_url: '', resource_order: (prev.resources?.length || 0) + 1 }]
                                      }))}
                                      className="w-full py-4 border-2 border-dashed border-teal-200 rounded-2xl flex items-center justify-center text-teal-500 font-bold hover:bg-teal-50/50 hover:border-teal-400 transition-all group"
                                    >
                                      <div className="flex items-center space-x-2 group-hover:scale-105 transition-transform">
                                          <span className="p-1 rounded-lg bg-teal-100"><Plus size={20} /></span>
                                          <span>Add Resource</span>
                                      </div>
                                    </button>
                                )}
                                {(!formData.resources || formData.resources.length === 0) && modalMode === 'view' && (
                                    <div className="text-center py-6 text-gray-400 text-sm italic border-2 border-dashed border-gray-200 rounded-2xl">
                                        No resources added yet.
                                    </div>
                                )}
                             </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  </div>
                  {/* Actions */}
                  <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-100 shrink-0">
                    <button onClick={closeModal} className="px-6 py-3 bg-white text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    {modalMode !== 'view' && (
                      <button 
                        onClick={handleSave} 
                        disabled={isSubmitting}
                        className={`px-8 py-3 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 ${modalType === 'student' ? 'bg-linear-to-r from-teal-500 to-emerald-500' : modalType === 'instructor' ? 'bg-linear-to-r from-purple-600 to-indigo-600' : 'bg-linear-to-r from-blue-500 to-cyan-500'} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting && <Loader2 className="animate-spin" size={20} />}
                        <span>{isSubmitting ? 'Saving...' : (modalMode === 'add' ? 'Create' : 'Save Changes')}</span>
                      </button>
                    )}
                  </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default AdminDashboard;