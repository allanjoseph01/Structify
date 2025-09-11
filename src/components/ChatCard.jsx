import React, { useState, useEffect } from "react";

const ChatCard = () => {
  const chats = [
    {
      id: 1,
      question: "What makes hash tables so fast?",
      tag: "Hash Table",
      answer:
        "Hash functions map keys to array indices directly, providing O(1) average access time. Good hash functions minimize collisions.",
    },
    {
      id: 2,
      question: "Why are binary search trees efficient?",
      tag: "Binary Tree",
      answer:
        "BSTs allow O(log n) average search, insert, and delete operations when balanced, making them efficient for ordered data.",
    },
    {
      id: 3,
      question: "What is the advantage of linked lists?",
      tag: "Linked List",
      answer:
        "Linked lists allow dynamic memory allocation and efficient insert/delete operations compared to arrays.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // First show the question
    setShowAnswer(false);

    // Show the answer after 1s
    const showTimer = setTimeout(() => setShowAnswer(true), 1000);

    // Hide the answer after 3s
    const hideTimer = setTimeout(() => setShowAnswer(false), 3000);

    // Switch question after 4s
    const nextTimer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % chats.length);
    }, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [current, chats.length]);

  return (
    <div className="h-full flex flex-col justify-between p-4 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="bg-[#042033] py-3 px-3 rounded-xl">
            <span className="bi bi-robot text-[#3ED0FF]"></span>
          </div>
          <div>
            <div className="text-lg font-semibold">Structify AI</div>
            <p className="text-[13px] text-gray-400">
              Specialized Data Structure Assistant
            </p>
          </div>
        </div>
        <span className="text-[#3ED0FF] text-sm flex items-center gap-1">
          <span className="bi bi-stars"></span> Live
        </span>
      </div>

      {/* Chat Content */}
      <div className="relative flex-1 my-4 overflow-hidden">
        {/* Question */}
        <div className="flex items-start gap-3">
          <div className="bg-[#1E293B] py-1 px-2 rounded-4xl">
            <span className="bi bi-chat-left text-white text-base"></span>
          </div>
          <div className="bg-[#16202D] p-3 rounded-lg mb-3 w-full">
            <p className="font-medium">{chats[current].question}</p>
            <span className="text-sm text-[#3ED0FF]">
              {chats[current].tag}
            </span>
          </div>
        </div>

        {/* Answer (fade/slide in & out) */}
        <div
          className={`flex items-start gap-3 transform transition-all duration-700 ${
            showAnswer
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="bg-[#072234] py-1 px-2 rounded-4xl">
            <span className="bi bi-cpu text-[#00D4FF] text-base"></span>
          </div>
          <div className="bg-[#0F2029] text-white p-3 rounded-lg flex-1 font-semibold">
            <p className="text-sm">{chats[current].answer}</p>
            <div className="block text-xs text-[#3ED0FF] mt-2">
              • Structify AI
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div>
        <button className="w-full bg-[#020817] hover:bg-[#3ED0FF] hover:text-black border border-gray-700 px-4 py-2 rounded-lg text-gray-200 font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer">
          <span className="bi bi-box-arrow-up-right"></span>
          Try Structify AI in Visualizers
        </button>
      </div>
    </div>
  );
};

export default ChatCard;