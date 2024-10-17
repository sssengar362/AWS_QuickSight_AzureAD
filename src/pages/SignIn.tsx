import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import { signIn } from "../auth/authUtils";
import Footer from "../components/Footer";
import Headerone from "../components/Headerone";

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Use navigate hook for navigation

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await signIn();
      navigate("/dashboard"); // Use navigate for redirection after successful login
      // navigate("/home");
    } catch (error) {
      console.error("Error during sign-in", error);
      setError("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Headerone />
      <div className="flex-grow flex flex-col justify-center items-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h1>
          <p className="text-gray-600 mb-4 text-center">
            Please sign in to continue using the application.
          </p>
          {error && (
            <p className="text-red-500 text-center" aria-live="assertive">
              {error}
            </p>
          )}
          <button
            className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleLogin}
            disabled={loading}
            aria-label="Sign In with Azure AD" // Added aria-label for accessibility
          >
            {loading ? "Signing In..." : "Sign In with Azure AD"}
            {/* {loading && <span className="loader"></span>}{" "} */}
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white ml-2 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                ></path>
              </svg>
            )}

            {/* Optionally add a loader */}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
