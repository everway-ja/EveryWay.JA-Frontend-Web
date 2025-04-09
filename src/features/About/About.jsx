import React from 'react';
import './About.css';

/**
 * AboutUs Component
 * 
 * A component displaying information about the team or organization.
 * Features a custom background color, image, and description.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {string} props.description - Company or team description text
 * @param {string} props.image - URL of the organization logo or image
 * @returns {JSX.Element} About section with organization information
 */
const AboutUs = ({ title, description, image }) => {
    return (
        <div style={{ backgroundColor: "#FFD167", borderRadius: "50px",
            paddingTop: "40px", paddingBottom: "100px",
            position: "relative", top: "-100px"}}>
            {/* Section title */}
            <h1 className="text-center text-4xl font-bold" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                {title}
            </h1>
            
            {/* Organization logo or image */}
            <div className="flex justify-center mb-8">
                <img src={image} alt={title} className="w-32 h-32 object-cover" />
            </div>
            
            {/* Organization description with custom font */}
            <p className="text-center text-lg pippo-baudo custom-font2">
                {description}
            </p>
        </div>
    );
};

export default AboutUs;
