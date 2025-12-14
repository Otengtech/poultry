import React from "react";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

/* =========================
   JSON CONTENT (DIRECT USE)
========================= */
const whyChooseUs = {
  title: "Quality, innovation and food safety.",
  text1:
    "NAYA Success Axis is an Agribusiness that started as a backyard poultry farm in 2018. It was registered as a fulltime business in April 2019 at the Registrar General Department. It currently has 2 branches in Accra – Adenta and Aburi - Mariakrom in the Eastern Region.",
  products: [
    {
      id: "1",
      category: "Layer",
      link: "/products",
      image: "../../assets/blog3.jpg",
      text: "Healthy, well-raised live poultry layers sourced from trusted farms.",
    },
    {
      id: "2",
      category: "Fresh Eggs",
      link: "/products",
      image: "../../assets/eggs.jpg",
      text: "Farm-fresh eggs collected daily, ensuring natural taste and quality.",
    },
    {
      id: "3",
      category: "Broiler Meat",
      link: "/products",
      image: "../../assets/p2.webp",
      text: "Clean, high-quality broiler wings, breast, thighs, neck, full broiler etc.",
    },
    {
      id: "4",
      category: "Smoked Chicken",
      link: "/products",
      image: "../../assets/p1.avif",
      text: "Healthy smoked chicken in various prices and sizes, very clean and hygienic.",
    },
  ],
  image: "../../assets/img1.jpg",
  title2: "We take care of your health",
  text2:
    "Our poultry and eggs are sourced from healthy, well-maintained farms to ensure that every product you consume is safe, nutritious, and of the highest quality. Your health is our priority.",
};

/* =========================
   COMPONENT
========================= */
const AboutSection = () => {
  const { title, text1, products, image, title2, text2 } = whyChooseUs;

  return (
    <section className="bg-gray-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <span className="text-sm font-semibold text-green-700 uppercase">
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              {title}
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-600">{text1}</p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-lime-400 px-6 py-3 rounded-full font-medium"
            >
              Learn more <Icons.ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition"
            >
              <img
                src={item.image}
                alt={item.category}
                className="h-48 w-full object-cover rounded-t-xl"
              />
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold">{item.category}</h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
                <Link
                  to={item.link}
                  className="text-lime-600 text-sm font-medium inline-flex items-center gap-1"
                >
                  View products <Icons.ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FEATURE IMAGE */}
        <div className="relative rounded-2xl overflow-hidden mb-20">
          <img
            src={image}
            alt="Organic farming"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute bottom-8 left-8 max-w-xl text-white">
            <h3 className="text-3xl font-bold mb-3">{title2}</h3>
            <p className="text-gray-200 mb-6">{text2}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-lime-400 text-gray-700 px-6 py-3 rounded-full font-medium"
            >
              Browse Products <Icons.ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
