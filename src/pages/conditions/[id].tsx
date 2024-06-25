
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { R4 } from "@ahryman40k/ts-fhir-types";
import Link from "next/link";

import useConditions from "@/hooks/useConditions";
import Spinner from "@/components/loading";
import PatientOverview from "@/components/patientOverview";
import OrangeInfoCard from "@/components/orangeInfoCard";

const Conditions: React.FC = () => {
    const patientId: string = useRouter().query.id as string;
    
    const { conditionsBundle, loading } = useConditions(patientId);
    
    if (loading) return <Spinner />;

    if (!loading && !conditionsBundle) {
		return (
			<div>
                <PatientOverview patientId={patientId}/>
                <div className="wrapper">
                    <OrangeInfoCard patientId={patientId} />
                </div>
            </div>
	    );
    }

    if (!loading && conditionsBundle) {   
        console.log(conditionsBundle);
        return (
            <div className="conditions-wrapper">
                <PatientOverview patientId={patientId}/>
                <div className="conditions-container">
                    <p className="conditions-title">Conditions</p>

                    {conditionsBundle.total && <ul className="conditions-list">
                        {conditionsBundle.entry?.map((entry) => {
                            const condition = entry.resource as R4.ICondition;
                            return (
                                <li key={condition.id} className="conditions-listitem">
                                    <div>{`${condition?.code?.coding?.[0].display}`}</div>
                                    <div>Registered date: {`${condition.recordedDate}`}</div>
                                </li>
                            )
                        })}

                    </ul>}
                    {!conditionsBundle.total && <p className="conditions-error">
                        Patient has no conditions.
                    </p>}
                    
                </div>
            </div>
        );

    }
    
}
export default Conditions;