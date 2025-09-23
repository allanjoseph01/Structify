import { gsap } from 'gsap';

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.subtreeWidth = 0;
    }
}

class BinarySearchTree {
    constructor() { this.root = null; }

    insert(value) {
        const n = new Node(value);
        if (!this.root) { this.root = n; return; }
        
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = n;
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = n;
                    return;
                }
                current = current.right;
            }
        }
    }

    delete(value) {
        const deleteRecursive = (node, val) => {
            if (node === null) return null;

            if (val < node.value) {
                node.left = deleteRecursive(node.left, val);
                return node;
            } else if (val > node.value) {
                node.right = deleteRecursive(node.right, val);
                return node;
            } else {
                if (node.left === null && node.right === null) {
                    return null;
                }
                if (node.left === null) return node.right;
                if (node.right === null) return node.left;

                const tempNode = this.findMinNode(node.right);
                node.value = tempNode.value;
                node.right = deleteRecursive(node.right, tempNode.value);
                return node;
            }
        };
        this.root = deleteRecursive(this.root, value);
    }
    
    findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
}

export const binarySearchTree = new BinarySearchTree();

// A utility function to animate a visual node.
const animateNode = (visualNode, tl) => {
    tl.to(visualNode, { duration: 0.5, scale: 1.3, ease: 'power1.inOut' });
    tl.to(visualNode, { duration: 0.25, scale: 1, ease: 'power1.inOut' }, '>-0.15');
};

export function renderTree(bstVisArea, root = binarySearchTree.root) {
    if (!bstVisArea) return;
    bstVisArea.innerHTML = "";

    const cs = getComputedStyle(bstVisArea);
    if (cs.position === "static") bstVisArea.style.position = "relative";

    if (!root) {
        const placeholderText = document.createElement('p');
        placeholderText.classList.add('text-gray-400', 'italic', 'text-base');
        placeholderText.textContent = '';
        bstVisArea.appendChild(placeholderText);
        return;
    }

    const nodeSize = 50;
    const levelGap = 100;
    const minGap = 50;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "0";
    bstVisArea.appendChild(svg);

    function computeWidths(node) {
        if (!node) return 0;
        const lw = computeWidths(node.left);
        const rw = computeWidths(node.right);
        node.subtreeWidth = (!node.left && !node.right)
            ? nodeSize
            : lw + minGap + rw;
        return node.subtreeWidth;
    }
    computeWidths(root);

    const positions = [];
    function assign(node, x, y, parent = null) {
        if (!node) return;
        positions.push({ node, x, y, parent });

        const lw = node.left ? node.left.subtreeWidth : 0;
        const rw = node.right ? node.right.subtreeWidth : 0;

        if (node.left) {
            const lx = x - (rw + minGap) / 2;
            assign(node.left, lx, y + levelGap, { x, y });
        }
        if (node.right) {
            const rx = x + (lw + minGap) / 2;
            assign(node.right, rx, y + levelGap, { x, y });
        }
    }
    const rootX = bstVisArea.clientWidth / 2;
    const rootY = 50;
    assign(root, rootX, rootY);

    positions.forEach(p => {
        if (!p.parent) return;
        const startX = p.parent.x;
        const startY = p.parent.y + nodeSize;
        const endX = p.x;
        const endY = p.y;

        const ctrlX = (startX + endX) / 2;
        const ctrlY = (startY + endY) / 2 - 20;

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`);
        path.setAttribute("stroke", "#00D3F3");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.style.filter = "drop-shadow(0 0 4px #00D3F3)";
        svg.appendChild(path);
    });

    positions.forEach(p => {
        const el = document.createElement("div");
        el.classList.add("bst-node");
        el.dataset.value = p.node.value;
        el.textContent = p.node.value;

        el.style.position = "absolute";
        el.style.left = `${Math.round(p.x - nodeSize / 2)}px`;
        el.style.top = `${Math.round(p.y)}px`;
        el.style.width = `${nodeSize}px`;
        el.style.height = `${nodeSize}px`;
        el.style.lineHeight = `${nodeSize}px`;
        el.style.zIndex = "1";

        bstVisArea.appendChild(el);
    });
}

export async function handleInsert(bstVisArea, value, setHistoryList, hisnum, displayMessage) {
    const numValue = Number(value);
    const nodeSize = 50;
    const levelGap = 100;
    const minGap = 50;
    const tl = gsap.timeline();

    let tempNode = binarySearchTree.root;
    while(tempNode) {
        if (tempNode.value === numValue) {
            displayMessage(`Value ${numValue} already exists in the tree. Duplicates are not allowed.`);
            return;
        }
        if (numValue < tempNode.value) {
            tempNode = tempNode.left;
        } else {
            tempNode = tempNode.right;
        }
    }

    if (!binarySearchTree.root) {
        binarySearchTree.insert(numValue);
        renderTree(bstVisArea);
        const rootEl = bstVisArea.querySelector('.bst-node');
        if (rootEl) {
            gsap.from(rootEl, {
                duration: 0.8,
                y: -150,
                scale: 0,
                opacity: 0,
                ease: 'back.out(1.7)'
            });
        }
        setHistoryList(prev => [...prev, { id: hisnum, text: `Inserted value ${numValue} into the tree.` }]);
        return;
    }

    const originalPositions = [];
    function computeWidths(node) {
        if (!node) return 0;
        const lw = computeWidths(node.left);
        const rw = computeWidths(node.right);
        node.subtreeWidth = (!node.left && !node.right) ? nodeSize : lw + minGap + rw;
        return node.subtreeWidth;
    }
    computeWidths(binarySearchTree.root);

    function assign(node, x, y) {
        if (!node) return;
        const lw = node.left ? node.left.subtreeWidth : 0;
        const rw = node.right ? node.right.subtreeWidth : 0;
        originalPositions.push({ node, x, y });
        if (node.left) {
            const lx = x - (rw + minGap) / 2;
            assign(node.left, lx, y + levelGap);
        }
        if (node.right) {
            const rx = x + (lw + minGap) / 2;
            assign(node.right, rx, y + levelGap);
        }
    }
    assign(binarySearchTree.root, bstVisArea.clientWidth / 2, 50);

    let currentNode = binarySearchTree.root;
    let insertionParent = null;
    let insertionType = '';
    while (currentNode) {
        const vis = bstVisArea.querySelector(`.bst-node[data-value="${currentNode.value}"]`);
        if (vis) animateNode(vis, tl);

        insertionParent = currentNode;
        if (numValue < currentNode.value) {
            insertionType = 'left';
            currentNode = currentNode.left;
        } else {
            insertionType = 'right';
            currentNode = currentNode.right;
        }
    }
    await tl.play();
    tl.clear();

    const tempTree = new BinarySearchTree();
    Object.assign(tempTree, JSON.parse(JSON.stringify(binarySearchTree)));
    tempTree.insert(numValue);

    const projectedPositions = [];
    function computeProjectedWidths(node) {
        if (!node) return 0;
        const lw = computeProjectedWidths(node.left);
        const rw = computeProjectedWidths(node.right);
        node.subtreeWidth = (!node.left && !node.right) ? nodeSize : lw + minGap + rw;
        return node.subtreeWidth;
    }
    computeProjectedWidths(tempTree.root);

    function assignProjected(node, x, y) {
        if (!node) return;
        projectedPositions.push({ node, x, y });
        const lw = node.left ? node.left.subtreeWidth : 0;
        const rw = node.right ? node.right.subtreeWidth : 0;
        if (node.left) {
            const lx = x - (rw + minGap) / 2;
            assignProjected(node.left, lx, y + levelGap);
        }
        if (node.right) {
            const rx = x + (lw + minGap) / 2;
            assignProjected(node.right, rx, y + levelGap);
        }
    }
    assignProjected(tempTree.root, bstVisArea.clientWidth / 2, 50);

    const newPos = projectedPositions.find(p => p.node.value === numValue);
    const targetLeft = Math.round(newPos.x - nodeSize / 2);
    const targetTop = Math.round(newPos.y);

    tl.add(gsap.timeline());
    originalPositions.forEach(origPos => {
        const newPos = projectedPositions.find(p => p.node.value === origPos.node.value);
        if (newPos) {
            const el = bstVisArea.querySelector(`.bst-node[data-value="${origPos.node.value}"]`);
            if (el) {
                tl.to(el, {
                    duration: 0.5,
                    left: `${Math.round(newPos.x - nodeSize / 2)}px`,
                    top: `${Math.round(newPos.y)}px`,
                    ease: "power2.inOut"
                }, "<");
            }
        }
    });

    const tempNodeEl = document.createElement('div');
    tempNodeEl.classList.add('bst-node', 'temporary');
    tempNodeEl.textContent = numValue;
    tempNodeEl.dataset.value = numValue;
    tempNodeEl.style.position = 'absolute';
    tempNodeEl.style.left = `${targetLeft}px`;
    tempNodeEl.style.top = `-50px`;
    tempNodeEl.style.scale = 0;
    tempNodeEl.style.opacity = 0;
    bstVisArea.appendChild(tempNodeEl);

    tl.to(tempNodeEl, {
        duration: 0.8,
        y: `${targetTop}px`,
        scale: 1,
        opacity: 1,
        ease: 'back.out(1.7)'
    }, "<0.2");

    await tl.play();

    binarySearchTree.insert(numValue);
    setHistoryList(prev => [...prev, { id: hisnum, text: `Inserted value ${numValue} into the tree.` }]);
    renderTree(bstVisArea);
}

export async function handleDelete(bstVisArea, value, setHistoryList, hisnum, displayMessage) {
    const numValue = Number(value);
    if (!binarySearchTree.root) {
        displayMessage("The tree is empty!");
        return;
    }

    const tl = gsap.timeline({ paused: true });
    
    let target = null;
    let path = [];
    let current = binarySearchTree.root;

    while (current) {
        path.push(current);
        const visualNode = bstVisArea.querySelector(`.bst-node[data-value="${current.value}"]`);
        if (visualNode) animateNode(visualNode, tl);
        
        if (numValue === current.value) {
            target = current;
            break;
        } else if (numValue < current.value) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    await tl.play();
    tl.clear();

    if (!target) {
        displayMessage(`Value ${numValue} not found in the tree.`);
        return;
    }

    const visualTargetNode = bstVisArea.querySelector(`.bst-node[data-value="${target.value}"]`);
    
    if (!target.left && !target.right) {
        tl.to(visualTargetNode, {
            duration: 0.5,
            scale: 0,
            opacity: 0,
            ease: 'power1.in'
        });
    } else if (target.left && target.right) {
        const successor = binarySearchTree.findMinNode(target.right);
        const visualSuccessor = bstVisArea.querySelector(`.bst-node[data-value="${successor.value}"]`);
        
        tl.to(visualSuccessor, {
            duration: 0.8,
            x: visualTargetNode.offsetLeft - visualSuccessor.offsetLeft,
            y: visualTargetNode.offsetTop - visualSuccessor.offsetTop,
            ease: 'power2.inOut',
        });
    } else {
        tl.to(visualTargetNode, {
            duration: 0.5,
            scale: 0,
            opacity: 0,
            ease: 'power1.in'
        });
    }

    await tl.play();

    binarySearchTree.delete(numValue);
    setHistoryList(prev => [...prev, { id: hisnum, text: `Deleted value ${numValue} from the tree.` }]);
    renderTree(bstVisArea);
}

export async function handleSearch(bstVisArea, value, setHistoryList, hisnum, displayMessage) {
    const numValue = Number(value);
    if (!binarySearchTree.root) {
        displayMessage("The tree is empty!");
        return;
    }

    const tl = gsap.timeline({ paused: true });
    let found = false;
    let currentNode = binarySearchTree.root;

    while (currentNode) {
        const visualNode = bstVisArea.querySelector(`.bst-node[data-value="${currentNode.value}"]`);
        if (visualNode) {
            animateNode(visualNode, tl);
        }

        if (numValue === currentNode.value) {
            found = true;
            tl.to(visualNode, { duration: 0.5, scale: 1.5, ease: 'back.out(1.7)', yoyo: true, repeat: 1 });
            break;
        } else if (numValue < currentNode.value) {
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }
    }
    await tl.play();
    tl.clear();

    if (found) {
        displayMessage(`Found value ${numValue}.`);
    } else {
        displayMessage(`Value ${numValue} not found in the tree.`);
    }
    setHistoryList(prev => [...prev, { id: hisnum, text: `Searched for value ${numValue}.` }]);
}

export async function findMaxValue(bstVisArea, setHistoryList, hisnum, displayMessage) {
    if (!binarySearchTree.root) {
        displayMessage("The tree is empty!");
        return;
    }

    const tl = gsap.timeline({ paused: true });
    let currentNode = binarySearchTree.root;
    let maxValue = currentNode.value;

    while (currentNode) {
        const visualNode = bstVisArea.querySelector(`.bst-node[data-value="${currentNode.value}"]`);
        if (visualNode) animateNode(visualNode, tl);

        if (currentNode.right) {
            currentNode = currentNode.right;
            maxValue = currentNode.value;
        } else {
            break;
        }
    }

    await tl.play();
    tl.clear();

    const visualNode = bstVisArea.querySelector(`.bst-node[data-value="${maxValue}"]`);
    if (visualNode) {
        tl.to(visualNode, { duration: 0.5, scale: 1.5, ease: 'back.out(1.7)', yoyo: true, repeat: 1 });
    }

    await tl.play();
    
    displayMessage(`The maximum value in the tree is: ${maxValue}`);
    setHistoryList(prev => [...prev, { id: hisnum, text: `Found maximum value: ${maxValue}.` }]);
}

export async function findMinValue(bstVisArea, setHistoryList, hisnum, displayMessage) {
    if (!binarySearchTree.root) {
        displayMessage("The tree is empty!");
        return;
    }

    const tl = gsap.timeline({ paused: true });
    let currentNode = binarySearchTree.root;
    let minValue = currentNode.value;

    while (currentNode) {
        const visualNode = bstVisArea.querySelector(`.bst-node[data-value="${currentNode.value}"]`);
        if (visualNode) animateNode(visualNode, tl);

        if (currentNode.left) {
            currentNode = currentNode.left;
            minValue = currentNode.value;
        } else {
            break;
        }
    }

    await tl.play();
    tl.clear();

    const visualNode = bstVisArea.querySelector(`.bst-node[data-value="${minValue}"]`);
    if (visualNode) {
        tl.to(visualNode, { duration: 0.5, scale: 1.5, ease: 'back.out(1.7)', yoyo: true, repeat: 1 });
    }

    await tl.play();

    displayMessage(`The minimum value in the tree is: ${minValue}`);
    setHistoryList(prev => [...prev, { id: hisnum, text: `Found minimum value: ${minValue}.` }]);
}