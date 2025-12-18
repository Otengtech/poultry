import React, { useState, useRef, useEffect } from "react";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

// AI Knowledge Base - Add your specific content here
const aiKnowledge = {
  greeting:
    "Hello! I'm NAYA's AI assistant. I can help you with product info, ordering, delivery, and more about our poultry farm.",

  faqs: {
    products: {
      response:
        "We offer fresh chicken (whole/parts), eggs, smoked chicken, and live layers. All products are farm-fresh and go through strict quality checks.",
      suggestions: ["pricing", "availability", "product details"],
    },
    ordering: {
      response:
        "You can order via: 1) WhatsApp (+233 59 711 3385), 2) Phone (+233 24 438 4928), 3) Website, or 4) Visit our branches in Adenta or Aburi.",
      suggestions: ["delivery time", "payment methods", "minimum order"],
    },
    delivery: {
      response:
        "We deliver within 24 hours across Greater Accra. Free delivery for orders above ₵300. Delivery hours: 6AM-8PM daily.",
      suggestions: ["delivery areas", "tracking", "fees"],
    },
    location: {
      response:
        "We have 2 main branches: 1) Adenta Housing Down, Accra 2) Aburi-Mariakrom, Eastern Region. Plus Madina Market stall.",
      suggestions: ["opening hours", "contact", "directions"],
    },
    quality: {
      response:
        "All products are HACCP certified, antibiotic-free, and processed in hygienic conditions. We maintain cold chain from farm to delivery.",
      suggestions: ["certifications", "freshness", "storage"],
    },
    contact: {
      response:
        "You can reach us via WhatsApp (+233 59 711 3385), phone call (+233 24 438 4928), or visit our branches in Adenta or Aburi. Email: info@nayapoultry.com",
      suggestions: ["whatsapp", "phone", "location"],
    },

    whatsapp: {
      response:
        "Yes! You can order directly via WhatsApp at +233 59 711 3385. Just send us your order list, delivery address, and preferred time.",
      suggestions: ["ordering", "delivery", "payment"],
    },

    freshness: {
      response:
        "Our products are processed daily and delivered within 24 hours. All packages have processing dates so you know exactly when they were prepared.",
      suggestions: ["quality", "storage", "delivery"],
    },

    certifications: {
      response:
        "We are HACCP certified and follow all Ghana Standards Authority guidelines. Our farms are regularly inspected by veterinary services.",
      suggestions: ["quality", "safety", "process"],
    },

    refund: {
      response:
        "We offer refunds or replacements for quality issues reported within 2 hours of delivery. Please keep products refrigerated and contact us immediately.",
      suggestions: ["quality", "support", "contact"],
    },

    minimum_order: {
      response:
        "Minimum order for home delivery is ₵100. No minimum for branch pickup. Bulk orders start from 50kg for wholesale pricing.",
      suggestions: ["pricing", "delivery", "bulk_orders"],
    },

    delivery_time: {
      response:
        "Orders placed before 12 PM are delivered same day. Orders after 12 PM are delivered next morning. You can choose 2-hour delivery windows.",
      suggestions: ["delivery", "ordering", "availability"],
    },

    live_birds: {
      response:
        "Yes, we sell live layers and broilers. Available for pickup at our farms. Delivery of live birds requires special arrangement.",
      suggestions: ["products", "availability", "contact"],
    },

    eggs: {
      response:
        "We sell fresh eggs by trays (30 pieces). Available daily from our farms. Can be ordered separately or with chicken products.",
      suggestions: ["products", "pricing", "delivery"],
    },

    smoked_chicken: {
      response:
        "Our smoked chicken is prepared using traditional methods with natural spices. Available in various sizes. Can be ordered in advance.",
      suggestions: ["products", "pricing", "ordering"],
    },

    chicken_parts: {
      response:
        "We sell chicken wings, breast, thighs, drumsticks, gizzards, and liver separately. Available fresh daily.",
      suggestions: ["products", "pricing", "ordering"],
    },

    wholesale: {
      response:
        "We supply restaurants, hotels, schools, and supermarkets. Contact our wholesale department for volume discounts and regular supply agreements.",
      suggestions: ["bulk_orders", "pricing", "contact"],
    },

    farm_tours: {
      response:
        "We offer farm tours by appointment. Visit our Aburi farm to see our operations. Group tours available for schools and organizations.",
      suggestions: ["location", "contact", "quality"],
    },

    event_catering: {
      response:
        "We supply poultry products for weddings, parties, and corporate events. Special packages available for large events.",
      suggestions: ["bulk_orders", "pricing", "contact"],
    },

    health_benefits: {
      response:
        "Our poultry is raised without antibiotics or hormones, making it healthier. Rich in protein and essential nutrients.",
      suggestions: ["quality", "certifications", "products"],
    },

    cooking_tips: {
      response:
        "For best results, thaw frozen chicken in the refrigerator overnight. Marinate for at least 2 hours for better flavor.",
      suggestions: ["storage", "products", "freshness"],
    },

    franchise: {
      response:
        "We're expanding! Contact us for franchise opportunities in different regions of Ghana.",
      suggestions: ["wholesale", "contact", "location"],
    },

    careers: {
      response:
        "We're always looking for dedicated staff. Send your CV to careers@nayapoultry.com or visit our branches.",
      suggestions: ["contact", "location"],
    },

    seasonal_specials: {
      response:
        "We offer special packages during holidays like Christmas and Easter. Follow us on social media for updates.",
      suggestions: ["products", "pricing", "ordering"],
    },
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

// Helper notification messages - More engaging messages
const notificationMessages = [
  "🧠 Need help? I can answer your questions instantly!",
  "🤔 Confused? Ask me about products, delivery, or ordering!",
  "🛒 Planning to order? I can help you choose the right products!",
  "📍 Looking for our branches? I know all our locations!",
  "💡 Want cooking tips? Ask me about preparing chicken!",
  "⏰ Need delivery info? I know our schedules and areas!",
  "💰 Questions about pricing? I have all the details!",
  "🌿 Curious about quality? Ask me about our certifications!",
  "🎯 Need specific help? I'm here to assist you!",
  "🚚 Delivery questions? I know all about our delivery network!",
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
  const minNotificationInterval = force ? 1000 : 30000; // 30 seconds minimum between notifications
  
  if (timeSinceLastNotification < minNotificationInterval && !force) {
    return;
  }

  // Clear any existing timeout
  if (notificationTimeoutRef.current) {
    clearTimeout(notificationTimeoutRef.current);
  }

  // Set notification text (use frequent notifications if force triggered)
  setNotificationText(getRandomNotification(force));
  
  // Calculate position (improved positioning)
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
        // Mobile - Position above the chat button
        x = Math.max(10, buttonRect.left - (notificationWidth / 2) + (buttonRect.width / 2));
        y = Math.max(10, buttonRect.top - notificationHeight - 20);
        
        // If not enough space above, position below
        if (y < 50) {
          y = buttonRect.bottom + 20;
        }
      } else {
        // Desktop - Try left side first
        if (buttonRect.left > notificationWidth + 40) {
          // Enough space on left
          x = buttonRect.left - notificationWidth - 20;
          y = buttonRect.top;
        } else if (viewportWidth - buttonRect.right > notificationWidth + 40) {
          // Enough space on right
          x = buttonRect.right + 20;
          y = buttonRect.top;
        } else {
          // Not enough space on sides, position above
          x = Math.max(20, buttonRect.left - (notificationWidth / 2) + (buttonRect.width / 2));
          y = Math.max(20, buttonRect.top - notificationHeight - 20);
        }
      }
      
      // Ensure it stays within viewport bounds
      x = Math.max(10, Math.min(x, viewportWidth - notificationWidth - 10));
      y = Math.max(10, Math.min(y, viewportHeight - notificationHeight - 10));
      
      return { x, y };
    } else {
      // Default position if button not found
      return {
        x: window.innerWidth - 300,
        y: window.innerHeight - 20,
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

  // Main notification interval - ALWAYS RUNS WHEN CHAT IS CLOSED
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
      
      // Conditions for showing notification:
      // 1. At least 30 seconds since last notification
      // 2. User is idle for more than 5 seconds OR scroll depth > 0.3
      // 3. Random chance (50% when conditions met)
      if (
        timeSinceLastNotification >= 30000 && 
        (idleTime > 5 || userActivity.scrollDepth > 0.3) &&
        Math.random() > 0.5
      ) {
        triggerNotification();
      }
    }, 10000); // Check every 10 seconds

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
    }, 8000); // Show first notification after 8 seconds
    
    return () => clearTimeout(timer);
  }, []);

  // Trigger notification on scroll to certain points
  useEffect(() => {
    const scrollPoints = [0.25, 0.5, 0.75];
    const currentScrollPoint = scrollPoints.find(point => 
      Math.abs(userActivity.scrollDepth - point) < 0.05
    );
    
    if (currentScrollPoint && !isOpen) {
      const timeSinceLastNotification = Date.now() - userActivity.lastNotificationTime;
      if (timeSinceLastNotification > 15000) { // 15 seconds minimum for scroll-triggered
        triggerNotification();
      }
    }
  }, [userActivity.scrollDepth, isOpen]);

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

  // AI Response Logic
  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for keywords in the message
    if (
      lowerMessage.includes("product") ||
      lowerMessage.includes("chicken") ||
      lowerMessage.includes("egg")
    ) {
      return aiKnowledge.faqs.products;
    } else if (
      lowerMessage.includes("order") ||
      lowerMessage.includes("buy") ||
      lowerMessage.includes("purchase")
    ) {
      return aiKnowledge.faqs.ordering;
    } else if (
      lowerMessage.includes("deliver") ||
      lowerMessage.includes("shipping") ||
      lowerMessage.includes("transport")
    ) {
      return aiKnowledge.faqs.delivery;
    } else if (
      lowerMessage.includes("location") ||
      lowerMessage.includes("branch") ||
      lowerMessage.includes("address")
    ) {
      return aiKnowledge.faqs.location;
    } else if (
      lowerMessage.includes("quality") ||
      lowerMessage.includes("fresh") ||
      lowerMessage.includes("safe")
    ) {
      return aiKnowledge.faqs.quality;
    } else if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return { response: aiKnowledge.greeting, suggestions: [] };
    } else {
      return {
        response: aiKnowledge.fallback,
        suggestions: ["contact", "products", "ordering"],
      };
    }
  };

  const handleSendMessage = (text = input) => {
    if (!text.trim()) return;

    // Update user activity
    setUserActivity(prev => ({ ...prev, hasInteractedWithChat: true }));

    // Add user message
    const userMessage = {
      text,
      isBot: false,
      timestamp: new Date(),
      id: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Hide any active notification
    setShowNotification(false);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = getAIResponse(text);
      const botMessage = {
        text: aiResponse.response,
        isBot: true,
        timestamp: new Date(),
        id: Date.now(),
        suggestions: aiResponse.suggestions,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleSuggestion = (suggestion) => {
    handleSendMessage(`Tell me about ${suggestion}`);
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
  };

  // Manually trigger notification (for testing)
  const triggerTestNotification = () => {
    triggerNotification(true);
  };

  return (
    <>
      {/* Animated Notification Bubble */}
      {showNotification && (
        <div
          className="fixed z-[60] cursor-pointer"
          style={{
            left: `${notificationPosition.x}px`,
            top: `${notificationPosition.y}px`,
          }}
          onClick={handleNotificationClick}
        >
          <div className="relative">
            {/* Pulsing effect around the notification */}
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
                      NAYA AI Assistant
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
                      Click here to chat! →
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

      {/* Chat Widget Button with enhanced animations */}
      <button
        ref={chatButtonRef}
        onClick={handleChatToggle}
        className="fixed bottom-6 right-6 z-50 chat-button bg-gradient-to-br from-green-600 via-green-500 to-green-700 hover:from-green-700 hover:via-green-600 hover:to-green-800 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Open AI Chat Assistant"
      >
        {isOpen ? (
          <>
            <Icons.X className="h-6 w-6 transition-transform duration-300 rotate-0 group-hover:rotate-90" />
          </>
        ) : (
          <>
            {/* Always show notification indicator when chat is closed */}
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
        <div className="fixed bottom-20 right-4 md:right-6 z-40 
                        w-[95vw] sm:w-[380px] md:w-[420px] lg:w-[460px]
                        max-w-full animate-slide-up">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden scrollbar-hide flex flex-col h-[520px]">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Icons.Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">
                      NAYA AI Assistant
                    </h3>
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
                          onClick={() => {
                            setShowClearConfirm(false);
                            handleClearChat();
                          }}
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
            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide bg-gradient-to-b from-gray-50 to-white">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="relative mb-4">
                    <Icons.MessageSquare className="h-12 w-12 opacity-50" />
                    <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-sm"></div>
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
                        className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50 hover:border-green-300 transition-all hover:scale-105"
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
                            ? "bg-white border border-gray-200 rounded-tl-none shadow-sm"
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
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
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
            <div className="border-t border-gray-200 bg-white">
              {/* Quick questions */}
              {!isTyping && messages.length > 0 && (
                <div className="px-3 pt-3 overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2 pb-2">
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickQuestion(q)}
                        className="flex-shrink-0 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                      >
                        {q.length > 25 ? q.substring(0, 25) + "..." : q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input area */}
              <div className="p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask me anything about NAYA..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
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
      )}

    </>
  );
};

export default ChatAssistant;