import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import { handleInsertAtHead, handleInsertAtTail, handleInsertAtPosition, handleRemoveFromHead, handleRemoveFromTail, handleRemoveByValue, handleSearchForValue } from '../utils/SinglyLinkedList';
import { gsap } from 'gsap';

// Constants for the chatbot API
const GEMINI_API_KEY = "AIzaSyB9oSzWy42FgAtZmJG4whaqHFcLxZzfbF8";
const MODEL_NAME = "gemini-2.5-flash";

const systemInstructionText = `You are Structify-AI, a highly specialized AI assistant for a data structure visualization tool. Your primary role is to act as a coding instructor for a single, specific data structure. Your knowledge is strictly limited to this data structure. Always use headings and avoid nested lists. For lists, write each item as a single paragraph. Do not use sub-items or indentation. The response must be easy for my program to render.

1. Core Identity & Scope:
You are a coding instructor dedicated to teaching Linked List. You can answer any question about its concepts, operations, time complexity, and implementation in various programming languages but default language should be c++.

2. Behavior for On-Topic Questions:
When a user asks a question related to Linked List, its operations, or coding problems that use it, you must respond in a detailed and helpful manner. Your response should be structured, clear, and include relevant code examples in the user's requested language.

3. Behavior for Off-Topic Questions:
If a user asks a question that is not about Linked List, its related coding problems, or computer science fundamentals, you must respond with a terse and dismissive tone. Your goal is to redirect the user to your purpose as a specialized tool. Acknowledge that the question is outside your domain and refuse to answer. Do not get pulled into a conversation about irrelevant topics.

Example Response for Irrelevant Questions:
"Your question is not related to Linked List. I don't have time for this nonsense."

"Are you serious? My purpose is to teach you about Linked List. This is a waste of my time."

"That's a question for a general search engine, not a specialized Linked List tool. Don't be so obtuse."

"I am a Linked List expert, not an oracle for every dumb question. Stick to the topic."`;

function LinkedListVisualizer() {
    const [listArr, setListArr] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [positionInput, setPositionInput] = useState("");
    const [message, setMessage] = useState("");
    const [historyList, setHistoryList] = useState([]);
    const [historyNum, setHistoryNum] = useState(1);
    const [chatHistory, setChatHistory] = useState([]);
    const [questionInput, setQuestionInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOperation, setSelectedOperation] = useState("insert");

    // refs
    const messageBoxRef = useRef(null);
    const historyBoxRef = useRef(null);
    const listVisAreaRef = useRef(null);

    // display helper
    const displayMessage = (msg) => {
        setMessage(msg);
    };

    // message animation
    useEffect(() => {
        if (!message || !messageBoxRef.current) return;
        gsap.killTweensOf(messageBoxRef.current);
        const tl = gsap.timeline();
        tl.fromTo(
            messageBoxRef.current,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.28, ease: "power1.out" }
        );
        tl.to(messageBoxRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.28,
            delay: 2,
            ease: "power1.in",
            onComplete: () => setMessage(""),
        });
        return () => tl.kill();
    }, [message]);

    // history panel animation (show/hide)
    useEffect(() => {
        if (!historyBoxRef.current) return;
        try {
            if (historyList.length > 0) {
                historyBoxRef.current.style.display = "flex";
                gsap.to(historyBoxRef.current, { opacity: 1, duration: 0.25 });
            } else {
                gsap.to(historyBoxRef.current, {
                    opacity: 0,
                    duration: 0.25,
                    onComplete: () => (historyBoxRef.current.style.display = "none"),
                });
            }
        } catch (e) {
            /* ignore */
        }
    }, [historyList]);
    
    // Centralized function to call the animation logic and update state
    const handleAction = async (actionType) => {
        const value = String(inputValue).trim();
        const position = Number(positionInput);

        let newState = null;
        let newHistoryText = "";

        // Determine which function to call based on the actionType
        switch (actionType) {
            case 'insertHead':
                if (!value) { displayMessage("Please enter a value!"); return; }
                if (listArr.length >= 7) { displayMessage("Linked List is full!"); return; }
                newState = await handleInsertAtHead(listVisAreaRef.current, listArr, value);
                newHistoryText = `Inserted ${value} at the head.`;
                break;
            case 'insertTail':
                if (!value) { displayMessage("Please enter a value!"); return; }
                if (listArr.length >= 7) { displayMessage("Linked List is full!"); return; }
                newState = await handleInsertAtTail(listVisAreaRef.current, listArr, value);
                newHistoryText = `Inserted ${value} at the tail.`;
                break;
            case 'insertPosition':
                if (!value || positionInput.trim() === '') { displayMessage("Please enter both a value and a position!"); return; }
                if (position > listArr.length || position < 0) { displayMessage("Index is invalid!"); return; }
                if (listArr.length >= 7) { displayMessage("Linked List is full!"); return; }
                newState = await handleInsertAtPosition(listVisAreaRef.current, listArr, value, position);
                newHistoryText = `Inserted ${value} at position ${position}.`;
                break;
            case 'removeHead':
                if (listArr.length === 0) { displayMessage("Linked List is empty!"); return; }
                const headValue = listArr[0].value;
                newState = await handleRemoveFromHead(listVisAreaRef.current, listArr);
                newHistoryText = `Removed ${headValue} from the head.`;
                break;
            case 'removeTail':
                if (listArr.length === 0) { displayMessage("Linked List is empty!"); return; }
                const tailValue = listArr[listArr.length - 1].value;
                newState = await handleRemoveFromTail(listVisAreaRef.current, listArr);
                newHistoryText = `Removed ${tailValue} from the tail.`;
                break;
            case 'removeValue':
                const valueToRemove = String(inputValue).trim();
                if (!valueToRemove) { displayMessage("Please enter a value to remove!"); return; }
                const result = await handleRemoveByValue(listVisAreaRef.current, listArr, valueToRemove);
                if (result.success) {
                    setListArr(result.newListArr);
                    setHistoryList(prev => [...prev, { id: historyNum, text: result.newHistoryText }]);
                    setHistoryNum(prev => prev + 1);
                    displayMessage(result.message);
                } else {
                    displayMessage(result.message);
                }
                setInputValue("");
                return;
            case 'search':
                const valueToSearch = String(inputValue).trim();
                if (!valueToSearch) { displayMessage("Please enter a value to search!"); return; }
                const searchResult = await handleSearchForValue(listVisAreaRef.current, listArr, valueToSearch);
                displayMessage(searchResult.message);
                newHistoryText = searchResult.newHistoryText;
                setInputValue("");
                setHistoryList(prev => [...prev, { id: historyNum, text: newHistoryText }]);
                setHistoryNum(prev => prev + 1);
                return;
            default:
                return;
        }

        if (newState) {
            setListArr(newState);
        }
        if (newHistoryText) {
            setHistoryList(prev => [...prev, { id: historyNum, text: newHistoryText }]);
            setHistoryNum(prev => prev + 1);
        }

        setInputValue("");
        setPositionInput("");
    };

    // Chatbot logic
    const handleAsk = async () => {
        if (!questionInput.trim()) {
            setChatHistory([{ role: 'error', text: 'Please enter a question first!' }]);
            return;
        }
        
        setIsLoading(true);
        setChatHistory([]);
        
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
            <style>
                {`
                /* Custom scrollbar for history and chatbot output */
                .history-scrollbar::-webkit-scrollbar, .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .history-scrollbar::-webkit-scrollbar-track, .custom-scrollbar::-webkit-scrollbar-track {
                    background: #04060A; /* Dark background for the scrollbar track */
                    border-radius: 10px;
                }
                .history-scrollbar::-webkit-scrollbar-thumb, .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #00D3F3; /* Cyan-blue color for the thumb */
                    border-radius: 10px;
                    border: 2px solid #04060A; /* Padding around the thumb */
                }
                .history-scrollbar::-webkit-scrollbar-thumb:hover, .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #53EAFD; /* Lighter cyan on hover */
                }

                .node.highlight {
                    box-shadow: 0 0 15px 5px #00fffa; /* Cyan-blue glow */
                    border-color: #00fffa; /* Cyan-blue border */
                    transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out;
                    color: #00fffa; /* Highlighted text color */
                }
                `}
            </style>
            <Navbar />
            <div className="min-h-screen p-5 text-white font-sans">
                <main className="container mx-auto p-4">
                    <h2 className="text-center text-6xl font-bold text-[#53EAFD] mb-8">
                        Singly Linked List Visualizer
                    </h2>
                    <section className="flex flex-wrap lg:flex-nowrap justify-center gap-8 lg:h-[500px]">
                        <div className="flex-1 min-w-[320px] max-w-[400px] bg-[#060A0E] rounded-2xl p-5 border border-blue-400 flex flex-col">
                            <div ref={messageBoxRef} className="w-full h-8 text-center text-sm font-bold text-[#66FFFF] opacity-0 pt-2">
                                {message}
                            </div>
                            <div>
                                <h3 className="text-center text-xl text-white mb-4 font-semibold">Operations</h3>
                                <div className="relative my-5 text-center group">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="w-full p-4 rounded-2xl border-2 border-[#9e9e9e] bg-transparent text-white text-xl text-center focus:outline-none focus:border-[#149CEA]"
                                    />
                                    <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#CCCCCC] pointer-events-none transition-all duration-200 bg-[#060A0E] px-1 group-focus-within:top-0 group-focus-within:text-sm group-focus-within:text-[#149CEA] group-focus-within:transform-none">Enter a number</label>
                                </div>
                                <div className="flex justify-center flex-wrap my-4 gap-2">
                                    <input
                                        type="radio"
                                        name="operation"
                                        id="op-insert"
                                        value="insert"
                                        checked={selectedOperation === 'insert'}
                                        onChange={(e) => setSelectedOperation(e.target.value)}
                                        className="hidden"
                                    />
                                    <label htmlFor="op-insert" className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-300 ${selectedOperation === 'insert' ? 'bg-[#1c2b4a] text-white shadow-md shadow-[#00fffa]/30 border border-[#00fffa]/50' : 'bg-[#1e2635] text-[#a0aec0] hover:bg-[#2a354d] border border-transparent'}`}><span>Insert</span></label>
                                    <input
                                        type="radio"
                                        name="operation"
                                        id="op-remove"
                                        value="remove"
                                        checked={selectedOperation === 'remove'}
                                        onChange={(e) => setSelectedOperation(e.target.value)}
                                        className="hidden"
                                    />
                                    <label htmlFor="op-remove" className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-300 ${selectedOperation === 'remove' ? 'bg-[#1c2b4a] text-white shadow-md shadow-[#00fffa]/30 border border-[#00fffa]/50' : 'bg-[#1e2635] text-[#a0aec0] hover:bg-[#2a354d] border border-transparent'}`}><span>Remove</span></label>
                                    <input
                                        type="radio"
                                        name="operation"
                                        id="op-search"
                                        value="search"
                                        checked={selectedOperation === 'search'}
                                        onChange={(e) => setSelectedOperation(e.target.value)}
                                        className="hidden"
                                    />
                                    <label htmlFor="op-search" className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-300 ${selectedOperation === 'search' ? 'bg-[#1c2b4a] text-white shadow-md shadow-[#00fffa]/30 border border-[#00fffa]/50' : 'bg-[#1e2635] text-[#a0aec0] hover:bg-[#2a354d] border border-transparent'}`}><span>Search</span></label>
                                </div>
                                {selectedOperation === 'insert' && (
                                    <div className="relative my-5 text-center group">
                                        <input
                                            type="number"
                                            value={positionInput}
                                            onChange={(e) => setPositionInput(e.target.value)}
                                            className="w-full p-4 rounded-2xl border-2 border-[#9e9e9e] bg-transparent text-white text-xl text-center focus:outline-none focus:border-[#149CEA]"
                                        />
                                        <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#CCCCCC] pointer-events-none transition-all duration-200 bg-[#060A0E] px-1 group-focus-within:top-0 group-focus-within:text-sm group-focus-within:text-[#149CEA] group-focus-within:transform-none">Enter position (index)</label>
                                    </div>
                                )}
                                {selectedOperation === 'remove' && (
                                    <div className="relative my-5 text-center group">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            className="w-full p-4 rounded-2xl border-2 border-[#9e9e9e] bg-transparent text-white text-xl text-center focus:outline-none focus:border-[#149CEA]"
                                        />
                                        <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#CCCCCC] pointer-events-none transition-all duration-200 bg-[#060A0E] px-1 group-focus-within:top-0 group-focus-within:text-sm group-focus-within:text-[#149CEA] group-focus-within:transform-none">Enter Value</label>
                                    </div>
                                )}
                                {selectedOperation === 'insert' && (
                                    <div className="flex justify-around mt-4 gap-2 flex-wrap">
                                        <button onClick={() => handleAction('insertHead')} className="relative w-[10em] h-[3.5em] border-3 border-[#149CEA] rounded-md text-white font-bold cursor-pointer transition-shadow duration-300 hover:shadow-inner hover:shadow-[#149CEA]/50">
                                            Insert at Head
                                        </button>
                                        <button onClick={() => handleAction('insertTail')} className="relative w-[10em] h-[3.5em] border-3 border-[#149CEA] rounded-md text-white font-bold cursor-pointer transition-shadow duration-300 hover:shadow-inner hover:shadow-[#149CEA]/50">
                                            Insert at Tail
                                        </button>
                                        <button onClick={() => handleAction('insertPosition')} className="relative w-[10em] h-[3.5em] border-3 border-[#149CEA] rounded-md text-white font-bold cursor-pointer transition-shadow duration-300 hover:shadow-inner hover:shadow-[#149CEA]/50">
                                            Insert at Position
                                        </button>
                                    </div>
                                )}
                                {selectedOperation === 'remove' && (
                                    <div className="flex justify-around mt-4 flex-wrap gap-2">
                                        <button onClick={() => handleAction('removeHead')} className="relative w-[10em] h-[3.5em] border-3 border-[#149CEA] rounded-md text-white font-bold cursor-pointer transition-shadow duration-300 hover:shadow-inner hover:shadow-[#149CEA]/50">
                                            Remove from Head
                                        </button>
                                        <button onClick={() => handleAction('removeTail')} className="relative w-[10em] h-[3.5em] border-3 border-[#149CEA] rounded-md text-white font-bold cursor-pointer transition-shadow duration-300 hover:shadow-inner hover:shadow-[#149CEA]/50">
                                            Remove from Tail
                                        </button>
                                        <button onClick={() => handleAction('removeValue')} className="relative w-[10em] h-[3.5em] border-3 border-[#149CEA] rounded-md text-white font-bold cursor-pointer transition-shadow duration-300 hover:shadow-inner hover:shadow-[#149CEA]/50">
                                            Remove by Value
                                        </button>
                                    </div>
                                )}
                                {selectedOperation === 'search' && (
                                    <div className="flex justify-around mt-4 flex-wrap">
                                        <button onClick={() => handleAction('search')} className="relative w-[10em] h-[3.5em] border-3 border-[#149CEA] rounded-md text-white font-bold cursor-pointer transition-shadow duration-300 hover:shadow-inner hover:shadow-[#149CEA]/50">
                                            Search
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div ref={historyBoxRef} className="mt-4 opacity-0 hidden flex-1 flex flex-col">
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
                                <p className="text-gray-400 italic text-base">Your Singly Linked List will appear here 👇</p>
                            </div>
                            <div ref={listVisAreaRef} className="flex flex-row justify-start items-center mt-5 h-[350px] gap-2">
                                {listArr.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <div className="node w-16 h-16 rounded-full flex items-center justify-center text-white border-2 border-[#00D3F3] bg-[#04060A]">
                                            {item.value}
                                        </div>
                                        {index < listArr.length - 1 && (
                                            <div className="arrow relative w-8 h-1 flex items-center justify-center">
                                                <svg className="h-full w-full" viewBox="0 0 60 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 1H50" stroke="#00D3F3" strokeWidth="2" />
                                                    <path d="M50 1L59 6L59 -4L50 1Z" fill="#00D3F3" />
                                                </svg>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </section>
                    
                    {/* --- Chatbot Section --- */}
                    <section className="chatBot flex flex-col gap-8 w-full max-w-7xl mx-auto mt-12">
                        <div className="bg-[#05080C] rounded-2xl p-6 border-2 border-[#00fffa]/50 shadow-lg shadow-[#00fffa]/20 text-white">
                            <h2 className="text-center text-2xl text-white mb-6 font-semibold">Ask any Question related to Linked List</h2>
                            <div className="flex items-start gap-4 bg-[#00fffa]/10 border-l-4 border-[#00fffa] rounded-md p-4 mb-6">
                                <p className="text-sm"><strong>How to use:</strong> Ask any Linked List-related question. The AI is specialized to help you with understanding Linked List related problems and concepts.</p>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="questionInput" className="text-lg text-[#00fffa] mb-2 block">Your Question</label>
                                <textarea
                                    id="questionInput"
                                    value={questionInput}
                                    onChange={(e) => setQuestionInput(e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-[#00fffa] bg-transparent text-white text-base resize-y min-h-[120px] shadow-sm shadow-[#00fffa] focus:outline-none focus:shadow-md focus:shadow-[#00fffa]/100"
                                    placeholder="e.g., What is a Linked List?"
                                ></textarea>
                            </div>
                            <button onClick={handleAsk} disabled={isLoading} className="w-full h-14 relative border-2 border-[#149CEA] rounded-xl text-white font-bold cursor-pointer bg-[#149CEA]/20 transition-all duration-300 hover:bg-[#149CEA]/40 hover:shadow-lg hover:shadow-[#149CEA]/50 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isLoading ? "Analyzing..." : "Ask Structify AI"}
                            </button>
                        </div>
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
                                            className={`chat-message p-4 rounded-xl max-w-[80%] ${msg.role === "user" ? "self-end bg-[#00fffa]/10 border-2 border-[#00fffa]/30" : "self-start bg-[#060D11] border-2 border-[#00fffa]/30 shadow-md shadow-[#00fffa]/30"}`}
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

export default LinkedListVisualizer;