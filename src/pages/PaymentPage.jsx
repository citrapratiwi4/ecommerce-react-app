// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentPage({ cart, checkoutAction, shippingCost, discountAmount }) {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, processing, success

  // Calculate final amount: (Subtotal) + (Shipping) - (Discount)
  const totalAmount = Math.max(
    0,
    cart.reduce((total, item) => total + item.price * item.quantity, 0) +
      (shippingCost || 0) -
      (discountAmount || 0),
  );

  // Redirect to home if cart is empty and no payment is processing
  useEffect(() => {
    if (cart.length === 0 && paymentStatus === "idle") {
      navigate("/");
    }
  }, [cart, paymentStatus, navigate]);

  // Payment Methods
  const methods = [
    {
      id: "bca",
      name: "BCA Virtual Account",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
      appName: "m-BCA",
    },
    {
      id: "mandiri",
      name: "Mandiri Virtual Account",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png",
      appName: "Livin' by Mandiri",
    },
  ];

  // Handle payment processing simulation
  const handleCheckStatus = () => {
    setPaymentStatus("processing");

    setTimeout(() => {
      setPaymentStatus("success");

      // Wait briefly to show the success animation before redirecting
      setTimeout(() => {
        // 1. Execute checkout action to clear cart and save to orders
        checkoutAction();

        // 2. Redirect to Success Page
        navigate("/success");
      }, 2000); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-gray-800">
      {/* PAYMENT GATEWAY CONTAINER */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        
        {/* ================= DARK HEADER ================= */}
        <div className="bg-[#0e1726] p-6 text-white flex flex-col items-center justify-center relative">
          <div className="absolute top-5 left-5 text-xs font-bold tracking-widest text-gray-300">
            ÉLANORA
          </div>
          <p className="text-[10px] text-gray-400 mt-6 mb-1 tracking-widest uppercase">
            TOTAL AMOUNT
          </p>
          <h2 className="text-3xl font-semibold tracking-wide">
            Rp {totalAmount.toLocaleString("id-ID")}
          </h2>
        </div>

        {/* ================= BODY CONTENT ================= */}
        <div className="p-8 min-h-[320px] flex flex-col justify-center">
          
          {/* STATUS 1: SELECT PAYMENT METHOD */}
          {paymentStatus === "idle" && !selectedMethod && (
            <div className="animate-fade-in flex flex-col h-full">
              <h3 className="text-xs font-bold text-gray-500 mb-4 tracking-widest uppercase">
                SELECT PAYMENT METHOD
              </h3>

              <div className="space-y-3 mb-6">
                {methods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    // Applied rounded-sm for input/selection elements consistency
                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:border-blue-500 hover:bg-blue-50/30 transition text-left"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      {method.name}
                    </span>
                    <img
                      src={method.logo}
                      alt={method.name}
                      className="h-4 object-contain max-w-[60px]"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-auto text-xs text-center text-gray-400 hover:text-gray-700 transition"
              >
                ← Return to Checkout
              </button>
            </div>
          )}

          {/* STATUS 2: METHOD SELECTED, WAITING FOR PAYMENT */}
          {paymentStatus === "idle" && selectedMethod && (
            <div className="animate-fade-in flex flex-col h-full">
              {/* Selected Bank Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedMethod.logo}
                    alt={selectedMethod.name}
                    className="h-4 object-contain max-w-[50px]"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {selectedMethod.name}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMethod(null)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Added rounded-sm to info box for consistency */}
              <div className="bg-blue-50/50 p-6 rounded-sm border border-blue-100 text-center mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Awaiting Payment
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We have sent the billing notification. Please open the
                  <b> {selectedMethod.appName}</b> app on your smartphone to
                  confirm and complete this transaction.
                </p>
              </div>

              <div className="mt-auto">
                {/* CTA Button: No border radius (sharp square) */}
                <button
                  onClick={handleCheckStatus}
                  className="w-full bg-[#0a58ca] text-white py-4 text-sm font-medium tracking-wide hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                >
                  Check Payment Status
                </button>
              </div>
            </div>
          )}

          {/* STATUS 3: PROCESSING PAYMENT */}
          {paymentStatus === "processing" && (
            <div className="animate-fade-in flex flex-col items-center justify-center py-10">
              <div className="w-14 h-14 border-4 border-gray-100 border-t-[#0a58ca] rounded-full animate-spin mb-6"></div>
              <h3 className="text-base font-medium text-gray-900 mb-1">
                Checking Status...
              </h3>
              <p className="text-sm text-gray-500">
                Connecting to the bank system
              </p>
            </div>
          )}

          {/* STATUS 4: SUCCESS */}
          {paymentStatus === "success" && (
            <div className="animate-fade-in-up flex flex-col items-center justify-center py-8 text-center">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner border border-green-100">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-sm text-gray-500 mb-4 px-6">
                Your order has been received and is being processed.
              </p>
              <p className="text-xs text-gray-400 animate-pulse">
                Redirecting...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;