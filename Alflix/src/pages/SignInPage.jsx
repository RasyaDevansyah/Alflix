import { FaUser, FaLock } from "react-icons/fa";

function SignInPage() {


    return (

        <div className="min-h-screen text-white flex">

            {/* Left Side */}
            <div className="w-1/2 bg-[#1e1e2a] flex justify-center items-center">
                {/* <h1 className="text-6xl font-bold">Welcome Back!</h1> */}
                <img src="..\src\assets\Alflix Logo.png" className="w-1/2 h-auto" />

            </div>

            {/* Right Side */}
            <div className="w-1/2 pl-40 pr-40 pt-20 bg-[#302e3b]">
                <h1 className="text-4xl font-bold text-center">SIGN IN</h1>

                <div className="flex justify-center">
                    <hr className="mt-2 mb-7 w-2/11" />
                </div>

                <form action="">
                    <p className="mb-1 text-4l font-bold">USERNAME</p>
                    <div className="relative">
                        <FaUser color="black"
                            className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            className="bg-[#dedcfa] text-gray-900 placeholder-gray-500 rounded-full px-6 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-50
                        mb-5
                        w-full
                        "
                        />
                    </div>

                    <p className="mb-1 text-4l font-bold">PASSWORD</p>

                    <div className="relative">
                        <FaLock color="black" 
                        className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500"
                        
                        ></FaLock>

                        <input
                            type="password"
                            placeholder="Enter password..."
                            className="bg-[#dedcfa] text-gray-900 placeholder-gray-500 rounded-full px-6 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-50
                            mb-5
                            w-full
                            "
                        />
                    </div>

                    <div className="flex items-center mb-4 ml-9">
                        <input type="checkbox" className="mr-2" />
                        <p className="font-light italic">Remember Me</p>
                    </div>

                    <div className="flex justify-center">
                        <button type="submit"
                            className="bg-[#6358d3] text-white px-10 py-2 text-xl hover:bg-[#4f46a8] transition duration-300
                            font-bold
                            rounded-2xl
                            m-4
                            ">
                            SIGN UP
                        </button>
                    </div>
                </form>


                <div className="text-center">

                    <p>Don't have an account? <a className="text-[#8883bb]">Register</a></p>

                    <div className="flex items-center justify-center">
                        <hr className="w-3/10" />
                        <p className="m-5">OR</p>
                        <hr className="w-3/10" />
                    </div>

                    <div className="flex items center justify-center">
                        <img src="..\src\assets\Google Logo.png" alt="Google Logo" className="w-1/6 h-auto mx-5" />
                        <img src="..\src\assets\FacebookLogo.png" alt="Facebook Logo" className="w-1/6 h-auto mx-5" />
                        <img src="..\src\assets\MicrosoftLogo.webp" alt=" Microsoft Logo" className="w-1/6 h-auto mx-5" />
                    </div>

                </div>


            </div>


        </div>


    )


}

export default SignInPage