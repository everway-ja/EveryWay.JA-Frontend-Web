import React from 'react';

const ContactUs = ({ title, address, phone, email }) => {
    return (
        <div style={{ backgroundColor: "white", borderRadius: "50px",
            paddingTop: "40px", paddingBottom: "100px", position: "relative", top: "-25px" }}>
            <h1 className="text-center text-4xl font-bold" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                {title}
            </h1>

            <div className="text-center">
                <p className="text-lg text-gray-600 px-6 mb-4">
                    <strong>Indirizzo:</strong> {address}
                </p>
                <p className="text-lg text-gray-600 px-6 mb-4">
                    <strong>Telefono:</strong>
                    <a href={`tel:${phone}`} className=" hover:underline"> {phone}</a>
                </p>
                <p className="text-lg text-gray-600 px-6 mb-4">
                    <strong>Email:</strong>
                    <a href={`mailto:${email}`} className=" hover:underline"> {email}</a>
                </p>
            </div>
        </div>
    );
};

export default ContactUs;
