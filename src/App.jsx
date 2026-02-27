import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// 1. IMPORT KOMPONEN & HALAMAN DARI FOLDER
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import WishlistPage from "./pages/Wishlist";
import AccountPage from "./pages/AccountPage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import Cart from "./components/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SuccessPage from "./pages/SuccessPage";

/* ================= KOMPONEN SCROLL TO TOP ================= */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ================= PROTECTED ROUTE ================= */
function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [orders, setOrders] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser).orders || [] : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const addToCart = (product, size = null, variantName = null) => {
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.size === size &&
        item.variant === variantName,
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const cartItem = {
        ...product,
        cartItemId: Date.now(),
        size: size,
        variant: variantName,
        quantity: 1,
      };
      setCart([...cart, cartItem]);
    }
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter((item) => item.cartItemId !== cartItemId));
  };

  // . FUNGSI CHECKOUT
  const checkout = () => {
    if (cart.length === 0) return;

    const fullDate = new Date().toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // . AMBIL DATA ALAMAT YANG DISIMPAN DARI CHECKOUT TADI
    const savedShippingData =
      JSON.parse(localStorage.getItem("tempShippingData")) || null;

    const newOrders = cart.map((item) => ({
      date: fullDate,
      product: item,
      size: item.size,
      shippingCost: shippingCost,
      discountAmount: discountAmount,
      shippingInfo: savedShippingData, // . MASUKKAN DATA ALAMAT KE RIWAYAT
    }));

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      storedUser.orders = [...(storedUser.orders || []), ...newOrders];
      localStorage.setItem("user", JSON.stringify(storedUser));
    }

    setOrders([...orders, ...newOrders]);
    const cartProductIds = cart.map((item) => item.id);
    setWishlist(wishlist.filter((w) => !cartProductIds.includes(w.id)));
    setCart([]);
    setIsCartOpen(false);
    setDiscountAmount(0);

    // Bersihkan memori sementara alamatnya
    localStorage.removeItem("tempShippingData");
  };

  return (
    <>
      <ScrollToTop />

      <Cart
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        checkout={checkout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              cart={cart}
              setIsCartOpen={setIsCartOpen}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              cart={cart}
              setIsCartOpen={setIsCartOpen}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <WishlistPage
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              cart={cart}
              setIsCartOpen={setIsCartOpen}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchPage
              wishlist={wishlist}
              cart={cart}
              setIsCartOpen={setIsCartOpen}
            />
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <CategoryPage
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              cart={cart}
              setIsCartOpen={setIsCartOpen}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              wishlist={wishlist}
              cart={cart}
              setIsCartOpen={setIsCartOpen}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              wishlist={wishlist}
              cart={cart}
              setIsCartOpen={setIsCartOpen}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ForgotPasswordPage
              wishlist={wishlist}
              cart={cart}
              setIsCartOpen={setIsCartOpen}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ResetPasswordPage
              wishlist={wishlist}
              cart={cart}
              setIsCartOpen={setIsCartOpen}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              checkoutAction={checkout}
              isLoggedIn={isLoggedIn}
              shippingCost={shippingCost}
              setShippingCost={setShippingCost}
              setDiscountAmount={setDiscountAmount}
            />
          }
        />
        <Route
          path="/payment"
          element={
            <PaymentPage
              cart={cart}
              checkoutAction={checkout}
              shippingCost={shippingCost}
              discountAmount={discountAmount}
            />
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AccountPage
                wishlist={wishlist}
                orders={orders}
                cart={cart}
                setIsCartOpen={setIsCartOpen}
                setIsLoggedIn={setIsLoggedIn}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <SuccessPage
              wishlist={wishlist}
              cart={cart}
              setIsCartOpen={setIsCartOpen}
              isLoggedIn={isLoggedIn}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
