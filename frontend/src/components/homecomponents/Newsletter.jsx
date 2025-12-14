import React, { useState } from "react";
import { useScrollReveal } from "../../animation/useScrollReveal";

const Newsletter = ({ content }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const API_URL = import.meta.env.VITE_API_URI;
  const sectionRef = useScrollReveal();

  if (!content) return null;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch(`${API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Subscription failed");
      }

      setStatus({
        loading: false,
        success: data.message || "Subscribed successfully!",
        error: null,
      });

      setEmail("");
    } catch (err) {
      setStatus({
        loading: false,
        success: null,
        error: err.message || "Something went wrong",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="scroll-reveal opacity-0 translate-y-8 max-w-7xl mx-auto px-4 py-12"
    >
      <div className="bg-lime-100 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {content.title}
        </h2>

        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          {content.description}
        </p>

        <form
          onSubmit={handleSubscribe}
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={content.inputPlaceholder}
            className="flex-grow px-6 py-3 rounded-full border focus:ring-2 focus:ring-lime-400"
            required
          />

          <button
            type="submit"
            disabled={status.loading}
            className="px-8 py-3 bg-lime-400 text-white font-semibold rounded-full hover:bg-lime-500 transition"
          >
            {status.loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {status.success && (
          <p className="text-lime-600 mt-4 font-medium">
            {status.success}
          </p>
        )}

        {status.error && (
          <p className="text-red-500 mt-4 font-medium">
            {status.error}
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
