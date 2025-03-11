import React from 'react';

const ContactUs = ({ title, address, phone, email }) => {
    return (
        <div style={{ backgroundColor: "#9DE1DD", borderRadius: "50px", paddingTop: "40px", paddingBottom: "100px", position: "relative", top: "-25px"}}>
            <h1 className="text-center text-4xl font-bold" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                {title}
            </h1>

            <div className="text-center">
                <p className="text-lg text-gray-600 px-6 mb-4">
                    <strong>Address:</strong> {address}
                </p>
                <p className="text-lg text-gray-600 px-6 mb-4">
                    <strong>Phone:</strong> {phone}
                </p>
                <p className="text-lg text-gray-600 px-6 mb-4">
                    <strong>Email:</strong> {email}
                </p>
            </div>
        </div>
    );
};

export default ContactUs;