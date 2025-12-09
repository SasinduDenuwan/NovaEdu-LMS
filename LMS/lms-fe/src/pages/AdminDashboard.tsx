// AdminDashboard.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Interfaces ---
interface Student {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  courses: number;
  lastLogin: string;
  avatar: string;
}

interface Instructor {
  id: number;
  name: string;
  email: string;
  specialization: string;
  status: 'active' | 'inactive';
  rating: number;
  coursesCount: number;
  studentsCount: number;
  avatar: string;
}

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
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  revenue: number;
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

const AdminDashboard: React.FC = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'instructors' | 'courses' | 'payments'>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // --- Modal / Form State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'student' | 'instructor' | 'course' | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // --- Mock Data ---
  const students: Student[] = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', joinDate: '2024-01-15', status: 'active', courses: 3, lastLogin: '2024-03-20', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', joinDate: '2024-02-10', status: 'active', courses: 5, lastLogin: '2024-03-19', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
    { id: 3, name: 'Mike Chen', email: 'mike.chen@example.com', joinDate: '2024-01-28', status: 'inactive', courses: 2, lastLogin: '2024-03-10', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: 4, name: 'Emma Davis', email: 'emma.davis@example.com', joinDate: '2024-03-01', status: 'active', courses: 1, lastLogin: '2024-03-21', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { id: 5, name: 'Alex Rodriguez', email: 'alex.r@example.com', joinDate: '2024-02-22', status: 'suspended', courses: 0, lastLogin: '2024-03-05', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
  ];

  const instructors: Instructor[] = [
    { id: 1, name: 'Dr. Sarah Wilson', email: 'sarah.w@edulearn.com', specialization: 'Computer Science', status: 'active', rating: 4.9, coursesCount: 12, studentsCount: 1540, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
    { id: 2, name: 'Prof. James Carter', email: 'james.c@edulearn.com', specialization: 'UI/UX Design', status: 'active', rating: 4.7, coursesCount: 8, studentsCount: 890, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150' },
    { id: 3, name: 'Emily Zhang', email: 'emily.z@edulearn.com', specialization: 'Data Science', status: 'inactive', rating: 4.8, coursesCount: 5, studentsCount: 600, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
  ];

  const courses: Course[] = [
    { id: 1, title: 'Advanced React Development', instructor: 'Dr. Sarah Wilson', price: 26500, rating: 4.8, students: 1245, duration: '12 hours', level: 'Intermediate', category: 'development', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', description: 'Master React with hooks, context API, and advanced patterns', status: 'published', createdAt: '2024-01-10', revenue: 32992500 },
    { id: 2, title: 'UI/UX Design Masterclass', instructor: 'Prof. James Carter', price: 23600, rating: 4.9, students: 892, duration: '15 hours', level: 'Beginner', category: 'design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400', description: 'Learn professional design principles and tools', status: 'published', createdAt: '2024-02-05', revenue: 21051200 },
    { id: 3, title: 'Full Stack JavaScript', instructor: 'Emily Zhang', price: 29500, rating: 4.8, students: 2034, duration: '20 hours', level: 'Advanced', category: 'development', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', description: 'Become a full-stack developer with modern JavaScript', status: 'draft', createdAt: '2024-03-01', revenue: 0 }
  ];

  const payments: Payment[] = [
    { id: 1, student: 'John Smith', course: 'Advanced React Development', amount: 26500, date: '2024-03-20', status: 'completed', method: 'Credit Card', transactionId: 'TXN_001' },
    { id: 2, student: 'Sarah Johnson', course: 'UI/UX Design Masterclass', amount: 23600, date: '2024-03-19', status: 'completed', method: 'PayPal', transactionId: 'TXN_002' },
    { id: 3, student: 'Mike Chen', course: 'Full Stack JavaScript', amount: 29500, date: '2024-03-18', status: 'pending', method: 'Bank Transfer', transactionId: 'TXN_003' },
  ];

  // --- Handlers ---
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
    }, 300);
  };

  // --- Navigation ---
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', color: 'teal' },
    { id: 'students', label: 'Students', icon: '👨‍🎓', color: 'blue' },
    { id: 'instructors', label: 'Instructors', icon: '👨‍🏫', color: 'purple' },
    { id: 'courses', label: 'Courses', icon: '📚', color: 'indigo' },
    { id: 'payments', label: 'Payments', icon: '💰', color: 'teal' },
  ];

  // --- Filters ---
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || student.status === statusFilter)
  );

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || instructor.status === statusFilter)
  );

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || course.status === statusFilter)
  );

  const filteredPayments = payments.filter(payment =>
    payment.student.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || payment.status === statusFilter)
  );

  // --- Calculations ---
  const totalStudents = students.length;
  const totalInstructors = instructors.length;
  const publishedCourses = courses.filter(c => c.status === 'published').length;
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);

  // --- Helper Colors ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'published': case 'completed': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'inactive': case 'draft': case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'suspended': case 'archived': case 'failed': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
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
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-blue-50 flex">
      {/* Admin Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`bg-white/80 backdrop-blur-xl border-r border-white/20 flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-80'} transition-all duration-500 fixed h-full z-40 shadow-xl`}
      >
        {/* Logo */}
        <div className="p-8 border-b border-white/20">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <div className="w-12 h-12 bg-linear-to-br from-teal-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {!isSidebarCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
                <span className="text-2xl font-bold bg-linear-to-br from-teal-600 to-indigo-600 bg-clip-text text-transparent">Admin Panel</span>
                <div className="text-sm text-teal-600 font-medium">EduLearn Management</div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Admin Profile */}
        <div className="p-6 border-b border-white/20">
          <div className={`flex items-center space-x-4 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <div className="w-14 h-14 bg-linear-to-br from-teal-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">AD</div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-400 rounded-full border-2 border-white"></div>
            </div>
            {!isSidebarCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 truncate text-lg">Admin User</div>
                <div className="text-sm text-teal-600 truncate">Super Administrator</div>
              </motion.div>
            )}
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
              } ${isSidebarCollapsed ? 'justify-center' : ''}`}
            >
              <span className="text-2xl">{item.icon}</span>
              {!isSidebarCollapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 text-left text-lg">{item.label}</motion.span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="p-6 border-t border-white/20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`w-full flex items-center space-x-3 p-4 text-gray-600 hover:text-teal-600 hover:bg-white/50 rounded-2xl transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            <motion.div animate={{ rotate: isSidebarCollapsed ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-xl">
              {isSidebarCollapsed ? '➡️' : '⬅️'}
            </motion.div>
            {!isSidebarCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-semibold">Collapse</motion.span>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-500 ${isSidebarCollapsed ? 'ml-20' : 'ml-80'}`}>
        
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
            <div className="flex items-center space-x-6">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-6 py-4 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 w-80 text-lg shadow-lg"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</div>
              </div>
              {/* Notifications */}
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-2xl">🔔</div>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border-2 border-white"></span>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Admin Content */}
        <main className="p-8">
          <AnimatePresence mode="wait">
            
            {/* --- DASHBOARD TAB --- */}
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-linear-to-br from-teal-500 via-indigo-500 to-blue-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome, Admin! 🎯</h1>
                    <p className="text-teal-100 text-xl max-w-2xl">Manage your platform efficiently with real-time insights and powerful tools.</p>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
                </div>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Students', value: totalStudents.toString(), icon: '👨‍🎓', color: 'teal', change: '+12%' },
                    { label: 'Total Instructors', value: totalInstructors.toString(), icon: '👨‍🏫', color: 'purple', change: '+4%' },
                    { label: 'Active Courses', value: publishedCourses.toString(), icon: '📚', color: 'blue', change: '+5%' },
                    { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: '💰', color: 'indigo', change: '+23%' },
                  ].map((stat, index) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02, y: -5 }} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-${stat.color}-100 rounded-2xl flex items-center justify-center`}><span className="text-2xl">{stat.icon}</span></div>
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
                        <span className="text-2xl">➕</span>
                      </div>
                      <div className="font-semibold text-gray-800">Add Student</div>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => openModal('instructor', 'add')} className="bg-white border border-gray-200 rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 group">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl">👨‍🏫</span>
                      </div>
                      <div className="font-semibold text-gray-800">Add Instructor</div>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => openModal('course', 'add')} className="bg-white border border-gray-200 rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 group">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl">📝</span>
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
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => openModal('student', 'add')} className="px-6 py-3 bg-teal-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      Add Student
                    </motion.button>
                  </div>
                </div>
                {/* Students Table */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-200">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Student</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Join Date</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Courses</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredStudents.map((student, index) => (
                          <motion.tr key={student.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }} className="hover:bg-gray-50/50 transition-colors duration-200">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-2xl object-cover" />
                                <div className="font-semibold text-gray-800">{student.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{student.email}</td>
                            <td className="px-6 py-4 text-gray-600">{student.joinDate}</td>
                            <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-2xl text-sm font-semibold">{student.courses} courses</span></td>
                            <td className="px-6 py-4"><span className={`px-3 py-1 rounded-2xl text-xs font-semibold border ${getStatusColor(student.status)}`}>{student.status}</span></td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-3">
                                <button onClick={() => openModal('student', 'view', student)} className="text-teal-600 font-semibold hover:text-teal-800 transition-colors">View</button>
                                <button onClick={() => openModal('student', 'edit', student)} className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">Edit</button>
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
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => openModal('instructor', 'add')} className="px-6 py-3 bg-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      Add Instructor
                    </motion.button>
                  </div>
                </div>
                {/* Instructors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInstructors.map((instructor, index) => (
                    <motion.div
                      key={instructor.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                      className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:border-purple-200 transition-all duration-500"
                    >
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-6">
                           <img src={instructor.avatar} alt={instructor.name} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
                           <div>
                              <h3 className="font-bold text-xl text-gray-800">{instructor.name}</h3>
                              <p className="text-purple-600 font-medium text-sm">{instructor.specialization}</p>
                              <span className={`inline-block mt-2 px-3 py-1 rounded-2xl text-xs font-semibold border ${getStatusColor(instructor.status)}`}>{instructor.status}</span>
                           </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mb-6 divide-x divide-gray-100">
                           <div className="text-center">
                              <div className="font-bold text-gray-800 text-lg">{instructor.coursesCount}</div>
                              <div className="text-xs text-gray-500">Courses</div>
                           </div>
                           <div className="text-center">
                              <div className="font-bold text-gray-800 text-lg">{instructor.studentsCount}</div>
                              <div className="text-xs text-gray-500">Students</div>
                           </div>
                           <div className="text-center">
                              <div className="font-bold text-yellow-500 text-lg">⭐ {instructor.rating}</div>
                              <div className="text-xs text-gray-500">Rating</div>
                           </div>
                        </div>

                        <div className="flex space-x-3">
                           <button onClick={() => openModal('instructor', 'view', instructor)} className="flex-1 py-2.5 text-purple-600 border border-purple-200 rounded-xl font-bold hover:bg-purple-50 transition-colors">View Profile</button>
                           <button onClick={() => openModal('instructor', 'edit', instructor)} className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">Edit</button>
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
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
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
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-teal-600 px-4 py-2 rounded-2xl text-sm font-bold shadow-lg">{course.status}</div>
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6 text-white">
                          <h3 className="font-bold text-xl mb-2 line-clamp-2">{course.title}</h3>
                          <p className="text-white/80 text-sm">{course.instructor}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-4 py-2 rounded-2xl text-sm font-semibold border ${getLevelColor(course.level)}`}>{course.level}</span>
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <span className="text-lg">⭐</span>
                            <span className="text-gray-700 font-bold">{course.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-6 line-clamp-2">{course.description}</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">{course.students}</div>
                            <div className="text-sm text-gray-600">Students</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">₹{(course.revenue / 100000).toFixed(1)}L</div>
                            <div className="text-sm text-gray-600">Revenue</div>
                          </div>
                        </div>
                        <div className="flex space-x-3 pt-4 border-t border-gray-100">
                          <button onClick={() => openModal('course', 'view', course)} className="flex-1 py-3 text-teal-600 border border-teal-200 rounded-2xl font-bold hover:bg-teal-50 transition-colors">View</button>
                          <button onClick={() => openModal('course', 'edit', course)} className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/30">Edit</button>
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
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
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
              className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-white/20 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">
                    {modalMode} {modalType}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {modalMode === 'view' ? `Viewing ${modalType} details` : `Enter details to ${modalMode} ${modalType}`}
                  </p>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">✕</button>
              </div>

              {/* Modal Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-8">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  
                  {/* --- STUDENT FIELDS --- */}
                  {modalType === 'student' && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                          {selectedItem?.avatar ? <img src={selectedItem.avatar} className="w-full h-full object-cover" alt="Avatar" /> : <span className="text-3xl">👤</span>}
                        </div>
                        {modalMode !== 'view' && <button className="text-teal-600 font-bold hover:text-teal-700">Upload Photo</button>}
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                           <input disabled={modalMode === 'view'} defaultValue={selectedItem?.name} type="text" className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50" placeholder="John Doe" />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                           <select disabled={modalMode === 'view'} defaultValue={selectedItem?.status || 'active'} className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50">
                             <option value="active">Active</option>
                             <option value="inactive">Inactive</option>
                           </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <input disabled={modalMode === 'view'} defaultValue={selectedItem?.email} type="email" className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50" placeholder="email@example.com" />
                      </div>
                    </div>
                  )}

                  {/* --- INSTRUCTOR FIELDS --- */}
                  {modalType === 'instructor' && (
                    <div className="space-y-6">
                       <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                          {selectedItem?.avatar ? <img src={selectedItem.avatar} className="w-full h-full object-cover" alt="Avatar" /> : <span className="text-3xl">👨‍🏫</span>}
                        </div>
                        {modalMode !== 'view' && <button className="text-purple-600 font-bold hover:text-purple-700">Upload Photo</button>}
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                           <input disabled={modalMode === 'view'} defaultValue={selectedItem?.name} type="text" className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50" placeholder="Dr. Smith" />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Specialization</label>
                           <input disabled={modalMode === 'view'} defaultValue={selectedItem?.specialization} type="text" className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50" placeholder="Computer Science" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                           <input disabled={modalMode === 'view'} defaultValue={selectedItem?.email} type="email" className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50" placeholder="instructor@edulearn.com" />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                           <select disabled={modalMode === 'view'} defaultValue={selectedItem?.status || 'active'} className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50">
                             <option value="active">Active</option>
                             <option value="inactive">Inactive</option>
                           </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- COURSE FIELDS --- */}
                  {modalType === 'course' && (
                    <div className="space-y-6">
                      <div className="h-48 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 relative">
                        {selectedItem?.image ? <img src={selectedItem.image} className="w-full h-full object-cover" alt="Course" /> : <span className="text-gray-400 font-medium">Course Thumbnail</span>}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Course Title</label>
                        <input disabled={modalMode === 'view'} defaultValue={selectedItem?.title} type="text" className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50" placeholder="Advanced React..." />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                            <input disabled={modalMode === 'view'} defaultValue={selectedItem?.price} type="number" className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50" />
                         </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Level</label>
                            <select disabled={modalMode === 'view'} defaultValue={selectedItem?.level || 'Beginner'} className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50">
                              <option>Beginner</option>
                              <option>Intermediate</option>
                              <option>Advanced</option>
                            </select>
                         </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                        <textarea disabled={modalMode === 'view'} defaultValue={selectedItem?.description} rows={4} className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 resize-none" placeholder="Course content details..." />
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Modal Footer */}
              {modalMode !== 'view' && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex space-x-4">
                  <button onClick={closeModal} className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                  <button className={`flex-1 px-6 py-3 text-white rounded-2xl font-bold shadow-lg transition-colors 
                    ${modalType === 'student' ? 'bg-teal-600 hover:bg-teal-700' : 
                      modalType === 'instructor' ? 'bg-purple-600 hover:bg-purple-700' : 
                      'bg-indigo-600 hover:bg-indigo-700'}`}>
                    {modalMode === 'add' ? 'Create' : 'Save Changes'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;