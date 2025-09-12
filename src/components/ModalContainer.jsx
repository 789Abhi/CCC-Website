import React from 'react';
import { useLocation } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';
import Modal from './Modal';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import UserDashboardModal from './auth/UserDashboardModal';

const ModalContainer = () => {
  const location = useLocation();
  const isOnHomePage = location.pathname === '/';
  const {
    showLoginModal,
    showRegisterModal,
    showUserModal,
    setShowLoginModal,
    setShowRegisterModal,
    setShowUserModal,
    switchToRegister,
    switchToLogin,
  } = useModal();

  // Only render modals on home page
  if (!isOnHomePage) {
    return null;
  }

  return (
    <>
      {/* Login Modal */}
      <Modal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        title="Sign In"
      >
        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={switchToRegister}
        />
      </Modal>

      {/* Register Modal */}
      <Modal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        title="Create Account"
      >
        <RegisterModal 
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={switchToLogin}
        />
      </Modal>

      {/* User Dashboard Modal */}
      <Modal 
        isOpen={showUserModal} 
        onClose={() => setShowUserModal(false)}
        title="My Account"
      >
        <UserDashboardModal 
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
        />
      </Modal>
    </>
  );
};

export default ModalContainer;
