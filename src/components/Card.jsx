import { useContext } from 'react';
import { ProvaContext } from '../stores/ProvaContext';
import React from 'react';

function Card({title, image, description}) {


    return (
        <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-lg bg-white p-4 transform transition-transform duration-300 hover:scale-105 flex flex-col items-center">
            <img className="w-full h-48 object-cover rounded-xl" src={image} alt={title} />
            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
        </div>
    );
}

export default Card;