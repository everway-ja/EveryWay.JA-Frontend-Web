import React from 'react';
import './AboutUs.css';

const AboutUs = ({ title, description, image }) => {
    return (
        <div style={{ backgroundColor: "#FFD167", borderRadius: "50px",
            paddingTop: "40px", paddingBottom: "100px",
            position: "relative", top: "-100px"}}>
            <h1 className="text-center text-4xl font-bold" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                {title}
            </h1>
            <div className="flex justify-center mb-8">
                <img src={image} alt={title} className="w-32 h-32 object-cover" />
            </div>
            <p className="text-center text-lg pippo-baudo custom-font2">
                {description}
            </p>
        </div>
    );
};

export default AboutUs;