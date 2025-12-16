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

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef(null);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("naya_chat_messages");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string dates back to Date objects
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

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  return (
    <>
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Open AI Chat Assistant"
      >
        {isOpen ? (
          <Icons.X className="h-6 w-6" />
        ) : (
          <>
            <Icons.MessageSquare className="h-6 w-6" />
            {messages.length > 2 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {Math.min(messages.length, 9)}
              </span>
            )}
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-10 right-6 z-40 w-[500px] max-w-[calc(100vw-3rem)]">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[600px]">
            {/* Header with Settings Menu */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Icons.Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">NAYA AI Assistant</h3>
                    <p className="text-green-100 text-sm">
                      Online • {messages.length} messages
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {/* Settings Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowClearConfirm(!showClearConfirm)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      aria-label="Chat settings"
                    >
                      <Icons.MoreVertical className="h-5 w-5" />
                    </button>

                    {/* Settings Dropdown Menu */}
                    {showClearConfirm && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
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
                        <div className="border-t border-gray-200 mt-2 pt-2 px-4">
                          <p className="text-xs text-gray-500">
                            Chat is saved locally in your browser
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close chat"
                  >
                    <Icons.X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Icons.MessageSquare className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium">No messages yet</p>
                  <p className="text-sm mt-1">
                    Start a conversation with NAYA AI
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.isBot ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.isBot
                            ? "bg-white border border-gray-200 rounded-tl-none"
                            : "bg-green-600 text-white rounded-tr-none"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        {msg.suggestions && msg.suggestions.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {msg.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSuggestion(suggestion)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                  msg.isBot
                                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                                    : "bg-green-700 hover:bg-green-800"
                                }`}
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                        <p
                          className={`text-xs mt-2 ${
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
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3">
                        <div className="flex items-center gap-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Quick Questions */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 font-medium">
                  Quick questions:
                </p>
                {messages.length > 5 && (
                  <button
                    onClick={handleClearChat}
                    className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                  >
                    <Icons.Trash2 className="h-3 w-3" />
                    Clear all
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-medium transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about products, delivery, ordering..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim()}
                  className={`p-3 rounded-full transition-colors ${
                    input.trim()
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  aria-label="Send message"
                >
                  <Icons.Send className="h-5 w-5" />
                </button>
              </div>

              {/* Contact Links */}
              <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
                <a
                  href="https://wa.me/233XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm"
                >
                  <Icons.MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href="tel:+233302XXXXXX"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm"
                >
                  <Icons.Phone className="h-4 w-4" />
                  Call Us
                </a>
                <Link
                  to="/how-we-operate"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm"
                >
                  <Icons.Info className="h-4 w-4" />
                  How We Operate
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
