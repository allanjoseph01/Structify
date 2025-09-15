import React from 'react'
import Navbar from '../components/Navbar'
import PillButton from '../components/ui/PillButton'
import FeatureCard from '../components/ui/FeatureCard'
import Footer from '../components/Footer'

const Features = () => {
  return (
    <div style={{backgroundColor:"#0A1018" , height:"100%"}}>
      <Navbar />
      <div className='min-h-[500px] flex flex-col px-4' id='first-page'>
        {/* Pill Button */}
        <div className='w-full flex justify-center mt-8 sm:mt-20'>
          <PillButton icon="bi bi-lightning-charge" text="Revolutionary Learning Platform" />
        </div>


        {/* Sub Heading */}
        <div className='w-full flex justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#46CFFF] text-center mt-8'>
          Powerful Features
        </div>

        {/* Description */}
        <div className='w-full flex justify-center text-lg sm:text-xl md:text-2xl mt-8'>
          <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[75%] text-center text-[#94A3B8] px-2'>
            Discover the comprehensive set of tools and features that make Structify the most effective way to learn data structures and algorithms.
          </div>
        </div>

        {/* Buttons */}
        <div className='flex w-full justify-center gap-3 mt-8 flex-col sm:flex-row items-center'>
          {/* Start Visualizing Button */}
          <button className="bg-[#00D4FF] rounded-lg px-6 py-3 font-semibold cursor-pointer flex items-center gap-3 text-black transition-all duration-300 group hover:scale-105">
            {/* Play Icon */}
            <span className="bi bi-play text-xl transform transition-transform duration-300 group-hover:scale-125"></span>

            {/* Text */}
            Try Interactive Demo
          </button>

          {/* Learn More Button */}
          <button className="border border-gray-400 px-6 py-2 rounded-lg text-gray-200 text-lg flex items-center gap-2 hover:bg-[#3ED0FF] hover:text-black transition-all hover:border-blue-500 cursor-pointer font-semibold hover:scale-105">
            <span className="bi bi-search text-xl"></span> Explore All Features
          </button>
        </div>
      </div>
      <div>
        <div className='text-white text-4xl font-bold w-full text-center pt-8'>Everything You Need to Excel</div>
        <div className='text-gray-400 w-full flex justify-center mt-6'>
          <div className='w-[47%] text-center'>
            Our platform combines cutting-edge technology with proven educational methods to create the ultimate learning experience.
          </div>
        </div>
        <div className='flex flex-wrap gap-5 justify-center mt-12'>
          <FeatureCard
            icon="bi-eye"   // Bootstrap icon
            iconBg="#0EAED9"  // custom background
            title="Interactive Visualizations"
            description="Watch data structures come alive with real-time animations and step-by-step breakdowns."
            features={[
              "Real-time animations",
              "Step-by-step execution",
              "Multiple view modes"
            ]}
          />
          <FeatureCard
            icon="bi-robot"   // Bootstrap icon
            iconBg="#1BBF83"  // custom background
            title="AI-Powered Learning"
            description="Get personalized explanations and hints from Structify AI assistant."
            features={[
              "Smart explanations",
              "Adaptive learning",
              "Instant feedback"
            ]}
          />
          <FeatureCard
            icon="bi-person"   // Bootstrap icon
            iconBg="#F04379"  // custom background
            title="Collaborative Learning"
            description="Share your progress and learn together with the community."
            features={[
              "Progress sharing",
              "Community insights",
              "Peer learning"
            ]}
          />
          <FeatureCard
            icon="bi-book"   // Bootstrap icon
            iconBg="#F14D3B"  // custom background
            title="Comprehensive Documentation"
            description="Access detailed guides, examples, and best practices for every data structure."
            features={[
              "Complete guides",
              "Code examples",
              "Best practices"
            ]}
          />
          <FeatureCard
            icon="bi-code"   // Bootstrap icon
            iconBg="#DB4BB0"  // custom background
            title="Code Playground"
            description="Write, test, and visualize your algorithms with our integrated code editor"
            features={[
              "Syntax highlighting",
              "Auto-completion",
              "Error detection"
            ]}
          />
          <FeatureCard
            icon="bi-cpu"   // Bootstrap icon
            iconBg="#457CF5"  // custom background
            title="Performance Analysis"
            description="Understand time and space complexity with visual complexity meters."
            features={[
              "Big O analysis",
              "Performance metrics",
              "Comparison tools"
            ]}
          />
        </div>
      </div>
      <div className='mt-24 mb-24'>
        <div className='text-white text-4xl font-bold w-full text-center'>
          Why Choose Structify?
        </div>
        <div className='w-full flex justify-center mt-6'>
          <div className='w-[50%] text-center text-lg text-gray-500'>
            Join thousands of developers who have transformed their understanding of data structures and algorithms.
          </div>
        </div>
        <div className="flex w-full justify-center gap-6 px-10 mt-16">
          {/* Card 1 */}
          <div className="flex flex-col gap-4 text-center flex-1">
            <div className="w-full flex justify-center">
              <div className="bg-[#00D5FF] w-16 h-16 flex items-center justify-center rounded-2xl transform transition-transform duration-300 hover:scale-110">
                <span className="bi bi-bullseye text-white text-3xl"></span>
              </div>
            </div>
            <div className="text-white text-xl mt-2">
              Master Technical Interviews
            </div>
            <div className="text-gray-500 text-base w-full flex justify-center">
              <div className="w-[80%]">
                Build confidence with the most commonly asked data structure questions.
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col gap-4 text-center flex-1">
            <div className="w-full flex justify-center">
              <div className="bg-[#00D5FF] w-16 h-16 flex items-center justify-center rounded-2xl transform transition-transform duration-300 hover:scale-110">
                <span className="bi bi-check2-circle text-white text-3xl"></span>
              </div>
            </div>
            <div className="text-white text-xl mt-2">
              Understand Fundamentals
            </div>
            <div className="text-gray-500 text-base w-full flex justify-center">
              <div className="w-[80%]">
                Develop a deep understanding that goes beyond memorization.
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col gap-4 text-center flex-1">
            <div className="w-full flex justify-center">
              <div className="bg-[#00D5FF] w-16 h-16 flex items-center justify-center rounded-2xl transform transition-transform duration-300 hover:scale-110">
                <span className="bi bi-lightning-charge text-white text-3xl"></span>
              </div>
            </div>
            <div className="text-white text-xl mt-2">Learn Faster</div>
            <div className="text-gray-500 text-base w-full flex justify-center">
              <div className="w-[97%]">
                Visual learning accelerates comprehension and retention.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Features
