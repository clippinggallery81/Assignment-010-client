import React from "react";
import { Link } from "react-router";
import {
  FaShieldAlt,
  FaDollarSign,
  FaUsers,
  FaSearch,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaShieldAlt className="h-12 w-12" />,
      title: "Trusted & Verified",
      description:
        "All our properties are verified and vetted to ensure quality and authenticity for your peace of mind.",
    },
    {
      id: 2,
      icon: <FaDollarSign className="h-12 w-12" />,
      title: "Best Price Guarantee",
      description:
        "We offer competitive pricing and transparent deals with no hidden costs. Get the best value for your investment.",
    },
    {
      id: 3,
      icon: <FaUsers className="h-12 w-12" />,
      title: "Expert Support",
      description:
        "Our experienced team is here to guide you through every step of buying, selling, or renting your property.",
    },
    {
      id: 4,
      icon: <FaSearch className="h-12 w-12" />,
      title: "Wide Selection",
      description:
        "Access thousands of properties across multiple locations. From apartments to villas, we have it all.",
    },
    {
      id: 5,
      icon: <FaClock className="h-12 w-12" />,
      title: "Quick Process",
      description:
        "Streamlined processes and digital documentation make property transactions faster and hassle-free.",
    },
    {
      id: 6,
      icon: <FaCheckCircle className="h-12 w-12" />,
      title: "100% Satisfaction",
      description:
        "We prioritize your satisfaction with dedicated service and support until you find your perfect property.",
    },
  ];

  return (
    <div className="my-16 py-16 bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Why Choose Us ?
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover what makes us the preferred choice for thousands of property
          seekers
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="card bg-base-100 border border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300 group"
          >
            <div className="card-body items-center text-center p-8">
              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-4">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="card-title text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Ready to Find Your Dream Home?
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Join thousands of satisfied customers who found their perfect
            property with us
          </p>
          <Link
            to="/allProperties"
            className="btn btn-primary text-white px-8 text-md hover:scale-105 transition"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
