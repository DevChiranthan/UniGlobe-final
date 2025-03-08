import React, { useState } from 'react';

const AddCollegeForm = ({ onCollegeAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    approvals: '',
    courseType: '',
    courseName: '',
    courseFee: '',
    cutoff: '',
    virtualTourLink: '',
    applyNowLink: '',
    brochureLink: '',
    reviewLink: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.virtualTourLink) {
      alert("Please provide a 360° VR campus tour link. If you don't have one, contact @vr360.ty or call 9739988810 (Indian number).");
      return;
    }

    const collegeData = {
      name: formData.name,
      location: formData.location,
      approvals: formData.approvals,
      courseType: formData.courseType,
      courseName: formData.courseName,
      courseFee: formData.courseFee,
      cutoff: formData.cutoff,
      reviewLink: formData.reviewLink,
      views: 0,
      clicks: 0,
      applications: 0,
      virtualTour: true,
      virtualTourLink: formData.virtualTourLink,
      applyNowLink: formData.applyNowLink,
      brochureLink: formData.brochureLink,
      forCourses: ["All Colleges", formData.courseType],
      logo: formData.name.split(' ').map(word => word[0]).join('').substring(0, 3)
    };

    setSubmitStatus("Submitting...");
    try {
      const response = await fetch('http://localhost:5000/api/colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collegeData)
      });
      
      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        responseData = { message: 'Could not parse server response' };
      }
      
      if (response.ok) {
        setSubmitStatus("College added successfully!");
        onCollegeAdded(responseData);
        
        setFormData({
          name: '',
          location: '',
          approvals: '',
          courseType: '',
          courseName: '',
          courseFee: '',
          cutoff: '',
          virtualTourLink: '',
          applyNowLink: '',
          brochureLink: '',
          reviewLink: ''
        });
      } else {
        setSubmitStatus("Error: " + (responseData.message || "Unknown error"));
        alert("Error adding college: " + (responseData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting college:", error);
      setSubmitStatus("Submission failed: " + error.message);
      alert("Error adding college: " + error.message);
    }
  };

  return (
    <div className="add-college-form">
      <h2>Add New College</h2>
      {submitStatus && <div className="submit-status">{submitStatus}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">College Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Ex: CMR University" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            placeholder="Ex: Bangalore, Karnataka" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="approvals">Approvals *</label>
          <input 
            type="text" 
            id="approvals" 
            name="approvals" 
            value={formData.approvals} 
            onChange={handleChange} 
            placeholder="Ex: AICTE, UGC Approved" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="courseType">Course Type *</label>
          <select 
            id="courseType" 
            name="courseType" 
            value={formData.courseType} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Course Type</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MBA">MBA</option>
            <option value="MBBS">MBBS</option>
            <option value="B.Com">B.Com</option>
            <option value="B.Sc">B.Sc</option>
            <option value="B.Sc (Nursing)">B.Sc (Nursing)</option>
            <option value="BA">BA</option>
            <option value="BBA">BBA</option>
            <option value="BCA">BCA</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="courseName">Course Name *</label>
          <input 
            type="text" 
            id="courseName" 
            name="courseName" 
            value={formData.courseName} 
            onChange={handleChange} 
            placeholder="Ex: Computer Science Engineering" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="courseFee">Course Fee (₹) *</label>
          <input 
            type="text" 
            id="courseFee" 
            name="courseFee" 
            value={formData.courseFee} 
            onChange={handleChange} 
            placeholder="Ex: 2,00,000" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cutoff">Entrance Exam Cutoff *</label>
          <input 
            type="text" 
            id="cutoff" 
            name="cutoff" 
            value={formData.cutoff} 
            onChange={handleChange} 
            placeholder="Ex: JEE-Advanced 2024 Cutoff: 75" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="applyNowLink">Apply Now Link *</label>
          <input 
            type="url" 
            id="applyNowLink" 
            name="applyNowLink" 
            value={formData.applyNowLink} 
            onChange={handleChange} 
            placeholder="Ex: https://university.edu/apply" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="brochureLink">Brochure Download Link *</label>
          <input 
            type="url" 
            id="brochureLink" 
            name="brochureLink" 
            value={formData.brochureLink} 
            onChange={handleChange} 
            placeholder="Ex: https://university.edu/brochure.pdf" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="reviewLink">Review Page Link *</label>
          <input 
            type="url" 
            id="reviewLink" 
            name="reviewLink" 
            value={formData.reviewLink} 
            onChange={handleChange} 
            placeholder="Ex: https://university.edu/reviews" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="virtualTourLink">360° VR Campus Tour Link *</label>
          <input 
            type="url" 
            id="virtualTourLink" 
            name="virtualTourLink" 
            value={formData.virtualTourLink} 
            onChange={handleChange} 
            placeholder="Ex: https://www.immersivetourz.com/university" 
            required 
          />
          <small className="tour-note">
            If you don't have a 360° VR tour, please contact <a href="https://vr360ty.com/">@vr360.ty</a> or call 9739988810 (Indian number).
          </small>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">Add College</button>
        </div>
      </form>
    </div>
  );
};

export default AddCollegeForm;