import React from "react";

const PillButton = ({ icon, text }) => {
  return (
    <button className="flex items-center gap-2 border border-cyan-500 text-cyan-400 px-4 py-1 rounded-full font-medium bg-[#041F2F] text-sm">
      <span className={`text-lg ${icon}`}></span>
      <span>{text}</span>
    </button>
  );
};

export default PillButton;