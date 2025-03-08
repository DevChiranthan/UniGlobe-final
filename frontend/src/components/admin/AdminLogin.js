import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminStyles.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // Sample admin credentials for testing
  const testAdmin = {
    email: 'admin@uniglobe.com',
    password: 'admin123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      // In a real app, this would send data to your backend
      console.log('Signing up with:', email, password);
      
      // For demo purposes, we'll just pretend it worked
      localStorage.setItem('adminEmail', email);
      localStorage.setItem('adminAuth', true);
      navigate('/admin/dashboard');
    } else {
      // Simple validation for test account
      if (email === testAdmin.email && password === testAdmin.password) {
        localStorage.setItem('adminEmail', email);
        localStorage.setItem('adminAuth', true);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    }
  };

  const handleClose = () => {
    // Navigate back to the home page or any other route
    navigate('/');
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <button className="close-button" onClick={handleClose}>
          &times; {/* This is the close (X) symbol */}
        </button>
        
        <h2>{isSignUp ? 'Admin Sign Up' : 'Admin Login'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@college.edu"
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
          
          <button type="submit" className="admin-submit-btn">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        
        <p className="toggle-form">
          {isSignUp 
            ? 'Already have an account?' 
            : 'Don\'t have an account?'} 
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;