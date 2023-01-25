
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChoosePatient from "./ChoosePatient";
import Launch from "./Launch";
import Patient from "./Patient";



const App: React.FC = () => {


    return (
        <div className="wrapper">
            <Router>
                <Routes>
                    <Route path='/' element={<Launch />} />
                    <Route path='/app' element={<ChoosePatient />} />
                    <Route path='/patient/:id' element={<Patient />} />
                </Routes>
            </Router>
        </div>
    );

}

export default App;