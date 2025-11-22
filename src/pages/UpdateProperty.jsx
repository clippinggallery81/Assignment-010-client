import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import { toast } from "react-toastify";
import { authenticatedFetch } from "../utils/api";
import {
  FaHome,
  FaMapMarkerAlt,
  FaDollarSign,
  FaImage,
  FaArrowLeft,
} from "react-icons/fa";

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    property_name: "",
    description: "",
    category: "",
    price: "",
    currency: "BDT",
    city: "",
    area: "",
    address: "",
    property_image: "",
  });

  useEffect(() => {
    fetchPropertyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPropertyData = async () => {
    try {
      const response = await fetch(
        `https://home-nest-server-ten.vercel.app/properties/${id}`
      );
      if (!response.ok) {
        throw new Error("Property not found");
      }
      const data = await response.json();

      // Pre-fill form with existing data
      setFormData({
        property_name: data.property_name,
        description: data.description,
        category: data.category,
        price: data.price.toString(),
        currency: data.currency,
        city: data.location.city,
        area: data.location.area,
        address: data.location.address,
        property_image: data.property_image,
      });
    } catch (error) {
      toast.error("Unable to load property. Please try again later.");
      navigate("/myProperties");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const updatedPropertyData = {
      property_name: formData.property_name,
      description: formData.description,
      price: parseFloat(formData.price),
      currency: formData.currency,
      location: {
        city: formData.city,
        area: formData.area,
        address: formData.address,
      },
      category: formData.category,
      property_image: formData.property_image,
    };

    try {
      const response = await authenticatedFetch(
        `https://home-nest-server-ten.vercel.app/properties/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedPropertyData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update property");
      }

      toast.success("Property updated successfully!");
      navigate("/myProperties");
    } catch (error) {
      toast.error(
        "Unable to update property. Please check your information and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-6 gap-2"
          data-aos="fade-right"
        >
          <FaArrowLeft />
          Back
        </button>

        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="bg-base-100 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-primary to-secondary p-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Update Property
            </h1>
            <p className="text-white text-center mt-2 opacity-90">
              Edit your property details
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Property Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-lg flex items-center gap-2">
                  <FaHome className="text-primary" />
                  Property Name <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="property_name"
                value={formData.property_name}
                onChange={handleChange}
                placeholder="e.g., Sunny 3-Bedroom Apartment"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Description <span className="text-red-500">*</span>
                </span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property..."
                className="textarea textarea-bordered h-32 w-full"
                required
              />
            </div>

            {/* Category and Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Category <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House/Villa">House/Villa</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land/Plot">Land/Plot</option>
                </select>
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg flex items-center gap-2">
                    <FaDollarSign className="text-primary" />
                    Price (BDT) <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 5500000"
                  className="input input-bordered w-full"
                  required
                  min="0"
                />
              </div>
            </div>

            {/* Location Section */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                Location Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      City <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Dhaka"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Area */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Area <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g., Gulshan 1"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text font-semibold">
                    Full Address <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g., Road 10, House 25"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Property Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-lg flex items-center gap-2">
                  <FaImage className="text-primary" />
                  Property Image URL <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="url"
                name="property_image"
                value={formData.property_image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
                required
              />
              {/* Image Preview */}
              {formData.property_image && (
                <div className="mt-4">
                  <img
                    src={formData.property_image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* User Information (Read-only) */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Posted By</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">User Name</span>
                  </label>
                  <input
                    type="text"
                    value={user?.displayName || "Anonymous"}
                    className="input input-bordered w-full bg-base-200"
                    readOnly
                  />
                </div>

                {/* User Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">User Email</span>
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    className="input input-bordered w-full bg-base-200"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-control mt-8 flex flex-row gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary text-white flex-1 text-lg py-3 hover:scale-105 transition"
              >
                {submitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Updating...
                  </>
                ) : (
                  "Update Property"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-outline flex-1 text-lg py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProperty;
