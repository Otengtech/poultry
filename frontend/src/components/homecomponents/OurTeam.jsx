import React, { useContext } from "react";
import { ContentContext } from "../../context/ContentContext";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Facebook,
  MessageCircle,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useScrollReveal } from "../../animation/useScrollReveal";

const OurTeam = ({ content }) => {
  const { loading } = useContext(ContentContext);
  const data = content;

  // Scroll reveal refs
  const titleRef = useScrollReveal();
  const textRef = useScrollReveal();
  const cardRefs = data.members.map(() => useScrollReveal());
  
  if (loading || !data || !data.members) return null;


  // Social icon helper
  const SocialIcon = ({ platform, size = "h-4 w-4" }) => {
    const icons = {
      facebook: Facebook,
      whatsapp: MessageCircle,
      twitter: Twitter,
      instagram: Instagram,
      linkedin: Linkedin,
    };
    const Icon = icons[platform.toLowerCase()];
    return Icon ? <Icon className={size} /> : null;
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* TOP CONTENT */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-16">
          <div className="lg:w-2/3 mx-auto">
            {/* TITLE */}
            <div ref={titleRef} className="scroll-reveal space-y-4">
              <div className="inline-block mb-4">
                <span className="text-sm font-semibold text-lime-600 bg-emerald-50 px-4 py-2 rounded-full">
                  Our Experts
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight text-center lg:text-left">
                {data.title}
              </h1>
              <div className="h-1 w-20 bg-lime-500 rounded-full mx-auto lg:mx-0"></div>
            </div>

            {/* TEXT */}
            <div ref={textRef} className="scroll-reveal mt-8 space-y-6">
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed text-center lg:text-left">
                {data.text}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-6 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/team"
                  className="inline-flex items-center px-8 py-4 bg-lime-400 text-gray-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Our Team
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>

                {/* Member Thumbnails */}
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="flex -space-x-2">
                    {data.members.slice(0, 4).map((member) => (
                      <div
                        key={member.id}
                        className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
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
        </div>

        {/* TEAM GRID */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-6 gap-6 max-w-4xl mx-auto">
            {data.members.map((member, index) => (
              <div
                key={member.id}
                ref={cardRefs[index]}
                className="scroll-reveal rounded-2xl"
              >
                <div className="bg-lime-100 rounded-2xl shadow-md border border-gray-100 overflow-hidden h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  {/* IMAGE */}
                  <div className="relative w-full h-56 sm:h-56 lg:h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>

                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 text-xs font-semibold text-white bg-lime-500/90 rounded-full">
                        {member.position}
                      </span>
                    </div>

                    {/* Social Icons */}
                    <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
                      {member.socials.map((social, i) => (
                        <a
                          key={i}
                          href="#"
                          className="p-2 bg-white/90 rounded-full shadow-md hover:bg-lime-500 hover:text-white transition"
                        >
                          <SocialIcon platform={social} />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="p-6">
                    <h3 className="text-md font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
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
