import React from 'react';
import HeroSection from "../components/homecomponents/HeroSection";
import WhyChooseUsSection from '../components/homecomponents/WhyChooseUs';
import Newsletter from '../components/homecomponents/Newsletter';
import OurTeam from '../components/homecomponents/OurTeam';
import TestimonialSection from '../components/homecomponents/TestimonialsSection';
import Footer from '../components/homecomponents/Footer';
import Loader from "../components/Loader";

const Home = () => {

  return (
    <div>
      <HeroSection />
      <WhyChooseUsSection />
      <TestimonialSection />
      <OurTeam />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
