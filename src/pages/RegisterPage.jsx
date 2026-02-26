import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // . Tambahkan useLocation
import Navbar from "../components/layout/Navbar";

function RegisterPage({ wishlist, cart, setIsCartOpen, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation(); // . Panggil useLocation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // . Tangkap pesan dari halaman Login. Kalau kosong, arahkan ke "/account"
  const fromPath = location.state?.returnTo || "/account";

  const handleRegister = (e) => {
    e.preventDefault();

    const user = { email, password, orders: [] };

    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    
    // . Lempar ke Checkout jika asalnya dari Checkout
    navigate(fromPath);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar wishlist={wishlist} cart={cart} setIsCartOpen={setIsCartOpen} />

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">

          <div className="text-center mb-10">
            <h1 className="text-4xl tracking-wide mb-3">Sign Up</h1>
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              {/* . Oper pesan kembali ke Login kalau user iseng klik ini */}
              <Link to="/login" state={{ returnTo: fromPath }} className="underline hover:text-black">
                Login
              </Link>
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3.5 rounded-md"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3.5 rounded-md"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3.5 rounded-full"
            >
              Create Account
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default RegisterPage;