import React from "react";
import { Link } from "react-router";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      title: "Modern Living Spaces",
      description: "Discover your dream home with luxury amenities",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      title: "Premium Properties",
      description: "Explore exclusive residential properties",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      title: "Your Perfect Home",
      description: "Find comfort and style in every corner",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
      title: "Luxury Living",
      description: "Experience the finest in real estate",
    },
  ];

  return (
    <div className="carousel h-[500px] md:h-[600px] w-full rounded-2xl my-10 shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          id={`slide${slide.id}`}
          className="carousel-item relative w-full"
        >
          <div className="relative w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[500px] md:h-[600px] object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl mb-8 drop-shadow-md max-w-2xl">
                {slide.description}
              </p>
              <Link
                to="/properties"
                className="btn btn-primary text-white px-8 py-3 text-lg"
              >
                Explore Now
              </Link>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
            <a
              href={`#slide${index === 0 ? slides.length : slide.id - 1}`}
              className="btn btn-circle btn-primary text-white hover:scale-110 transition"
              onClick={(e) => {
                e.preventDefault();
                const targetSlide = index === 0 ? slides.length : slide.id - 1;
                document.getElementById(`slide${targetSlide}`).scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "start",
                });
              }}
            >
              ❮
            </a>
            <a
              href={`#slide${index === slides.length - 1 ? 1 : slide.id + 1}`}
              className="btn btn-circle btn-primary text-white hover:scale-110 transition"
              onClick={(e) => {
                e.preventDefault();
                const targetSlide =
                  index === slides.length - 1 ? 1 : slide.id + 1;
                document.getElementById(`slide${targetSlide}`).scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "start",
                });
              }}
            >
              ❯
            </a>
          </div>

          {/* Indicator dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, idx) => (
              <a
                key={idx}
                href={`#slide${idx + 1}`}
                className={`w-3 h-3 rounded-full transition ${
                  idx === index
                    ? "bg-primary w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(`slide${idx + 1}`)
                    .scrollIntoView({ behavior: "smooth", block: "nearest" });
                }}
              ></a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
