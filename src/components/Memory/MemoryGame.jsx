import React, { useState } from "react";
import { chunkArray } from "../../utils/arrayHelpers";
import { objBrick } from "../../utils/brick";

function createBricks() {
  const symbols = ["&", "%", "@", "#", "?", "Ö"];
  const doubled = [...symbols, ...symbols];

  // Shuffle
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }

  return doubled.map(
    (symbol, index) =>
      new objBrick(`brick-${index + 1}`, symbol, false, "brick")
  );
}

export default function MemoryGame() {
  const [bricks, setBricks] = useState(createBricks());

  function handleBrickClick(clickedKey) {
    setBricks((prevBricks) =>
      prevBricks.map((brick) =>
        brick.key === clickedKey
          ? new objBrick(brick.key, brick.symbol, true, "brick flipped")
          : brick
      )
    );
  }

  const myChunkedBricks = chunkArray(bricks, 4);

  return (
    <div className="memory-wrapper">
      <div className="memory-container">
        <h2>Memory</h2>
        {myChunkedBricks.map((row, rowIndex) => (
          <div className="memory-row" key={rowIndex}>
            {row.map((brick) => (
              <button
                key={brick.key}
                className={brick.cssclass}
                onClick={() => handleBrickClick(brick.key)}
              >
                {brick.selected ? brick.symbol : "O"}
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
