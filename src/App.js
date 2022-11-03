import { useState } from "react";
import "./App.css";
import Drum from "./Components/Drum/Drum";

function App() {
  //state for the color
  const [color, setColor] = useState(false);

  //function that changes color palettes
  const handleColor = () => setColor(!color);
  return (
    <div
      className="App"
      style={{ backgroundColor: !color ? "#555" : "#8fb996" }}
    >
      <Drum color={color} onColor={handleColor} />
    </div>
  );
}

export default App;
