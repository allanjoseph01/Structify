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
        const q = [this.root];
        
        while(q.length > 0) {
            const node = q.shift();
            deepestNode = node;
            
            if (node.value === value) {
                targetNode = node;
            }

            if (node.left) {
                if (node.left.left || node.left.right) {
                    deepestParent = node;
                }
                q.push(node.left);
            }
            if (node.right) {
                if (node.right.left || node.right.right) {
                    deepestParent = node;
                }
                q.push(node.right);
            }
        }

        // Special case: if deepestParent is null, it means the deepest node is the root or a child of the root.
        // We need to find the actual parent. This is a simple BFS traversal.
        if (deepestParent === null && deepestNode !== this.root) {
            const q2 = [this.root];
            while (q2.length > 0) {
                const node = q2.shift();
                if (node.left === deepestNode || node.right === deepestNode) {
                    deepestParent = node;
                    break;
                }
                if (node.left) q2.push(node.left);
                if (node.right) q2.push(node.right);
            }
        }


        return { target: targetNode, deepest: deepestNode, deepestParent: deepestParent };
    }

    delete(value) {
        if (!this.root) return false;

        // Handle root deletion as a special case
        if (this.root.value === value && !this.root.left && !this.root.right) {
            this.root = null;
            return true;
        }

        const { target, deepest, deepestParent } = this.findDeepestAndTarget(value);

        if (target) {
            if (target === deepest) {
                if (deepestParent.left === deepest) deepestParent.left = null;
                else deepestParent.right = null;
                return true;
            }
            target.value = deepest.value;
            if (deepestParent) {
                if (deepestParent.left === deepest) deepestParent.left = null;
                else deepestParent.right = null;
            } else {
                // If the deepest parent is null, the deepest node must be a child of the root.
                if (this.root.left === deepest) this.root.left = null;
                else if (this.root.right === deepest) this.root.right = null;
            }
            return true;
        }
        return false;
    }
}

export const binaryTree = new BinaryTree();

/**
 * A utility function to animate a visual node.
 * @param {HTMLElement} visualNode 
 * @param {object} tl - GSAP timeline
 */
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
        placeholderText.textContent = 'Your Binary Tree will appear here 👇';
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
        const startY = p.parent.y + nodeSize / 2;
        const endX = p.x;
        const endY = p.y + nodeSize / 2;

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", `M ${startX} ${startY} L ${endX} ${endY}`);
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
    const tl = gsap.timeline({ paused: true });

    if (!binaryTree.root) {
        binaryTree.insert(numValue);
        renderTree(btVisArea);
        const rootEl = btVisArea.querySelector('.bt-node');
        gsap.from(rootEl, {
            duration: 0.8,
            y: -150,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
        setHistoryList(prev => [...prev, { id: hisnum, text: `Inserted value ${numValue} into the tree.` }]);
        return;
    }

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

    const leftWidth = insertionParent.left ? insertionParent.left.subtreeWidth : 0;
    const rightWidth = insertionParent.right ? insertionParent.right.subtreeWidth : 0;

    const childCenterX = (insertionType === 'left')
        ? parentCenterX - (rightWidth + minGap) / 2
        : parentCenterX + (leftWidth + minGap) / 2;

    const targetLeft = Math.round(childCenterX - nodeSize / 2);
    const targetTop = parentTop + levelGap;

    const temp = document.createElement('div');
    temp.classList.add('bt-node', 'temporary');
    temp.textContent = numValue;
    temp.dataset.value = numValue;
    temp.style.position = 'absolute';
    temp.style.left = `${targetLeft}px`;
    temp.style.top = `${targetTop}px`;
    btVisArea.appendChild(temp);

    tl.from(temp, {
        duration: 1,
        y: -150,
        scale: 0,
        opacity: 0,
        ease: 'back.out(1.7)'
    });

    await tl.play();
    temp.remove();

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
        const logicalQueue = [binaryTree.root];
        while (logicalQueue.length) {
            const node = logicalQueue.shift();
            const visualNode = btVisArea.querySelector(`.bt-node[data-value="${node.value}"]`);
            if (visualNode) {
                animateNode(visualNode, tl);
            }
            if (node === target) break;
            if (node.left) logicalQueue.push(node.left);
            if (node.right) logicalQueue.push(node.right);
        }

        const targetVisualNode = btVisArea.querySelector(`.bt-node[data-value="${target.value}"]`);
        const deepestVisualNode = btVisArea.querySelector(`.bt-node[data-value="${deepest.value}"]`);

        if (targetVisualNode && deepestVisualNode && target !== deepest) {
            tl.to(deepestVisualNode, {
                duration: 0.8,
                x: targetVisualNode.offsetLeft - deepestVisualNode.offsetLeft,
                y: targetVisualNode.offsetTop - deepestVisualNode.offsetTop,
                onComplete: () => {
                    targetVisualNode.textContent = deepestVisualNode.textContent;
                }
            });
        }
        
        tl.to(deepestVisualNode, {
            duration: 0.8,
            y: "+=150",
            opacity: 0,
            ease: "power2.in"
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

export async function handleTraversal(btVisArea, type, setHistoryList, hisnum, displayMessage) {
    if (!binaryTree.root) {
        displayMessage("The tree is empty! Please insert some nodes first.");
        return;
    }

    const tl = gsap.timeline();
    const getVisualNode = (node) => btVisArea.querySelector(`.bt-node[data-value="${node.value}"]`);
    
    switch (type) {
        case 'inorder':
            await inOrderTraversal(binaryTree.root, tl, getVisualNode);
            setHistoryList(prev => [...prev, { id: hisnum, text: `Initiated inorder traversal.` }]);
            break;
        case 'preorder':
            await preOrderTraversal(binaryTree.root, tl, getVisualNode);
            setHistoryList(prev => [...prev, { id: hisnum, text: `Initiated preorder traversal.` }]);
            break;
        case 'postorder':
            await postOrderTraversal(binaryTree.root, tl, getVisualNode);
            setHistoryList(prev => [...prev, { id: hisnum, text: `Initiated postorder traversal.` }]);
            break;
        case 'levelorder':
            await levelOrderTraversal(tl, getVisualNode);
            setHistoryList(prev => [...prev, { id: hisnum, text: `Initiated level-order traversal.` }]);
            break;
        default:
            return;
    }
    displayMessage(`Traversal completed: ${type}`);
    tl.play();
}

async function inOrderTraversal(node, tl, getVisualNode) {
    if (node) {
        if (node.left) await inOrderTraversal(node.left, tl, getVisualNode);
        const visualNode = getVisualNode(node);
        if (visualNode) animateNode(visualNode, tl);
        if (node.right) await inOrderTraversal(node.right, tl, getVisualNode);
    }
}

async function preOrderTraversal(node, tl, getVisualNode) {
    if (node) {
        const visualNode = getVisualNode(node);
        if (visualNode) animateNode(visualNode, tl);
        if (node.left) await preOrderTraversal(node.left, tl, getVisualNode);
        if (node.right) await preOrderTraversal(node.right, tl, getVisualNode);
    }
}

async function postOrderTraversal(node, tl, getVisualNode) {
    if (node) {
        if (node.left) await postOrderTraversal(node.left, tl, getVisualNode);
        if (node.right) await postOrderTraversal(node.right, tl, getVisualNode);
        const visualNode = getVisualNode(node);
        if (visualNode) animateNode(visualNode, tl);
    }
}

async function levelOrderTraversal(tl, getVisualNode) {
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