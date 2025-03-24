import React, { useState } from "react";
import Navbar from "../components/HomePage/Navbar"; 
import { FaUser, FaLock, FaSearch, FaCreditCard } from "react-icons/fa";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("credit");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    otp: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    console.log("Processing Payment:", formData);
  };

  return (
    <div className="min-h-screen bg-[#0c1022] text-white">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg bg-[#15172b] p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-1">Choose Your Method</h2>
          <p className="text-center text-gray-400 text-sm mb-4">Switch or cancel anytime.</p>

          <div className="flex justify-center border-b border-gray-600 mb-4">
            <button
              onClick={() => setSelectedMethod("credit")}
              className={`px-4 py-2 text-sm font-semibold ${
                selectedMethod === "credit" ? "border-b-2 border-purple-500 text-white" : "text-gray-400"
              }`}
            >
              Credit Card
            </button>
            <button
              onClick={() => setSelectedMethod("digital")}
              className={`px-4 py-2 text-sm font-semibold ${
                selectedMethod === "digital" ? "border-b-2 border-purple-500 text-white" : "text-gray-400"
              }`}
            >
              Digital Bank
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="text-gray-400 text-sm">USERNAME</label>
              <div className="flex items-center bg-[#1e2139] p-2 rounded-md">
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username" 
                  className="bg-transparent outline-none flex-1 px-2" 
                  required
                />
                <FaUser className="text-gray-400" />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-gray-400 text-sm">PASSWORD</label>
              <div className="flex items-center bg-[#1e2139] p-2 rounded-md">
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="●●●●●●●●" 
                  className="bg-transparent outline-none flex-1 px-2" 
                  required
                />
                <FaLock className="text-gray-400" />
              </div>
            </div>

            {selectedMethod === "credit" && (
              <>
                <div className="mb-3">
                  <label className="text-gray-400 text-sm">CARD NUMBER</label>
                  <div className="flex items-center bg-[#1e2139] p-2 rounded-md">
                    <input 
                      type="text" 
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="8 digit number" 
                      maxLength="8"
                      className="bg-transparent outline-none flex-1 px-2" 
                      required
                    />
                    <FaCreditCard className="text-gray-400" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-gray-400 text-sm">EXPIRATION DATE</label>
                    <input 
                      type="text" 
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleChange}
                      placeholder="MM/YY" 
                      maxLength="5"
                      className="w-full bg-[#1e2139] p-2 rounded-md outline-none" 
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-400 text-sm">SECURITY CODE</label>
                    <input 
                      type="password" 
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="CVV" 
                      maxLength="3"
                      className="w-full bg-[#1e2139] p-2 rounded-md outline-none" 
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mb-3 mt-3">
              <label className="text-gray-400 text-sm">OTP NUMBER</label>
              <div className="flex items-center bg-[#1e2139] p-2 rounded-md">
                <input 
                  type="text" 
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP" 
                  className="bg-transparent outline-none flex-1 px-2" 
                  required
                />
                <FaLock className="text-gray-400" />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input 
                type="checkbox" 
                id="terms" 
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-gray-400 text-sm">
                I Agree to the terms and conditions.
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold"
            >
              PAY
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-3">Need Help?</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
