// if type 2 => "..\src\assets\Alflix Logo 2.png"
// if type 1 => "..\src\assets\Alflix Logo.png"

const AlflixLogo = ({ type, className }) => {
    // Determine the image source based on the type prop
    const imageSrc = type === "2" ? "../src/assets/Alflix Logo 2.png" : "../src/assets/Alflix Logo.png";

    return (
        <img src={imageSrc} alt="Alflix Logo" className={className} />
    );
};

export default AlflixLogo;