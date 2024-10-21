import { Dispatch, SetStateAction } from "react";
import { Gem } from "./Gem.class";

interface GemPosition {
  row: number;
  col: number;
}

export class GameGrid {
  public grid: (Gem | null)[][];
  public rows: number;
  public cols: number;
  public setGridState: Dispatch<SetStateAction<(Gem | null)[][]>>;

  constructor(
    rows: number,
    cols: number,
    setGridState: Dispatch<SetStateAction<(Gem | null)[][]>>
  ) {
    this.rows = rows;
    this.cols = cols;
    this.setGridState = setGridState;
    this.grid = this.generateGrid();
  }

  private generateGrid(): (Gem | null)[][] {
    const newGrid: (Gem | null)[][] = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => Gem.randomGem())
    );

    this.grid = newGrid;
    let matches = this.findMatches();

    while (matches.length > 0) {
      matches.forEach(({ row, col }) => {
        newGrid[row][col] = Gem.randomGem();
      });

      this.grid = newGrid;
      matches = this.findMatches();
    }

    this.setGridState(newGrid);
    return newGrid;
  }

  public checkMatches(): boolean {
    return this.checkHorizontalMatches() || this.checkVerticalMatches();
  }

  private checkHorizontalMatches(): boolean {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols - 2; col++) {
        const gem1 = this.grid[row][col];
        const gem2 = this.grid[row][col + 1];
        const gem3 = this.grid[row][col + 2];

        if (
          gem1 &&
          gem2 &&
          gem3 &&
          gem1.type === gem2.type &&
          gem1.type === gem3.type
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private checkVerticalMatches(): boolean {
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows - 2; row++) {
        const gem1 = this.grid[row][col];
        const gem2 = this.grid[row + 1][col];
        const gem3 = this.grid[row + 2][col];

        if (
          gem1 &&
          gem2 &&
          gem3 &&
          gem1.type === gem2.type &&
          gem1.type === gem3.type
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private findHorizontalMatches(): GemPosition[] {
    const matches: GemPosition[] = [];

    for (let row = 0; row < this.rows; row++) {
      let col = 0;
      while (col < this.cols - 2) {
        const gem1 = this.grid[row][col];
        const gem2 = this.grid[row][col + 1];
        const gem3 = this.grid[row][col + 2];

        if (
          gem1 &&
          gem2 &&
          gem3 &&
          gem1.type === gem2.type &&
          gem1.type === gem3.type
        ) {
          let matchLength = 3;
          matches.push({ row, col });
          matches.push({ row, col: col + 1 });
          matches.push({ row, col: col + 2 });

          while (
            col + matchLength < this.cols &&
            this.grid[row][col + matchLength] &&
            this.grid[row][col + matchLength]!.type === gem1.type
          ) {
            matches.push({ row, col: col + matchLength });
            matchLength++;
          }
          col += matchLength;
        } else {
          col++;
        }
      }
    }

    return matches;
  }

  private findVerticalMatches(): GemPosition[] {
    const matches: GemPosition[] = [];

    for (let col = 0; col < this.cols; col++) {
      let row = 0;
      while (row < this.rows - 2) {
        const gem1 = this.grid[row][col];
        const gem2 = this.grid[row + 1][col];
        const gem3 = this.grid[row + 2][col];

        if (
          gem1 &&
          gem2 &&
          gem3 &&
          gem1.type === gem2.type &&
          gem1.type === gem3.type
        ) {
          let matchLength = 3;
          matches.push({ row, col });
          matches.push({ row: row + 1, col });
          matches.push({ row: row + 2, col });

          while (
            row + matchLength < this.rows &&
            this.grid[row + matchLength] &&
            this.grid[row + matchLength][col]?.type === gem1.type
          ) {
            matches.push({ row: row + matchLength, col });
            matchLength++;
          }
          row += matchLength;
        } else {
          row++;
        }
      }
    }

    return matches;
  }

  private findMatches(): GemPosition[] {
    const matches: GemPosition[] = [
      ...this.findHorizontalMatches(),
      ...this.findVerticalMatches(),
    ];

    return matches;
  }

  public clearMatches(): Gem[] {
    const matches = this.findMatches();
    const clearedGems: Gem[] = [];

    matches.forEach(({ row, col }) => {
      const gem = this.grid[row][col];
      if (gem) {
        clearedGems.push(gem);
        this.grid[row][col] = null;
      }
    });

    this.setGridState([...this.grid]);
    return clearedGems;
  }

  public swapGems(
    pos1: { row: number; col: number },
    pos2: { row: number; col: number }
  ) {
    const temp = this.grid[pos1.row][pos1.col];
    this.grid[pos1.row][pos1.col] = this.grid[pos2.row][pos2.col];
    this.grid[pos2.row][pos2.col] = temp;
  }

  public draw() {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${this.cols}, 50px)`,
        }}
      >
        {this.grid.map((row, rowIndex) =>
          row.map((gem, colIndex) =>
            gem
              ? gem.draw(`${rowIndex}-${colIndex}`)
              : Gem.drawEmpty(`${rowIndex}-${colIndex}`)
          )
        )}
      </div>
    );
  }
}
