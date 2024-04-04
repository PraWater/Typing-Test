import { useState, useEffect } from "react";
import TestingText from "./components/TestingText";
import SignInButton from "./components/SignInButton";
import LogOutButton from "./components/LogOutButton";
import ChartModal from "./components/ChartModal";
import generateText from "./utils/generateText";
import { db, auth } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
	const [time, setTime] = useState(30);
	const [timerOn, setTimerOn] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [graphOpen, setGraphOpen] = useState(false);
	const [text, setText] = useState(generateText());
	const [user, setUser] = useState(null);
	let timer;

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				setUser(user);
				console.log("uid", uid);
			} else {
				// User is signed out
				setUser(null);
				console.log("user is logged out");
			}
		});
	}, []);

	const logOut = async () => {
		await signOut(auth);
		setUser(null);
		console.log("logged out");
	};

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

	function timerReset(wpm) {
		clearInterval(timer);
		setTime(30);
		setTimerOn(false);
		setModalOpen(false);
		setText(generateText());
		const storeTime = async () => {
			const timesRef = collection(db, "times");
			console.log(wpm);
			await addDoc(timesRef, {
				uid: user.uid,
				wpm: wpm,
				time: serverTimestamp(),
			});
		};
		if (user) {
			storeTime();
		}
	}

	return (
		<>
			{user ? (
				<div className="absolute top-5 right-5 flex gap-5">
					<img
						src="/GraphIcon.svg"
						alt="graph"
						className="cursor-pointer"
						onClick={() => {
							setGraphOpen(true);
						}}
					/>
					<LogOutButton logOut={logOut} />
				</div>
			) : (
				<SignInButton />
			)}
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
			{graphOpen && <ChartModal reset={() => setGraphOpen(false)} />}
		</>
	);
}

export default App;
