import React, { useState } from "react";
import useProperties from "../hooks/useProperties";
import Card from "../components/Card";
import { FaSearch, FaFilter } from "react-icons/fa";

const AllProperties = () => {
  const { properties, loading, error } = useProperties();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort properties
  const filteredProperties = properties
    .filter((property) => {
      const matchesSearch =
        property.property_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property.location.city
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property.location.area.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || property.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "oldest":
          // Sort by _id ascending (oldest first)
          return a._id.localeCompare(b._id);
        case "newest":
        default:
          // Sort by _id descending (newest first)
          return b._id.localeCompare(a._id);
      }
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-xl font-semibold">
            Unable to Load Properties
          </p>
          <p className="text-base-content/70 mt-2">
            Please check your connection and try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="md:w-11/12 mx-auto md:px-4">
        {/* Header */}
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-3">All Properties</h1>
          <p className="text-base-content/70 text-lg">
            Browse through our complete collection of properties
          </p>
          <div className="mt-2 text-primary font-semibold">
            {filteredProperties.length} Properties Available
          </div>
        </div>

        {/* Filters Section */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="bg-base-100 rounded-2xl shadow-lg p-6 mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-primary text-xl" />
            <h2 className="text-xl font-semibold">Filter & Search</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="form-control">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type="text"
                  placeholder="Search by name, city, or area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full pl-12"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="form-control">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="All">All Categories</option>
                <option value="Apartment">Apartment</option>
                <option value="House/Villa">House/Villa</option>
                <option value="Commercial">Commercial</option>
                <option value="Land/Plot">Land/Plot</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="form-control">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters Info */}
          {(searchTerm || selectedCategory !== "All") && (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm text-base-content/70">
                Active Filters:
              </span>
              {searchTerm && (
                <span className="badge badge-primary gap-2">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-white hover:text-gray-200"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory !== "All" && (
                <span className="badge badge-primary gap-2">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="text-white hover:text-gray-200"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="btn btn-ghost btn-xs text-primary"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((property) => (
              <Card key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div
            data-aos="fade-up"
            className="text-center py-20 bg-base-100 rounded-2xl shadow-lg"
          >
            <div className="text-6xl mb-4">🏘️</div>
            <h3 className="text-2xl font-semibold mb-2">No Properties Found</h3>
            <p className="text-base-content/70 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="btn btn-primary text-white"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
