import { IoIosMail } from "react-icons/io";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { NavLink } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="w-10/12 mx-auto py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img className="h-10 w-12" src={logo} alt="HomeNest Logo" />
              <h1 className="text-2xl font-bold text-white">Home Nest</h1>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your trusted partner in finding the perfect home. We make property
              hunting simple, fast, and reliable.
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-white"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-white"
                aria-label="X (Twitter)"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-white"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="hover:text-primary transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allProperties"
                  className="hover:text-primary transition"
                >
                  All Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addProperties"
                  className="hover:text-primary transition"
                >
                  Add Property
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myProperties"
                  className="hover:text-primary transition"
                >
                  My Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myRatings"
                  className="hover:text-primary transition"
                >
                  My Ratings
                </NavLink>
              </li>
              <li>
                <NavLink to="/review" className="hover:text-primary transition">
                  Leave a Review
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/help" className="hover:text-primary transition">
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink to="/help" className="hover:text-primary transition">
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/privacy"
                  className="hover:text-primary transition"
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms" className="hover:text-primary transition">
                  Terms of Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="hover:text-primary transition"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Real Estate Ave, New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-primary transition"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IoIosMail className="text-primary text-xl flex-shrink-0" />
                <a
                  href="mailto:hello@homenest.com"
                  className="text-gray-400 hover:text-primary transition"
                >
                  hello@homenest.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} Home Nest. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <NavLink
                to="/privacy"
                className="text-gray-400 hover:text-primary transition"
              >
                Privacy
              </NavLink>
              <NavLink
                to="/terms"
                className="text-gray-400 hover:text-primary transition"
              >
                Terms
              </NavLink>
              <NavLink
                to="/help"
                className="text-gray-400 hover:text-primary transition"
              >
                Help
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
