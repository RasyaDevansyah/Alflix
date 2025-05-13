import React from "react";
import Navbar from "../components/HomePage/Navbar";
import { Link } from "react-router-dom";

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-[#0c1022] text-white">
      <Navbar />

      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Payment was <br /> Successful!</h1>
          <p className="text-gray-400 mb-6">enjoy our services!</p>
          
          <Link
            to="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
