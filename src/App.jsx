import { useState } from "react";
import Game from "./components/TicTacToe/Game.jsx";
import MemoryGame from "./components/Memory/MemoryGame.jsx";
import Layout from "./layout/layout.jsx";

export default function App() {
  const [togglePage, setTogglePage] = useState(false);

  return (
    <Layout>
    <div className="app-container">
      <div className="togglePageContainer">
        <h2>Mendokse</h2>
        <button onClick={() => setTogglePage(!togglePage)}>Toggle Game</button>
      </div>

      {!togglePage ? <Game /> : <MemoryGame />}
    </div>
    </Layout>
  );
}
