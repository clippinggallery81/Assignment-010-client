import React, { useState } from "react";
import { NavLink } from "react-router";
import Card from "./Card";
import useProperties from "../hooks/useProperties";

const LatestProperties = () => {
  const [filter, setFilter] = useState("all");
  const { properties, loading, error } = useProperties();

  // Get latest 6 properties, sorted by _id (newest first)
  // MongoDB _id contains timestamp, so newer properties have larger _id
  const latestProperties = [...properties]
    .sort((a, b) => {
      // Convert _id to string and compare (newer _id > older _id)
      return b._id.localeCompare(a._id);
    })
    .slice(0, 6);

  const filteredProperties =
    filter === "all"
      ? latestProperties
      : latestProperties.filter((property) => property.category === filter);

  if (loading) {
    return (
      <div className="my-16 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/70">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-16 text-center">
        <div className="alert alert-error max-w-md mx-auto">
          <span>
            Unable to load properties. Please check your connection and try
            again.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="my-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Latest Properties</h2>
          <p className="text-base-content/70 mt-2">
            Discover our newest listings
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 flex-wrap">
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
            onClick={() => setFilter("Apartment")}
            className={`btn ${
              filter === "Apartment"
                ? "btn-primary text-white"
                : "btn-outline btn-primary"
            }`}
          >
            Apartment
          </button>
          <button
            onClick={() => setFilter("House/Villa")}
            className={`btn ${
              filter === "House/Villa"
                ? "btn-primary text-white"
                : "btn-outline btn-primary"
            }`}
          >
            House/Villa
          </button>
          <button
            onClick={() => setFilter("Commercial")}
            className={`btn ${
              filter === "Commercial"
                ? "btn-primary text-white"
                : "btn-outline btn-primary"
            }`}
          >
            Commercial
          </button>
          <button
            onClick={() => setFilter("Land/Plot")}
            className={`btn ${
              filter === "Land/Plot"
                ? "btn-primary text-white"
                : "btn-outline btn-primary"
            }`}
          >
            Land/Plot
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property._id || property.id} property={property} />
        ))}
      </div>

      {/* No Results Message */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-base-content/60">No properties found</p>
        </div>
      )}

      {/* Show All Button */}
      <div className="text-center mt-12">
        <NavLink
          to="/allProperties"
          className="btn btn-primary text-white px-8 py-3 text-lg hover:scale-105 transition"
        >
          Show All Properties
        </NavLink>
      </div>
    </div>
  );
};

export default LatestProperties;
