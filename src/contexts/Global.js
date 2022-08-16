import React, { useState } from 'react';

const GlobalCtx = React.createContext();

const GlobalProvider = ({ children }) => {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});
	const [ip, setIP] = useState({});
	const [ipWeather, setIpWeather] = useState({});
	const [show, setShow] = useState(true);
	const [isLoading, setLoading] = useState(true);
	const [results, setResult] = useState([]);
	const [update, setUpdate] = useState(false);
	return (
		<GlobalCtx.Provider
			value={{
				queryCtx: [query, setQuery],
				weatherCtx: [weather, setWeather],
				ipCtx: [ip, setIP],
				ipWeatherCtx: [ipWeather, setIpWeather],
				showCtx: [show, setShow],
				isLoadingCtx: [isLoading, setLoading],
				resultsCtx: [results, setResult],
				updateCtx: [update, setUpdate]
			}}>
			{children}
		</GlobalCtx.Provider>
	);
};

export { GlobalCtx, GlobalProvider };
