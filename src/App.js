import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import fan from "./fan.svg";
import github from "./github.svg";
const App = () => {
	document.title = "Simple Fan";
	const [change, setChange] = useState(false);

	const [status, setStatus] = useState(false);
	const [speed, setSpeed] = useState(0);
	const [reverse, setReverse] = useState(false);

	const getSpeed = () => {
		if (speed === 1) return "3s";
		if (speed === 2) return "2s";
		if (speed === 3) return "1s";
	};
	const handleSpeedClick = async () => {
		axios
			.get("https://simple-fan-api.herokuapp.com/pullSpeedCord")
			.catch((err) => console.log(err));
		setChange(true);
	};

	const handleReverseClick = async () => {
		axios
			.get("https://simple-fan-api.herokuapp.com/pullReverseCord")
			.catch((err) => console.log(err));
		setChange(true);
	};

	const handleResetClick = async () => {
		axios
			.get("https://simple-fan-api.herokuapp.com/reset")
			.catch((err) => console.log(err));
		setChange(true);
	};

	useEffect(() => {
		axios
			.get("https://simple-fan-api.herokuapp.com/")
			.then((res) => {
				setSpeed(res.data.speed);
				setReverse(res.data.reverse);
				setStatus(res.data.status);
			})
			.catch((err) => console.log(err));

		setChange(false);
	}, [change]);

	return (
		<div className='App'>
			<h1 className='title'>
				Simple Fan
				<a href='https://github.com/AhmedAlbarghouti/simple-fan'>
					<img src={github} alt='github' className='github-icon' />
				</a>
			</h1>
			<main>
				<div className='fan-details'>
					<div className='fan-detail'>
						<h2>Speed</h2>
						<p>{speed}</p>
					</div>

					<div className='fan-detail'>
						<h2>Reverse</h2>
						<p>{reverse.toString()}</p>
					</div>

					<div className='fan-detail'>
						<h2>Status</h2>
						<p>{status.toString()}</p>
					</div>
				</div>

				<img
					src={fan}
					alt='fan'
					className='fan'
					style={{
						animationDuration: getSpeed(),
						animationDirection: reverse ? "reverse" : "normal",
					}}
				/>
				<div className='control-bar'>
					<button onClick={handleSpeedClick}>Speed Cord</button>
					<button onClick={handleReverseClick}>Reverse Cord</button>
					<button onClick={handleResetClick}>Reset Cord</button>
				</div>
			</main>

			<footer>
				<a href='https://simple-fan-api.herokuapp.com/' className='footer-name'>
					Api-Get Info
				</a>
				|
				<a href='https://www.ahmedalbarghouti.dev/' className='footer-name'>
					Api-Github
				</a>
				|
				<a href='https://www.ahmedalbarghouti.dev/' className='footer-name'>
					Ahmed Albarghouti
				</a>
			</footer>
		</div>
	);
};

export default App;
