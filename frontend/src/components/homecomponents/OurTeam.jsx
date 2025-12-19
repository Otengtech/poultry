import React, { useEffect, useState } from "react";
import { useScrollReveal } from "../../animation/useScrollReveal";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaLinkedinIn,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";

const AboutSection = () => {
  const titleRef = useScrollReveal();
  const textRef = useScrollReveal();

  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-staff`);
        setStaff(res.data.staff);
      } catch (err) {
        toast.error("error fetching staffs ", err);
      }
    };
    fetchStaffs();
  }, []);

  // Open modal with staff details
  const openStaffModal = (staffMember) => {
    setSelectedStaff(staffMember);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  // Close modal`
  const closeStaffModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
    // Restore body scrolling
    document.body.style.overflow = "auto";
  };

  // Close modal when clicking outside content
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      closeStaffModal();
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeStaffModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Staff Details Modal */}
      {isModalOpen && selectedStaff && (
        <div
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide animate-modal-fade-in">
            {/* Modal Header */}
            <div className="relative p-6 border-b border-gray-200">
              <button
                onClick={closeStaffModal}
                className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
                aria-label="Close modal"
              >
                <FaTimes className="w-6 h-6 text-gray-600" />
              </button>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Staff Image */}
                <div className="relative w-40 h-40 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-500 to-emerald-600 rounded-2xl transform rotate-3" />
                  <img
                    src={selectedStaff.image}
                    alt={selectedStaff.name}
                    className="relative w-full h-full object-cover rounded-2xl border-4 border-white shadow-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x400";
                    }}
                  />
                </div>

                {/* Staff Basic Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedStaff.name}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-100 text-lime-800 rounded-full mb-4">
                    <FaBriefcase className="w-4 h-4" />
                    <span className="font-semibold">{selectedStaff.title}</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {selectedStaff.position} at NAYA SUCCESS AXIS
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column - Bio */}
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Biography
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedStaff.bio ||
                      `${selectedStaff.name} is a dedicated professional with extensive experience in poultry farming and agribusiness management. They play a crucial role in NAYA SUCCESS AXIS's mission to deliver high-quality poultry products while promoting sustainable farming practices.`}
                  </p>

                  {/* Responsibilities */}
                  {selectedStaff.responsibilities && (
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {selectedStaff.responsibilities
                          .split(",")
                          .map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 mt-2 bg-lime-500 rounded-full flex-shrink-0" />
                              <span className="text-gray-700">{item.trim()}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Column - Contact & Details */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      {selectedStaff.email && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <FaEnvelope className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <a
                              href={`mailto:${selectedStaff.email}`}
                              className="text-blue-600 hover:underline font-medium"
                            >
                              {selectedStaff.email}
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedStaff.phone && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-50 rounded-lg">
                            <FaPhone className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <a
                              href={`tel:${selectedStaff.phone}`}
                              className="text-gray-900 font-medium"
                            >
                              {selectedStaff.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedStaff.location && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-50 rounded-lg">
                            <FaMapMarkerAlt className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="text-gray-900 font-medium">
                              {selectedStaff.location}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Connect
                    </h4>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
                        aria-label="Facebook"
                      >
                        <FaFacebookF className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="p-3 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110"
                        aria-label="Instagram"
                      >
                        <FaInstagram className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110"
                        aria-label="WhatsApp"
                      >
                        <FaWhatsapp className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Join Date */}
                  {selectedStaff.joinDate && (
                    <div className="bg-lime-50 rounded-xl p-5">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Member Since
                      </h4>
                      <p className="text-2xl font-bold text-lime-700">
                        {selectedStaff.joinDate}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <button
                  onClick={closeStaffModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===============================
          STAFF TEAM SECTION
      ================================ */}
      <section className="py-16 bg-gradient-to-b from-white to-lime-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* TOP CONTENT */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-16">
            <div className="lg:w-2/3 mx-auto">
              {/* TITLE */}
              <div ref={titleRef} className="scroll-reveal space-y-4">
                <span className="inline-block text-sm font-semibold text-lime-600 bg-emerald-50 px-4 py-2 rounded-full">
                  Our Leaders
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-center lg:text-left">
                  Meet Our Main Leaders
                </h1>
                <div className="h-1 w-20 bg-lime-500 rounded-full mx-auto lg:mx-0" />
              </div>

              {/* DESCRIPTION */}
              <div ref={textRef} className="scroll-reveal mt-8 space-y-6">
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed text-center lg:text-left">
                  Our leaders works really hard to keep this wonderful company
                  going to produce and meet consumers' needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                  {/* MEMBER THUMBNAILS */}
                  <div className="flex -space-x-2">
                    {staff.slice(0, 4).map((member, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/100";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HORIZONTAL SCROLL STAFF CARDS */}
          <div className="relative">
            {/* Scroll Container */}
            <div className="flex gap-6 md:gap-8 pb-6 overflow-x-auto scrollbar-hide">
              {staff.slice(0, 3).map((member, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[200px] md:w-[220px] lg:w-[240px] cursor-pointer transform transition-transform duration-300 hover:scale-[1.03]"
                  onClick={() => openStaffModal(member)}
                >
                  {/* COMPACT CARD DESIGN */}
                  <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full border border-gray-100 hover:border-lime-200">
                    {/* Image Container */}
                    <div className="relative h-32 md:h-36 overflow-hidden rounded-t-xl">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x400";
                        }}
                      />

                      {/* Minimal Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                      {/* Compact Position Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 text-[10px] font-semibold text-white bg-lime-600/90 rounded">
                          {member.position}
                        </span>
                      </div>
                    </div>

                    {/* Compact Content Area */}
                    <div className="p-3 md:p-4">
                      <div className="text-center">
                        <h3 className="text-sm font-bold text-gray-900 mb-1 truncate">
                          {member.name}
                        </h3>
                        <p className="text-xs font-semibold text-lime-600 mb-2 truncate">
                          {member.title}
                        </p>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-snug">
                          {member.bio || "Expert in poultry management"}
                        </p>
                      </div>

                      {/* Compact Social Icons */}
                      <div className="flex justify-center gap-2 mt-3 pt-3 border-t border-gray-100">
                        <div
                          className="p-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 hover:scale-110"
                          aria-label="Facebook"
                        >
                          <FaFacebookF className="w-3 h-3" />
                        </div>
                        <div
                          className="p-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-200 hover:scale-110"
                          aria-label="Instagram"
                        >
                          <FaInstagram className="w-3 h-3" />
                        </div>
                        <div
                          className="p-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-green-600 hover:text-white transition-all duration-200 hover:scale-110"
                          aria-label="WhatsApp"
                        >
                          <FaWhatsapp className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View All Button - If you have more than 3 staff */}
          {staff.length > 3 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
                View All Team Members ({staff.length})
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal Animation CSS */}
      <style jsx>{`
        @keyframes modal-fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-modal-fade-in {
          animation: modal-fade-in 0.3s ease-out forwards;
        }
        
        @keyframes bounce-x {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }
        
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
        
        /* Prevent body scroll when modal is open */
        body.modal-open {
          overflow: hidden;
        }
        
        /* Scrollbar styling */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Line clamp for text */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AboutSection;