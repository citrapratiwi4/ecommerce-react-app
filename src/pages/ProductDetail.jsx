// src/pages/ProductDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { products } from "../data/products";

function ProductDetail({
  wishlist,
  toggleWishlist,
  addToCart,
  cart,
  setIsCartOpen,
}) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  // Initialize scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Component states
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants && product.variants.length > 0
      ? product.variants[0]
      : null,
  );
  const [selectedSize, setSelectedSize] = useState(null);

  const [selectedImage, setSelectedImage] = useState(
    product?.variants && product.variants.length > 0
      ? product.variants[0].images[0]
      : product?.images?.[0] || product?.image,
  );

  const [openAccordion, setOpenAccordion] = useState("description");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const scrollRef = useRef(null);

  // Auto-slide functionality for mobile gallery
  useEffect(() => {
    const autoSlide = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollTo({
            left: scrollLeft + clientWidth,
            behavior: "smooth",
          });
        }
      }
    }, 3000);
    return () => clearInterval(autoSlide);
  }, []);

  if (!product)
    return (
      <div className="p-10 text-center text-2xl font-light">
        Product not found
      </div>
    );

  const isWishlisted = wishlist.find((w) => w.id === product.id);
  const hasVariants = product.variants && product.variants.length > 0;
  const isSoldOut = product.stock === 0;
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image, product.hoverImage].filter(Boolean);

  const availableSizes =
    selectedVariant?.sizes ||
    product.sizes ||
    (product.category.toLowerCase() === "footwear"
      ? ["36", "37", "38", "39", "40"]
      : ["S", "M", "L", "XL"]);
  const hasSizes = availableSizes && availableSizes.length > 0;
  
  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="bg-white min-h-screen text-gray-800">
      <Navbar wishlist={wishlist} cart={cart} setIsCartOpen={setIsCartOpen} />

      {/* Main Container */}
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-6 lg:px-12 pb-16 pt-6 md:pt-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-14 items-start">
          
          {/* Product Gallery Section */}
          <div className="w-full lg:flex-1">
            
            {/* Mobile Gallery View */}
            <div className="lg:hidden relative w-full">
              <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full"
              >
                {galleryImages?.map((img, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 snap-center relative"
                  >
                    {isSoldOut && (
                      <div className="absolute top-4 left-4 bg-white/90 text-red-800 text-[10px] font-bold tracking-[0.2em] px-4 py-2 uppercase z-10 shadow-sm">
                        Sold Out
                      </div>
                    )}
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className={`w-full h-auto aspect-[3/4] object-cover bg-gray-50 ${isSoldOut ? "opacity-90" : ""}`}
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Pagination Dots */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                  {galleryImages.map((_, index) => (
                    <div
                      key={index}
                      className="w-1.5 h-1.5 rounded-full bg-black/40"
                    ></div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Gallery View */}
            <div className="hidden lg:flex w-full gap-6">
              {/* Image Thumbnails */}
              <div className="flex flex-col gap-4 w-[80px] shrink-0 sticky top-32">
                {galleryImages?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="thumb"
                    onClick={() => setSelectedImage(img)}
                    className={`w-full h-[110px] object-cover cursor-pointer border transition ${selectedImage === img ? "border-black" : "border-transparent opacity-60 hover:opacity-100"}`}
                  />
                ))}
              </div>

              {/* Main Image Preview */}
              <div className="flex-1 w-full relative">
                {isSoldOut && (
                  <div className="absolute top-4 left-4 bg-white/90 text-red-800 text-[10px] font-bold tracking-[0.2em] px-4 py-2 uppercase z-10 shadow-sm">
                    Sold Out
                  </div>
                )}
                <img
                  src={selectedImage}
                  alt={product.name}
                  className={`w-full h-auto object-cover transition-opacity duration-300 ${isSoldOut ? "opacity-90" : ""}`}
                />
              </div>
            </div>
          </div>

          {/* Product Information Section */}
          <div className="w-full lg:w-[420px] shrink-0 sticky top-32 mt-4 md:mt-0">
            <h1 className="text-3xl md:text-6xl font-light text-black mb-2 md:mb-6">
              {product.name}
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 mb-6 md:mb-4">
              Rp {product.price.toLocaleString("id-ID")}
            </p>

            {/* Product Ratings */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-6 md:mb-4">
                <div className="flex text-yellow-400 text-[14px] md:text-[16px] tracking-[0.1em]">
                  ★★★★★
                </div>
                <span
                  onClick={() => {
                    const reviewSection = document.getElementById("reviews");
                    if (reviewSection) {
                      reviewSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-xs md:text-sm text-gray-500 underline cursor-pointer hover:text-black transition"
                >
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>
            )}

            {/* Stock Urgency Indicator */}
            {product.stock > 0 && product.stock <= 3 && (
              <div className="flex items-center gap-2 text-red-600 mb-6 text-xs md:text-sm font-medium">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Only {product.stock} left in stock - order soon.
              </div>
            )}

            {/* Product Variants */}
            {hasVariants && (
              <div className="mb-6 md:mb-8">
                <p className="text-xs md:text-sm text-gray-700 mb-3">
                  Variants:{" "}
                  <span className="font-medium text-black uppercase">
                    {selectedVariant?.name}
                  </span>
                </p>
                <div className="flex gap-3">
                  {product.variants.map((variant, index) => {
                    const variantImage = variant.images?.[0] || product.image;
                    const isSelected = selectedVariant?.name === variant.name;

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedVariant(variant);
                          setSelectedImage(variantImage);
                          setSelectedSize(null);
                        }}
                        className={`w-[56px] h-[75px] md:w-[64px] md:h-[85px] p-[2px] transition-all duration-300 ${
                          isSelected
                            ? "border border-black"
                            : "border border-transparent opacity-60 hover:opacity-100 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={variantImage}
                          alt={variant.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {hasSizes && (
              <div className="mb-8">
                <div className="flex items-center gap-6 mb-3">
                  <p className="text-xs md:text-sm">
                    Size:{" "}
                    <span className="font-medium">
                      {selectedSize || "Select Size"}
                    </span>
                  </p>

                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[11px] md:text-xs text-gray-500 underline hover:text-black transition"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {availableSizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => !isSoldOut && setSelectedSize(size)}
                      disabled={isSoldOut}
                      className={`border px-3 md:px-4 h-10 md:h-12 min-w-[2.5rem] md:min-w-[3rem] flex items-center justify-center text-xs md:text-sm transition ${
                        isSoldOut
                          ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                          : selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Actions */}
            <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
              <button
                disabled={isSoldOut || (hasSizes && !selectedSize)}
                onClick={() => {
                  addToCart(product, selectedSize, selectedVariant?.name);
                  setIsCartOpen(true);
                }}
                className={`flex-1 py-3.5 md:py-4 tracking-widest text-xs md:text-sm transition ${
                  isSoldOut
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed font-bold"
                    : hasSizes && !selectedSize
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed font-bold"
                      : "bg-black text-white hover:bg-gray-800 font-bold"
                }`}
              >
                {isSoldOut ? "OUT OF STOCK" : "ADD TO CART"}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={isWishlisted ? "#dc2626" : "none"}
                  stroke={isWishlisted ? "#dc2626" : "black"}
                  strokeWidth="1.3"
                  className="w-5 h-5 md:w-6 md:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s-6.716-4.03-9-8.25C1.716 9.38 3.716 6 7.25 6c2.02 0 3.44 1.21 4.75 2.94C13.31 7.21 14.73 6 16.75 6 20.284 6 22.284 9.38 21 12.75 18.716 16.97 12 21 12 21z"
                  />
                </svg>
              </button>
            </div>

            {/* Product Details Accordion */}
            <div className="mt-8 md:mt-10 border-t border-gray-200">
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion("description")}
                  className="w-full flex justify-between items-center py-4 md:py-5 text-[11px] md:text-xs tracking-[0.2em] uppercase text-gray-800 hover:text-black transition"
                >
                  Description{" "}
                  <span className="text-lg">
                    {openAccordion === "description" ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === "description" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="pb-5 md:pb-6 text-[13px] md:text-sm text-gray-500 leading-relaxed md:leading-7">
                    {product.shortDescription ||
                      "Crafted with timeless elegance and premium quality fabric, designed to transition effortlessly from day to evening wear."}
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion("materials")}
                  className="w-full flex justify-between items-center py-4 md:py-5 text-[11px] md:text-xs tracking-[0.2em] uppercase text-gray-800 hover:text-black transition"
                >
                  Materials & Care{" "}
                  <span className="text-lg">
                    {openAccordion === "materials" ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === "materials" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="pb-5 md:pb-6 text-[13px] md:text-sm text-gray-500 space-y-2 leading-relaxed md:leading-7">
                    <p>
                      <span className="font-medium text-gray-700">
                        Material:
                      </span>{" "}
                      {product.materials || "Premium blended fabrics."}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Care:</span>{" "}
                      {product.care || "Dry clean only. Do not bleach."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mt-6 md:mt-8 space-y-2 md:space-y-3 text-xs md:text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-black">✓</span> Free shipping over Rp
                500.000
              </p>
              <p className="flex items-center gap-2">
                <span className="text-black">✓</span> 7 days easy return
              </p>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div
          id="reviews"
          className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-gray-200 max-w-3xl mx-auto"
        >
          <h3 className="text-lg md:text-xl font-light tracking-[0.15em] uppercase mb-8 md:mb-12 text-center">
            Reviews
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16">
            <div className="text-4xl md:text-5xl font-light text-black">
              {product.rating || "4.8"}
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-yellow-400 tracking-[0.2em] text-base md:text-lg mb-1">
                ★★★★★
              </div>
              <p className="text-xs md:text-sm text-gray-500 font-light">
                Based on {product.reviewsCount || 124} reviews
              </p>
            </div>
          </div>

          <div className="space-y-8 md:space-y-10">
            <div className="border-b border-gray-100 pb-6 md:pb-8">
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div>
                  <div className="flex text-yellow-400 text-[10px] md:text-xs tracking-widest mb-1 md:mb-2">
                    ★★★★★
                  </div>
                  <p className="text-xs md:text-sm font-medium text-black">
                    Beautiful and elegant!
                  </p>
                </div>
                <span className="text-[10px] md:text-xs text-gray-400">
                  2 days ago
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 font-light mb-3 md:mb-4 leading-relaxed">
                The material feels very premium and the fit is perfect. It looks
                exactly like the pictures. Definitely worth the price for such a
                timeless piece.
              </p>
              <p className="text-[10px] md:text-xs text-gray-400 italic">
                Jane D. - Verified Buyer
              </p>
            </div>

            <div className="border-b border-gray-100 pb-6 md:pb-8">
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div>
                  <div className="flex text-yellow-400 text-[10px] md:text-xs tracking-widest mb-1 md:mb-2">
                    ★★★★★
                  </div>
                  <p className="text-xs md:text-sm font-medium text-black">
                    In love with this!
                  </p>
                </div>
                <span className="text-[10px] md:text-xs text-gray-400">
                  1 week ago
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 font-light mb-3 md:mb-4 leading-relaxed">
                Wore this to a dinner party and got so many compliments. The
                silhouette is very flattering. Highly recommend adding this to
                your wardrobe!
              </p>
              <p className="text-[10px] md:text-xs text-gray-400 italic">
                Sarah M. - Verified Buyer
              </p>
            </div>
          </div>

          <div className="text-center mt-10 md:mt-12">
            <button className="inline-block border border-black px-10 py-3 md:px-12 md:py-4 text-[10px] md:text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300">
              Load More Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Brand Statement */}
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

      {/* Global Footer - Left-aligned layout mapping exactly to Home.jsx */}
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
                <li className="hover:text-black cursor-pointer">
                  <Link to="/category/dress" className="hover:text-black">Dress</Link>
                </li>
                <li className="hover:text-black cursor-pointer">
                  <Link to="/category/skirt" className="hover:text-black">Skirt</Link>
                </li>
                <li className="hover:text-black cursor-pointer">
                  <Link to="/category/blazer" className="hover:text-black">Blazer</Link>
                </li>
                <li className="hover:text-black cursor-pointer">
                  <Link to="/category/footwear" className="hover:text-black">Footwear</Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-6">
                Customer Care
              </h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-black cursor-pointer">Contact Us</li>
                <li className="hover:text-black cursor-pointer">Shipping & Returns</li>
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

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white w-full max-w-2xl p-6 md:p-12 relative shadow-2xl">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-black transition duration-300 outline-none"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-gray-900 mb-1 md:mb-2">
                Size Guide
              </h3>
              <p className="text-[10px] md:text-xs text-gray-500 font-light tracking-widest uppercase">
                Measurements in Centimeters (cm)
              </p>
            </div>

            <div className="overflow-x-auto">
              {product.category.toLowerCase() === "footwear" ? (
                <table className="w-full text-xs md:text-sm text-center border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-800 uppercase tracking-widest text-[9px] md:text-[10px]">
                      <th className="py-3 md:py-4 border-b border-gray-200 font-medium">
                        Size (EU)
                      </th>
                      <th className="py-3 md:py-4 border-b border-gray-200 font-medium">
                        US Size
                      </th>
                      <th className="py-3 md:py-4 border-b border-gray-200 font-medium">
                        Foot Length (cm)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 font-light">
                    {[
                      { eu: "36", us: "5.5", cm: "22.5 - 23.0" },
                      { eu: "37", us: "6.0", cm: "23.1 - 23.5" },
                      { eu: "38", us: "7.0", cm: "23.6 - 24.0" },
                      { eu: "39", us: "8.0", cm: "24.1 - 24.5" },
                      { eu: "40", us: "8.5", cm: "24.6 - 25.0" },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-3 md:py-4 font-medium text-black">
                          {row.eu}
                        </td>
                        <td className="py-3 md:py-4">{row.us}</td>
                        <td className="py-3 md:py-4">{row.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : product.category.toLowerCase() === "skirt" ? (
                <table className="w-full text-xs md:text-sm text-center border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-800 uppercase tracking-widest text-[9px] md:text-[10px]">
                      <th className="py-3 md:py-4 border-b border-gray-200 font-medium">
                        Size
                      </th>
                      <th className="py-3 md:py-4 border-b border-gray-200 font-medium">
                        Waist
                      </th>
                      <th className="py-3 md:py-4 border-b border-gray-200 font-medium">
                        Hip
                      </th>
                      <th className="py-3 md:py-4 border-b border-gray-200 font-medium">
                        Length
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 font-light">
                    {[
                      { size: "S", w: "66 - 70", h: "90 - 94", l: "85" },
                      { size: "M", w: "71 - 75", h: "95 - 99", l: "86" },
                      { size: "L", w: "76 - 80", h: "100 - 104", l: "87" },
                      { size: "XL", w: "81 - 85", h: "105 - 109", l: "88" },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-3 md:py-4 font-medium text-black">
                          {row.size}
                        </td>
                        <td className="py-3 md:py-4">{row.w}</td>
                        <td className="py-3 md:py-4">{row.h}</td>
                        <td className="py-3 md:py-4">{row.l}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-xs md:text-sm text-center border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-800 uppercase tracking-widest text-[9px] md:text-[10px]">
                      <th className="py-3 md:py-4 border-b border-gray-200 font-medium">
                        Size
                      </th>
                      <th className="py-3 md:py-4 border-b border-gray-200 font-medium">
                        Bust
                      </th>
                      <th className="py-3 md:py-4 border-b border-gray-200 font-medium">
                        Waist
                      </th>
                      <th className="py-3 md:py-4 border-b border-gray-200 font-medium">
                        Hip
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 font-light">
                    {[
                      { size: "S", b: "84 - 88", w: "66 - 70", h: "90 - 94" },
                      { size: "M", b: "89 - 93", w: "71 - 75", h: "95 - 99" },
                      { size: "L", b: "94 - 98", w: "76 - 80", h: "100 - 104" },
                      { size: "XL", b: "99 - 103", w: "81 - 85", h: "105 - 109" },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-3 md:py-4 font-medium text-black">
                          {row.size}
                        </td>
                        <td className="py-3 md:py-4">{row.b}</td>
                        <td className="py-3 md:py-4">{row.w}</td>
                        <td className="py-3 md:py-4">{row.h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="mt-6 md:mt-8 text-[10px] md:text-[11px] text-gray-400 font-light text-center leading-relaxed">
              Please note that these measurements are a general guide.{" "}
              <br className="hidden md:block" /> Fits may vary by style or
              personal preference.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;