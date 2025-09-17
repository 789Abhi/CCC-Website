import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import Heading from "./Heading";
import { curve } from "../assets";

const WordPressDemo = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [generationStep, setGenerationStep] = useState(0);
  const [showComponent, setShowComponent] = useState(false);
  const [generatedFields, setGeneratedFields] = useState([]);
  const [showPageAssignment, setShowPageAssignment] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");
  const [showPageEditor, setShowPageEditor] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [editableFields, setEditableFields] = useState([]);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [activeMenu, setActiveMenu] = useState("components");
  const [showAssignPrompt, setShowAssignPrompt] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [isDemoVisible, setIsDemoVisible] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [pluginInstalled, setPluginInstalled] = useState(true);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Tour state
  const [tourActive, setTourActive] = useState(false);
  const [showTourWelcome, setShowTourWelcome] = useState(true);
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const tourRef = useRef(null);
  
  // Video upload animation state
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  
  // Celebration animation state
  const [showCelebration, setShowCelebration] = useState(false);
  
  const useAiButtonRef = useRef(null);

  const aiPrompt =
    "Create a component for hero section where I wanted the background video, heading, title, description, button text, button link";

  const heroFields = [
    {
      id: 1,
      type: "video",
      label: "Background Video",
      value: "",
      required: true,
    },
    { id: 2, type: "text", label: "Heading", value: "", required: true },
    { id: 3, type: "text", label: "Title", value: "", required: true },
    {
      id: 4,
      type: "textarea",
      label: "Description",
      value: "",
      required: true,
    },
    { id: 5, type: "text", label: "Button Text", value: "", required: true },
    { id: 6, type: "url", label: "Button Link", value: "", required: true },
  ];

  const pages = [
    { id: "home", name: "Home", slug: "" },
    { id: "about", name: "About Us", slug: "about-us" },
    { id: "contact", name: "Contact Us", slug: "contact-us" },
    { id: "services", name: "Services", slug: "services" },
    { id: "blog", name: "Blog", slug: "blog" },
  ];

  const sampleContent = {
    heading: "Welcome to Our Amazing Platform",
    title: "Transform Your Business Today",
    description:
      "Discover the power of our innovative solutions that will revolutionize your workflow and boost your productivity to new heights.",
    buttonText: "Get Started Now",
    buttonLink: "https://example.com/get-started",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
  };


  const typeText = async (text) => {
    setIsTyping(true);
    setTypedText("");
    
    for (let i = 0; i <= text.length; i++) {
      setTypedText(text.slice(0, i));
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    
    setTimeout(() => {
      setIsTyping(false);
      // Don't automatically start generation - wait for Generate button click
    }, 1000);
  };

  const startGeneration = () => {
    setGenerationStep(1);
    
    const steps = [
      "Analyzing requirements...",
      "Generating component structure...",
      "Creating fields...",
      "Component ready!",
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setGenerationStep(index + 1);
        if (index === steps.length - 1) {
          setTimeout(() => {
            setShowComponent(true);
            setGeneratedFields(heroFields);
            setTimeout(() => {
              setShowAssignPrompt(true);
              setTimeout(() => {
                setShowAssignPrompt(false);
              }, 2000);
            }, 1000);
          }, 500);
        }
      }, (index + 1) * 1500);
    });
  };

  const resetDemo = () => {
    setIsTyping(false);
    setTypedText("");
    setGenerationStep(0);
    setShowComponent(false);
    setGeneratedFields([]);
    setShowPageAssignment(false);
    setSelectedPage("");
    setShowPageEditor(false);
    setShowLivePreview(false);
    setIsPublished(false);
    setEditableFields([]);
    setShowVideoPreview(false);
    setActiveMenu("components");
    setShowAssignPrompt(false);
    setIsFullscreen(false);
    setIsAutoFilling(false);
    setIsDemoVisible(true);
    setShowDashboard(false);
    setPluginInstalled(true);
    setShowCursor(false);
    setCursorPosition({ x: 0, y: 0 });
    // Reset video upload states
    setVideoUploadProgress(0);
    setIsVideoUploading(false);
    // Reset celebration state
    setShowCelebration(false);
  };







  const scrollToContent = () => {
    const demoContainer = document.querySelector(".bg-gray-800.rounded-lg.p-6");
    if (demoContainer) {
      demoContainer.scrollIntoView({ 
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Shepherd.js Tour Setup
  const initializeTour = () => {
    if (tourRef.current) {
      tourRef.current.complete();
    }

    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'shepherd-theme-custom',
        scrollTo: { behavior: 'smooth', block: 'center' }
      },
      useModalOverlay: false // Remove black overlay to allow page interaction
    });

    // Step 1: Use AI Button
    tour.addStep({
      title: 'Step 1: Use AI',
      text: 'Click the "Use AI" button to start creating your component. This will open the AI prompt interface where you can describe what you want to build.',
      attachTo: {
        element: '.use_ai_button',
        on: 'right'
      },
      buttons: [
        {
          action() {
            // Hide current step immediately
            this.hide();
            
            // Trigger the Use AI button click
            const useAiButton = document.querySelector('.use_ai_button');
            if (useAiButton && !useAiButton.disabled) {
              useAiButton.click();
            }
            // Don't advance manually - let useEffect handle it when Generate button appears
            return false;
          },
          text: 'Next'
        }
      ],
      id: 'step-1-use-ai'
    });

    // Step 2: Generate Component Button - Only shows when button is available
    tour.addStep({
      title: 'Step 2: Generate Component',
      text: 'Now click the "Generate Component" button to create your component with AI.',
      attachTo: {
        element: '.mt-4.bg-gradient-to-r.from-green-500',
        on: 'bottom'
      },
      buttons: [
        {
          action() {
            // Go back to Step 1 - reset to Use AI state
            this.hide();
            setCurrentTourStep(1);
            resetDemo(); // Reset to initial state
            setTimeout(() => {
              this.back();
            }, 100);
            return false;
          },
          classes: 'shepherd-button-secondary',
          text: 'Previous'
        },
        {
          action() {
            // Hide current step immediately
            this.hide();
            
            // Trigger the Generate Component button click
            const generateButton = document.querySelector('.mt-4.bg-gradient-to-r.from-green-500');
            if (generateButton) {
              generateButton.click();
            }
            // Don't advance manually - let useEffect handle it when component is generated
            return false;
          },
          text: 'Next'
        }
      ],
      id: 'step-2-generate'
    });

    // Step 3: Assign to Page Button - Only shows when component is generated
    tour.addStep({
      title: 'Step 3: Assign to Page',
      text: 'Great! Your component is ready. Now click "Assign to Page" to add it to a WordPress page.',
      attachTo: {
        element: '.flex.justify-center.mb-6.absolute button',
        on: 'left'
      },
      buttons: [
        {
          action() {
            // Go back to Step 2 - reset to Generate state
            this.hide();
            setCurrentTourStep(2);
            // Reset component state and go back to generate step
            setShowComponent(false);
            setGeneratedFields([]);
            setGenerationStep(0);
            setTimeout(() => {
              this.back();
            }, 100);
            return false;
          },
          classes: 'shepherd-button-secondary',
          text: 'Previous'
        },
        {
          action() {
            // Hide current step immediately
            this.hide();
            
            // Trigger the Assign to Page button click
            const assignButton = document.querySelector('.flex.justify-center.mb-6.absolute button');
            if (assignButton) {
              assignButton.click();
            }
            // Don't advance manually - let useEffect handle it when page assignment appears
            return false;
          },
          text: 'Next'
        }
      ],
      id: 'step-3-assign'
    });

    // Step 4: Select Page - Only shows when page selection is available
    tour.addStep({
      title: 'Step 4: Select Page',
      text: 'Choose which page you want to add your component to. For Ex : Select "Home" to add it to your homepage. ',
      attachTo: {
        element: () => {
      const buttons = document.querySelectorAll('button');
          return Array.from(buttons).find(btn => 
            btn.textContent && btn.textContent.includes('Home')
          );
        },
        on: 'top'
      },
      buttons: [
        {
          action() {
            // Go back to Step 3 - reset to Assign state
            this.hide();
            setCurrentTourStep(3);
            // Reset page assignment state and go back
            setShowPageAssignment(false);
            setSelectedPage("");
            setTimeout(() => {
              this.back();
            }, 100);
            return false;
          },
          classes: 'shepherd-button-secondary',
          text: 'Previous'
        },
        {
          action() {
            // Hide current step immediately
            this.hide();
            
            // Trigger the Home page selection
      const buttons = document.querySelectorAll('button');
            const homeButton = Array.from(buttons).find(btn => 
              btn.textContent && btn.textContent.includes('Home')
            );
            if (homeButton) {
              homeButton.click();
            }
            // Don't advance manually - let useEffect handle it when page editor appears
            return false;
          },
          text: 'Next'
        }
      ],
      id: 'step-4-select-page'
    });

    // Step 5: Publish Page - Only shows when publish button is available
    tour.addStep({
      title: 'Step 5: Publish',
      text: 'Perfect! Now click "Publish" to make your component live on your website.',
      attachTo: {
        element: () => {
      const buttons = document.querySelectorAll('button');
          return Array.from(buttons).find(btn => 
            btn.textContent && btn.textContent.includes('Publish')
          );
        },
        on: 'bottom'
      },
      buttons: [
        {
          action() {
            // Go back to Step 4 - reset to Page Editor state
            this.hide();
            setCurrentTourStep(4);
            // Reset page editor state and go back
            setShowPageEditor(false);
            setEditableFields([]);
            setSelectedPage("");
            setTimeout(() => {
              this.back();
            }, 100);
            return false;
          },
          classes: 'shepherd-button-secondary',
          text: 'Previous'
        },
        {
          action() {
            // Hide current step immediately
            this.hide();
            
            // Trigger the Publish button click
            const buttons = document.querySelectorAll('button');
            const publishButton = Array.from(buttons).find(btn => 
              btn.textContent && btn.textContent.includes('Publish')
            );
            if (publishButton) {
              publishButton.click();
              
              // Wait for live preview to actually load before completing tour
              const waitForLivePreview = () => {
                const checkForPreview = () => {
                  // Only complete tour if tour is still active
                  if (!tourActive) {
                    return; // Don't complete if tour was cancelled/skipped
                  }
                  
                  // Check if live preview is showing (showLivePreview state would be true)
                  // We can detect this by looking for preview-specific elements
                  const previewElements = document.querySelector('.bg-gray-100.border-b.border-gray-300') || 
                                        document.querySelector('[title="Exit Fullscreen"]');
                  
                  if (previewElements) {
                    // Live preview is loaded, complete the tour
                    this.complete();
                  } else {
                    // Keep checking every 200ms for faster response
                    setTimeout(checkForPreview, 200);
                  }
                };
                
                // Start checking immediately since redirect is instant
                setTimeout(checkForPreview, 500);
              };
              
              waitForLivePreview();
            }
            return false; // Prevent immediate completion
          },
          text: 'Finish'
        }
      ],
      id: 'step-5-publish'
    });

    // Tour event handlers
    tour.on('complete', () => {
      // Only show completion popup if tour was actually active
      if (!tourActive) {
        return; // Don't show popup for manual usage
      }
      
      setTourActive(false);
      setCurrentTourStep(0);
      // Keep fullscreen for live preview - don't exit automatically
      // Show tour completed popup with better styling
      setTimeout(() => {
        const completionPopup = document.createElement('div');
        completionPopup.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          ">
            <div style="
              background: white;
              border-radius: 12px;
              padding: 32px;
              max-width: 400px;
              text-align: center;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            ">
              <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
              <h3 style="font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 12px;">
                Tour Completed!
              </h3>
              <p style="color: #6b7280; margin-bottom: 24px; line-height: 1.5;">
                Congratulations! You now know how to use Custom Craft Component to create amazing WordPress components with AI.
              </p>
              <div style="display: flex; gap: 12px;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                  background: #f3f4f6;
                  color: #6b7280;
                  border: none;
                  border-radius: 8px;
                  padding: 12px 24px;
                  font-weight: 500;
                  cursor: pointer;
                  transition: all 0.2s;
                " onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
                  Got it!
                </button>
                <button onclick="
                  this.parentElement.parentElement.parentElement.remove();
                  window.location.reload();
                " style="
                  background: #2563eb;
                  color: white;
                  border: none;
                  border-radius: 8px;
                  padding: 12px 24px;
                  font-weight: 500;
                  cursor: pointer;
                  transition: all 0.2s;
                " onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'">
                  🔄 Start Again
                </button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(completionPopup);
        
        // Auto-dismiss the completion popup after 2 seconds
        setTimeout(() => {
          if (completionPopup && completionPopup.parentNode) {
            completionPopup.remove();
          }
        }, 2000);
      }, 500);
    });

    tour.on('cancel', () => {
      setTourActive(false);
      setCurrentTourStep(0);
      setIsFullscreen(false); // Exit fullscreen when tour is cancelled
    });

    tourRef.current = tour;
    return tour;
  };

  const startTour = () => {
    setShowTourWelcome(false);
    setTourActive(true);
    setCurrentTourStep(1);
    setIsFullscreen(true); // Automatically enable fullscreen for tour
    const tour = initializeTour();
    tour.start();
  };

  // Helper functions to manually advance tour when elements become available
  const advanceToStep2 = () => {
    if (tourRef.current && tourActive && currentTourStep < 2) {
      // Check if Generate button is available
      const generateButton = document.querySelector('.mt-4.bg-gradient-to-r.from-green-500');
      if (generateButton) {
        setCurrentTourStep(2);
        tourRef.current.show('step-2-generate');
      }
    }
  };

  const advanceToStep3 = () => {
    if (tourRef.current && tourActive && currentTourStep < 3) {
      // Check if component is generated and Assign button is available
      const assignButton = document.querySelector('.flex.justify-center.mb-6.absolute button');
      const componentGenerated = document.querySelector('.bg-gray-700.border.border-pink-500');
      if (assignButton && componentGenerated) {
        setCurrentTourStep(3);
        tourRef.current.show('step-3-assign');
      }
    }
  };

  const advanceToStep4 = () => {
    if (tourRef.current && tourActive && currentTourStep < 4) {
      // Check if page selection is available
      const buttons = document.querySelectorAll('button');
      const homeButton = Array.from(buttons).find(btn => 
        btn.textContent && btn.textContent.includes('Home')
      );
      if (homeButton) {
        setCurrentTourStep(4);
        tourRef.current.show('step-4-select-page');
      }
    }
  };

  const advanceToStep5 = () => {
    if (tourRef.current && tourActive && currentTourStep < 5) {
      // Check if publish button is available
      const buttons = document.querySelectorAll('button');
      const publishButton = Array.from(buttons).find(btn => 
        btn.textContent && btn.textContent.includes('Publish')
      );
      if (publishButton) {
        setCurrentTourStep(5);
        tourRef.current.show('step-5-publish');
      }
    }
  };

  const closeTourWelcome = () => {
    setShowTourWelcome(false);
    // Ensure normal mode when skipping tour (user can manually fullscreen later)
    setIsFullscreen(false);
  };

  // Add custom styles for Shepherd tour
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .shepherd-theme-custom .shepherd-element {
        background: white;
        border-radius: 12px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        border: 2px solid #e5e7eb;
        max-width: 320px;
        z-index: 9999 !important;
      }
      
      .shepherd-theme-custom .shepherd-element::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        border-radius: 16px;
        z-index: -1;
        opacity: 0.1;
      }
      
      .shepherd-theme-custom .shepherd-header {
        padding: 20px 20px 0 20px;
      }
      
      .shepherd-theme-custom .shepherd-title {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        margin: 0;
      }
      
      .shepherd-theme-custom .shepherd-text {
        padding: 12px 20px 20px 20px;
        color: #6b7280;
        font-size: 14px;
        line-height: 1.5;
      }
      
      .shepherd-theme-custom .shepherd-footer {
        padding: 0 20px 20px 20px;
      }
      
      .shepherd-theme-custom .shepherd-button {
        background: #2563eb;
        border: none;
        border-radius: 8px;
        color: white;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .shepherd-theme-custom .shepherd-button:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
      }
      
      .shepherd-theme-custom .shepherd-button-secondary {
        background: #f3f4f6;
        color: #6b7280;
      }
      
      .shepherd-theme-custom .shepherd-button-secondary:hover {
        background: #e5e7eb;
        color: #374151;
      }
      
      .shepherd-theme-custom .shepherd-cancel-icon {
        color: #9ca3af;
        font-size: 20px;
      }
      
      .shepherd-theme-custom .shepherd-cancel-icon:hover {
        color: #6b7280;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Cleanup tour when component unmounts
  useEffect(() => {
    return () => {
      if (tourRef.current) {
        tourRef.current.complete();
      }
    };
  }, []);

  // Add event listeners to hide tour popup when actual buttons are clicked
  useEffect(() => {
    if (!tourActive) return;

    const hideCurrentStep = () => {
      if (tourRef.current) {
        tourRef.current.hide();
      }
    };

    // Add click listeners to all tour-relevant buttons
    const useAiButton = document.querySelector('.use_ai_button');
    const generateButton = document.querySelector('.mt-4.bg-gradient-to-r.from-green-500');
    const assignButton = document.querySelector('.flex.justify-center.mb-6.absolute button');
    
    // Find Home and Publish buttons dynamically
    const buttons = document.querySelectorAll('button');
    const homeButton = Array.from(buttons).find(btn => 
      btn.textContent && btn.textContent.includes('Home')
    );
    const publishButton = Array.from(buttons).find(btn => 
      btn.textContent && btn.textContent.includes('Publish')
    );

    const buttonsToWatch = [useAiButton, generateButton, assignButton, homeButton, publishButton].filter(Boolean);

    buttonsToWatch.forEach(button => {
      button.addEventListener('click', hideCurrentStep);
    });

    // Cleanup
    return () => {
      buttonsToWatch.forEach(button => {
        button.removeEventListener('click', hideCurrentStep);
      });
    };
  }, [tourActive, showComponent, showPageAssignment, showPageEditor]); // Re-run when UI changes

  // Monitor for Generate button availability (Step 2)
  useEffect(() => {
    if (tourActive && !isTyping && typedText && generationStep === 0) {
      // Check if Generate button is actually visible and ready
      const checkAndAdvance = () => {
        const generateButton = document.querySelector('.mt-4.bg-gradient-to-r.from-green-500');
        if (generateButton && generateButton.offsetParent !== null) {
          advanceToStep2();
        } else {
          setTimeout(checkAndAdvance, 200);
        }
      };
      setTimeout(checkAndAdvance, 500);
    }
  }, [tourActive, isTyping, typedText, generationStep]);

  // Monitor for component generation completion (Step 3)
  useEffect(() => {
    if (tourActive && showComponent) {
      // Check if Assign button is actually visible and component is fully rendered
      const checkAndAdvance = () => {
        const assignButton = document.querySelector('.flex.justify-center.mb-6.absolute button');
        const componentGenerated = document.querySelector('.bg-gray-700.border.border-pink-500');
        if (assignButton && componentGenerated && assignButton.offsetParent !== null) {
          advanceToStep3();
        } else {
          setTimeout(checkAndAdvance, 300);
        }
      };
      setTimeout(checkAndAdvance, 1000);
    }
  }, [tourActive, showComponent]);

  // Monitor for page assignment (Step 4)
  useEffect(() => {
    if (tourActive && showPageAssignment) {
      // Check if Home button is actually visible
      const checkAndAdvance = () => {
        const buttons = document.querySelectorAll('button');
        const homeButton = Array.from(buttons).find(btn => 
          btn.textContent && btn.textContent.includes('Home')
        );
        if (homeButton && homeButton.offsetParent !== null) {
          advanceToStep4();
        } else {
          setTimeout(checkAndAdvance, 200);
        }
      };
      setTimeout(checkAndAdvance, 500);
    }
  }, [tourActive, showPageAssignment]);

  // Monitor for page editor (Step 5) - Only after auto-fill completes
  useEffect(() => {
    if (tourActive && showPageEditor && !isAutoFilling) {
      // Check if Publish button is actually visible AND auto-fill is complete
      const checkAndAdvance = () => {
        const buttons = document.querySelectorAll('button');
        const publishButton = Array.from(buttons).find(btn => 
          btn.textContent && btn.textContent.includes('Publish')
        );
        // Also check that content has been filled (at least one field has value)
        const hasContent = editableFields.some(field => field.value && field.value.length > 0);
        
        if (publishButton && publishButton.offsetParent !== null && hasContent) {
          advanceToStep5();
        } else {
          setTimeout(checkAndAdvance, 500);
        }
      };
      // Wait longer to ensure auto-fill has completed
      setTimeout(checkAndAdvance, 2000);
    }
  }, [tourActive, showPageEditor, isAutoFilling, editableFields]);

  const autoFillContent = async () => {
    setIsAutoFilling(true);
    
    const emptyFields = heroFields.map((field) => ({ ...field, value: "" }));
    setEditableFields(emptyFields);
    
    // Start video upload animation first
    setIsVideoUploading(true);
    setVideoUploadProgress(0);
    
    // Simulate video upload progress
    const uploadVideo = () => {
      return new Promise((resolve) => {
        let progress = 0;
        const uploadInterval = setInterval(() => {
          progress += Math.random() * 15 + 5; // Random progress between 5-20%
          if (progress >= 100) {
            progress = 100;
            setVideoUploadProgress(100);
            clearInterval(uploadInterval);
            setTimeout(() => {
              setIsVideoUploading(false);
              resolve();
            }, 500);
          } else {
            setVideoUploadProgress(Math.min(progress, 100));
          }
        }, 200);
      });
    };
    
    // Wait for video upload to complete
    await uploadVideo();
    
    // Start content auto-fill immediately after video upload completes
    for (let i = 0; i < heroFields.length; i++) {
      const field = heroFields[i];
      let value = "";
      
      if (field.label === "Button Text") {
        value = sampleContent.buttonText;
      } else if (field.label === "Button Link") {
        value = sampleContent.buttonLink;
      } else if (field.label === "Background Video") {
        value = sampleContent.videoUrl;
      } else {
        value =
          sampleContent[field.label.toLowerCase().replace(" ", "")] ||
          sampleContent[field.type] ||
          "";
      }
      
      // Auto-scroll to current field during filling
        setTimeout(() => {
        const fieldElement = document.querySelector(
          `[data-field-id="${field.id}"]`
        );
          if (fieldElement) {
            fieldElement.scrollIntoView({ 
            behavior: "smooth",
            block: "center",
            });
          }
        }, 200);
      
      await new Promise((resolve) => {
        let currentValue = "";
        const typeInterval = setInterval(() => {
          if (currentValue.length < value.length) {
            currentValue += value[currentValue.length];
            setEditableFields((prev) =>
              prev.map((f) =>
              f.id === field.id ? { ...f, value: currentValue } : f
              )
            );
          } else {
            clearInterval(typeInterval);
            resolve();
          }
        }, 50);
      });
      
      // Remove delay between fields for immediate filling
    }
    
    setIsAutoFilling(false);
    
    // After auto-fill completes, scroll to show the Publish button
    setTimeout(() => {
      const publishButton = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent && btn.textContent.includes('Publish')
      );
      if (publishButton) {
        publishButton.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 500);
  };

  const handlePageSelect = (pageId) => {
    setSelectedPage(pageId);
    setActiveMenu("pages");
    setTimeout(() => {
      setShowPageAssignment(false);
      setShowPageEditor(true);
      autoFillContent();
      
      // Scroll to show the Publish button after content loads
      setTimeout(() => {
        const publishButton = document.querySelector('button:has(span:contains("Publish"))') || 
                            Array.from(document.querySelectorAll('button')).find(btn => 
                              btn.textContent && btn.textContent.includes('Publish')
                            );
        if (publishButton) {
          publishButton.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 2000); // Wait for auto-fill to complete
    }, 1000);
  };

  const assignToPage = () => {
    setShowPageAssignment(true);
  };

  const goBackToPlugin = () => {
    setShowPageEditor(false);
    setShowLivePreview(false);
    setActiveMenu("components");
    setIsPublished(false);
    setShowComponent(true);
    setEditableFields([]);
    setSelectedPage("");
  };

  const updateFieldValue = (fieldId, value) => {
    setEditableFields((prev) =>
      prev.map((field) => (field.id === fieldId ? { ...field, value } : field))
    );
  };

  const publishPage = () => {
    setIsPublished(true);
    
    // Immediately redirect to preview page
    setShowPageEditor(false);
    setShowLivePreview(true);
    setActiveMenu("preview");
    
    // Start celebration animation on preview page
    setTimeout(() => {
      setShowCelebration(true);
      
      // Stop celebration after 5 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 5000);
    }, 500);
  };

  const toggleVideoPreview = () => {
    setShowVideoPreview(!showVideoPreview);
  };

  return (
    <Section crosses className="!py-10 lg:!py-16 xl:!py-20" id="demo">
      <div className="container px-5 mx-auto">
         <Heading
          className="md:max-w-md lg:max-w-2xl"
          title={
            <>
              Quick  {" "}
              <span className="inline-block relative font-semibold">
                CCC  
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                  width={624}
                  height={28}
                  alt="Curve"
                />
                
              </span>
             {" "} Demo
            </>
          }
        />


        <div
          className={`${
            isFullscreen
              ? "fixed inset-0 z-50 bg-gray-900"
              : "max-w-6xl mx-auto"
          }`}
        >
          {/* Animated Cursor */}
          {showCursor && (
            <motion.div
              className="fixed z-[100] pointer-events-none"
              style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
            </motion.div>
          )}

          <div
            className={`${
              showLivePreview
                ? "bg-white rounded-2xl overflow-hidden shadow-2xl"
                : "bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
            } ${isFullscreen ? "h-full" : ""} relative`}
          >


            {/* Debug indicators removed */}

            {/* Step Popup moved inside use_ai_button_area */}

            {/* Hotspot - Positioned based on step */}

            {!showLivePreview && (
              <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">W</span>
                    </div>
                    <span className="text-white font-semibold">
                      Custom Craft Component
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="text-gray-400 hover:text-white transition-colors mr-4"
                      title={
                        isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                      }
                    >
                      {isFullscreen ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      )}
                    </button>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex h-full overflow-y-auto">
              {!showLivePreview && (
                <div className="w-64 bg-gray-800 border-r border-gray-700">
                  <div className="p-4">
                    <div className="space-y-2">
                        <div
                          className={`flex items-center space-x-3 py-2 px-3 rounded-lg transition-colors ${
                            activeMenu === "dashboard"
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm0 0V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2M7 13h10M7 17h4"
                            />
                          </svg>
                        <span className="text-sm">Dashboard</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300 py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        <span className="text-sm">Posts</span>
                      </div>
                      <div
                        className={`flex items-center space-x-3 py-2 px-3 rounded-lg transition-colors ${
                          activeMenu === "pages"
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="text-sm">Pages</span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="text-gray-400 text-sm mb-2">Plugin</div>
                      {pluginInstalled ? (
                        <div className="bg-pink-600 text-white py-2 px-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                              />
                            </svg>
                            <span className="text-sm font-medium">
                              Custom Craft Component
                            </span>
                            <span className="text-xs bg-green-500 px-2 py-1 rounded">
                              Active
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-600 text-gray-300 py-2 px-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                              />
                            </svg>
                            <span className="text-sm font-medium">
                              Custom Craft Component
                            </span>
                            <span className="text-xs bg-gray-500 px-2 py-1 rounded">
                              Inactive
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div
                className={`${
                  showLivePreview
                    ? "w-full p-0 relative"
                    : "flex-1 bg-gray-900 p-6 relative"
                }`}
              >
                {showDashboard && !pluginInstalled && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-white text-2xl font-semibold mb-2">
                          Dashboard
                        </h2>
                        <p className="text-gray-400">
                          Welcome to your WordPress site
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-white text-xl font-semibold mb-4">
                        Welcome to WordPress
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Your WordPress dashboard is ready
                      </p>
                    </div>
                  </div>
                )}

                {pluginInstalled && (
                  <>
                    {!showPageEditor && !showLivePreview && (
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">C</span>
                          </div>
                          <div>
                            <h2 className="text-white text-xl font-semibold">
                              Custom Craft Component
                            </h2>
                            <p className="text-gray-400 text-sm">
                              AI-Powered Component Generator
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!showPageEditor && !showLivePreview && (
                      <div className="flex space-x-2 mb-6">
                        <div className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Components
                        </div>
                      </div>
                    )}

                    {showComponent &&
                      !showPageAssignment &&
                      !showPageEditor &&
                      !showLivePreview && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex justify-center mb-6 absolute right-[5%] top-[5%]"
                      >
                        <motion.button
                          onClick={assignToPage}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          animate={{ 
                            boxShadow: [
                              "0 10px 25px rgba(59, 130, 246, 0.3)",
                              "0 15px 35px rgba(59, 130, 246, 0.5)",
                                "0 10px 25px rgba(59, 130, 246, 0.3)",
                              ],
                          }}
                          transition={{ 
                            boxShadow: { 
                              duration: 2, 
                              repeat: Infinity, 
                                ease: "easeInOut",
                              },
                          }}
                        >
                          <div className="flex items-center space-x-2">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            <span>Assign to Page</span>
                          </div>
                          <motion.div
                            className="absolute inset-0 bg-white opacity-20 rounded-lg"
                            animate={{ 
                              scale: [1, 1.1, 1],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                                ease: "easeInOut",
                            }}
                          />
                        </motion.button>
                      </motion.div>
                    )}

                    {showPageEditor && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex justify-end mb-6"
                      >
                        <motion.button
                          onClick={publishPage}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          animate={{ 
                            boxShadow: [
                              "0 10px 25px rgba(34, 197, 94, 0.3)",
                              "0 15px 35px rgba(34, 197, 94, 0.5)",
                              "0 10px 25px rgba(34, 197, 94, 0.3)",
                            ],
                          }}
                          transition={{ 
                            boxShadow: { 
                              duration: 2, 
                              repeat: Infinity, 
                              ease: "easeInOut",
                            },
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                            <span>Publish</span>
                          </div>
                          <motion.div
                            className="absolute inset-0 bg-white opacity-20 rounded-lg"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              ease: "easeInOut",
                            }}
                          />
                        </motion.button>
                      </motion.div>
                    )}

                    <div className="bg-gray-800 rounded-lg p-6 use_ai_button_area border border-gray-700 relative min-h-[500px]">
                      
                      {/* Tour Welcome Popup - Inside demo container */}
                      {showTourWelcome && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-[30] flex items-center justify-center bg-black bg-opacity-75 rounded-lg"
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-2xl border-2 border-blue-200 backdrop-blur-sm"
                          >
                            <div className="text-center">
                              <div className="text-4xl mb-4">🎯</div>
                              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                Welcome to CCC Tour
                              </h3>
                              <p className="text-gray-600 mb-4">
                                Take a guided tour to learn how Custom Craft Component works. 
                                We'll show you how to create, customize, and publish components in just a few steps.
                              </p>
                              <p className="text-sm text-gray-500 mb-6">
                                You can navigate through the tour using Next/Previous buttons or cancel anytime.
                              </p>
                              <div className="flex space-x-3">
                                <button
                                  onClick={closeTourWelcome}
                                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                  Skip Tour
                                </button>
                                <button
                                  onClick={startTour}
                                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  Start Tour
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}

                      {!showComponent &&
                        !showPageAssignment &&
                        !showPageEditor &&
                        !showLivePreview && (
                        <div className="text-center">
                          <motion.button
                            ref={useAiButtonRef}
                            onClick={() => typeText(aiPrompt)}
                            disabled={isTyping || generationStep > 0}
                            className="bg-gradient-to-r use_ai_button from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isTyping ? (
                              <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>AI Thinking...</span>
                              </div>
                            ) : generationStep > 0 ? (
                              "Generating..."
                            ) : (
                              "🤖 Use AI"
                            )}
                          </motion.button>

                          <AnimatePresence>
                              {(isTyping || (!isTyping && typedText && generationStep === 0)) && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-6 bg-gray-700 rounded-lg p-4 text-left"
                              >
                                  <div className="text-gray-300 text-sm mb-2">
                                    User Prompt:
                                  </div>
                                <div className="text-white font-mono text-sm">
                                  {typedText}
                                    {isTyping && <span className="animate-pulse">|</span>}
                                </div>
                                  
                                  {/* Generate Button - appears after typing is complete */}
                                  {!isTyping && typedText && generationStep === 0 && (
                                    <motion.button
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.3 }}
                                      onClick={startGeneration}
                                      className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                                    >
                                      Generate Component
                                    </motion.button>
                                  )}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <AnimatePresence>
                            {generationStep > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-6 space-y-3"
                              >
                                {[
                                  "Analyzing requirements...",
                                  "Generating component structure...",
                                  "Creating fields...",
                                    "Component ready!",
                                ].map((step, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ 
                                        opacity:
                                          generationStep > index ? 1 : 0.5,
                                        x: generationStep > index ? 0 : -20,
                                    }}
                                    className="flex items-center space-x-3"
                                  >
                                      <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                          generationStep > index
                                            ? "bg-green-500"
                                            : "bg-gray-600"
                                        }`}
                                      >
                                      {generationStep > index ? (
                                          <span className="text-white text-xs">
                                            ✓
                                          </span>
                                      ) : (
                                          <span className="text-gray-400 text-xs">
                                            {index + 1}
                                          </span>
                                      )}
                                    </div>
                                      <span
                                        className={`text-sm ${
                                          generationStep > index
                                            ? "text-white"
                                            : "text-gray-400"
                                        }`}
                                      >
                                      {step}
                                    </span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}



                      {showComponent &&
                        !showPageAssignment &&
                        !showPageEditor &&
                        !showLivePreview && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="space-y-4"
                        >
                          <div className="bg-gray-700 border border-pink-500 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center space-x-4">
                                  <div className="text-white text-lg font-semibold">
                                    Hero Section
                                  </div>
                                  <div className="text-pink-400 text-sm">
                                    hero_section
                                  </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              {generatedFields.map((field, index) => (
                                <motion.div
                                  key={field.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="bg-gray-600 border border-pink-500 rounded-lg p-4 flex items-center justify-between"
                                >
                                  <div className="flex items-center space-x-4">
                                    <div className="cursor-move">
                                        <svg
                                          className="w-4 h-4 text-gray-400"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M8 6h2v2H8V6zm6 0h2v2h-2V6zm-6 4h2v2H8v-2zm6 0h2v2h-2v-2zm-6 4h2v2H8v-2zm6 0h2v2h-2v-2z" />
                                      </svg>
                                    </div>
                                      <div className="text-white font-medium">
                                        {field.label}
                                      </div>
                                  </div>
                                  <span className="text-gray-300 text-sm bg-gray-500 px-2 py-1 rounded">
                                      {field.type === "textarea"
                                        ? "TextArea"
                                        : field.type === "url"
                                        ? "URL"
                                        : field.type.charAt(0).toUpperCase() +
                                          field.type.slice(1)}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <AnimatePresence>
                        {showPageAssignment && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-gray-700 rounded-lg p-8 max-w-2xl w-full mx-4"
                            >
                              <div className="text-center mb-6">
                                <h3 className="text-white text-xl font-semibold mb-2">
                                  Assign Component to Page
                                </h3>
                                <p className="text-gray-400 text-sm">
                                  Select which page you want to add this
                                  component to
                                </p>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {pages.map((page) => (
                                  <motion.button
                                    key={page.id}
                                    onClick={() => handlePageSelect(page.id)}
                                    className="bg-gray-600 border border-pink-500 text-white p-4 rounded-lg hover:bg-gray-500 transition-colors text-left"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <div className="font-medium">
                                      {page.name}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                      {page.slug}
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {showPageEditor && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div>
                                  <h3 className="text-white text-xl font-semibold">
                                    Edit Page
                                  </h3>
                                  <p className="text-gray-400 text-sm">
                                    Editing:{" "}
                                    {
                                      pages.find((p) => p.id === selectedPage)
                                        ?.name
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-white text-lg font-semibold mb-4">
                                + Components
                              </h4>
                              <div className="bg-white border border-gray-300 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center space-x-4">
                                    <div className="cursor-move">
                                      <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M8 6h2v2H8V6zm6 0h2v2h-2V6zm-6 4h2v2H8v-2zm6 0h2v2h-2v-2zm-6 4h2v2H8v-2zm6 0h2v2h-2v-2z" />
                                      </svg>
                                    </div>
                                    <div className="text-gray-800 font-semibold">
                                      Hero section
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-12 h-6 bg-green-500 rounded-full relative">
                                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                   {editableFields.map((field, index) => (
                                     <motion.div
                                       key={field.id}
                                       data-field-id={field.id}
                                       initial={{ opacity: 0, x: -20 }}
                                       animate={{ opacity: 1, x: 0 }}
                                       transition={{ delay: index * 0.1 }}
                                       className="flex items-center space-x-4"
                                     >
                                      <div className="cursor-move">
                                        <svg
                                          className="w-4 h-4 text-gray-400"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M8 6h2v2H8V6zm6 0h2v2h-2V6zm-6 4h2v2H8v-2zm6 0h2v2h-2v-2zm-6 4h2v2H8v-2zm6 0h2v2h-2v-2z" />
                                        </svg>
                                      </div>
                                      <div className="flex-1">
                                        <label className="block text-gray-700 text-sm font-medium mb-1">
                                          {field.label}
                                        </label>
                                        {field.type === "video" ? (
                                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            <div className="text-gray-500 text-sm mb-2">
                                              Background Video
                                            </div>
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center mb-2">
                                              <svg
                                                className="w-8 h-8 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                />
                                              </svg>
                                            </div>
                                            
                                            {/* Video Upload Progress */}
                                            {isVideoUploading ? (
                                              <div>
                                                <div className="text-sm text-blue-600 mb-2">
                                                  Uploading video... {Math.round(videoUploadProgress)}%
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                                  <motion.div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: `${videoUploadProgress}%` }}
                                                    transition={{ duration: 0.3 }}
                                                  />
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="text-sm text-gray-600 mb-2">
                                                Video uploaded successfully
                                              </div>
                                            )}
                                            
                                            {field.value && !isVideoUploading && (
                                              <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-4"
                                              >
                                                <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 flex items-center space-x-3">
                                                  <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                                                    <svg
                                                      className="w-4 h-4 text-white"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      viewBox="0 0 24 24"
                                                    >
                                                      <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                      />
                                                    </svg>
                                                  </div>
                                                  <div className="flex-1 text-left">
                                                    <div className="text-sm font-medium text-gray-800">
                                                      hero-video.mp4
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                      2.4 MB • MP4 Video
                                                    </div>
                                                  </div>
                                                  <div className="text-green-500">
                                                    <svg
                                                      className="w-5 h-5"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      viewBox="0 0 24 24"
                                                    >
                                                      <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                      />
                                                    </svg>
                                                  </div>
                                                </div>
                                              </motion.div>
                                            )}
                                          </div>
                                        ) : field.type === "textarea" ? (
                                          <textarea
                                            value={field.value}
                                            onChange={(e) =>
                                              updateFieldValue(
                                                field.id,
                                                e.target.value
                                              )
                                            }
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:border-pink-400 cursor-not-allowed opacity-70"
                                            rows={3}
                                            placeholder={`Enter ${field.label.toLowerCase()}...`}
                                            disabled={true}
                                          />
                                        ) : (
                                          <input
                                            type={
                                              field.type === "url"
                                                ? "url"
                                                : "text"
                                            }
                                            value={field.value}
                                            onChange={(e) =>
                                              updateFieldValue(
                                                field.id,
                                                e.target.value
                                              )
                                            }
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:border-pink-400 cursor-not-allowed opacity-70"
                                            placeholder={`Enter ${field.label.toLowerCase()}...`}
                                            disabled={true}
                                          />
                                        )}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {showLivePreview && (
                          <div className="space-y-6">
                            <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1 flex-1 max-w-md">
                                  <svg
                                    className="w-4 h-4 text-green-500 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                  </svg>
                                  <span className="text-sm text-gray-600">
                                    https://www.customcraftcomponents.com/
                                    {pages.find((p) => p.id === selectedPage)
                                      ?.slug || ""}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => {
                                    // Reset everything and start tour again
                                    resetDemo();
                                    setShowTourWelcome(true);
                                    setTourActive(false);
                                    setCurrentTourStep(0);
                                    if (tourRef.current) {
                                      tourRef.current.complete();
                                    }
                                  }}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                                  title="Start Tour Again"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                  </svg>
                                  <span className="text-sm font-medium">Start Again</span>
                                </button>
                                <button 
                                  onClick={() => setIsFullscreen(!isFullscreen)}
                                  className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200"
                                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                                >
                                  {isFullscreen ? (
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5"
                                      />
                                  </svg>
                                  ) : (
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                      />
                                  </svg>
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="relative">
                              <div className="bg-white border-b border-gray-200 px-6 py-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                      <span className="text-white font-bold text-sm">
                                        CCC
                                      </span>
                                    </div>
                                    <span className="text-xl font-bold text-gray-800">
                                      Custom Craft Components
                                    </span>
                                  </div>
                                   <nav className="hidden md:flex items-center space-x-6">
                                    <span className="text-gray-600 font-medium cursor-default">
                                      Home
                                    </span>
                                    <span className="text-gray-600 font-medium cursor-default">
                                      About
                                    </span>
                                    <span className="text-gray-600 font-medium cursor-default">
                                      Services
                                    </span>
                                    <span className="text-gray-600 font-medium cursor-default">
                                      Contact
                                    </span>
                                     <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium cursor-default pointer-events-none">
                                       Get Started
                                     </span>
                                   </nav>
                                  <button className="md:hidden text-gray-600">
                                    <svg
                                      className="w-6 h-6"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center overflow-hidden">
                                <video 
                                  className="absolute inset-0 w-full h-full object-cover"
                                  autoPlay 
                                  muted 
                                  loop
                                  playsInline
                                >
                                  <source
                                    src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
                                    type="video/mp4"
                                  />
                                </video>
                                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <svg
                                      className="w-10 h-10 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="relative z-10 text-center text-white px-8">
                                  <h1 className="text-4xl font-bold mb-4">
                                    {editableFields.find(
                                      (f) => f.label === "Heading"
                                    )?.value || sampleContent.heading}
                                  </h1>
                                  <h2 className="text-2xl font-semibold mb-6">
                                    {editableFields.find(
                                      (f) => f.label === "Title"
                                    )?.value || sampleContent.title}
                                  </h2>
                                  <p className="text-lg mb-8 max-w-2xl mx-auto">
                                    {editableFields.find(
                                      (f) => f.label === "Description"
                                    )?.value || sampleContent.description}
                                  </p>
                                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                    {editableFields.find(
                                      (f) => f.label === "Button Text"
                                    )?.value || sampleContent.buttonText}
                                  </button>
                                </div>
                              </div>
                              <div className="bg-gray-50 py-16">
                                <div className="max-w-6xl mx-auto px-8">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="text-center">
                                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg
                                          className="w-8 h-8 text-blue-600"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                          />
                                        </svg>
                                      </div>
                                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        Fast Performance
                                      </h3>
                                      <p className="text-gray-600">
                                        Lightning-fast loading times and
                                        optimized performance for better user
                                        experience.
                                      </p>
                                    </div>
                                    <div className="text-center">
                                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg
                                          className="w-8 h-8 text-green-600"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                      </div>
                                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        Reliable Service
                                      </h3>
                                      <p className="text-gray-600">
                                        99.9% uptime guarantee with 24/7
                                        monitoring and support.
                                      </p>
                                    </div>
                                    <div className="text-center">
                                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg
                                          className="w-8 h-8 text-purple-600"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                          />
                                        </svg>
                                      </div>
                                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        Secure Platform
                                      </h3>
                                      <p className="text-gray-600">
                                        Enterprise-grade security with SSL
                                        encryption and data protection.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-800 text-white py-8">
                                <div className="max-w-6xl mx-auto px-8">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="text-lg font-semibold mb-2">
                                        Your Website
                                      </h4>
                                      <p className="text-gray-400">
                                        Powered by Custom Craft Components
                                      </p>
                                    </div>
                                     <div className="flex space-x-6">
                                      <span className="text-gray-400 cursor-default">
                                        Privacy
                                      </span>
                                      <span className="text-gray-400 cursor-default">
                                        Terms
                                      </span>
                                      <span className="text-gray-400 cursor-default">
                                        Contact
                                      </span>
                                     </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Celebration Animation - Only on Preview Page */}
          {showCelebration && showLivePreview && (
            <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
              {/* Confetti Animation */}
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: -20,
                    rotate: 0,
                    scale: 0
                  }}
                  animate={{
                    y: window.innerHeight + 100,
                    rotate: 360,
                    scale: [0, 1, 1, 0],
                    x: Math.random() * window.innerWidth
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    ease: "easeOut",
                    delay: Math.random() * 2
                  }}
                >
                  <div
                    className={`w-3 h-3 ${
                      i % 4 === 0 ? 'bg-yellow-400' :
                      i % 4 === 1 ? 'bg-pink-400' :
                      i % 4 === 2 ? 'bg-blue-400' : 'bg-green-400'
                    } rounded-full`}
                  />
                </motion.div>
              ))}
              
              {/* Flower Petals */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`flower-${i}`}
                  className="absolute text-2xl"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: -30,
                    rotate: 0,
                    opacity: 1
                  }}
                  animate={{
                    y: window.innerHeight + 50,
                    rotate: Math.random() * 360,
                    opacity: [1, 1, 0],
                    x: Math.random() * window.innerWidth + (Math.random() - 0.5) * 200
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    ease: "easeOut",
                    delay: Math.random() * 1.5
                  }}
                >
                  {['🌸', '🌺', '🌼', '🌻', '💐'][i % 5]}
                </motion.div>
              ))}
              
              {/* Sparkles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute text-xl"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: 360
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                    delay: Math.random() * 3,
                    repeat: 2
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              This is exactly how CCC works in your WordPress dashboard. Simply
              describe what you need, and our AI generates the complete
              component with all necessary fields.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WordPressDemo;
