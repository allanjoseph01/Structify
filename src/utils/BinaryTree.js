import { gsap } from 'gsap';

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.subtreeWidth = 0;
    }
}

class BinaryTree {
    constructor() { this.root = null; }

    insert(value) {
        const n = new Node(value);
        if (!this.root) { this.root = n; return; }
        const q = [this.root];
        while (q.length) {
            const cur = q.shift();
            if (!cur.left) { cur.left = n; return; } else q.push(cur.left);
            if (!cur.right) { cur.right = n; return; } else q.push(cur.right);
        }
    }

    findDeepestAndTarget(value) {
        if (!this.root) return { target: null, deepest: null, deepestParent: null };
        
        let targetNode = null;
        let deepestNode = null;
        let deepestParent = null;
        const q = [{node: this.root, parent: null}];

        let head = 0;
        while(head < q.length) {
            const {node, parent} = q[head++];
            
            deepestNode = node;
            deepestParent = parent;

            if (node.value === value) {
                targetNode = node;
            }

            if (node.left) {
                q.push({node: node.left, parent: node});
            }
            if (node.right) {
                q.push({node: node.right, parent: node});
            }
        }
        
        return { target: targetNode, deepest: deepestNode, deepestParent: deepestParent };
    }

    delete(value) {
        if (!this.root) return false;

        if (this.root.value === value && !this.root.left && !this.root.right) {
            this.root = null;
            return true;
        }

        const { target, deepest, deepestParent } = this.findDeepestAndTarget(value);

        if (target) {
            if (target === deepest) {
                if (deepestParent) {
                    if (deepestParent.left === deepest) deepestParent.left = null;
                    else deepestParent.right = null;
                }
                return true;
            }
            target.value = deepest.value;
            if (deepestParent) {
                if (deepestParent.left === deepest) deepestParent.left = null;
                else deepestParent.right = null;
            }
            return true;
        }
        return false;
    }
}

export const binaryTree = new BinaryTree();

const animateNode = (visualNode, tl) => {
    tl.to(visualNode, { duration: 0.5, scale: 1.3, ease: 'power1.inOut' });
    tl.to(visualNode, { duration: 0.25, scale: 1, ease: 'power1.inOut' }, '>-0.15');
};

function renderTree(btVisArea, root = binaryTree.root) {
    if (!btVisArea) return;
    btVisArea.innerHTML = "";

    const cs = getComputedStyle(btVisArea);
    if (cs.position === "static") btVisArea.style.position = "relative";

    if (!root) {
        const placeholderText = document.createElement('p');
        placeholderText.classList.add('text-gray-400', 'italic', 'text-base');
        placeholderText.textContent = '';
        btVisArea.appendChild(placeholderText);
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
    btVisArea.appendChild(svg);

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
    const rootX = btVisArea.clientWidth / 2;
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
        el.classList.add("bt-node");
        el.dataset.value = p.node.value;
        el.textContent = p.node.value;

        el.style.position = "absolute";
        el.style.left = `${Math.round(p.x - nodeSize / 2)}px`;
        el.style.top = `${Math.round(p.y)}px`;
        el.style.width = `${nodeSize}px`;
        el.style.height = `${nodeSize}px`;
        el.style.lineHeight = `${nodeSize}px`;
        el.style.zIndex = "1";

        btVisArea.appendChild(el);
    });
}

export async function handleInsert(btVisArea, value, setHistoryList, hisnum, displayMessage) {
    const numValue = Number(value);
    const nodeSize = 50;
    const levelGap = 100;
    const minGap = 50;
    const tl = gsap.timeline();

    if (!binaryTree.root) {
        binaryTree.insert(numValue);
        renderTree(btVisArea);
        const rootEl = btVisArea.querySelector('.bt-node');
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

    // Capture current state for animation path
    const originalPositions = [];
    const positionsToAnimate = {};
    function computeWidths(node) {
        if (!node) return 0;
        const lw = computeWidths(node.left);
        const rw = computeWidths(node.right);
        node.subtreeWidth = (!node.left && !node.right)
            ? nodeSize
            : lw + minGap + rw;
        return node.subtreeWidth;
    }
    computeWidths(binaryTree.root);

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
    assign(binaryTree.root, btVisArea.clientWidth / 2, 50);

    // Find insertion parent node
    const q = [binaryTree.root];
    let insertionParent = null;
    let insertionType = '';
    while (q.length) {
        const node = q.shift();
        const vis = btVisArea.querySelector(`.bt-node[data-value="${node.value}"]`);
        if (vis) {
            animateNode(vis, tl);
        }

        if (!node.left) { insertionParent = node; insertionType = 'left'; break; } else q.push(node.left);
        if (!node.right) { insertionParent = node; insertionType = 'right'; break; } else q.push(node.right);
    }
    
    await tl.play();
    tl.clear();

    const parentEl = btVisArea.querySelector(`.bt-node[data-value="${insertionParent.value}"]`);
    const parentCenterX = parentEl.offsetLeft + nodeSize / 2;
    const parentTop = parentEl.offsetTop;

    // Temporarily insert the node to get the final layout
    const tempTree = new BinaryTree();
    Object.assign(tempTree, JSON.parse(JSON.stringify(binaryTree)));
    tempTree.insert(numValue);

    const projectedPositions = [];
    function computeProjectedWidths(node) {
        if (!node) return 0;
        const lw = computeProjectedWidths(node.left);
        const rw = computeProjectedWidths(node.right);
        node.subtreeWidth = (!node.left && !node.right)
            ? nodeSize
            : lw + minGap + rw;
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
    assignProjected(tempTree.root, btVisArea.clientWidth / 2, 50);

    // Find position of new node
    const newPos = projectedPositions.find(p => p.node.value === numValue);
    const targetLeft = Math.round(newPos.x - nodeSize / 2);
    const targetTop = Math.round(newPos.y);

    // Animate existing nodes to their new positions
    tl.add(gsap.timeline());
    originalPositions.forEach(origPos => {
        const newPos = projectedPositions.find(p => p.node.value === origPos.node.value);
        if (newPos) {
            const el = btVisArea.querySelector(`.bt-node[data-value="${origPos.node.value}"]`);
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

    // Animate new node drop
    const tempNodeEl = document.createElement('div');
    tempNodeEl.classList.add('bt-node', 'temporary');
    tempNodeEl.textContent = numValue;
    tempNodeEl.dataset.value = numValue;
    tempNodeEl.style.position = 'absolute';
    // Set initial state to be invisible at the start of the animation
    tempNodeEl.style.left = `${targetLeft}px`;
    tempNodeEl.style.top = `-50px`;
    tempNodeEl.style.scale = 0;
    tempNodeEl.style.opacity = 0;
    btVisArea.appendChild(tempNodeEl);

    tl.to(tempNodeEl, {
        duration: 0.8,
        y: `${targetTop}px`,
        scale: 1,
        opacity: 1,
        ease: 'back.out(1.7)'
    }, "<0.2");

    await tl.play();

    binaryTree.insert(numValue);
    setHistoryList(prev => [...prev, { id: hisnum, text: `Inserted value ${numValue} into the tree.` }]);
    renderTree(btVisArea);
}

export async function handleDelete(btVisArea, value, setHistoryList, hisnum, displayMessage) {
    const numValue = Number(value);
    if (!binaryTree.root) {
        displayMessage("The tree is empty!");
        return;
    }

    const tl = gsap.timeline({ paused: true });
    const { target, deepest, deepestParent } = binaryTree.findDeepestAndTarget(numValue);

    if (target) {
        if (target === binaryTree.root && !binaryTree.root.left && !binaryTree.root.right) {
            const targetVisualNode = btVisArea.querySelector(`.bt-node[data-value="${target.value}"]`);
            if (targetVisualNode) {
                tl.to(targetVisualNode, { duration: 0.8, y: "+=150", opacity: 0, ease: "power2.in" });
                await tl.play();
                binaryTree.delete(numValue);
                setHistoryList(prev => [...prev, { id: hisnum, text: `Deleted root value ${numValue} from the tree.` }]);
                renderTree(btVisArea);
            }
            return;
        }

        const logicalQueue = [binaryTree.root];
        while (logicalQueue.length) {
            const node = logicalQueue.shift();
            const visualNode = btVisArea.querySelector(`.bt-node[data-value="${node.value}"]`);
            if (visualNode) animateNode(visualNode, tl);
            if (node === target) break;
            if (node.left) logicalQueue.push(node.left);
            if (node.right) logicalQueue.push(node.right);
        }

        const targetVisualNode = btVisArea.querySelector(`.bt-node[data-value="${target.value}"]`);
        const deepestVisualNode = btVisArea.querySelector(`.bt-node[data-value="${deepest.value}"]`);
        
        if (targetVisualNode && deepestVisualNode && target !== deepest) {
            const initialX = gsap.getProperty(deepestVisualNode, 'x');
            const initialY = gsap.getProperty(deepestVisualNode, 'y');

            tl.to(deepestVisualNode, {
                duration: 0.8,
                x: (targetVisualNode.offsetLeft - deepestVisualNode.offsetLeft) + initialX,
                y: (targetVisualNode.offsetTop - deepestVisualNode.offsetTop) + initialY,
                ease: "power2.inOut",
                onComplete: () => {
                    targetVisualNode.textContent = deepestVisualNode.textContent;
                    targetVisualNode.dataset.value = deepestVisualNode.dataset.value;
                }
            });
        }
        
        tl.to(deepestVisualNode, {
            duration: 0.8,
            y: "+=150",
            opacity: 0,
            ease: "power2.in",
            onComplete: () => {
                if (deepestVisualNode) deepestVisualNode.remove();
            }
        }, ">-0.4");
        
        await tl.play();

        const success = binaryTree.delete(numValue);
        if (success) {
            setHistoryList(prev => [...prev, { id: hisnum, text: `Deleted value ${numValue} from the tree.` }]);
            renderTree(btVisArea);
        } else {
            displayMessage(`Value ${numValue} not found in the tree.`);
        }
    } else {
        displayMessage(`Value ${numValue} not found in the tree.`);
    }
}

export async function handleSearch(btVisArea, value, setHistoryList, hisnum, displayMessage) {
    const numValue = Number(value);
    if (!binaryTree.root) {
        displayMessage("The tree is empty!");
        return;
    }
    const tl = gsap.timeline({ paused: true });
    let found = false;
    const logicalQueue = [binaryTree.root];

    while(logicalQueue.length > 0) {
        const node = logicalQueue.shift();
        const visualNode = btVisArea.querySelector(`.bt-node[data-value="${node.value}"]`);

        if (visualNode) {
            animateNode(visualNode, tl);
        }

        if (node.value === numValue) {
            found = true;
            tl.to(visualNode, { duration: 0.5, scale: 1.5, ease: 'back.out(1.7)', yoyo: true, repeat: 1 });
            break;
        }
        
        if (node.left) logicalQueue.push(node.left);
        if (node.right) logicalQueue.push(node.right);
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

let traversalTimeline = gsap.timeline({ paused: true });

function resetNodes(btVisArea) {
    gsap.to(btVisArea.querySelectorAll('.bt-node'), {
        duration: 0.3,
        scale: 1,
        ease: 'power1.inOut'
    });
}

export async function handleTraversal(btVisArea, type, setHistoryList, hisnum, displayMessage) {
    if (!binaryTree.root) {
        displayMessage("The tree is empty! Please insert some nodes first.");
        return;
    }

    traversalTimeline.clear();
    resetNodes(btVisArea);

    const getVisualNode = (node) => btVisArea.querySelector(`.bt-node[data-value="${node.value}"]`);
    
    switch (type) {
        case 'inorder':
            inOrderTraversal(binaryTree.root, traversalTimeline, getVisualNode);
            setHistoryList(prev => [...prev, { id: hisnum, text: `Initiated inorder traversal.` }]);
            break;
        case 'preorder':
            preOrderTraversal(binaryTree.root, traversalTimeline, getVisualNode);
            setHistoryList(prev => [...prev, { id: hisnum, text: `Initiated preorder traversal.` }]);
            break;
        case 'postorder':
            postOrderTraversal(binaryTree.root, traversalTimeline, getVisualNode);
            setHistoryList(prev => [...prev, { id: hisnum, text: `Initiated postorder traversal.` }]);
            break;
        case 'levelorder':
            levelOrderTraversal(traversalTimeline, getVisualNode);
            setHistoryList(prev => [...prev, { id: hisnum, text: `Initiated level-order traversal.` }]);
            break;
        default:
            return;
    }
    displayMessage(`Traversal completed: ${type}`);
    traversalTimeline.play();
}

function inOrderTraversal(node, tl, getVisualNode) {
    if (node) {
        inOrderTraversal(node.left, tl, getVisualNode);
        const visualNode = getVisualNode(node);
        if (visualNode) animateNode(visualNode, tl);
        inOrderTraversal(node.right, tl, getVisualNode);
    }
}

function preOrderTraversal(node, tl, getVisualNode) {
    if (node) {
        const visualNode = getVisualNode(node);
        if (visualNode) animateNode(visualNode, tl);
        preOrderTraversal(node.left, tl, getVisualNode);
        preOrderTraversal(node.right, tl, getVisualNode);
    }
}

function postOrderTraversal(node, tl, getVisualNode) {
    if (node) {
        postOrderTraversal(node.left, tl, getVisualNode);
        postOrderTraversal(node.right, tl, getVisualNode);
        const visualNode = getVisualNode(node);
        if (visualNode) animateNode(visualNode, tl);
    }
}

function levelOrderTraversal(tl, getVisualNode) {
    if (!binaryTree.root) return;
    const queue = [binaryTree.root];
    while (queue.length > 0) {
        const node = queue.shift();
        const visualNode = getVisualNode(node);
        if (visualNode) animateNode(visualNode, tl);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
}