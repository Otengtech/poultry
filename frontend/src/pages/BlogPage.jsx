import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Footer from "../components/homecomponents/Footer";

/* ================= BLOG PAGE JSON ================= */
const blogPage = {
  banner: "../../assets/banner.jpg",
  title: "Our Latest Blog Posts",
  text: "Stay updated with the latest news, stories, and insights from our team.",
  blogs: [
    {
      id: 1,
      img: "../../assets/blog1.jpg",
      title: "How to Improve Your Poultry Farm Productivity",
      description:
        "Learn the best practices to boost productivity in poultry farming while maintaining quality.",
      category: "Farming Tips",
      date: "2025-01-10",
    },
    {
      id: 2,
      img: "../../assets/blog2.jpg",
      title: "Sustainable Practices for Local Farmers",
      description:
        "Discover sustainable farming techniques that help the environment and increase efficiency.",
      category: "Sustainability",
      date: "2025-01-15",
    },
    {
      id: 3,
      img: "../../assets/blog3.jpg",
      title: "How to Process Chicken for Longer Shelf-Life",
      description:
        "A complete guide on processing chicken locally to ensure freshness and reduce waste.",
      category: "Processing",
      date: "2025-01-20",
    },
    {
      id: 4,
      img: "../../assets/blog4.jpg",
      title:
        "Top 5 Challenges in Poultry Farming and How to Overcome Them",
      description:
        "Identify the common challenges poultry farmers face and strategies to solve them.",
      category: "Farming Tips",
      date: "2025-01-25",
    },
    {
      id: 5,
      img: "../../assets/blog5.jpg",
      title: "The Importance of Animal Welfare in Poultry Farms",
      description:
        "Why maintaining animal welfare is crucial for sustainable and ethical farming.",
      category: "Animal Care",
      date: "2025-01-28",
    },
    {
      id: 6,
      img: "../../assets/image3.jpg",
      title: "Innovations in Poultry Feed for Healthy Chickens",
      description:
        "Learn about new feed innovations that boost growth and maintain chicken health.",
      category: "Nutrition",
      date: "2025-02-01",
    },
  ],
};

const BlogCarouselSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-lime-50 to-white overflow-hidden">
      {/* ================= BANNER ================= */}
      <div
        className="relative w-full h-96 lg:h-[420px] bg-cover bg-center"
        style={{ backgroundImage: `url(${blogPage.banner})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-center text-white">
            {blogPage.title}
          </h1>
        </div>
      </div>

      {/* ================= INTRO TEXT ================= */}
      <div className="max-w-3xl mx-auto text-center mt-12 px-4">
        <p className="text-gray-700 text-lg">{blogPage.text}</p>
      </div>

      {/* ================= BLOG GRID ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPage.blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Image */}
            <div className="h-56 overflow-hidden">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-lime-100 text-lime-600 rounded-full text-xs font-semibold">
                  {blog.category}
                </span>
                <span className="text-sm text-gray-500">
                  {blog.date}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-lime-600 transition-colors">
                {blog.title}
              </h3>

              <p className="text-gray-600 mb-6 line-clamp-3">
                {blog.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </section>
  );
};

export default BlogCarouselSection;
