// FeatureCard.jsx
export default function StepCard({ icon, title, description, step }) {
  return (
    <div
      className="bg-[#0A0F1E] rounded-xl p-5 flex items-start justify-between w-full max-w-lg shadow-md 
                 hover:shadow-lg hover:bg-[#0A2330] transition-all duration-300 group border-[1px] border-gray-800"
    >
      {/* Left Section: Icon + Text */}
      <div className="flex items-start gap-4">
        {/* Icon Box */}
        <div
          className="p-3 rounded-lg flex items-center justify-center bg-[#0D1628] 
                     transition-colors duration-300 group-hover:bg-[#064559]"
        >
          <span
            className={`${icon} text-2xl text-gray-400 transition-colors duration-300 group-hover:text-[#00D4FF]`}
          ></span>
        </div>

        {/* Title + Description */}
        <div>
          <h3
            className="text-white font-semibold text-lg transition-colors duration-300 group-hover:text-[#00BBD6]"
          >
            {title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
      </div>

      {/* Step Number */}
      <div
        className="bg-[#1B2236] w-8 h-8 flex items-center justify-center rounded-full text-gray-400 font-medium 
                   transition-colors duration-300 group-hover:bg-[#00D4FF] group-hover:text-black"
      >
        {step}
      </div>
    </div>
  );
}