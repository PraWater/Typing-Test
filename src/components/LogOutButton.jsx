const LogOutButton = ({ logOut }) => {
	return (
		<button
			onClick={logOut}
			className="bg-background hover:border-comment border-background text-comment border py-2 px-4 rounded absolute top-5 right-5"
		>
			Log Out
		</button>
	);
};
export default LogOutButton;
