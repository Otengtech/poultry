import React, { useContext } from 'react';
import HeroSection from "../components/homecomponents/HeroSection";
import WhyChooseUsSection from '../components/homecomponents/WhyChooseUs';
import Newsletter from '../components/homecomponents/Newsletter';
import OurTeam from '../components/homecomponents/OurTeam';
import TestimonialSection from '../components/homecomponents/TestimonialsSection';
import Footer from '../components/homecomponents/Footer';
import { ContentContext } from "../context/ContentContext";
import Loader from "../components/Loader";

const Home = () => {
  const { homeContent, loadingHome} = useContext(ContentContext);

console.log(homeContent.heroSection);

  if (loadingHome) return <Loader />;
  if (!homeContent) return <p>Error loading home page.</p>;

  return (
    <div>
      <HeroSection content={homeContent?.heroSection?.message?.heroMessages || []}/>
      <WhyChooseUsSection content={homeContent.whyChooseUs}/>
      <TestimonialSection content={homeContent.testimonialSection}/>
      <OurTeam content={homeContent.ourteamSection}/>
      <Newsletter content={homeContent.newsletterSection}/>
      <Footer />
    </div>
  );
}

export default Home;
