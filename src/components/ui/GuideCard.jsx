import React from 'react'

const GuideCard = ({ 
  title, 
  description, 
  timeComplexity, 
  spaceComplexity, 
  bestFor 
}) => {
  return (
    <div className="bg-[#0A1420] border border-gray-800 rounded-2xl p-6 text-white w-[585px] hover:bg-[#0F1B2E] transition-colors duration-300">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-3">{title}</h2>

      {/* Description */}
      <p className="text-gray-400 mb-4">{description}</p>

      {/* Details */}
      <ul className="text-sm text-gray-300 space-y-1 mb-6">
        <li>• <span className="font-semibold">Time Complexity:</span> {timeComplexity}</li>
        <li>• <span className="font-semibold">Space Complexity:</span> {spaceComplexity}</li>
        <li>• <span className="font-semibold">Best for:</span> {bestFor}</li>
      </ul>

      {/* Button */}
      <button className="flex items-center gap-2 bg-[#0A2330] hover:bg-[#3ED0FF] hover:text-black transition-colors px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer">
        <span className="bi bi-arrow-right"></span>
        Try {title} Visualizer
      </button>
    </div>
  );
};

export default GuideCard
