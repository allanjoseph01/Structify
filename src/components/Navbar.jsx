import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-16 flex justify-between items-center px-6 border-b border-gray-800 sticky top-0 z-50 
  backdrop-blur-md bg-[#030A17]/70">
      {/* Logo */}
      <div id="Logo" className="font-bold text-white flex items-center text-xl gap-1">
        <div>
          <span className="bi bi-chevron-left text-[#45CFFF]"></span>
          <span className="bi bi-chevron-right text-[#45CFFF]"></span>
        </div>
        Structify
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#/features" className="text-gray-500 hover:text-[#45CFFF] transition-colors">
          Features
        </a>
        <a href="#structures" className="text-gray-500 hover:text-[#45CFFF] transition-colors">
          Data Structures
        </a>
        <a href="#ai" className="text-gray-500 hover:text-[#45CFFF] transition-colors">
          Structify AI
        </a>
      </div>

      {/* Documentation Button */}
      <div id="documentation" className="hidden md:block">
        <button className="border border-gray-400 px-4 py-2 rounded-lg text-gray-200 text-base flex items-center gap-2 hover:bg-[#3ED0FF] hover:text-black transition-colors hover:border-blue-500 cursor-pointer font-semibold">
          <span className="bi bi-book"></span> Documentation
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-400 text-2xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <span className="bi bi-x"></span> : <span className="bi bi-list"></span>}
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-16 left-0 w-full bg-[#030A17]/80 backdrop-blur-lg border-b border-gray-800 flex flex-col items-center space-y-4 overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        }`}
      >
        <a
          href="#/features"
          className="text-gray-500 hover:text-[#45CFFF] transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Features
        </a>
        <a
          href="#structures"
          className="text-gray-500 hover:text-[#45CFFF] transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Data Structures
        </a>
        <a
          href="#ai"
          className="text-gray-500 hover:text-[#45CFFF] transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Structify AI
        </a>
        <button className="border border-gray-400 px-4 py-2 rounded-lg text-gray-200 text-base flex items-center gap-2 hover:bg-[#3ED0FF] hover:text-black transition-colors hover:border-blue-500 cursor-pointer font-semibold">
          <span className="bi bi-book"></span> Documentation
        </button>
      </div>
    </nav>
  );
};

export default Navbar;