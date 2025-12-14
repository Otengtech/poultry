import React, { useContext, useState, useEffect } from "react";
import Loader from "../components/Loader";
import { ContentContext } from "../context/ContentContext";

import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Clock,
} from "lucide-react";
import Footer from "../components/homecomponents/Footer";
import { useScrollReveal } from "../animation/useScrollReveal";

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

  // Use Vite environment variable for API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const { contactContent, loadingContact, loadPageContent } =
    useContext(ContentContext);

  // Scroll reveal refs
  const bannerRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const formRef = useScrollReveal();

  useEffect(() => {
    loadPageContent("contact");
  }, []);

  if (loadingContact) return <Loader />;

  const data = contactContent?.contactPage;
  if (!data)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Error loading Contact Page.</p>
      </div>
    );

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

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error (${res.status}): ${text}`);
      }

      const data = await res.json();
      setStatus({
        loading: false,
        success: data.message || "Message sent successfully!",
        error: null,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        success: null,
        error: "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
      {/* Banner */}
      <div
        className="relative w-full h-96 lg:h-[420px] bg-cover bg-top"
        style={{ backgroundImage: `url(${data.banner.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1
            ref={bannerRef}
            className="scroll-reveal opacity-0 translate-y-10 text-5xl lg:text-7xl font-bold text-white text-center"
          >
            {data.banner.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="relative py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-20 grid lg:grid-cols-2 gap-12">
          {/* Left Side */}
          <div
            ref={leftRef}
            className="scroll-reveal opacity-0 translate-y-10 space-y-6"
          >
            <h2 className="text-xl font-bold text-gray-700">
              {data.leftContent.heading}
            </h2>
            <h2 className="text-3xl font-bold text-lime-400">
              NAYA SUCCESS AXIS
            </h2>
            <p className="text-gray-700">{data.leftContent.description}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-lime-400" />
                <span>{data.leftContent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Postal Code:</span>
                <strong>{data.leftContent.postalCode}</strong>
              </div>
              <div>
                <strong>{data.leftContent.pickUpLocation}</strong>
                <p>{data.leftContent.deliveryInfo}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Contacts:</h3>
              <p>
                <span className="text-gray-900 font-medium">Phone:</span>{" "}
                <span className="text-gray-700">
                  {data.contacts.phoneNumbers.join(" / ")}
                </span>
              </p>
              <p>
                <span className="text-gray-900 font-medium">WhatsApp:</span>{" "}
                <span className="text-gray-700">{data.contacts.whatsapp}</span>
              </p>
              <p>
                <span className="text-gray-900 font-medium">Email:</span>{" "}
                <span className="text-gray-700">{data.contacts.email}</span>
              </p>
              <p>
                <span className="text-gray-900 font-medium">Facebook:</span>{" "}
                <span className="text-gray-700">{data.contacts.facebook}</span>
              </p>
              <p>
                <span className="text-gray-900 font-medium">Instagram:</span>{" "}
                <span className="text-gray-700">{data.contacts.instagram}</span>
              </p>
            </div>
          </div>

          {/* Right Form */}
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className="scroll-reveal opacity-0 translate-y-10 bg-white rounded-3xl p-8 space-y-6"
          >
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border border-lime-400 rounded-full px-4 py-3 text-sm focus:border-lime-400 outline-none transition-all text-gray-700 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border border-lime-400 rounded-full px-4 py-3 text-sm focus:border-lime-400 outline-none transition-all text-gray-700 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Write your message..."
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border border-lime-400 rounded-2xl px-4 py-3 text-sm focus:border-lime-400 outline-none transition-all text-gray-700 placeholder-gray-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-lime-400 text-black font-semibold py-3 rounded-full shadow-lg transition-all disabled:opacity-60"
              disabled={status.loading}
            >
              {status.loading ? "Sending..." : "Send Message"}
            </button>

            {status.success && (
              <p className="text-green-400 text-center">{status.success}</p>
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
