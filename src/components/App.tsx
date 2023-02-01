import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import clientContext from "../context/clientContext";
import ChoosePatient from "./ChoosePatient";
import Launch from "./Launch";
import Patient from "./Patient";
import NotFound from "./NotFound";
import Client from "fhirclient/lib/Client";
import { useEffect, useState } from "react";
import FHIR from "fhirclient";

const App: React.FC = () => {
	const [client, setClient] = useState<Client>(undefined!);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		FHIR.oauth2
			.ready()
			.then((client) => {
				setLoading(false);
				setClient(client);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
	}, []);

	return (
		<clientContext.Provider value={{ client: client, setClient: setClient }}>
			<div className="wrapper">
				<Router>
					<Routes>
						<Route path="/" element={<Launch />} />
						<Route path="/app" element={<ChoosePatient clientLoading={loading} />} />
						<Route path="/patient/:id" element={<Patient />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Router>
			</div>
		</clientContext.Provider>
	);
};

export default App;