import React, { useContext } from "react";
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

const OurTeam = () => {

  /* ===============================
     HARD-CODED CONTENT
  ================================ */
  const teamContent = {
    title: "Meet Our Expert Team",
    text: "Our professionals bring together creativity, experience, and dedication to help businesses grow, innovate, and succeed in a competitive digital world.",

    members: [
      {
        id: 1,
        name: "Ebenezer Oteng",
        position: "Founder & CEO",
        image: "/images/team/member-1.jpg",
        socials: ["facebook", "twitter", "linkedin"],
      },
      {
        id: 2,
        name: "Ama Mensah",
        position: "Project Manager",
        image: "/images/team/member-2.jpg",
        socials: ["linkedin", "instagram"],
      },
      {
        id: 3,
        name: "Kwame Asante",
        position: "Lead Developer",
        image: "/images/team/member-3.jpg",
        socials: ["twitter", "linkedin"],
      },
      {
        id: 4,
        name: "Akosua Boateng",
        position: "UI/UX Designer",
        image: "/images/team/member-4.jpg",
        socials: ["instagram", "facebook"],
      },
    ],
  };

  /* ===============================
     SCROLL REVEAL HOOKS
  ================================ */
  const titleRef = useScrollReveal();
  const textRef = useScrollReveal();
  const cardRefs = teamContent.members.map(() => useScrollReveal());

  /* ===============================
     SOCIAL ICON HELPER
  ================================ */
  const SocialIcon = ({ platform, size = "h-4 w-4" }) => {
    const icons = {
      facebook: Facebook,
      whatsapp: MessageCircle,
      twitter: Twitter,
      instagram: Instagram,
      linkedin: Linkedin,
    };

    const Icon = icons[platform?.toLowerCase()];
    return Icon ? <Icon className={size} /> : null;
  };

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
                {teamContent.title}
              </h1>

              <div className="h-1 w-20 bg-lime-500 rounded-full mx-auto lg:mx-0" />
            </div>

            {/* DESCRIPTION */}
            <div ref={textRef} className="scroll-reveal mt-8 space-y-6">
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed text-center lg:text-left">
                {teamContent.text}
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
                  {teamContent.members.slice(0, 4).map((member) => (
                    <div
                      key={member.id}
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
            TEAM GRID
        ================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {teamContent.members.map((member, index) => (
            <div
              key={member.id}
              ref={cardRefs[index]}
              className="scroll-reveal"
            >
              <div className="bg-lime-100 rounded-2xl shadow-md border overflow-hidden transition hover:-translate-y-2 hover:shadow-xl">

                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />

                  {/* POSITION BADGE */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white bg-lime-500 rounded-full">
                    {member.position}
                  </span>

                  {/* SOCIAL ICONS */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {member.socials.map((social, i) => (
                      <a
                        key={i}
                        href="#"
                        className="p-2 bg-white rounded-full shadow hover:bg-lime-500 hover:text-white transition"
                      >
                        <SocialIcon platform={social} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* INFO */}
                <div className="p-6 text-center">
                  <h3 className="text-md font-bold text-gray-900">
                    {member.name}
                  </h3>
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
