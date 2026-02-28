import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function ForgotPasswordPage({ wishlist, cart, setIsCartOpen }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email) {
      navigate("/reset-password");
    } else {
      setMessage("Email tidak ditemukan.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar wishlist={wishlist} cart={cart} setIsCartOpen={setIsCartOpen} />

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <h1 className="text-3xl mb-6 text-center">Reset Password</h1>

          {message && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
              {message}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-6">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 rounded-md"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 "
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
