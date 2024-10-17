// src/components/Loading.tsx
import React from "react";
import Spinner from "./Spinner"; // Adjust the path as necessary

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default Loading;

// import React from "react";

// const Loading: React.FC = () => (
//   <div className="flex justify-center items-center h-screen">
//     <div
//       className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
//       role="status"
//     >
//       <span className="sr-only">Loading...</span>
//     </div>
//   </div>
// );

// export default Loading;
