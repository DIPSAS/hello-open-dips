import FHIR from "fhirclient"
import { useEffect, useState } from 'react'
import { R4 } from "@ahryman40k/ts-fhir-types";
import { ReactComponent as ManIcon } from './man-icon.svg'

const App = () => {
        const [patient, setPatient] = useState<R4.IPatient | undefined>();

        useEffect(() => {
                FHIR.oauth2
                        .ready()
                        .then((client) =>
                                client.request({
                                        url: "/Patient/cdp1000807",
                                        headers: { "dips-subscription-key": process.env.REACT_APP_DIPS_SUBSCRIPTION_KEY! },
                                })
                        )
                        .then(setPatient)
                        .catch(console.error);
        }, []);

        useEffect(() => {
                console.log(patient);
        }, [patient]);

        const getFormattedDate = () => {
                const timestamp = Date.parse(patient?.birthDate!)
                const dateObject = new Date(timestamp);

                return dateObject.toString();

        }


        return (
                <>
                        <div className="logo"></div>
                        <div className="wrapper">
                                <div className="blue-info-card">
                                        {patient &&
                                                <div className="text-wrapper">
                                                        <div className="person-icon">
                                                                <ManIcon />
                                                        </div>
                                                        <p className="card-name">{patient?.name![0].given} {patient?.name![0].family}</p>
                                                        <p>{patient?.name![0].given} {patient?.name![0].family} is a {patient?.gender!} patient born {patient?.birthDate!}. </p>
                                                </div>
                                        }
                                </div>
                        </div>
                </>



        );
};

export default App;
