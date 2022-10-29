import "./App.css";
import { useState } from "react";
import fan from "./fan.svg";
const App = () => {
	const [data, setData] = useState({ data: [] });
	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState("");
	const [status, setStatus] = useState(false);
	const [speed, setSpeed] = useState(0);
	const [reverse, setReverse] = useState(false);

	const handleClick = async () => {
		setIsLoading(true);

		try {
			const response = await fetch("https://simple-fan-api.herokuapp.com/", {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`Error! status: ${response.status}`);
			}

			const result = await response.json();

			setSpeed(result.speed);
			setStatus(result.status);
			setReverse(result.reverse);

			setData(result);
		} catch (err) {
			setErr(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='App'>
			<h1 className='title'>Simple Fan</h1>
			<main>
				<div className='fan-details'>
					<div className='fan-detail'>
						<h2>Speed</h2>
						<p>{speed}</p>
					</div>

					<div className='fan-detail'>
						<h2>Status</h2>
						<p>{status.toString()}</p>
					</div>

					<div className='fan-detail'>
						<h2>Reverse</h2>
						<p>{reverse.toString()}</p>
					</div>
				</div>

				<img src={fan} alt='fan' className='fan' />
				<div className='control-bar'>
					<button onClick={handleClick}>Speed Cord</button>
					<button onClick={handleClick}>Reverse Cord</button>
					<button onClick={handleClick}>Reset Cord</button>
				</div>
			</main>

			<footer>
				<p>
					Made by{" "}
					<a href='https://www.ahmedalbarghouti.dev/' className='footer-name'>
						Ahmed Albarghouti
					</a>
				</p>
			</footer>
		</div>
	);
};

export default App;
