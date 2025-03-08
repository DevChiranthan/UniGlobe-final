// src/components/Footer.js
import React from 'react';
import { Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-orange-400">Top Colleges</h3>
            <ul className="space-y-2">
              <li><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">M.B.A</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">B.Tech/B.E</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">MCA</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">BCA</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">M.Tech</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-orange-400">Top Universities</h3>
            <ul className="space-y-2">
              <li><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Engineering</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Management</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Medical</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Law</a></li>
              <li><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Commerce</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-orange-400">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@uniglobe.com</span>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4 text-orange-400">About UniGlobe</h3>
            <p className="mb-4 text-gray-400">UniGlobe helps students find the right college, university, and course to shape their future. We provide comprehensive information about educational institutions across India.</p>
            <div className="flex space-x-4">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">About Us</a>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Terms & Conditions</a>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">© 2025 UniGlobe. All Rights Reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300">
              Facebook
            </a>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300">
              Twitter
            </a>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300">
              Instagram
            </a>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;