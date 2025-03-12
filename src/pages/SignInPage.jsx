import { FaUser, FaLock } from "react-icons/fa";
import InputField from "../components/InputField";
import AlflixLogo from "../components/AlflixLogo";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate} from "react-router-dom";


function SignInPage() {
    const navigate = useNavigate();

    const SignIn = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");
        
        console.log("Username:", username);
        console.log("Password:", password);
        
        navigate("/home")

    }

    return (
        <div className="min-h-screen text-white flex">
            {/* Left Side */}
            <div className="w-1/2 bg-[#1e1e2a] flex justify-center items-center">
                {/* <h1 className="text-6xl font-bold">Welcome Back!</h1> */}
                <AlflixLogo type="1" className="w-1/2 h-auto"/>

            </div>

            {/* Right Side */}
            <div className="w-1/2 pl-40 pr-40 pt-20 bg-[#302e3b]">
                <h1 className="text-4xl font-bold text-center">SIGN IN</h1>

                <div className="flex justify-center">
                    <hr className="mt-2 mb-7 w-2/11" />
                </div>

                <form action="" onSubmit={SignIn}>
                    <InputField
                        name = "username"
                        type="text"
                        placeholder="Username"
                        icon={FaUser}
                        label="USERNAME"
                    />
                    <InputField
                        name = "password"
                        type="password"
                        placeholder="Enter password..."
                        icon={FaLock}
                        label="PASSWORD"
                    />

                    <div className="flex items-center mb-4 ml-9">
                        <input type="checkbox" className="mr-2" />
                        <p className="font-light italic">Remember Me</p>
                    </div>

                    <SubmitButton text="SIGN IN"/>
                </form>

                <div className="text-center">

                    <p>Don't have an account? <Link to="/SignUp" className="text-[#8883bb]">Register</Link></p>
                    
                    <div className="flex items-center justify-center">
                        <hr className="w-3/10" />
                        <p className="m-5">OR</p>
                        <hr className="w-3/10" />
                    </div>

                    <div className="flex items center justify-center">
                        <img src="..\src\assets\Google Logo.png" alt="Google Logo" className="w-1/7 h-auto mx-5" />
                        <img src="..\src\assets\FacebookLogo.png" alt="Facebook Logo" className="w-1/7 h-auto mx-5" />
                        <img src="..\src\assets\MicrosoftLogo.webp" alt=" Microsoft Logo" className="w-1/7 h-auto mx-5" />
                    </div>
                </div>
            </div>
        </div>


    )


}

export default SignInPage