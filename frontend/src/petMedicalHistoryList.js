const PetMedicalHistoryList = ({medicalHistories}) => {
    const renderMedicalHistory = () => {
        if (medicalHistories) {
            return (
                <div className="medicalHistoryList">
                    <p> It will be medical history list</p>
                    {
                        medicalHistories.map(medicalHistory => (
                            <MedicalHistory medicalHistory={medicalHistory}/>
                        ))
                    }

                </div>
            )
        } else {
            return <div>No medical histories found.</div>;
        }
    }
    return (
        <div>
            <h2>Medical History</h2>
            {renderMedicalHistory()}
        </div>
    );
}

const MedicalHistory = ({medicalHistory}) => {
    return (<div className="medicalHistory">
        <p> It will be medical history</p>
    </div>)
}

export default PetMedicalHistoryList;