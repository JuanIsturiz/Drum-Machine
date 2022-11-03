import { useState } from "react";
import { useKey } from "../../../../utilities/useKey";
import { keys } from "../../../../assets/drum-sounds/drumSounds";
import "./DrumKey.css";

const DrumKey = ({ keyInfo, kit, volume, power, onDisplay, color }) => {
  //state for active key style
  const [active, setActive] = useState(false);

  //custom hook for keypress events
  useKey(keyInfo.toLowerCase(), keyDownPlay);

  //dynamic styles
  const styles = {
    true: !active
      ? {
          backgroundColor: !color ? "#eb5e28" : "#709775",
          transform: "scale(1)",
        }
      : {
          backgroundColor: !color ? "#a3421c" : "#3f5542",
          transform: "scale(.975)",
        },
    false: !active
      ? { backgroundColor: !color ? "#eb5e28" : "#709775" }
      : { backgroundColor: "rgb(150, 75, 75)" },
  };
  //function that plays the audio
  const play = () => {
    const audio = new Audio(keys[keyInfo][kit].sound);
    audio.volume = volume;
    audio.currentTime = 0;
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audio.play();
    onDisplay(keys[keyInfo][kit].name);
  };

  //function that plays the audio with a click event
  const clickPlay = () => {
    if (!power) {
      setActive(true);
      setTimeout(() => setActive(false), 200);
      return;
    }
    play();
  };

  //function that plays the audio with a keypress event
  function keyDownPlay(e) {
    if (!power) {
      setActive(true);
      setTimeout(() => setActive(false), 200);
      return;
    }
    play();
  }

  return (
    <div className="key" style={styles[power]} onMouseUp={clickPlay}>
      {keyInfo}
    </div>
  );
};

export default DrumKey;
