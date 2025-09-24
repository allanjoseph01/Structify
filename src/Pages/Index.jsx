import React from 'react'
import Navbar from '../components/Navbar'
import PillButton from '../components/ui/PillButton'
import StepCard from '../components/ui/StepCard'
import FeatureBox from '../components/ui/FeatureBox'
import Footer from '../components/Footer'
import DataStructureCard from '../components/ui/DataStructureCard'
import ChatCard from '../components/ChatCard'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

const Index = () => {
  return (
    <div style={{backgroundColor:"#0A1018", minHeight:"100vh"}}>
      <Navbar />
      <div className='min-h-[500px] flex flex-col px-2 sm:px-4' id='first-page'>
        {/* Pill Button */}
        <div className='w-full flex justify-center mt-8 sm:mt-11'>
          <PillButton icon="bi bi-lightning-charge" text="Interactive Learning Platform" />
        </div>

        {/* Main Heading */}
        <div className='text-white w-full flex justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-6 text-center leading-tight'>
          Visualize Data Structures
        </div>

        {/* Sub Heading */}
        <div className='w-full flex justify-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#46CFFF] text-center mt-3 leading-tight'>
          Like Never Before
        </div>

        {/* Description */}
        <div className='w-full flex justify-center text-base sm:text-lg md:text-xl mt-8'>
          <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[65%] text-center text-[#94A3B8] px-2'>
            Visualize, understand, and master fundamental data structures with
            interactive animations, real code examples, and AI-powered assistance.
          </div>
        </div>

        {/* Buttons */}
        <div className='flex w-full justify-center gap-3 mt-8 flex-col sm:flex-row items-center'>
          {/* Start Visualizing Button */}
          <HashLink smooth to="/#DataStructure">
            <button className="bg-[#00D4FF] rounded-lg px-6 py-3 font-semibold cursor-pointer flex items-center gap-3 text-black transition-all duration-300 group hover:scale-105 w-full sm:w-auto">
              {/* Play Icon */}
              <span className="bi bi-play text-xl transform transition-transform duration-300 group-hover:scale-125"></span>

              {/* Text */}
              Start Visualizing

              {/* Arrow Icon */}
              <span className="bi bi-arrow-right text-xl transform transition-transform duration-300 group-hover:translate-x-2"></span>
            </button>
          </HashLink>

          {/* Learn More Button */}
          <Link to="/documentation">
            <button className="border border-gray-400 px-6 py-2 rounded-lg text-gray-200 text-lg flex items-center gap-2 hover:bg-[#3ED0FF] hover:text-black transition-all hover:border-blue-500 cursor-pointer font-semibold hover:scale-105 w-full sm:w-auto">
              <span className="bi bi-book text-xl"></span> Learn More
            </button>
          </Link>
        </div>
      </div>
      <div id="why-visualizing" className='min-h-[500px] flex flex-col'>
        <div className='w-full flex justify-center mt-7 sm:mt-11'>
          <PillButton icon="bi bi-play" text="Learn Through Visualization" />
        </div>
        <div className='text-white text-2xl sm:text-4xl font-bold w-full flex justify-center mt-6 text-center'>
          Why Visualization Works
        </div>
        <div className='w-full flex justify-center text-base sm:text-lg mt-4'>
          <div className='text-[#94A3B8] w-full sm:w-[53%] text-center px-2'>
            Transform abstract concepts into clear, interactive experiences that make learning data structures intuitive and engaging.
          </div>
        </div>
        {/* Restore laptop layout for large screens */}
        <div className='mt-5 flex flex-col lg:flex-row gap-10 lg:h-[350px] justify-center w-full items-center lg:items-stretch'>
          {/* Steps column */}
          <div className='flex flex-col gap-5 h-full w-full lg:w-auto lg:justify-center lg:items-center'>
            <StepCard icon="bi bi-eye" title="See It" description="Visual animations make complex algorithms crystal clear" step={1} />
            <StepCard icon="bi bi-lightbulb" title="Understand It" description="Interactive elements help you grasp the underlying logic" step={2} />
            <StepCard icon="bi bi-graph-up-arrow" title="Master It" description="Practice with real examples and AI guidance" step={3} />
          </div>
          {/* Features column */}
          <div className='h-full flex flex-col gap-10 lg:gap-20 w-full lg:w-auto lg:justify-center lg:items-center'>
            <div className='flex gap-4 sm:gap-10 flex-wrap justify-center lg:flex-nowrap'>
              <FeatureBox percentage="65%" text="Better Retention" />
              <FeatureBox percentage="3x" text="Faster Learning" />
              <FeatureBox percentage="∞" text="Practice" />
            </div>
            <div className='flex gap-4 sm:gap-10 flex-wrap justify-center lg:flex-nowrap'>
              <FeatureBox percentage="8+" text="Data Structures" />
              <FeatureBox percentage="AI" text="Powered Assistant" />
              <FeatureBox percentage="∞" text="Possibilities" />
            </div>
          </div>
        </div>
      </div>
      <div className='min-h-[500px] mt-20' id='ai'>
        <div className='w-full flex justify-center sm:mt-11'>
          <PillButton icon="bi bi-robot" text="AI-Powered Learning" />
        </div>
        <div className='text-white text-2xl sm:text-4xl font-bold w-full flex justify-center mt-6 text-center'>
          Meet Structify AI
        </div>
        <div className='w-full flex justify-center text-base sm:text-lg mt-4'>
          <div className='text-[#94A3B8] w-full sm:w-[60%] text-center px-2'>
            Each visualizer comes with a specialized AI assistant that understands the intricacies of that specific data structure. Get instant explanations, solve complex problems, and master concepts with personalized guidance.
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-8 my-12 mx-2 sm:mx-10 lg:mx-28 justify-center items-center'>
          <div className='w-full lg:w-[50%] flex flex-col gap-8 lg:gap-12'>
            <div className='flex flex-col gap-5'>
              <div className='text-white text-lg sm:text-xl font-semibold'><span className='bi bi-lightbulb text-[#00D4FF]'></span> Specialized Knowledge</div>
              <div className='text-[#94A3B8] text-base sm:text-lg'>Each AI assistant is trained specifically on one data structure, providing deep, contextual understanding and explanations.</div>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='text-white text-lg sm:text-xl font-semibold'><span className='bi bi-lightning-charge text-[#00D4FF]'></span> Instant Problem Solving</div>
              <div className='text-[#94A3B8] text-base sm:text-lg'>Stuck on a concept? Ask questions, get step-by-step solutions, and understand the "why" behind every operation.</div>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='text-white text-lg sm:text-xl font-semibold'><span className='bi bi-code text-[#00D4FF]'></span> Code Integration</div>
              <div className='text-[#94A3B8] text-base sm:text-lg'>Get code examples, optimization tips, and implementation guidance tailored to your programming language of choice.</div>
            </div>
          </div>
          <div className='bg-[#070E1D] w-full sm:w-[425px] h-[300px] sm:h-[415px] border-[1px] border-gray-800 rounded-xl flex items-center justify-center'>
            <ChatCard />
          </div>
        </div>
      </div>
      <div className='mt-24' id="DataStructure">
        <div className='text-white text-2xl sm:text-4xl font-bold w-full flex justify-center mt-6 text-center'>
          Choose Your Data Structure
        </div>
        <div className='w-full flex justify-center text-base sm:text-lg mt-4'>
          <div className='text-[#94A3B8] w-full sm:w-[53%] text-center px-2'>
            Select any data structure below to start visualizing operations and get help from specialized AI assistants.
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-8 sm:gap-10 mb-16">
          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full justify-center items-center">
            <DataStructureCard
              icon="bi bi-arrow-right"
              title="Singly Linked List"
              complexity="O(1) Insert/Delete (head), O(n) Search"
              description="Sequential nodes with pointers, efficient insertions and deletions at the head."
              dataStructure="Singly Linked List"
            />
            <DataStructureCard
              icon="bi bi-arrows"
              title="Doubly Linked List"
              complexity="O(1) Insert/Delete, O(n) Search"
              description="Nodes with both previous and next pointers for bi-directional traversal."
              dataStructure="Doubly Linked List"
            />
            <DataStructureCard
              icon="bi bi-stack"
              title="Stack"
              complexity="O(1) Push/Pop"
              description="Last-In-First-Out (LIFO) structure. Useful for recursion and expression evaluation."
              dataStructure="Stack"
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full justify-center items-center">
            <DataStructureCard
              icon="bi bi-collection"
              title="Queue"
              complexity="O(1) Enqueue/Dequeue"
              description="First-In-First-Out (FIFO) structure. Used in scheduling and buffering."
              dataStructure="Queue"
            />
            <DataStructureCard
              icon="bi bi-diagram-3"
              title="Binary Tree"
              complexity="O(n) Traversal"
              description="Hierarchical structure with parent-child relationships. Basis for many advanced trees."
              dataStructure="Binary Tree"
            />
            <DataStructureCard
              icon="bi bi-tree"
              title="Binary Search Tree"
              complexity="O(log n) Search/Insert/Delete (avg)"
              description="Ordered binary tree. Enables fast searching, but may degrade to O(n) if unbalanced."
              dataStructure="Binary Search Tree"
            />
          </div>

          {/* Row 3 */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full justify-center items-center">
            <DataStructureCard
              icon="bi bi-arrow-up-circle"
              title="Max Heap"
              complexity="O(log n) Insert/Delete"
              description="Complete binary tree where each parent is larger than its children. Used in priority queues."
              dataStructure="Max Heap"
            />
            <DataStructureCard
              icon="bi bi-arrow-down-circle"
              title="Min Heap"
              complexity="O(log n) Insert/Delete"
              description="Complete binary tree where each parent is smaller than its children. Useful for scheduling."
              dataStructure="Min Heap"
            />
            <DataStructureCard
              icon="bi bi-bezier"
              title="AVL Tree"
              complexity="O(log n) Search/Insert/Delete"
              description="Self-balancing binary search tree. Maintains height balance for efficient operations."
              dataStructure="AVL Tree"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Index
