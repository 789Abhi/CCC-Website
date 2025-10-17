import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DocumentationFloatingIcon = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 left-8 z-50"
    >
      <Link
        to="/documentation"
        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center group hover:shadow-3xl transition-all duration-300"
        style={{
          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
          📚
        </div>

        {/* Tooltip */}
        <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-n-8 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Documentation
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-r-4 border-r-n-8 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DocumentationFloatingIcon;
