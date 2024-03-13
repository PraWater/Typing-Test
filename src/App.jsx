import { useState } from "react";
import { paragraph } from "txtgen";
import "./App.css";
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
		<div className="appContainer">
			<div className="center">
				<p>{time}</p>
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
