import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useScrollReveal } from "../animation/useScrollReveal";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OurTeam = () => {
  const [staff, setStaff] = useState([]);
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

  const titleRef = useScrollReveal();
  const textRef = useScrollReveal();
  const cardRefs = useScrollReveal();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ===============================
            TOP CONTENT
        ================================ */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-16">
          <div className="lg:w-2/3 mx-auto">
            {/* TITLE */}
            <div ref={titleRef} className="scroll-reveal space-y-4">
              <span className="inline-block text-sm font-semibold text-lime-600 bg-emerald-50 px-4 py-2 rounded-full">
                Our Experts
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-center lg:text-left">
                Meet the Dedicated Team
              </h1>
              <div className="h-1 w-20 bg-lime-500 rounded-full mx-auto lg:mx-0" />
            </div>

            {/* DESCRIPTION */}
            <div ref={textRef} className="scroll-reveal mt-8 space-y-6">
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed text-center lg:text-left">
                Our team works really hard to keep this wonderful company going to produce and meet consumers' needs.
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

        {/* ===============================
            NEW TEAM CARDS DESIGN
        ================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {staff.map((member, index) => (
            <div key={index} ref={cardRefs} className="scroll-reveal">
              {/* CARD DESIGN 1: MODERN PROFILE CARD */}
              <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-lime-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x400";
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Position Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 text-xs font-bold text-white bg-lime-600/90 backdrop-blur-sm rounded-full">
                      {member.position}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="relative p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-lime-600 mb-3">
                      {member.title}
                    </p>
                    <p className="text-sm text-gray-600 mb-6 line-clamp-2">
                      {member.description || "Expert in poultry management and animal welfare"}
                    </p>
                  </div>

                  {/* Contact Info - Hidden by default, shows on hover */}
                  {/* <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="space-y-3 border-t pt-4">
                      {member.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-lime-600" />
                          <span className="truncate">{member.email}</span>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-lime-600" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      {member.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-lime-600" />
                          <span className="truncate">{member.location}</span>
                        </div>
                      )}
                    </div>
                  </div> */}

                  {/* Social Icons - Always visible */}
                  <div className="flex justify-center gap-3 mt-6 pt-4 border-t">
                    <a
                      href="#"
                      className="p-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
                      aria-label="Facebook"
                    >
                      <FaFacebookF className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="p-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="p-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-lime-500/10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:bg-lime-500/20 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;