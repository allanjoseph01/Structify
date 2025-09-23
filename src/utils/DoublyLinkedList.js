import { gsap } from 'gsap';

// Doubly Linked List Node and Class
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
}

// Global instance of the Doubly Linked List
export const dll = new DoublyLinkedList();

// Function to render the entire linked list
function renderDoublyLinkedList(dllVisArea) {
    // Clear the visualization area
    dllVisArea.innerHTML = '';
    let currentNode = dll.head;
    let delayTime = 0;

    if (dll.head === null) {
        const placeholderText = document.createElement('p');
        placeholderText.classList.add('text-gray-400', 'italic', 'text-base');
        placeholderText.textContent = 'Your Doubly Linked List will appear here 👇';
        dllVisArea.appendChild(placeholderText);
    } else {
        while (currentNode !== null) {
            // Create the node element
            const nodeElement = document.createElement('div');
            nodeElement.classList.add('d-node');
            
            const dataBox = document.createElement('div');
            dataBox.classList.add('d-node-data');
            dataBox.textContent = currentNode.data;
            
            nodeElement.appendChild(dataBox);
            dllVisArea.appendChild(nodeElement);

            // Animate the node entering the visualization
            gsap.from(nodeElement, {
                x: 50,
                opacity: 0,
                duration: 0.6,
                delay: delayTime,
                ease: 'back.out(1.7)'
            });
            
            // Add the bi-directional arrows between nodes
            if (currentNode.next !== null) {
                const arrowWrapper = document.createElement('div');
                arrowWrapper.classList.add('d-arrow-wrapper');

                // Using SVGs for better quality and styling control
                arrowWrapper.innerHTML = `
                    <svg className="h-full w-full" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 15H90" stroke="#00D3F3" strokeWidth="2" />
                        <path d="M90 15L85 10L85 20L90 15Z" fill="#00D3F3" />
                        <path d="M100 45H10" stroke="#00D3F3" strokeWidth="2" />
                        <path d="M10 45L15 50L15 40L10 45Z" fill="#00D3F3" />
                    </svg>
                `;
                dllVisArea.appendChild(arrowWrapper);
                
                // Animate the arrows
                gsap.from(arrowWrapper, {
                    x: 50,
                    opacity: 0,
                    duration: 0.6,
                    delay: delayTime + 0.2,
                    ease: 'back.out(1.7)'
                });
            }
            
            delayTime += 0.3;
            currentNode = currentNode.next;
        }
    }
}

export function handleInsertAtHead(dllVisArea, value, setHistoryList, hisnum) {
    const newNode = new Node(value);
    if (dll.head === null) {
        dll.head = newNode;
        dll.tail = newNode;
    } else {
        newNode.next = dll.head;
        dll.head.prev = newNode;
        dll.head = newNode;
    }
    dll.size++;
    setHistoryList(prev => [...prev, { id: hisnum, text: `Inserted ${value} at the head.` }]);
    renderDoublyLinkedList(dllVisArea);
}

export function handleInsertAtTail(dllVisArea, value, setHistoryList, hisnum) {
    const newNode = new Node(value);
    if (dll.head === null) {
        dll.head = newNode;
        dll.tail = newNode;
    } else {
        dll.tail.next = newNode;
        newNode.prev = dll.tail;
        dll.tail = newNode;
    }
    dll.size++;
    setHistoryList(prev => [...prev, { id: hisnum, text: `Inserted ${value} at the tail.` }]);
    renderDoublyLinkedList(dllVisArea);
}

export async function handleInsertAtPosition(dllVisArea, value, position, setHistoryList, hisnum, displayMessage) {
    if (position === 0) {
        handleInsertAtHead(dllVisArea, value, setHistoryList, hisnum);
        return;
    }
    if (position === dll.size) {
        handleInsertAtTail(dllVisArea, value, setHistoryList, hisnum);
        return;
    }

    const tl = gsap.timeline();
    const allNodes = dllVisArea.querySelectorAll('.d-node');
    const allArrows = dllVisArea.querySelectorAll('.d-arrow-wrapper');
    
    let targetLeft = allNodes[position].offsetLeft;
    let targetTop = allNodes[position].offsetTop;
    
    const newNodeVisual = document.createElement('div');
    newNodeVisual.classList.add('d-node', 'temporary');
    newNodeVisual.style.position = 'absolute';
    newNodeVisual.style.left = targetLeft + 'px';
    newNodeVisual.style.top = '-50px';
    newNodeVisual.style.opacity = '0';
    newNodeVisual.style.zIndex = '100';
    newNodeVisual.innerHTML = `<div class=\"d-node-data\">${value}</div>`;
    dllVisArea.appendChild(newNodeVisual);

    // Step 1: Traverse and highlight up to the insertion point
    for (let i = 0; i < position; i++) {
        const visualNode = allNodes[i];
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1.1 });
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1 });
    }

    // Step 2: Shift the nodes to make space
    const elementsToShift = [];
    for (let i = position; i < allNodes.length; i++) { elementsToShift.push(allNodes[i]); }
    for (let i = position; i < allArrows.length; i++) { elementsToShift.push(allArrows[i]); }
    await tl.to(elementsToShift, { x: '+=100', duration: 0.5, ease: "power2.inOut" });

    // Step 3: Animate the new node dropping into position
    await tl.to(newNodeVisual, {
        top: targetTop + 'px',
        left: (targetLeft - 5) + 'px',
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // Step 4: Perform data manipulation and re-render
    const newNodeData = new Node(value);
    let currentNode = dll.head;
    for (let i = 0; i < position - 1; i++) { currentNode = currentNode.next; }
    let tempNode = currentNode.next;
    currentNode.next = newNodeData;
    newNodeData.next = tempNode;
    newNodeData.prev = currentNode;
    if(tempNode) { tempNode.prev = newNodeData; }
    dll.size++;

    setHistoryList(prev => [...prev, { id: hisnum, text: `Inserted ${value} at position ${position}.` }]);
    renderDoublyLinkedList(dllVisArea);
}

export function handleRemoveFromHead(dllVisArea, setHistoryList, hisnum) {
    const removedValue = dll.head.data;
    dll.head = dll.head.next;
    dll.size--;
    if (dll.head === null) {
        dll.tail = null;
    } else {
        dll.head.prev = null;
    }
    setHistoryList(prev => [...prev, { id: hisnum, text: `Removed ${removedValue} from the head.` }]);
    renderDoublyLinkedList(dllVisArea);
}

export function handleRemoveFromTail(dllVisArea, setHistoryList, hisnum) {
    if (dll.head === dll.tail) {
        const removedValue = dll.head.data;
        dll.head = null;
        dll.tail = null;
        dll.size--;
        setHistoryList(prev => [...prev, { id: hisnum, text: `Removed ${removedValue} from the tail.` }]);
        renderDoublyLinkedList(dllVisArea);
        return;
    }
    const removedValue = dll.tail.data;
    const currentNode = dll.tail.prev;
    dll.tail.prev = null;
    currentNode.next = null;
    dll.tail = currentNode;
    dll.size--;
    setHistoryList(prev => [...prev, { id: hisnum, text: `Removed ${removedValue} from the tail.` }]);
    renderDoublyLinkedList(dllVisArea);
}

export async function handleRemoveByValue(dllVisArea, value, setHistoryList, hisnum, displayMessage) {
    if (dll.head === null || !value) { return; }

    const tl = gsap.timeline();
    const allNodes = dllVisArea.querySelectorAll('.d-node');
    let currentNode = dll.head;
    let count = 0;
    let found = false;

    while (currentNode !== null) {
        const visualNode = allNodes[count];
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1.1 });

        if (currentNode.data == value) {
            found = true;
            await tl.to(visualNode, { duration: 0.5, scale: 1.3, ease: 'power2.out' });
            await tl.to(visualNode, { duration: 0.8, y: 100, opacity: 0, ease: "power1.in" });
            break;
        }
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1 });
        currentNode = currentNode.next;
        count++;
    }

    if (found) {
        let currentNode = dll.head;
        if (currentNode.data == value) {
            handleRemoveFromHead(dllVisArea, setHistoryList, hisnum);
            return;
        }
        let prevNode = null;
        while (currentNode !== null && currentNode.data != value) {
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
        if (currentNode === dll.tail) {
            handleRemoveFromTail(dllVisArea, setHistoryList, hisnum);
            return;
        }
        if (currentNode) {
            prevNode.next = currentNode.next;
            if (currentNode.next) {
                currentNode.next.prev = prevNode;
            }
            dll.size--;
        }
        setHistoryList(prev => [...prev, { id: hisnum, text: `Deleted ${value} from linked list.` }]);
    } else {
        displayMessage(`Value ${value} not found in the list.`);
    }
    renderDoublyLinkedList(dllVisArea);
}

export async function handleSearchForValue(dllVisArea, value, setHistoryList, hisnum, displayMessage) {
    const allNodes = dllVisArea.querySelectorAll('.d-node');
    allNodes.forEach(node => node.classList.remove('highlight'));
    let currentNode = dll.head;
    let count = 0;
    let found = false;

    const tl = gsap.timeline();

    while (currentNode !== null) {
        const visualNode = allNodes[count];
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1.1 });

        if (currentNode.data == value) {
            found = true;
            await tl.to(visualNode, { duration: 0.5, scale: 1.3, ease: 'power2.out' })
                    .to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1 });
            break;
        }
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1 });
        currentNode = currentNode.next;
        count++;
    }

    if (found) {
        displayMessage(`Found value ${value} at index ${count}.`);
    } else {
        displayMessage(`Value ${value} not found in the list.`);
    }
    setHistoryList(prev => [...prev, { id: hisnum, text: `Searched for value ${value}.` }]);
}