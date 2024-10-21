import React, { useEffect, useState } from "react";
import { GameGrid } from "../classes/GameGrid.class";
import { Gem as IGem } from "../classes/Gem.class";
import { Gem } from "./Gem";

interface GameGridComponentProps {
  rows: number;
  cols: number;
}

export const Game: React.FC<GameGridComponentProps> = ({ rows, cols }) => {
  const [grid, setGrid] = useState<(IGem | null)[][]>([]);

  const [score, setScore] = useState(0);

  const [gameGrid, setGameGrid] = useState<GameGrid | null>(null);

  useEffect(() => {
    const newGameGrid = new GameGrid(rows, cols, setGrid);
    setGameGrid(newGameGrid);
  }, [rows, cols]);

  const handleCheckMatches = () => {
    if (gameGrid) {
      const clearedGems = gameGrid.clearMatches();
      const pointsEarned = clearedGems.reduce(
        (acc, gem) => acc + gem.points,
        0
      );
      setScore((prevScore) => prevScore + pointsEarned);
    }
  };

  return (
    <div>
      <h3>Score: {score}</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 50px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((gem, colIndex) =>
            gem ? (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => console.log(gem)}
              >
                <Gem gem={gem} />
              </div>
            ) : (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "lightgray",
                }}
              ></div>
            )
          )
        )}
      </div>

      <button onClick={handleCheckMatches}>Check Matches</button>
    </div>
  );
};
