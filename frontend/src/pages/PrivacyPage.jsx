import React from "react";
import Footer from "../components/homecomponents/Footer";
import { useScrollReveal } from "../animation/useScrollReveal";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 text-gray-800">
      {/* Header */}
      <div className="bg-amber-500 text-white py-16 text-center shadow-lg">
        <h1 className="text-5xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-lg opacity-90">Your privacy matters to us</p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-14 leading-relaxed">
        {/* Section 1 */}
        <section ref={useScrollReveal({ threshold: 0.2 })}>
          <h2 className="text-3xl font-bold mb-3">1. Introduction</h2>
          <p>
            This Privacy Policy explains how we collect, use, and protect your
            information whenever you visit our website or interact with our
            services. We are committed to keeping your information safe and being
            transparent about how it is handled.
          </p>
        </section>

        {/* Section 2 */}
        <section ref={useScrollReveal({ threshold: 0.2 })}>
          <h2 className="text-3xl font-bold mb-3">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc ml-6 mt-3 space-y-1">
            <li>Basic contact details such as name and email</li>
            <li>Messages or inquiries you send to us</li>
            <li>Non-personal browsing data like pages visited</li>
          </ul>
          <p className="mt-3">
            We do <strong>not</strong> collect sensitive or unnecessary personal
            information.
          </p>
        </section>

        {/* Section 3 */}
        <section ref={useScrollReveal({ threshold: 0.2 })}>
          <h2 className="text-3xl font-bold mb-3">3. How We Use Your Information</h2>
          <p>We only use your information for purposes such as:</p>
          <ul className="list-disc ml-6 mt-3 space-y-1">
            <li>Responding to your messages or customer service requests</li>
            <li>Improving website performance and user experience</li>
            <li>Providing updates about our services (only if you request them)</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section ref={useScrollReveal({ threshold: 0.2 })}>
          <h2 className="text-3xl font-bold mb-3">4. Cookies & Website Data</h2>
          <p>
            Our website may use basic cookies to improve performance and remember
            preferences. You may disable cookies through your browser settings if
            you prefer.
          </p>
        </section>

        {/* Section 5 */}
        <section ref={useScrollReveal({ threshold: 0.2 })}>
          <h2 className="text-3xl font-bold mb-3">5. Sharing of Information</h2>
          <p>
            We do not sell or share your personal information with third parties.
            Information is only shared when necessary to operate the website or
            when legally required.
          </p>
        </section>

        {/* Section 6 */}
        <section ref={useScrollReveal({ threshold: 0.2 })}>
          <h2 className="text-3xl font-bold mb-3">6. Your Choices & Rights</h2>
          <p>
            You may request that we update or delete your contact information at
            any time. You can also opt out of receiving any communications from us.
          </p>
        </section>

        {/* Section 7 */}
        <section ref={useScrollReveal({ threshold: 0.2 })}>
          <h2 className="text-3xl font-bold mb-3">7. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with a new update date.
          </p>
        </section>

        {/* Section 8 */}
        <section ref={useScrollReveal({ threshold: 0.2 })}>
          <h2 className="text-3xl font-bold mb-3">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, feel free to
            contact us through our website’s contact page.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
