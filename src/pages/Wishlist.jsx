// src/pages/Wishlist.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function WishlistPage({ wishlist, toggleWishlist, cart, setIsCartOpen }) {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      <Navbar wishlist={wishlist} cart={cart} setIsCartOpen={setIsCartOpen} />

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Judul Halaman dan Counter (Ukuran Diperhalus) */}
        <div className="text-center mb-10 mt-2">
          <h2 className="text-2xl tracking-[0.15em] font-light uppercase text-gray-900 mb-3">
            My Wishlist
          </h2>
          <div className="w-8 h-[1px] bg-gray-300 mx-auto mb-3"></div>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">
            {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
          </p>
        </div>

        {/* Jika Wishlist Kosong */}
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
  <p className="text-sm text-gray-400 font-light tracking-wide mb-6">
    Your wishlist is currently empty.
  </p>

  <Link
    to="/"
    className="border-b border-black text-[10px] tracking-[0.2em] uppercase pb-1 hover:text-gray-500 hover:border-gray-500 transition"
  >
    Continue Shopping
  </Link>
</div>
        ) : (
          /* Jika Ada Produk di Wishlist */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {wishlist.map((product) => (
              <div key={product.id} className="group relative">
                {/* Gambar Produk */}
                <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Tombol Hapus (Icon Silang) */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm hover:bg-black hover:text-white transition-all duration-300"
                    title="Hapus dari Wishlist"
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

                {/* Info Produk */}
                <div className="mt-5 text-center">
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.15em] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs tracking-wider mb-4">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>

                  {/* TOMBOL ADD TO CART */}
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-full bg-black text-white py-3 mt-4 rounded-full text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors duration-300"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;