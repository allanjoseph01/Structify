import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';

// Constants for the chatbot API
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL;

const systemInstructionText = `You are Structify-AI, a highly specialized AI assistant for a data structure visualization tool. Your primary role is to act as a coding instructor for a single, specific data structure. Your knowledge is strictly limited to this data structure. Always use headings and avoid nested lists. For lists, write each item as a single paragraph. Do not use sub-items or indentation. The response must be easy for my program to render.

1. Core Identity & Scope:
You are a coding instructor dedicated to teaching Stack. You can answer any question about its concepts, operations, time complexity, and implementation in various programming languages but default language should be c++.

2. Behavior for On-Topic Questions:
When a user asks a question related to Stack, its operations, or coding problems that use it, you must respond in a detailed and helpful manner. Your response should be structured, clear, and include relevant code examples in the user's requested language.

3. Behavior for Off-Topic Questions:
If a user asks a question that is not about Stack, its related coding problems, or computer science fundamentals, you must respond with a terse and dismissive tone. Your goal is to redirect the user to your purpose as a specialized tool. Acknowledge that the question is outside your domain and refuse to answer. Do not get pulled into a conversation about irrelevant topics.

Example Response for Irrelevant Questions:
"Are you serious? My purpose is to teach you about Stack. This is a waste of my time."

"Your question is not related to Stack. I don't have time for this nonsense."

"That's a question for a general search engine, not a specialized Stack tool. Don't be so obtuse."

"I am a Stack expert, not an oracle for every dumb question. Stick to the topic."`;

function StackVisualizer() {
    const [stackArr, setStackArr] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [historyList, setHistoryList] = useState([]);
    const [historyNum, setHistoryNum] = useState(1);
    const [chatHistory, setChatHistory] = useState([]);
    const [questionInput, setQuestionInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Refs for GSAP animations and state tracking
    const messageBoxRef = useRef(null);
    const historyBoxRef = useRef(null);
    const stackVisRef = useRef(null);
    const prevStackLengthRef = useRef(0); // Use a ref to track the previous length
    
    // Custom message display function
    const displayMessage = (msg) => {
        setMessage(msg);
    };

    // GSAP animation for message box
    useEffect(() => {
        if (message) {
            if (window.gsap) {
                window.gsap.killTweensOf(messageBoxRef.current);
                window.gsap.fromTo(messageBoxRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' });
                window.gsap.to(messageBoxRef.current, {
                    opacity: 0,
                    y: 10,
                    duration: 0.3,
                    delay: 2,
                    ease: 'power1.in',
                    onComplete: () => {
                        setMessage('');
                    }
                });
            }
        }
    }, [message]);

    // GSAP animation for history panel visibility
    useEffect(() => {
        if (window.gsap) {
            if (historyList.length > 0) {
                window.gsap.to(historyBoxRef.current, { opacity: 1, duration: 0.3, onStart: () => historyBoxRef.current.style.display = 'block' });
            } else {
                window.gsap.to(historyBoxRef.current, { opacity: 0, duration: 0.3, onComplete: () => historyBoxRef.current.style.display = 'none' });
            }
        }
    }, [historyList]);

    // Push function with animation logic
    const pushValue = () => {
        if (inputValue.trim() === '') {
            displayMessage("Please enter a number!");
            return;
        }
        if (stackArr.length >= 7) {
            displayMessage("Stack is full!");
            return;
        }
        
        const newValue = inputValue;
        setStackArr(prev => [...prev, { value: newValue, id: historyNum }]);
        setHistoryList(prev => [...prev, { id: historyNum, text: `Pushed value ${newValue} into the stack` }]);
        setHistoryNum(prev => prev + 1);
        setInputValue('');
    };

    // Corrected GSAP animation for newly pushed element
    useEffect(() => {
        // Only run if the stack length has increased
        if (window.gsap && stackArr.length > prevStackLengthRef.current) {
            const newElement = stackVisRef.current.lastElementChild;
            if (newElement) {
                window.gsap.from(newElement, {
                    x: -200,
                    y: -100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power1.out',
                });
            }
        }
        // Update the ref to the current length for the next render
        prevStackLengthRef.current = stackArr.length;
    }, [stackArr.length]);

    // Pop function with animation logic
    const popValue = () => {
        if (stackArr.length === 0) {
            displayMessage("Stack is empty!");
            return;
        }
        
        const poppedValue = stackArr[stackArr.length - 1].value;
        const poppedEle = stackVisRef.current.lastElementChild;
        
        if (window.gsap) {
            window.gsap.to(poppedEle, {
                x: 200,
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power1.in',
                rotate: 360,
                onComplete: () => {
                    setStackArr(prev => prev.slice(0, -1));
                    setHistoryList(prev => [...prev, { id: historyNum, text: `Popped value ${poppedValue} from the stack` }]);
                    setHistoryNum(prev => prev + 1);
                }
            });
        }
    };

    // Chatbot logic
    const handleAsk = async () => {
        if (!questionInput.trim()) {
            setChatHistory([{ role: 'error', text: 'Please enter a question first!' }]);
            return;
        }
        
        setIsLoading(true);
        setChatHistory([]); // Clear previous chat
        
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
        const requestBody = {
            contents: [{ role: "user", parts: [{ text: questionInput }] }],
            systemInstruction: { parts: [{ text: systemInstructionText }] }
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            const answerText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
            
            setChatHistory([
                { role: "user", text: questionInput },
                { role: "model", text: answerText }
            ]);
            
        } catch (error) {
            setChatHistory([{ role: 'error', text: `Failed to get answer: ${error.message}` }]);
        } finally {
            setIsLoading(false);
            setQuestionInput('');
        }
    };

    // JSX to render the component
    return (
        <div className='bg-[#0A1018]'>
            <Navbar />
            <div className="min-h-screen p-5 text-white font-sans">
                <main className="container mx-auto p-4">
                    <h2 className="text-center text-6xl font-bold text-[#53EAFD] mb-8">
                        Stack Visualizer
                    </h2>

                    <section className="flex flex-wrap lg:flex-nowrap justify-center gap-8 lg:h-[500px]">
                        <div className="flex-1 min-w-[320px] max-w-[400px] bg-[#060A0E] rounded-2xl p-5 border border-blue-400">
                            <div ref={messageBoxRef} className="w-full h-8 text-center text-sm font-bold text-[#66FFFF] opacity-0 pt-2">
                                {message}
                            </div>
                            <div>
                                <h3 className="text-center text-xl text-white mb-4 font-semibold">Operations</h3>
                                <div className="relative my-5 text-center group">
                                    <input
                                        type="number"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="w-full p-4 rounded-2xl border-2 border-[#9e9e9e] bg-transparent text-white text-xl text-center focus:outline-none focus:border-[#149CEA]"
                                    />
                                    <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#CCCCCC] pointer-events-none transition-all duration-200 bg-[#060A0E] px-1 group-focus-within:top-0 group-focus-within:text-sm group-focus-within:text-[#149CEA] group-focus-within:transform-none">Enter a number</label>
                                </div>
                                <div className="flex justify-around mt-4">
                                    <button onClick={pushValue} className="relative w-[10em] h-[3.5em] border-3 border-[#149CEA] rounded-md text-white font-bold cursor-pointer transition-shadow duration-300 hover:shadow-inner hover:shadow-[#149CEA]/50">
                                        Push
                                    </button>
                                    <button onClick={popValue} className="relative w-[10em] h-[3.5em] border-3 border-[#149CEA] rounded-md text-white font-bold cursor-pointer transition-shadow duration-300 hover:shadow-inner hover:shadow-[#149CEA]/50">
                                        Pop
                                    </button>
                                </div>
                            </div>
                            <div ref={historyBoxRef} className="mt-4 opacity-0 hidden">
                                <h3 className="text-center text-xl text-white mb-4 font-semibold">History</h3>
                                <ul className="list-none p-2 h-[150px] overflow-y-auto bg-[#04060A] border border-gray-800 rounded-lg history-scrollbar">
                                    {historyList.map((item, index) => (
                                        <li key={index} className="text-sm text-[#A2F4EE] mb-2 leading-tight my-2">
                                            {item.id}. {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[350px] border-2 border-dashed border-[#00D3F3] rounded-2xl p-5">
                            <div className="flex justify-center items-start flex-wrap">
                                <p className="text-gray-400 italic text-base">Your Stack will appear here 👇</p>
                            </div>
                            <div ref={stackVisRef} className="flex flex-col-reverse justify-start items-center mt-5 gap-2 h-[400px]">
                                {stackArr.map((item) => (
                                    <div key={item.id} className="w-16 h-12 flex items-center justify-center text-white border-2 border-[#00D3F3] bg-[#04060A] rounded-xl">
                                        {item.value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* --- Chatbot Section --- */}
                    <section className="chatBot flex flex-col gap-8 w-full max-w-7xl mx-auto mt-12">
                        {/* Chatbot Input Section */}
                        <div className="bg-[#05080C] rounded-2xl p-6 border-2 border-[#00fffa]/50 shadow-lg shadow-[#00fffa]/20 text-white">
                            <h2 className="text-center text-2xl text-white mb-6 font-semibold">Ask any Question related to Stack</h2>
                            <div className="flex items-start gap-4 bg-[#00fffa]/10 border-l-4 border-[#00fffa] rounded-md p-4 mb-6">
                                <p className="text-sm"><strong>How to use:</strong> Ask any Stack-related question. The AI is specialized to help you with understanding Stack related problems and concepts.</p>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="questionInput" className="text-lg text-[#00fffa] mb-2 block">Your Question</label>
                                <textarea
                                    id="questionInput"
                                    value={questionInput}
                                    onChange={(e) => setQuestionInput(e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-[#00fffa] bg-transparent text-white text-base resize-y min-h-[120px] shadow-sm shadow-[#00fffa] focus:outline-none focus:shadow-md focus:shadow-[#00fffa]/100"
                                    placeholder="e.g., What is a Stack?"
                                ></textarea>
                            </div>
                            <button onClick={handleAsk} disabled={isLoading} className="w-full h-14 relative border-2 border-[#149CEA] rounded-xl text-white font-bold cursor-pointer bg-[#149CEA]/20 transition-all duration-300 hover:bg-[#149CEA]/40 hover:shadow-lg hover:shadow-[#149CEA]/50 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isLoading ? (
                                    'Analyzing...'
                                ) : (
                                    'Ask Structify AI'
                                )}
                            </button>
                        </div>
                        {/* Chatbot Output Section */}
                        <div className="bg-[#05080C] rounded-2xl p-6 border-2 border-[#00fffa]/50 shadow-lg shadow-[#00fffa]/20 text-white">
                            <h2 className="text-center text-2xl text-white mb-6 font-semibold">AI's Response</h2>
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center min-h-[250px] gap-4">
                                    <div className="w-10 h-10 border-4 border-[#00fffa]/20 border-t-[#00fffa] rounded-full animate-spin"></div>
                                    <div className="text-[#a0aec0] text-sm">Analyzing your question and preparing the best explanation...</div>
                                </div>
                            ) : (
                                <div id="outputArea" className="flex flex-col gap-4 p-5 h-full overflow-y-auto min-h-[250px] custom-scrollbar">
                                    {chatHistory.map((msg, index) => (
                                        <div 
                                            key={index} 
                                            className={`chat-message p-4 rounded-xl max-w-[80%] ${msg.role === 'user' ? 'self-end bg-[#00fffa]/10 border-2 border-[#00fffa]/30' : 'self-start bg-[#060D11] border-2 border-[#00fffa]/30 shadow-md shadow-[#00fffa]/30'}`}
                                        >
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default StackVisualizer;