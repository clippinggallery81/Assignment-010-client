import React from "react";
import { FaFileContract } from "react-icons/fa";

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="w-10/12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaFileContract className="text-6xl text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-base-content/70">
            Last updated: November 23, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="card bg-base-100 shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-base-content/70">
              By accessing and using HomeNest, you accept and agree to be bound
              by the terms and provision of this agreement.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">2. Use of Service</h2>
            <p className="text-base-content/70 mb-4">
              You agree to use HomeNest only for lawful purposes. You must not:
            </p>
            <ul className="list-disc pl-6 text-base-content/70 space-y-2">
              <li>Post false or misleading property information</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on others' intellectual property rights</li>
              <li>Upload malicious code or viruses</li>
            </ul>
          </div>

          <div className="card bg-base-100 shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">3. Property Listings</h2>
            <p className="text-base-content/70">
              You are responsible for the accuracy of your property listings.
              HomeNest is not responsible for verifying the accuracy of listings
              or the quality of properties.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">4. User Accounts</h2>
            <p className="text-base-content/70">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities under your account.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              5. Limitation of Liability
            </h2>
            <p className="text-base-content/70">
              HomeNest shall not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of the
              service.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-4">6. Contact Information</h2>
            <p className="text-base-content/70">
              For questions about these Terms, please contact:
              <br />
              <a
                href="mailto:legal@homenest.com"
                className="text-primary hover:underline"
              >
                legal@homenest.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
