import { useState } from "react";
import DrumKeypad from "./DrumKeypad/DrumKeypad";
import DrumModule from "./DrumModule/DrumModule";
import "./Drum.css";

const Drum = ({ color, onColor }) => {
  //state for the current kit of sounds
  const [kit, setKit] = useState("heater");
  //state for the volume
  const [volume, setVolume] = useState(0.5);
  //state for the power
  const [power, setPower] = useState(true);
  //state for the display
  const [display, setDisplay] = useState("");

  //function that sets the displays
  const handleDisplay = (value) => setDisplay(value);

  //funcion that changes the volume
  const handleVolume = (e) => {
    if (e.type === "change") setVolume(Number(e.target.value));
    if (e.type === "keypress") {
      if (e.keyCode === 43) {
        setVolume((prev) => (prev + 0.05 > 1 ? 1 : prev + 0.05));
      }
      if (e.keyCode === 45) {
        setVolume((prev) => (prev - 0.05 < 0 ? 0 : prev - 0.05));
      }
    }
  };

  //function that switches the power
  const handlePower = () => setPower(!power);

  //function that switches between kits
  const handleKit = (check) =>
    check ? setKit("heater") : setKit("smooth-piano");

  return (
    <div
      className="drum-container"
      style={{
        backgroundColor: !color ? "#403d39" : "#415d43",
        borderColor: !color ? "#252422" : "#111d13",
      }}
    >
      <div className="my-name">
        <p>By Dunkelnn</p>
      </div>
      <div className="drum">
        <DrumKeypad
          kit={kit}
          volume={volume}
          power={power}
          onDisplay={handleDisplay}
          color={color}
        />
        <DrumModule
          volume={volume}
          onVolume={handleVolume}
          power={power}
          onPower={handlePower}
          kit={kit}
          onKit={handleKit}
          display={display}
          onDisplay={handleDisplay}
          color={color}
          onColor={onColor}
        />
      </div>
    </div>
  );
};

export default Drum;
