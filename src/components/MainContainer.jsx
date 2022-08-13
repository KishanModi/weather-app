import React, { useContext } from 'react';
import { WeatherBox } from './WeatherBox';
import { SearchBox } from './SearchBox';
import { GlobalCtx } from '../contexts/Global';
import { Header } from './Header';
export const MainContainer = () => {
	const { queryCtx, weatherCtx, ipCtx, ipWeatherCtx, showCtx } =
		useContext(GlobalCtx);

	const [query, setQuery] = queryCtx;
	const [ip] = ipCtx;
	const [weather, setWeather] = weatherCtx;
	const [ipWeather] = ipWeatherCtx;
	const [show, setShow] = showCtx;

	const getWeatherOnClick = () => {
		fetch(`https://openweather-react-api.herokuapp.com/get/?city=${query}`)
			.then((res) => res.json())
			.then((data) => {
				setWeather(data);
				setQuery('');
				setShow(false);
			});
	};
	const btnClick = () => {
		getWeatherOnClick();
	};
	const searchOnKeyPress = (evt) => {
		if (evt.key === 'Enter') {
			getWeatherOnClick();
		}
	};
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
					search={searchOnKeyPress}
					query={query}
					btnClick={btnClick}
				/>
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
};
