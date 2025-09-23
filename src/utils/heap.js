import { gsap } from 'gsap';

export let heapArray = [];
let nextId = 1;
let hisNum = 1;
let isAnimating = false;

/* ---------------- GSAP helpers (promises) ---------------- */
const tweenTo = (el, vars) =>
    new Promise(resolve => gsap.to(el, { ...vars, onComplete: resolve }));

const tweenFrom = (el, vars) =>
    new Promise(resolve => gsap.from(el, { ...vars, onComplete: resolve }));

const tweenFromTo = (el, fromVars, toVars) =>
    new Promise(resolve => gsap.fromTo(el, { ...fromVars }, { ...toVars, onComplete: resolve }));

/* ---------------- Build Tree (with index) ---------------- */
function buildTreeFromHeapArray(index) {
    if (index >= heapArray.length) return null;
    const node = {
        id: heapArray[index].id,
        value: heapArray[index].value,
        index,
        left: buildTreeFromHeapArray(2 * index + 1),
        right: buildTreeFromHeapArray(2 * index + 2)
    };
    return node;
}

/* ---------------- DOM helpers ---------------- */
function getNodeElementById(id) {
    return document.querySelector(`.heap-node[data-id='${id}']`);
}

function getNodeElementByIndex(idx) {
    if (idx < 0 || idx >= heapArray.length) return null;
    return getNodeElementById(heapArray[idx].id);
}

/* ---------------- Render ---------------- */
export function renderTree(heapvisArea, root = buildTreeFromHeapArray(0)) {
    if (!heapvisArea) {
        console.error("HTML element with id 'heap-visualization-area' not found.");
        return;
    }
    heapvisArea.innerHTML = "";

    if (heapArray.length === 0) {
        const placeholderText = document.createElement('p');
        placeholderText.classList.add('text-gray-400', 'italic', 'text-base');
        placeholderText.textContent = '';
        heapvisArea.appendChild(placeholderText);
        return;
    }

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "0";
    heapvisArea.appendChild(svg);

    const nodeSize = 50;
    const nodeRadius = nodeSize / 2;
    const levelGap = 100;
    const minGap = 50;

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
            assign(node.left, lx, y + levelGap, { x, y, node });
        }
        if (node.right) {
            const rx = x + (lw + minGap) / 2;
            assign(node.right, rx, y + levelGap, { x, y, node });
        }
    }
    const rootX = heapvisArea.clientWidth / 2;
    const rootY = 50;
    assign(root, rootX, rootY);

    // edges
    positions.forEach(p => {
        if (!p.parent) return;

        const startX = p.parent.x;
        const startY = p.parent.y + nodeSize;
        const endX = p.x;
        const endY = p.y;

        const isLeftChild = endX < startX;
        const dx = Math.abs(endX - startX);
        const cx = (startX + endX) / 2 + (isLeftChild ? -dx * 0.25 : dx * 0.25);
        const cy = (startY + endY) / 2;

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`);
        path.setAttribute("stroke", "#00D3F3");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.style.filter = "drop-shadow(0 0 4px #00D3F3)";
        svg.appendChild(path);
    });

    // nodes
    positions.forEach(p => {
        const el = document.createElement("div");
        el.classList.add("heap-node");
        el.dataset.id = p.node.id;
        el.textContent = p.node.value;
        el.style.position = "absolute";
        el.style.left = `${Math.round(p.x - nodeRadius)}px`;
        el.style.top = `${Math.round(p.y)}px`;
        el.style.width = `${nodeSize}px`;
        el.style.height = `${nodeSize}px`;
        el.style.lineHeight = `${nodeSize}px`;
        el.style.zIndex = "1";
        heapvisArea.appendChild(el);
    });
}

/* ---------------- Max-heap helpers ---------------- */
function parentIndex(i) { return Math.floor((i - 1) / 2); }
function leftIndex(i) { return 2 * i + 1; }
function rightIndex(i) { return 2 * i + 2; }
function greaterAt(i, j) { return heapArray[i].value > heapArray[j].value; }

/* ---------------- Animations: swap ---------------- */
async function animateSwap(heapvisArea, i, j) {
    const el1 = getNodeElementByIndex(i);
    const el2 = getNodeElementByIndex(j);
    if (!el1 || !el2) return;

    const pos1 = { x: el1.offsetLeft, y: el1.offsetTop };
    const pos2 = { x: el2.offsetLeft, y: el2.offsetTop };

    await Promise.all([
        tweenFromTo(el1, { x: 0, y: 0 }, { x: pos2.x - pos1.x, y: pos2.y - pos1.y, duration: 0.45 }),
        tweenFromTo(el2, { x: 0, y: 0 }, { x: pos1.x - pos2.x, y: pos1.y - pos2.y, duration: 0.45 })
    ]);

    [heapArray[i], heapArray[j]] = [heapArray[j], heapArray[i]];
    renderTree(heapvisArea, buildTreeFromHeapArray(0));
}

/* ---------------- Heapify operations ---------------- */
async function heapifyUp(heapvisArea) {
    let i = heapArray.length - 1;
    while (i > 0) {
        const p = parentIndex(i);
        const curEl = getNodeElementByIndex(i);
        const parEl = getNodeElementByIndex(p);
        
        if (curEl && parEl) {
            // Highlight nodes being compared
            await Promise.all([
                tweenTo(curEl, { scale: 1.2, duration: 0.2, backgroundColor: '#00D3F3', color: '#0A1018' }),
                tweenTo(parEl, { scale: 1.2, duration: 0.2, backgroundColor: '#00D3F3', color: '#0A1018' })
            ]);
        }

        if (greaterAt(i, p)) {
            await animateSwap(heapvisArea, i, p);
            i = p;
        } else break;

        if (curEl && parEl) {
            // Revert highlight after comparison
            await Promise.all([
                tweenTo(curEl, { scale: 1, duration: 0.15, backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white' }),
                tweenTo(parEl, { scale: 1, duration: 0.15, backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white' })
            ]);
        }
    }
    await tweenTo(document.querySelectorAll('.heap-node'), { scale: 1, duration: 0.15 });
}

async function heapifyDown(heapvisArea) {
    let i = 0;
    const n = heapArray.length;

    while (true) {
        const l = leftIndex(i);
        const r = rightIndex(i);
        let largest = i;

        const curEl = getNodeElementByIndex(i);
        
        if (curEl) {
            await tweenTo(curEl, { scale: 1.2, duration: 0.15, backgroundColor: '#00D3F3', color: '#0A1018' });
        }

        if (l < n) {
            const lEl = getNodeElementByIndex(l);
            if (lEl) {
                await tweenTo(lEl, { scale: 1.15, duration: 0.15 });
            }
            if (greaterAt(l, largest)) largest = l;
        }
        if (r < n) {
            const rEl = getNodeElementByIndex(r);
            if (rEl) {
                await tweenTo(rEl, { scale: 1.15, duration: 0.15 });
            }
            if (greaterAt(r, largest)) largest = r;
        }
        
        await tweenTo(document.querySelectorAll('.heap-node'), { scale: 1, duration: 0.15, backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white' });

        if (largest !== i) {
            await animateSwap(heapvisArea, i, largest);
            i = largest;
        } else break;
    }
    await tweenTo(document.querySelectorAll('.heap-node'), { scale: 1, duration: 0.15 });
}

/* ---------------- Insert / Extract ---------------- */
export async function handleInsert(heapvisArea, value, setHistoryList, histNum, displayMessage) {
    if (isAnimating) {
        displayMessage("An animation is already in progress.");
        return;
    }
    isAnimating = true;

    const id = nextId++;
    heapArray.push({ id, value: Number(value) });

    const oldPositions = getElementPositionsById(heapvisArea);
    renderTree(heapvisArea, buildTreeFromHeapArray(0));
    
    const newEl = getNodeElementByIndex(heapArray.length - 1);
    if (newEl) {
        gsap.fromTo(newEl, 
            { y: -50, opacity: 0, scale: 0 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
        );
    }
    
    displayMessage(`Inserted ${value}. Now heapifying up.`);
    setHistoryList(prev => [...prev, { id: histNum, text: `Inserted value ${value}.` }]);

    await heapifyUp(heapvisArea);

    isAnimating = false;
    displayMessage("Insertion complete.");
    renderTree(heapvisArea, buildTreeFromHeapArray(0));
}

export async function handleExtractMax(heapvisArea, setHistoryList, histNum, displayMessage) {
    if (isAnimating || heapArray.length === 0) return;
    isAnimating = true;

    const rootId = heapArray[0].id;
    const rootEl = getNodeElementById(rootId);
    let maxVal = heapArray[0].value;
    
    if (rootEl) {
        await tweenTo(rootEl, { y: -200, opacity: 0, duration: 0.45, ease: "power2.in" });
    }

    if (heapArray.length === 1) {
        heapArray = [];
        renderTree(heapvisArea, buildTreeFromHeapArray(0));
    } else {
        const oldPositions = getElementPositionsById();
        heapArray[0] = heapArray[heapArray.length - 1];
        heapArray.pop();

        renderTree(heapvisArea, buildTreeFromHeapArray(0));

        const newPositions = getElementPositionsById();
        const ids = Object.keys(newPositions);
        await Promise.all(ids.map(id => {
            const el = getNodeElementById(id);
            if (!el || !oldPositions[id]) return Promise.resolve();
            const dx = oldPositions[id].x - newPositions[id].x;
            const dy = oldPositions[id].y - newPositions[id].y;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
            return tweenTo(el, { x: 0, y: 0, duration: 0.45 });
        }));
    }

    displayMessage(`Extracted max value (${maxVal}). Now heapifying down.`);
    setHistoryList(prev => [...prev, { id: histNum, text: `Extracted max value: ${maxVal}.` }]);

    await heapifyDown(heapvisArea);

    isAnimating = false;
    displayMessage("Deletion complete.");
    renderTree(heapvisArea, buildTreeFromHeapArray(0));
}

/* ---------------- Utilities ---------------- */
function getElementPositionsById() {
    const positions = {};
    document.querySelectorAll('.heap-node').forEach(el => {
        positions[el.dataset.id] = { x: el.offsetLeft, y: el.offsetTop };
    });
    return positions;
}