import React, { useState } from "react";

const Review = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    rating: 5,
    review: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send data to your backend
    console.log("Review submitted:", formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        role: "",
        email: "",
        rating: 5,
        review: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="w-10/12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Share Your Experience
          </h1>
          <p className="text-gray-600 text-lg">
            We'd love to hear about your experience with HomeNest
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="alert alert-success mb-8 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Thank you! Your review has been submitted successfully!</span>
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
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input input-bordered w-full text-lg"
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
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="input input-bordered w-full text-lg"
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
                <button
                  type="submit"
                  className="btn btn-primary text-white text-lg py-4 w-full hover:scale-105 transition"
                >
                  Submit Review
                </button>
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
