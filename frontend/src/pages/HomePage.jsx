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
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Naya Success Axis: Ghana poultry farm since 2017. Fresh chicken, eggs & poultry products in Accra & Eastern Region. Quality poultry farming & processing."
        />
        <meta
          name="keywords"
          content="Naya Success Axis Ghana, poultry farm Ghana, chicken Ghana, eggs Ghana, poultry products, agriculture Ghana, poultry processing"
        />
        <meta name="author" content="Naya Success Axis" />
        <link rel="canonical" href="https://www.nayasuccessaxis.com" />

        <link rel="icon" href="/logo.png" type="image/jpeg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Naya Success Axis | Poultry Farming Ghana | Chicken & Eggs
        </title>
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
