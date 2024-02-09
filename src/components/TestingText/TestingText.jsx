import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";

const TestingText = ({ timerStart, timerOn, timerReset }) => {
  const [text, setText] = useState();
  const [mistakes, setMistakes] = useState(0);
  const [inputText, setInputText] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);
  const ogText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nesciunt explicabo at illum maxime tempora voluptatum quo quisquam minima, nam omnis aliquam iste ipsa tempore, sequi dolores quas saepe nihil.";

  const handleKeyDown = (e) => {
    if (!timerOn && inputText.length !== 0) {
      setModalOpen(true);
      return;
    }
    if (e.key === "Backspace") {
      setInputText(inputText.slice(0, inputText.length - 1));
    } else if (/^[a-zA-Z .,]$/.test(e.key)) {
      if (!timerOn && inputText.length === 0) {
        timerStart();
      }
      setInputText(inputText + e.key);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClick = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    let cnt = 0;
    setText(
      ogText.split("").map((char, index) => {
        if (index < inputText.length) {
          if (char === inputText[index]) {
            return (
              <span key={index} style={{ color: "white" }}>
                {char}
              </span>
            );
          } else {
            ++cnt;
            if (char === " ") {
              return (
                <span key={index} style={{ color: "red" }}>
                  {inputText[index] + " "}
                </span>
              );
            }
            return (
              <span key={index} style={{ color: "red" }}>
                {char}
              </span>
            );
          }
        } else if (index === inputText.length) {
          return (
            <span
              key={index}
              style={{ color: "grey", textDecoration: "underline" }}
            >
              {char}
            </span>
          );
        } else {
          return (
            <span key={index} style={{ color: "grey" }}>
              {char}
            </span>
          );
        }
      })
    );
    setMistakes(cnt);
  }, [inputText]);

  const reset = () => {
    setInputText("");
    setModalOpen(false);
    setMistakes(0);
    setText(
      ogText.split("").map((char, index) => {
        return (
          <span key={index} style={{ color: "grey" }}>
            {char}
          </span>
        );
      })
    );
    inputRef.current.focus();
    timerReset();
  };

  return (
    <>
      <div onClick={handleClick}>{text}</div>
      <input type="text" ref={inputRef} onKeyDown={handleKeyDown} />
      Count = {inputText.length} Mistakes = {mistakes} Words typed ={" "}
      {(inputText.length - mistakes) / 5}
      {ModalOpen && (
        <Modal
          wpm={Math.round(((inputText.length - mistakes) * 2) / 5)}
          reset={reset}
        />
      )}
    </>
  );
};

export default TestingText;
