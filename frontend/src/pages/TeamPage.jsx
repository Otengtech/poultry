import React from "react";
import { Link } from "react-router-dom";
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
  Phone,
} from "lucide-react";
import { useScrollReveal } from "../animation/useScrollReveal";
import Footer from "../components/homecomponents/Footer";

/* ================= TEAM PAGE DATA (INLINE JSON) ================= */
const teamPageData = {
  title: "Meet Our Team",
  text: "Our team works really hard to keep this wonderful company going to produce and meet consumers' needs.",
  members: [
    {
      id: "1",
      image: "../../assets/team1.jpg",
      socials: ["facebook", "whatsapp", "twitter"],
      name: "Rabie Mark",
      position: "Lead Farmer",
      description:
        "Specializes in organic farming with 15 years of experience in sustainable agriculture.",
    },
    {
      id: "2",
      image: "../../assets/team2.jpg",
      socials: ["facebook", "instagram", "linkedin"],
      name: "Sarah Johnson",
      position: "Agricultural Engineer",
      description:
        "Expert in modern irrigation systems and soil management techniques.",
    },
    {
      id: "3",
      image: "../../assets/team3.jpg",
      socials: ["whatsapp", "twitter", "linkedin"],
      name: "Miguel Kean",
      position: "Harvest Manager",
      description:
        "Oversees harvesting operations ensuring quality and efficiency across all farms.",
    },
    {
      id: "4",
      image: "../../assets/team4.jpg",
      socials: ["facebook", "instagram", "whatsapp"],
      name: "Amara Chen",
      position: "Sustainability Officer",
      description:
        "Implements eco-friendly practices and manages our green certification programs.",
    },
  ],
};

/* ================= SOCIAL ICON ================= */
const SocialIcon = ({ platform, className = "h-4 w-4" }) => {
  const icons = {
    facebook: Facebook,
    whatsapp: MessageCircle,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    mail: Mail,
    phone: Phone,
  };

  const Icon = icons[platform];
  return Icon ? <Icon className={className} /> : null;
};

/* ================= STAT CARD ================= */
const StatCard = ({ icon: Icon, number, label, description, delay }) => {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="scroll-reveal opacity-0 translate-y-8"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition border">
        <div className="flex gap-4">
          <div className="p-3 bg-lime-100 rounded-xl">
            <Icon className="h-6 w-6 text-lime-600" />
          </div>
          <div>
            <h4 className="text-2xl font-bold">{number}</h4>
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= TEAM MEMBER CARD ================= */
const TeamMemberCard = ({ member, index }) => {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="scroll-reveal opacity-0 translate-y-8"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden group">
        <div className="relative h-72">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          <div className="absolute top-4 left-4 bg-lime-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {member.position}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
            {member.socials.map((social, i) => (
              <span
                key={i}
                className="p-2 bg-white rounded-full shadow hover:bg-lime-500 hover:text-white transition"
              >
                <SocialIcon platform={social} />
              </span>
            ))}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="text-gray-600 text-sm mt-2">
            {member.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const OurTeam = () => {
  const titleRef = useScrollReveal();
  const textRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const stats = [
    {
      icon: Award,
      number: "15+",
      label: "Years Experience",
      description: "Industry expertise",
    },
    {
      icon: Users,
      number: "100%",
      label: "Quality Focus",
      description: "Commitment to excellence",
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Support",
      description: "Always available",
    },
    {
      icon: Shield,
      number: "50+",
      label: "Projects",
      description: "Successfully delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div ref={titleRef} className="scroll-reveal opacity-0 translate-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {teamPageData.title}
              </h1>
            </div>

            <div ref={textRef} className="scroll-reveal opacity-0 translate-y-8">
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {teamPageData.text}
              </p>
            </div>

            <div ref={ctaRef} className="scroll-reveal opacity-0 translate-y-8 mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-lime-500 text-white rounded-xl font-semibold hover:bg-lime-600 transition"
              >
                Join Our Team
                <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} delay={i * 100} />
            ))}
          </div>

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamPageData.members.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurTeam;
