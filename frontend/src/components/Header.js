// src/components/Header.js
import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';

const Header = ({ onLoginClick, isAdmin, onLogout }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    // Use the prop if provided, otherwise use local state
    if (onLoginClick) {
      onLoginClick();
    } else {
      setIsLoginModalOpen(true);
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
                  Log Out
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