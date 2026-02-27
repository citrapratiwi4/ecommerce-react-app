// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { products } from "../data/products";
import banner from "../assets/images/banner.jpg"
import vestbiru from "../assets/images/vestbiru.jpg"

function Home({ wishlist, toggleWishlist, cart, setIsCartOpen }) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubscribe = () => {
    if (!email) return;
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };
  
  return (
    <div className="bg-white min-h-screen text-gray-800">
      <div className="bg-black text-white text-center py-2.5 text-[10px] md:text-xs font-light tracking-[0.2em] uppercase w-full">
        Mid-Season Sale: Up to 50% Off Selected Items
      </div>

      <Navbar wishlist={wishlist} cart={cart} setIsCartOpen={setIsCartOpen} />

      {/* ================= HERO SECTION ================= */}
      {/* PERBAIKAN 1: Tinggi di HP sedikit dikurangi (h-[80vh]) agar tidak terlalu memaksa gambar memanjang, di Desktop tetap (md:h-[90vh]) */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        
        {/* PERBAIKAN 2: Fokus gambar digeser. Di HP fokus ke kiri (bg-[position:25%_center]), di Desktop kembali ke tengah (md:bg-center) */}
        <div 
          className="absolute inset-0 bg-cover bg-[position:25%_center] md:bg-center transition-all duration-500" 
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white px-4 md:px-8 w-full max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] font-light tracking-[0.1em] md:tracking-[0.08em] uppercase leading-tight md:leading-none mb-4 md:mb-6">
            ÉLANORA
          </h2>
          <p className="text-xs sm:text-sm md:text-xl tracking-[0.2em] md:tracking-[0.15em] uppercase opacity-90 mb-8 md:mb-10">
            Timeless Elegance
          </p>
          <button 
            onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}
            className="border border-white md:border-2 px-6 py-2.5 md:px-8 md:py-3 text-[10px] md:text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition duration-300"
          >
            Shop Collection
          </button>
        </div>
      </section>

      {/* ================= PHILOSOPHY ================= */}
      <section className="pt-16 md:pt-20 pb-10 md:pb-12 text-center max-w-xl mx-auto px-6">
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 md:mb-6">Our Philosophy</p>
        {/* Teks diturunkan ke text-xl untuk HP */}
        <h3 className="text-xl md:text-3xl font-light leading-relaxed text-gray-900">
          Designed with simplicity, shaped by elegance, and made to last beyond seasons.
        </h3>
      </section>

      {/* ================= NEW COLLECTION ================= */}
      <section id="catalog" className="py-10 md:py-12">
        {/* PERBAIKAN 1: px-4 diubah jadi px-2 agar margin pinggir layar HP lebih tipis */}
        <div className="max-w-[1400px] mx-auto px-2 md:px-5">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-3xl font-light tracking-wide mb-4">New Collection</h3>
            <div className="w-12 md:w-16 h-[1px] bg-black mx-auto"></div>
          </div>

          {/* PERBAIKAN 2: gap-x-3 diubah jadi gap-x-1.5 agar jarak antar foto lebih rapat ala This Is April */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-1.5 md:gap-x-8 gap-y-8 md:gap-y-16">
            {(() => {
              const displayProducts = [
                ...products.filter(p => p.category === "Dress").slice(0, 2),
                ...products.filter(p => p.category === "Skirt").slice(0, 2)
              ];

              return displayProducts.map((item) => (
                <div key={item.id} className="group relative">
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="absolute top-2 right-2 md:top-3 md:right-3 z-20 p-2 bg-white/80 rounded-full shadow-sm md:bg-transparent md:shadow-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={wishlist.find((w) => w.id === item.id) ? "#dc2626" : "none"} stroke={wishlist.find((w) => w.id === item.id) ? "#dc2626" : "black"} strokeWidth="1.5" className="w-4 h-4 md:w-6 md:h-6 transition">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6.716-4.03-9-8.25C1.716 9.38 3.716 6 7.25 6c2.02 0 3.44 1.21 4.75 2.94C13.31 7.21 14.73 6 16.75 6 20.284 6 22.284 9.38 21 12.75 18.716 16.97 12 21 12 21z" />
                    </svg>
                  </button>

                  <Link to={`/product/${item.id}`} className="block">
                    {/* PERBAIKAN 3: h-[220px] DIHAPUS, diganti dengan aspect-[4/5] agar tingginya proporsional dan otomatis menyesuaikan lebar layar HP */}
                    <div className="relative w-full aspect-[4/5] md:h-[450px] overflow-hidden bg-gray-100">
                      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out md:group-hover:opacity-0" />
                      <img src={item.hoverImage || item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-in-out md:group-hover:opacity-100 md:group-hover:scale-105" />
                    </div>
                    
                    <div className="mt-3 md:mt-5 space-y-1 md:space-y-2 text-center px-1">
                      {/* PERBAIKAN 4: Ukuran font judul dinaikkan sedikit dari text-[9px] jadi text-[10px] agar lebih terbaca */}
                      <h4 className="text-[10px] md:text-xs font-medium tracking-[0.1em] md:tracking-[0.15em] uppercase text-gray-800 truncate">{item.name}</h4>
                      <p className="text-xs md:text-sm font-light text-gray-500">Rp {item.price.toLocaleString("id-ID")}</p>
                    </div>
                  </Link>

                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* ================= BLAZER PREVIEW ================= */}
      <section className="py-14 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative w-full max-w-[700px] mx-auto">
            <img src={vestbiru} alt="Blazer Collection Preview" className="w-full h-auto object-contain" />
          </div>
          <div className="max-w-md flex flex-col items-start px-2 md:px-0">
            <p className="text-[10px] md:text-sm font-medium tracking-[0.2em] text-gray-400 uppercase mb-1 md:mb-2">Coming Soon</p>
            
            {/* . PERBAIKAN: Margin bawah di Desktop (md:mb) dipangkas dari 6 menjadi 1 agar SANGAT MEPET dengan teks Autumn */}
            <h3 className="text-2xl md:text-5xl font-light leading-tight md:leading-snug mb-1 md:mb-1 text-gray-900">
              The Blazer Collection.
            </h3>
            
            <div className="flex flex-col items-start">
              {/* . PERBAIKAN: Margin atas (mt) dihapus menjadi 0, dan margin bawah ke tombol sedikit dirapatkan di Desktop */}
              <p className="text-[9px] md:text-[11px] tracking-[0.25em] text-gray-400 uppercase font-light mt-0 mb-6 md:mb-12">
                Autumn / Winter 2026 Preview
              </p>
              
              <Link to="/category/blazer" className="inline-block border border-black px-6 py-2.5 md:px-10 md:py-4 text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-black hover:text-white transition duration-300">
                Preview Collection
              </Link>
            </div> 
          </div>
        </div>
      </section>
      {/* ================= SHOP BY CATEGORY ================= */}
      {/* Padding Y dirapatkan agar nyambung dengan Blazer */}
      <section className="py-10 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="text-center mb-8 md:mb-16">
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-400 mb-2 md:mb-4">Explore</p>
            <h3 className="text-xl md:text-3xl font-light">Shop by Category</h3>
          </div>
          
          {/* Di-KUNCI 2 Kolom untuk HP (grid-cols-2) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {[
              { name: "Dress", image: products[9]?.image },
              { name: "Skirt", image: products[12]?.image },
              { name: "Footwear", image: products[18]?.image },
              { name: "Blazer", image: products[0]?.image }
            ].map((cat, index) => (
              <Link key={index} to={`/category/${cat.name.toLowerCase()}`} className="group relative overflow-hidden h-[180px] sm:h-[250px] md:h-[420px]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h4 className="text-white text-xs md:text-xl tracking-[0.2em] uppercase font-light">{cat.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* ================= NEWSLETTER ================= */}
      {/* ================= NEWSLETTER ================= */}
      <section className="py-16 md:py-28 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 md:mb-6">
            Join Élanora
          </p>

          {/* . PERBAIKAN: Di HP dikecilkan jadi text-xl dan ditambahkan leading-relaxed agar spasi antar baris lebih rapi. Di Laptop tetap text-4xl */}
          <h3 className="text-xl md:text-4xl font-light leading-relaxed mb-4 md:mb-6">
            Receive curated updates
            <br />
            and exclusive releases.
          </h3>

          {/* . PERBAIKAN: Teks deskripsi disesuaikan sedikit ukurannya untuk HP */}
          <p className="text-[11px] md:text-base text-gray-500 mb-8 md:mb-10 px-2 md:px-0">
            Be the first to discover new collections, private events, and refined essentials.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            {/* Kotak Input dan Tombol sedikit disesuaikan ukurannya agar proporsional di HP */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-[320px] px-5 py-3 md:py-3.5 border border-gray-300 focus:outline-none focus:border-black text-xs md:text-sm"
            />

            <button
              onClick={handleSubscribe}
              className="w-full sm:w-auto px-8 py-3 md:py-3.5 bg-black text-white text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </div>

          <div
            className={`mt-6 text-xs md:text-sm font-light text-green-600 transition-opacity duration-700 ${
              isSubscribed ? "opacity-100" : "opacity-0"
            }`}
          >
            ✓ Subscribed successfully.
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-gray-200 py-20">

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            <div>

              <h4 className="text-xl font-medium tracking-[0.15em] uppercase mb-6">Élanora</h4>

              <p className="text-sm text-gray-500 leading-relaxed">Timeless silhouettes designed with simplicity, shaped by elegance, and crafted to last.</p>

            </div>

            <div>

              <h5 className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-6">Shop</h5>

              <ul className="space-y-3 text-sm text-gray-600">

                <li className="hover:text-black cursor-pointer">Dress</li>

                <li className="hover:text-black cursor-pointer">Skirt</li>

                <li className="hover:text-black cursor-pointer">Blazer</li>

                <li className="hover:text-black cursor-pointer">Footwear</li>

              </ul>

            </div>

            <div>

              <h5 className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-6">Customer Care</h5>

              <ul className="space-y-3 text-sm text-gray-600">

                <li className="hover:text-black cursor-pointer">Contact Us</li>

                <li className="hover:text-black cursor-pointer">Shipping & Returns</li>

                <li className="hover:text-black cursor-pointer">Size Guide</li>

                <li className="hover:text-black cursor-pointer">FAQ</li>

              </ul>

            </div>

            <div>

              <h5 className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-6">Follow</h5>

              <ul className="space-y-3 text-sm text-gray-600">

                <li className="hover:text-black cursor-pointer">Instagram</li>

                <li className="hover:text-black cursor-pointer">Tiktok</li>

                <li className="hover:text-black cursor-pointer">Facebook</li>

              </ul>

            </div>

          </div>

          <div className="border-t border-gray-200 pt-8 text-center text-xs text-gray-400 tracking-wide">

            © {new Date().getFullYear()} Élanora. All rights reserved.

          </div>

        </div>

      </footer>

    </div>

  );

}



export default Home;