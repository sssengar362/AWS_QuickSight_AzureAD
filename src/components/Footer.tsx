// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} QuickSight Application. All rights
          reserved.
        </p>
        <p>
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:text-gray-400">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
