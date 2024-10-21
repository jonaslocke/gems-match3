import clsx from "clsx";

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

  draw(key?: string): JSX.Element {
    const gemClass = clsx("gem", {
      selected: this.selected,
      adjacent: this.adjacent,
    });

    const gemStyle = {
      backgroundColor: this.getColor(),
      border: this.selected ? "2px solid gold" : "1px solid black",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <div key={key} className={gemClass} style={gemStyle}>
        {this.type} ({this.points})
      </div>
    );
  }

  static drawEmpty(key?: string): JSX.Element {
    const emptyStyle = {
      backgroundColor: "#f0f0f0",
      border: "1px dashed #ccc",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    return <div key={key} className="empty-gem" style={emptyStyle} />;
  }
}
