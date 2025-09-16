import { useState } from "react";
import Game from "./components/TicTacToe/Game.jsx";
import MemoryGame from "./components/Memory/MemoryGame.jsx";

export default function App() {
  const [togglePage, setTogglePage] = useState(false);

  return (
    <div className="app-container">
      <div className="togglePageContainer">
        <h1>My React Playground</h1>
        <button onClick={() => setTogglePage(!togglePage)}>Toggle Game</button>
      </div>

      {!togglePage ? <Game /> : <MemoryGame />}
    </div>
  );
}
