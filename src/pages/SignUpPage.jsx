import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import InputField from "../components/SignInAndSignOut/InputField";
import SubmitButton from "../components/SignInAndSignOut/SubmitButton";
import AlflixLogo from "../components/AlflixLogo";
import { Link, useNavigate } from "react-router-dom";

function SignUpPage() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [termsAgreed, setTermsAgreed] = useState(false);

    const SignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm password");

        // Client-side validation
        if (!termsAgreed) {
            setError("You must agree to the terms & conditions");
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username, 
                    email, 
                    password, 
                    confirmPassword 
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            if (data.success) {
                navigate("/home");
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen text-white flex">
            {/* Left Side */}
            <div className="w-1/2 bg-[#1e1e2a] flex justify-center items-center">
                <AlflixLogo type="1" className="w-1/2 h-auto"/>
            </div>

            {/* Right Side */}
            <div className="w-1/2 pl-40 pr-40 pt-20 bg-[#302e3b]">
                <h1 className="text-4xl font-bold text-center">SIGN UP</h1>

                <div className="flex justify-center">
                    <hr className="mt-2 mb-7 w-2/11" />
                </div>

                <form onSubmit={SignUp}>
                    <InputField
                        name="username"
                        type="text"
                        placeholder="Username"
                        icon={FaUser}
                        label="USERNAME"
                        required
                    />
                    <InputField
                        name="email"
                        type="email"
                        placeholder="@gmail.com"
                        icon={IoMail}
                        label="E-MAIL ADDRESS"
                        required
                    />
                    <InputField
                        name="password"
                        type="password"
                        placeholder="8-16 Characters"
                        label="PASSWORD"
                        required
                    />
                    <InputField
                        name="confirm password"
                        type="password"
                        placeholder="◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦"
                        icon={FaLock}
                        label="CONFIRM PASSWORD"
                        required
                    />

                    <div className="flex items-center mb-4 ml-9">
                        <input 
                            type="checkbox" 
                            className="mr-2" 
                            checked={termsAgreed}
                            onChange={(e) => setTermsAgreed(e.target.checked)}
                        />
                        <p className="font-light italic">I agree to the terms & conditions</p>
                    </div>

                    <SubmitButton 
                        text={isLoading ? "CREATING ACCOUNT..." : "SIGN UP"} 
                        disabled={isLoading || !termsAgreed}
                    />
                </form>

                {error && (
                    <p className="text-red-500 text-sm text-center my-2">{error}</p>
                )}

                <div className="text-center">
                    <p>Already have an account? <Link to="/SignIn" className="text-[#8883bb]">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;