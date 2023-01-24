import { createContext, Dispatch, SetStateAction } from "react";

interface IPatientIdContext {

	patientId: string,
	setPatientId: Dispatch<SetStateAction<string>>

}

const patientIdContext = createContext<IPatientIdContext>(undefined!);
export default patientIdContext;