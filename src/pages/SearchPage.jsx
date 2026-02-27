import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { products } from "../data/products";

function SearchPage({ wishlist, cart, setIsCartOpen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-white min-h-screen text-gray-800">
      <Navbar wishlist={wishlist} cart={cart} setIsCartOpen={setIsCartOpen} />

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="text-center mb-16 mt-4">
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-b border-gray-300 py-3 pl-10 pr-4 focus:outline-none focus:border-black transition-colors bg-transparent text-sm tracking-widest"
              autoFocus
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        {/* Hasil Pencarian */}
        {searchTerm && filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-light italic">
            Oops, produk "{searchTerm}" tidak ditemukan.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.15em] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs tracking-wider mb-4">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-full bg-black text-white py-3 mt-4 rounded-full text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors duration-300"
                  >
                    View Details
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

export default SearchPage;
