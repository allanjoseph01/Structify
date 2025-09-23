import { gsap } from 'gsap';

// Helper function to get all nodes/arrows from the DOM
const getVisualElements = (containerRef) => {
    if (!containerRef) return { nodes: [], arrows: [] };
    const nodes = Array.from(containerRef.querySelectorAll(".node"));
    const arrows = Array.from(containerRef.querySelectorAll(".arrow"));
    return { nodes, arrows };
};

// Utility: Reset all transforms and highlights
const resetVisualState = (containerRef) => {
    const { nodes, arrows } = getVisualElements(containerRef);
    nodes.forEach(node => {
        gsap.set(node, { x: 0, y: 0, scale: 1, opacity: 1 });
        node.classList.remove('highlight');
    });
    arrows.forEach(arrow => {
        gsap.set(arrow, { x: 0, opacity: 1 });
    });
};

// Main insert-at-head handler (React integration)
export const handleInsertAtHead = async (containerRef, listArr, value) => {
    // Update state first
    const newArr = [{ value, id: Date.now() }, ...listArr];
    // Wait for React to render
    await new Promise(resolve => setTimeout(resolve, 0));
    resetVisualState(containerRef);

    const { nodes, arrows } = getVisualElements(containerRef);
    if (nodes.length > 0) {
        gsap.from(nodes[0], {
            x: 50,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
        });
    }
    if (arrows.length > 0) {
        gsap.from(arrows[0], {
            x: 50,
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "back.out(1.7)",
        });
    }
    return newArr;
};

// Insert at tail with animation
export const handleInsertAtTail = async (containerRef, listArr, value) => {
    const newArr = [...listArr, { value, id: Date.now() }];
    await new Promise(resolve => setTimeout(resolve, 0));
    resetVisualState(containerRef);

    const { nodes, arrows } = getVisualElements(containerRef);
    if (nodes.length > 0) {
        const lastNode = nodes[nodes.length - 1];
        gsap.from(lastNode, {
            x: 50,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
        });
    }
    if (arrows.length > 0) {
        const lastArrow = arrows[arrows.length - 1];
        gsap.from(lastArrow, {
            x: 50,
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "back.out(1.7)",
        });
    }
    return newArr;
};

// Remove from head with animation
export const handleRemoveFromHead = async (containerRef, listArr) => {
    if (listArr.length === 0) {
        console.log("Linked List is empty!");
        return listArr;
    }
    resetVisualState(containerRef);

    const { nodes, arrows } = getVisualElements(containerRef);
    if (nodes.length > 0) {
        await gsap.to(nodes[0], {
            x: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
        });
    }
    // Animate remaining nodes/arrows to shift left, but reset after animation
    if (nodes.length > 1) {
        await gsap.to(nodes.slice(1), {
            x: 0,
            duration: 0.5,
            ease: "power2.out",
        });
    }
    if (arrows.length > 0) {
        await gsap.to(arrows, {
            x: 0,
            duration: 0.5,
            ease: "power2.out",
        });
    }
    // Wait for React to re-render, then reset
    const newArr = listArr.slice(1);
    await new Promise(resolve => setTimeout(resolve, 0));
    resetVisualState(containerRef);
    return newArr;
};

// Remove from tail with animation
export const handleRemoveFromTail = async (containerRef, listArr) => {
    if (listArr.length === 0) {
        console.log("Linked List is empty!");
        return listArr;
    }
    resetVisualState(containerRef);

    const { nodes, arrows } = getVisualElements(containerRef);
    if (nodes.length > 0) {
        const lastNode = nodes[nodes.length - 1];
        await gsap.to(lastNode, {
            scale: 0.1,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
        });
    }
    if (arrows.length > 0) {
        const lastArrow = arrows[arrows.length - 1];
        await gsap.to(lastArrow, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
        });
    }
    const newArr = listArr.slice(0, -1);
    await new Promise(resolve => setTimeout(resolve, 0));
    resetVisualState(containerRef);
    return newArr;
};

// Insert at position (0..length) with animation
export const handleInsertAtPosition = async (containerRef, listArr, value, position) => {
    if (position < 0 || position > listArr.length) {
        console.error("Invalid position for insertion.");
        return listArr;
    }
    if (listArr.length >= 7) {
        console.error("Linked list is full!");
        return listArr;
    }
    // Prepare new array
    const newNodeData = { value, id: Date.now() };
    const newArr = [...listArr.slice(0, position), newNodeData, ...listArr.slice(position)];
    // Wait for React to render
    await new Promise(resolve => setTimeout(resolve, 0));
    resetVisualState(containerRef);

    const { nodes, arrows } = getVisualElements(containerRef);
    const tl = gsap.timeline();

    // Animate traversal up to position
    for (let i = 0; i < position; i++) {
        tl.to(nodes[i], {
            scale: 1.1,
            duration: 0.3,
            ease: 'power1.inOut',
            onStart: () => nodes[i].classList.add('highlight'),
            onReverseComplete: () => nodes[i].classList.remove('highlight')
        });
        tl.to(nodes[i], {
            scale: 1,
            duration: 0.2,
            ease: 'power1.inOut',
            onComplete: () => nodes[i].classList.remove('highlight')
        }, ">-0.1");
    }

    // Animate new node appearing
    const newNode = nodes[position];
    if (newNode) {
        gsap.set(newNode, { x: -50, opacity: 0, scale: 1 });
        tl.to(newNode, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
        }, "<");
    }

    // Animate arrows if needed (no shifting, just fade in if new)
    if (arrows.length > 0 && position < arrows.length) {
        const arrow = arrows[position];
        if (arrow) {
            gsap.set(arrow, { x: -50, opacity: 0 });
            tl.to(arrow, {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
            }, "<");
        }
    }

    await tl;
    resetVisualState(containerRef);
    return newArr;
};

// Remove by value (first occurrence) with animation
export const handleRemoveByValue = async (containerRef, listArr, value) => {
    if (listArr.length === 0) {
        console.error('Linked List is empty!');
        return { success: false, newListArr: listArr, message: "Linked List is empty!", newHistoryText: "Failed to remove from empty list." };
    }
    resetVisualState(containerRef);

    const indexToRemove = listArr.findIndex(node => node.value.toString() === value.toString());
    if (indexToRemove === -1) {
        return { success: false, newListArr: listArr, message: `Value ${value} not found.`, newHistoryText: `Failed to remove ${value}.` };
    }

    const { nodes, arrows } = getVisualElements(containerRef);
    const tl = gsap.timeline();

    // Animate traversal
    for (let i = 0; i <= indexToRemove; i++) {
        tl.to(nodes[i], {
            scale: 1.1,
            duration: 0.25,
            ease: 'power1.inOut',
            onStart: () => nodes[i].classList.add('highlight'),
            onReverseComplete: () => nodes[i].classList.remove('highlight')
        });
        tl.to(nodes[i], {
            scale: 1,
            duration: 0.15,
            ease: 'power1.inOut',
            onComplete: () => nodes[i].classList.remove('highlight')
        }, ">-0.05");
    }

    // Animate removal
    const nodeToRemove = nodes[indexToRemove];
    if (nodeToRemove) {
        tl.to(nodeToRemove, {
            scale: 1.3,
            duration: 0.2,
            ease: "power1.in"
        });
        tl.to(nodeToRemove, {
            y: 60,
            opacity: 0,
            duration: 0.5,
            ease: "power1.in"
        }, ">-0.1");
    }

    // Animate shift left for remaining nodes/arrows
    if (nodes.length > indexToRemove + 1) {
        tl.to(nodes.slice(indexToRemove + 1), {
            x: 0,
            duration: 0.4,
            ease: "power2.inOut"
        }, "<");
    }
    if (arrows.length > indexToRemove) {
        tl.to(arrows.slice(indexToRemove), {
            x: 0,
            duration: 0.4,
            ease: "power2.inOut"
        }, "<");
    }

    await tl;
    resetVisualState(containerRef);

    const newArr = listArr.filter((node, idx) => idx !== indexToRemove);
    return {
        success: true,
        newListArr: newArr,
        message: `Removed ${value} from the list.`,
        newHistoryText: `Removed ${value} by value.`
    };
};

// Search for value (with animation)
export const handleSearchForValue = async (containerRef, listArr, value) => {
    if (!value) {
        return { message: "Please enter a value to search for!", newHistoryText: "" };
    }
    resetVisualState(containerRef);

    const { nodes } = getVisualElements(containerRef);
    let foundIndex = -1;
    const tl = gsap.timeline();

    for (let i = 0; i < listArr.length; i++) {
        const visualNode = nodes[i];
        tl.to(visualNode, {
            scale: 1.1,
            duration: 0.25,
            ease: 'power1.inOut',
            onStart: () => visualNode.classList.add('highlight'),
            onReverseComplete: () => visualNode.classList.remove('highlight')
        });
        tl.to(visualNode, {
            scale: 1,
            duration: 0.15,
            ease: 'power1.inOut',
            onComplete: () => visualNode.classList.remove('highlight')
        }, ">-0.05");

        if (listArr[i].value.toString() === value.toString()) {
            foundIndex = i;
            tl.to(visualNode, {
                scale: 1.3,
                duration: 0.3,
                ease: 'power2.out',
                onStart: () => visualNode.classList.add('highlight')
            });
            break;
        }
    }

    await tl;
    resetVisualState(containerRef);

    if (foundIndex !== -1) {
        return {
            message: `Found value ${value} at index ${foundIndex}.`,
            newHistoryText: `Searched for value ${value}.`
        };
    } else {
        return {
            message: `Value ${value} not found.`,
            newHistoryText: `Searched for value ${value}.`
        };
    }
};