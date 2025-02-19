import "./Link"
import './Title.css'
import Link from './Link'

// eslint-disable-next-line react/prop-types
const Title = ({ imageSrc, title }) => {
    return (
        <div className="title-cont">
            <div className="image">
                <div className="title-box">{title}</div>
                <img src={imageSrc} className="image-style"/>
            </div>
        </div>
    );
};

export default Title;