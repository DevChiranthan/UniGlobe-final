// src/components/CourseNavigation.js
import React from 'react';

const CourseNavigation = ({ setActiveCourse }) => {
  const courses = [
    'All Colleges', 'B.Tech', 'MBA', 'M.Tech', 'MBBS', 'B.Com', 
    'B.Sc', 'B.Sc (Nursing)', 'BA', 'BBA', 'BCA'
  ];

  return (
    <nav className="bg-gray-800 py-3">
      <div className="container mx-auto flex overflow-x-auto justify-start md:justify-center space-x-4 p-2">
        {courses.map((course, index) => (
          <button 
            key={index} 
            className="text-gray-300 hover:text-orange-400 font-medium whitespace-nowrap transform hover:scale-110 transition-all duration-300"
            onClick={() => setActiveCourse(course)}
          >
            {course}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default CourseNavigation;
