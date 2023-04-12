import PetMedicalHistoryList from "./petMedicalHistoryList";
import * as constants from "./constants";
import {useParams} from "react-router-dom";
import DefaultImage from "./assets/default-pet-image.jpg";
import useFetch from './proccess_data/use_fetch';
import {Image, ListGroup, Tab, Tabs} from "react-bootstrap";


const Pet = () => {
    const {id} = useParams();
    const {data: petData, error, isPending} = useFetch(constants.URL + constants.API_GET_PET_BY_ID + id);

    const renderPet = () => {
        if (isPending) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Error: {error}</div>;
        }
        if (petData) {
            return (
                <div className="mb-5">
                    <Tabs
                        defaultActiveKey="details"
                        id="pet-tabs"
                        className="ml-5">
                        <Tab eventKey="details" title="Details">
                            {<Image className="pet-image"
                                    fluid={false}
                                    src={petData.image && petData.image.imageBase64 ? `data:image/jpeg;base64,${(petData.image.imageBase64)}` : DefaultImage}
                                    alt={petData.name}/>}
                            <ListGroup className="h-100">
                                <ListGroup.Item>
                                    {petData.species && <p> {petData.species}</p>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {petData.sex && <p> Sex: {petData.sex.toLowerCase()}</p>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {petData.name && <p> Name: {petData.name}</p>}</ListGroup.Item>
                                <ListGroup.Item>
                                    {petData.breedName && <p>Breed: {petData.breedName}</p>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {petData.birthDate && <p>Birth date: {petData.birthDate}</p>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Tab>
                        <Tab eventKey="medical-history" title="Medical Histories">
                            <PetMedicalHistoryList medicalHistories={petData.medicalHistories} petId={id}/>
                        </Tab>
                        <Tab eventKey="threads" title="Threads">
                        </Tab>
                    </Tabs>
                </div>
            )
        } else {
            return <div>No pets found.</div>;
        }
    }
    return (
        <div>
            {renderPet()}
        </div>
    );
}

export default Pet;