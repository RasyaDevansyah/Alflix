import React from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../components/HomePage/Navbar"; 

const SubscriptionPlans = () => {
  const navigate = useNavigate(); 

  const plans = [
    {
      title: "Family Premium",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      features: ["No Ads", "Premium Feature Unlocked", "4 to 6 Users", "More Analytics"],
      oldPrice: "$99.89",
      newPrice: "$59.89",
      discount: "25% off",
    },
    {
      title: "Student Deal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      features: ["No Ads", "Premium Feature Unlocked", "1 User", "More Analytics"],
      oldPrice: "$59.89",
      newPrice: "$39.89",
      discount: "33% off",
    },
    {
      title: "Couple’s Love",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      features: ["No Ads", "Premium Feature Unlocked", "2 Users", "More Analytics", "Valentine’s day specials"],
      oldPrice: "$79.89",
      newPrice: "$49.89",
      discount: "37% off",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      
      <Navbar />

      <h2 className="text-3xl font-semibold mt-10">Choose Your Plan</h2>
      <p className="text-gray-400 mt-2">Switch or cancel anytime.</p>

      <div className="mt-10 grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold">{plan.title}</h3>
            <p className="text-gray-400 mt-2">{plan.description}</p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-300">+ {feature}</li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-gray-500 line-through">{plan.oldPrice}</p>
              <p className="text-2xl font-bold">{plan.newPrice} <span className="text-sm text-green-400">{plan.discount}</span></p>
            </div>
            <button 
              className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-6 rounded-lg w-full"
              onClick={() => navigate("/payment")} 
            >
              SELECT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
