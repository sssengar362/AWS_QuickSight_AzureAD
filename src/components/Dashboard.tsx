import React, { useState, useEffect } from "react";
import { getQuickSightEmbedUrl } from "../api/quicksightApi";
import { getAccessToken } from "../auth/authUtils";
import Loading from "../components/Loading";
import { getRoleFromToken } from "../utils/tokenUtils";
import Header from "../components/Header"; // Adjust the import based on your folder structure
import Footer from "../components/Footer"; // Adjust the import based on your folder structure

const Dashboard: React.FC = () => {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true); // Set loading true at the start
      setError(null); // Clear previous error

      try {
        const accessToken = await getAccessToken();
        const userRole = getRoleFromToken(accessToken);

        const awsRoleArn = getAwsRoleArn(userRole); // Extracted logic to determine role ARN

        const url = await getQuickSightEmbedUrl(awsRoleArn);
        if (url) {
          setEmbedUrl(url); // Set the URL if defined
        } else {
          throw new Error("No URL returned from QuickSight API.");
        }
      } catch (error: any) {
        console.error("Error fetching dashboard embed URL", error);
        setError(error.message || "An unexpected error occurred."); // Set error state
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchDashboard();
  }, []);

  // Function to map user roles to AWS role ARNs
  const getAwsRoleArn = (role: string): string => {
    switch (role) {
      case "Admin":
        return process.env.AWS_QUICKSIGHT_ADMIN_ROLE!;
      case "Author":
        return process.env.AWS_QUICKSIGHT_AUTHOR_ROLE!;
      case "Reader":
        return process.env.AWS_QUICKSIGHT_READER_ROLE!;
      default:
        throw new Error("Unknown role");
    }
  };

  // Loading state
  if (loading) return <Loading />;

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500 text-center">{error}</p>
        <p className="text-gray-700 text-center">
          Please try reloading the page or contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header /> {/* Include the header component */}
      <div className="flex-grow flex flex-col justify-center items-center bg-gray-100 p-4">
        {embedUrl ? (
          <iframe
            title="QuickSight Dashboard"
            src={embedUrl}
            width="100%"
            height="800px"
            frameBorder="0"
          />
        ) : (
          <p>Failed to load the dashboard.</p>
        )}
      </div>
      <Footer /> {/* Include the footer component */}
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { getQuickSightEmbedUrl } from "../api/quicksightApi";
// import { getAccessToken } from "../auth/authUtils";
// import Loading from "../components/Loading";
// import { getRoleFromToken } from "../utils/tokenUtils";

// const Dashboard: React.FC = () => {
//   const [embedUrl, setEmbedUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const accessToken = await getAccessToken();
//         const userRole = getRoleFromToken(accessToken); // Use tokenUtils to parse role
//         let awsRoleArn: string;

//         switch (userRole) {
//           case "Admin":
//             awsRoleArn = process.env.AWS_QUICKSIGHT_ADMIN_ROLE!;
//             break;
//           case "Author":
//             awsRoleArn = process.env.AWS_QUICKSIGHT_AUTHOR_ROLE!;
//             break;
//           case "Reader":
//             awsRoleArn = process.env.AWS_QUICKSIGHT_READER_ROLE!;
//             break;
//           default:
//             throw new Error("Unknown role");
//         }

//         const url = await getQuickSightEmbedUrl(awsRoleArn);
//         setEmbedUrl(url || null); // Fallback to null if url is undefined
//       } catch (error) {
//         console.error("Error fetching dashboard embed URL", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) return <Loading />;

//   return embedUrl ? (
//     <iframe
//       title="QuickSight Dashboard"
//       src={embedUrl}
//       width="100%"
//       height="800px"
//       frameBorder="0"
//     />
//   ) : (
//     <p>Failed to load the dashboard.</p>
//   );
// };

// export default Dashboard;
