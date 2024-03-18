import english from "./english.json";

export default function generateText() {
	const text = [];
	for (let i = 0; i < 90; i++) {
		text.push(english.words[Math.floor(Math.random() * english.words.length)]);
	}
	return text.join(" ");
}
