import React, { useState } from "react";
import { NavLink } from "react-router";
import Card from "./Card";

const LatestProperties = () => {
  const [filter, setFilter] = useState("all");

  // Temporary data - will be replaced with database data
  const properties = [
    {
      id: 1,
      title: "Modern Villa",
      location: "Beverly Hills, CA",
      price: "$2,500,000",
      type: "buy",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
      beds: 4,
      baths: 3,
      area: "3500 sq ft",
    },
    {
      id: 2,
      title: "Luxury Apartment",
      location: "Manhattan, NY",
      price: "$3,500/month",
      type: "rent",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
      beds: 2,
      baths: 2,
      area: "1200 sq ft",
    },
    {
      id: 3,
      title: "Cozy Cottage",
      location: "Austin, TX",
      price: "$450,000",
      type: "buy",
      image:
        "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=600",
      beds: 3,
      baths: 2,
      area: "1800 sq ft",
    },
    {
      id: 4,
      title: "Penthouse Suite",
      location: "Miami, FL",
      price: "$5,000/month",
      type: "rent",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
      beds: 3,
      baths: 3,
      area: "2500 sq ft",
    },
    {
      id: 5,
      title: "Beach House",
      location: "Malibu, CA",
      price: "$3,200,000",
      type: "buy",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600",
      beds: 5,
      baths: 4,
      area: "4200 sq ft",
    },
    {
      id: 6,
      title: "Studio Loft",
      location: "Chicago, IL",
      price: "$1,800/month",
      type: "rent",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
      beds: 1,
      baths: 1,
      area: "650 sq ft",
    },
  ];

  const filteredProperties =
    filter === "all"
      ? properties
      : properties.filter((property) => property.type === filter);

  return (
    <div className="my-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Latest Properties
          </h2>
          <p className="text-gray-600 mt-2">Discover our newest listings</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`btn ${
              filter === "all"
                ? "btn-primary text-white"
                : "btn-outline btn-primary"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("buy")}
            className={`btn ${
              filter === "buy"
                ? "btn-primary text-white"
                : "btn-outline btn-primary"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setFilter("rent")}
            className={`btn ${
              filter === "rent"
                ? "btn-primary text-white"
                : "btn-outline btn-primary"
            }`}
          >
            Rent
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} property={property} />
        ))}
      </div>

      {/* No Results Message */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No properties found</p>
        </div>
      )}

      {/* Show All Button */}
      <div className="text-center mt-12">
        <NavLink
          to="/Properties"
          className="btn btn-primary text-white px-8 py-3 text-lg hover:scale-105 transition"
        >
          Show All Properties
        </NavLink>
      </div>
    </div>
  );
};

export default LatestProperties;
