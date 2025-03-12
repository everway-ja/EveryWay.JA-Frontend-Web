import React from 'react';

function CardUser({ title, image, description }) {
    return (
        <div className="w-64 h-70 rounded-2xl overflow-hidden shadow-lg bg-white p-4 transform transition-transform duration-300 hover:scale-105 flex flex-col items-center relative">
            <img className="w-32 h-32 object-cover rounded-full" src={image} alt={title} />
            <div className="mt-4 text-center">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-lg text-gray-600 mt-2">{description}</p>
            </div>
        </div>
    );
}

export default CardUser;