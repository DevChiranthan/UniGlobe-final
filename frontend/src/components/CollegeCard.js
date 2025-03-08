import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, MapPin, Plus, Star } from 'lucide-react';

const CollegeCard = ({ college }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  useEffect(() => {
    const trackView = async () => {
      try {
        console.log(`Tracked view for college: ${college.name}`);
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    };
    
    trackView();
  }, [college.name]);

  const trackClick = async (actionType) => {
    try {
      console.log(`Tracked ${actionType} click for college: ${college.name}`);
    } catch (error) {
      console.error(`Error tracking ${actionType}:`, error);
    }
  };

  return (
    <div className="college-card bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-gray-700 mb-6 hover:shadow-2xl">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:w-1/2">
          <div className="flex items-start">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-full p-3 mr-4 shadow-md border border-gray-600">
              <div className="w-14 h-14 flex items-center justify-center text-orange-400 font-bold text-xl">
                {college.logo}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors duration-200">{college.name}</h3>
              <p className="text-gray-400 flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-gray-500" /> 
                {college.location} | {college.approvals}
              </p>
              
              <div className="mt-4">
                <p className="text-orange-400 font-medium">{college.courseType} {college.courseName}</p>
                <p className="text-gray-400 text-sm">{college.cutoff}</p>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {college.applyNowLink ? (
                  <a 
                    href={college.applyNowLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick('apply')}
                    className="flex items-center text-orange-400 border border-orange-400 px-4 py-1 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <ArrowRight className="w-4 h-4 mr-1" /> Apply Now
                  </a>
                ) : (
                  <button className="flex items-center text-orange-400 border border-orange-400 px-4 py-1 rounded-full opacity-50 cursor-not-allowed">
                    <ArrowRight className="w-4 h-4 mr-1" /> Apply Now
                  </button>
                )}
                
                {college.brochureLink ? (
                  <a 
                    href={college.brochureLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick('brochure')}
                    className="flex items-center text-green-400 border border-green-400 px-4 py-1 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <Download className="w-4 h-4 mr-1" /> Download Brochure
                  </a>
                ) : (
                  <button className="flex items-center text-green-400 border border-green-400 px-4 py-1 rounded-full opacity-50 cursor-not-allowed">
                    <Download className="w-4 h-4 mr-1" /> Download Brochure
                  </button>
                )}
                
                <div className="relative">
                  <button 
                    className="flex items-center text-gray-400 border border-gray-500 px-4 py-1 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-300 shadow-sm"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add To Compare
                  </button>
                  {showTooltip && (
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg z-10 whitespace-nowrap">
                      Feature will be added soon
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-6 md:w-1/2 border-t md:border-t-0 md:border-l border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 bg-gray-800 p-3 rounded-lg shadow-inner border border-gray-700">
              <h4 className="text-gray-400 mb-1 text-sm">Course Fees</h4>
              <p className="text-xl font-bold text-white">{college.courseFee}</p>
              <p className="text-xs text-gray-400">{college.feeDetails}</p>
              <button className="text-orange-400 text-sm hover:underline mt-1 transition-all duration-200">Compare Fees</button>
            </div>
            
            <div className="md:col-span-1 bg-gray-800 p-3 rounded-lg shadow-inner border border-gray-700">
              <h4 className="text-gray-400 mb-1 text-sm">Student Reviews</h4>
              {college.reviewLink ? (
                <a 
                  href={college.reviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick('reviews')}
                  className="review-link block px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 text-center shadow-md flex items-center justify-center"
                >
                  <Star className="w-4 h-4 mr-1" /> View Reviews
                </a>
              ) : (
                <div className="px-3 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 rounded-lg cursor-not-allowed text-center shadow-md">
                  Reviews Not Available
                </div>
              )}
            </div>
            
            <div className="md:col-span-1 bg-gray-800 p-3 rounded-lg shadow-inner border border-gray-700">
              <h4 className="text-gray-400 mb-1 text-sm">View Campus</h4>
              {college.virtualTour && college.virtualTourLink ? (
                <a 
                  href={college.virtualTourLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick('virtualTour')}
                  className="block"
                >
                  <div className="relative w-full h-24 rounded-lg overflow-hidden group shadow-md border border-gray-600">
                    {/* Google Maps style background */}
                    <div className="absolute inset-0 w-full h-full">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/api/placeholder/400/320')",
                          filter: "saturate(0.8) brightness(0.8)"
                        }}
                      ></div>
                      
                      {/* Google Maps UI overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-30"></div>
                      
                      {/* Grid overlay for map-like appearance */}
                      <div className="absolute inset-0" style={{
                        backgroundImage: `
                          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }}></div>
                      
                      {/* Google Maps controls */}
                      <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-md shadow-md p-1 flex flex-col items-center">
                        <div className="w-4 h-4 flex items-center justify-center text-gray-500 mb-1">+</div>
                        <div className="w-4 h-px bg-gray-300"></div>
                        <div className="w-4 h-4 flex items-center justify-center text-gray-500">−</div>
                      </div>
                      
                      {/* Google Maps signature bottom left */}
                      <div className="absolute bottom-1 left-1 flex items-center">
                        <div className="h-3 w-12 bg-white bg-opacity-80 rounded-sm flex items-center justify-center">
                          <div className="h-2 w-8 bg-gray-400 rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* Bottom layer */}
                      <div className="absolute bottom-0 left-0 right-0 h-6 bg-black bg-opacity-20 flex items-center justify-center">
                        <div className="text-xs text-white font-medium">Virtual Tour</div>
                      </div>
                      
                      {/* Center map pin */}
                      <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-8 h-12 relative">
                          <div className="absolute bottom-0 w-8 h-8 bg-red-500 rounded-full transform translate-y-1/4 scale-75 opacity-20 animate-ping"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-8 bg-red-500 rounded-t-full rounded-b-full transform rotate-45 origin-bottom">
                              <div className="absolute top-1 left-1 right-1 bottom-4 bg-white rounded-t-full rounded-b-full transform rotate-45 origin-bottom flex items-center justify-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full transform -rotate-45"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="relative w-full h-24 rounded-lg overflow-hidden opacity-60 shadow-md border border-gray-600">
                  <div className="absolute inset-0 w-full h-full bg-gray-700"></div>
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}></div>
                  <div className="absolute top-2 right-2 bg-gray-600 bg-opacity-80 rounded-md p-1 flex flex-col items-center">
                    <div className="w-4 h-4 flex items-center justify-center text-gray-400 mb-1">+</div>
                    <div className="w-4 h-px bg-gray-500"></div>
                    <div className="w-4 h-4 flex items-center justify-center text-gray-400">−</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-400 text-center font-medium text-sm">
                      Not Available
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;