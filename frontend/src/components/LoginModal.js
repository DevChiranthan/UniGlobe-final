import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'student') {
      // Student login logic
      console.log('Student login with:', email, password);
      // Add your student authentication logic here
      localStorage.setItem('studentAuth', 'true');
      localStorage.setItem('studentEmail', email);
      localStorage.setItem('studentName', email.split('@')[0]); // Default name from email
      onClose();
    } else {
      // Admin login logic - redirect to admin login page or handle directly
      navigate('/admin/login');
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    try {
      // Decode the JWT token from Google
      const decodedToken = jwtDecode(credentialResponse.credential);
      console.log('Google login successful:', decodedToken);
      
      // Store user info in localStorage
      localStorage.setItem('studentAuth', 'true');
      localStorage.setItem('studentEmail', decodedToken.email);
      localStorage.setItem('studentName', decodedToken.name);
      localStorage.setItem('studentPicture', decodedToken.picture);
      
      // Close the modal and redirect to home
      onClose();
      window.location.href = 'https://kaleidoscopic-taffy-eecc7c.netlify.app';
    } catch (error) {
      console.error('Error processing Google login:', error);
      setError('Failed to process Google sign-in. Please try again.');
    }
  };

  const handleGoogleLoginError = () => {
    setError('Google sign-in failed. Please try again or use email login.');
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <div className="login-modal-header">
          <div className="login-tabs">
            <button 
              className={`tab-btn ${activeTab === 'student' ? 'active' : ''}`}
              onClick={() => handleTabChange('student')}
            >
              Student Login
            </button>
            <button 
              className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => handleTabChange('admin')}
            >
              Admin Login
            </button>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="login-modal-body">
          {activeTab === 'student' ? (
            <form onSubmit={handleSubmit}>
              <h2>Student Login</h2>
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn">Login</button>
              
              <div className="login-divider">
                <span>OR</span>
              </div>
              
              <div className="google-login-container">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  useOneTap
                  theme="filled_blue"
                  text="signin_with"
                  shape="rectangular"
                  size="large"
                  width="100%"
                />
              </div>
              
              <div className="forgot-password">
                <button 
                  onClick={() => navigate('/reset-password')} 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 bg-transparent border-none cursor-pointer p-0"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          ) : (
            <div className="admin-redirect">
              <h2>Admin Access</h2>
              <p>You'll be redirected to the admin login page.</p>
              <button 
                className="submit-btn" 
                onClick={() => navigate('/admin/login')}
              >
                Continue to Admin Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;