// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Search, User, LogOut } from 'lucide-react';
import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';

const Header = ({ onLoginClick, isAdmin, onLogout }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    picture: ''
  });

  useEffect(() => {
    // Check login status on component mount and localStorage changes
    const checkLoginStatus = () => {
      const studentAuth = localStorage.getItem('studentAuth') === 'true';
      setIsLoggedIn(studentAuth);
      
      if (studentAuth) {
        setStudentInfo({
          name: localStorage.getItem('studentName') || 'Student',
          email: localStorage.getItem('studentEmail') || '',
          picture: localStorage.getItem('studentPicture') || ''
        });
      }
    };

    checkLoginStatus();
    
    // Listen for storage events (in case another tab changes auth status)
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLoginClick = () => {
    // Use the prop if provided, otherwise use local state
    if (onLoginClick) {
      onLoginClick();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem('studentAuth');
    localStorage.removeItem('studentEmail');
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentPicture');
    
    // Update state
    setIsLoggedIn(false);
    setStudentInfo({ name: '', email: '', picture: '' });
    
    // If admin logout function exists, call it too
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4 animate-fadeIn">
        {/* Clickable logo that redirects to home page */}
        <Link to="/" className="text-2xl font-bold text-blue-400 mb-4 md:mb-0 animate-slideIn">
          <span className="text-orange-400">Uni</span>Globe
        </Link>
        
        <div className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-96 animate-slideIn" style={{ animationDelay: '100ms' }}>
            <input 
              type="text" 
              placeholder="Search for Colleges, Exams, Courses and More..." 
              className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-800 text-white border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>
          
          <div className="flex space-x-4 animate-slideIn" style={{ animationDelay: '200ms' }}>
            <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
              Contact Us
            </Link>
            
            {isAdmin ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 flex items-center transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <LogOut className="mr-2" size={18} /> Log Out
                </button>
              </div>
            ) : isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {studentInfo.picture && (
                  <img 
                    src={studentInfo.picture} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border-2 border-blue-400"
                  />
                )}
                <span className="text-white hidden md:inline">{studentInfo.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 flex items-center transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <LogOut className="mr-2" size={18} /> Log Out
                </button>
              </div>
            ) : (
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 flex items-center transition-all duration-300 transform hover:scale-105 active:scale-95"
                onClick={handleLoginClick}
              >
                <User className="mr-2" size={18} /> Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Only render LoginModal if we're using local state */}
      {!onLoginClick && (
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;