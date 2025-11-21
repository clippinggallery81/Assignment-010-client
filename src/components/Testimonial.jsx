import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("http://localhost:3000/testimonials");
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      const data = await response.json();
      // Get latest 6 testimonials
      setTestimonials(data.slice(0, 6));
      setError(null);
    } catch (error) {
      setError(error.message);
      // Fallback to empty array if fetch fails
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const scrollRef = useRef(null);

  const getStep = () => {
    const el = scrollRef.current;
    if (!el) return 0;
    const item = el.querySelector("[data-slide]");
    if (!item) return Math.round(el.clientWidth * 0.9);
    const rect = item.getBoundingClientRect();
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return Math.round(rect.width + gap);
  };

  const scrollByAmount = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getStep();
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="my-16 pt-10 pb-20 bg-linear-to-b from-gray-50 to-white overflow-hidden rounded-2xl">
      <div className="">
        {/* Header */}
        <div className="text-center mb-12 px-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Real experiences from our satisfied customers
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="alert alert-error max-w-md mx-auto">
              <span>Failed to load testimonials. Please try again later.</span>
            </div>
          </div>
        ) : testimonials.length === 0 ? (
          <>
            <div className="text-center py-10">
              <p className="text-gray-600 mb-6">
                No testimonials yet. Be the first to share your experience!
              </p>
              <NavLink
                to="/review"
                className="btn btn-primary text-white px-6 md:px-8 hover:scale-105 transition-transform shadow-lg"
              >
                Leave a Review
              </NavLink>
            </div>
          </>
        ) : (
          <>
            {/* Testimonials Slider */}
            <div className="">
              {/* Slider Container */}
              <div
                ref={scrollRef}
                className="flex w-full gap-4 md:gap-6 overflow-x-auto md:overflow-x-hidden scroll-smooth pb-10 px-3 md:px-15 snap-x snap-mandatory touch-pan-x"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial._id || index}
                    data-slide
                    className="w-full sm:w-[calc(100%-1rem)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center"
                  >
                    <div className="card bg-white shadow-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full border border-gray-100">
                      <div className="card-body p-6">
                        {/* Quote Mark */}
                        <div className="text-primary text-5xl md:text-6xl mb-2 opacity-20 leading-none">
                          "
                        </div>

                        {/* Rating Stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, index) => (
                            <FaStar
                              key={index}
                              className="h-5 w-5 text-yellow-400"
                            />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-600 mb-6 italic leading-relaxed text-sm md:text-base grow">
                          "{testimonial.review}"
                        </p>

                        {/* Divider */}
                        <div className="divider my-2"></div>

                        {/* Author Info */}
                        <div className="flex items-center gap-4">
                          <div className="avatar placeholder">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full ring ring-primary ring-offset-2 bg-primary text-white">
                              <span className="text-xl font-bold">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-base md:text-lg">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrow Controls - Bottom Right */}
              <div className="hidden md:flex justify-end gap-3 mt-6 px-6">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => scrollByAmount(-1)}
                  className="btn btn-circle btn-primary text-white shadow-lg hover:scale-110 transition-transform"
                >
                  <FaChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => scrollByAmount(1)}
                  className="btn btn-circle btn-primary text-white shadow-lg hover:scale-110 transition-transform"
                >
                  <FaChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Mobile scroll hint */}
            <div className="text-center mt-4 md:hidden">
              <p className="text-sm text-gray-500">← Swipe to see more →</p>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-12 md:mt-16">
              <p className="text-gray-700 text-base md:text-lg mb-4">
                Want to share your experience with us?
              </p>
              <NavLink
                to="/review"
                className="btn btn-primary text-white px-6 md:px-8 hover:scale-105 transition-transform shadow-lg"
              >
                Leave a Review
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Testimonial;
