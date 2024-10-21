import { GameGrid } from "./GameGrid.class";
import { Gem } from "./Gem.class";

export class Level {
  gameGrid: GameGrid;
  score: number;
  threshold: number;
  cleared: boolean;
  multiplier: number;

  constructor(
    rows: number,
    cols: number,
    setGridState: React.Dispatch<React.SetStateAction<(Gem | null)[][]>>,
    threshold: number
  ) {
    this.gameGrid = new GameGrid(rows, cols, setGridState);
    this.score = 0;
    this.threshold = threshold;
    this.cleared = false;
    this.multiplier = 1;
  }

  updateScore() {
    const clearedGems = this.gameGrid.clearMatches();
    const pointsEarned = clearedGems.reduce(
      (total, gem) => total + gem.points * this.multiplier,
      0
    );

    this.score += pointsEarned;
    if (this.score >= this.threshold) {
      this.cleared = true;
    }
  }
}
