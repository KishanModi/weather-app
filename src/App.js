import React from 'react';
import './App.css';
import axios from 'axios';
import { useEffect, useContext } from 'react';
import { LoadingSpinner } from './components/LoadingSpinner';
import { MainContainer } from './components/MainContainer';
import { GlobalCtx } from './contexts/Global';
function App() {
	const { ipCtx, ipWeatherCtx, isLoadingCtx } = useContext(GlobalCtx);
	const [, setIP] = ipCtx;
	const [, setIpWeather] = ipWeatherCtx;
	const [isLoading, setLoading] = isLoadingCtx;

	useEffect(() => {
		const getData = () => {
			axios
				.get('https://geolocation-db.com/json/')
				.then((res) => {
					setIP(res.data);
					return res.data;
				})
				.then((res) =>
					axios.get(
						`https://api.open-meteo.com/v1/forecast?latitude=${res.latitude}&longitude=${res.longitude}&current_weather=true`
					)
				)
				.then((res) => {
					setIpWeather(res.data);
					setLoading(false);
				});
		};
		getData();
	}, [setIP, setIpWeather, setLoading]);

	return <>{isLoading ? <LoadingSpinner /> : <MainContainer />}</>;
}

export default App;
