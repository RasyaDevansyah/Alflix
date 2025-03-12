import AlflixLogo1 from '/src/assets/Alflix Logo.png';
import AlflixLogo2 from '/src/assets/Alflix Logo 2.png';

const AlflixLogo = ({ type, className }) => {
    // Determine the image source based on the type prop
    const imageSrc = type === "2" ? AlflixLogo2 : AlflixLogo1;

    return (
        <img src={imageSrc} alt="Alflix Logo" className={className} />
    );
};

export default AlflixLogo;