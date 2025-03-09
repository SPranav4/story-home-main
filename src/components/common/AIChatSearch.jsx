import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes, FaPaperPlane, FaRegLightbulb, FaAngleDown } from "react-icons/fa";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { storeUserLead, processUserResponses } from "../../Utils/chatService";

const AIChatSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [typingAnimation, setTypingAnimation] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    spaceType: "",
    style: "",
    colors: "",
    budget: "",
    requirements: "",
    name: "",
    phone: "",
    location: ""
  });
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // Questions to ask the user about their interior needs
  const questions = [
    "Hi there! 👋 I'm your personal interior design assistant. What space are you looking to transform? (Living room, bedroom, office, etc.)",
    "Excellent choice! What style resonates with you? Modern, traditional, minimalist, bohemian, or something else?",
    "Great taste! 🎨 Do you have any specific color preferences or palette in mind?",
    "What budget range are you considering for this project? This helps us recommend solutions that match your investment level.",
    "Are there any specific features or challenges with your space that you'd like us to address?",
    "Amazing! Based on what you've shared, I think we can create something wonderful together. Would you like our design expert to contact you with personalized recommendations?",
  ];
  
  // Contact information collection
  const contactFields = [
    "Perfect! Could you please share your name?",
    "Thanks! What's the best phone number to reach you?",
    "Finally, what city or area are you located in?",
  ];

  // Scroll to bottom of chat on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle opening the chat interface
  const handleSearchClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      
      if (messages.length === 0) {
        // First time opening, show typing indicator then add initial bot message
        setTypingAnimation(true);
        setTimeout(() => {
          setMessages([
            { type: "bot", text: questions[0] }
          ]);
          setTypingAnimation(false);
        }, 1500);
      }
    }
  };

  // Toggle chat minimized state
  const toggleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  // Validate phone number (must be exactly 10 digits)
  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  // Update user info based on current step and message
  const updateUserInfo = (step, message) => {
    const updatedInfo = { ...userInfo };
    
    if (step < questions.length) {
      // Design questions
      switch (step) {
        case 0:
          updatedInfo.spaceType = message;
          break;
        case 1:
          updatedInfo.style = message;
          break;
        case 2:
          updatedInfo.colors = message;
          break;
        case 3:
          updatedInfo.budget = message;
          break;
        case 4:
          updatedInfo.requirements = message;
          break;
        default:
          break;
      }
    } else {
      // Contact information
      const contactStep = step - questions.length;
      switch (contactStep) {
        case 0:
          updatedInfo.name = message;
          break;
        case 1:
          updatedInfo.phone = message;
          break;
        case 2:
          updatedInfo.location = message;
          break;
        default:
          break;
      }
    }
    
    setUserInfo(updatedInfo);
    return updatedInfo;
  };

  // Process and store lead information
  const storeLead = () => {
    try {
      // Generate a unique ID for the lead
      const leadId = Date.now().toString();
      
      // Create the lead object
      const leadData = {
        id: leadId,
        name: userInfo.name,
        phone: userInfo.phone,
        location: userInfo.location,
        spaceType: userInfo.spaceType,
        style: userInfo.style,
        colors: userInfo.colors,
        budget: userInfo.budget,
        requirements: userInfo.requirements,
        timestamp: new Date().toISOString()
      };
      
      // Get existing leads or initialize empty array
      let existingLeads = [];
      try {
        const storedLeads = localStorage.getItem("designLeads");
        existingLeads = storedLeads ? JSON.parse(storedLeads) : [];
      } catch (error) {
        console.error("Error parsing stored leads:", error);
        existingLeads = [];
      }
      
      // Add new lead to the array
      existingLeads.push(leadData);
      
      // Save back to localStorage
      localStorage.setItem("designLeads", JSON.stringify(existingLeads));
      
      // Also call the original storeUserLead for backward compatibility
      storeUserLead(leadData);
      
      setLeadSubmitted(true);
      return true;
    } catch (error) {
      console.error("Error storing lead:", error);
      return false;
    }
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Track current message for later processing
    const currentMessage = inputValue;
    
    // Check for phone validation if on phone step
    if (currentStep === questions.length + 1) {
      if (!isValidPhoneNumber(currentMessage)) {
        setPhoneError(true);
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: "bot", 
            text: "Please enter a valid 10-digit phone number without spaces or special characters." 
          }]);
          setTypingAnimation(false);
        }, 500);
        return;
      }
      setPhoneError(false);
    }
    
    // Update user info
    updateUserInfo(currentStep, currentMessage);
    
    // Add user message
    const updatedMessages = [...messages, { type: "user", text: currentMessage }];
    setMessages(updatedMessages);
    setInputValue("");
    
    // Determine next step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    
    // Show typing animation
    setTypingAnimation(true);
    
    // Add bot response after a delay
    setTimeout(() => {
      setTypingAnimation(false);
      let botResponse;
      
      if (currentStep < questions.length - 1) {
        // Still asking interior design questions
        botResponse = questions[nextStep];
      } else if (currentStep === questions.length - 1) {
        // Check if user confirmed to provide contact info
        const userResponse = currentMessage.toLowerCase();
        if (userResponse.includes("yes") || userResponse.includes("sure") || userResponse.includes("ok") || userResponse.includes("y")) {
          botResponse = contactFields[0];
        } else {
          botResponse = "I understand! If you change your mind, you can always reach out through our contact page. Is there anything else about interior design I can help with?";
          setCurrentStep(questions.length - 1); // Stay at confirmation step
        }
      } else if (currentStep < questions.length + contactFields.length - 1) {
        // Collecting contact information
        const contactStep = currentStep - questions.length;
        botResponse = contactFields[contactStep + 1];
      } else {
        // Final step - store the lead
        const success = storeLead();
        
        if (success) {
          botResponse = "Fantastic! 🎉 Thank you for sharing your details. Our design expert will be in touch within 24 hours to discuss your vision. We're excited to help create your dream space!";
        } else {
          botResponse = "I apologize, but there was an issue saving your information. Please try again later or contact us directly through our contact page.";
        }
      }
      
      setMessages(prev => [...prev, { type: "bot", text: botResponse }]);
    }, 1500);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep(0);
    setLeadSubmitted(false);
    setPhoneError(false);
    setUserInfo({
      spaceType: "",
      style: "",
      colors: "",
      budget: "",
      requirements: "",
      name: "",
      phone: "",
      location: ""
    });
    handleSearchClick();
  };

  return (
    <>
      {/* Search Bar or Trigger */}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask about interior design..."
            className="input input-bordered input-[#EFEFEF] w-[220px] md:w-[270px] lg:w-[300px] h-[50px] rounded-full pl-5 pr-12 focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
            onClick={handleSearchClick}
            readOnly
          />
          <FaSearch 
            className="text-[#c5c5c5] text-xl absolute right-4 top-3.5 cursor-pointer" 
            onClick={handleSearchClick}
          />
        </div>
      </div>

      {/* Fixed Chat Button (visible when chat is closed) */}
      {!isOpen && (
        <div 
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-all duration-300 z-50 animate-bounce"
          onClick={handleSearchClick}
        >
          <BsChatSquareDotsFill className="text-2xl" />
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 w-[330px] md:w-[380px] ${
            isMinimized ? 'h-14' : 'h-[520px]'
          } bg-white rounded-xl shadow-2xl z-50 border border-gray-200 flex flex-col transition-all duration-300 overflow-hidden`}
          ref={chatContainerRef}
        >
          {/* Chat Header */}
          <div 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 flex items-center justify-between cursor-pointer"
            onClick={toggleMinimize}
          >
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full mr-3">
                <FaRegLightbulb className="text-yellow-500" />
              </div>
              <h3 className="font-semibold text-white">Design Assistant</h3>
            </div>
            <div className="flex gap-2">
              {!isMinimized && leadSubmitted && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetChat();
                  }}
                  className="text-blue-200 hover:text-white text-sm px-2 py-1 rounded hover:bg-blue-500 transition-colors"
                >
                  New Chat
                </button>
              )}
              <button 
                onClick={toggleMinimize}
                className="text-white hover:bg-blue-700 p-1 rounded transition-colors"
              >
                <FaAngleDown className={`transform ${isMinimized ? 'rotate-180' : ''} transition-transform duration-300`} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-white hover:bg-blue-700 p-1 rounded transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <BsChatSquareDotsFill className="text-4xl mb-3 text-blue-500" />
                    <p className="mb-2 font-medium">Welcome to Your Design Journey</p>
                    <p className="text-sm max-w-[250px]">I'll help you discover the perfect design for your space. What are you looking to transform?</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`mb-4 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] px-4 py-3 rounded-xl ${
                          message.type === "user" 
                            ? "bg-blue-600 text-white rounded-tr-none" 
                            : "bg-white text-gray-800 rounded-tl-none shadow-md"
                        } ${phoneError && index === messages.length - 1 && message.type === "bot" ? "border-l-4 border-red-500" : ""}`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))
                )}
                
                {/* Typing animation */}
                {typingAnimation && (
                  <div className="flex mb-4 justify-start">
                    <div className="bg-white text-gray-800 px-4 py-3 rounded-xl rounded-tl-none shadow-md">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat Input */}
              <div className="p-3 border-t flex bg-white">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={phoneError ? "Enter 10 digit phone number" : "Type your response..."}
                  className={`flex-1 px-4 py-2 border rounded-l-full focus:outline-none focus:ring-2 ${
                    phoneError 
                      ? "border-red-400 focus:ring-red-300 focus:border-red-500 placeholder-red-300" 
                      : "border-gray-300 focus:ring-blue-300 focus:border-blue-400"
                  }`}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`px-4 py-2 rounded-r-full transition-colors flex items-center justify-center ${
                    inputValue.trim() 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AIChatSearch;