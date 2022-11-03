import { useState } from "react";
import { useKey } from "../../../utilities/useKey";
import "./DrumModule.css";

const DrumModule = ({
  volume,
  onVolume,
  power,
  onPower,
  kit,
  onKit,
  display,
  onDisplay,
  color,
  onColor,
}) => {
  //state for checked inputs
  const [check, setCheck] = useState(true);

  //custom hook for keypress events
  useKey("p", handlePowerChange);
  useKey("b", handleBankChange);
  useKey("multiple", handleVolumeChange);

  //function that handles when the drum is on and off with a keydown event
  function handlePowerChange() {
    onPower();
    onDisplay(power ? "Off" : "On");
    setTimeout(() => onDisplay(""), 1000);
  }

  //function that handles when the bank changes with a keydown event
  function handleBankChange() {
    if (!power) return;
    onColor();
    onDisplay(!check ? "Heater Kit" : "Smooth Piano Kit");
    setCheck(!check);
    onKit(!check);
  }

  //function that handles when the volume changes with a keypress event
  function handleVolumeChange(e) {
    if (!power || (e.keyCode !== 43 && e.keyCode !== 45)) return;
    onVolume(e);
    if (e.keyCode === 43) {
      onDisplay(
        `Volume: ${
          Math.round(volume * 100 + 5) > 100
            ? 100
            : Math.round(volume * 100 + 5)
        }`
      );
    }
    if (e.keyCode === 45) {
      onDisplay(
        `Volume: ${
          Math.round(volume * 100 - 5) < 0 ? 0 : Math.round(volume * 100 - 5)
        }`
      );
    }
    setTimeout(() => onDisplay(""), 500);
  }

  //function that updates power with a click event
  const updatePower = () => {
    onPower();
    onDisplay(power ? "Off" : "On");
    setTimeout(() => onDisplay(""), 1000);
  };

  //function that updates the volume with a click event
  const updateVolume = (e) => {
    onVolume(e);
    onDisplay(`Volume: ${Math.round(e.target.value * 100)}`);
    setTimeout(() => onDisplay(""), 500);
  };

  //function that updates the bank with a click event
  const updateBank = () => {
    setCheck(!check);
    onKit(!check);
    onDisplay(kit !== "heater" ? "Heater Kit" : "Smooth Piano Kit");
    onColor();
  };

  return (
    <div className="module">
      <div className="on-off">
        Power
        <label className="switch">
          <input
            type="checkbox"
            checked={!power}
            onChange={handlePowerChange}
            onClick={updatePower}
          />
          <div className={`switch-box ${color ? "box1" : "box2"}`}></div>
        </label>
      </div>
      <div className="display">
        <div
          className="screen"
          style={{ backgroundColor: !color ? "#252422" : "#111d13" }}
        >
          {display}
        </div>
      </div>
      <div className="slider">
        <input
          disabled={!power}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={updateVolume}
          className={`slide-range ${color ? "slide1" : "slide2"}`}
        />
      </div>
      <div className="bank">
        Bank
        <label className="switch">
          <input
            disabled={!power}
            checked={!check}
            onChange={handleBankChange}
            type="checkbox"
            onClick={updateBank}
          />
          <div className={`switch-box ${color ? "box1" : "box2"}`}></div>
        </label>
      </div>
    </div>
  );
};

export default DrumModule;
