import React, { useContext, useEffect } from "react";
import { ContentContext } from "../context/ContentContext";
import { useScrollReveal } from "../animation/useScrollReveal";
import Footer from "../components/homecomponents/Footer";
import Loader from "../components/Loader";

const AboutSection = () => {
  const { aboutContent, loadingAbout, loadPageContent } = useContext(ContentContext);

  // Load About page content when component mounts
  useEffect(() => {
    loadPageContent("about");
  }, []);

    // Scroll reveal refs
  const bannerRef = useScrollReveal();
  const storyTitleRef = useScrollReveal();
  const storyTextRef = useScrollReveal();
  const missionRef = useScrollReveal();
  const visionRef = useScrollReveal();
  const productsRef = useScrollReveal();
  const problemSolutionRef = useScrollReveal();

  if (loadingAbout) return <Loader />;

  const data = aboutContent?.aboutPage;
  
  if (!data)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Error loading About Page data.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">

      {/* Banner */}
      <div
        className="relative w-full h-96 lg:h-[420px] bg-cover bg-center"
        style={{ backgroundImage: `url(${data.banner.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1
            ref={bannerRef}
            className="scroll-reveal opacity-0 translate-y-10 text-5xl lg:text-7xl font-bold text-center text-white"
          >
            {data.banner.title}
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-6 lg:py-10 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(#f4b63c 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-5xl">
              <div className="mb-8 items-center">
                <div className="flex flex-col md:flex-row gap-8 items-center">

                  {/* Left Column */}
                  <div className="md:w-1/2">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-medium mb-6">
                      {data.story.since}
                    </div>

                    <h1
                      ref={storyTitleRef}
                      className="scroll-reveal opacity-0 translate-y-10 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6"
                    >
                      {data.story.title}
                    </h1>
                  </div>

                  {/* Right Column Text */}
                  <div
                    ref={storyTextRef}
                    className="scroll-reveal opacity-0 translate-y-10 md:w-1/2 text-md"
                  >
                    <p className="text-gray-600 mb-4">
                      {data.story.paragraphs[0]}
                    </p>
                    <p className="text-gray-600">{data.story.paragraphs[1]}</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Mission */}
            <div
              ref={missionRef}
              className="scroll-reveal opacity-0 translate-y-10 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {data.mission.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.mission.description}
              </p>

              <ul className="space-y-3">
                {data.mission.points.map((point, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start gap-2">
                    <span className="text-[#f4b63c] font-bold">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div
              ref={visionRef}
              className="scroll-reveal opacity-0 translate-y-10 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {data.vision.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.vision.description}
              </p>

              <ul className="space-y-3">
                {data.vision.points.map((point, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start gap-2">
                    <span className="text-[#f4b63c] font-bold">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div
              ref={productsRef}
              className="scroll-reveal opacity-0 translate-y-10 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {data.values_section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.values_section.description}
              </p>

              <ul className="space-y-3">
                {data.values_section.products.map((p, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start gap-2">
                    <span className="text-[#f4b63c] font-bold">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Problem & Solution */}
            <div
              ref={problemSolutionRef}
              className="scroll-reveal opacity-0 translate-y-10 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Problem</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.values_section.problem}
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">Solution</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.values_section.solution}
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutSection;
