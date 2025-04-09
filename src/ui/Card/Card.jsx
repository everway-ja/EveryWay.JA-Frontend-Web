import React from 'react';
import { useContext } from 'react';
import { ProvaContext } from '../../contexts/ProvaContext';

/**
 * Card Component
 * 
 * A reusable card component that displays an image, title, and description.
 * Commonly used for displaying featured content, locations, or activities.
 * Uses Tailwind CSS for styling with hover effects.
 * 
 * Note: This component imports ProvaContext but doesn't currently use it.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.image - URL of the image to display
 * @param {string} props.description - Card description text
 * @returns {JSX.Element} Card component with image, title, and description
 */
function Card({title, image, description}) {
    return (
        <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-lg bg-white p-4 transform transition-transform duration-300 hover:scale-105 flex flex-col items-center">
            {/* Card image */}
            <img className="w-full h-48 object-cover rounded-xl" src={image} alt={title} />
            
            {/* Card content */}
            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
        </div>
    );
}

export default Card;
