// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header';
import CourseNavigation from './components/CourseNavigation';
import CollegesContainer from './components/CollegesContainer';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import LoadingScreen from './components/LoadingScreen';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  return children;
};

// Home page component
const Home = () => {
  const [activeCourse, setActiveCourse] = useState("All Colleges");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header onLoginClick={() => setIsModalOpen(true)} />
      <CourseNavigation setActiveCourse={setActiveCourse} />
      <main className="flex-grow">
        <CollegesContainer activeCourse={activeCourse} />
      </main>
      <Footer />
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulating initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <GoogleOAuthProvider clientId="575571794340-4n9k6pmk2davu94c3p1gfq3cvfte97ml.apps.googleusercontent.com">
      <Router>
        <Routes>
          {/* Main website route */}
          <Route path="/" element={<Home />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Loading screen demo route */}
          <Route path="/loading" element={<LoadingScreen />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;