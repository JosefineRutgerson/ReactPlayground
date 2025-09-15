import { useState } from "react";

function Square({ value, onSquareClick, squareClass }) {
  return (
    <button className={squareClass} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function TogglePage({ onTogglePageClick }) {
  return (
    <button className="pageToggle" onClick={onTogglePageClick}>
      Toggle page
    </button>
  );
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

class objBrick {
  constructor(key, symbol, selected, cssclass) {
    this.key = key;
    this.symbol = symbol;
    this.selected = selected;
    this.cssclass = cssclass;
  }
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const draw = !squares.includes(null);
  let status;
  if (winner) {
    status = "Winner: " + winner.winner;
  } else if (!squares.includes(null)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  class objSquare {
    constructor(position, cssclass) {
      this.position = position;
      this.cssclass = cssclass;
    }
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

  let bigtext = false;
  if (draw || winner) {
    bigtext = true;
  }

  return (
    <>
      <h2>Game</h2>
      <div className="board-container">
        {myChunkedSquares.map((array, indo) => (
          <div className="board-row">
            {array.map((item, index) => (
              <Square
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
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const [infoMove, setInfoMove] = useState("Make your first move Aragorn!");
  const [togglePage, setTogglePage] = useState(false);
  const [bricks, setBricks] = useState(createBricks());

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setInfoMove("You're at move " + (currentMove + 1));
  }

  function handleTogglePage() {
    if (!togglePage) {
      setTogglePage(true);
    } else {
      setTogglePage(false);
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setInfoMove("You're at move " + nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    const isLast = move === history.length - 1;
    if (move > 0 && !isLast) {
      description = "Go to move #" + move;
    } else if (isLast) {
      description = "You're at move  " + move;
    } else {
      description = "Go to game start";
    }

    if (!isLast) {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }

    return;
  });

  return (
    <section className="game-container">
      <div className="togglePageContainer">
        <h1>My react playground</h1>
        <TogglePage onTogglePageClick={() => handleTogglePage()} />
      </div>
      <div className={!togglePage ? "game" : "hide"}>
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <h2>Game info</h2>
          <ul>{moves}</ul>
          <div className="move-info">
            <p>{infoMove}</p>
          </div>
        </div>
      </div>
      <div className={togglePage ? "memory" : "hide"}>
        <div className="memory-board">
          <h2>Memory</h2>
          <MemoryGame bricks={bricks} />
        </div>
        <div className="memory-info">
          <h2>Memory info</h2>
          <p>Play memory!</p>
        </div>
      </div>
    </section>
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

function createBricks() {
  const symbols = ["&", "%", "@", "#", "?", "Ö"];
  const doubled = [...symbols, ...symbols];

  // shuffle (Fisher-Yates)
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }

  // use "brick1", "brick2", ... as keys
  return doubled.map(
    (symbol, index) => new objBrick(`brick${index + 1}`, symbol, false, "brick")
  );
}

function MemoryGame({ bricks }) {
  
  const myChunkedBricks = chunkArray(bricks, 4);

  return (
    <div className="memory-container">
      {myChunkedBricks.map((array, indo) => (
        <div className="memory-row">
          {array.map((item, index) => (
            <Brick
              key={item.key}
              value={item.symbol}
              onBrickClick={() => handleBrickClick(item)}
              brickClass={item.cssclass}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Brick({ key, value, onBrickClick, brickClass }) {
  return (
    <button key={key} className={brickClass} onClick={onBrickClick}>
      {value}
    </button>
  );
}
