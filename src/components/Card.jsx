import React from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaTag, FaUser } from "react-icons/fa";

const Card = ({ property }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Thumbnail Image */}
      <figure className="relative h-64 overflow-hidden">
        <img
          src={property.property_image}
          alt={property.property_name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {/* Category Badge */}
        <span className="absolute top-4 right-4 badge badge-primary text-white px-4 py-3 uppercase font-semibold">
          {property.category}
        </span>
      </figure>

      <div className="card-body">
        {/* Property Name */}
        <h3 className="card-title text-xl font-bold text-gray-800">
          {property.property_name}
        </h3>

        {/* Category */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <FaTag className="text-primary" />
          <span className="font-semibold">{property.category}</span>
        </div>

        {/* Short Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {property.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-700 mb-3">
          <FaMapMarkerAlt className="text-primary shrink-0" />
          <span className="text-sm">
            {property.location.area}, {property.location.city}
          </span>
        </div>

        {/* Posted By */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaUser className="text-primary shrink-0" />
          <span className="text-sm font-medium">{property.posted_by.name}</span>
        </div>

        <div className="divider my-2"></div>

        {/* Property Price and View Details Button */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">
              {property.currency} {property.price.toLocaleString()}
            </span>
            {property.price_unit && (
              <span className="text-xs text-gray-500">
                {property.price_unit}
              </span>
            )}
          </div>
          <Link
            to={`/propertiesDetails/${property._id}`}
            className="btn btn-primary btn-sm text-white hover:scale-105 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
