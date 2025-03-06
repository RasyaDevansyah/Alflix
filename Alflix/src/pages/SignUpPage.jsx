import { FaUser, FaLock} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import InputField from "../components/InputField";
import AlflixLogo from "../components/AlflixLogo";
import SubmitButton from "../components/SubmitButton";
import { Link } from "react-router-dom";


function SignUpPage() {


    return (
        <div className="min-h-screen text-white flex">

            {/* Left Side */}
            <div className="w-1/2 bg-[#1e1e2a] flex justify-center items-center">
                {/* <h1 className="text-6xl font-bold">Welcome Back!</h1> */}
                <AlflixLogo type="1" className="w-1/2 h-auto"/>
            </div>

            {/* Right Side */}
            <div className="w-1/2 pl-40 pr-40 pt-20 bg-[#302e3b]">
                <h1 className="text-4xl font-bold text-center">SIGN UP</h1>

                <div className="flex justify-center">
                    <hr className="mt-2 mb-7 w-2/11" />
                </div>

                <form action="">
                    <InputField
                        type="text"
                        placeholder="Username"
                        icon={FaUser}
                        label="USERNAME"
                    />
                    <InputField
                        type="email"
                        placeholder="@gmail.com"
                        icon={IoMail}
                        label="E-MAIL ADDRESS"
                    />
                    <InputField
                        type="password"
                        placeholder="8-16 Characters"
                        label="PASSWORD"
                    />

                    <InputField
                        type="password"
                        placeholder="◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦"
                        icon={FaLock}
                        label="CONFIRM PASSWORD"
                    />

                    <div className="flex items-center mb-4 ml-9">
                        <input type="checkbox" className="mr-2" />
                        <p className="font-light italic">I agree to the terms & conditions</p>
                    </div>

                    <SubmitButton text="SIGN UP"/>
                </form>

                <div className="text-center">
                    <p>Already have an account? <Link to="/" className="text-[#8883bb]">Login</Link></p>
                </div>
            </div>
        </div>
    )


}

export default SignUpPage