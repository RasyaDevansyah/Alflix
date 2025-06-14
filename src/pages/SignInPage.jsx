import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import InputField from "../components/SignInAndSignOut/InputField";
import SubmitButton from "../components/SignInAndSignOut/SubmitButton";
import AlflixLogo from "../components/AlflixLogo";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from '/src/assets/Google Logo.png';
import FacebookLogo from '/src/assets/FacebookLogo.png';
import MicrosoftLogo from '/src/assets/MicrosoftLogo.webp';

import { useAuth } from "../components/Context/AuthContext";


function SignInPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); // New state for checkbox
    const { user } = useAuth(); 
    
   useEffect(() => {
      if (user) {
        navigate("/", { replace: true });
    }
    }, [user, navigate]);
    
    
    
    const SignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const result = await login(email, password, rememberMe); 
            if (result.success) {
                navigate("/");
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen text-white flex">
            {/* Left Side */}
            <div className="w-1/2 bg-[#1e1e2a] flex justify-center items-center">
                <AlflixLogo type="1" className="w-1/2 h-auto" />
            </div>

            {/* Right Side */}
            <div className="w-1/2 pl-40 pr-40 pt-20 bg-[#302e3b]">
                <h1 className="text-4xl font-bold text-center">SIGN IN</h1>

                <div className="flex justify-center">
                    <hr className="mt-2 mb-7 w-2/11" />
                </div>

                <form action="" onSubmit={SignIn}>
                    <InputField
                        name="email"
                        type="text"
                        placeholder="Email"
                        icon={IoMail}
                        label="EMAIL"
                    />
                    <InputField
                        name="password"
                        type="password"
                        placeholder="Enter password..."
                        icon={FaLock}
                        label="PASSWORD"
                    />

                    <div className="flex items-center mb-4 ml-9">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <p className="font-light italic">Remember Me</p>
                    </div>

                    <SubmitButton text={isLoading ? "SIGNING IN..." : "SIGN IN"} disabled={isLoading} />
                </form>

                {error && (
                    <p className="text-red-500 text-sm text-center my-2">{error}</p>
                )}

                <div className="text-center">
                    <p>Don't have an account? <Link to="/SignUp" className="text-[#8883bb]">Register</Link></p>

                    <div className="flex items-center justify-center">
                        <hr className="w-3/10" />
                        <p className="m-5">OR</p>
                        <hr className="w-3/10" />
                    </div>

                    <div className="flex items center justify-center">
                        <img src={GoogleLogo} alt="Google Logo" className="w-1/7 h-auto mx-5" />
                        <img src={FacebookLogo} alt="Facebook Logo" className="w-1/7 h-auto mx-5" />
                        <img src={MicrosoftLogo} alt="Microsoft Logo" className="w-1/7 h-auto mx-5" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;