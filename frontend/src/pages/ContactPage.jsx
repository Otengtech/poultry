import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react";
import Footer from "../components/homecomponents/Footer";
import { useScrollReveal } from "../animation/useScrollReveal";

/* ================= CONTACT PAGE JSON ================= */
const contactPage = {
  banner: {
    title: "CONTACT PAGE",
    image: "/assets/blog4.jpg",
  },

  leftContent: {
    heading: "Produced in Ghana by",
    description:
      "We are dedicated to providing fresh, organic, and hygienically processed poultry products. Proudly produced in Ghana with high standards to serve homes, restaurants, and marketplaces.",
    location: "Adenta, Accra - Ghana",
    postalCode: "GD-0280-880",
    pickUpLocation: "Pick-up Location: Adenta",
    deliveryInfo: "Delivery options available",
  },

  contacts: {
    phoneNumbers: ["024 438 4928", "059 711 3385"],
    whatsapp: "024 438 4928",
    email: "nayasuccessaxis@gmail.com",
    facebook: "Naya Success Axis Farms",
    instagram: "nayasuccessaxisfarms",
  },

  rightForm: {
    title: "Send Us a Message",
    buttonText: "Send Message",
  },
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Scroll reveal refs
  const bannerRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const formRef = useScrollReveal();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");

      const data = await res.json();
      setStatus({
        loading: false,
        success: data.message || "Message sent successfully!",
        error: null,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        loading: false,
        success: null,
        error: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
      {/* ================= BANNER ================= */}
      <div
        className="relative w-full h-96 lg:h-[420px] bg-cover bg-top"
        style={{ backgroundImage: `url(${contactPage.banner.image})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1
            ref={bannerRef}
            className="scroll-reveal opacity-0 translate-y-10 text-5xl lg:text-7xl font-bold text-white text-center"
          >
            {contactPage.banner.title}
          </h1>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-20 grid lg:grid-cols-2 gap-12">
          {/* LEFT CONTENT */}
          <div
            ref={leftRef}
            className="scroll-reveal opacity-0 translate-y-10 space-y-6"
          >
            <h2 className="text-xl font-bold text-gray-700">
              {contactPage.leftContent.heading}
            </h2>

            <h3 className="text-3xl font-bold text-lime-400">
              NAYA SUCCESS AXIS
            </h3>

            <p className="text-gray-700">
              {contactPage.leftContent.description}
            </p>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-lime-400" />
                <span>{contactPage.leftContent.location}</span>
              </div>

              <div>
                <span className="font-semibold">Postal Code:</span>{" "}
                {contactPage.leftContent.postalCode}
              </div>

              <div>
                <strong>{contactPage.leftContent.pickUpLocation}</strong>
                <p>{contactPage.leftContent.deliveryInfo}</p>
              </div>
            </div>

            {/* CONTACT DETAILS */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Contacts:</h4>

              <p>
                <Phone className="inline w-4 h-4 text-lime-400 mr-2" />
                {contactPage.contacts.phoneNumbers.join(" / ")}
              </p>

              <p>
                <Mail className="inline w-4 h-4 text-lime-400 mr-2" />
                {contactPage.contacts.email}
              </p>

              <p>
                <Facebook className="inline w-4 h-4 text-lime-400 mr-2" />
                {contactPage.contacts.facebook}
              </p>

              <p>
                <Instagram className="inline w-4 h-4 text-lime-400 mr-2" />
                {contactPage.contacts.instagram}
              </p>
            </div>
          </div>

          {/* ================= FORM ================= */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="scroll-reveal opacity-0 translate-y-10 bg-white rounded-3xl p-8 space-y-6 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800">
              {contactPage.rightForm.title}
            </h3>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-lime-400 rounded-full px-4 py-3 text-sm"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-lime-400 rounded-full px-4 py-3 text-sm"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-lime-400 rounded-2xl px-4 py-3 text-sm resize-none"
            />

            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-gradient-to-r from-green-500 to-lime-400 font-semibold py-3 rounded-full"
            >
              {status.loading ? "Sending..." : contactPage.rightForm.buttonText}
            </button>

            {status.success && (
              <p className="text-green-500 text-center">{status.success}</p>
            )}
            {status.error && (
              <p className="text-red-500 text-center">{status.error}</p>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
