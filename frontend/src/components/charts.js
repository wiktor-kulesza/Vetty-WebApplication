import {Tab, Tabs} from "react-bootstrap";
import Chart from "./chart";
import {useState} from "react";

const ChartsView = ({factorsData, breedName, petName}) => {

    const [activeTab, setActiveTab] = useState(0);

    const [activeData, setActiveData] = useState(factorsData[0]);

    const toggleTab = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    const handleTabClick = (tabIndex) => () => {
        setActiveTab(tabIndex);
        setActiveData(factorsData[tabIndex]);
    };


    return (
        <div>
            <h2>Statistics</h2>
            {factorsData && factorsData.length === 0 && <div>No data found.</div>}
            <Tabs className="justify-content-center">
                {factorsData.map((factor, index) => (
                    <Tab eventKey={index} title={factor.factor} key={index}>
                        <Chart data={factor.factorsData} factorName={factor.factor} breedName={breedName}
                               petName={petName}/>
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
};

export default ChartsView;