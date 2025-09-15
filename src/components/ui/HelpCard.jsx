import React from 'react'

const HelpCard = ({ icon, title, description, buttonText }) => {
  return (
    <div className="bg-[#040B1C] rounded-xl py-5 px-10 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition duration-300 border-[1px] border-gray-800">
      {/* Icon */}
      <div className="p-2 rounded-full flex items-center justify-center mb-2">
        <i className={`bi ${icon} text-[#00D4FF] text-3xl`}></i>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-[#00D4FF] mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4">{description}</p>

      {/* Button */}
      <button className="bg-[#020817] text-white font-medium px-5 py-2 rounded-lg hover:bg-[#00D4FF] hover:text-black transition cursor-pointer border-[1px] border-gray-800 w-full">
        {buttonText}
      </button>
    </div>
  )
}

export default HelpCard
