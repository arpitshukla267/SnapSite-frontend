"use client";
import { Mail, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import Loader from "../../components/ui/Loader";
import { API_BASE_URL, validateApiUrl } from "../../config";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking");

  // Check backend health on mount
  useEffect(() => {
    const checkBackendHealth = async () => {
      if (!validateApiUrl()) {
        setBackendStatus("offline");
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout for health check
        
        // Try to fetch the root endpoint
        const res = await fetch(`${API_BASE_URL}/`, {
          method: "GET",
          signal: controller.signal,
          mode: "cors", // Explicitly set CORS mode
        });
        
        clearTimeout(timeoutId);
        
        if (res.ok) {
          setBackendStatus("online");
        } else {
          // Even if response is not ok, if we got a response, server is reachable
          setBackendStatus("online");
        }
      } catch (err: any) {
        // If it's a CORS error or network error, we can't determine status
        // Don't show offline warning if it might just be CORS
        if (err.name === "AbortError") {
          setBackendStatus("offline");
        } else if (err.message?.includes("CORS") || err.message === "Failed to fetch") {
          // Could be CORS issue, but server might be running
          // Set to online to avoid false warnings
          setBackendStatus("online");
        } else {
          setBackendStatus("offline");
        }
      }
    };

    checkBackendHealth();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop page reload
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!validateApiUrl()) {
      setError("API configuration error. Please check your environment variables.");
      setIsLoading(false);
      return;
    }

    // Call backend API
    try {
      const loginUrl = `${API_BASE_URL}/api/auth/login`;
      console.log("Attempting login to:", loginUrl);
      
      // Add timeout and better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const res = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
        mode: "cors"
      });
      
      clearTimeout(timeoutId);

      // Check if response is ok before trying to parse JSON
      if (!res.ok) {
        // Try to parse error message
        let errorMessage = "Login failed";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If JSON parsing fails, use status text
          errorMessage = res.statusText || `Server returned ${res.status}`;
        }
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      const data = await res.json();

      // SUCCESS
      setSuccess("Login successful! Redirecting...");
      
      // Save token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Redirect user
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (err: any) {
      console.error("Login error:", err);
      
      // Provide more specific error messages
      let errorMessage = "Something went wrong. Please try again.";
      
      if (err.name === "AbortError") {
        errorMessage = "Request timed out. The server may be slow or unreachable. Please try again.";
      } else if (err instanceof TypeError && err.message === "Failed to fetch") {
        // Network error - backend might be down or CORS issue
        errorMessage = `Cannot connect to server at ${API_BASE_URL}\n\nPlease ensure:\n1. Backend server is running\n2. CORS is properly configured\n3. Network connection is active\n\nTo start the backend:\ncd backend && npm start`;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden px-4">

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/30 via-purple-700/20 to-fuchsia-700/30 animate-gradient-slow"></div>
      <div className="blob1"></div>
      <div className="blob2"></div>

      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-8 text-center tracking-tight">
          Welcome Back
        </h1>

        {/* BACKEND STATUS */}
        {backendStatus === "checking" && (
          <div className="mb-4 text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm">
            Checking backend connection...
          </div>
        )}
        {backendStatus === "offline" && (
          <div className="mb-4 text-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-sm whitespace-pre-line">
            ⚠️ Backend server is not reachable at {API_BASE_URL}
            {"\n\n"}
            To start the backend server:
            {"\n"}
            <code className="bg-black/30 px-2 py-1 rounded text-xs">cd backend && npm start</code>
          </div>
        )}

        {/* FEEDBACK MESSAGES */}
        {error && (
          <div className="mb-4 text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm whitespace-pre-line">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-200 text-sm">
            {success}
          </div>
        )}

        {/* FORM WITH SUBMIT */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          
            <input
              type="email"
              name="email"
              className="pl-10 pr-4 py-3 w-full bg-white/5 border border-fuchsia-500/40 focus:border-fuchsia-500 rounded-md focus:outline-none text-white placeholder-gray-400"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative w-full">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          
            <input
              type="password"
              name="password"
              className="pl-10 pr-4 py-3 w-full bg-white/5 border border-fuchsia-500/40 focus:border-fuchsia-500 rounded-md focus:outline-none text-white placeholder-gray-400"
              placeholder="Password"
              required
            />
          </div>


          {/* SUBMIT BUTTON */}
          <div className="mt-3">
            {isLoading ? (
              <div className="w-full py-3 flex justify-center bg-white/5 rounded-md border border-white/10">
                <Loader />
              </div>
            ) : (
              <button type="submit" className="btn-dark w-full">Login</button>
            )}
          </div>
        </form>

        <p className="text-gray-300 text-center mt-6 text-sm sm:text-base">
          Don’t have an account?{" "}
          <a href="/signup" className="text-fuchsia-400 underline hover:text-fuchsia-300 transition-colors">Create one</a>
        </p>
      </div>
    </div>
  );
}
