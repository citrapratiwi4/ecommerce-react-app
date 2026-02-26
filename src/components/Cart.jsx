import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart({ cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, checkout }) {
  // Menghitung total harga keranjang
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <>
      {/* 1. OVERLAY GELAP (Klik untuk menutup cart) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-100 transition-opacity duration-500 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* 2. SIDEBAR KERANJANG PUTER KANAN */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[420px] bg-white z-100 shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="text-[11px] font-medium tracking-[0.25em] uppercase text-gray-900">
            Shopping Cart ({cart.length})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-black transition duration-300 outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* BODY (DAFTAR PRODUK) */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {cart.length === 0 ? (
            // Tampilan Jika Keranjang Kosong
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <p className="text-sm text-gray-400 font-light tracking-wide">
                Your shopping cart is currently empty.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false); // 1. Tutup keranjang
                  navigate("/");        // 2. Arahkan kembali ke Home/Katalog
                }}
                className="border-b border-black text-[10px] tracking-[0.2em] uppercase pb-1 hover:text-gray-500 hover:border-gray-500 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            // Tampilan Jika Ada Produk
            <div className="space-y-8">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-5">
                  
                  {/* FOTO PRODUK */}
                  <Link
                    to={`/product/${item.id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-[90px] h-[120px] shrink-0 bg-gray-50"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </Link>

                  {/* INFO PRODUK */}
                  <div className="flex flex-col flex-1 py-1">
                    
                    {/* Baris 1: Judul & Tombol Hapus */}
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[18px] font-normal text-gray-900 tracking-wide">{item.name}</h3>
                      
                      {/* Tombol Hapus (Tong Sampah) */}
                      <button
                        onClick={() => removeFromCart(item.cartItemId || index)}
                        className="text-gray-400 hover:text-black transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Baris 2: Variant & Size (Dibuat eksplisit seperti Benang Jarum) */}
                    <p className="text-[14px] text-gray-500 mb-4 font-light">
                      {item.variant ? `Color: ${item.variant} | ` : ""}Size: <span className="uppercase">{item.size || "OS"}</span>
                    </p>

                    {/* Baris 3: Quantity & Harga (Jarak sudah diperlebar) */}
                    <div className="flex items-center gap-10 mt-auto pt-2">
                      
                      {/* Kontrol Kuantitas (+ / -) */}
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.cartItemId || index, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition font-light"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-medium text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId || index, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition font-light"
                        >
                          +
                        </button>
                      </div>

                      {/* Harga Total per Item */}
                      <p className="text-[14px] font-normal text-gray-900 tracking-wide">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </p>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER (SUBTOTAL & CHECKOUT) */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 px-8 py-8 bg-gray-50/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                Subtotal
              </span>
              <span className="text-lg font-normal text-gray-900 tracking-wide">
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
            
            <p className="text-[10px] text-gray-400 font-light mb-6 tracking-wide leading-relaxed">
              Shipping, taxes, and discount codes calculated at checkout.
            </p>
            
            <button 
           onClick={() => {
             setIsCartOpen(false); // Tutup sidebar cart
             navigate("/checkout"); // Pindah ke halaman form checkout
           }} 
           className="w-full bg-black text-white py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-gray-800 transition"
         >
           Proceed to Checkout
         </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;