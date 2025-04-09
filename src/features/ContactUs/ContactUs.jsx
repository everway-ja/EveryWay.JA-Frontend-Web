import React from 'react';

/**
 * ContactUs Component
 * 
 * A component displaying contact information with icons and a contact button.
 * Features a clean blue background and centered layout.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {string} props.address - Physical address to display
 * @param {string} props.phone - Phone number to display
 * @param {string} props.email - Email address to display
 * @returns {JSX.Element} Contact information section with icons and contact button
 */
const ContactUs = ({ title, address, phone, email }) => {
  return (
    <div className="bg-blue-100 py-12 px-4 rounded-t-3xl">
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <h2 className="text-center text-4xl font-bold mb-8">{title}</h2>
        
        <div className="flex flex-col items-center space-y-4">
          {/* Address with icon */}
          <div className="flex items-center space-x-2">
            <i className="fas fa-map-marker-alt text-blue-600"></i>
            <span>{address}</span>
          </div>
          
          {/* Phone with icon */}
          <div className="flex items-center space-x-2">
            <i className="fas fa-phone text-blue-600"></i>
            <span>{phone}</span>
          </div>
          
          {/* Email with icon */}
          <div className="flex items-center space-x-2">
            <i className="fas fa-envelope text-blue-600"></i>
            <span>{email}</span>
          </div>
          
          {/* Contact button */}
          <div className="mt-8">
            <a href="mailto:info@every-way.it" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
              Contattaci
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
