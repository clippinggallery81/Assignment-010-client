import React from "react";

import Carousel from "../components/Carousel";
import LatestProperties from "../components/LatestProperties";
import Testimonial from "../components/Testimonial";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Carousel />
      <LatestProperties />
      <Testimonial />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
