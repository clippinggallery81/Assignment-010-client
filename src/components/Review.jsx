import React, { useState, useEffect, useContext } from "react";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Review = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    rating: 5,
    review: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [existingReview, setExistingReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const checkExistingReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/testimonials/user/${user.email}`
      );
      if (response.ok) {
        const review = await response.json();
        if (review) {
          setExistingReview(review);
          setFormData({
            name: review.name,
            role: review.role,
            email: review.email,
            rating: review.rating,
            review: review.review,
          });
        }
      }
    } catch (error) {
      // Silently fail - user can still submit new review
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      // Auto-fill name and email from user context
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email,
      }));
      checkExistingReview();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

    const testimonialData = {
      name: formData.name,
      role: formData.role,
      email: formData.email,
      rating: parseInt(formData.rating),
      review: formData.review,
      created_at: new Date().toISOString(),
    };

    try {
      const url = existingReview
        ? `http://localhost:3000/testimonials/${existingReview._id}`
        : "http://localhost:3000/testimonials";
      const method = existingReview ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonialData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const message = existingReview
        ? "Your review has been updated successfully!"
        : "Thank you! Your review has been submitted successfully!";
      toast.success(message);
      setSubmitted(true);
      setIsEditing(false);

      // Reload review data
      await checkExistingReview();

      // Navigate to home page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!existingReview) return;

    const result = await Swal.fire({
      title: "Delete Review?",
      text: "Are you sure you want to delete your review? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:3000/testimonials/${existingReview._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your review has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      setExistingReview(null);
      setFormData({
        name: user?.displayName || "",
        role: "",
        email: user?.email || "",
        rating: 5,
        review: "",
      });
    } catch (error) {
      toast.error(error.message || "Failed to delete review");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (existingReview) {
      setFormData({
        name: existingReview.name,
        role: existingReview.role,
        email: existingReview.email,
        rating: existingReview.rating,
        review: existingReview.review,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="w-10/12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {existingReview && !isEditing
              ? "Your Review"
              : existingReview
              ? "Edit Your Review"
              : "Share Your Experience"}
          </h1>
          <p className="text-gray-600 text-lg">
            {existingReview && !isEditing
              ? "You have already submitted a review"
              : "We'd love to hear about your experience with HomeNest"}
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="alert alert-success mb-8 shadow-lg">
            <FaCheckCircle className="h-6 w-6" />
            <span>
              {existingReview
                ? "Your review has been updated successfully!"
                : "Thank you! Your review has been submitted successfully!"}
            </span>
          </div>
        )}

        {/* Edit/Delete Buttons */}
        {existingReview && !isEditing && (
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={handleEdit}
              className="btn btn-primary text-white gap-2"
            >
              <FaEdit /> Edit Review
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-error text-white gap-2"
            >
              <FaTrash /> Delete Review
            </button>
          </div>
        )}

        {/* Review Form */}
        <div className="card bg-white shadow-2xl">
          <div className="card-body p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Your Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your full name"
                  className="input input-bordered w-full text-lg bg-gray-100"
                  readOnly
                  required
                />
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Email Address <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="your.email@example.com"
                  className="input input-bordered w-full text-lg bg-gray-100"
                  readOnly
                  required
                />
              </div>

              {/* Role Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Your Role <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="select select-bordered w-full text-lg"
                  disabled={existingReview && !isEditing}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="Homeowner">Homeowner</option>
                  <option value="First-time Buyer">First-time Buyer</option>
                  <option value="Property Investor">Property Investor</option>
                  <option value="Rental Tenant">Rental Tenant</option>
                  <option value="Property Seller">Property Seller</option>
                  <option value="Commercial Buyer">Commercial Buyer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Rating Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Rating <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="rating rating-lg">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name="rating"
                        value={star}
                        className="mask mask-star-2 bg-yellow-400"
                        checked={formData.rating === star.toString()}
                        onChange={handleChange}
                        disabled={existingReview && !isEditing}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-4">
                    ({formData.rating}{" "}
                    {formData.rating === "1" ? "star" : "stars"})
                  </span>
                </div>
              </div>

              {/* Review Text Field */}
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Your Review <span className="text-red-500">*</span>
                  </span>
                </label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Tell us about your experience with HomeNest..."
                  className="textarea textarea-bordered h-32 text-lg outline-none w-full"
                  disabled={existingReview && !isEditing}
                  required
                  minLength={10}
                ></textarea>
                <label className="label justify-start">
                  <span className="label-text-alt text-gray-500">
                    Minimum 10 characters ({formData.review.length}/10)
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-8">
                {existingReview && !isEditing ? null : (
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary text-white text-lg py-4 flex-1 hover:scale-105 transition"
                    >
                      {submitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          {existingReview ? "Updating..." : "Submitting..."}
                        </>
                      ) : existingReview ? (
                        "Update Review"
                      ) : (
                        "Submit Review"
                      )}
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="btn btn-outline text-lg py-4"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 text-gray-600">
          <p className="mt-20">
            Your review helps us improve our services and helps others make
            informed decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
