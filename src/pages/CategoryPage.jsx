import React, { useState, useEffect } from "react"; // Tambahkan useEffect
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { products } from "../data/products";
import dressbiru1 from "../assets/images/dressbiru1.jpg";
import banerskirt from "../assets/images/banerskirt.jpg";
import baner from "../assets/images/baner.jpg";
import blazerhijau from "../assets/images/blazerhijau.jpg";

function CategoryPage({ wishlist, toggleWishlist, cart, setIsCartOpen }) {
  const { categoryName } = useParams();

  const [sortBy, setSortBy] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Scroll ke atas saat pindah kategori
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "best-selling", label: "Best Selling" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "alpha-az", label: "Alphabet: A-Z" },
    { value: "alpha-za", label: "Alphabet: Z-A" },
  ];

  // 1. Ambil produk berdasarkan kategori
  let displayProducts = products.filter(
    (product) =>
      product.category &&
      product.category.toLowerCase() === categoryName.toLowerCase(),
  );

  const bannerImage =
    displayProducts.length > 0 ? displayProducts[0].image : "";

  // 2. Filter stok
  if (inStockOnly) {
    displayProducts = displayProducts.filter(
      (item) =>
        item.category.toLowerCase() !== "blazer" &&
        !item.isComingSoon &&
        item.stock !== 0,
    );
  }

  // 3. Filter best-selling
  if (sortBy === "best-selling") {
    displayProducts = displayProducts.filter((item) => {
      const isItemComingSoon =
        item.category.toLowerCase() === "blazer" || item.isComingSoon;
      return !isItemComingSoon && item.soldCount && item.soldCount >= 100;
    });
  }

  // 4. Urutkan (Sorting)
  displayProducts.sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "alpha-az") return a.name.localeCompare(b.name);
    if (sortBy === "alpha-za") return b.name.localeCompare(a.name);

    if (sortBy === "best-selling") {
      return (b.soldCount || 0) - (a.soldCount || 0);
    }
    return 0;
  });

  return (
    <div className="bg-white min-h-screen text-gray-800">
      <Navbar wishlist={wishlist} cart={cart} setIsCartOpen={setIsCartOpen} />

      {/* HEADER CATEGORY */}
      <div className="flex flex-col md:flex-row-reverse w-full h-auto md:h-[70vh] bg-white mb-8 md:mb-12 overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start px-6 py-12 md:px-24 bg-white">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-[10px] md:text-[12px] tracking-[0.5em] uppercase text-gray-400 mb-4 md:mb-6 font-light">
              Élanora Essentials
            </p>

            <h2
              className={`font-extralight tracking-widest md:tracking-tighter uppercase text-gray-900 leading-none ml-0 md:ml-[-7px] ${categoryName.length > 6 ? "text-4xl md:text-8xl" : "text-5xl md:text-9xl"}`}
            >
              {categoryName}
            </h2>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-[60vh] md:h-full bg-white flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {bannerImage ? (
              <img
                src={
                  categoryName.toLowerCase() === "dress"
                    ? dressbiru1
                    : categoryName.toLowerCase() === "skirt"
                      ? banerskirt
                      : categoryName.toLowerCase() === "footwear"
                        ? baner
                        : categoryName.toLowerCase() === "blazer"
                          ? blazerhijau
                          : bannerImage
                }
                alt={categoryName}
                className="w-full h-full object-contain object-top mix-blend-multiply transition-transform duration-1000 hover:scale-105"
              />
            ) : (
              <div className="text-[9px] tracking-widest text-gray-300 uppercase text-center">
                Collection Pending
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FILTER & SORT BAR */}
      <div className="max-w-[1400px] mx-auto px-6 mb-12 relative z-30">
        <div className="flex flex-col md:flex-row justify-between items-center py-5 border-y border-gray-100">
          <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4 md:mb-0">
            {displayProducts.length}{" "}
            {displayProducts.length === 1 ? "Product" : "Products"}
          </div>

          <div className="flex items-center gap-8 md:gap-12">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={inStockOnly}
                  onChange={() => setInStockOnly(!inStockOnly)}
                />
                <div
                  className={`block w-9 h-5 rounded-full transition-colors duration-300 ${inStockOnly ? "bg-gray-900" : "bg-gray-200"}`}
                ></div>
                <div
                  className={`absolute left-1 bg-white w-3 h-3 rounded-full transition-transform duration-300 ${inStockOnly ? "transform translate-x-4" : ""}`}
                ></div>
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                In Stock Only
              </span>
            </label>

            <div className="hidden md:block w-px h-4 bg-gray-200"></div>

            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
                className="flex items-center gap-2 group outline-none text-gray-400 hover:text-gray-800 transition-colors"
              >
                <span className="text-[13px] font-light tracking-wide">
                  Sort by
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`absolute right-0 top-full mt-4 w-48 bg-white border border-gray-100 shadow-xl transition-all duration-300 origin-top-right ${
                  isSortOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                }`}
              >
                <div className="py-2 flex flex-col">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`text-left px-5 py-3 text-[10px] tracking-[0.15em] uppercase transition-colors hover:bg-gray-50 ${
                        sortBy === option.value
                          ? "text-gray-900 font-bold bg-gray-50"
                          : "text-gray-500 font-medium"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-[1400px] mx-auto px-6 pb-20">
        {displayProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-sm">
            <p className="text-gray-500 mb-8 font-light italic">
              Oops, no items match your current filter.
            </p>
            <button
              onClick={() => {
                setInStockOnly(false);
                setSortBy("featured");
              }}
              className="inline-block bg-black text-white px-10 py-4 uppercase text-[10px] tracking-[0.2em] hover:bg-gray-800 transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 animate-fadeIn">
            {displayProducts.map((item) => {
              const isComingSoon =
                item.category.toLowerCase() === "blazer" || item.isComingSoon;
              const isSoldOut = item.stock === 0;
              const isUnclickable = isComingSoon;

              return (
                <div key={item.id} className="group relative">
                  {/* WISHLIST BUTTON */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-4 right-4 z-20 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={
                        wishlist.find((w) => w.id === item.id)
                          ? "#dc2626"
                          : "none"
                      }
                      stroke={
                        wishlist.find((w) => w.id === item.id)
                          ? "#dc2626"
                          : "black"
                      }
                      strokeWidth="1.5"
                      className="w-6 h-6 md:w-7 md:h-7 transition-colors duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21s-6.716-4.03-9-8.25C1.716 9.38 3.716 6 7.25 6c2.02 0 3.44 1.21 4.75 2.94C13.31 7.21 14.73 6 16.75 6 20.284 6 22.284 9.38 21 12.75 18.716 16.97 12 21 12 21z"
                      />
                    </svg>
                  </button>

                  <Link
                    to={isUnclickable ? "#" : `/product/${item.id}`}
                    className={`block ${isUnclickable ? "cursor-default" : ""}`}
                  >
                    <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden bg-gray-50">
                      {/* MAIN IMAGE */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0 ${isSoldOut ? "opacity-70" : ""}`}
                      />
                      {/* HOVER IMAGE */}
                      <img
                        src={item.hoverImage || item.image}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105"
                      />

                      {/* BADGE OVERLAYS */}
                      {isComingSoon && (
                        <div className="absolute inset-0 bg-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-[10px] tracking-[0.3em] font-medium uppercase bg-white/90 px-6 py-3 shadow-lg text-gray-700">
                            Preview Only
                          </span>
                        </div>
                      )}

                      {!isComingSoon && isSoldOut && (
                        <div className="absolute inset-0 bg-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-[10px] tracking-[0.3em] font-medium uppercase bg-white/90 px-6 py-3 shadow-lg text-gray-700">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 space-y-2 text-center">
                      <h4 className="text-[11px] md:text-xs font-normal tracking-[0.15em] uppercase text-gray-600 group-hover:text-black transition-colors">
                        {item.name}
                      </h4>
                      {isComingSoon ? (
                        <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                          Coming Soon
                        </p>
                      ) : isSoldOut ? (
                        <p className="text-[10px] font-bold tracking-[0.2em] text-red-800 uppercase">
                          Out of Stock
                        </p>
                      ) : (
                        <p className="text-sm font-light text-gray-500">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* BRAND STATEMENT */}
      <section className="py-20 md:py-32 border-t border-gray-50 text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-6 md:mb-8">
            Élanora Studio
          </p>
          <h3 className="text-base md:text-2xl font-light leading-relaxed text-gray-900 mb-8 md:mb-12 px-2">
            Every piece is designed to transcend trends, delivering enduring
            quality that lasts beyond the seasons.
          </h3>
          <div className="w-px h-12 md:h-16 bg-gray-200 mx-auto"></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-xl font-medium tracking-[0.15em] uppercase mb-6">
                Élanora
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Timeless silhouettes designed with simplicity, shaped by
                elegance, and crafted to last.
              </p>
            </div>
            <div>
              <h5 className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-6">
                Shop
              </h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <Link to="/category/dress" className="hover:text-black">
                    Dress
                  </Link>
                </li>
                <li>
                  <Link to="/category/skirt" className="hover:text-black">
                    Skirt
                  </Link>
                </li>
                <li>
                  <Link to="/category/blazer" className="hover:text-black">
                    Blazer
                  </Link>
                </li>
                <li>
                  <Link to="/category/footwear" className="hover:text-black">
                    Footwear
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-6">
                Customer Care
              </h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-black cursor-pointer">Contact Us</li>
                <li className="hover:text-black cursor-pointer">
                  Shipping & Returns
                </li>
                <li className="hover:text-black cursor-pointer">Size Guide</li>
                <li className="hover:text-black cursor-pointer">FAQ</li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-6">
                Follow
              </h5>
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

export default CategoryPage;
