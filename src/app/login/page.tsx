"use client";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import Loader from "../../components/ui/Loader";
import { API_BASE_URL, validateApiUrl } from "../../config";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }
      
      // SUCCESS
      setSuccess("Login successful! Redirecting...");
      
      // Save token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Redirect user
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
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

        {/* FEEDBACK MESSAGES */}
        {error && (
          <div className="mb-4 text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
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
