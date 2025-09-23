import { useState, useEffect } from "react";
import { createBricks } from "../../utils/brick.js";
import { chunkArray } from "../../utils/arrayHelpers.js";

export default function MemoryGame() {
  const [bricks, setBricks] = useState(createBricks());
  const [flippedIds, setFlippedIds] = useState([]);
  const [lock, setLock] = useState(false);
  const [matches, setMatches] = useState(0);
  const [specialBricks, setSpecialBricks] = useState({});
  const isGameWon = matches === bricks.length / 2;

  // Pick 3 random special bricks on mount or when new bricks are created
  useEffect(() => {
    if (bricks.length < 3) return;

    const ids = [...bricks.map((b) => b.id)];
    const shuffled = ids.sort(() => Math.random() - 0.5);
    const [id1, id2, id3] = shuffled.slice(0, 3);

    setSpecialBricks({
      ...(id1 && { [id1]: "fastest" }),
      ...(id2 && { [id2]: "slowest" }),
      ...(id3 && { [id3]: "mediumFast" }),
    });
  }, [bricks]);

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
      setBricks((prev) =>
        prev.map((brick) =>
          brick.id === firstId || brick.id === secondId
            ? { ...brick, matched: true }
            : brick
        )
      );
      setMatches((m) => m + 1);
      setFlippedIds([]);
    } else {
      setLock(true);
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

  //const myChunkedBricks = chunkArray(bricks, 4);
  const myChunkedBricks = Array.isArray(bricks) ? chunkArray(bricks, 4) : [];

  // Messages logic
  let statusMessage;
  if (matches > 0 && matches !== 6) {
    statusMessage = `You've found ${matches} matches!`;
  } else if (isGameWon) {
    statusMessage = "🎉 You won!";
  } else {
    statusMessage = "Wanna play Memory?";
  }

  // CSS class logic
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
            {row.map((brick, colIndex) => {
              const speed = specialBricks[brick.id] || "normal";
              return (
                <button
                  key={brick.id}
                  className={getBrickClasses(brick)}
                  onClick={() => handleBrickClick(brick.id)}
                  style={{
                    "--row": `${rowIndex}`,
                    "--col": `${colIndex}`,
                  }}
                  disabled={brick.matched || lock}
                  speed={specialBricks[brick.id] || "normal"} // 👈 add this
                >
                  {brick.flipped || brick.matched ? brick.symbol : "O"}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="memory-info">
        <h2>Game info</h2>
        <p>{statusMessage}</p>
        <button className="option" onClick={() => setMatches(6)}>
          Force Win
        </button>
        <button
          className="option"
          onClick={() => {
            setBricks(createBricks());
            setMatches(0);
            setFlippedIds([]);
            setLock(false);
            setSpecialBricks({}); // reset specials on new game
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
}
