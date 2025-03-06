const SubmitButton = ({ text }) => {
    return (
        <div className="flex justify-center">
            <button
                type="submit"
                className="bg-[#6358d3] text-white px-10 py-2 text-xl hover:bg-[#4f46a8] transition duration-300 font-bold rounded-2xl m-4"
            >
                {text}
            </button>
        </div>
    );
};

export default SubmitButton;