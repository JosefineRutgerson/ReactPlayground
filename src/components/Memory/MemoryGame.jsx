import React, { useState, useEffect } from "react";
import { chunkArray } from "../../utils/arrayHelpers";

function createBricks() {
  const symbols = ["&", "%", "@", "#", "?", "+"];
  const doubled = [...symbols, ...symbols];

  // Shuffle
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }

  // Use plain objects instead of custom class
  return doubled.map((symbol, index) => ({
    id: `brick-${index + 1}`,
    symbol,
    flipped: false,
    matched: false,
  }));
}

export default function MemoryGame() {
  const [bricks, setBricks] = useState(createBricks());
  const [flippedIds, setFlippedIds] = useState([]);
  const [lock, setLock] = useState(false); // lock state
  const [matches, setMatches] = useState(0);
  const isGameWon = matches === 6;

  function handleBrickClick(id) {
    if (lock || flippedIds.includes(id)) return;

    setBricks((prev) =>
      prev.map((brick) =>
        brick.id === id ? { ...brick, flipped: true } : brick
      )
    );

    setFlippedIds((prev) => [...prev, id]);
  }

  useEffect(() => {
    if (flippedIds.length < 2) return;

    const [firstId, secondId] = flippedIds;
    const firstBrick = bricks.find((b) => b.id === firstId);
    const secondBrick = bricks.find((b) => b.id === secondId);

    if (!firstBrick || !secondBrick) return;

    if (firstBrick.symbol === secondBrick.symbol) {
      // Mark as matched
      setBricks((prev) =>
        prev.map((brick) =>
          brick.id === firstId || brick.id === secondId
            ? { ...brick, matched: true }
            : brick
        )
      );
      setMatches((prev) => prev + 1);
      setFlippedIds([]);
    } else {
      setLock(true);
      // Flip back after delay
      setTimeout(() => {
        setBricks((prev) =>
          prev.map((brick) =>
            brick.id === firstId || brick.id === secondId
              ? { ...brick, flipped: false }
              : brick
          )
        );
        setFlippedIds([]);
        setLock(false);
      }, 1000);
    }
  }, [flippedIds, bricks]);

  const myChunkedBricks = chunkArray(bricks, 4);

  //Messages logic
  let statusMessage;
  if (matches > 0 && matches != 6) {
    statusMessage = "You've found " + matches + " matches!";
  } else if (isGameWon) {
    statusMessage = "🎉 You won!";
  } else {
    statusMessage = "Wanna play Memory?";
  }

  //css class logic
  function getBrickClasses(brick) {
    const classes = ["brick"];

    if (!isGameWon && (brick.flipped || brick.matched)) {
      classes.push("flipped");
    }
    return classes.join(" ");
  }

  return (
    <div className="memory-wrapper">
      <div className={`memory-container ${isGameWon ? "game-won" : ""}`}>
        <h2>Memory</h2>
        {myChunkedBricks.map((row, rowIndex) => (
          <div className="memory-row" key={rowIndex}>
            {row.map((brick) => (
              <button
                key={brick.id}
                className={getBrickClasses(brick)}
                onClick={() => handleBrickClick(brick.id)}
                disabled={brick.matched || lock}
              >
                {brick.flipped || brick.matched ? brick.symbol : "O"}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="memory-info">
        <h2>Game info</h2>
        <p>{statusMessage}</p>
      </div>
    </div>
  );
}
