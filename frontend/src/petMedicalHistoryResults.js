import {Table} from "react-bootstrap";

const PetMedicalHistoryResults = ({results}) => {
    console.log("results", results);
    return (
        <div className="medicalHistoryResults">
            {results.map((result, index) => (
                <Table striped bordered hover key={index}>
                    <thead>
                    <tr>
                        <th> Factor</th>
                        <th> Value</th>
                        <th> In Norm?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        result.factors.map((factor, factorIndex) => (
                            <tr key={factorIndex}>
                                <td className="row-height"> {factor.bloodFactorType} </td>
                                <td className="row-height"> {factor.value} </td>
                                <td className="row-height"><FactorIndicator bloodFactorType={factor}/></td>
                            </tr>))
                    }
                    </tbody>
                </Table>
            ))}
        </div>)
}


const FactorIndicator = ({bloodFactorType}) => {

    function isInNorm() {
        return !bloodFactorType.high && !bloodFactorType.low;
    }

    function isHigh() {
        return bloodFactorType.high;
    }


    if (isInNorm()) {
        return (<p className='text-success'>In norm</p>)
    } else if (isHigh()) {
        return (<p className='text-danger'>Too high</p>)
    } else {
        return (<p className='text-danger'>Too low</p>)
    }
}

export default PetMedicalHistoryResults;