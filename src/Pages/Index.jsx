import React from 'react'
import Navbar from '../components/Navbar'
import PillButton from '../components/ui/PillButton'
import StepCard from '../components/ui/StepCard'
import FeatureBox from '../components/ui/FeatureBox'
import Footer from '../components/Footer'
import DataStructureCard from '../components/ui/DataStructureCard'
import ChatCard from '../components/ChatCard'

const Index = () => {
  return (
    <div style={{backgroundColor:"#0A1018" , height:"100%"}}>
      <Navbar />
      <div className='min-h-[500px] flex flex-col px-4' id='first-page'>
        {/* Pill Button */}
        <div className='w-full flex justify-center mt-8 sm:mt-11'>
          <PillButton icon="bi bi-lightning-charge" text="Interactive Learning Platform" />
        </div>

        {/* Main Heading */}
        <div className='text-white w-full flex justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-6 text-center'>
          Visualize Data Structures
        </div>

        {/* Sub Heading */}
        <div className='w-full flex justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#46CFFF] text-center mt-3'>
          Like Never Before
        </div>

        {/* Description */}
        <div className='w-full flex justify-center text-lg sm:text-xl md:text-2xl mt-8'>
          <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[65%] text-center text-[#94A3B8] px-2'>
            Visualize, understand, and master fundamental data structures with
            interactive animations, real code examples, and AI-powered assistance.
          </div>
        </div>

        {/* Buttons */}
        <div className='flex w-full justify-center gap-3 mt-8 flex-col sm:flex-row items-center'>
          {/* Start Visualizing Button */}
          <button className="bg-[#00D4FF] rounded-lg px-6 py-3 font-semibold cursor-pointer flex items-center gap-3 text-black transition-all duration-300 group hover:scale-105">
            {/* Play Icon */}
            <span className="bi bi-play text-xl transform transition-transform duration-300 group-hover:scale-125"></span>

            {/* Text */}
            Start Visualizing

            {/* Arrow Icon */}
            <span className="bi bi-arrow-right text-xl transform transition-transform duration-300 group-hover:translate-x-2"></span>
          </button>

          {/* Learn More Button */}
          <button className="border border-gray-400 px-6 py-2 rounded-lg text-gray-200 text-lg flex items-center gap-2 hover:bg-[#3ED0FF] hover:text-black transition-all hover:border-blue-500 cursor-pointer font-semibold hover:scale-105">
            <span className="bi bi-book text-xl"></span> Learn More
          </button>
        </div>
      </div>
      <div id="why-visualizing" className='min-h-[500px] flex flex-col'>
        <div className='w-full flex justify-center mt-7 sm:mt-11'>
          <PillButton icon="bi bi-play" text="Learn Through Visualization" />
        </div>
        <div className='text-white text-4xl font-bold w-full flex justify-center mt-6'>
          Why Visualization Works
        </div>
        <div className='w-full flex justify-center text-lg mt-4'>
          <div className='text-[#94A3B8] w-[53%] text-center'>
            Transform abstract concepts into clear, interactive experiences that make learning data structures intuitive and engaging.
          </div>
        </div>
        <div className='mt-5 flex gap-10 h-[350px] justify-center w-full'>
          <div className='flex flex-col gap-5 h-full' style={{justifyContent:"center"}}>
            <StepCard icon="bi bi-eye" title="See It" description="Visual animations make complex algorithms crystal clear" step={1} />
            <StepCard icon="bi bi-lightbulb" title="Understand It" description="Interactive elements help you grasp the underlying logic" step={2} />
            <StepCard icon="bi bi-graph-up-arrow" title="Master It" description="Practice with real examples and AI guidance" step={3} />
          </div>
          <div className='h-full flex flex-col gap-20' style={{justifyContent:"center"}}>
            <div className='flex gap-10'>
              <FeatureBox percentage="95%" text="Better Retention" />
              <FeatureBox percentage="3x" text="Faster Learning" />
              <FeatureBox percentage="∞" text="Practice" />
            </div>
            <div className='flex gap-10'>
              <FeatureBox percentage="8+" text="Data Structures" />
              <FeatureBox percentage="AI" text="Powered Assistant" />
              <FeatureBox percentage="∞" text="Possibilities" />
            </div>
          </div>
        </div>
      </div>
      <div className='min-h-[500px] mt-20'>
        <div className='w-full flex justify-center sm:mt-11'>
          <PillButton icon="bi bi-robot" text="AI-Powered Learning" />
        </div>
        <div className='text-white text-4xl font-bold w-full flex justify-center mt-6'>
          Meet Structify AI
        </div>
        <div className='w-full flex justify-center text-lg mt-4'>
          <div className='text-[#94A3B8] w-[60%] text-center'>
            Each visualizer comes with a specialized AI assistant that understands the intricacies of that specific data structure. Get instant explanations, solve complex problems, and master concepts with personalized guidance.
          </div>
        </div>
        <div className='flex gap-8 my-12 mx-28 justify-center'>
          <div className='w-[50%] flex flex-col gap-12'>
            <div className='flex flex-col gap-5'>
              <div className='text-white text-xl font-semibold'><span className='bi bi-lightbulb text-[#00D4FF]'></span> Specialized Knowledge</div>
              <div className='text-[#94A3B8]'>Each AI assistant is trained specifically on one data structure, providing deep, contextual understanding and explanations.</div>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='text-white text-xl font-semibold'><span className='bi bi-lightning-charge text-[#00D4FF]'></span> Instant Problem Solving</div>
              <div className='text-[#94A3B8]'>Stuck on a concept? Ask questions, get step-by-step solutions, and understand the "why" behind every operation.</div>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='text-white text-xl font-semibold'><span className='bi bi-code text-[#00D4FF]'></span> Code Integration</div>
              <div className='text-[#94A3B8]'>Get code examples, optimization tips, and implementation guidance tailored to your programming language of choice.</div>
            </div>
          </div>
          <div className='bg-[#070E1D] w-[425px] h-[415px] border-[1px] border-gray-800 rounded-xl'>
            <ChatCard />
          </div>
        </div>
      </div>
      <div className='mt-24'>
        <div className='text-white text-4xl font-bold w-full flex justify-center mt-6'>
          Choose Your Data Structure
        </div>
        <div className='w-full flex justify-center text-lg mt-4'>
          <div className='text-[#94A3B8] w-[53%] text-center'>
            Select any data structure below to start visualizing operations and get help from specialized AI assistants.
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-10 mb-16">
          {/* Row 1 */}
          <div className="flex gap-8 w-full justify-center">
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
          <div className="flex gap-8 w-full justify-center">
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
          <div className="flex gap-8 w-full justify-center">
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
