import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { curve } from '../assets';
import Button from './Button';

const MeetAbhishekFloatingIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Icon */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-color-1 to-color-2 rounded-full shadow-2xl flex items-center justify-center group hover:shadow-3xl transition-all duration-300"
        style={{
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
          A
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-n-8 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Meet Abhishek
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-n-8 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      </motion.button>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-gradient-to-br from-n-8 via-n-7 to-n-6 border border-n-5 rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 bg-n-6 hover:bg-n-5 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-4 h-4 text-n-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-bold text-n-1 mb-4"
                >
                  Meet{" "}
                  <span className="inline-block relative font-semibold">
                    Abhishek
                    <img
                      src={curve}
                      className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                      width={624}
                      height={28}
                      alt="Curve"
                    />
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-color-1 font-semibold mb-6"
                >
                  Founder, CEO & Lead Developer behind <span className="text-color-1 font-semibold">CCC</span>
                </motion.p>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-3xl mx-auto space-y-6"
              >
                <p className="text-n-2 text-lg leading-relaxed">
                  As CEO of <span className="text-color-4 font-semibold">Custom Craft Components</span>, I recognized a critical pain point in the WordPress development ecosystem. Developers were spending countless hours recreating the same components across different projects, leading to inefficiency and burnout.
                </p>

                <p className="text-n-2 text-lg leading-relaxed">
                  Our mission is to revolutionize WordPress development by leveraging cutting-edge AI technology to automate component creation. We're building intelligent tools that generate production-ready, maintainable code, empowering developers to focus on innovation rather than repetitive tasks.
                </p>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-12"
              >
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-n-1 mb-4">
                    Ready to transform your WordPress development workflow?
                  </h3>
                  <p className="text-n-2 text-lg mb-8">
                    Join thousands of developers who are already building faster and smarter with our AI-powered platform
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="flex" href="/pricing">
                      Start Building Smarter
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MeetAbhishekFloatingIcon;
