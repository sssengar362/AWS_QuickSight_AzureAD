interface TokenPayload {
  roles: string[];
}

const base64UrlToJson = (base64Url: string): TokenPayload => {
  try {
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert from base64url to base64
    const jsonString = atob(base64); // Decode base64 to string
    return JSON.parse(jsonString); // Parse JSON string to object
  } catch (error) {
    console.error("Error decoding base64 URL:", error);
    throw new Error("Invalid token payload");
  }
};

export const getRoleFromToken = (token: string): string => {
  try {
    const payload = token.split(".")[1]; // Get the payload part of the JWT

    if (!payload) {
      throw new Error("Token does not contain a payload.");
    }

    const decoded: TokenPayload = base64UrlToJson(payload); // Decode the payload

    // Check if roles exist and return the first one; otherwise, return the default
    return Array.isArray(decoded.roles) && decoded.roles.length > 0
      ? decoded.roles[0]
      : "Reader"; // Default to Reader role
  } catch (error) {
    console.error("Error decoding token:", error);
    return "Reader"; // Fallback in case of an error
  }
};

// interface TokenPayload {
//   roles: string[];
// }

// const base64UrlToJson = (base64Url: string): TokenPayload => {
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert from base64url to base64
//   const jsonString = atob(base64); // Decode base64 to string
//   return JSON.parse(jsonString); // Parse JSON string to object
// };

// export const getRoleFromToken = (token: string): string => {
//   try {
//     const payload = token.split(".")[1]; // Get the payload part of the JWT
//     const decoded: TokenPayload = base64UrlToJson(payload); // Decode the payload
//     return decoded.roles && decoded.roles.length > 0
//       ? decoded.roles[0]
//       : "Reader"; // Default to Reader role
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return "Reader"; // Fallback in case of an error
//   }
// };

// import jwt_decode from "jwt-decode"; // Use default import

// interface TokenPayload {
//   roles: string[];
// }

// export const getRoleFromToken = (token: string): string => {
//   try {
//     const decoded = jwt_decode<TokenPayload>(token); // Decode the token
//     return decoded.roles && decoded.roles.length > 0
//       ? decoded.roles[0]
//       : "Reader"; // Default to Reader role
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return "Reader"; // Fallback in case of an error
//   }
// };

// import jwt_decode from "jwt-decode";

// interface TokenPayload {
//   roles: string[];
// }

// export const getRoleFromToken = (token: string) => {
//   const decoded: TokenPayload = jwt_decode(token);
//   return decoded.roles ? decoded.roles[0] : "Reader"; // Default to Reader role
// };
