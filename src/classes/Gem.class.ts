export class Gem {
  public type: string;
  public points: number;
  public selected: boolean;
  public adjacent: boolean;

  constructor(type: string, points: number) {
    this.type = type;
    this.points = points;
    this.selected = false;
    this.adjacent = false;
  }

  static randomGem(): Gem {
    const gemTypes = [
      { type: "red", points: 2 },
      { type: "blue", points: 3 },
      { type: "green", points: 5 },
      { type: "yellow", points: 8 },
      { type: "purple", points: 13 },
    ];

    const randomGem = gemTypes[Math.floor(Math.random() * gemTypes.length)];
    return new Gem(randomGem.type, randomGem.points);
  }

  public getColor(): string {
    switch (this.type) {
      case "red":
        return "red";
      case "blue":
        return "blue";
      case "green":
        return "green";
      case "yellow":
        return "yellow";
      case "purple":
        return "purple";
      default:
        return "gray";
    }
  }
}
