import React from "react";

const FeatureCard = ({ icon, iconBg, title, description, features }) => {
  return (
    <div className="bg-[#060D1C] rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 max-w-sm border-[1px] border-gray-800">
      {/* Icon with background */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4`}
        style={{ backgroundColor: iconBg }}
      >
        <i className={`bi ${icon} text-white text-2xl`}></i>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4">{description}</p>

      {/* Feature list */}
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-gray-200 text-sm">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] mr-3"></span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;