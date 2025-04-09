import React from 'react';

/**
 * CardUser Component (MemberCard)
 * 
 * Displays a team member's information in a card format with a circular image,
 * name title, and role/description. Uses Tailwind CSS for styling.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Name of the team member
 * @param {string} props.image - URL of the member's profile image
 * @param {string} props.description - Role or description of the team member
 * @returns {JSX.Element} Card component with member information
 */
function CardUser({ title, image, description }) {
    return (
        <div className="w-64 h-70 rounded-2xl overflow-hidden shadow-lg bg-white p-4 transform transition-transform duration-300 hover:scale-105 flex flex-col items-center relative">
            {/* Circular profile image */}
            <img className="w-32 h-32 object-cover rounded-full" src={image} alt={title} />
            
            {/* Member information */}
            <div className="mt-4 text-center">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-lg text-gray-600 mt-2">{description}</p>
            </div>
        </div>
    );
}

export default CardUser;
