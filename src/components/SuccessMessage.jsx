import React from 'react';
import { useModal } from '../contexts/ModalContext';

const SuccessMessage = () => {
  const { showSuccessMessage, successMessage, closeSuccessMessage } = useModal();

  if (!showSuccessMessage) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-green-500/90 backdrop-blur-sm border border-green-400/30 rounded-xl p-4 shadow-2xl max-w-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-green-100" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-green-100">
              {successMessage}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={closeSuccessMessage}
              className="inline-flex text-green-200 hover:text-green-100 focus:outline-none focus:text-green-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
