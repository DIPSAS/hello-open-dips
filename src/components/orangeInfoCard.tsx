
import Link from "next/link";


type CardProps = {
    patientId: string,
}

export default function OrangeInfoCard (props: CardProps) {
    const { patientId } = props;
    
    
    return (
        <div className="orange-info-card">
            <div className="text-wrapper">
                <p>No patient found with ID: {patientId}</p>
                <button className="dipsPrimaryButton">
                    <Link className="buttonLink" href={`/searchPatient`}>
                        Return to search
                    </Link>
                </button>
            </div>
        </div>
    )
}
