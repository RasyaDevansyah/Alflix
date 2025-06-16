import React from "react";
import Navbar from "../components/HomePage/Navbar";
import { Link } from "react-router-dom";

const PaymentSuccessPage = () => {

  

  return (
    <div className="min-h-screen bg-[#0c1022] text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 justify-center items-center px-4 py-10"> 
        <div className="text-center max-w-md">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Your Payment was <br /> 
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mb-6">
            Enjoy our services!
          </p>

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
