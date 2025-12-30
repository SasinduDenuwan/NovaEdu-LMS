import React, { useState, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { login, getMyDetails } from '../services/auth'; // Make sure you have a login service
import { useAuth } from '../context/authContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Required',
        text: 'Please enter your email!',
        confirmButtonColor: '#0d9488'
      });
      emailRef.current?.focus();
      return;
    }

    if (password.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Required',
        text: 'Please enter your password!',
        confirmButtonColor: '#0d9488'
      });
      passwordRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      const data: any = await login(email, password);

      if (data.data || data) {
         await Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: 'Login successful!',
          timer: 1500,
          showConfirmButton: false
        });
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('userID', data.data.userID);
        
        // Update Auth Context Immediately
        try {
            const userRes = await getMyDetails();
            if (userRes.data) {
                setUser(userRes.data);
            }
        } catch (error) {
            console.error("Failed to fetch user details after login", error);
        }

        navigate('/');
      }
    } catch (err: any) {
      console.error('Login Error: ', err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password. Please try again.',
        confirmButtonColor: '#d33'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 transform transition-all duration-500 hover:shadow-3xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div
              className="inline-block p-4 rounded-2xl mb-4 shadow-lg transform transition-transform hover:rotate-12 duration-300"
              style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #2563EB 100%)' }}
            >
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #0D9488 0%, #2563EB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#14B8A6] transition-colors duration-300 w-5 h-5" />
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#14B8A6] focus:outline-none transition-all duration-300 bg-[#F0FDFA] focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#14B8A6] transition-colors duration-300 w-5 h-5" />
                <input
                  ref={passwordRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#14B8A6] focus:outline-none transition-all duration-300 bg-[#F0FDFA] focus:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#14B8A6] transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded cursor-pointer"
                  style={{ accentColor: '#14B8A6' }}
                />
                <span className="ml-2 text-gray-600 group-hover:text-[#0D9488] transition-colors">Remember me</span>
              </label>
              <Link
                to="/forgot-pw"
                className="text-[#14B8A6] hover:text-[#0D9488] font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #2563EB 100%)' }}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-3 gap-3">
            {/* Google */}
            <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-[#14B8A6] hover:bg-[#F0FDFA] transition-all duration-300 transform hover:-translate-y-0.5">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            {/* Facebook */}
            <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-[#14B8A6] hover:bg-[#F0FDFA] transition-all duration-300 transform hover:-translate-y-0.5">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            {/* GitHub */}
            <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-[#14B8A6] hover:bg-[#F0FDFA] transition-all duration-300 transform hover:-translate-y-0.5">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#14B8A6] hover:text-[#0D9488] font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
      `}</style>
    </div>
  );
}
