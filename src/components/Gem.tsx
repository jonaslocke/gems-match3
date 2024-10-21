import { Gem as IGem } from "../classes/Gem.class";

export const Gem = ({ gem }: { gem: IGem }) => {
  const gemClass = `gem ${gem.selected ? "selected" : ""} ${
    gem.adjacent ? "adjacent" : ""
  }`;
  const gemStyle = {
    backgroundColor: gem.getColor(),
    border: gem.selected ? "2px solid gold" : "1px solid black",
    cursor: "pointer",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  };

  return (
    <div className={gemClass} style={gemStyle}>
      {gem.type} ({gem.points})
    </div>
  );
};
