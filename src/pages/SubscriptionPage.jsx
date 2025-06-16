import { useNavigate } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import { useAuth } from "../components/Context/AuthContext";
import { useEffect, useState } from "react";

const SubscriptionPlans = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user === null) {
      navigate("/Home", { replace: true });
    } else {
      fetchPlans();
    }
  }, [user, navigate]);

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/subscriptions");
      const data = await response.json();
      
      if (data.success) {
        setPlans(data.data);
      } else {
        setError("Failed to fetch subscription plans");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(price).replace("IDR", "Rp.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin">
        <Navbar />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <p>Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin">
        <Navbar />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e2a] text-white font-libre-franklin">
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Choose Your Plan</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {plans.map((plan, index) => (
            <div
              key={plan._id}
              className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">{plan.title}</h3>
                <p className="text-gray-400 mt-2 text-sm md:text-base">{plan.description}</p>
                <ul className="mt-4 space-y-2">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-300">+ {benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-gray-500 line-through text-sm">{formatPrice(plan.normalPrice)}</p>
                <p className="text-2xl font-bold">
                  {formatPrice(plan.discountedPrice)}{" "}
                  <span className="text-sm text-green-400">special</span>
                </p>

                <button
                  onClick={() => navigate(`/payment/${plan._id}`)}
                  className="mt-4 w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded"
                >
                  SELECT
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;