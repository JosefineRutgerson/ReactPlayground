import { useState } from "react";
import { chunkArray } from "../../utils/arrayHelpers";

function Square({ value, onSquareClick, squareClass }) {
  return (
    <button className={squareClass} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c],
      };
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const draw = !squares.includes(null);

  let status;
  if (winner) {
    status = "Winner: " + winner.winner;
  } else if (draw) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  let loveSquares = Array.from({ length: 9 }, (_, i) => ({
    position: i,
    cssclass: "square",
  }));

  if (winner) {
    let winline = winner.line;
    loveSquares = loveSquares.map((squ) =>
      winline.includes(squ.position)
        ? { ...squ, cssclass: "winningSquare" }
        : squ
    );
  }

  if (draw && !winner) {
    loveSquares = loveSquares.map((squ) => ({
      ...squ,
      cssclass: "draw",
    }));
  }

  const myChunkedSquares = chunkArray(loveSquares, 3);

  const bigtext = draw || winner;

  return (
    <>
      <h2>TicTacToe</h2>
      <div className="board-container">
        {myChunkedSquares.map((array, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {array.map((item) => (
              <Square
                key={item.position}
                value={squares[item.position]}
                onSquareClick={() => handleClick(item.position)}
                squareClass={item.cssclass}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={!bigtext ? "status" : "bigStatus"}>{status}</div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [infoMove, setInfoMove] = useState("Make your first move Aragorn!");

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setInfoMove("You're at move " + (currentMove + 1));
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    const isLast = move === history.length - 1;
    if (move > 0 && !isLast) {
      description = "Go to move #" + move;
    } else if (isLast) {
      description = "You're at move " + move;
    } else {
      description = "Go to game start";
    }

    return !isLast ? (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    ) : null;
  });

  return (
    <section className="game-container game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <h2>Game info</h2>
        <ul>{moves}</ul>
        <div className="move-info">
          <p>{infoMove}</p>
        </div>
      </div>
    </section>
  );
}
