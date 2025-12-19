import React, { useState, useRef, useEffect } from "react";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

// AI Knowledge Base - Improved with better keyword matching
const aiKnowledge = {
  greeting:
    "Hello! I'm NAYA's AI assistant. I can help you with product info, ordering, delivery, and more about our poultry farm.",

  faqs: {
    products: {
      response:
        "We offer fresh chicken (whole/parts), eggs, smoked chicken, and live layers. All products are farm-fresh and go through strict quality checks.",
      suggestions: ["pricing", "availability", "product details"],
      keywords: ["product", "chicken", "egg", "meat", "poultry", "food", "items", "offer", "sell"]
    },
    ordering: {
      response:
        "You can order via: 1) WhatsApp (+233 59 711 3385), 2) Phone (+233 24 438 4928), 3) Website, or 4) Visit our branches in Adenta or Aburi.",
      suggestions: ["delivery time", "payment methods", "minimum order"],
      keywords: ["order", "buy", "purchase", "how to order", "place order", "get", "acquire"]
    },
    delivery: {
      response:
        "We deliver within 24 hours across Greater Accra. Free delivery for orders above ₵300. Delivery hours: 6AM-8PM daily.",
      suggestions: ["delivery areas", "tracking", "fees"],
      keywords: ["deliver", "shipping", "transport", "ship", "delivery", "dispatch", "send"]
    },
    location: {
      response:
        "We have 2 main branches: 1) Adenta Housing Down, Accra 2) Aburi-Mariakrom, Eastern Region. Plus Madina Market stall.",
      suggestions: ["opening hours", "contact", "directions"],
      keywords: ["location", "branch", "address", "where", "place", "find", "located"]
    },
    quality: {
      response:
        "All products are HACCP certified, antibiotic-free, and processed in hygienic conditions. We maintain cold chain from farm to delivery.",
      suggestions: ["certifications", "freshness", "storage"],
      keywords: ["quality", "fresh", "safe", "hygiene", "clean", "standard", "certificate"]
    },
    contact: {
      response:
        "You can reach us via WhatsApp (+233 59 711 3385), phone call (+233 24 438 4928), or visit our branches in Adenta or Aburi. Email: info@nayapoultry.com",
      suggestions: ["whatsapp", "phone", "location"],
      keywords: ["contact", "reach", "call", "email", "phone", "whatsapp", "connect"]
    },
    pricing: {
      response: "Our prices vary by product and quantity. Fresh chicken starts from ₵25/kg, eggs ₵15-₵20 per tray depending on size. Contact us for current wholesale prices.",
      suggestions: ["products", "bulk orders", "contact"],
      keywords: ["price", "cost", "how much", "expensive", "cheap", "pricing", "amount", "fee"]
    },
    payment: {
      response: "We accept mobile money (MTN & Vodafone), cash on delivery, bank transfer, and cash at our branches.",
      suggestions: ["ordering", "delivery", "minimum order"],
      keywords: ["payment", "pay", "money", "cash", "momo", "transfer", "method"]
    },
    whatsapp: {
      response:
        "Yes! You can order directly via WhatsApp at +233 59 711 3385. Just send us your order list, delivery address, and preferred time.",
      suggestions: ["ordering", "delivery", "payment"],
      keywords: ["whatsapp", "message", "chat", "social media"]
    },
    freshness: {
      response:
        "Our products are processed daily and delivered within 24 hours. All packages have processing dates so you know exactly when they were prepared.",
      suggestions: ["quality", "storage", "delivery"],
      keywords: ["freshness", "fresh", "new", "daily", "recent"]
    },
    certifications: {
      response:
        "We are HACCP certified and follow all Ghana Standards Authority guidelines. Our farms are regularly inspected by veterinary services.",
      suggestions: ["quality", "safety", "process"],
      keywords: ["certification", "certified", "standard", "inspection", "approved"]
    },
    refund: {
      response:
        "We offer refunds or replacements for quality issues reported within 2 hours of delivery. Please keep products refrigerated and contact us immediately.",
      suggestions: ["quality", "support", "contact"],
      keywords: ["refund", "return", "replace", "complaint", "issue", "problem"]
    },
    minimum_order: {
      response:
        "Minimum order for home delivery is ₵100. No minimum for branch pickup. Bulk orders start from 50kg for wholesale pricing.",
      suggestions: ["pricing", "delivery", "bulk_orders"],
      keywords: ["minimum", "small order", "least", "smallest"]
    },
    delivery_time: {
      response:
        "Orders placed before 12 PM are delivered same day. Orders after 12 PM are delivered next morning. You can choose 2-hour delivery windows.",
      suggestions: ["delivery", "ordering", "availability"],
      keywords: ["delivery time", "when deliver", "time frame", "schedule", "how long"]
    },
    live_birds: {
      response:
        "Yes, we sell live layers and broilers. Available for pickup at our farms. Delivery of live birds requires special arrangement.",
      suggestions: ["products", "availability", "contact"],
      keywords: ["live", "alive", "bird", "live chicken", "hen", "rooster"]
    },
    eggs: {
      response:
        "We sell fresh eggs by trays (30 pieces). Available daily from our farms. Can be ordered separately or with chicken products.",
      suggestions: ["products", "pricing", "delivery"],
      keywords: ["egg", "eggs", "tray", "egg tray"]
    },
    smoked_chicken: {
      response:
        "Our smoked chicken is prepared using traditional methods with natural spices. Available in various sizes. Can be ordered in advance.",
      suggestions: ["products", "pricing", "ordering"],
      keywords: ["smoked", "smoked chicken", "grilled", "barbecue", "bbq"]
    },
    chicken_parts: {
      response:
        "We sell chicken wings, breast, thighs, drumsticks, gizzards, and liver separately. Available fresh daily.",
      suggestions: ["products", "pricing", "ordering"],
      keywords: ["parts", "wing", "breast", "thigh", "drumstick", "gizzard", "liver", "piece"]
    },
    wholesale: {
      response:
        "We supply restaurants, hotels, schools, and supermarkets. Contact our wholesale department for volume discounts and regular supply agreements.",
      suggestions: ["bulk_orders", "pricing", "contact"],
      keywords: ["wholesale", "bulk", "large", "restaurant", "hotel", "business", "commercial"]
    },
    farm_tours: {
      response:
        "We offer farm tours by appointment. Visit our Aburi farm to see our operations. Group tours available for schools and organizations.",
      suggestions: ["location", "contact", "quality"],
      keywords: ["tour", "visit", "see", "farm tour", "visit farm"]
    },
    event_catering: {
      response:
        "We supply poultry products for weddings, parties, and corporate events. Special packages available for large events.",
      suggestions: ["bulk_orders", "pricing", "contact"],
      keywords: ["event", "catering", "wedding", "party", "function", "celebration"]
    },
    health_benefits: {
      response:
        "Our poultry is raised without antibiotics or hormones, making it healthier. Rich in protein and essential nutrients.",
      suggestions: ["quality", "certifications", "products"],
      keywords: ["health", "benefit", "healthy", "nutrient", "protein", "vitamin"]
    },
    cooking_tips: {
      response:
        "For best results, thaw frozen chicken in the refrigerator overnight. Marinate for at least 2 hours for better flavor.",
      suggestions: ["storage", "products", "freshness"],
      keywords: ["cook", "cooking", "prepare", "recipe", "tip", "how to cook"]
    },
    franchise: {
      response:
        "We're expanding! Contact us for franchise opportunities in different regions of Ghana.",
      suggestions: ["wholesale", "contact", "location"],
      keywords: ["franchise", "opportunity", "business", "expand", "partner"]
    },
    careers: {
      response:
        "We're always looking for dedicated staff. Send your CV to careers@nayapoultry.com or visit our branches.",
      suggestions: ["contact", "location"],
      keywords: ["career", "job", "work", "employment", "hire", "vacancy"]
    },
    seasonal_specials: {
      response:
        "We offer special packages during holidays like Christmas and Easter. Follow us on social media for updates.",
      suggestions: ["products", "pricing", "ordering"],
      keywords: ["seasonal", "special", "holiday", "christmas", "easter", "festive"]
    },
    opening_hours: {
      response: "Our branches are open Monday to Saturday from 6:00 AM to 8:00 PM, and Sundays from 7:00 AM to 6:00 PM.",
      suggestions: ["location", "contact", "delivery"],
      keywords: ["open", "opening", "hours", "time", "when open", "close", "schedule"]
    },
    delivery_areas: {
      response: "We deliver to all areas in Greater Accra including Accra Central, East Legon, Tema, Spintex, Kasoa, and surrounding areas.",
      suggestions: ["delivery", "location", "ordering"],
      keywords: ["delivery area", "where deliver", "area", "region", "zone", "location"]
    }
  },

  fallback:
    "I'm not sure about that. Please contact our team directly via WhatsApp at +233 24 438 4928 or call 059 711 3385 for specific questions.",
};

// Predefined quick questions
const quickQuestions = [
  "What products do you offer?",
  "How can I place an order?",
  "What are your delivery areas?",
  "Where are your branches located?",
  "How fresh are your products?",
  "What payment methods do you accept?",
];

// Helper notification messages
const notificationMessages = [
  "🧠 Need help? I can answer your questions instantly!",
  "🤔 Confused? Ask me about products, delivery, or ordering!",
  "🛒 Planning to order? I can help you choose the right products!",
  "📍 Looking for our branches? I know all our locations!",
];

// More frequent notification messages
const frequentNotifications = [
  "👋 Hi there! Need help with anything?",
  "💬 I can help you with any questions!",
  "🆘 Need assistance? I'm here to help!",
  "❓ Got questions? Ask me anything!",
];

// Helper to get a random notification
const getRandomNotification = (isFrequent = false) => {
  const messages = isFrequent ? frequentNotifications : notificationMessages;
  return messages[Math.floor(Math.random() * messages.length)];
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationPosition, setNotificationPosition] = useState({ x: 0, y: 0 });
  const [isPulsing, setIsPulsing] = useState(false);
  const [userActivity, setUserActivity] = useState({
    timeOnPage: 0,
    lastInteraction: Date.now(),
    scrollDepth: 0,
    hasInteractedWithChat: false,
    lastNotificationTime: 0,
  });

  const messagesEndRef = useRef(null);
  const notificationTimeoutRef = useRef(null);
  const activityIntervalRef = useRef(null);
  const notificationIntervalRef = useRef(null);
  const chatButtonRef = useRef(null);
  const chatWindowRef = useRef(null);
  const inputRef = useRef(null);

  // Prevent zoom on input focus for mobile
  useEffect(() => {
    const preventZoom = (e) => {
      // Prevent double-tap zoom on mobile
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const handleFocus = (e) => {
      // Prevent auto-zoom on iOS
      if (window.innerWidth <= 768) {
        const element = e.target;
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          window.setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        }
      }
    };

    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('focus', handleFocus, true);

    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('focus', handleFocus, true);
    };
  }, []);

  // Track user activity
  useEffect(() => {
    const updateActivity = () => {
      setUserActivity(prev => ({
        ...prev,
        timeOnPage: prev.timeOnPage + 1,
        lastInteraction: Date.now(),
      }));
    };

    const handleScroll = () => {
      const scrollDepth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      setUserActivity(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollDepth),
      }));
    };

    activityIntervalRef.current = setInterval(updateActivity, 1000);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(activityIntervalRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Trigger a notification
    const triggerNotification = (force = false) => {
  if (isOpen || showNotification) return;

  // Check if enough time has passed since last notification
  const timeSinceLastNotification = Date.now() - userActivity.lastNotificationTime;
  const minNotificationInterval = force ? 1000 : 1800000; // 30 seconds minimum between notifications
  
  if (timeSinceLastNotification < minNotificationInterval && !force) {
    return;
  }

  // Clear any existing timeout
  if (notificationTimeoutRef.current) {
    clearTimeout(notificationTimeoutRef.current);
  }

  // Set notification text (use frequent notifications if force triggered)
  setNotificationText(getRandomNotification(force));
  
  // Calculate position (positioned higher up)
  const calculatePosition = () => {
    const notificationWidth = 256; // w-64 = 256px
    const notificationHeight = 120; // Approximate height
    
    if (chatButtonRef.current) {
      const buttonRect = chatButtonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let x, y;
      
      // Check screen size
      if (viewportWidth < 640) {
        // Mobile - Position above the chat button with more space
        x = Math.max(10, buttonRect.left - (notificationWidth / 2) + (buttonRect.width / 2));
        y = Math.max(10, buttonRect.top - notificationHeight - 40); // Increased from 20 to 40
        
        // If not enough space above, position below
        if (y < 30) { // Increased threshold from 50 to 30
          y = buttonRect.bottom + 30; // Increased from 20 to 30
        }
      } else {
        // Desktop - Try top side first (positioned higher)
        if (buttonRect.top > notificationHeight + 60) { // More space needed above
          // Enough space above - position higher
          x = Math.max(40, buttonRect.left - (notificationWidth / 2) + (buttonRect.width / 2));
          y = buttonRect.top - notificationHeight - 50; // Position 50px above button instead of 20
        } else if (viewportHeight - buttonRect.bottom > notificationHeight + 60) {
          // Enough space below - but we want it higher, so position above with less space
          x = Math.max(40, buttonRect.left - (notificationWidth / 2) + (buttonRect.width / 2));
          y = Math.max(40, buttonRect.top - notificationHeight - 30);
        } else if (buttonRect.left > notificationWidth + 40) {
          // Enough space on left - position higher than button
          x = buttonRect.left - notificationWidth - 20;
          y = Math.max(40, buttonRect.top - 40); // Position 40px higher than button top
        } else if (viewportWidth - buttonRect.right > notificationWidth + 40) {
          // Enough space on right - position higher than button
          x = buttonRect.right + 20;
          y = Math.max(40, buttonRect.top - 40); // Position 40px higher than button top
        } else {
          // Not enough space anywhere specific, position higher in viewport
          x = Math.max(40, buttonRect.left - (notificationWidth / 2) + (buttonRect.width / 2));
          y = Math.max(40, viewportHeight * 0.2); // Position at 20% of viewport height
        }
      }
      
      // Ensure it stays within viewport bounds
      x = Math.max(10, Math.min(x, viewportWidth - notificationWidth - 10));
      y = Math.max(20, Math.min(y, viewportHeight - notificationHeight - 20));
      
      return { x, y };
    } else {
      // Default position if button not found - position higher
      return {
        x: window.innerWidth - 300,
        y: 100, // Changed from bottom to near top (100px from top)
      };
    }
  };
  
  const position = calculatePosition();
  setNotificationPosition(position);

  // Show notification
  setShowNotification(true);
  setIsPulsing(true);
  
  // Update last notification time
  setUserActivity(prev => ({ ...prev, lastNotificationTime: Date.now() }));

  // Auto-hide after 7 seconds
  notificationTimeoutRef.current = setTimeout(() => {
    setShowNotification(false);
    setIsPulsing(false);
  }, 7000);
};

  // Main notification interval
  useEffect(() => {
    if (isOpen) {
      // Clear interval when chat is open
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
      }
      return;
    }

    // Set up notification interval when chat is closed
    notificationIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const timeSinceLastNotification = now - userActivity.lastNotificationTime;
      const idleTime = (now - userActivity.lastInteraction) / 1000;
      
      // Conditions for showing notification
      if (
        timeSinceLastNotification >= 30000 && 
        (idleTime > 5 || userActivity.scrollDepth > 0.3) &&
        Math.random() > 0.5
      ) {
        triggerNotification();
      }
    }, 10000);

    return () => {
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
      }
    };
  }, [isOpen, userActivity]);

  // Trigger initial notification after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !userActivity.hasInteractedWithChat) {
        triggerNotification(true);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Initialize with greeting if no saved messages
  const initializeWithGreeting = () => {
    setMessages([
      {
        text: aiKnowledge.greeting,
        isBot: true,
        timestamp: new Date(),
        id: Date.now() + 1,
      },
      {
        text: "Try asking me about: products, ordering, delivery, locations, or quality standards.",
        isBot: true,
        timestamp: new Date(),
        id: Date.now() + 2,
        suggestions: [
          "products",
          "ordering",
          "delivery",
          "locations",
          "quality",
        ],
      },
    ]);
  };

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("naya_chat_messages");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        const messagesWithDates = parsedMessages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error("Error loading chat messages:", error);
        initializeWithGreeting();
      }
    } else {
      initializeWithGreeting();
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("naya_chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle notification click
  const handleNotificationClick = () => {
    setShowNotification(false);
    setIsOpen(true);
    setUserActivity(prev => ({ ...prev, hasInteractedWithChat: true }));
  };

  // Improved AI Response Logic with better matching
  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Check for exact matches in keywords
    for (const [key, data] of Object.entries(aiKnowledge.faqs)) {
      if (data.keywords && data.keywords.some(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      )) {
        return data;
      }
    }
    
    // Check for common patterns
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return { response: aiKnowledge.greeting, suggestions: [] };
    }
    
    if (lowerMessage.includes("thank")) {
      return { 
        response: "You're welcome! Is there anything else I can help you with?", 
        suggestions: ["products", "ordering", "contact"] 
      };
    }
    
    if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
      return { 
        response: "Goodbye! Feel free to chat again if you need more help. Have a great day!", 
        suggestions: [] 
      };
    }
    
    // Default fallback
    return {
      response: aiKnowledge.fallback,
      suggestions: ["contact", "products", "ordering"],
    };
  };

  const handleSendMessage = (text = input) => {
    if (!text || !text.trim()) {
      return;
    }

    try {
      // Update user activity
      setUserActivity(prev => ({ 
        ...prev, 
        hasInteractedWithChat: true 
      }));

      // Clear notification
      setShowNotification(false);

      // Create user message
      const userMessage = {
        text: text.trim(),
        isBot: false,
        timestamp: new Date(),
        id: `user_${Date.now()}`,
      };

      // Add user message to chat
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      // Get AI response
      const aiResponse = getAIResponse(text.trim());

      // Simulate typing delay (shorter for faster response)
      setTimeout(() => {
        const botMessage = {
          text: aiResponse.response || "I'm here to help! What else would you like to know?",
          isBot: true,
          timestamp: new Date(),
          id: `bot_${Date.now()}`,
          suggestions: aiResponse.suggestions || [],
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 600); // Reduced from 800ms for faster response

    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    if (question && question.trim()) {
      handleSendMessage(question.trim());
    }
  };

  const handleSuggestion = (suggestion) => {
    if (suggestion && suggestion.trim()) {
      handleSendMessage(`Tell me about ${suggestion.trim()}`);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem("naya_chat_messages");
    setShowClearConfirm(false);
    // Re-initialize with greeting after clearing
    setTimeout(() => {
      initializeWithGreeting();
    }, 100);
  };

  const handleExportChat = () => {
    const chatText = messages
      .map((msg) => {
        const sender = msg.isBot ? "NAYA AI" : "You";
        const time = msg.timestamp.toLocaleString();
        return `[${time}] ${sender}: ${msg.text}`;
      })
      .join("\n\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `naya-chat-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleChatToggle = () => {
    setIsOpen(!isOpen);
    setUserActivity(prev => ({ ...prev, hasInteractedWithChat: true }));
    
    // Hide any active notification
    setShowNotification(false);
    
    // Focus input when opening
    if (!isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Close chat when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && chatWindowRef.current && chatButtonRef.current) {
        if (!chatWindowRef.current.contains(event.target) && 
            !chatButtonRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Animated Notification Bubble */}
      {showNotification && (
        <div
          className="fixed z-[9999] cursor-pointer"
          style={{
            left: `${notificationPosition.x}px`,
            top: `${notificationPosition.y}px`,
          }}
          onClick={handleNotificationClick}
        >
          <div className="relative">
            {/* Pulsing effect */}
            {isPulsing && (
              <>
                <div className="absolute -inset-2">
                  <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping"></div>
                </div>
                <div className="absolute -inset-3">
                  <div className="absolute inset-0 rounded-full bg-green-300 opacity-10 animate-ping animation-delay-300"></div>
                </div>
              </>
            )}
            
            {/* Notification card */}
            <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-2xl border-2 border-green-300 p-4 w-64 transform transition-all duration-300 hover:scale-105 animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                    <Icons.Brain className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-green-800 bg-gradient-to-r from-green-100 to-emerald-100 px-2 py-0.5 rounded-full border border-green-200">
                      NAYA AI
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNotification(false);
                      }}
                      className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1"
                    >
                      <Icons.X className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-800 font-semibold mb-2">
                    {notificationText}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-medium text-green-700 animate-pulse">
                      Click to chat →
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-100" />
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Widget Button */}
      <button
        ref={chatButtonRef}
        onClick={handleChatToggle}
        className="fixed bottom-6 right-6 z-[9998] chat-button bg-gradient-to-br from-green-600 via-green-500 to-green-700 hover:from-green-700 hover:via-green-600 hover:to-green-800 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Open AI Chat Assistant"
      >
        {isOpen ? (
          <Icons.X className="h-6 w-6 transition-transform duration-300 rotate-0 group-hover:rotate-90" />
        ) : (
          <>
            {/* Notification indicator when chat is closed */}
            <div className="absolute -top-1 -right-1">
              <div className="relative">
                <div className="absolute -inset-1 bg-red-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-md">
                  💬
                </div>
              </div>
            </div>
            
            <Icons.MessageSquare className="h-6 w-6" />
            
            {/* Continuous wave animation when chat is closed */}
            <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping-slow opacity-75"></div>
            <div className="absolute inset-0 rounded-full border-2 border-green-300 animate-ping-slow animation-delay-1000 opacity-50"></div>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997]" />
          
          <div 
            ref={chatWindowRef}
            className="fixed bottom-20 right-4 md:right-6 z-[9998] 
                        w-[calc(100vw-2rem)] sm:w-[380px] md:w-[420px]
                        max-w-full animate-slide-up"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden scrollbar-hide flex flex-col h-[520px]">
              
              {/* Header with NAYA Logo */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <Icons.Brain className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base">
                          NAYA AI Assistant
                        </h3>
                        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-green-100 text-xs">
                        Online • {messages.length} messages
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Settings */}
                    <div className="relative">
                      <button
                        onClick={() => setShowClearConfirm(!showClearConfirm)}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <Icons.MoreVertical className="h-5 w-5" />
                      </button>

                      {showClearConfirm && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fade-in">
                          <button
                            onClick={handleExportChat}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <Icons.Download className="h-4 w-4" />
                            Export Chat History
                          </button>
                          <button
                            onClick={handleClearChat}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Icons.Trash2 className="h-4 w-4" />
                            Clear Chat History
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleChatToggle}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <Icons.X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 scrollbar-hide bg-gradient-to-b from-gray-50/50 to-white/50">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <Icons.MessageSquare className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -ins-2 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-sm"></div>
                    </div>
                    <p className="text-sm font-medium">Start a conversation</p>
                    <p className="text-xs mt-1 text-gray-400">
                      Ask me anything about NAYA Poultry
                    </p>
                    
                    {/* Quick suggestions */}
                    <div className="mt-4 grid grid-cols-2 gap-2 w-full max-w-xs">
                      {quickQuestions.slice(0, 4).map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickQuestion(q)}
                          className="text-xs bg-white/80 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50 hover:border-green-300 transition-all hover:scale-105"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.isBot ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            msg.isBot
                              ? "bg-white/90 border border-gray-200 rounded-tl-none shadow-sm"
                              : "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-tr-none shadow-md"
                          } transform transition-transform duration-200 hover:scale-[1.02]`}
                        >
                          <p className="text-sm">{msg.text}</p>

                          {/* Suggestions for bot messages */}
                          {msg.isBot && msg.suggestions && msg.suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {msg.suggestions.map((suggestion, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSuggestion(suggestion)}
                                  className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full hover:bg-green-100 transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}

                          <p
                            className={`text-[10px] mt-2 ${
                              msg.isBot ? "text-gray-400" : "text-green-200"
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white/90 border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                            </div>
                            <span className="text-xs text-gray-500">NAYA AI is typing...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input with quick questions */}
              <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
                {/* Quick questions */}
                {!isTyping && messages.length > 0 && (
                  <div className="px-3 pt-3 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-2 pb-2">
                      {quickQuestions.slice(0, 3).map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickQuestion(q)}
                          className="flex-shrink-0 text-xs bg-gray-100/80 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                        >
                          {q.length > 20 ? q.substring(0, 20) + "..." : q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input area */}
                <div className="p-3">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Ask me anything about NAYA..."
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
                      style={{ fontSize: '16px' }} // Prevents zoom on iOS
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!input.trim()}
                      className={`p-3 rounded-full transition-all ${
                        input.trim()
                          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <Icons.Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatAssistant;