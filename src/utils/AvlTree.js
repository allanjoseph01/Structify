import { gsap } from 'gsap';

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
        this.subtreeWidth = 0;
    }
}

class AVLTree {
    constructor() { this.root = null; }
    height(node) { return node ? node.height : 0; }
    getBalance(node) { return node ? this.height(node.left) - this.height(node.right) : 0; }

    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
        x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
        return x;
    }

    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
        y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
        return y;
    }

    insertNode(node, value) {
        if (!node) return new Node(value);
        if (value < node.value) node.left = this.insertNode(node.left, value);
        else if (value > node.value) node.right = this.insertNode(node.right, value);
        else return node; // no duplicates
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        const balance = this.getBalance(node);
        if (balance > 1 && value < node.left.value) return this.rightRotate(node);
        if (balance < -1 && value > node.right.value) return this.leftRotate(node);
        if (balance > 1 && value > node.left.value) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1 && value < node.right.value) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;
    }

    insert(value) { this.root = this.insertNode(this.root, value); }

    minValueNode(node) {
        let current = node;
        while (current.left) current = current.left;
        return current;
    }

    deleteNode(root, value) {
        if (!root) return root;

        if (value < root.value) root.left = this.deleteNode(root.left, value);
        else if (value > root.value) root.right = this.deleteNode(root.right, value);
        else {
            if (!root.left || !root.right) {
                const temp = root.left ? root.left : root.right;
                root = temp ? temp : null;
            } else {
                const temp = this.minValueNode(root.right);
                root.value = temp.value;
                root.right = this.deleteNode(root.right, temp.value);
            }
        }

        if (!root) return root;

        root.height = 1 + Math.max(this.height(root.left), this.height(root.right));
        const balance = this.getBalance(root);

        if (balance > 1 && this.getBalance(root.left) >= 0) return this.rightRotate(root);
        if (balance > 1 && this.getBalance(root.left) < 0) {
            root.left = this.leftRotate(root.left);
            return this.rightRotate(root);
        }
        if (balance < -1 && this.getBalance(root.right) <= 0) return this.leftRotate(root);
        if (balance < -1 && this.getBalance(root.right) > 0) {
            root.right = this.rightRotate(root.right);
            return this.leftRotate(root);
        }
        return root;
    }

    delete(value) { this.root = this.deleteNode(this.root, value); }
}

export const avlTree = new AVLTree();
let hisnum = 1;

const tweenTo = (el, vars) =>
    new Promise(resolve => gsap.to(el, { ...vars, onComplete: resolve }));

const animateNode = (visualNode, tl) => {
    tl.to(visualNode, { duration: 0.5, scale: 1.3, ease: 'power1.inOut' });
    tl.to(visualNode, { duration: 0.25, scale: 1, ease: 'power1.inOut' }, '>-0.15');
};

function getNodePositions(container) {
    const positions = {};
    container.querySelectorAll(".avl-node").forEach(el => {
        positions[el.dataset.value] = {
            x: el.offsetLeft,
            y: el.offsetTop
        };
    });
    return positions;
}

function animateTreeRebalance(container, oldPos, newPos) {
    const tl = gsap.timeline();
    Object.keys(newPos).forEach(val => {
        const old = oldPos[val];
        const current = newPos[val];
        if (!old) return;
        
        const dx = old.x - current.x;
        const dy = old.y - current.y;

        if (dx !== 0 || dy !== 0) {
            const el = getVisualNode(container, val);
            if (el) {
                tl.fromTo(el,
                    { x: dx, y: dy },
                    { x: 0, y: 0, duration: 0.8, ease: "power2.inOut" }, '<'
                );
            }
        }
    });
    return tl;
}

function getVisualNode(container, value) {
    return container.querySelector(`.avl-node[data-value="${value}"]`);
}

export function renderTree(avlVisArea, root = avlTree.root) {
    if (!avlVisArea) return;
    avlVisArea.innerHTML = "";

    const cs = getComputedStyle(avlVisArea);
    if (cs.position === "static") avlVisArea.style.position = "relative";

    if (!root) {
        const placeholderText = document.createElement('p');
        placeholderText.classList.add('text-gray-400', 'italic', 'text-base');
        placeholderText.textContent = '';
        avlVisArea.appendChild(placeholderText);
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
    avlVisArea.appendChild(svg);

    function computeWidths(node) {
        if (!node) return 0;
        const lw = computeWidths(node.left);
        const rw = computeWidths(node.right);
        node.subtreeWidth = (!node.left && !node.right) ? nodeSize : lw + minGap + rw;
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
    const rootX = avlVisArea.clientWidth / 2;
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
        el.classList.add("avl-node");
        el.dataset.value = p.node.value;
        el.textContent = p.node.value;

        el.style.position = "absolute";
        el.style.left = `${Math.round(p.x - nodeSize / 2)}px`;
        el.style.top = `${Math.round(p.y)}px`;
        el.style.width = `${nodeSize}px`;
        el.style.height = `${nodeSize}px`;
        el.style.lineHeight = `${nodeSize}px`;
        el.style.zIndex = "1";
        avlVisArea.appendChild(el);
    });
}

export async function handleInsert(avlVisArea, value, setHistoryList, hisNum, displayMessage) {
    const numValue = Number(value);
    const nodeSize = 50;
    const levelGap = 100;
    const minGap = 50;

    let tempNode = avlTree.root;
    while (tempNode) {
        if (tempNode.value === numValue) {
            displayMessage(`Value ${numValue} already exists.`);
            return;
        }
        tempNode = (numValue < tempNode.value) ? tempNode.left : tempNode.right;
    }

    if (!avlTree.root) {
        avlTree.insert(numValue);
        renderTree(avlVisArea);
        const rootEl = avlVisArea.querySelector('.avl-node');
        if (rootEl) {
            gsap.from(rootEl, {
                duration: 0.8,
                y: -150,
                scale: 0,
                opacity: 0,
                ease: 'back.out(1.7)'
            });
        }
        setHistoryList(prev => [...prev, { id: hisNum, text: `Inserted value ${numValue}.` }]);
        return;
    }

    const oldPos = getNodePositions(avlVisArea);
    const tl = gsap.timeline();
    
    let traversalNode = avlTree.root;
    while(traversalNode) {
        const vis = getVisualNode(avlVisArea, traversalNode.value);
        if (vis) animateNode(vis, tl);
        traversalNode = (numValue < traversalNode.value) ? traversalNode.left : traversalNode.right;
    }

    await tl.play();
    tl.clear();

    const tempTree = new AVLTree();
    Object.assign(tempTree, JSON.parse(JSON.stringify(avlTree)));
    tempTree.insert(numValue);

    const projectedPositions = [];
    function computeWidths(node) {
        if (!node) return 0;
        const lw = computeWidths(node.left);
        const rw = computeWidths(node.right);
        node.subtreeWidth = (!node.left && !node.right) ? nodeSize : lw + minGap + rw;
        return node.subtreeWidth;
    }
    computeWidths(tempTree.root);

    function assignProjected(node, x, y) {
        if (!node) return;
        const lw = node.left ? node.left.subtreeWidth : 0;
        const rw = node.right ? node.right.subtreeWidth : 0;
        projectedPositions.push({ node, x, y });
        if (node.left) {
            const lx = x - (rw + minGap) / 2;
            assignProjected(node.left, lx, y + levelGap);
        }
        if (node.right) {
            const rx = x + (lw + minGap) / 2;
            assignProjected(node.right, rx, y + levelGap);
        }
    }
    assignProjected(tempTree.root, avlVisArea.clientWidth / 2, 50);

    const newNodePos = projectedPositions.find(p => p.node.value === numValue);
    const targetLeft = Math.round(newNodePos.x - nodeSize / 2);
    const targetTop = Math.round(newNodePos.y);

    const tempNodeEl = document.createElement('div');
    tempNodeEl.classList.add('avl-node', 'temporary');
    tempNodeEl.textContent = numValue;
    tempNodeEl.dataset.value = numValue;
    tempNodeEl.style.position = 'absolute';
    tempNodeEl.style.left = `${targetLeft}px`;
    tempNodeEl.style.top = `-50px`;
    tempNodeEl.style.scale = 0;
    tempNodeEl.style.opacity = 0;
    avlVisArea.appendChild(tempNodeEl);

    await tweenTo(tempNodeEl, {
        duration: 0.8,
        top: `${targetTop}px`,
        scale: 1,
        opacity: 1,
        ease: 'back.out(1.7)'
    });

    avlTree.insert(numValue);
    renderTree(avlVisArea);
    const newPos = getNodePositions(avlVisArea);
    const rebalanceTl = animateTreeRebalance(avlVisArea, oldPos, newPos);

    await rebalanceTl.play();

    setHistoryList(prev => [...prev, { id: hisNum, text: `Inserted value ${numValue}.` }]);
    displayMessage(`Inserted ${numValue}. AVL tree rebalanced.`);
}

export async function handleDelete(avlVisArea, value, setHistoryList, hisNum, displayMessage) {
    const numValue = Number(value);
    if (!avlTree.root) {
        displayMessage("The tree is empty!");
        return;
    }
    
    const oldPos = getNodePositions(avlVisArea);
    const tl = gsap.timeline();

    let currentNode = avlTree.root;
    let foundNode = null;

    while (currentNode) {
        const vis = getVisualNode(avlVisArea, currentNode.value);
        if (vis) animateNode(vis, tl);
        if (numValue === currentNode.value) {
            foundNode = currentNode;
            break;
        }
        currentNode = numValue < currentNode.value ? currentNode.left : currentNode.right;
    }

    await tl.play();
    tl.clear();

    if (!foundNode) {
        displayMessage(`Value ${numValue} not found.`);
        return;
    }

    const visNode = getVisualNode(avlVisArea, foundNode.value);
    if (visNode) {
        await tweenTo(visNode, { duration: 0.5, scale: 0, opacity: 0, ease: 'power1.in' });
    }

    avlTree.delete(numValue);
    renderTree(avlVisArea);
    const newPos = getNodePositions(avlVisArea);
    const rebalanceTl = animateTreeRebalance(avlVisArea, oldPos, newPos);

    await rebalanceTl.play();

    setHistoryList(prev => [...prev, { id: hisNum, text: `Deleted ${numValue}. AVL tree rebalanced.` }]);
    displayMessage(`Deleted ${numValue}. AVL tree rebalanced.`);
}

export async function handleSearch(avlVisArea, value, setHistoryList, hisNum, displayMessage) {
    const numValue = Number(value);
    if (!avlTree.root) {
        displayMessage("The tree is empty!");
        return;
    }

    const tl = gsap.timeline();
    let found = false;
    let currentNode = avlTree.root;

    while (currentNode) {
        const el = getVisualNode(avlVisArea, currentNode.value);
        if (el) animateNode(el, tl);
        
        if (numValue === currentNode.value) {
            found = true;
            await tweenTo(el, { duration: 0.5, scale: 1.5, borderColor: '#ffc400', color: '#ffc400', ease: 'back.out(1.7)' });
            await tweenTo(el, { duration: 0.5, scale: 1, borderColor: '#00D3F3', color: 'white', ease: 'back.out(1.7)' });
            break;
        }
        currentNode = numValue < currentNode.value ? currentNode.left : currentNode.right;
    }

    await tl.play();
    
    if (found) {
        displayMessage(`Found ${numValue}.`);
    } else {
        displayMessage(`${numValue} not found.`);
    }

    setHistoryList(prev => [...prev, { id: hisNum, text: `Searched for ${numValue}.` }]);
}