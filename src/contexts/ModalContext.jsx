import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const openUserModal = () => {
    setShowUserModal(true);
  };

  const closeAllModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowUserModal(false);
  };

  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const showSuccess = (message) => {
    console.log('showSuccess called with:', message);
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    console.log('Success message state set to true');
    setTimeout(() => {
      console.log('Auto-hiding success message');
      setShowSuccessMessage(false);
      setSuccessMessage('');
    }, 3000);
  };

  const closeSuccessMessage = () => {
    setShowSuccessMessage(false);
    setSuccessMessage('');
  };

  const value = {
    showLoginModal,
    showRegisterModal,
    showUserModal,
    successMessage,
    showSuccessMessage,
    openLoginModal,
    openRegisterModal,
    openUserModal,
    closeAllModals,
    switchToRegister,
    switchToLogin,
    showSuccess,
    closeSuccessMessage,
    setShowLoginModal,
    setShowRegisterModal,
    setShowUserModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
