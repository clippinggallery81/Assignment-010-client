import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { authenticatedFetch } from "../utils/api";
import {
  FaMapMarkerAlt,
  FaTag,
  FaCalendar,
  FaDollarSign,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchMyProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchMyProperties = async () => {
    try {
      const response = await fetch(
        `https://home-nest-server-ten.vercel.app/my-properties/${user.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data = await response.json();
      setProperties(data);
    } catch (err) {
      setError(
        "Unable to load your properties. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, propertyName) => {
    // SweetAlert2 Confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${propertyName}"? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await authenticatedFetch(
        `https://home-nest-server-ten.vercel.app/properties/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete property");
      }

      // Show success message
      Swal.fire({
        title: "Deleted!",
        text: "Property has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      // Remove from state
      setProperties(properties.filter((property) => property._id !== id));
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message || "Failed to delete property",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

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
          <p className="text-red-500 text-xl font-semibold">Error: {error}</p>
          <p className="text-base-content/70 mt-2">
            Failed to load your properties
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-3">My Properties</h1>
          <p className="text-base-content/70 text-lg">
            Manage your listed properties
          </p>
          <div className="mt-2 text-primary font-semibold">
            {properties.length}{" "}
            {properties.length === 1 ? "Property" : "Properties"} Listed
          </div>
        </div>

        {/* Properties List */}
        {properties.length > 0 ? (
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {properties.map((property) => (
              <div
                key={property._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Property Image */}
                <figure className="relative h-48 overflow-hidden">
                  <img
                    src={property.property_image}
                    alt={property.property_name}
                    className="w-full h-full object-cover"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 right-3 badge badge-primary text-white px-3 py-2 uppercase text-xs font-semibold">
                    {property.category}
                  </span>
                </figure>

                <div className="card-body p-5">
                  {/* Property Name */}
                  <h3 className="card-title text-lg font-bold mb-2">
                    {property.property_name}
                  </h3>

                  {/* Category */}
                  <div className="flex items-center gap-2 text-sm text-base-content/70 mb-2">
                    <FaTag className="text-primary" />
                    <span className="font-semibold">{property.category}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    <FaDollarSign className="text-primary" />
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-primary">
                        {property.currency} {property.price.toLocaleString()}
                      </span>
                      {property.price_unit && (
                        <span className="text-xs text-gray-500">
                          {property.price_unit}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-base-content/80 mb-2">
                    <FaMapMarkerAlt className="text-primary shrink-0" />
                    <span className="text-sm">
                      {property.location.area}, {property.location.city}
                    </span>
                  </div>

                  {/* Posted Date */}
                  <div className="flex items-center gap-2 text-base-content/70 mb-4">
                    <FaCalendar className="text-primary" />
                    <span className="text-sm">
                      Posted:{" "}
                      {new Date(property.posted_date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="divider my-2"></div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* View Details Button */}
                    <Link
                      to={`/propertiesDetails/${property._id}`}
                      className="btn btn-sm btn-outline btn-primary tooltip"
                      data-tip="View Details"
                    >
                      <FaEye />
                    </Link>

                    {/* Update Button */}
                    <Link
                      to={`/updateProperty/${property._id}`}
                      className="btn btn-sm btn-outline btn-info tooltip"
                      data-tip="Update"
                    >
                      <FaEdit />
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() =>
                        handleDelete(property._id, property.property_name)
                      }
                      className="btn btn-sm btn-outline btn-error tooltip"
                      data-tip="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            data-aos="fade-up"
            className="text-center py-20 bg-base-100 rounded-2xl shadow-lg"
          >
            <div className="text-6xl mb-4">🏘️</div>
            <h3 className="text-2xl font-semibold mb-2">
              No Properties Listed Yet
            </h3>
            <p className="text-base-content/70 mb-6">
              Start by adding your first property listing
            </p>
            <Link to="/addProperties" className="btn btn-primary text-white">
              Add Property
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
