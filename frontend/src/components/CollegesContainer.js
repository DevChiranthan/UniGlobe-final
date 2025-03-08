import React, { useState, useEffect } from 'react';
import CollegeCard from './CollegeCard';

const CollegesContainer = ({ activeCourse }) => {
  const [colleges, setColleges] = useState([]);
  const [collegeCount, setCollegeCount] = useState(0);

  useEffect(() => {
    const initialColleges = [
      {
        _id: "fallback1",
        name: "CMR University",
        location: "Bangalore, Karnataka",
        approvals: "AICTE, UGC Approved",
        courseType: "B.Tech",
        courseName: "Computer Science Engineering",
        cutoff: "JEE-Advanced 2024 Cutoff: 75",
        courseFee: "₹2,00,000",
        feeDetails: "BE/B.Tech - 1st Year Fees",
        rating: 4.2,
        reviews: 187,
        logo: "CMR",
        virtualTour: true,
        forCourses: ["All Colleges", "B.Tech"]
      },
      {
        _id: "fallback2",
        name: "Vellore Institute of Technology",
        location: "Vellore, Tamil Nadu",
        approvals: "NAAC A++ Grade, UGC Approved",
        courseType: "M.Tech",
        courseName: "Computer Science and Engineering",
        cutoff: "VITMEE 2024 Cutoff: 650",
        courseFee: "₹1,85,000",
        feeDetails: "ME/M.Tech - 1st Year Fees",
        rating: 4.5,
        reviews: 205,
        logo: "VIT",
        virtualTour: true,
        forCourses: ["All Colleges", "M.Tech"]
      }
    ];

    const fetchColleges = async () => {
      try {
        const response = await fetch('https://uniglobe-final.onrender.com/api/colleges');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched colleges from backend:", data);
        if (data.length > 0) {
          const filteredColleges = data.filter(college => 
            college.forCourses && college.forCourses.includes(activeCourse)
          );
          setColleges(filteredColleges);
          setCollegeCount(filteredColleges.length);
        } else {
          console.warn("Backend returned empty array, using fallback data.");
          setColleges(initialColleges);
          setCollegeCount(initialColleges.length);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
        setColleges(initialColleges);
        setCollegeCount(initialColleges.length);
      }
    };

    fetchColleges();
  }, [activeCourse]);

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Found {collegeCount} Colleges</h2>
      {colleges.map(college => (
        <CollegeCard key={college._id || college.id} college={college} />
      ))}
    </div>
  );
};

export default CollegesContainer;
