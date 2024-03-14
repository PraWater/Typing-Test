import React from "react";

const Modal = ({ wpm, reset }) => {
	return (
		<div
			onClick={reset}
			className="absolute top-0 left-0 w-screen h-screen grid place-items-center bg-[#000000] bg-opacity-50"
		>
			<div className="w-1/2 h-1/2 bg-background rounded-xl flex flex-col items-center justify-center text-foreground p-5">
				<h1>Your score is:</h1>
				<h1 className="text-purple text-9xl">{wpm}</h1>
				<button
					onClick={reset}
					className="bg-purple rounded-lg p-2 mt-auto text-lg"
				>
					Play Again
				</button>
			</div>
		</div>
	);
};

export default Modal;
