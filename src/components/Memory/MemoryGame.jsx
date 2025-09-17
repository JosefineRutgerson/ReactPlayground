import React, { useState, useEffect } from "react";
import { chunkArray } from "../../utils/arrayHelpers";

function createBricks() {
  const symbols = ["&", "%", "@", "#", "?", "Ö"];
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
  const [flipped, setFlipped] = useState([]);

  function handleBrickClick(clickedId) {
    if (flipped.length === 2) return;

    setBricks((prev) =>
      prev.map((brick) =>
        brick.id === clickedId ? { ...brick, flipped: true } : brick
      )
    );

    setFlipped((prev) => [...prev, clickedId]);
  }

  useEffect(() => {
    if (flipped.length !== 2) return;

    const [firstId, secondId] = flipped;
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
      setFlipped([]);
    } else {
      // Flip back after delay
      setTimeout(() => {
        setBricks((prev) =>
          prev.map((brick) =>
            brick.id === firstId || brick.id === secondId
              ? { ...brick, flipped: false }
              : brick
          )
        );
        setFlipped([]);
      }, 1000);
    }
  }, [flipped, bricks]);

  const myChunkedBricks = chunkArray(bricks, 4);

  return (
    <div className="memory-wrapper">
      <div className="memory-container">
        <h2>Memory</h2>
        {myChunkedBricks.map((row, rowIndex) => (
          <div className="memory-row" key={rowIndex}>
            {row.map((brick) => (
              <button
                key={brick.id}
                className={`brick ${
                  brick.flipped || brick.matched ? "flipped" : ""
                }`}
                onClick={() => handleBrickClick(brick.id)}
                disabled={brick.matched}
              >
                {brick.flipped || brick.matched ? brick.symbol : "O"}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="memory-info">
        <h2>Game info</h2>
        <p>Wanna play memory?</p>
      </div>
    </div>
  );
}
