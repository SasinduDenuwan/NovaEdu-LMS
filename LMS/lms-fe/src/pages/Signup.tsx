import React, { useState, useRef } from 'react';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register } from '../services/auth';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email.trim() === '') {
      toast.error("Please enter your email!");
      emailRef.current?.focus();
      return;
    }
    if (password.trim() === '') {
      toast.error("Please enter your password!");
      passwordRef.current?.focus();
      return;
    }
    if (confirmPassword.trim() === '') {
      toast.error("Please confirm your password!");
      confirmPasswordRef.current?.focus();
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      confirmPasswordRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      const data: any = await register(email, password);

      if (data) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (err: any) {
      console.error("Registration Error : ", err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 transform transition-all duration-500 hover:shadow-3xl">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block p-4 rounded-2xl mb-4 shadow-lg transform transition-transform hover:rotate-12 duration-300" style={{background: 'linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)'}}>
              <User className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Create Account
            </h1>
            <p className="text-gray-600">Start your journey with us today</p>
          </div>

          <div className="space-y-5">
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#6366F1] transition-colors duration-300 w-5 h-5" />
                <input
                  ref={emailRef}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6366F1] focus:outline-none transition-all duration-300 bg-[#EEF2FF] focus:bg-white"
                  placeholder="email"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#6366F1] transition-colors duration-300 w-5 h-5" />
                <input
                  ref={passwordRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6366F1] focus:outline-none transition-all duration-300 bg-[#EEF2FF] focus:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#6366F1] transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#6366F1] transition-colors duration-300 w-5 h-5" />
                <input
                  ref={confirmPasswordRef}
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6366F1] focus:outline-none transition-all duration-300 bg-[#EEF2FF] focus:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#6366F1] transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && (
                <p className={`mt-1 text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordsMatch ? 'Passwords match ' : 'Passwords do not match'}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              style={{background: 'linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)'}}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#6366F1] hover:text-[#4F46E5] font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}