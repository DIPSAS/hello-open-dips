import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Launch from "./Launch";
import Patient from "./Patient";
import patientIdContext from "./patientIdContext";


const App: React.FC = () => {

    const [patientId, setPatientId] = useState<string>("");

    return (
        <patientIdContext.Provider value={{ patientId, setPatientId }} >
            <Router>
                <Routes>
                    <Route path='/' element={<Launch />} />
                    <Route path='/app' element={<Patient />} />
                </Routes>
            </Router>

        </patientIdContext.Provider>
);

}

export default App;