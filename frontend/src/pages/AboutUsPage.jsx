import React, { useEffect, useState} from "react";
import { useScrollReveal } from "../animation/useScrollReveal";
import Footer from "../components/homecomponents/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const data = {
  banner: {
    title: "ABOUT PAGE",
    image: "../../assets/banner1.jpg",
  },
  story: {
    since: "Since 2017",
    title: "This Is Our Story",
    paragraphs: [
      "NAYA SUCCESS AXIS is an Agribusiness that started as a backyard poultry farm in 2017. It was registered as a fulltime business in April 2019 at the Registrar General Department. It Currently has 2 branches in Accra – Adenta and Aburi - Mariakrom in the Eastern Region. NAYA SUCCESS AXIS aims to be one of the poultry giants in Ghana and the subregion.",
      "The core business is Poultry farming & processing to increase the shelf-life of chicken and add variety to locally produced chicken. The business employs Four(4) fulltime staff and Four(4) other part-time and casual staff. We have over Thirty(30) others working indirectly along our value chain operations.",
    ],
  },
  mission: {
    title: "Our Mission",
    description:
      "To provide convenient, ready-to-consume, locally raised (and spiced) Chicken with longer shelf-life and Eggs to consumers.",
    points: [
      "Deliver premium quality poultry products",
      "Promote sustainable farming practices",
      "Ensure animal welfare in all operations",
      "Support local farming communities",
    ],
  },
  vision: {
    title: "Our Vision",
    description:
      "Leader in locally produced poultry products, changing mindsets, and making positive impact in communities",
    points: [
      "Lead in sustainable poultry farming",
      "Expand nationwide with quality standards",
      "Innovate with eco-friendly technologies",
      "Educate next-generation farmers",
    ],
  },
  values_section: {
    title: "Products",
    description: "The business currently has the following products on the shelf;",
    products: [
      "Poultry / Chicken Eggs",
      "Broiler and Layer Chickens",
      "Charcoal Smoked Chicken",
      "Spicy Grilled Chicken",
      "Chicken Chips and Khebabs",
      "Poultry Manure",
      "Dog Food from the Offal",
    ],
    problem:
      "Local poultry processors in Ghana lack the infrastructure and equipment to produce chicken cuts and other processed options and varieties preferred by most consumers.",
    solution:
      "Crunchy Chicken Chips made with locally reared chicken, spiced, dried, and thinly sliced to last for not less than one month. Our solution adds value to chicken to increase shelf-life and reduce post-harvest losses.",
  },
  achievement_section: {
    title: "Achievements",
    description:" As a business, we have some remarkable achievements to date, including; acres of land acquired, a borehole to supply water, Five(5) Coops, and Five(5) room accommodation for workers, space outlined for the chicken chips production, access to market and paying customers, and business operations from 2 locations; Adenta and Aburi. We have received business support, both tangible and intangible, from many institutions including the NEIP, GEA, AdMa, GPP, TEF, MDF, GIZ, British Council and the Netherlands."
  },
  quality_assurance: {
    title: "Quality Assurance",
    description: "Guided by Standard Operating Procedures (SOP’s) developed with the CSIR and vetted by the FDA a production flow will be developed to guide production. Staff will be trained periodically to ensure compliance. A Quality Assurance member of the management team will be appointed to supervise and vet each batch of production before packaging is done for the market."
  }
};

const AboutSection = () => {
  const bannerRef = useScrollReveal();
  const storyTitleRef = useScrollReveal();
  const storyTextRef = useScrollReveal();
  const missionRef = useScrollReveal();
  const visionRef = useScrollReveal();
  const productsRef = useScrollReveal();
  const problemSolutionRef = useScrollReveal();
  const titleRef = useScrollReveal();
    const textRef = useScrollReveal();
    const cardRefs = useScrollReveal();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Banner */}
      <div
        className="relative w-full h-96 lg:h-[420px] bg-cover bg-center"
        style={{ backgroundImage: `url(${data.banner.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1
            ref={bannerRef}
            className="scroll-reveal opacity-0 translate-y-10 text-5xl lg:text-7xl font-bold text-white"
          >
            {data.banner.title}
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block px-4 py-2 mb-4 bg-amber-100 text-amber-800 rounded-full">
              {data.story.since}
            </span>
            <h2
              ref={storyTitleRef}
              className="scroll-reveal opacity-0 translate-y-10 text-4xl font-black mb-4"
            >
              {data.story.title}
            </h2>
          </div>

          <div
            ref={storyTextRef}
            className="scroll-reveal opacity-0 translate-y-10 text-gray-600 space-y-4"
          >
            {data.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Products, Problem & Solution */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          {/* Mission */}
          <div className=" p-8 rounded-3xl bg-amber-50">
            <h3 className="text-3xl font-bold mb-4">{data.mission.title}</h3>
            <p className="mb-6">{data.mission.description}</p>
            <ul className="space-y-2">
              {data.mission.points.map((m, i) => (
                <li key={i}>• {m}</li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-3xl bg-orange-50">
            <h3 className="text-3xl font-bold mb-4">{data.vision.title}</h3>
            <p className="mb-6">{data.vision.description}</p>
            <ul className="space-y-2">
              {data.vision.points.map((v, i) => (
                <li key={i}>• {v}</li>
              ))}
            </ul>
          </div>
          {/* Products */}
          <div ref={productsRef} className="scroll-reveal p-8 rounded-3xl bg-amber-50">
            <h3 className="text-3xl font-bold mb-4">{data.values_section.title}</h3>
            <p className="mb-6">{data.values_section.description}</p>
            <ul className="space-y-2">
              {data.values_section.products.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </div>

          {/* Problem & Solution */}
          <div
            ref={problemSolutionRef}
            className="scroll-reveal p-8 rounded-3xl bg-orange-50"
          >
            <h3 className="text-3xl font-bold mb-2">Problem</h3>
            <p className="mb-6">{data.values_section.problem}</p>

            <h3 className="text-3xl font-bold mb-2">Solution</h3>
            <p>{data.values_section.solution}</p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
              {/* Acievement */}
          <div className="p-8 rounded-3xl bg-amber-50">
            <h3 className="text-3xl font-bold mb-4">{data.achievement_section.title}</h3>
            <p className="mb-6">{data.achievement_section.description}</p>
          </div>

          {/* Quality Assurance */}
          <div className="p-8 rounded-3xl bg-amber-50">
            <h3 className="text-3xl font-bold mb-4">{data.quality_assurance.title}</h3>
            <p className="mb-6">{data.quality_assurance.description}</p>
          </div>
        </div>
      </section>

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
                  Our leaders works really hard to keep this wonderful company going to produce and meet consumers' needs.
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
                <div key={index} className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[350px]">
                  {/* CARD DESIGN 1: MODERN PROFILE CARD */}
                  <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-lime-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Image Container */}
                    <div className="relative h-64 md:h-72 overflow-hidden">
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
                        <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                          {member.bio || "Expert in poultry management and animal welfare"}
                        </p>
                      </div>
  
                      {/* Social Icons */}
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
  
            {/* Scroll Indicators - Optional */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {staff.slice(0, 3).map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-lime-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
  
            {/* Scroll Hint - Visible on desktop */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4">
              <div className="flex items-center gap-1 text-gray-400">
                <span className="text-sm">Scroll</span>
                <svg className="w-5 h-5 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
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

      <Footer />
    </div>
  );
};

export default AboutSection;
