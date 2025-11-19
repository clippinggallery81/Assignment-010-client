import React, { useRef } from "react";
import { NavLink } from "react-router";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "HomeNest made finding my dream home so easy! The team was professional, responsive, and helped me every step of the way. Highly recommend!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Property Investor",
      image: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      text: "I've bought multiple properties through HomeNest. Their expertise in the market and attention to detail is unmatched. Excellent service!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "First-time Buyer",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "As a first-time buyer, I was nervous, but HomeNest's team guided me through everything. They found the perfect apartment within my budget!",
    },
    {
      id: 4,
      name: "David Williams",
      role: "Rental Tenant",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "Found an amazing rental property through HomeNest. The process was smooth and the customer service was outstanding. Very satisfied!",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Property Seller",
      image: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      text: "Sold my property in record time thanks to HomeNest's professional marketing and dedicated team. Couldn't be happier with the results!",
    },
    {
      id: 6,
      name: "James Brown",
      role: "Commercial Buyer",
      image: "https://i.pravatar.cc/150?img=33",
      rating: 5,
      text: "Excellent experience purchasing commercial property. HomeNest's team understood my business needs perfectly and delivered beyond expectations!",
    },
  ];

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

        {/* Testimonials Slider */}
        <div className="">
          {/* Slider Container */}
          <div
            ref={scrollRef}
            className="flex w-full gap-4 md:gap-6 overflow-x-auto md:overflow-x-hidden scroll-smooth pb-10 px-3 md:px-15 snap-x snap-mandatory touch-pan-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
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
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 fill-yellow-400"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-600 mb-6 italic leading-relaxed text-sm md:text-base grow">
                      "{testimonial.text}"
                    </p>

                    {/* Divider */}
                    <div className="divider my-2"></div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full ring ring-primary ring-offset-2">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            loading="lazy"
                          />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByAmount(1)}
              className="btn btn-circle btn-primary text-white shadow-lg hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
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
      </div>
    </div>
  );
};

export default Testimonial;
