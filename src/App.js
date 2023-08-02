import "./App.css";
import morseCodeMap from "./morseCodeMap";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [showMorse, setShowMorse] = useState(
    "Your morse code message will be here..."
  );
  const totalTimeArr = [];

  const convertToMorse = () => {
    const morseCode = text
      .toUpperCase()
      .split("")
      .map((str) => {
        return morseCodeMap[str] ? morseCodeMap[str] + " " : str;
      })
      .join("");
    return morseCode;
  };

  const handleVibrate = () => {
    if (!text) {
      alert("Please enter some text");
    } else {
      const morseCodeStr = convertToMorse();
      setShowMorse(morseCodeStr);

      const timeUnit = 100;

      for (let i = 0; i < morseCodeStr.length; i++) {
        // console.log(morseCodeStr[i]);
        if (morseCodeStr[i] === ".") {
          totalTimeArr.push(timeUnit);
        } else if (morseCodeStr[i] === "-" || morseCodeStr[i] === " ") {
          totalTimeArr.push(timeUnit * 3);
        } else {
          totalTimeArr.push(timeUnit * 7);
        }
      }

      navigator.vibrate(totalTimeArr);
    }
  };

  return (
    <div className="App">
      <h2>Morse Vibration App</h2>
      <textarea
        name="input-field"
        id="input-field"
        cols="30"
        rows="8"
        placeholder="Enter you message here..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleVibrate}>Vibrate</button>
      <p>{showMorse}</p>
    </div>
  );
}

export default App;
