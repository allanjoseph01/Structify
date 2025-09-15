import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div style={{backgroundColor:"#0A1018" , height:"100%"}}>
      <Navbar />
      <div className='mt-16'>
        <div className='text-white text-5xl font-bold text-center'>
          About the Creator
        </div>
        <div className='flex w-full justify-center mt-8'>
          <div className='text-xl text-gray-500 w-[50%] text-center'>
            Learn about the person behind Structify and the mission to make data structures accessible to everyone.
          </div>
        </div>
      </div>
      <div className='flex mt-16 justify-center gap-20'>
        <div>
          <img src="/images/Allan PWIOI photo.jpg" alt="" className='h-[324px] w-[263px] rounded-xl object-cover'/>
        </div>
        <div>
          <div className='text-white text-3xl font-bold'>
            Allan Santosh Joseph
          </div>
          <div className='text-[#00D4FF] text-xl font-semibold mt-4'>
            Full-Stack Developer & CS Student
          </div>
          <div className='w-[400px] text-gray-400 mt-4'>
            I'm Allan Santosh Joseph, a CS student and coding enthusiast. I built this Data Structure Visualizer to make learning data structures easier and more interactive. Instead of just reading code, you can now see how it works — step by step, visually. Perfect for beginners, interview prep, or anyone curious about how data structures actually function.
          </div>
          <div className='flex gap-5 mt-4'>
            <div className='bg-[#060C17] py-1 px-3 rounded-lg border-[1px] text-white hover:text-black border-gray-800 hover:bg-[#66CCFF]'>
              <a href="https://github.com/allanjoseph01" target='new'>
                <span className='bi bi-github font-semibold'> GitHub</span>
              </a>
            </div>
            <div className='bg-[#060C17] py-1 px-3 rounded-lg border-[1px] text-white hover:text-black border-gray-800 hover:bg-[#66CCFF]'>
              <a href="https://www.linkedin.com/in/allan-santosh-joseph/" target='new'>
                <span className='bi bi-linkedin font-semibold'> LinkedIn</span>
              </a>
            </div>
            <div className='bg-[#060C17] py-1 px-3 rounded-lg border-[1px] text-white hover:text-black border-gray-800 hover:bg-[#66CCFF]'>
              <a href="https://x.com/AllanJoseph30" target='new'>
                <span className='bi bi-twitter font-semibold'> Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-20 mt-16 justify-center px-44'>
        <div className='bg-[#050B17] border-[1px] border-gray-800 p-8 rounded-xl'>
          <div className='flex gap-3 items-center'>
            <div>
              <span className='bi bi-heart text-3xl text-[#00D4FF] font-bold'></span>
            </div>
            <div className='text-white text-2xl font-semibold'>
              The Mission
            </div>
          </div>
          <div className='text-gray-400 mt-3'>
            Data structures are the foundation of computer science, yet they're often taught in abstract ways that make them hard to grasp. Structify was born from the belief that visual learning and interactive exploration can make these concepts click for students and developers alike.
          </div>
        </div>
        <div className='bg-[#050B17] border-[1px] border-gray-800 p-8 rounded-xl'>
          <div className='flex gap-3 items-center'>
            <div>
              <span className='bi bi-rocket-takeoff text-3xl text-[#00D4FF] font-bold'></span>
            </div>
            <div className='text-white text-2xl font-semibold'>
              The Journey
            </div>
          </div>
          <div className='text-gray-400 mt-3'>
            Starting as a simple visualization tool for my own learning, Structify evolved into a comprehensive platform. Each data structure comes with its own specialized AI assistant, making personalized learning possible for thousands of users worldwide.
          </div>
        </div>
      </div>
      <div className='mt-16 flex justify-center pb-16'>
        <div className='bg-[#050B17] w-[72%] border-[1px] border-gray-800 rounded-lg'>
          <div className='text-white text-2xl font-bold mt-8 text-center'>
            Let's Connect!
          </div>
          <div className='flex justify-center mt-5'>
            <div className='text-gray-400 w-[75%] text-center'>
              Have questions about data structures? Want to contribute to Structify? Or just want to chat about technology and education? I'd love to hear from you!
            </div>
          </div>
          <div className='flex justify-center my-6'>
            <Link to="/contact">
              <button className='bg-[#00D4FF] px-10 py-1 rounded-lg cursor-pointer hover:bg-[#00bbe0]'>
                <span className='bi bi-heart text-lg font-semibold'> Get in Touch</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
