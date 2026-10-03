import HeroSection from "../components/homecomponents/HeroSection";
import WhyChooseUsSection from "../components/homecomponents/WhyChooseUs";
import Newsletter from "../components/homecomponents/Newsletter";
import OurTeam from "../components/homecomponents/OurTeam";
import TestimonialSection from "../components/homecomponents/TestimonialsSection";
import Footer from "../components/homecomponents/Footer";
import Supply from "../components/homecomponents/Supply";
import Location from "../components/homecomponents/Location";
import LatestPoultry from "../components/LatestPoultry";
import HowWeOperate from "../components/homecomponents/HowWeOperate";
import { Helmet } from "react-helmet-async";

const Home = () => {
  // Structured data for site name (WebSite)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Naya Success Axis",
    alternateName: ["Naya Success Axis Ghana", "Naya Poultry"],
    url: "https://www.nayasuccessaxis.com/",
  };

  // Structured data for logo (Organization)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Naya Success Axis",
    url: "https://www.nayasuccessaxis.com/",
    logo: "https://www.nayasuccessaxis.com/logo.jpg",
  };

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Naya Success Axis: Ghana poultry farm since 2017. Fresh chicken, eggs & poultry products in Accra & Eastern Region. Quality poultry farming & processing."
        />
        <meta
          name="keywords"
          content="Naya Success Axis Ghana, poultry farm Ghana, chicken Ghana, eggs Ghana, poultry products, agriculture Ghana, poultry processing"
        />
        <meta name="author" content="Naya Success Axis" />
        <meta name="robots" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.nayasuccessaxis.com/" />

        {/* Favicon */}
        <link rel="icon" href="/logo.png" type="image/jpg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />

        {/* Open Graph (for social sharing) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Naya Success Axis | Poultry Farming Ghana | Chicken & Eggs" />
        <meta
          property="og:description"
          content="Ghana poultry farm since 2017. Fresh chicken, eggs & poultry products in Accra & Eastern Region."
        />
        <meta property="og:url" content="https://www.nayasuccessaxis.com/" />
        <meta property="og:image" content="https://www.nayasuccessaxis.com/logo.jpg" />
        <meta property="og:site_name" content="Naya Success Axis" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Naya Success Axis | Poultry Farming Ghana" />
        <meta
          name="twitter:description"
          content="Ghana poultry farm since 2017. Fresh chicken, eggs & poultry products in Accra & Eastern Region."
        />
        <meta name="twitter:image" content="https://www.nayasuccessaxis.com/logo.jpg" />

        {/* Page Title */}
        <title>Naya Success Axis | Poultry Farming Ghana | Chicken & Eggs</title>

        {/* Structured Data: WebSite (for site name in search) */}
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>

        {/* Structured Data: Organization (for logo in Knowledge Panel) */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <div>
        <HeroSection />
        <Location />
        <LatestPoultry />
        <WhyChooseUsSection />
        <Supply />
        <HowWeOperate />
        <TestimonialSection />
        <OurTeam />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default Home;
