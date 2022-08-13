import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalCtx, GlobalProvider } from './contexts/Global';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<>
		<GlobalProvider>
			<App />
		</GlobalProvider>
	</>
);
