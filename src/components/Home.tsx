// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Adjust the import based on your folder structure
import Footer from "../components/Footer"; // Adjust the import based on your folder structure

const Home: React.FC = () => {
  const navigate = useNavigate(); // Use navigate for navigation

  // Retrieve user information from local storage
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Get the current timestamp
  const currentTimestamp = new Date().toLocaleString();

  return (
    <div className="min-h-screen flex flex-col">
      <Header /> {/* Include the header component */}
      <div className="flex-grow flex flex-col justify-center items-center bg-gray-50 p-10">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Welcome to the QuickSight Application
          </h1>

          <div className="text-center">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-800">User</td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {user ? user.name : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-800">Role</td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {user ? user.role : "N/A"}
                  </td>
                </tr>
                {/* <tr>
                  <td className="py-2 px-4 border-b text-gray-800">
                    Timestamp
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {user ? currentTimestamp : "N/A"}
                  </td>
                </tr> */}
              </tbody>
            </table>
            {user ? (
              <button
                onClick={() => navigate("/dashboard")} // Navigate to Dashboard
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition duration-200"
              >
                Go to Dashboard
              </button>
            ) : (
              <p className="text-lg text-red-500 text-center mt-4">
                No user is currently logged in.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer /> {/* Include the footer component */}
    </div>
  );
};

export default Home;

// // src/pages/Home.tsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header"; // Adjust the import based on your folder structure
// import Footer from "../components/Footer"; // Adjust the import based on your folder structure

// const Home: React.FC = () => {
//   const navigate = useNavigate(); // Use navigate for navigation

//   // Retrieve user information from local storage
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   // Get the current timestamp
//   const currentTimestamp = new Date().toLocaleString();

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header /> {/* Include the header component */}
//       <div className="flex-grow flex flex-col justify-center items-center bg-gray-100 p-4">
//         <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>

//         {user ? (
//           <div className="text-center">
//             <p className="text-lg">User: {user.name}</p>
//             <p className="text-lg">Role: {user.role}</p>
//             <p className="text-sm text-gray-500">
//               Timestamp: {currentTimestamp}
//             </p>
//             <button
//               onClick={() => navigate("/dashboard")} // Navigate to Dashboard
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Go to Dashboard
//             </button>
//           </div>
//         ) : (
//           <p className="text-lg">No user is currently logged in.</p>
//         )}
//       </div>
//       <Footer /> {/* Include the footer component */}
//     </div>
//   );
// };

// export default Home;
