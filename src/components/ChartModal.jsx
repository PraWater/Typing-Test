import { db, auth } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import Chart from "./Chart";
import { useEffect, useState } from "react";

const ChartModal = ({ reset }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetch = async () => {
			let times = [];
			const q = query(
				collection(db, "times"),
				where("uid", "==", auth.currentUser.uid),
				orderBy("time")
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
				times.push(doc.data().wpm);
			});
			setData(
				times.map((wpm, i) => {
					return [i + 1, wpm];
				})
			);
		};
		fetch();
	}, []);
	return (
		<div className="absolute top-0 left-0 w-screen h-screen grid place-items-center">
			<div
				onClick={reset}
				className="absolute top-0 left-0 w-screen h-screen bg-[#000000] bg-opacity-50"
			></div>
			<div className="w-fit h-fit bg-background rounded-xl flex flex-col items-center justify-center text-foreground p-5 z-10">
				<Chart data={data} />
			</div>
		</div>
	);
};

export default ChartModal;
