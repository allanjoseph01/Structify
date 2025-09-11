import React from 'react'

const FeatureBox = ({ percentage, text }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#090E18] rounded-xl py-4 px-10 shadow-lg w-full max-w-sm mx-auto border-[1px] border-gray-800">
      <div className="text-xl sm:text-2xl font-bold mb-1 text-[#00D4FF] transform transition-transform duration-300 hover:scale-110 w-full text-center ">
        {percentage}
      </div>
      <div className="text-xs sm:text-xs font-medium text-gray-400 w-full text-center">
        {text}
      </div>
    </div>
  );
}

export default FeatureBox