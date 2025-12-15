import React, { useState } from "react";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import Footer from "../components/homecomponents/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ================= CONTACT PAGE DATA ================= */
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
  /* ================= STATE ================= */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;


  /* ================= SUBMIT HANDLER ================= */
  const handleSubmit = async (e) => {
  e.preventDefault();

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  // 1️⃣ Empty fields check
  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    toast.error("All fields are required");
    return;
  }

  // 2️⃣ Name validation
  if (trimmedName.length < 2) {
    toast.error("Name must be at least 2 characters");
    return;
  }

  // 3️⃣ Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    toast.error("Please enter a valid email address");
    return;
  }

  // 4️⃣ Message validation
  if (trimmedMessage.length < 10) {
    toast.error("Message must be at least 10 characters");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      }),
    });

    const data = await res.json();

    // 5️⃣ Backend error handling
    if (!res.ok) {
      toast.error(data.message || "Failed to send message");
      return;
    }

    toast.success(data.message || "Message sent successfully!");

    setName("");
    setEmail("");
    setMessage("");
  } catch (error) {
    toast.error("Network error. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
      {/* ================= TOAST ================= */}
      <ToastContainer />

      {/* ================= BANNER ================= */}
      <div
        className="relative w-full h-96 bg-cover bg-top"
        style={{ backgroundImage: `url(${contactPage.banner.image})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center">
            {contactPage.banner.title}
          </h1>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-20 grid lg:grid-cols-2 gap-12">
          {/* ================= LEFT ================= */}
          <div className="space-y-6">
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

            {/* ================= CONTACT DETAILS ================= */}
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
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 space-y-6 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800">
              {contactPage.rightForm.title}
            </h3>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-lime-400 rounded-full px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-lime-400 rounded-full px-4 py-3"
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-lime-400 rounded-2xl px-4 py-3 resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-lime-400 font-semibold py-3 rounded-full"
            >
              {loading ? "Sending..." : contactPage.rightForm.buttonText}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
