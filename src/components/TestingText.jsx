import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

const TestingText = ({
	timerStart,
	timerOn,
	timerReset,
	modalOpen,
	ogText,
}) => {
	const [text, setText] = useState();
	const [mistakes, setMistakes] = useState(0);
	const [inputText, setInputText] = useState("");
	const inputRef = useRef(null);

	const handleKeyDown = (e) => {
		if (!timerOn && inputText.length !== 0) {
			return;
		}
		if (e.key === "Backspace") {
			setInputText(inputText.slice(0, inputText.length - 1));
		} else if (/^[a-zA-Z .,!;:-?]$/.test(e.key)) {
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
							<span key={index} className="text-foreground">
								{char}
							</span>
						);
					} else {
						++cnt;
						// if (char === " ") {
						// 	return (
						// 		<span key={index} className="text-yellow">
						// 			{inputText[index] + " "}
						// 		</span>
						// 	);
						// }
						return (
							<span key={index} className="text-red">
								{char}
							</span>
						);
					}
				} else if (index === inputText.length) {
					return (
						// <span
						// 	key={index}
						// 	className="before:block before:absolute before:h-8 before:w-0.5 before:bg-purple relative inline-block"
						// >
						<span className="underline relative text-comment">{char}</span>
						// </span>
					);
				} else {
					return (
						<span key={index} className="text-comment">
							{char}
						</span>
					);
				}
			})
		);
		setMistakes(cnt);
	}, [inputText]);

	function reset() {
		setInputText("");
		setMistakes(0);
		inputRef.current.focus();
		const wpm = Math.round(((inputText.length - mistakes) * 2) / 5);
		timerReset(wpm);
	}

	return (
		<>
			<div className="w-full h-full overflow-y-scroll" onClick={handleClick}>
				{text}
			</div>
			<input
				className="opacity-0"
				type="text"
				ref={inputRef}
				onKeyDown={handleKeyDown}
			/>
			{/* Count = {inputText.length} Mistakes = {mistakes} Words typed ={" "}
			{(inputText.length - mistakes) / 5} */}
			{modalOpen && (
				<Modal
					wpm={Math.round(((inputText.length - mistakes) * 2) / 5)}
					reset={reset}
				/>
			)}
		</>
	);
};

export default TestingText;
