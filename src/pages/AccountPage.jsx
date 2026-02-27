import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function AccountPage({ wishlist, orders, cart, setIsCartOpen, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Loading...",
    email: "Loading...",
  });

  React.useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setProfileData({
        name: storedUser.name || storedUser.email.split("@")[0],
        email: storedUser.email,
      });
    }
  }, []);

  const toggleOrderDetails = (index) => {
    if (expandedOrder === index) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(index);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setIsEditing(false);
      }, 1000);
    } else {
      setIsEditing(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "/";
  };

  return (
    <div className="bg-white min-h-screen text-gray-800">
      <Navbar wishlist={wishlist} cart={cart} setIsCartOpen={setIsCartOpen} />

      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-12">
        {/* KIRI: Sidebar Navigasi Akun */}
        <div className="w-full md:w-64 shrink-0">
          <h2 className="text-2xl font-light tracking-[0.2em] uppercase mb-10">
            My Account
          </h2>
          <ul className="space-y-6 text-sm tracking-widest uppercase text-gray-500">
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`transition-colors hover:text-black ${activeTab === "orders" ? "text-black font-medium" : ""}`}
              >
                Order History
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`transition-colors hover:text-black ${activeTab === "profile" ? "text-black font-medium" : ""}`}
              >
                Profile Details
              </button>
            </li>
            <li className="pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>

        {/* KANAN: Konten Tab */}
        <div className="flex-1">
          {/* ================= TAB: RIWAYAT TRANSAKSI ================= */}
          {activeTab === "orders" && (
            <div>
              <h3 className="text-lg font-medium tracking-[0.15em] uppercase mb-6 border-b border-gray-200 pb-4">
                Order History
              </h3>

              {!orders || orders.length === 0 ? (
                <div className="py-12 text-center bg-gray-50 border border-gray-100">
                  <p className="text-sm text-gray-400 font-light tracking-wide mb-6">
                    You have no order history yet.
                  </p>
                  <Link
                    to="/"
                    className="border-b border-black text-[10px] tracking-[0.2em] uppercase pb-1 hover:text-gray-500 hover:border-gray-500 transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order, index) => {
                    const itemTotal =
                      order.product.price * (order.product.quantity || 1);
                    const shipping = order.shippingCost || 0;
                    const discount = order.discountAmount || 0;
                    const grandTotal = Math.max(
                      0,
                      itemTotal + shipping - discount,
                    );

                    return (
                      <div
                        key={index}
                        className="border border-gray-200 bg-white overflow-hidden transition-all duration-300"
                      >
                        <div className="p-4 md:p-6 flex flex-row gap-3 md:gap-6 items-stretch">
                          <div className="w-24 h-32 bg-gray-50 shrink-0 border border-gray-100">
                            <img
                              src={order.product.image}
                              alt={order.product.name}
                              className="w-full h-full object-cover mix-blend-multiply"
                            />
                          </div>
                          <div className="flex-1 text-left pt-1">
                            <p className="text-[10px] tracking-widest text-gray-400 mb-2 uppercase">
                              Order #{1000 + index} • {order.date || "Just now"}
                            </p>
                            <h4 className="text-base font-normal text-gray-900 mb-1">
                              {order.product.name}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2 font-light">
                              {order.product.variant
                                ? `${order.product.variant} | `
                                : ""}
                              Size: {order.size || "OS"} • Qty:{" "}
                              {order.product.quantity || 1}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              Rp {grandTotal.toLocaleString("id-ID")}
                            </p>
                          </div>
                          <div className="shrink-0 flex flex-col items-start md:items-end justify-between self-stretch mt-2 md:mt-0">
                            <span className="inline-block bg-green-50 text-green-700 border border-green-200 text-[10px] px-3 py-1 uppercase tracking-widest rounded-full font-medium mb-4 md:mb-0">
                              Completed
                            </span>

                            <button
                              onClick={() => toggleOrderDetails(index)}
                              className="flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase text-gray-500 hover:text-black transition group mt-auto"
                            >
                              <span>
                                {expandedOrder === index
                                  ? "Hide Details"
                                  : "View Details"}
                              </span>
                              <svg
                                className={`w-4 h-4 transition-transform duration-300 ${expandedOrder === index ? "rotate-180 text-black" : "group-hover:translate-y-0.5"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* --- BAGIAN BAWAH (RINCIAN LENGKAP - EXPANDABLE) --- */}
                        {expandedOrder === index && (
                          <div className="border-t border-gray-100 bg-[#fafafa] p-6 md:p-8 animate-fade-in text-left">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-sm text-gray-600">
                              {/* Kolom Kiri */}
                              <div>
                                <div className="mb-8">
                                  <h5 className="font-medium text-gray-900 mb-3 text-xs uppercase tracking-widest">
                                    Contact information
                                  </h5>
                                  <p className="font-light">
                                    {order.shippingInfo?.email ||
                                      profileData.email}
                                  </p>
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900 mb-3 text-xs uppercase tracking-widest">
                                    Shipping address
                                  </h5>
                                  <div className="font-light space-y-1">
                                    <p className="font-normal text-gray-800">
                                      {order.shippingInfo?.name ||
                                        profileData.name}
                                    </p>
                                    <p>
                                      {order.shippingInfo?.address ||
                                        "Jalan Binjai - Medan"}
                                      {order.shippingInfo?.apartment
                                        ? `, ${order.shippingInfo.apartment}`
                                        : ""}
                                    </p>
                                    <p>
                                      {order.shippingInfo
                                        ? `${order.shippingInfo.subDistrict}, ${order.shippingInfo.city}`
                                        : "Kabupaten Langkat"}
                                    </p>
                                    <p>
                                      {order.shippingInfo
                                        ? `${order.shippingInfo.province} ${order.shippingInfo.postalCode}`
                                        : "North Sumatra 20773"}
                                    </p>
                                    <p>Indonesia</p>
                                    <p className="pt-2">
                                      {order.shippingInfo?.phone ||
                                        "081263332861"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Kolom Kanan */}
                              <div>
                                <div className="mb-8">
                                  <h5 className="font-medium text-gray-900 mb-3 text-xs uppercase tracking-widest">
                                    Payment method
                                  </h5>
                                  <p className="font-light flex items-center gap-2">
                                    <svg
                                      className="w-6 h-6 text-gray-400"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                      />
                                    </svg>
                                    Midtrans - Virtual Account
                                  </p>

                                  <div className="font-light text-xs text-gray-500 space-y-1.5 bg-white p-3 border border-gray-100 rounded-md shadow-sm mt-3">
                                    <div className="flex justify-between w-full max-w-[220px]">
                                      <span>Product Subtotal:</span>
                                      <span>
                                        Rp {itemTotal.toLocaleString("id-ID")}
                                      </span>
                                    </div>
                                    <div className="flex justify-between w-full max-w-[220px]">
                                      <span>Shipping Cost:</span>
                                      <span>
                                        Rp {shipping.toLocaleString("id-ID")}
                                      </span>
                                    </div>

                                    {discount > 0 && (
                                      <div className="flex justify-between w-full max-w-[220px] text-green-600">
                                        <span>Discount:</span>
                                        <span className="font-medium">
                                          -Rp {discount.toLocaleString("id-ID")}
                                        </span>
                                      </div>
                                    )}

                                    <div className="flex justify-between w-full max-w-[220px] font-medium text-gray-900 pt-2 border-t border-gray-100 mt-1">
                                      <span>Total Amount:</span>
                                      <span>
                                        Rp {grandTotal.toLocaleString("id-ID")}{" "}
                                        IDR
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-8">
                                  <h5 className="font-medium text-gray-900 mb-3 text-xs uppercase tracking-widest">
                                    Billing address
                                  </h5>
                                  <p className="font-light italic text-gray-500">
                                    Same as shipping address
                                  </p>
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900 mb-3 text-xs uppercase tracking-widest">
                                    Shipping method
                                  </h5>
                                  <p className="font-light">
                                    JNE Express - REG (4 to 5 business days)
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB: PROFIL ================= */}
          {activeTab === "profile" && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-medium tracking-[0.15em] uppercase mb-6 border-b border-gray-200 pb-4">
                Profile Details
              </h3>

              <div className="space-y-6 max-w-md">
                {/* Form Full Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors duration-300 ${
                      isEditing
                        ? "border-blue-400 bg-white text-gray-900 shadow-sm"
                        : "border-gray-300 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>

                {/* Form Email Address */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors duration-300 ${
                      isEditing
                        ? "border-blue-400 bg-white text-gray-900 shadow-sm"
                        : "border-gray-300 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>

                {/* Tombol Aksi Edit/Save */}
                <div className="pt-2">
                  <button
                    onClick={handleEditToggle}
                    disabled={isSaving}
                    className={`w-40 flex items-center justify-center py-4 text-[10px] tracking-[0.2em] uppercase transition rounded-sm shadow-md ${
                      isEditing
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-black hover:bg-gray-800 text-white"
                    }`}
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : isEditing ? (
                      "Save Changes"
                    ) : (
                      "Edit Profile"
                    )}
                  </button>
                </div>

                {isEditing && !isSaving && (
                  <p className="text-xs text-gray-400 mt-2 italic">
                    * You can now edit your details. Click save when done.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
