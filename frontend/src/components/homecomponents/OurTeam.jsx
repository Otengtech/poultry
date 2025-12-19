import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { useScrollReveal } from "../../animation/useScrollReveal";
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

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ==============================
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
                Our team works really hard to keep this wonderful company going
                to produce and meet consumers' needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <Link
                  to="/about"
                  className="inline-flex items-center px-8 py-4 bg-lime-400 text-gray-800 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all group"
                >
                  View Full Team
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
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
        <div className="relative">
          {/* Horizontal Scroll Container */}
          <div className="flex space-x-8 pb-4 overflow-x-auto scrollbar-hide">
            {staff.slice(0, 3).map((member, index) => (
  <div key={index} className="flex-shrink-0 w-[280px]">
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x400";
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold text-white bg-lime-600 rounded-full">
            {member.position}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {member.name}
          </h3>
          <p className="text-sm font-semibold text-lime-600 mb-2">
            {member.title}
          </p>
          <p className="text-xs text-gray-600 mb-4 line-clamp-2">
            {member.bio}
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <a
            href="#"
            className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-3.5 h-3.5" />
          </a>
          <a
            href="#"
            className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-pink-600 hover:text-white transition-colors duration-200"
            aria-label="Instagram"
          >
            <FaInstagram className="w-3.5 h-3.5" />
          </a>
          <a
            href="#"
            className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-200"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  </div>
))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
