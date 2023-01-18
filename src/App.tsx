import React from 'react';
import logo from './logo.svg';
import './App.css';
import FHIR from "fhirclient"
import { useEffect, useState } from 'react'
import { R4 } from "@ahryman40k/ts-fhir-types";

const App = () => {
	const [patient, setPatient] = useState<R4.IPatient | undefined>();

	useEffect(() => {
		FHIR.oauth2
			.ready()
			.then((client) =>
				client.request({
					url: "/Patient/cdp2010025",
					headers: { "dips-subscription-key": process.env.REACT_APP_DIPS_SUBSCRIPTION_KEY! },
				})
			)
			.then(setPatient)
			.catch(console.error);
	}, []);

	useEffect(() => {
		console.log(patient);
	}, [patient]);

	return <div className="App">{patient && <p>Hello {patient?.name![0].text}</p>}</div>;
};

export default App;
