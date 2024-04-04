import { signInWithGooglePopUp } from "../firebase";

const SignInButton = () => {
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopUp();
		console.log(response);
	};

	return (
		<button
			onClick={logGoogleUser}
			className="bg-background hover:bg-comment hover:text-background text-comment border-comment border py-2 px-4 rounded absolute top-5 right-5"
		>
			Sign in with Google
		</button>
	);
};

export default SignInButton;
