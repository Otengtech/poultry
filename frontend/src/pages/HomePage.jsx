import React from 'react';
import HeroSection from "../components/homecomponents/HeroSection";
import WhyChooseUsSection from '../components/homecomponents/WhyChooseUs';
import Newsletter from '../components/homecomponents/Newsletter';
import OurTeam from '../components/homecomponents/OurTeam';
import TestimonialSection from '../components/homecomponents/TestimonialsSection';
import Footer from '../components/homecomponents/Footer';
import Supply from '../components/homecomponents/Supply';
import LatestPoultry from "../components/LatestPoultry";
import HowWeOperate from "../components/homecomponents/HowWeOperate";
import Loader from "../components/Loader";

const Home = () => {

  return (
    <div>
      <HeroSection />
      <WhyChooseUsSection />
      <LatestPoultry />
      <HowWeOperate />
      <Supply />
      <OurTeam />
      <TestimonialSection />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
