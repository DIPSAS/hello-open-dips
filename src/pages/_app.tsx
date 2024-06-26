import '../styles/global.scss';
import '../styles/header.scss';
import Header from '../components/header';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from "react";
import FHIR from "fhirclient";
import Client from "fhirclient/lib/Client";
import clientContext from "../context/clientContext";

function MyApp({ Component, pageProps }: AppProps) {
    const [client, setClient] = useState<Client>(undefined!);
    const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		FHIR.oauth2
			.ready()
			.then((client) => {
				const updateClient = async() => {
					setClient(client)
				}
				updateClient().then(() => {
					setLoading(false)
				})
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
	}, []);

    return(
        <clientContext.Provider value={{ client: client, setClient: setClient }}>
		<Header/>
        <div className="wrapper">
            <Component {...pageProps} clientLoading={loading}>
            </Component>
        </div>
        </clientContext.Provider>
    ); 
}

export default MyApp;
