import * as Msal from "@azure/msal-browser";

// Create MSAL instance
const msalInstance = new Msal.PublicClientApplication({
  // auth: {
  //   clientId: process.env.REACT_APP_AZURE_CLIENT_ID!,
  //   authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
  //   redirectUri: window.location.origin, // Ensure this is set correctly for your app
  // },
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID!, // Azure AD Application ID
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`, // Azure AD Tenant ID
    redirectUri: window.location.origin, // Dynamic redirect URI based on the environment
  },
  cache: {
    cacheLocation: "sessionStorage", // Use sessionStorage or localStorage
    storeAuthStateInCookie: false, // Set to true if handling old browsers like IE11
  },
});

// Function to sign in using a popup
export const signIn = async () => {
  try {
    // Ensure MSAL is initialized before attempting to call any API
    // await msalInstance.initialize(); // Ensure MSAL is initialized here (if needed)
    // console.log("after msalInitialize");
    const loginResponse = await msalInstance.loginPopup({
      scopes: ["openid", "profile", "email"],
    });

    // const loginResponse = await msalInstance.loginPopup({
    //   scopes: [
    //     "openid",
    //     "profile",
    //     "email",
    //     `api://${process.env.REACT_APP_API_CLIENT_ID}/default`,
    //   ], // Replace with your API client ID
    // });

    console.log("Login response coming is ", loginResponse);

    // Store user information (optional)
    localStorage.setItem("user", JSON.stringify(loginResponse.account));

    return loginResponse;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw new Error("Sign-in failed. Please try again.");
  }
};
// Add console logging for debugging
console.log("Tenant ID:", process.env.REACT_APP_AZURE_TENANT_ID);
console.log("Client ID:", process.env.REACT_APP_AZURE_CLIENT_ID);

// Function to get an access token silently
export const getAccessToken = async () => {
  try {
    const account = msalInstance.getAllAccounts()[0]; // Get the first account

    if (!account) {
      throw new Error("No account found. User might not be logged in.");
    }

    const tokenResponse = await msalInstance.acquireTokenSilent({
      account,
      scopes: ["openid", "profile", "email"], // Add specific scopes if needed
    });

    return tokenResponse.accessToken;
  } catch (error) {
    console.error("Error acquiring token silently:", error);
    throw new Error("Failed to acquire token.");
  }
};

// Function to get user information from local storage or elsewhere
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null; // Return the parsed user object if found
};
