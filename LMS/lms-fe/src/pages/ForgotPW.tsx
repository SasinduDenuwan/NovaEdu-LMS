import { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Email resent successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Forgot Password card */}
        <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 transform transition-all duration-500 hover:shadow-3xl">
          
          {!isSubmitted ? (
            // Reset Password Form
            <>
              {/* Header */}
              <div className="text-center mb-8 animate-fade-in">
                <div className="inline-block p-4 rounded-2xl mb-4 shadow-lg transform transition-transform hover:rotate-12 duration-300" style={{background: 'linear-gradient(135deg, #2DD4BF 0%, #3B82F6 100%)'}}>
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2" style={{
                  background: 'linear-gradient(135deg, #0D9488 0%, #2563EB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Forgot Password?
                </h1>
                <p className="text-gray-600">No worries, we'll send you reset instructions</p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Email input */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#2DD4BF] transition-colors duration-300 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2DD4BF] focus:outline-none transition-all duration-300 bg-[#F0FDFA] focus:bg-white"
                      placeholder="you@example.com"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Enter the email address associated with your account
                  </p>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !email}
                  className="w-full text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  style={{background: 'linear-gradient(135deg, #2DD4BF 0%, #3B82F6 100%)'}}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

                {/* Back to login */}
                <Link to="/login"
                  className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-[#0D9488] transition-colors duration-300 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back to Login</span>
                </Link>
              </div>
            </>
          ) : (
            // Success Message
            <div className="text-center animate-fade-in">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center p-4 rounded-full mb-6 animate-bounce-slow" style={{backgroundColor: '#F0FDFA'}}>
                <div className="flex items-center justify-center w-16 h-16 rounded-full" style={{background: 'linear-gradient(135deg, #2DD4BF 0%, #3B82F6 100%)'}}>
                  <Check className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Check Your Email
              </h2>
              <p className="text-gray-600 mb-2">
                We've sent password reset instructions to
              </p>
              <p className="text-[#0D9488] font-semibold mb-6">
                {email}
              </p>

              {/* Instructions */}
              <div className="bg-[#F0FDFA] rounded-xl p-4 mb-6 text-left">
                <p className="text-sm text-gray-700 mb-3 font-medium">
                  What's next?
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#14B8A6] mt-0.5">•</span>
                    <span>Check your email inbox and spam folder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#14B8A6] mt-0.5">•</span>
                    <span>Click the reset link in the email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#14B8A6] mt-0.5">•</span>
                    <span>Create a new secure password</span>
                  </li>
                </ul>
              </div>

              {/* Resend email */}
              <p className="text-sm text-gray-600 mb-4">
                Didn't receive the email?
              </p>
              <button
                onClick={handleResend}
                disabled={isLoading}
                className="text-[#14B8A6] hover:text-[#0D9488] font-semibold transition-colors duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Resend Email'}
              </button>

              {/* Back to login */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link to="/login" 
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#0D9488] transition-colors duration-300 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back to Login</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Help text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <button onClick={() => alert('Contact support')} className="text-[#14B8A6] hover:text-[#0D9488] font-semibold transition-colors">
              Contact Support
            </button>
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
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}