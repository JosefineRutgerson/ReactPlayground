import { useState } from "react";
import MemoryGame from "../components/MemoryGame.jsx";

export default function TicTacToe() {
  return (
    <div className="page-wrapper">
        <h1>Memory</h1>
        <MemoryGame />
    </div>
  );
}