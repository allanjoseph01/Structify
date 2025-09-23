import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
  return (
    <div className='w-full bg-[#070D17] h-[200px] mt-8 flex flex-col gap-5'>
      <div className='w-full text-center text-xl pt-10'>
        <span className='bi bi-chevron-left text-[#00CDF6]'></span><span className='bi bi-chevron-right text-[#00CDF6]'></span>
        <span className='text-white font-bold'> Structify</span>
      </div>
      <div className='w-full text-center text-gray-500'>Making data structures accessible through interactive visualization and real code</div>
      <div className='flex justify-center gap-5'>
        <div>
          <Link to="/about" className='text-gray-500 hover:text-[#1181a9]'>About</Link>
        </div>
        <div>
          <HashLink smooth to="/#DataStructure" className="text-gray-500 hover:text-[#1181a9] transition-colors">
            Data Structures
          </HashLink>
        </div>
        <div>
          <HashLink smooth to="/#ai" className="text-gray-500 hover:text-[#1181a9] transition-colors">
            Structify AI
          </HashLink>
        </div>
        <div>
          <Link to="/contact" className='text-gray-500 hover:text-[#1181a9]'>Contact</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
