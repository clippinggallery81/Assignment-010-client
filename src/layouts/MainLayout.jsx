import React, { useEffect } from "react";
import { Outlet, useMatches } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const matches = useMatches();

  useEffect(() => {
    const currentMatch = matches[matches.length - 1];
    const title = currentMatch?.handle?.title;
    if (title) {
      document.title = `${title} | Home Nest`;
    } else {
      document.title = "Home Nest";
    }
  }, [matches]);

  return (
    <div className="">
      <Navbar />
      <div className="w-10/12 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
