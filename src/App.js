import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import './App.css';
import { LoadingSpinner } from './components/LoadingSpinner';
import { MainContainer } from './components/MainContainer';
import { GlobalCtx } from './contexts/Global';

function App() {
	const { ipCtx, ipWeatherCtx, isLoadingCtx } = useContext(GlobalCtx);
	const [, setIP] = ipCtx;
	const [, setIpWeather] = ipWeatherCtx;
	const [isLoading, setLoading] = isLoadingCtx;

	useEffect(() => {
		const getData = async () => {
			const ipAddress = await axios.get(
				'https://geolocation-db.com/json/'
			);
			setIP(ipAddress.data);
			console.log(ipAddress.data);

			const ipWeatherData = await axios.get(
				`https://api.open-meteo.com/v1/forecast?latitude=${ipAddress.data.latitude}&longitude=${ipAddress.data.longitude}&current_weather=true`
			);

			setIpWeather(ipWeatherData.data);
			const changeFevicon = (res) => {
				setLoading(false);
				let link = document.querySelector("link[rel~='icon']");
				document.title = `${res.data.current_weather.temperature} °C`;
				if (res.data.current_weather.temperature > 16) {
					link.href =
						'https://raw.githubusercontent.com/KishanModi/weather-app/gh-pages/sun.png';
				} else {
					link.href =
						'https://raw.githubusercontent.com/KishanModi/weather-app/gh-pages/snow.png';
				}
			};
			changeFevicon(ipWeatherData);
		};
		getData();
	}, [setIP, setIpWeather, setLoading]);
	return <>{isLoading ? <LoadingSpinner /> : <MainContainer />}</>;
}

export default App;