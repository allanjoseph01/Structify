import { gsap } from 'gsap';

// A class for a single node in the linked list
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// A class to manage the linked list
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
}

// Global instance of the Singly Linked List
export const linkedList = new LinkedList();

/**
 * Renders the entire linked list into the visualization area.
 * @param {HTMLElement} listVisArea The DOM element to render the list inside.
 */
function renderList(listVisArea) {
    listVisArea.innerHTML = '';
    
    if (linkedList.head === null) {
        const placeholderText = document.createElement('p');
        placeholderText.classList.add('text-gray-400', 'italic', 'text-base');
        placeholderText.textContent = 'Your Singly Linked List will appear here 👇';
        listVisArea.appendChild(placeholderText);
        return;
    }
    
    let currentNode = linkedList.head;
    let delayTime = 0;
    let index = 0;

    while (currentNode !== null) {
        const nodeElement = document.createElement('div');
        nodeElement.classList.add('node');
        nodeElement.dataset.index = index;
        
        const dataBox = document.createElement('div');
        dataBox.classList.add('node-data');
        dataBox.textContent = currentNode.data;
        
        nodeElement.appendChild(dataBox);
        listVisArea.appendChild(nodeElement);
        
        gsap.from(nodeElement, {
            x: 50,
            opacity: 0,
            duration: 0.6,
            delay: delayTime,
            ease: 'back.out(1.7)'
        });
        
        if (currentNode.next !== null) {
            const arrowElement = document.createElement('div');
            arrowElement.classList.add('arrow');
            arrowElement.dataset.index = index;
            listVisArea.appendChild(arrowElement);
            
            gsap.from(arrowElement, {
                x: 50,
                opacity: 0,
                duration: 0.6,
                delay: delayTime + 0.2,
                ease: 'back.out(1.7)'
            });
        }
        
        delayTime += 0.3;
        currentNode = currentNode.next;
        index++;
    }
}

export function handleInsertAtHead(listVisArea, value, setHistoryList, hisnum) {
    const newNode = new Node(value);
    if (linkedList.head === null) {
        linkedList.head = newNode;
        linkedList.tail = newNode;
    } else {
        newNode.next = linkedList.head;
        linkedList.head = newNode;
    }
    linkedList.size++;
    setHistoryList(prev => [...prev, { id: hisnum, text: `Inserted ${value} at the head.` }]);
    renderList(listVisArea);
}

export function handleInsertAtTail(listVisArea, value, setHistoryList, hisnum) {
    const newNode = new Node(value);
    if (linkedList.head === null) {
        linkedList.head = newNode;
        linkedList.tail = newNode;
    } else {
        linkedList.tail.next = newNode;
        linkedList.tail = newNode;
    }
    linkedList.size++;
    setHistoryList(prev => [...prev, { id: hisnum, text: `Inserted ${value} at the tail.` }]);
    renderList(listVisArea);
}

export async function handleInsertAtPosition(listVisArea, value, position, setHistoryList, hisnum, displayMessage) {
    if (position === 0) {
        handleInsertAtHead(listVisArea, value, setHistoryList, hisnum);
        return;
    }
    if (position === linkedList.size) {
        handleInsertAtTail(listVisArea, value, setHistoryList, hisnum);
        return;
    }

    const tl = gsap.timeline();
    const allNodes = listVisArea.querySelectorAll('.node');
    const allArrows = listVisArea.querySelectorAll('.arrow');

    const nodeAtPosition = allNodes[position];
    const prevNode = allNodes[position - 1];
    let targetLeft = 0;
    let targetTop = 0;
    if (nodeAtPosition) {
        targetLeft = nodeAtPosition.offsetLeft;
        targetTop = nodeAtPosition.offsetTop;
    } else if (prevNode) {
        targetLeft = prevNode.offsetLeft + prevNode.offsetWidth + 20;
        targetTop = prevNode.offsetTop;
    }
    
    const newNodeVisual = document.createElement('div');
    newNodeVisual.classList.add('node', 'temporary');
    newNodeVisual.style.position = 'absolute';
    newNodeVisual.style.left = targetLeft + 'px';
    newNodeVisual.style.top = '-50px';
    newNodeVisual.style.opacity = '0';
    newNodeVisual.style.zIndex = '100';
    newNodeVisual.innerHTML = `<div class=\"node-data\">${value}</div>`;
    listVisArea.appendChild(newNodeVisual);

    // Step 1: Traverse and highlight up to the insertion point
    for (let i = 0; i < position; i++) {
        const visualNode = allNodes[i];
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1.2 , backgroundColor:"#00D3F3" , color:"black" });
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1 , backgroundColor:"#04060A" , color:"white" });
    }

    // Step 2: Shift nodes to make space
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

    // Step 4: Update data structure and re-render
    const newNodeData = new Node(value);
    let currentNode = linkedList.head;
    for (let i = 0; i < position - 1; i++) { currentNode = currentNode.next; }
    let tempNode = currentNode.next;
    currentNode.next = newNodeData;
    newNodeData.next = tempNode;
    linkedList.size++;

    setHistoryList(prev => [...prev, { id: hisnum, text: `Inserted ${value} at position ${position}.` }]);
    renderList(listVisArea);
}

export function handleRemoveFromHead(listVisArea, setHistoryList, hisnum) {
    const removedValue = linkedList.head.data;
    linkedList.head = linkedList.head.next;
    linkedList.size--;
    if (linkedList.head === null) {
        linkedList.tail = null;
    }
    setHistoryList(prev => [...prev, { id: hisnum, text: `Removed ${removedValue} from the head.` }]);
    renderList(listVisArea);
}

export function handleRemoveFromTail(listVisArea, setHistoryList, hisnum) {
    if (linkedList.head === linkedList.tail) {
        const removedValue = linkedList.head.data;
        linkedList.head = null;
        linkedList.tail = null;
        linkedList.size--;
        setHistoryList(prev => [...prev, { id: hisnum, text: `Removed ${removedValue} from the tail.` }]);
        renderList(listVisArea);
        return;
    }
    
    let currentNode = linkedList.head;
    while (currentNode.next !== linkedList.tail) {
        currentNode = currentNode.next;
    }
    const removedValue = linkedList.tail.data;
    currentNode.next = null;
    linkedList.tail = currentNode;
    linkedList.size--;
    
    setHistoryList(prev => [...prev, { id: hisnum, text: `Removed ${removedValue} from the tail.` }]);
    renderList(listVisArea);
}

export async function handleRemoveByValue(listVisArea, value, setHistoryList, hisnum, displayMessage) {
    if (linkedList.head === null || !value) { return; }

    const tl = gsap.timeline();
    const allNodes = listVisArea.querySelectorAll('.node');
    let currentNode = linkedList.head;
    let count = 0;
    let found = false;

    while (currentNode !== null) {
        const visualNode = allNodes[count];
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1.2 , backgroundColor:"#00D3F3" , color:"black" });

        if (currentNode.data == value) {
            found = true;
            await tl.to(visualNode, { duration: 0.5, scale: 1.4, ease: 'power2.out' });
            await tl.to(visualNode, { duration: 0.8, y: 100, opacity: 0, ease: "power1.in" });
            break;
        }
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1 , backgroundColor:"#04060A" , color:"white" });
        currentNode = currentNode.next;
        count++;
    }

    if (found) {
        let currentNode = linkedList.head;
        if (currentNode.data == value) {
            handleRemoveFromHead(listVisArea, setHistoryList, hisnum);
            return;
        }
        let prevNode = null;
        while (currentNode !== null && currentNode.data != value) {
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
        if (currentNode === linkedList.tail) {
            handleRemoveFromTail(listVisArea, setHistoryList, hisnum);
            return;
        }
        if (currentNode) {
            prevNode.next = currentNode.next;
            linkedList.size--;
        }
        setHistoryList(prev => [...prev, { id: hisnum, text: `Deleted ${value} from linked list.` }]);
    } else {
        displayMessage(`Value ${value} not found in the list.`);
    }
    renderList(listVisArea);
}

export async function handleSearchForValue(listVisArea, value, setHistoryList, hisnum, displayMessage) {
    const allNodes = listVisArea.querySelectorAll('.node');
    allNodes.forEach(node => node.classList.remove('highlight'));
    let currentNode = linkedList.head;
    let count = 0;
    let found = false;

    const tl = gsap.timeline();

    while (currentNode !== null) {
        const visualNode = allNodes[count];
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1.2 , backgroundColor:"#00D3F3" , color:"black"});

        if (currentNode.data == value) {
            found = true;
            await tl.to(visualNode, { duration: 0.5, scale: 1.3, ease: 'power2.out' })
                    .to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1 , backgroundColor:"#04060A" , color:"white"});
            break;
        }
        await tl.to(visualNode, { duration: 0.5, toggleClass: 'highlight', ease: 'power1.inOut', scale: 1 , backgroundColor:"#04060A" , color:"white"});
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