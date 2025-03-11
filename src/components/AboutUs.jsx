import React from 'react';

const AboutUs = ({ title, description, image }) => {
    return (
        <div style={{ backgroundColor: "#D0FFFF", borderBottomRightRadius: "50px",
            borderBottomLeftRadius: "50px", paddingTop: "40px", paddingBottom: "100px",
            position: "relative", top: "-50px"}}>
            <h1 className="text-center text-4xl font-bold" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                {title}
            </h1>
            <div className="flex justify-center mb-8">
                <img src={image} alt={title} className="rounded-full w-32 h-32 object-cover" />
            </div>
            <p className="text-center text-lg text-gray-600 px-6">
                {description}
            </p>
        </div>
    );
};

export default AboutUs;