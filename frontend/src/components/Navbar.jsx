import React, { useState, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useCart } from "../context/cartContext"; // Import the hook

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
    const { cartCount } = useCart();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Blog", href: "/blog" },
<<<<<<< HEAD
    { label: "Event", href: "/event" },
=======
>>>>>>> 426bf429e0dad65fa47183711d36228b6744f081
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ];

  const pagesDropdownItems = [
    { label: "My Orders", href: "/order" },
    { label: "Qualities", href: "/quality" },
    { label: "Our Team", href: "/team" },
    { label: "Reviews", href: "/review" },
    { label: "Privacy", href: "/privacy" },
    { label: "FAQ", href: "/faq" },
  ];

  const socialLinks = [
    {
      icon: <Facebook size={20} />,
      label: "Facebook",
      href: "https://www.facebook.com/NayaSuccessAxis/",
    },
    {
      icon: <Instagram size={20} />,
      label: "WhatsApp",
      href: "https://www.instagram.com/nayasuccessaxisfarms/",
    },
    {
      icon: <Youtube size={20} />,
      label: "Youtube",
      href: "https://youtu.be/huUjY541_jo?si=4b3kuwjj77b7Ttl6",
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* NAVBAR MAIN ROW */}
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-bold text-lime-400 transition-colors"
            >
              <img src={logo} alt="logo" className="w-14 h-14" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium transition duration-200 hover:scale-105 ${
                    isActive
                      ? "text-lime-400"
                      : "text-gray-700 hover:text-lime-500"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Pages Dropdown for Desktop */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-lime-600 px-4 py-2 text-sm font-medium transition duration-200 hover:scale-105">
                Pages
                <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                {pagesDropdownItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm transition-colors first:rounded-t-md last:rounded-b-md ${
                        isActive
                          ? "text-lime-400 bg-green-50"
                          : "text-gray-700 hover:bg-green-50 hover:text-lime-600"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative hidden md:inline-flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              {/* Cart Count Badge - Only shows when there are items */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-white bg-red-600 rounded-full">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition duration-200 hover:scale-105"
              >
                {item.icon}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div>
            {/* Cart */}
            <Link
              to="/cart"
              className="relative mr-4 lg:hidden inline-flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              {/* Cart Count Badge - Only shows when there are items */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-white bg-red-600 rounded-full">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isMenuOpen ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sliding Menu Panel */}
          <div
            className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 ease-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-bold text-green-400"
              >
                <img src={logo} alt="logo" className="w-16 h-16" />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-gray-700 hover:text-green-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100vh-80px)] flex flex-col">
              {/* Mobile Links */}
              <div className="flex-grow">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-md text-base font-medium transition-colors mb-1 ${
                        isActive
                          ? "text-lime-400 bg-green-50"
                          : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                {/* Pages Dropdown Mobile */}
                <div className="mb-1">
                  <button
                    onClick={() => setIsPagesOpen(!isPagesOpen)}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-3 rounded-md text-base font-medium transition-colors"
                  >
                    Pages
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        isPagesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isPagesOpen
                        ? "max-h-60 opacity-100 mt-1"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {pagesDropdownItems.map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `block pl-8 pr-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                            isActive
                              ? "text-lime-400 bg-green-50"
                              : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Bottom */}
              <div className="pt-6 mt-6 border-t">
                <p className="text-sm text-gray-500 mb-3 px-4">Follow Us</p>
                <div className="flex space-x-4 px-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;
