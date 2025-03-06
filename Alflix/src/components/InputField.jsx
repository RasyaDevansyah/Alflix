const InputField = ({ type, placeholder, icon: Icon, label }) => {
    return (
        <div>
            <p className="mb-1 text-4l font-bold">{label}</p>
            <div className="relative">
                <Icon
                    color="black"
                    className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500"
                />
                <input
                    type={type}
                    placeholder={placeholder}
                    className="bg-[#dedcfa] text-gray-900 placeholder-gray-500 rounded-full px-6 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-50 mb-5 w-full"
                />
            </div>
        </div>
    );
};

export default InputField;