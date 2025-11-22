import React from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
      bio: "15+ years in real estate development",
      linkedin: "#",
      twitter: "#",
      email: "sarah@homenest.com",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Sales",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&q=80",
      bio: "Expert in luxury property sales",
      linkedin: "#",
      twitter: "#",
      email: "michael@homenest.com",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Property Manager",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
      bio: "Specializes in residential properties",
      linkedin: "#",
      twitter: "#",
      email: "emily@homenest.com",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80",
      bio: "Digital marketing & brand strategy",
      linkedin: "#",
      twitter: "#",
      email: "david@homenest.com",
    },
  ];

  return (
    <section className="py-16 bg-base-200 mb-10 rounded-2xl">
      <div className="w-10/12 mx-auto">
        {/* Section Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Our dedicated team of professionals is here to help you find your
            dream property and make your real estate journey seamless.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 100}
              className="bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-base-content/70 text-sm mb-4">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-3 pt-3 border-t border-base-300">
                  <a
                    href={member.linkedin}
                    className="p-2 bg-base-300 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.twitter}
                    className="p-2 bg-base-300 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                    aria-label="X (Twitter)"
                  >
                    <FaXTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 bg-base-300 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                    aria-label="Email"
                  >
                    <FaEnvelope className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-center mt-12"
        >
          <p className="text-base-content/70 mb-4">
            Want to join our amazing team?
          </p>
          <a
            href="mailto:careers@homenest.com?subject=Career Opportunity Inquiry"
            className="btn btn-primary text-white px-8"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
