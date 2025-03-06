

function SignInPage() {


    return (

        <div className="min-h-screen text-white flex">

            {/* Left Side */}
            <div className="w-1/2 bg-[#1e1e2a] flex justify-center items-center">
                <h1 className="text-6xl font-bold">Welcome Back!</h1>
            </div>

            {/* Right Side */}
            <div className="w-1/2 pl-35 pr-35 pt-20 bg-[#302e3b]">
                <h1 className="text-4xl font-bold text-center">SIGN IN</h1>

                <div className="flex justify-center">
                    <hr className="mt-2 mb-7 w-15" />
                </div>

                <form action="">
                    <p className="mb-1 text-4l font-bold">USERNAME</p>
                    <input
                        type="text"
                        placeholder="Username"
                        className="bg-[#dedcfa] text-gray-900 placeholder-gray-500 rounded-full px-6 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-50
                        mb-3
                        w-full
                        "
                    />

                    <p className="mb-1 text-4l font-bold">PASSWORD</p>
                    <input
                        type="password"
                        placeholder="Enter password..."
                        className="bg-[#dedcfa] text-gray-900 placeholder-gray-500 rounded-full px-6 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-50
                        mb-3
                        w-full
                        "
                    />

                    <div className="flex items-center mb-4 ml-9">
                        <input type="checkbox" className="mr-2" />
                        <p className="font-light">Remember Me</p>
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

                    <p className="m-4">OR</p>

                </div>



            </div>


        </div>


    )


}

export default SignInPage