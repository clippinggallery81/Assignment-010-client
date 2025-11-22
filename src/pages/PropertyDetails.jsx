import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import {
  FaMapMarkerAlt,
  FaTag,
  FaUser,
  FaCalendar,
  FaEnvelope,
  FaStar,
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { authenticatedFetch } from "../utils/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    review_text: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [userReview, setUserReview] = useState(null);

  const fetchPropertyDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/properties/${id}`);

      if (!response.ok) {
        throw new Error("Property not found");
      }
      const data = await response.json();
      setProperty(data);
    } catch (err) {
      setError("Unable to load property details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/properties/${id}/reviews`
      );
      if (response.ok) {
        const data = await response.json();
        setReviews(data);

        // Check if user already reviewed
        const existingReview = data.find(
          (review) => review.reviewer_email === user?.email
        );
        setUserReview(existingReview || null);
      }
    } catch (err) {
      // Silently handle - reviews section will show empty
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // Check if user already reviewed
    if (userReview && !editingReview) {
      toast.error("You have already reviewed this property!");
      return;
    }

    setSubmitting(true);

    const reviewData = {
      ...newReview,
      reviewer_email: user?.email || "anonymous@email.com",
      reviewer_name: user?.displayName || "Anonymous User",
    };

    try {
      const url = editingReview
        ? `http://localhost:3000/reviews/${editingReview._id}`
        : `http://localhost:3000/properties/${id}/reviews`;

      const method = editingReview ? "PUT" : "POST";

      const response = await authenticatedFetch(url, {
        method,
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      toast.success(
        editingReview
          ? "Review updated successfully!"
          : "Review submitted successfully!"
      );
      setNewReview({ rating: 5, review_text: "" });
      setEditingReview(null);
      fetchReviews();
    } catch (err) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({
      rating: review.rating,
      review_text: review.review_text,
    });
    // Scroll to form
    window.scrollTo({
      top: document.getElementById("review-form").offsetTop - 100,
      behavior: "smooth",
    });
  };

  const handleDeleteReview = async (reviewId) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "Are you sure you want to delete your review?",
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
        `http://localhost:3000/reviews/${reviewId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your review has been deleted.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      fetchReviews();
    } catch (err) {
      toast.error(err.message || "Failed to delete review");
    }
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setNewReview({ rating: 5, review_text: "" });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={star <= rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-xl font-semibold mb-4">
            {error || "Property not found"}
          </p>
          <button
            onClick={() => navigate("/allProperties")}
            className="btn btn-primary text-white"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-6 gap-2"
          data-aos="fade-right"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* Property Details Card */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="bg-base-100 rounded-2xl shadow-xl overflow-hidden mb-10"
        >
          {/* Property Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={property.property_image}
              alt={property.property_name}
              className="w-full h-full object-cover"
            />
            {/* Category Badge */}
            <span className="absolute top-6 right-6 badge badge-primary text-white px-6 py-4 text-lg uppercase font-semibold">
              {property.category}
            </span>
          </div>

          {/* Property Information */}
          <div className="p-8">
            {/* Property Name and Price */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {property.property_name}
                </h1>
                <div className="flex items-center gap-2 text-base-content/70">
                  <FaTag className="text-primary" />
                  <span className="text-lg font-semibold">
                    {property.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">
                  {property.currency} {property.price.toLocaleString()}
                </div>
                {property.price_unit && (
                  <span className="text-sm text-base-content/60">
                    {property.price_unit}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Description</h2>
              <p className="text-base-content/80 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                Location
              </h2>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-base-content/80 mb-1">
                  <span className="font-semibold">Area:</span>{" "}
                  {property.location.area}
                </p>
                <p className="text-base-content/80 mb-1">
                  <span className="font-semibold">City:</span>{" "}
                  {property.location.city}
                </p>
                <p className="text-base-content/80">
                  <span className="font-semibold">Address:</span>{" "}
                  {property.location.address}
                </p>
              </div>
            </div>

            {/* Posted Information */}
            <div className="border-t border-base-300 pt-6">
              <h2 className="text-2xl font-semibold mb-4">Posted By</h2>
              <div className="flex items-center gap-4">
                {property.posted_by.profile_photo ? (
                  <img
                    src={property.posted_by.profile_photo}
                    alt={property.posted_by.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                    {property.posted_by.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaUser className="text-primary" />
                    <span className="font-semibold text-lg">
                      {property.posted_by.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaEnvelope className="text-primary" />
                    <span className="text-base-content/70">
                      {property.posted_by.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-primary" />
                    <span className="text-base-content/70">
                      Posted on{" "}
                      {new Date(property.posted_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings & Reviews Section */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          className="bg-base-100 rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Ratings & Reviews</h2>
            {reviews.length > 0 && (
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {calculateAverageRating()}
                </div>
                <div className="flex items-center gap-1 mb-1">
                  {renderStars(Math.round(calculateAverageRating()))}
                </div>
                <p className="text-sm text-base-content/70">
                  {reviews.length} reviews
                </p>
              </div>
            )}
          </div>

          {/* Add Review Form */}
          <div id="review-form" className="bg-base-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">
              {editingReview
                ? "Edit Your Review"
                : userReview
                ? "You've Already Reviewed"
                : "Leave a Review"}
            </h3>

            {!userReview || editingReview ? (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Rating Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Rating</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setNewReview({ ...newReview, rating: star })
                        }
                        className="text-3xl focus:outline-none transition-transform hover:scale-110"
                      >
                        <FaStar
                          className={
                            star <= newReview.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-lg font-semibold text-primary">
                      {newReview.rating} / 5
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div className="form-control flex flex-col">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Your Review
                    </span>
                  </label>
                  <textarea
                    value={newReview.review_text}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        review_text: e.target.value,
                      })
                    }
                    placeholder="Share your thoughts about this property..."
                    className="textarea textarea-bordered h-24 w-full"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting || !newReview.review_text.trim()}
                    className="btn btn-primary text-white flex-1"
                  >
                    {submitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        {editingReview ? "Updating..." : "Submitting..."}
                      </>
                    ) : editingReview ? (
                      "Update Review"
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                  {editingReview && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="alert alert-info">
                <p>
                  You have already reviewed this property. You can edit or
                  delete your review below.
                </p>
              </div>
            )}
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b pb-4 last:border-b-0"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {renderStars(review.rating)}
                      {review.reviewer_email === user?.email && (
                        <span className="badge badge-primary badge-sm">
                          Your Review
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-base-content/60">
                      {review.created_at
                        ? new Date(review.created_at).toLocaleDateString()
                        : "Recently"}
                    </span>
                  </div>
                  <p className="text-base-content/80">{review.review_text}</p>
                  <div className="flex items-center justify-between mt-2">
                    {review.reviewer_name && (
                      <p className="text-sm text-base-content/60">
                        - {review.reviewer_name}
                      </p>
                    )}
                    {review.reviewer_email === user?.email && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditReview(review)}
                          className="btn btn-xs btn-outline btn-info gap-1"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="btn btn-xs btn-outline btn-error gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <FaStar className="text-6xl text-base-content/20 mx-auto mb-4" />
                <p className="text-base-content/70 text-lg">No reviews yet</p>
                <p className="text-base-content/60">
                  Be the first to review this property!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
