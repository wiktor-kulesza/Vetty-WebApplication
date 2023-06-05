import PetMedicalHistoryList from "./petMedicalHistoryList";
import {useLocation, useParams} from "react-router-dom";
import DefaultImage from "../assets/default-pet-image.jpg";
import {Container, Image, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
import ThreadList from "./threadList";
import * as con from '../constants/constants';
import useFetch from "../services/use_fetch";
import ChartsView from "./charts";


const Pet = () => {
    const {id} = useParams();
    const {state} = useLocation();
    const {petData} = state;

    const {
        data: threads
    } = useFetch(con.URL + con.API_GET_ALL_THREADS_BY_PET_ID + petData.id);

    const {
        data: stats
    } = useFetch(con.URL + con.API_GET_PET_STATISTICS_BY_ID + petData.id);

    const isYourProfile = localStorage.getItem('userEmail') === petData.ownerEmail;

    const renderPet = () => {
        if (petData) {
            return (
                <Container className="mb-5">
                    <Row className="mb-5">
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
                                <PetMedicalHistoryList medicalHistories={petData.medicalHistories} petId={id}
                                                       isYourProfile={isYourProfile}/>
                            </Tab>
                            <Tab eventKey="threads" title="Threads">
                                <ThreadList threads={threads} isYourProfile={isYourProfile}/>
                            </Tab>
                            <Tab eventKey="charts" title="Statistics">
                                {stats &&
                                <ChartsView factorsData={stats} breedName={petData.breedName} petName={petData.name}/>}
                            </Tab>
                        </Tabs>
                    </Row>

                </Container>
            )
        } else {
            return <div>No pet found.</div>;
        }
    }
    return (
        <div>
            {renderPet()}
        </div>
    );
}

export default Pet;