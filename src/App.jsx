import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from './Pages/Index';
import Features from './Pages/Features';
import Documentation from './Pages/Documentation';
import About from './Pages/About';
import Contact from './Pages/Contact';
import NotFound from './Pages/NotFound';
import StackVisualizer from "./Pages/StackVisualizer";
import QueueVisualizer from "./Pages/QueueVisualizer";
import LinkedListVisualizer from "./Pages/LinkedListVisualizer";
import DoublyLinkedListVisualizer from "./Pages/DoublyLinkedListVisualizer";
import ScrollToTop from "./components/ScrollToTop";
import BinaryTreeVisualizer from "./Pages/BinaryTreeVisualizer";
import Bst from "./Pages/Bst";
import MaxHeapVisualizer from "./Pages/MaxHeapVisualizer";
import MinHeapVisualizer from "./Pages/MinHeapVisualizer";
import AvlTreeVisualizer from "./Pages/AvlTreeVisualizer";


const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/features" element={<Features />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/visualization/stack" element={<StackVisualizer />} />
        <Route path="/visualization/Queue" element={<QueueVisualizer />} />
        <Route path="/visualization/SinglyLinkedList" element={<LinkedListVisualizer />} />
        <Route path="/visualization/DoublyLinkedList" element={<DoublyLinkedListVisualizer />} />
        <Route path="/visualization/BinaryTree" element={<BinaryTreeVisualizer />} />
        <Route path="/visualization/BinarySearchTree" element={<Bst />} />
        <Route path="/visualization/MaxHeap" element={<MaxHeapVisualizer />} />
        <Route path="/visualization/MinHeap" element={<MinHeapVisualizer />} />
        <Route path="/visualization/AVLTree" element={<AvlTreeVisualizer />} />
        {/* fallback for invalid routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;