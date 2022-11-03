import DrumKey from "./DrumKey/DrumKey";
import "./DrumKeypad.css";

//keys names that matches the keys in the assets/drumSounds.js
const keyNames = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

const DrumKeypad = ({ kit, volume, power, onDisplay, color }) => {
  return (
    <div className="keypad">
      {keyNames.map((key) => (
        <DrumKey
          key={key}
          keyInfo={key}
          kit={kit}
          volume={volume}
          power={power}
          onDisplay={onDisplay}
          color={color}
        />
      ))}
    </div>
  );
};

export default DrumKeypad;
