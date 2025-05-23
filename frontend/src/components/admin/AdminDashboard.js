import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminStyles.css';
import AddCollegeForm from './AddCollegeForm';

const AdminDashboard = () => {
  const [colleges, setColleges] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalColleges: 0,
    totalViews: 0,
    totalClicks: 0,
    totalApplications: 0
  });
  const navigate = useNavigate();

  // Fetch colleges from backend and update stats
  const fetchColleges = async () => {
    try {
      const response = await fetch('https://uniglobe-final.onrender.com/api/colleges');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setColleges(data);
      const views = data.reduce((total, college) => total + (college.views || 0), 0);
      const clicks = data.reduce((total, college) => total + (college.clicks || 0), 0);
      const applications = data.reduce((total, college) => total + (college.applications || 0), 0);
      setStats({
        totalColleges: data.length,
        totalViews: views,
        totalClicks: clicks,
        totalApplications: applications
      });
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  useEffect(() => {
    // Check admin authentication
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
      return;
    }
    fetchColleges();

    // Check window size on initial load
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state based on window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const handleAddCollegeTab = () => {
    setActiveTab('addCollege');
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const handleViewDashboard = () => {
    setActiveTab('dashboard');
    fetchColleges(); // Refresh dashboard data
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const handleCollegeAdded = (newCollege) => {
    // Refresh college list after addition
    fetchColleges();
    setActiveTab('dashboard');
  };

  const handleClose = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`admin-dashboard-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <button className="close-button" onClick={handleClose}>
        &times;
      </button>
      
      {/* Hamburger Menu Toggle */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="toggle-icon"></span>
      </button>
      
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="admin-logo">
          <h2>Uni<span>Globe</span> Admin</h2>
        </div>
        <ul className="admin-menu">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={handleViewDashboard}>
            Dashboard
          </li>
          <li className={activeTab === 'addCollege' ? 'active' : ''} onClick={handleAddCollegeTab}>
            Add College
          </li>
          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <h2>Dashboard</h2>
            {colleges.length === 0 ? (
              <div className="no-colleges">
                <p>You haven't added any colleges yet.</p>
                <button onClick={handleAddCollegeTab}>Add Your First College</button>
              </div>
            ) : (
              <>
                <div className="stats-cards">
                  <div className="stat-card">
                    <h3>Total Colleges</h3>
                    <p className="stat-number">{stats.totalColleges}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Page Views</h3>
                    <p className="stat-number">{stats.totalViews}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Clicks</h3>
                    <p className="stat-number">{stats.totalClicks}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Applications Started</h3>
                    <p className="stat-number">{stats.totalApplications}</p>
                  </div>
                </div>
                <div className="colleges-list">
                  <h3>Your Colleges ({colleges.length})</h3>
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>College Name</th>
                          <th>Location</th>
                          <th>Course</th>
                          <th>Views</th>
                          <th>Clicks</th>
                          <th>Applications</th>
                        </tr>
                      </thead>
                      <tbody>
                        {colleges.map((college) => (
                          <tr key={college._id}>
                            <td>{college.name}</td>
                            <td>{college.location}</td>
                            <td>{college.courseType} - {college.courseName}</td>
                            <td>{college.views || 0}</td>
                            <td>{college.clicks || 0}</td>
                            <td>{college.applications || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'addCollege' && (
          <AddCollegeForm onCollegeAdded={handleCollegeAdded} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;