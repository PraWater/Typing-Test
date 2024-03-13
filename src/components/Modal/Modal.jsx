import React from "react";
import "./modal.css";

const Modal = ({ wpm, reset }) => {
	return (
		<div className="modalContainer">
			<div className="modal">
				<h1>Your score is:</h1>
				<h1 className="wpm">{wpm}</h1>
				<button onClick={reset}>Play Again</button>
			</div>
		</div>
	);
};

export default Modal;
