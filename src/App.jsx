import { useState } from "react";
import TicTacToe from "./pages/TicTacToe.jsx";
import Memory from "./pages/Memory.jsx";
import About from "./pages/About.jsx";
import Layout from "./components/Layout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default function App() {
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TicTacToe />} />
          <Route path="/memory" element={<Memory />} />  
          <Route path="/about" element={<About />} />        
        </Routes>
          <div className="app-container">
                     
          </div>
      </Layout>
    </Router>
    
  );
}
