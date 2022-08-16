import React, { useContext, useEffect, useRef } from 'react';
import { WeatherBox } from './WeatherBox';
import { SearchBox } from './SearchBox';
import { GlobalCtx } from '../contexts/Global';
import { Header } from './Header';
import axios from 'axios';
export const MainContainer = () => {
	const {
		queryCtx,
		weatherCtx,
		ipCtx,
		ipWeatherCtx,
		showCtx,
		resultsCtx,
		updateCtx
	} = useContext(GlobalCtx);
	const aRef = useRef(null);
	const [query, setQuery] = queryCtx;
	const [ip] = ipCtx;
	const [weather, setWeather] = weatherCtx;
	const [ipWeather] = ipWeatherCtx;
	const [show, setShow] = showCtx;
	const [results, setResult] = resultsCtx;
	const [update, setUpdate] = updateCtx;

	useEffect(() => {
		const getQuery = async () => {
			const getData = await axios.get(
				`https://openweather-react-api.herokuapp.com/searchCity?city=${query}`
			);
			if (getData.data.success) {
				setResult(getData.data.data);
			} else {
				setResult([]);
			}
		};
		if (query.length < 3 && update) {
			console.log(query.length);
			setResult([]);
		} else if (update && query.length > 3) {
			getQuery();
		} else {
			setResult([]);
		}
		return () => {
			console.log(query.length);
			if (query.length === 0) {
				setResult([]);
			}
		};
	}, [query, update, setResult]);

	const getWeatherOnClick = (q) => {
		fetch(`https://openweather-react-api.herokuapp.com/get/?city=${q}`)
			.then((res) => res.json())
			.then((data) => {
				setWeather(data);
				setQuery('');
				setShow(false);
				return data;
			})
			.then((res) => {
				let link = document.querySelector("link[rel~='icon']");
				document.title = `${res.name} ${res.main.temp} °C`;
				if (res.main.temp > 16) {
					link.href =
						'https://raw.githubusercontent.com/KishanModi/weather-app/gh-pages/sun.png';
				} else {
					link.href =
						'https://raw.githubusercontent.com/KishanModi/weather-app/gh-pages/snow.png';
				}
			});
	};
	const btnClick = () => {
		getWeatherOnClick(query);
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
				<div className='search-cont'>
					<SearchBox
						setQuery={setQuery}
						setUpdate={setUpdate}
						search={searchOnKeyPress}
						query={query}
						results={results}
						btnClick={btnClick}
					/>
					{results.length !== 0 && (
						<div
							className='dataResult'
							style={
								results.length < 2 ? { height: 'auto' } : null
							}>
							{results.slice(0, 15).map((value, key) => {
								return (
									<a
										ref={aRef}
										key={key}
										className='dataItem'
										href='#n'
										onClick={() => {
											getWeatherOnClick(
												`${value.name}, ${value.country}`
											);
											return false;
										}}
										rel='noreferrer'>
										<p>
											{value.name}, {value.country}{' '}
										</p>
									</a>
								);
							})}
						</div>
					)}
				</div>
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
					<Header text='Enter Valid City Name' />
				)}
			</main>
		</div>
	);
};
