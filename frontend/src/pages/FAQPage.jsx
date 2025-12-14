import React from "react";
import { useScrollReveal } from "../animation/useScrollReveal";
import { ChevronDown } from "lucide-react";
import Footer from "../components/homecomponents/Footer";

const FAQPage = () => {
  const titleRef = useScrollReveal();
  const sectionRef = useScrollReveal();

  const faqs = [
    {
      q: "What products do you offer?",
      a: "We provide a wide range of high-quality agricultural products including poultry birds, fresh organic meats, eggs, and premium farm supplies sourced from trusted farms.",
    },
    {
      q: "Do you offer delivery?",
      a: "Yes, we offer fast and reliable delivery services to your location. Delivery times vary depending on your distance and order type.",
    },
    {
      q: "How can I contact customer support?",
      a: "You can reach our support team 24/7 through phone, WhatsApp, email, or social media. We’re always here to help.",
    },
    {
      q: "Are your products organic?",
      a: "Yes, many of our products are 100% organic, free from harmful chemicals, and sourced from healthy, well-maintained farms.",
    },
    {
      q: "Can I make bulk orders?",
      a: "Absolutely! We offer special pricing and handling for bulk orders. Contact us directly to get a custom quote.",
    },
  ];

  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-amber-500 text-white py-16 text-center shadow-lg">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          FFrequently Asked Questions
        </h1>
        <p className="text-lg text-white">
          Find answers to common questions about our products and services.
        </p>
      </div>
      <section className="py-20 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-5 max-w-4xl">
          {/* FAQ LIST */}
          <div
            ref={sectionRef}
            className="scroll-reveal opacity-0 translate-y-8 space-y-4"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {faq.q}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    openIndex === index ? "max-h-40 p-5 pt-0" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FAQPage;
