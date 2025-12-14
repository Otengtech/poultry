import React from "react";
import { useScrollReveal } from "../animation/useScrollReveal";
import Footer from "../components/homecomponents/Footer";

const data = {
  banner: {
    title: "ABOUT PAGE",
    image: "../../assets/banner1.jpg",
  },
  story: {
    since: "Since 2018",
    title: "This Is Our Story",
    paragraphs: [
      "NAYA Axis FOODS is an Agribusiness that started as a backyard poultry farm in 2018. It was registered as a fulltime business in April 2019 at the Registrar General Department. It Currently has 2 branches in Accra – Adenta and Aburi - Mariakrom in the Eastern Region. NAYA Success Axis aims to be one of the poultry giants in Ghana and the subregion.",
      "The core business is Poultry farming & processing to increase the shelf-life of chicken and add variety to locally produced chicken. The business employs Four(4) fulltime staff and Four(4) other part-time and casual staff. We have over Thirty(30) others working indirectly along our value chain operations.",
    ],
  },
  mission: {
    title: "Our Mission",
    description:
      "To provide convenient, ready-to-consume, locally raised (and spiced) Chicken with longer shelf-life and Eggs to consumers.",
    points: [
      "Deliver premium quality poultry products",
      "Promote sustainable farming practices",
      "Ensure animal welfare in all operations",
      "Support local farming communities",
    ],
  },
  vision: {
    title: "Our Vision",
    description:
      "Leader in locally produced poultry products, changing mindsets, and making positive impact in communities",
    points: [
      "Lead in sustainable poultry farming",
      "Expand nationwide with quality standards",
      "Innovate with eco-friendly technologies",
      "Educate next-generation farmers",
    ],
  },
  values_section: {
    title: "Products",
    description: "The business currently has the following products on the shelf;",
    products: [
      "Poultry / Chicken Eggs",
      "Broiler and Layer Chickens",
      "Charcoal Smoked Chicken",
      "Spicy Grilled Chicken",
      "Chicken Chips and Khebabs",
      "Poultry Manure",
      "Dog Food from the Offal",
    ],
    problem:
      "Local poultry processors in Ghana lack the infrastructure and equipment to produce chicken cuts and other processed options and varieties preferred by most consumers.",
    solution:
      "Crunchy Chicken Chips made with locally reared chicken, spiced, dried, and thinly sliced to last for not less than one month. Our solution adds value to chicken to increase shelf-life and reduce post-harvest losses.",
  },
};

const AboutSection = () => {
  const bannerRef = useScrollReveal();
  const storyTitleRef = useScrollReveal();
  const storyTextRef = useScrollReveal();
  const missionRef = useScrollReveal();
  const visionRef = useScrollReveal();
  const productsRef = useScrollReveal();
  const problemSolutionRef = useScrollReveal();

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
            className="scroll-reveal opacity-0 translate-y-10 text-5xl lg:text-7xl font-bold text-white"
          >
            {data.banner.title}
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block px-4 py-2 mb-4 bg-amber-100 text-amber-800 rounded-full">
              {data.story.since}
            </span>
            <h2
              ref={storyTitleRef}
              className="scroll-reveal opacity-0 translate-y-10 text-4xl font-black mb-4"
            >
              {data.story.title}
            </h2>
          </div>

          <div
            ref={storyTextRef}
            className="scroll-reveal opacity-0 translate-y-10 text-gray-600 space-y-4"
          >
            {data.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Products, Problem & Solution */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          {/* Mission */}
          <div ref={missionRef} className="scroll-reveal p-8 rounded-3xl bg-amber-50">
            <h3 className="text-3xl font-bold mb-4">{data.mission.title}</h3>
            <p className="mb-6">{data.mission.description}</p>
            <ul className="space-y-2">
              {data.mission.points.map((m, i) => (
                <li key={i}>• {m}</li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div ref={visionRef} className="scroll-reveal p-8 rounded-3xl bg-orange-50">
            <h3 className="text-3xl font-bold mb-4">{data.vision.title}</h3>
            <p className="mb-6">{data.vision.description}</p>
            <ul className="space-y-2">
              {data.vision.points.map((v, i) => (
                <li key={i}>• {v}</li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div ref={productsRef} className="scroll-reveal p-8 rounded-3xl bg-amber-50">
            <h3 className="text-3xl font-bold mb-4">{data.values_section.title}</h3>
            <p className="mb-6">{data.values_section.description}</p>
            <ul className="space-y-2">
              {data.values_section.products.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </div>

          {/* Problem & Solution */}
          <div
            ref={problemSolutionRef}
            className="scroll-reveal p-8 rounded-3xl bg-orange-50"
          >
            <h3 className="text-3xl font-bold mb-2">Problem</h3>
            <p className="mb-6">{data.values_section.problem}</p>

            <h3 className="text-3xl font-bold mb-2">Solution</h3>
            <p>{data.values_section.solution}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutSection;
