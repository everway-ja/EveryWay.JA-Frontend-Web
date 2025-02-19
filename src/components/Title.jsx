import "./Link"
import './Title.css'
import Link from './Link'

// eslint-disable-next-line react/prop-types
const Title = ({ imageSrc, title }) => {
    return (
        <>
            <svg width="0" height="0">
                <defs>
                    <clipPath id="rounded-clip" clipPathUnits="objectBoundingBox">
                        <path d="
                            M 0.37 0
                            Q 0.32 -0.00, 0.32 0.07
                            V 0.11
                            Q 0.32 0.17, 0.26 0.17
                            H 0.04
                            Q 0.00 0.17, 0.0 0.24
                            V 0.75
                            Q 0.00 0.80, 0.05 0.80
                            H 0.95
                            Q 1.0 0.80, 1.00 0.75
                            V 0.05
                            Q 1.00 0.00, 0.95 0.00
                            Z
                        " />
                    </clipPath>
                </defs>
            </svg>
            <div className="title-cont">
                <div className="image">
                    <div className="title-box">{title}</div>
                    <div style={{ clipPath: "url(#rounded-clip)" }}>
                        <img src={imageSrc} className="image-style"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Title;