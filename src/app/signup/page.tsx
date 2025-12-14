"use client";
import { Mail, Lock, User, Phone } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  console.log("Name:", name);
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Phone:", phone);
  console.log("Password:", password);
  console.log("Confirm Password:", confirmPassword);

  // Call backend API
  try {
    const res = await fetch("https://snapsite-backend.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, username, email, phone, password, confirmPassword })
    });

    const data = await res.json();
    console.log("Response:", data);

    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    // SUCCESS
    alert("Signup successful!");

    // Save token to localStorage (optional)
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));  

    // Redirect user
    window.location.href = "/";

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/30 via-fuchsia-700/20 to-indigo-800/30 animate-gradient-slow"></div>
      <div className="blob1"></div>
      <div className="blob2"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/10 shadow-2xl">
        
        <h1 className="text-4xl font-semibold text-white mb-8 text-center tracking-tight">
          Create Your Account
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          {/* FULL NAME */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input 
              name="name"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none"
              placeholder="Full Name"
            />
          </div>

          {/* USERNAME */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input 
              name="username"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none"
              placeholder="Username"
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input 
              name="email"
              type="email"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none"
              placeholder="Email Address"
            />
          </div>

          {/* PHONE */}
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input 
              name="phone"
              type="tel"
              className="no-spinner w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none"
              placeholder="Phone Number"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
          
            <input 
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none"
              placeholder="Password"
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
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3 text-white placeholder:text-white/50 focus:outline-none"
              placeholder="Confirm Password"
            />
          
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none"
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>


          <button type="submit" className="btn-dark mt-3">Create Account</button>
        </form>

        <p className="text-gray-300 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 underline">Login</a>
        </p>
      </div>
    </div>
  );
}
