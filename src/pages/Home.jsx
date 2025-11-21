import React from "react";

import Carousel from "../components/Carousel";
import LatestProperties from "../components/LatestProperties";
import Testimonial from "../components/Testimonial";
import WhyChooseUs from "../components/WhyChooseUs";
import OurTeam from "../components/OurTeam";

const Home = () => {
  return (
    <div>
      <Carousel />
      <LatestProperties />
      <Testimonial />
      <WhyChooseUs />
      <OurTeam />
    </div>
  );
};

export default Home;
