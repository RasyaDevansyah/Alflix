import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import { FaUser, FaLock, FaCreditCard } from "react-icons/fa";
import { useAuth } from "../components/Context/AuthContext";


const PaymentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subId } = useParams();

  useEffect(() => {
    if (user === null) {
      navigate("/Home", { replace: true });
    }
  }, [user, navigate]);


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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Make the API call to subscribe the user
      const response = await fetch(`/api/users/${user.id}/subscription`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subId: subId,
        }),
      });

      console.log(user.id)
      console.log(subId)
      console.log(response)


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment failed");
      }

      console.log("Subscription successful:", data);
      navigate("/payment-success");
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Something went wrong with the payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1022] text-white">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen px-4 py-10">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-[#15172b] p-6 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-1">Choose Your Method</h2>
          <p className="text-center text-gray-400 text-sm mb-4">Switch or cancel anytime.</p>

          <div className="flex justify-center border-b border-gray-600 mb-4">
            <button
              onClick={() => setSelectedMethod("credit")}
              className={`px-4 py-2 text-sm font-semibold ${selectedMethod === "credit" ? "border-b-2 border-purple-500 text-white" : "text-gray-400"
                }`}
            >
              Credit Card
            </button>
            <button
              onClick={() => setSelectedMethod("digital")}
              className={`px-4 py-2 text-sm font-semibold ${selectedMethod === "digital" ? "border-b-2 border-purple-500 text-white" : "text-gray-400"
                }`}
            >
              Digital Bank
            </button>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-500/20 text-red-300 text-sm rounded-md">
              {error}
            </div>
          )}

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

                <div className="flex flex-col sm:flex-row gap-3">
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

            <div className="flex items-start gap-2 mb-4">
              <input
                type="checkbox"
                id="terms"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-gray-400 text-sm leading-snug">
                I Agree to the terms and conditions.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "PAY"
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-3">Need Help?</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;