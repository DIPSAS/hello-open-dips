import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Launch from './Launch';
import './App.css';
import patientIdContext from './patientIdContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const [patientId, setPatientId] = useState<string>("");

root.render(

	<patientIdContext.Provider value={{ patientId: patientId, setPatientId: setPatientId }} >

		<Router>
			<Routes>
				<Route path='/' element={<Launch />} />
				<Route path='/app' element={<App />} />
			</Routes>
		</Router>

	</patientIdContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();