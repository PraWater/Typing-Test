import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import "./testingText.css";

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
							<span key={index} className="typed">
								{char}
							</span>
						);
					} else {
						++cnt;
						if (char === " ") {
							return (
								<span key={index} className="typedExtra">
									{inputText[index] + " "}
								</span>
							);
						}
						return (
							<span key={index} className="typedWrong">
								{char}
							</span>
						);
					}
				} else if (index === inputText.length) {
					return (
						<span
							key={index}
							className="didntType"
							style={{ textDecoration: "underline" }}
						>
							{char}
						</span>
					);
				} else {
					return (
						<span key={index} className="didntType">
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
			<div className="textBox" onClick={handleClick}>
				{text}
			</div>
			<input
				style={{ opacity: 0 }}
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
