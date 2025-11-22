import React from "react";
import { FaQuestionCircle, FaSearch } from "react-icons/fa";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I list my property?",
      answer:
        "Click on 'Add Property' in the navigation menu, fill out the required information, and submit. Your property will be listed immediately.",
    },
    {
      question: "How can I contact property owners?",
      answer:
        "Visit the property details page and you'll find the owner's contact information including email and phone number.",
    },
    {
      question: "Is there a fee to list properties?",
      answer:
        "No, listing properties on HomeNest is completely free for all users.",
    },
    {
      question: "How do I edit or delete my property?",
      answer:
        "Go to 'My Properties' from your profile menu, where you can edit or delete any of your listed properties.",
    },
    {
      question: "Can I save favorite properties?",
      answer:
        "Yes, click the heart icon on any property card to add it to your favorites list.",
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="w-10/12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaQuestionCircle className="text-6xl text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-base-content/70 text-lg">
            Find answers to common questions
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              placeholder="Search for help..."
              className="input input-bordered w-full pl-12 text-lg"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-base-100 shadow-lg"
            >
              <input type="checkbox" />
              <div className="collapse-title text-xl font-semibold">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12 p-8 bg-base-200 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-base-content/70 mb-6">
            Our support team is here to assist you
          </p>
          <a
            href="mailto:support@homenest.com"
            className="btn btn-primary text-white"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
