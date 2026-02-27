// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CheckoutPage({ cart, checkoutAction, isLoggedIn, shippingCost, setShippingCost, setDiscountAmount }) {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserStr = localStorage.getItem("user");
      
      if (storedUserStr) {
        const storedUser = JSON.parse(storedUserStr);
        if (!email) setEmail(storedUser.email || ""); 
        
        const fullName = storedUser.name || storedUser.email.split('@')[0];
        if (!firstName) setFirstName(fullName.split(" ")[0]); 
        if (!lastName) setLastName(fullName.split(" ").slice(1).join(" ") || ""); 
        
        if (!address) setAddress("Jalan Binjai - Medan");
        if (!subDistrict) setSubDistrict("Kota Binjai");
        if (!city) setCity("Kota Binjai");
        if (!province) setProvince("Sumatera Utara");
        if (!postalCode) setPostalCode("20773");
        if (!phone) setPhone("081263332861");
      }
    }
  }, [isLoggedIn]); 

  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(""); 
  const [showShippingOptions, setShowShippingOptions] = useState(false); 
  const [submitAttempted, setSubmitAttempted] = useState(false); 
  const [shippingError, setShippingError] = useState(false); 

  const [discountInput, setDiscountInput] = useState("");
  const [appliedDiscountCode, setAppliedDiscountCode] = useState("");
  const [localDiscount, setLocalDiscount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState({ text: "", type: "" });
  
  // . INI STATE BARU: Untuk mengatur buka-tutup order summary di HP
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalAmount = Math.max(0, subtotal + shippingCost - localDiscount); 

  const shippingOptions = [
    { id: "jne-reg", name: "JNE Express - REG", time: "4 to 5 business days", price: 59000 },
    { id: "sap-reg", name: "SAP Express - UDRREG", time: "2 to 5 business days", price: 59000 },
    { id: "sap-ons", name: "SAP Express - UDRONS", time: "1 business day", price: 73000 },
    { id: "jne-jtr", name: "JNE Express - JTR", time: "6 to 7 business days", price: 160000 },
  ];

  const handleApplyDiscount = (e) => {
    e.preventDefault();
    const code = discountInput.trim().toUpperCase();
    
    if (code === "ELANORA20") {
      const discountValue = subtotal * 0.2; 
      setLocalDiscount(discountValue); 
      if(setDiscountAmount) setDiscountAmount(discountValue); 
      setAppliedDiscountCode(code);
      setDiscountMessage({ text: "Promo berhasil diterapkan! Anda berhemat 20%.", type: "success" });
    } else {
      setLocalDiscount(0);
      if(setDiscountAmount) setDiscountAmount(0);
      setAppliedDiscountCode("");
      setDiscountMessage({ text: "Kode promo tidak valid atau sudah kadaluarsa.", type: "error" });
    }
  };

  const handlePayNow = (e) => {
    e.preventDefault(); 
    setSubmitAttempted(true); 
    
    if (shippingCost === 0) {
      setShippingError(true);
      setShowShippingOptions(true);
      return;
    }

    const shippingInfo = {
      email,
      name: `${firstName} ${lastName}`.trim(),
      address,
      apartment,
      subDistrict,
      city,
      province,
      postalCode,
      phone
    };
    localStorage.setItem("tempShippingData", JSON.stringify(shippingInfo));
    
    navigate("/payment"); 
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 mb-6 tracking-widest uppercase text-sm">Keranjang Anda Kosong</p>
        <button onClick={() => navigate("/")} className="bg-black text-white px-8 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-gray-800 transition">
          Kembali Belanja
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#333333]">
      
      <header className="w-full bg-white border-b border-gray-200 px-6 py-6 lg:px-16 xl:px-24 flex justify-between items-center z-10">
        <Link to="/" className="text-2xl tracking-[0.15em] uppercase text-black font-normal">
          ÉLANORA
        </Link>
        <Link to="/cart" className="relative text-black hover:text-gray-500 transition flex items-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm">
            {cart.length}
          </span>
        </Link>
      </header>

      <div className="flex flex-col-reverse lg:flex-row flex-1">
        
        <div className="w-full lg:w-[55%] xl:w-[55%] bg-white px-6 py-8 lg:px-16 xl:px-24 border-r border-gray-200">
          
          <form onSubmit={handlePayNow} onInvalid={() => setSubmitAttempted(true)} className="space-y-10">
            
            <section>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-normal text-gray-900">Contact</h2>
                {!isLoggedIn && (
                  <Link to="/login" state={{ returnTo: "/checkout" }} className="text-sm text-blue-600 hover:underline">Log in</Link>
                )}
              </div>
              <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full border rounded p-3.5 text-sm focus:outline-none transition mb-3 ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`} />
              <div className="flex items-start gap-2">
                <input type="checkbox" id="offers" className="w-4 h-4 mt-1 accent-black rounded" />
                <label htmlFor="offers" className="text-sm text-gray-700 cursor-pointer">Sign up for order updates, exclusive offers and news on WhatsApp and/or Email</label>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-normal text-gray-900 mb-4">Delivery</h2>
              <div className="space-y-3.5">
                <select className="w-full border border-gray-300 rounded p-3.5 text-sm bg-white focus:outline-none focus:border-blue-500 transition appearance-none">
                  <option>Indonesia</option>
                </select>
                <div className="flex gap-3.5">
                  <input type="text" placeholder="First name (optional)" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`w-1/2 border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                  <input type="text" placeholder="Last name" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={`w-1/2 border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                </div>
                <input type="text" placeholder="Address" required value={address} onChange={(e) => setAddress(e.target.value)} className={`w-full border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" value={apartment} onChange={(e) => setApartment(e.target.value)} className={`w-full border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                <div className="flex gap-3.5">
                  <input type="text" placeholder="Sub-district (Kecamatan)" required value={subDistrict} onChange={(e) => setSubDistrict(e.target.value)} className={`w-1/2 border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                  <input type="text" placeholder="City / Regency (Kota/Kabupaten)" required value={city} onChange={(e) => setCity(e.target.value)} className={`w-1/2 border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                </div>
                <div className="flex gap-3.5">
                  <select required value={province} onChange={(e) => setProvince(e.target.value)} className={`w-1/2 border rounded p-3.5 text-sm bg-white focus:outline-none transition appearance-none ${province === "" ? 'text-gray-500' : 'text-gray-900'} ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`}>
                    <option value="" disabled>Province</option>
                    <option value="DKI Jakarta">DKI Jakarta</option>
                    <option value="Jawa Barat">Jawa Barat</option>
                    <option value="Sumatera Utara">Sumatera Utara</option>
                  </select>
                  <input type="text" placeholder="Postal code" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={`w-1/2 border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                </div>
                <input type="tel" placeholder="Phone" required value={phone} onChange={(e) => setPhone(e.target.value)} className={`w-full border rounded p-3.5 text-sm focus:outline-none transition mb-2 ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="save-info" className="w-4 h-4 accent-black rounded" />
                  <label htmlFor="save-info" className="text-sm text-gray-700 cursor-pointer">Save this information for next time</label>
                </div>
              </div>
            </section>

            <section>
              <div className="flex justify-between items-end mb-4">
                <h2 className={`text-xl font-normal ${shippingError ? 'text-red-500' : 'text-gray-900'}`}>Shipping method</h2>
                {shippingError && <span className="text-xs text-red-500 font-medium">Wajib dipilih</span>}
              </div>
              
              <div className={`border rounded-lg overflow-hidden bg-white transition-all duration-300 ${shippingError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}>
                <div className={`p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition ${showShippingOptions ? 'border-b border-gray-200 bg-gray-50' : ''}`} onClick={() => setShowShippingOptions(!showShippingOptions)}>
                  <span className={`text-sm ${selectedShipping ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {selectedShipping ? shippingOptions.find(opt => opt.id === selectedShipping)?.name : "Pilih metode pengiriman..."}
                  </span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${showShippingOptions ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {showShippingOptions && (
                  <div className="bg-[#fafafa] animate-fade-in">
                    {shippingOptions.map((option, index) => (
                      <label key={option.id} className={`flex items-start p-4 cursor-pointer transition ${index !== shippingOptions.length - 1 ? 'border-b border-gray-200' : ''} ${selectedShipping === option.id ? 'bg-white' : 'hover:bg-white/50'}`}>
                        <div className="flex items-center h-5 mt-0.5">
                          <input type="radio" name="shipping" value={option.id} checked={selectedShipping === option.id} onChange={() => { setSelectedShipping(option.id); setShippingCost(option.price); setShowShippingOptions(false); setShippingError(false); }} className="w-4 h-4 accent-black cursor-pointer" />
                        </div>
                        <div className="ml-3 flex-1 flex justify-between items-start">
                          <div>
                            <p className="text-[13px] font-medium text-gray-900">{option.name}</p>
                            <p className="text-[12px] text-gray-500 mt-0.5">{option.time}</p>
                          </div>
                          <span className="text-[13px] text-gray-900">Rp {option.price.toLocaleString("id-ID")}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-normal text-gray-900 mb-1">Payment</h2>
              <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>
              
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-white">
                  <span className="text-sm font-medium text-gray-800 tracking-wide">Payments via Midtrans</span>
                  <div className="flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" alt="BCA" className="h-3 w-auto opacity-80" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg" alt="Gopay" className="h-3 w-auto opacity-80" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 w-auto opacity-80" />
                  </div>
                </div>
                <div className="p-6 bg-[#fafafa] border-t border-gray-200 text-center">
                  <p className="text-[13px] text-gray-500 leading-relaxed max-w-[320px] mx-auto">
                    You will be redirected to Payments via Midtrans to complete your purchase securely.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-normal text-gray-900 mb-4">Billing address</h2>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className={`flex items-center p-4 border-b border-gray-200 cursor-pointer transition ${!useDifferentBilling ? 'bg-gray-50' : 'bg-white'}`} onClick={() => setUseDifferentBilling(false)}>
                  <input type="radio" name="billing" checked={!useDifferentBilling} readOnly className="w-4 h-4 accent-black mr-3" />
                  <label className="text-sm cursor-pointer w-full">Same as shipping address</label>
                </div>
                <div className={`flex items-center p-4 cursor-pointer transition ${useDifferentBilling ? 'bg-gray-50' : 'bg-white'}`} onClick={() => setUseDifferentBilling(true)}>
                  <input type="radio" name="billing" checked={useDifferentBilling} readOnly className="w-4 h-4 accent-black mr-3" />
                  <label className="text-sm cursor-pointer w-full">Use a different billing address</label>
                </div>

                {useDifferentBilling && (
                  <div className="p-6 bg-[#fafafa] border-t border-gray-200 space-y-3.5 animate-fade-in">
                    <select className="w-full border border-gray-300 rounded p-3.5 text-sm bg-white focus:outline-none focus:border-blue-500 transition appearance-none">
                      <option>Indonesia</option>
                    </select>
                    <div className="flex gap-3.5">
                      <input type="text" placeholder="First name (optional)" className={`w-1/2 border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                      <input type="text" placeholder="Last name" required className={`w-1/2 border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                    </div>
                    <input type="text" placeholder="Address" required className={`w-full border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                    <input type="text" placeholder="Apartment, suite, etc. (optional)" className={`w-full border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                    <div className="flex gap-3.5">
                      <input type="text" placeholder="City" required className={`w-1/2 border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                      <select required className={`w-1/2 border rounded p-3.5 text-sm bg-white focus:outline-none transition appearance-none ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`}>
                        <option value="">Province</option>
                        <option value="Jakarta">Jakarta</option>
                        <option value="Jawa Barat">Jawa Barat</option>
                      </select>
                    </div>
                    <div className="flex gap-3.5">
                      <input type="text" placeholder="Postal code" required className={`w-full border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                    </div>
                    <input type="tel" placeholder="Phone (optional)" className={`w-full border rounded p-3.5 text-sm focus:outline-none transition ${submitAttempted ? 'invalid:border-red-500 invalid:ring-1 invalid:ring-red-500 border-gray-300' : 'border-gray-300 focus:border-blue-500'}`} />
                  </div>
                )}
              </div>
            </section>

            <div className="pt-4">
              <button type="submit" onClick={() => setSubmitAttempted(true)} className="w-full bg-black text-white py-5 rounded text-sm font-medium hover:bg-gray-800 transition shadow-md">
                Pay now
              </button>
            </div>
          </form>

          <div className="mt-12 pt-6 border-t border-gray-200 text-xs text-blue-600 flex gap-4">
            <Link to="#">Refund policy</Link>
            <Link to="#">Shipping policy</Link>
            <Link to="#">Privacy policy</Link>
            <Link to="#">Terms of service</Link>
          </div>
        </div>

        <div className="w-full lg:w-[45%] xl:w-[45%] bg-[#fafafa] px-6 py-8 lg:px-12 xl:px-16 border-b lg:border-b-0 border-gray-200">
          <div className="hidden lg:block h-[32px]"></div>
          
          {/* . PERBAIKAN: Tombol Link diubah jadi Button Buka-Tutup (Accordion) */}
          <div className="flex justify-end items-center mb-6 lg:hidden">
            <button 
              type="button" 
              onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
              className="text-blue-600 text-sm flex items-center gap-2 focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {isOrderSummaryOpen ? "Hide order summary" : "Show order summary"}
              <span className="font-medium ml-1">Rp {totalAmount.toLocaleString("id-ID")}</span>
            </button>
          </div>

          {/* . PERBAIKAN: Seluruh daftar barang dan harga dibungkus agar bisa disembunyikan di HP */}
          <div className={`${isOrderSummaryOpen ? 'block' : 'hidden'} lg:block transition-all duration-300`}>
            <div className="space-y-4 mb-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 bg-white shrink-0 rounded-lg border border-gray-200 flex items-center justify-center overflow-visible">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                    <span className="absolute -top-2 -right-2 bg-gray-500/90 text-white text-[11px] font-medium w-[22px] h-[22px] rounded-full flex items-center justify-center z-10 shadow-sm">
                      {item.quantity}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.variant ? `${item.variant} / ` : ""}Size: {item.size || "OS"}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>

            <div className="py-6 border-y border-gray-200 mb-6">
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Discount code or gift card" 
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  disabled={appliedDiscountCode !== ""}
                  className={`flex-1 border rounded p-3.5 text-sm focus:outline-none transition ${appliedDiscountCode !== "" ? 'bg-gray-100 border-gray-200 text-gray-500' : 'border-gray-300 focus:border-blue-500'}`} 
                />
                <button 
                  type="button"
                  onClick={handleApplyDiscount}
                  disabled={!discountInput || appliedDiscountCode !== ""}
                  className={`font-medium px-6 rounded text-sm transition ${(!discountInput || appliedDiscountCode !== "") ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  {appliedDiscountCode !== "" ? "Applied" : "Apply"}
                </button>
              </div>
              {/* Teks Bantuan Kode Promo */}
              {!appliedDiscountCode && !discountMessage.text && (
                <p className="text-[10px] text-gray-400 mt-2 tracking-wide">
                  Use code <span className="font-semibold text-gray-800">ELANORA20</span> to get 20% off your order!
                </p>
              )}
              
              {discountMessage.text && (
                <p className={`text-xs mt-3 ${discountMessage.type === "success" ? "text-green-600 font-medium" : "text-red-500"}`}>
                  {discountMessage.text}
                </p>
              )}
            </div>

            <div className="space-y-3 text-sm text-gray-600 mb-6 border-b border-gray-200 pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              
              {localDiscount > 0 && (
                <div className="flex justify-between items-center text-green-600 animate-fade-in">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                    Discount ({appliedDiscountCode})
                  </span>
                  <span className="font-medium">-Rp {localDiscount.toLocaleString("id-ID")}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Shipping</span>
                {shippingCost === 0 ? (
                  <span className="text-gray-400 text-xs">Enter shipping address</span>
                ) : (
                  <span className="font-medium text-gray-900">Rp {shippingCost.toLocaleString("id-ID")}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-base text-gray-900 font-medium">Total</span>
              <div className="flex items-end gap-2">
                <span className="text-xs text-gray-500 mb-1">IDR</span>
                <span className="text-2xl font-medium text-gray-900">Rp {totalAmount.toLocaleString("id-ID")}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-right">Including taxes if applicable</p>
          </div>
          {/* 👆 Akhir dari pembungkus buka-tutup di HP */}

        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;