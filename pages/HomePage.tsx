
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-red-500 to-yellow-500 opacity-80 animate-[gradient-shift_10s_ease_infinite] [background-size:200%_200%]"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="relative z-10 text-center text-white p-8 rounded-xl bg-black bg-opacity-50 backdrop-blur-md shadow-2xl max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Bengaluru: The AI Capital of India
        </h1>
        <p className="text-lg md:text-xl mb-8 text-yellow-200">
          Explore the vibrant AI startup ecosystem of Karnataka's capital with our intelligent chatbot.
        </p>
        <Link
          to="/chat"
          className="inline-block px-10 py-4 text-lg font-bold text-gray-900 bg-yellow-400 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-white hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300 animate-pulse"
        >
          Start Exploring
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
