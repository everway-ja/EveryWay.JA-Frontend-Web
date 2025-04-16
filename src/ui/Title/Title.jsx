import "./Link";
import "./Title.css";

// eslint-disable-next-line react/prop-types
const Title = ({ imageSrc, title, logoSrc }) => {
    return (
        <div className="title-cont">
            <div className="image-wrapper">
                <img src={imageSrc} alt="Title background" className="image-style" />
                <div className="overlay">
                    <div className="title-box">
                        <span className="title-text">{title}</span>
                        <img src={logoSrc} alt="Logo" className="logo" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Title;
