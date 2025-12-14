import React, { useContext, useEffect, useRef } from "react";
import { ContentContext } from "../context/ContentContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import {
  ArrowRight,
  Facebook,
  MessageCircle,
  Twitter,
  Instagram,
  Linkedin,
  Award,
  Shield,
  Clock,
  Users,
  Mail,
  Phone
} from "lucide-react";
import { useScrollReveal } from "../animation/useScrollReveal";
import Footer from "../components/homecomponents/Footer";

// Social Icon Component
const SocialIcon = ({ platform, size = "h-4 w-4", className = "" }) => {
  const icons = {
    facebook: Facebook,
    whatsapp: MessageCircle,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    mail: Mail,
    phone: Phone
  };
  
  const Icon = icons[platform];
  if (!Icon) return null;
  
  return <Icon className={`${size} ${className}`} />;
};

// Stats Card Component
const StatCard = ({ icon: Icon, number, label, description, delay = 0 }) => {
  const ref = useScrollReveal();
  
  return (
    <div 
      ref={ref} 
      className="scroll-reveal opacity-0 translate-y-8"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-lime-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="p-3 bg-lime-100 rounded-xl group-hover:bg-lime-500 transition-colors">
              {/* Use the icon passed as prop */}
              <Icon className="h-6 w-6 text-lime-600 group-hover:text-white transition-colors" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 group-hover:text-lime-600 transition-colors">
              {number}
            </div>
            <div className="text-sm font-semibold text-gray-700 mt-1">{label}</div>
            {description && (
              <p className="text-xs text-gray-500 mt-2">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// Team Member Card Component
const TeamMemberCard = ({ member, index }) => {
  const ref = useScrollReveal();
  const delay = (index % 4) * 100; // Stagger animation based on position
  
  return (
    <div 
      ref={ref} 
      className="scroll-reveal opacity-0 translate-y-8"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-lime-200 transform hover:-translate-y-1 cursor-pointer">
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Position Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 text-xs font-bold text-white bg-lime-600/90 backdrop-blur-sm rounded-full shadow-lg">
              {member.position}
            </span>
          </div>
          
          {/* Social Links (Appear on hover) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            {member.socials?.map((social, i) => (
              <a
                key={i}
                href="#"
                className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-lime-500 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${member.name}'s ${social} profile`}
              >
                <SocialIcon platform={social} />
              </a>
            ))}
          </div>
        </div>
        
        {/* Info Section */}
        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-lime-700 transition-colors">
              {member.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Users className="h-3 w-3 mr-1" />
              {member.department || "General Team"}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {member.shortBio || `${member.name} is a dedicated team member with expertise in their field.`}
          </p>
          
          {/* Experience & Skills */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            {member.experience && (
              <div className="flex items-center text-xs text-gray-500">
                <Award className="h-3 w-3 mr-1" />
                {member.experience}
              </div>
            )}
            
            <div className="flex items-center text-xs text-lime-600 font-medium">
              <Shield className="h-3 w-3 mr-1" />
              Expert
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading State Component
const TeamLoadingState = () => (
  <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

// Error State Component
const TeamErrorState = () => (
  <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
    <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <div className="text-red-500 mb-4">
        <Users className="h-16 w-16 mx-auto" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to load team data</h3>
      <p className="text-gray-600 mb-6">Please check your connection and try again.</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-lime-500 hover:bg-lime-600 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);

const OurTeam = () => {
  const { teamContent, loadingTeam, loadPageContent } = useContext(ContentContext);
  const pageData = teamContent?.teamPage;

  // Scroll Reveal Refs
  const titleRef = useScrollReveal();
  const textRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  // Stats data
 const stats = [
  { icon: Award, number: "15+", label: "Years Experience", description: "Collective industry experience" },
  { icon: Users, number: "100%", label: "Quality Focus", description: "Dedicated to excellence" },
  { icon: Clock, number: "24/7", label: "Support", description: "Always here to help" },
  { icon: Shield, number: "50+", label: "Projects", description: "Successfully delivered" }
];


  useEffect(() => {
    loadPageContent("team");
  }, []);

  if (loadingTeam) return <TeamLoadingState />;

  if (!pageData) return <TeamErrorState />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50/30 via-transparent to-emerald-50/20"></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <div ref={titleRef} className="scroll-reveal opacity-0 translate-y-8 mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-lime-100 text-lime-700 text-sm font-semibold rounded-full mb-6">
                <Users className="h-4 w-4 mr-2" />
                Meet Our Team
              </span>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {pageData.title || "Our Dedicated Team"}
              </h1>
              
              <div className="flex justify-center mb-6">
                <div className="h-1 w-20 bg-gradient-to-r from-lime-400 to-lime-600 rounded-full"></div>
              </div>
            </div>

            {/* Description */}
            <div ref={textRef} className="scroll-reveal opacity-0 translate-y-8 mb-12">
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {pageData.text || "We're a passionate team of experts dedicated to delivering exceptional results and building lasting relationships with our clients."}
              </p>
            </div>

            {/* CTA Section */}
            <div ref={ctaRef} className="scroll-reveal opacity-0 translate-y-8">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-lime-500 to-lime-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-lime-600 hover:to-lime-700 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Join Our Team
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                
                <Link
                  to="/about"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-lime-300 hover:text-lime-700 transition-all duration-300"
                >
                  Learn About Us
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              
              {/* Team Avatars Preview */}
              {pageData.members && pageData.members.length > 0 && (
                <div className="flex justify-center -space-x-3 mb-8">
                  {pageData.members.slice(0, 6).map((member) => (
                    <div key={member.id} className="relative group">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-12 h-12 rounded-full border-3 border-white shadow-lg object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                          {member.name.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                  {pageData.members.length > 6 && (
                    <div className="w-12 h-12 rounded-full bg-lime-100 border-3 border-white flex items-center justify-center">
                      <span className="text-lime-700 font-bold text-sm">
                        +{pageData.members.length - 6}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} delay={index * 100} />
            ))}
          </div>

          {/* Team Grid Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Experts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team of professionals brings together years of experience and passion for excellence.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pageData.members?.map((member, index) => (
              <TeamMemberCard 
                key={member.id} 
                member={member} 
                index={index} 
                totalMembers={pageData.members.length}
              />
            ))}
          </div>

          {/* Empty State for Members */}
          {(!pageData.members || pageData.members.length === 0) && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No team members found</h3>
              <p className="text-gray-500">Our team information is currently being updated.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default OurTeam;