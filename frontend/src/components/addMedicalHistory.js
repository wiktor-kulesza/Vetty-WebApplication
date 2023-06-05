import {useState} from "react";
import {useParams} from "react-router-dom";
import AddMedicalHistoryForm from "../forms/addMedicalHistoryForm";
import AddResultsFileForm from "../forms/addResultsFileForm";


const AddMedicalHistory = () => {
    const {petId} = useParams();

    const [bloodFactors, setBloodFactors] = useState([
        {name: "WBC", value: null},
        {name: "RBC", value: null},
        {name: "HEMOGLOBINA", value: null},
        {name: "HCT", value: null},
        {name: "MCV", value: null},
        {name: "MCH", value: null},
        {name: "MCHC", value: null},
        {name: "PLT", value: null},
        {name: "MPV", value: null},
        {name: "RDW", value: null},
        {name: "LIMFOCYTY", value: null},
        {name: "LYM", value: null},
        {name: "MONOCYTY", value: null},
        {name: "MONO", value: null},
        {name: "GRANULOCYTY", value: null},
        {name: "GRANS", value: null}
    ]);

    return (
        <div className="add-medical-history">
            <AddResultsFileForm data={bloodFactors} m setData={setBloodFactors}/>
            <AddMedicalHistoryForm petId={petId} data={bloodFactors} setData={setBloodFactors}/>
        </div>
    );
}

export default AddMedicalHistory;