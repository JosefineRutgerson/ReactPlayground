import { useState } from "react";
import Game from "../components/Game.jsx";

export default function TicTacToe() {
  return (
    <div className="page-wrapper">
        <h1>Tic Tac Toe</h1>
        <Game />
    </div>
  );
}