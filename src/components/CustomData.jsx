import React from 'react';

const CustomData = ({ imageSrc, title, description }) => {
  return (
    <div className="bg-gray-900 text-white flex flex-col md:flex-row items-center p-6">
      <div className="md:w-1/2 flex justify-center md:justify-center">
        <img src={imageSrc} alt={title} className="h-48 w-48 rounded-lg shadow-lg" />
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6 text-center md:text-left">
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};

export default CustomData;
