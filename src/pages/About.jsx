import { useState } from "react";
import laugh from "../img/laugh.png";

export default function TicTacToe() {
  return (
    <div className="page-wrapper">
        <h1>About this place</h1>
        <h2>Intro</h2>
        <p>Hello there!</p>
        <p>This is my react playground where I work on my react skills while developing fun things. <img src={laugh} alt="Logo" width="40" height="40" /></p>
    </div>
  );
}