// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";

const Headerone: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2">QuickSight Application</h1>
        {/* <nav>
          <Link
            to="/signin"
            className="text-white hover:text-gray-300 transition"
          >
            Logout
          </Link>
        </nav> */}
      </div>
    </header>
  );
};

export default Headerone;
