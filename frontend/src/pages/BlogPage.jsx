import { Helmet } from "react-helmet-async";
import Footer from "../components/homecomponents/Footer";

/* ================= BLOG PAGE JSON ================= */
const blogPage = {
  banner: "https://res.cloudinary.com/dgk47100y/image/upload/v1767571654/of1jse0agndgcaqjtdey.jpg",
  title: "Our Latest Blog Posts",
  text: "Stay updated with the latest news, stories, and insights from our team.",
  blogs: [
  {
    id: 1,
    img: "https://res.cloudinary.com/dgk47100y/image/upload/v1767573834/m29nbe1mdnavbp3xo973.jpg",
    title: "Layer Chickens and the Production of Fresh, Nutritious Eggs",
    description:
      "Our layer chickens are carefully raised to produce fresh, high-quality eggs that meet daily household and commercial needs. Proper feeding, clean housing, and good health management ensure strong eggshells and rich yolks. These eggs are ideal for cooking, baking, and breakfast meals, providing essential nutrients such as protein, vitamins, and minerals. By maintaining strict hygiene and consistent care, we ensure that every egg delivered to customers is fresh, safe, and nutritious.",
    category: "Layers & Eggs",
    date: "2025-01-10",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/dgk47100y/image/upload/v1767573782/b876sdoobg11o19st6fm.jpg",
    title: "Broiler Chickens for Tender and High-Quality Meat",
    description:
      "Our broiler chickens are raised under controlled conditions to ensure fast growth, tenderness, and excellent meat quality. With balanced nutrition and proper care, broilers develop healthy muscle suitable for everyday meals and commercial food preparation. The result is clean, fresh chicken meat that cooks evenly and delivers great taste, making it ideal for homes, restaurants, and food vendors.",
    category: "Broilers",
    date: "2025-01-15",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/dgk47100y/image/upload/v1767574027/ksnon4dv49wftyvkmvzw.jpg",
    title: "Chicken Breast: Lean Protein for Healthy Living",
    description:
      "Chicken breast is one of the healthiest and most popular cuts we offer due to its high protein content and low fat level. It is perfect for individuals focused on healthy eating, fitness, and balanced diets. Our chicken breasts are processed hygienically to maintain freshness, tenderness, and nutritional value, making them suitable for grilling, boiling, roasting, and meal prep.",
    category: "Chicken Cuts",
    date: "2025-01-20",
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/dgk47100y/image/upload/v1767569325/ixfeehmu5ehp2djnvyrc.jpg",
    title: "Drumsticks and Thighs: Rich Flavor and Versatile Cooking",
    description:
      "Chicken drumsticks and thighs are well-loved for their rich flavor, juiciness, and versatility in cooking. These cuts are ideal for frying, grilling, stews, soups, and traditional dishes. Our drumsticks and thighs are sourced from healthy broiler chickens and handled with care to ensure freshness, quality, and great taste in every meal.",
    category: "Chicken Cuts",
    date: "2025-01-25",
  },
  {
    id: 5,
    img: "https://res.cloudinary.com/dgk47100y/image/upload/v1767573782/zpcxas1oq0z8ssrpbwq2.jpg",
    title: "Farm-Fresh Eggs for Everyday Nutrition",
    description:
      "Our farm-fresh eggs come directly from well-managed layer chickens, ensuring superior quality and taste. Eggs are a rich source of protein and essential nutrients that support growth and overall health. We focus on cleanliness, proper storage, and fast delivery to ensure that customers receive eggs that are fresh, safe, and suitable for daily consumption.",
    category: "Eggs",
    date: "2025-01-28",
  },
  {
    id: 6,
    img: "https://res.cloudinary.com/dgk47100y/image/upload/v1767573780/dch8ubbykjkaqaomcn2t.jpg",
    title: "From Farm to Customer: Our Commitment to Quality Poultry Products",
    description:
      "From raising layer and broiler chickens to processing chicken breast, drumsticks, thighs, and eggs, we maintain high standards at every stage of production. Our focus on hygiene, animal care, and freshness ensures that all our poultry products meet quality expectations. This commitment allows us to deliver safe, nutritious, and reliable products to homes, restaurants, and businesses.",
    category: "Our Products",
    date: "2025-02-01",
  },
]
};

const BlogCarouselSection = () => {
  return (
    <>
    <Helmet>
        <title>Blog Page - Naya Success Axis</title>
        <meta name="description" content="Get amazing infomation about our products, services and ways you can improve upon your agricultural business." />
        <link rel="canonical" href="https://www.nayasuccessaxis.com/about" />
      </Helmet>
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
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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

              <p className="text-gray-600 mb-6">
                {blog.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </section>
    </>
  );
};

export default BlogCarouselSection;
