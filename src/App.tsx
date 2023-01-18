import React from 'react';
import logo from './logo.svg';
import './App.css';
import FHIR from "fhirclient"
import { useEffect } from 'react'


const App = () => {

        useEffect(() => {
                FHIR.oauth2.ready()
                        .then(client => client.request({ "url": "/Patient/cdp2010025", "headers": { "dips-subscription-key": process.env.REACT_APP_DIPS_SUBSCRIPTION_KEY! } }))
                        .then(console.log)
                        .catch(console.error);
        }, [])

        return (
                <div className="App">

                </div>
        );
}

export default App;
