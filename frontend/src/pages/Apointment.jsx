import React from 'react';
import image from "../Assetss/BG.webp";

const AppointmentBanner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white px-10 py-20 rounded-3xl shadow-lg mt-10">
      <div className="max-w-xl text-center md:text-left mb-10 md:mb-0">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Book Your Ground
        </h1>
        <p className="text-xl text-gray-800 mb-6">
          Join 50+ Excellent Grounds for Sports and Fitness
        </p>
        <button className="bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium py-3 px-8 rounded-full shadow-md transition duration-300" onClick={() => window.location.href = '/register'}>
          CREATE ACCOUNT
        </button>
      </div>
      <div>
        <img
          src={image}
          alt="Ground booking"
          className="w-[400px] md:w-[450px] rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default AppointmentBanner;
