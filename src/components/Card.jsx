import { useContext } from 'react';
import { ProvaContext } from '../stores/ProvaContext';
import React from 'react';

function Card({title, image, description}) {

    const { count, setCount } = useContext(ProvaContext);

    return (
        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-4 transform transition-transform duration-300 hover:scale-105">
            <img className="w-full h-48 object-cover rounded-xl" src={image} alt={title} />
            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
            <div>
                <h3 className='text font-bold text-gray-800' >Conteggio: {count}</h3>
                <button onClick={() => setCount((count +1))}>Incrementa</button>
            </div>
        </div>
    );
}

export default Card;