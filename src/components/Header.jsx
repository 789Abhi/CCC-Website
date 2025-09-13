import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { brainwave, Websitelogo } from "../assets";
import MenuSvg from "../assets/svg/MenuSvg";
import { links } from "../config";
import { navigation } from "../constants";
import Button from "./Button";
import { HambugerMenu } from "./design/Header";
import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";

const Header = () => {
  const pathname = useLocation();
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(false);
  const { user } = useAuth();
  const { openLoginModal, openRegisterModal, openUserModal } = useModal();
  
  // Check if we're on auth pages
  const isOnLoginPage = pathname.pathname === '/login';
  const isOnRegisterPage = pathname.pathname === '/register';
  const isOnHomePage = pathname.pathname === '/';

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:bg-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a 
          className="block lg:w-[12rem] w-[10rem] xl:mr-8" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (isOnHomePage) {
              // If on home page, scroll to top
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              // If on other pages, navigate to home page
              navigate('/');
            }
          }}
        >
          <img
            className="w-full lg:h-[125px] h-[120px] object-contain"
            src={Websitelogo}
            alt="Custom Craft Components"
          />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed lg:top-[5rem] top-0 left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href="#"
                target={item.external ? "_blank" : "_self"}
                rel={item.external && "noreferrer noopener"}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                  
                  // If not on home page, navigate to home page first
                  if (!isOnHomePage) {
                    navigate('/');
                    // Wait for navigation to complete, then scroll to section
                    setTimeout(() => {
                      scrollToSection(item.url);
                    }, 100);
                  } else {
                    // If on home page, scroll directly to section
                    scrollToSection(item.url);
                  }
                }}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile && "lg:hidden"
                } px-6 py-6 md:py-8 lg:mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-4 mt-8 lg:hidden">
              {user ? (
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    handleClick();
                  }}
                  className="px-8 py-4 bg-color-1 text-n-8 rounded-lg font-semibold transition-colors hover:bg-color-1/80"
                >
                  {user.firstName} {user.lastName}
                </button>
              ) : (
                <>
                  {/* Only show Register button if not on register page */}
                  {!isOnRegisterPage && (
                    <button
                      onClick={() => {
                        if (isOnHomePage) {
                          openRegisterModal();
                        } else {
                          window.location.href = '/register';
                        }
                        handleClick();
                      }}
                      className="px-8 py-4 bg-n-7 border border-n-6 text-n-1 rounded-lg font-semibold transition-colors hover:bg-n-6"
                    >
                      Register
                    </button>
                  )}
                  {/* Only show Login button if not on login page */}
                  {!isOnLoginPage && (
                    <button
                      onClick={() => {
                        if (isOnHomePage) {
                          openLoginModal();
                        } else {
                          window.location.href = '/login';
                        }
                        handleClick();
                      }}
                      className="px-8 py-4 bg-color-1 text-n-8 rounded-lg font-semibold transition-colors hover:bg-color-1/80"
                    >
                      Login
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <HambugerMenu />
        </nav>
        <div className="flex gap-5">
          {user ? (
            <Button 
              className="hidden lg:flex" 
              onClick={() => navigate('/dashboard')}
              white
            >
              {user.firstName} {user.lastName}
            </Button>
          ) : (
            <>
              {/* Only show Register button if not on register page */}
              {!isOnRegisterPage && (
                <Button white
                  className="hidden lg:flex" 
                  onClick={isOnHomePage ? openRegisterModal : () => window.location.href = '/register'}
                  
                >
                  Register
                </Button>
              )}
              {/* Only show Login button if not on login page */}
              {!isOnLoginPage && (
                <Button white
                  className="hidden lg:flex" 
                  onClick={isOnHomePage ? openLoginModal : () => window.location.href = '/login'}
                >
                  Login
                </Button>
              )}
            </>
          )}
        </div>

        <Button
          onClick={toggleNavigation}
          className="ml-auto lg:hidden"
          px="px-3"
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
