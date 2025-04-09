import '../Link/Link'
import './Title.css'
import Link from '../Link/Link'

/**
 * Title Component
 * 
 * A custom title component that displays an image with a styled title overlay.
 * Uses SVG clip paths to create a unique shape around the image.
 * 
 * @param {Object} props - Component props
 * @param {string} props.imageSrc - URL of the image to display
 * @param {string} props.title - Text to display as the title
 * @returns {JSX.Element} Title component with image and text
 */
const Title = ({ imageSrc, title }) => {
    return (
        <>
            {/* SVG definitions for clip paths used in different screen sizes */}
            <svg width="0" height="0">
                <defs>
                    {/* Desktop clip path - applied to largest screen sizes */}
                    <clipPath id="rounded-clip" clipPathUnits="objectBoundingBox">
                        <path d="
                            M 0.33 0
                            Q 0.30 -0.0, 0.30 0.05
                            V 0.08
                            Q 0.30 0.14, 0.25 0.14
                            H 0.04
                            Q 0.00 0.14, 0.0 0.2
                            V 0.72
                            Q 0.00 0.80, 0.05 0.80
                            H 0.95
                            Q 1.0 0.80, 1.00 0.72
                            V 0.05
                            Q 1.00 0.00, 0.95 0.00
                            Z
                        " />
                    </clipPath>
                    
                    {/* Mid-size screens clip path */}
                    <clipPath id="rounded-clip2" clipPathUnits="objectBoundingBox">
                        <path d="
                            M 0.40 0
                            Q 0.36 -0.0, 0.36 0.06
                            V 0.08
                            Q 0.36 0.17, 0.31 0.17
                            H 0.05
                            Q 0.00 0.17, 0.0 0.25
                            V 0.82
                            Q 0.00 0.90, 0.05 0.90
                            H 0.95
                            Q 1.0 0.90, 1.00 0.82
                            V 0.05
                            Q 1.00 0.00, 0.95 0.00
                            Z
                        " />
                    </clipPath>
                    
                    {/* Small screens clip path */}
                    <clipPath id="rounded-clip3" clipPathUnits="objectBoundingBox">
                        <path d="
                            M 0.45 0
                            Q 0.41 -0.0, 0.41 0.06
                            V 0.12
                            Q 0.41 0.21, 0.33 0.21
                            H 0.04
                            Q 0.00 0.21, 0.0 0.27
                            V 0.82
                            Q 0.00 0.90, 0.05 0.90
                            H 0.95
                            Q 1.0 0.90, 1.00 0.82
                            V 0.05
                            Q 1.00 0.00, 0.95 0.00
                            Z
                        " />
                    </clipPath>
                    
                    {/* Mobile screens clip path */}
                    <clipPath id="rounded-clip4" clipPathUnits="objectBoundingBox">
                        <path d="
                            M 0.45 0
                            Q 0.41 -0.0, 0.41 0.06
                            V 0.12
                            Q 0.41 0.21, 0.33 0.21
                            H 0.04
                            Q 0.00 0.21, 0.0 0.27
                            V 0.82
                            Q 0.00 0.90, 0.05 0.90
                            H 0.95
                            Q 1.0 0.90, 1.00 0.82
                            V 0.05
                            Q 1.00 0.00, 0.95 0.00
                            Z
                        " />
                    </clipPath>
                </defs>
            </svg>
            
            {/* Main container for the title and image */}
            <div className="title-cont">
                <div className="image">
                    {/* Title text overlay */}
                    <div className="title-box">{title}</div>

                    {/* Image container with clip-path applied via CSS */}
                    <div>
                        <img src={imageSrc} className="image-style"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Title;
