// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { products } from "../../data/products"; 

function Navbar({ 
  wishlist = [], 
  cart = [], 
  setIsCartOpen = () => {} 
})  {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();

  const searchResults = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="mb-6 sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 relative">
        {/* . PERBAIKAN LAYOUT ADA DI DIV INI . */}
        <div className="max-w-[1400px] mx-auto px-5 py-5 md:py-6 flex items-center justify-between">
          
          {/* 1. BAGIAN LOGO (Mobile: urutan ke-2 di tengah | Desktop: urutan ke-1 di kiri) */}
          <div className="flex-1 md:flex-none flex justify-center md:justify-start order-2 md:order-1">
            <Link to="/" className="text-xl md:text-2xl tracking-[0.15em] uppercase text-black font-normal">
              ÉLANORA
            </Link>
          </div>

          {/* 2. BAGIAN MENU/BURGER (Mobile: urutan ke-1 di kiri | Desktop: urutan ke-2 di tengah) */}
          <div className="flex-1 md:flex-none flex justify-start md:justify-center order-1 md:order-2">
            {/* Ikon Burger (Hanya Tampil di Mobile) */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-800 hover:text-black transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Kategori Links (Hanya Tampil di Desktop - Kembali Rapi!) */}
            <ul className="hidden md:flex gap-8 text-sm uppercase tracking-wider">
              <li className="hover:text-black cursor-pointer transition">
                <Link to="/category/dress">Dress</Link>
              </li>
              <li className="hover:text-black cursor-pointer transition">
                <Link to="/category/skirt">Skirt</Link>
              </li>
              <li className="hover:text-black cursor-pointer transition">
                <Link to="/category/footwear">Footwear</Link>
              </li>
              <li className="hover:text-black cursor-pointer transition">
                <Link to="/category/blazer">Blazer</Link>
              </li>
            </ul>
          </div>

          {/* 3. BAGIAN IKON KANAN (Selalu urutan ke-3 di kanan) */}
          <div className="flex-1 md:flex-none flex justify-end gap-4 md:gap-5 items-center text-gray-800 order-3">
            
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-gray-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            <Link to="/account" className="hidden md:block hover:text-gray-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>

            <Link to="/wishlist" className="hidden md:block hover:text-gray-500 transition relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button onClick={() => setIsCartOpen(true)} className="hover:text-gray-500 transition relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ================= SEARCH BAR DROPDOWN ================= */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="py-5 px-6 flex items-center justify-center">
              <div className="w-full max-w-[1400px] flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none text-sm md:text-base font-light tracking-wide text-gray-900 placeholder-gray-400"
                  autoFocus
                />
                <button onClick={closeSearch} className="text-gray-500 hover:text-black transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {searchQuery && (
              <div className="w-full max-w-[1400px] mx-auto px-6 pb-10 max-h-[60vh] overflow-y-auto">
                <div className="border-t border-gray-100 pt-8 mt-2">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-6">
                    Search Results ({searchResults.length})
                  </p>
                  {searchResults.length === 0 ? (
                    <p className="text-sm text-gray-500 font-light italic">
                      Oops, tidak ada produk yang cocok dengan "{searchQuery}".
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {searchResults.slice(0, 5).map((item) => (
                        <Link key={item.id} to={`/product/${item.id}`} onClick={closeSearch} className="group block">
                          <div className="aspect-[3/4] bg-gray-50 overflow-hidden mb-4 relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                          </div>
                          <h4 className="text-[10px] font-medium tracking-[0.15em] uppercase text-gray-800 mb-1">{item.name}</h4>
                          <p className="text-xs text-gray-500">Rp {item.price.toLocaleString("id-ID")}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ================= SIDEBAR MENU BURGER (MOBILE) ================= */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeMobileMenu}
      ></div>

      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[70] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <Link to="/" onClick={closeMobileMenu} className="text-xl tracking-[0.15em] uppercase text-black font-normal">
            ÉLANORA
          </Link>
          <button onClick={closeMobileMenu} className="text-gray-500 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-6 space-y-8">
          
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4">Shop Categories</p>
            <ul className="space-y-5 text-base uppercase tracking-widest text-gray-900">
              <li><Link to="/category/dress" onClick={closeMobileMenu} className="block hover:text-gray-500">Dress</Link></li>
              <li><Link to="/category/skirt" onClick={closeMobileMenu} className="block hover:text-gray-500">Skirt</Link></li>
              <li><Link to="/category/footwear" onClick={closeMobileMenu} className="block hover:text-gray-500">Footwear</Link></li>
              <li><Link to="/category/blazer" onClick={closeMobileMenu} className="block hover:text-gray-500">Blazer</Link></li>
            </ul>
          </div>

          <hr className="border-gray-100" />

          <ul className="space-y-5 text-sm uppercase tracking-widest text-gray-600">
            <li>
              <Link to="/account" onClick={closeMobileMenu} className="flex items-center gap-3 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                My Account
              </Link>
            </li>
            <li>
              <Link to="/wishlist" onClick={closeMobileMenu} className="flex items-center gap-3 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                Wishlist
                {wishlist.length > 0 && <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full ml-1">{wishlist.length}</span>}
              </Link>
            </li>
          </ul>
          
        </div>
      </div>
    </>
  );
}

export default Navbar;