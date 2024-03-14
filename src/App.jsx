import { useState } from "react";
import { paragraph } from "txtgen";
import TestingText from "./components/TestingText/TestingText";

function App() {
	const [time, setTime] = useState(30);
	const [timerOn, setTimerOn] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [text, setText] = useState(paragraph());
	let timer;

	function handleTime() {
		setTime((prevTime) => {
			if (prevTime === 1) {
				setTimerOn(false);
				clearInterval(timer);
				setModalOpen(true);
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
		setModalOpen(false);
		setText(paragraph());
	}

	return (
		<div className="grid place-items-center bg-background h-dvh w-screen font-mono font-normal text-2xl">
			<div className="w-10/12 h-1/2 overflow-hidden flex flex-col justify-start">
				<p className="text-purple">{time}</p>
				<TestingText
					timerOn={timerOn}
					timerStart={timerStart}
					timerReset={timerReset}
					modalOpen={modalOpen}
					ogText={text}
				/>
			</div>
		</div>
	);
}

export default App;
