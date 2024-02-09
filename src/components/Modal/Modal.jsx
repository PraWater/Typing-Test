import React from "react";

const Modal = ({ wpm, reset }) => {
  return (
    <div className="modalContainer">
      <div className="modal">
        <h1>Your score is: {wpm}</h1>
        <button onClick={reset}>Play Again</button>
      </div>
    </div>
  );
};

export default Modal;
