// src/pages/SuccessPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function SuccessPage({ wishlist, cart, setIsCartOpen, isLoggedIn }) {
  const navigate = useNavigate();
  const orderNumber = Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="bg-white min-h-screen text-gray-800 flex flex-col">
      <Navbar wishlist={wishlist} cart={cart} setIsCartOpen={setIsCartOpen} />

      <div className="flex-1 flex items-center justify-center px-6 py-16 md:py-20 animate-fade-in-up">
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-inner border border-green-100">
            <svg
              className="w-10 h-10 md:w-12 md:h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl md:text-3xl font-light tracking-wide mb-3 md:mb-4 text-gray-900">
            Thank You for Your Order!
          </h1>

          <p className="text-xs md:text-sm text-gray-500 mb-8 md:mb-10 leading-relaxed px-2 md:px-0">
            Your order number <span className="font-semibold text-black">#{orderNumber}</span> has been successfully placed. We are preparing your order and will send a confirmation email along with the shipping details.
          </p>

          {!isLoggedIn ? (
            // Changed rounded-lg to rounded-sm for consistency with inputs/boxes
            <div className="bg-[#fafafa] p-6 md:p-8 rounded-sm mb-8 md:mb-10 border border-gray-200 shadow-sm">
              <h3 className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase mb-2 md:mb-3 text-gray-800">
                Want to track this order?
              </h3>
              <p className="text-[11px] md:text-xs text-gray-500 mb-5 md:mb-6 font-light leading-relaxed">
                Create an account now to monitor your shipping status in real-time and save your shopping history.
              </p>
              {/* Main CTA: Kept without rounded corners (sharp square) */}
              <button
                onClick={() => navigate("/register")}
                className="w-full bg-black text-white py-3.5 md:py-4 text-[10px] md:text-xs font-medium uppercase tracking-widest hover:bg-gray-800 transition shadow-md"
              >
                Create Account / Login
              </button>
            </div>
          ) : (
            <div className="mb-8 md:mb-10">
               {/* Main CTA: Kept without rounded corners (sharp square) */}
              <button
                onClick={() => navigate("/account")}
                className="w-full bg-black text-white py-3.5 md:py-4 text-[10px] md:text-xs font-medium uppercase tracking-widest hover:bg-gray-800 transition shadow-md"
              >
                View Order History
              </button>
            </div>
          )}
          <Link
            to="/"
            className="inline-block border-b border-black text-[9px] md:text-[10px] tracking-[0.2em] uppercase pb-1 hover:text-gray-500 hover:border-gray-500 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;