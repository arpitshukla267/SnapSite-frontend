"use client";
import { Mail, Lock } from "lucide-react";

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault(); // stop page reload

  const formData = new FormData(e.currentTarget);

  const email = formData.get("email");
  const password = formData.get("password");

  console.log("Email:", email);
  console.log("Password:", password);

  // Call backend API
  try {
    const res = await fetch("https://snapsite-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log("Response:", data);

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }
    
    // SUCCESS
    alert("Login successful!");
    
    // Save token & user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    // Redirect user
    window.location.href = "/";


  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
}

export default function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/30 via-purple-700/20 to-fuchsia-700/30 animate-gradient-slow"></div>
      <div className="blob1"></div>
      <div className="blob2"></div>

      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/10 shadow-2xl">
        
        <h1 className="text-4xl font-semibold text-white mb-8 text-center tracking-tight">
          Welcome Back
        </h1>

        {/* FORM WITH SUBMIT */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          
            <input
              type="email"
              name="email"
              className="pl-10 pr-4 py-3 w-full border border-fuchsia-500/40 focus:border-fuchsia-500 rounded-md focus:outline-none"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative w-full">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          
            <input
              type="password"
              name="password"
              className="pl-10 pr-4 py-3 w-full border border-fuchsia-500/40 focus:border-fuchsia-500 rounded-md focus:outline-none"
              placeholder="Password"
              required
            />
          </div>


          {/* SUBMIT BUTTON */}
          <button type="submit" className="btn-dark mt-3">Login</button>
        </form>

        <p className="text-gray-300 text-center mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-fuchsia-400 underline">Create one</a>
        </p>
      </div>
    </div>
  );
}
