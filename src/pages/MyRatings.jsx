import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import { FaStar, FaCalendar, FaHome } from "react-icons/fa";

const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchMyRatings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchMyRatings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/my-property-ratings/${user.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch ratings");
      }
      const data = await response.json();
      setRatings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          <p className="text-gray-600 mt-2">Failed to load your ratings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-3">My Ratings</h1>
          <p className="text-gray-600 text-lg">
            Reviews received on your properties
          </p>
          <div className="mt-2 text-primary font-semibold">
            {ratings.length} {ratings.length === 1 ? "Review" : "Reviews"}{" "}
            Received
          </div>
        </div>

        {/* Ratings List */}
        {ratings.length > 0 ? (
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="space-y-6"
          >
            {ratings.map((rating, index) => (
              <div
                key={rating._id || index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="card-body">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Property Thumbnail */}
                    <Link
                      to={`/propertiesDetails/${rating.property_id}`}
                      className="shrink-0"
                    >
                      <figure className="w-full md:w-48 h-48 rounded-lg overflow-hidden hover:scale-105 transition-transform">
                        <img
                          src={rating.property_image}
                          alt={rating.property_name}
                          className="w-full h-full object-cover"
                        />
                      </figure>
                    </Link>

                    {/* Rating Content */}
                    <div className="flex-1">
                      {/* Property Name and Rating */}
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                        <div>
                          <Link
                            to={`/propertiesDetails/${rating.property_id}`}
                            className="flex items-center gap-2 hover:text-primary transition"
                          >
                            <FaHome className="text-primary" />
                            <h3 className="text-xl font-bold text-gray-800">
                              {rating.property_name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Reviewed by {rating.reviewer_name}
                          </p>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-1">
                          {renderStars(rating.rating)}
                          <span className="text-sm font-semibold text-primary">
                            {rating.rating} / 5
                          </span>
                        </div>
                      </div>

                      {/* Review Text */}
                      <div className="bg-gray-50 p-4 rounded-lg mb-3">
                        <p className="text-gray-700 leading-relaxed">
                          "{rating.review_text}"
                        </p>
                      </div>

                      {/* Review Date */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendar className="text-primary" />
                        <span>
                          Posted on{" "}
                          {rating.created_at
                            ? new Date(rating.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Recently"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            data-aos="fade-up"
            className="text-center py-20 bg-white rounded-2xl shadow-lg"
          >
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Ratings Yet
            </h3>
            <p className="text-gray-600 mb-6">
              No one has reviewed your properties yet
            </p>
            <Link to="/myProperties" className="btn btn-primary text-white">
              View My Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRatings;
