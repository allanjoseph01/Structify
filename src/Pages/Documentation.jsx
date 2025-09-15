import React from 'react'
import Navbar from '../components/Navbar'
import GuideCard from '../components/ui/GuideCard'
import HelpCard from '../components/ui/HelpCard'
import Footer from '../components/Footer';

const dataStructures = [
  {
    title: "Stack",
    description:
      "Last-In-First-Out (LIFO) structure. Useful in recursion, expression evaluation, and undo operations.",
    timeComplexity: "O(1) push/pop",
    spaceComplexity: "O(n)",
    bestFor: "Function calls, backtracking",
  },
  {
    title: "Queue",
    description:
      "First-In-First-Out (FIFO) structure. Elements are inserted at the rear and removed from the front.",
    timeComplexity: "O(1) enqueue/dequeue",
    spaceComplexity: "O(n)",
    bestFor: "Scheduling, buffering, order processing",
  },
  {
    title: "Singly Linked List",
    description:
      "Linear collection of nodes where each node points to the next. Allows dynamic memory allocation.",
    timeComplexity: "O(1) insert/delete at head, O(n) search",
    spaceComplexity: "O(n)",
    bestFor: "Dynamic memory usage, sequential access",
  },
  {
    title: "Doubly Linked List",
    description:
      "Nodes contain pointers to both previous and next nodes, allowing bidirectional traversal.",
    timeComplexity: "O(1) insert/delete with reference, O(n) search",
    spaceComplexity: "O(n)",
    bestFor: "Navigation, undo/redo, browser history",
  },
  {
    title: "Binary Tree",
    description:
      "Hierarchical structure where each node has at most two children (left and right).",
    timeComplexity: "O(n) traversal, O(n) search",
    spaceComplexity: "O(n)",
    bestFor: "Hierarchical data representation",
  },
  {
    title: "Binary Search Tree (BST)",
    description:
      "A binary tree where left child < parent < right child. Enables efficient ordered operations.",
    timeComplexity: "O(log n) average search/insert/delete, O(n) worst-case",
    spaceComplexity: "O(n)",
    bestFor: "Efficient search, dynamic datasets",
  },
  {
    title: "Min Heap",
    description:
      "A complete binary tree where the parent node is always smaller than its children.",
    timeComplexity: "O(1) get min, O(log n) insert/delete",
    spaceComplexity: "O(n)",
    bestFor: "Priority queues, shortest path algorithms",
  },
  {
    title: "Max Heap",
    description:
      "A complete binary tree where the parent node is always greater than its children.",
    timeComplexity: "O(1) get max, O(log n) insert/delete",
    spaceComplexity: "O(n)",
    bestFor: "Priority scheduling, heap sort",
  },
  {
    title: "AVL Tree",
    description:
      "A self-balancing binary search tree where height difference between subtrees is at most 1.",
    timeComplexity: "O(log n) search/insert/delete",
    spaceComplexity: "O(n)",
    bestFor: "Balanced dynamic datasets, guaranteed log-time operations",
  },
];

const Documentation = () => {
  return (
    <div style={{backgroundColor:"#0A1018" , height:"100%"}}>
      <Navbar />
      <div className='h-[225px] flex flex-col w-full justify-center text-center gap-5'>
        <div className='text-white text-5xl font-bold'>
          Structify Documentation
        </div>
        <div className='text-[#87A3B8] text-xl w-full flex justify-center'>
          <div className='w-[50%]'>
            Learn how to visualize data structures and leverage Structify AI for better understanding
          </div>
        </div>
      </div>
      <div>
        <div className='bg-[#040B1C] mx-5 rounded-lg border-[1px] border-gray-800 py-5 px-6'>
          <div className='flex gap-2'>
            <div>
              <span className='bi bi-play text-[#00BBE3] text-3xl'></span>
            </div>
            <div className='text-white text-2xl font-semibold'>
              Quick Start
            </div>
          </div>
          <div className='flex justify-center gap-24 mt-6 pb-3'>
            <div className='flex flex-col gap-3 text-center'>
              <div className='w-full flex justify-center'>
                <div className='bg-[#052233] p-3 rounded-4xl w-[17%] text-center'>
                  <span className='text-[#02D4FF]'>1</span>
                </div>
              </div>
              <div className='text-white text-lg'>
                Choose a Data Structure
              </div>
              <div className='text-gray-400 text-sm'>
                Select from stack, trees, linked lists, and more
              </div>
            </div>
            <div className='flex flex-col gap-3 text-center'>
              <div className='w-full flex justify-center'>
                <div className='bg-[#052233] p-3 rounded-4xl w-[17%] text-center'>
                  <span className='text-[#02D4FF]'>2</span>
                </div>
              </div>
              <div className='text-white text-lg'>
                Interactive Visualization
              </div>
              <div className='text-gray-400 text-sm'>
                Watch operations in real-time with animations
              </div>
            </div>
            <div className='flex flex-col gap-3 text-center'>
              <div className='w-full flex justify-center'>
                <div className='bg-[#052233] p-3 rounded-4xl w-[23%] text-center'>
                  <span className='text-[#02D4FF]'>3</span>
                </div>
              </div>
              <div className='text-white text-lg'>
                Ask Structify AI
              </div>
              <div className='text-gray-400 text-sm'>
                Get instant help and explanations
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-16'>
        <div className='flex gap-3 mx-6'>
          <div>
            <span className='bi bi-code text-[#00D4FF] text-4xl'></span>
          </div>
          <div className='text-white text-3xl font-bold'>
            Data Structure Guide
          </div>
        </div>
        <div className='flex gap-8 ml-7 my-8 flex-wrap'>
          {dataStructures.map((ds, index) => (
            <GuideCard
              key={index}
              title={ds.title}
              description={ds.description}
              timeComplexity={ds.timeComplexity}
              spaceComplexity={ds.spaceComplexity}
              bestFor={ds.bestFor}
            />
          ))}
        </div>
      </div>
      <div className='mt-16'>
        <div className='flex gap-3 mx-6'>
          <div>
            <span className='bi bi-robot text-[#00D4FF] text-4xl'></span>
          </div>
          <div className='text-white text-3xl font-bold'>
            Structify AI Assistant
          </div>
        </div>
        <div className='bg-[#040B1C] mx-5 rounded-lg border-[1px] border-gray-800 py-8 px-7 mt-8 flex flex-start gap-44'>
            <div className='flex flex-col gap-2 ml-3'>
              <div className='text-white text-xl font-semibold'>
                What can Structify AI help with?
              </div>
              <div>
                <ul>
                  <li className='mt-3'>
                    <span className='bi bi-lightning text-[#00D4FF] text-lg'></span> <span className='text-base text-gray-400'>Explain complex data structure operations</span>
                  </li>
                  <li className='mt-3'>
                    <span className='bi bi-lightning text-[#00D4FF] text-lg'></span> <span className='text-base text-gray-400'>Debug your algorithm implementations</span>
                  </li>
                  <li className='mt-3'>
                    <span className='bi bi-lightning text-[#00D4FF] text-lg'></span> <span className='text-base text-gray-400'>Suggest optimal data structures for problems</span>
                  </li>
                  <li className='mt-3'>
                    <span className='bi bi-lightning text-[#00D4FF] text-lg'></span> <span className='text-base text-gray-400'>Provide time and space complexity analysis</span>
                  </li>
                  <li className='mt-3'>
                    <span className='bi bi-lightning text-[#00D4FF] text-lg'></span> <span className='text-base text-gray-400'>Answer coding interview questions</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='flex flex-col gap-2 ml-3'>
              <div className='text-white text-xl font-semibold'>
                Example Questions
              </div>
              <div>
                <ul>
                  <li className='mt-4 bg-[#17202C] py-3 rounded-lg px-3 w-[600px]'>
                    <span className='text-gray-400'>"Why is my binary search not working?"</span>
                  </li>
                  <li className='mt-4 bg-[#17202C] py-3 rounded-lg px-3 w-[600px]'>
                    <span className='text-gray-400'>"What's the best data structure for frequent insertions?"</span>
                  </li>
                  <li className='mt-4 bg-[#17202C] py-3 rounded-lg px-3 w-[600px]'>
                    <span className='text-gray-400'>"Explain how hash collision resolution works"</span>
                  </li>
                </ul>
              </div>
            </div>
        </div>
      </div>
      <div className='mt-16 pb-3'>
        <div className='flex gap-3 mx-6'>
          <div>
            <span className='bi bi-book text-[#00D4FF] text-4xl'></span>
          </div>
          <div className='text-white text-3xl font-bold'>
            Need More Help?
          </div>
        </div>
        <div className='flex gap-[20px] mx-6 my-8'>
          <HelpCard icon="bi-robot" title="Ask Structify AI" description="Get instant answers to your data structure questions" buttonText="Start Chatting" />
          <HelpCard icon="bi-code" title="Practice Problems" description="Test your understanding with interactive challenges" buttonText="Coming Soon" />
          <HelpCard icon="bi-book" title="Video Tutorials" description="Watch step-by-step explanations of key concepts" buttonText="Coming Soon" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Documentation
