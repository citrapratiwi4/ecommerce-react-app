import React from "react";
import { Link, useNavigate } from "react-router-dom";

function CartPage({ cart, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      {/* HEADER GLOBAL */}
      <header className="w-full bg-white border-b border-gray-200 px-6 py-6 lg:px-16 xl:px-24 flex justify-between items-center z-10 sticky top-0">
        <Link
          to="/"
          className="text-2xl tracking-[0.15em] uppercase text-black font-normal"
        >
          ÉLANORA
        </Link>
        <Link
          to="/"
          className="text-[11px] text-gray-500 hover:text-black transition tracking-widest uppercase font-medium"
        >
          Continue Shopping
        </Link>
      </header>

      {/* KONTEN KERANJANG */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 md:py-12">
        <h1 className="text-2xl md:text-3xl font-normal text-center mb-10 tracking-wider">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center space-y-6 py-10">
            <p className="text-gray-500 font-light">
              Your shopping cart is currently empty.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-block border-b border-black text-xs tracking-[0.2em] uppercase pb-1 hover:text-gray-500 hover:border-gray-500 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="w-full">
            {/* ================= HEADER TABEL ================= */}
            <div className="hidden md:grid grid-cols-12 gap-6 text-[11px] tracking-[0.15em] text-gray-400 uppercase border-b border-gray-200 pb-4 mb-2 font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-4 flex justify-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* ================= DAFTAR PRODUK ================= */}
            <div className="border-b border-gray-200">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 py-8 md:items-start border-b border-gray-100 last:border-0"
                >
                  {/* ---------------- KOLOM 1: INFO PRODUK (KIRI) ---------------- */}
                  <div className="md:col-span-6 flex gap-4 md:gap-6 items-start">
                    {/* Foto Produk */}
                    <Link
                      to={`/product/${item.id}`}
                      className="w-24 h-32 md:w-[100px] md:h-[135px] shrink-0 bg-gray-50 rounded overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </Link>
                    <div className="flex flex-col">
                      {/* Nama Produk */}
                      <Link
                        to={`/product/${item.id}`}
                        className="text-xl md:text-2xl font-normal text-gray-900 mb-2 hover:underline leading-none -mt-1"
                      >
                        {item.name}
                      </Link>

                      <p className="text-base text-gray-500 mb-2">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                      <p className="text-base text-gray-500 font-light">
                        Size: {item.size || "OS"}
                      </p>
                    </div>
                  </div>

                  {/* ---------------- KOLOM 2: QUANTITY & TONG SAMPAH (TENGAH) ---------------- */}
                  <div className="md:col-span-4 flex justify-start md:justify-center mt-4 md:mt-0">
                    <div className="flex items-center gap-4 md:-mt-1">
                      {/* Kotak Quantity */}
                      <div className="flex items-center border border-gray-400 rounded overflow-hidden h-[38px] w-[100px] bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.cartItemId || index,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="w-1/3 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition text-lg font-light"
                        >
                          −
                        </button>
                        <span className="w-1/3 text-center text-sm font-medium text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.cartItemId || index,
                              item.quantity + 1,
                            )
                          }
                          className="w-1/3 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition text-lg font-light"
                        >
                          +
                        </button>
                      </div>

                      {/* Ikon Sampah  */}
                      <button
                        onClick={() => removeFromCart(item.cartItemId || index)}
                        className="text-gray-400 hover:text-red-600 transition"
                        title="Remove item"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* ---------------- KOLOM 3: TOTAL HARGA (KANAN) ---------------- */}
                  <div className="md:col-span-2 flex justify-end mt-4 md:mt-0">
                    <span className="text-base md:text-lg font-normal text-gray-900 block md:-mt-1">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= FOOTER CART ================= */}
            <div className="hidden md:grid grid-cols-12 gap-6 mt-8 border-b border-gray-100 pb-6 items-end">
              <div className="col-span-6"></div>
              <div className="col-span-4 flex justify-center">
                <span className="text-lg md:text-xl font-normal text-gray-900 tracking-wide">
                  Subtotal
                </span>
              </div>

              <div className="col-span-2 flex justify-end">
                <span className="text-xl md:text-2xl font-normal text-gray-900">
                  Rp {subtotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div className="flex md:hidden justify-between items-end mt-8 border-b border-gray-100 pb-4 mb-4">
              <span className="text-lg font-normal text-gray-900">
                Subtotal
              </span>
              <span className="text-xl font-normal text-gray-900">
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>

            {/* Area Tombol Checkout */}
            <div className="mt-6 flex flex-col items-end text-right">
              <p className="text-[13px] text-gray-400 mb-8 font-light">
                Tax included.{" "}
                <span
                  className="underline cursor-help"
                  title="Calculated at next step"
                >
                  Shipping
                </span>{" "}
                calculated at checkout.
              </p>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full md:w-64 bg-[#2a2a2a] text-white py-3.5 text-sm font-medium tracking-wide rounded-[30px] hover:bg-black transition shadow-lg shadow-gray-200"
              >
                Check out
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartPage;
