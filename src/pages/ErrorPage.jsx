import React from "react";
import { useRouteError, Link } from "react-router";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 my-10 rounded-2xl">
      <div className="text-center px-4">
        <div data-aos="zoom-in" data-aos-duration="1000" className="mb-8">
          <FaExclamationTriangle className="text-9xl text-error mx-auto mb-6 animate-bounce" />
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            {error?.status || "404"}
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {error?.status === 404
              ? "Page Not Found"
              : "Oops! Something Went Wrong"}
          </h2>
          <p className="text-base-content/70 text-lg md:text-xl mb-8 max-w-md mx-auto">
            {error?.statusText ||
              error?.message ||
              "The page you are looking for doesn't exist or has been moved."}
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="btn btn-primary text-white px-8 gap-2 hover:scale-105 transition-transform"
          >
            <FaHome />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline px-8 hover:scale-105 transition-transform"
          >
            Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 text-base-content/40">
          <p className="text-sm">Error Code: {error?.status || "404"}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
