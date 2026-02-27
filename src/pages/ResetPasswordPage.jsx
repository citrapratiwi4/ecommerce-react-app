import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function ResetPasswordPage({ wishlist, cart, setIsCartOpen }) {
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      storedUser.password = newPassword;
      localStorage.setItem("user", JSON.stringify(storedUser));
      setSuccess(true);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar wishlist={wishlist} cart={cart} setIsCartOpen={setIsCartOpen} />

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <h1 className="text-3xl mb-6 text-center">Create New Password</h1>

          <form onSubmit={handleChangePassword} className="space-y-6">
            <input
              type="password"
              placeholder="New password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border px-4 py-3 rounded-md"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm text-center animate-fadeIn">
            <h2 className="text-xl font-medium mb-3">Password Updated</h2>

            <p className="text-sm text-gray-500 mb-6">
              Your password has been successfully changed.
            </p>

            <button
              onClick={() => {
                setSuccess(false);
                navigate("/login");
              }}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition"
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPasswordPage;
