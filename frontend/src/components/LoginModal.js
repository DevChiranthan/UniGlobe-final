import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css'; // Make sure your CSS file is properly linked

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
      onClose();
    } else {
      // Admin login logic - redirect to admin login page or handle directly
      navigate('/admin/login');
    }
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
              <div className="forgot-password">
                <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Forgot Password?</a>
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