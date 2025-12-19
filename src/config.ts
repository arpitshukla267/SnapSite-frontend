// Determine API base URL based on environment
const getApiBaseUrl = () => {
  // Priority 1: Explicitly set via environment variable (recommended for production)
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim() !== "") {
    return envUrl.trim();
  }

  // Priority 2: In browser, check if we're in production
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const isProduction = hostname !== "localhost" && hostname !== "127.0.0.1";
    
    if (isProduction) {
      // Use production backend URL as fallback if env var is not set
      return "https://snapsite-backend.onrender.com";
    }
  }

  // Development fallback
  return "http://localhost:5000";
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to validate API URL
export const validateApiUrl = () => {
  // Check if API_BASE_URL exists and is not empty
  if (!API_BASE_URL || API_BASE_URL.trim() === "") {
    if (typeof window !== "undefined") {
      console.warn(
        "⚠️ API_BASE_URL is not configured!\n" +
        "Please set NEXT_PUBLIC_API_URL environment variable in your deployment platform.\n" +
        "For Vercel: Go to Project Settings > Environment Variables\n" +
        "API calls will be skipped until this is configured."
      );
    }
    return false;
  }

  // Check if it's a valid URL format (only in browser)
  if (typeof window !== "undefined") {
    try {
      new URL(API_BASE_URL);
    } catch (e) {
      console.warn(
        "⚠️ API_BASE_URL is not a valid URL format!\n" +
        `Current value: "${API_BASE_URL}"\n` +
        "Please set NEXT_PUBLIC_API_URL to a valid URL (e.g., https://snapsite-backend.onrender.com)"
      );
      return false;
    }
  }

  return true;
};
