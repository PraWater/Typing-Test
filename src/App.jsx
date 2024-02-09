import { useState } from "react";
import "./App.css";
import TestingText from "./components/TestingText/TestingText";

function App() {
  const [time, setTime] = useState(30);
  const [timerOn, setTimerOn] = useState(false);
  let timer;

  function handleTime() {
    setTime((prevTime) => {
      if (prevTime === 1) {
        setTimerOn(false);
        clearInterval(timer);
        return 0;
      } else {
        return prevTime - 1;
      }
    });
  }

  function timerStart() {
    setTimerOn(true);
    timer = setInterval(handleTime, 1000);
  }

  function timerReset() {
    clearInterval(timer);
    setTime(30);
    setTimerOn(false);
  }

  return (
    <>
      <p>{time}</p>
      <TestingText
        timerOn={timerOn}
        timerStart={timerStart}
        timerReset={timerReset}
      />
    </>
  );
}

export default App;
