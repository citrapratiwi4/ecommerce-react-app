// src/components/ui/CartDrawer.jsx
import React from "react";

function CartDrawer({ isOpen, onClose, cart, removeFromCart, checkout }) {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <>
      {/* Overlay Gelap Latar Belakang */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      ></div>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header Sidebar */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <h2 className="text-sm font-medium tracking-[0.2em] uppercase">
            Cart ({cart.length})
          </h2>
          <button
            onClick={onClose}
            className="hover:rotate-90 transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* List Barang (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 h-[calc(100vh-250px)]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-gray-400 font-light italic text-sm mb-4">
                Your cart is empty
              </p>
              <button
                onClick={onClose}
                className="text-[10px] tracking-widest uppercase border-b border-black pb-1"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 group">
                  <div className="w-20 h-28 bg-gray-50 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-[10px] font-medium tracking-widest uppercase mb-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-gray-300 hover:text-black"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-tighter mb-2">
                        {item.selectedSize} |{" "}
                        {item.selectedVariant || "Default"}
                      </p>
                      <p className="text-xs font-light tracking-wide">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Sidebar (Total & Checkout) */}
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-6 space-y-4">
            <div className="flex justify-between items-center text-sm tracking-widest uppercase">
              <span className="text-gray-400">Total</span>
              <span className="font-medium text-lg">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
            <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest">
              Taxes and shipping calculated at checkout
            </p>
            <button
              onClick={() => {
                checkout();
                onClose();
              }}
              className="w-full bg-black text-white py-4 text-[10px] tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors"
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;