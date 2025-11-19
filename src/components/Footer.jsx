import { IoIosMail } from "react-icons/io";
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-aos="zoom-in"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
      className="bg-white text-gray-600 border-t border-gray-200"
    >
      <div className="flex flex-col md:flex-row justify-between items-center max-w-10/12 mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 mb-8 md:mb-0">
          <img className="h-10 w-12" src={logo} alt="" />
          <h1 className="text-2xl">Home Nest</h1>
        </div>

        <div className="text-gray-600">
          &copy; {currentYear} Home Nest. All rights reserved.
        </div>

        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
          <div>
            <a
              href="mailto:clippinggallery81@gmail.com"
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-500 transition duration-300 text-sm md:text-base text-gray-700"
            >
              <IoIosMail className="w-5 h-5 mr-3 text-gray-500" />
              <span>hello@homenest.com</span>
            </a>
          </div>

          <nav className="flex gap-5 md:flex-row text-gray-800 font-medium text-sm mt-4 md:mt-0 md:ml-5 ml-0">
            <a href="#" className="hover:text-blue-600 transition">
              About
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Features
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
