import React from 'react'

const DataStructureCard = ({ icon, title, complexity, description, dataStructure }) => {
  return (
    <div className="group flex flex-col items-start bg-black/10 backdrop-blur-md rounded-2xl py-6 px-6 md:p-8 shadow-2xl w-full max-w-sm border-[1px] border-gray-800 transition-all duration-300 transform hover:scale-105 hover:bg-[#162229] hover:border-[#00cdd4]">
      {/* Icon and Complexity */}
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center justify-center py-2 px-4 rounded-xl bg-[#042133] group-hover:border-[1px] group-hover:border-gray-600">
          {typeof icon === 'string' ? (
            <i className={`${icon} text-[#00D4FF] text-xl font-bold`}></i>
          ) : (
            icon
          )}
        </div>
        <span className="text-xs font-medium text-gray-400 bg-gray-800 rounded-full px-3 py-1">
          {complexity}
        </span>
      </div>

      {/* Title and Description */}
      <h2 className="text-2xl font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-[#00D4FF]">{title}</h2>
      <p className="text-sm text-gray-400 mb-6">{description}</p>

      {/* Visualise Button */}
      <button className="w-full py-3 px-6 rounded-xl text-lg font-semibold text-white bg-[#020817] group-hover:bg-[#00cdd4] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0052F2] focus:ring-offset-2 focus:ring-offset-[#0E1420] group-hover:text-black cursor-pointer">
        Visualize {dataStructure}
      </button>
    </div>
  );
};

export default DataStructureCard
