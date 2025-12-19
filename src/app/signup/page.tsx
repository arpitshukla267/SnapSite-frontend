"use client";
import { Mail, Lock, User, Phone } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Loader from "../../components/ui/Loader";
import { API_BASE_URL, validateApiUrl } from "../../config";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!validateApiUrl()) {
      setError("API configuration error. Please check your environment variables.");
      setIsLoading(false);
      return;
    }

    // Call backend API
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, username, email, phone, password, confirmPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setIsLoading(false);
        return;
      }

      // SUCCESS
      setSuccess("Signup successful! Redirecting to login...");

      // Save token to localStorage (optional)
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
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden px-4 py-8">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/30 via-fuchsia-700/20 to-indigo-800/30 animate-gradient-slow"></div>
      <div className="blob1"></div>
      <div className="blob2"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-8 text-center tracking-tight">
          Create Your Account
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

        <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>

          {/* FULL NAME */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input 
              name="name"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Full Name"
              required
            />
          </div>

          {/* USERNAME */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input 
              name="username"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Username"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input 
              name="email"
              type="email"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Email Address"
              required
            />
          </div>

          {/* PHONE */}
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input 
              name="phone"
              type="tel"
              className="no-spinner w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Phone Number"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
          
            <input 
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Password"
              required
            />
          
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
          
            <input 
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Confirm Password"
              required
            />
          
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none"
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>


          {/* SUBMIT BUTTON */}
          <div className="mt-3">
            {isLoading ? (
              <div className="w-full py-3 flex justify-center bg-white/10 rounded-xl border border-white/20">
                <Loader />
              </div>
            ) : (
              <button type="submit" className="btn-dark w-full">Create Account</button>
            )}
          </div>
        </form>

        <p className="text-gray-300 text-center mt-6 text-sm sm:text-base">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 underline hover:text-indigo-300 transition-colors">Login</a>
        </p>
      </div>
    </div>
  );
}
