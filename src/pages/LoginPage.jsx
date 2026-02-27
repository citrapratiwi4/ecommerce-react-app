// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // . Tambah useLocation
import Navbar from "../components/layout/Navbar";

function LoginPage({ wishlist, cart, setIsCartOpen, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation(); // . Panggil useLocation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // . Tangkap "ingatan" dari Checkout
  const fromPath = location.state?.returnTo || "/account";

  const handleSignIn = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setError("");
      setIsLoggedIn(true);

      // . Kembali ke Checkout
      navigate(fromPath);
    } else {
      setError("Email atau password salah");
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-800 flex flex-col">
      <Navbar wishlist={wishlist} cart={cart} setIsCartOpen={setIsCartOpen} />

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {/* TITLE */}
          <div className="text-center mb-10">
            <h1 className="text-4xl tracking-wide mb-6">Login</h1>
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              {/* . INI KUNCINYA: Bawa memori ke RegisterPage! */}
              <Link
                to="/register"
                state={{ returnTo: fromPath }}
                className="underline hover:text-black transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm flex justify-between items-center animate-fadeIn">
              <span>{error}</span>
              <button
                onClick={() => setError("")}
                className="ml-4 text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSignIn} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3.5 text-sm focus:outline-none focus:border-gray-900 transition-colors"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3.5 text-sm focus:outline-none focus:border-gray-900 transition-colors"
            />

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 hover:text-black underline transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2a2a2a] text-white py-3.5 rounded-full text-sm font-medium hover:bg-black transition-colors shadow-md"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
