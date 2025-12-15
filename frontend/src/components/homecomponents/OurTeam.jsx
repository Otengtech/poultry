import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"; // Import React Icons
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
        console.log("staffs data ", res.data.staff);
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
                <Link
                  to="/team"
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
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===============================
            TEAM CARDS WITH SOCIAL ICONS
        ================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {staff.map((member, index) => (
            <div key={index} ref={cardRefs} className="scroll-reveal">
              <div className="bg-lime-100 rounded-2xl shadow-md border overflow-hidden transition hover:-translate-y-2 hover:shadow-xl">
                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full md:object-cover object-fit transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* POSITION BADGE */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white bg-lime-500 rounded-full">
                    {member.position}
                  </span>

                  {/* SOCIAL ICONS - Added Here */}
                  <div className="absolute -bottom-10 right-4 flex space-x-2 transition-all duration-500 group-hover:bottom-4">
                    <a
                      href="#"
                      className="p-3 bg-white text-blue-600 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
                      aria-label="Facebook"
                    >
                      <FaFacebookF className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-white text-pink-600 rounded-full shadow-lg hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-white text-green-600 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* INFO */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-md font-semibold text-lime-600 mb-3">
                    {member.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {member.description || "Expert in poultry management"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;