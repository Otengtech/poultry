import React, { useContext, useEffect } from "react";
import { ContentContext } from "../context/ContentContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Footer from "../components/homecomponents/Footer";
import Loader from "../components/Loader";

const BlogCarouselSection = () => {
  const { blogContent, loadingBlog, loadPageContent } =
    useContext(ContentContext);

  useEffect(() => {
    loadPageContent("blog");
  }, []);

  if (loadingBlog) return <Loader />;

  const data = blogContent?.blogPage;

  if (!data)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Error loading Blog Page data.</p>
      </div>
    );

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-lime-50 to-white overflow-hidden">
      {/* Banner */}
      <div
        className="relative w-full h-96 lg:h-[420px] bg-cover bg-center"
        style={{ backgroundImage: `url(${data.banner})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-center text-white">
            {data.title}
          </h1>
        </div>
      </div>

      {/* Intro Text */}
      <div className="max-w-3xl mx-auto text-center mt-12 px-4">
        <p className="text-gray-700 text-lg">{data.text}</p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-700 ease-out hover:shadow-xl"
          >
            {/* Blog Image */}
            <div className="h-56 overflow-hidden">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Blog Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-lime-100 text-lime-600 rounded-full text-xs font-semibold">
                  {blog.category}
                </span>
                <span className="text-sm text-gray-500">{blog.date}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-lime-600 transition-colors duration-300">
                {blog.title}
              </h3>

              <p className="text-gray-600 mb-6 line-clamp-3">
                {blog.description}
              </p>

              <Link
                to={`/blog/${blog.id}`}
                className="inline-flex items-center text-lime-600 font-semibold hover:text-lime-700 group"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </section>
  );
};

export default BlogCarouselSection;
