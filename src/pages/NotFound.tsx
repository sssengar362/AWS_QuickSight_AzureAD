import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header"; // Adjust the import path if necessary
import Footer from "../components/Footer"; // Adjust the import path if necessary
import Headerone from "../components/Headerone";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Headerone />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">
          Go back to Sign In
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
