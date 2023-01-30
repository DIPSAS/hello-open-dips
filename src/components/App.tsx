
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import clientContext from "../context/clientContext";
import ChoosePatient from "./ChoosePatient";
import Launch from "./Launch";
import Patient from "./Patient";
import NotFound from "./NotFound";
import Client from "fhirclient/lib/Client";
import { useEffect, useState } from "react";
import FHIR from "fhirclient"

const App: React.FC = () => {

    const [client, setClient] = useState<Client>(undefined!);

    
    useEffect(() => {
		FHIR.oauth2
			.ready()
			.then((client) => {
                setClient(client)
            })
			.catch(console.error);
	}, []);

    return (
        <clientContext.Provider value={{ client: client, setClient: setClient }}>
            <div className="wrapper">
                <Router>
                    <Routes>
                        <Route path='/' element={<Launch />} />
                        <Route path='/app' element={<ChoosePatient />} />
                        <Route path='/patient/:id' element={<Patient />} />
                        <Route path='*' element={<NotFound />}/>
                    </Routes>
                </Router>
            </div>
        </clientContext.Provider>
    );
}

export default App;