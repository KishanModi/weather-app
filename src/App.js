import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { WeatherBox } from './components/WeatherBox';
import { SearchBox } from './components/SearchBox';
function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});
	const [ip, setIP] = useState({});
	const [ipWeather, setIpWeather] = useState({});
	const [show, setShow] = useState(true);
	const [isLoading, setLoading] = useState(true);

	const getData = async () => {
		await axios.get('https://geolocation-db.com/json/').then((res) => {
			setIP(res.data);
			axios
				.get(
					`https://api.open-meteo.com/v1/forecast?latitude=${res.data.latitude}&longitude=${res.data.longitude}&current_weather=true`
				)
				.then((response) => {
					setIpWeather(response.data);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		});
	};
	useEffect(() => {
		getData();

		return () => {};
	}, []);
	const btnClick = () => {
		fetch(`https://openweather-react-api.herokuapp.com/get/?city=${query}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setWeather(data);
				setQuery('');
				setShow(false);
			});
	};
	const search = (evt) => {
		if (evt.key === 'Enter') {
			fetch(`https://openweather-react-api.herokuapp.com/get/?city=${query}`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setWeather(data);
					setQuery('');
					setShow(false);
				});
		}
	};

	if (isLoading) {
		return (
			<div className="spinner-container">
				<div className="loading-spinner"></div>
			</div>
		);
	}
	return (
		<div
			className={
				typeof weather.main !== 'undefined'
					? weather.main.temp > 16
						? 'app warm'
						: 'app'
					: ipWeather.current_weather.temperature > 16
					? 'app warm'
					: 'app'
			}>
			<main>
				<SearchBox
					setQuery={setQuery}
					search={search}
					query={query}
					btnClick={btnClick}
				/>
				{/* Condition Box */}
				{show ? (
					<WeatherBox
						cityName={ip.city}
						country={ip.country_name}
						temp={ipWeather.current_weather.temperature}
						weather={''}
						extra={ipWeather}
					/>
				) : typeof weather.main !== 'undefined' ? (
					<WeatherBox
						cityName={weather.name}
						country={weather.sys.country}
						temp={weather.main.temp}
						weather={weather.weather[0].main}
						extra={ipWeather}
					/>
				) : (
					<Header text="Enter Valid City Name" />
				)}
			</main>
		</div>
	);
}

export default App;
