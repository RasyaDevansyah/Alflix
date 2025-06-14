import { useNavigate } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import { useAuth } from "../components/Context/AuthContext";
import { useEffect } from "react";

const SubscriptionPlans = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/Home", { replace: true });
    }
  }, [user, navigate]);


  const plans = [
    {
      title: "Family Premium",
      description:
        "Family video love language is much more. Enjoy 5–6 users movie nights together without worries.",
      features: ["No Ads", "Premium Feature Unlocked", "4 to 6 Users", "More Analytics"],
      oldPrice: "Rp. 109,000",
      newPrice: "Rp. 79,000",
      discount: "special",
    },
    {
      title: "Student Deal",
      description:
        "A great deal for students who love solo movie marathons! (or want background noise while they blast tasks).",
      features: ["No Ads", "Premium Feature Unlocked", "1 User", "More Analytics"],
      oldPrice: "Rp. 59,000",
      newPrice: "Rp. 19,000",
      discount: "special",
    },
    {
      title: "Couple’s Love",
      description:
        "Be more romantic and intimate together, enjoy movies & shows together in a happy life!",
      features: ["No Ads", "Premium Feature Unlocked", "2 Users", "More Analytics", "Valentine’s day specials"],
      oldPrice: "Rp. 89,000",
      newPrice: "Rp. 59,000",
      discount: "special",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin">
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-xl transition h-full flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold">{plan.title}</h3>
              <p className="text-gray-400 mt-2">{plan.description}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-300">+ {feature}</li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-gray-500 line-through">{plan.oldPrice}</p>
                <p className="text-2xl font-bold">
                  {plan.newPrice}{" "}
                  <span className="text-sm text-green-400">{plan.discount}</span>
                </p>
              </div>
              <button
                onClick={() => navigate("/payment")}
                className="mt-4 bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded"
              >
                SELECT
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
