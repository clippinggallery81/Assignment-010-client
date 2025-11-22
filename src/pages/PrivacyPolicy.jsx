import React from "react";
import { FaShieldAlt } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="w-10/12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaShieldAlt className="text-6xl text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-base-content/70">
            Last updated: November 23, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="card bg-base-100 shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              1. Information We Collect
            </h2>
            <p className="text-base-content/70 mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-base-content/70 space-y-2">
              <li>Name and email address when you create an account</li>
              <li>Property details when you list a property</li>
              <li>Reviews and ratings you submit</li>
              <li>Communication preferences</li>
            </ul>
          </div>

          <div className="card bg-base-100 shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-base-content/70 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-base-content/70 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your property listings</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </div>

          <div className="card bg-base-100 shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
            <p className="text-base-content/70">
              We do not sell your personal information. We may share your
              information only:
            </p>
            <ul className="list-disc pl-6 text-base-content/70 space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
            </ul>
          </div>

          <div className="card bg-base-100 shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="text-base-content/70">
              We implement appropriate security measures to protect your
              personal information from unauthorized access, alteration, or
              disclosure.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
            <p className="text-base-content/70">
              If you have questions about this Privacy Policy, please contact us
              at:
              <br />
              <a
                href="mailto:privacy@homenest.com"
                className="text-primary hover:underline"
              >
                privacy@homenest.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
