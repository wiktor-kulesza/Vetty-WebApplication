import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Col, Container, Dropdown, Form, Row} from "react-bootstrap";

const breeds = ["Labrador", "Poodle", "Golden Retriever", "Bulldog", "Chihuahua", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const tags = ["Training", "Health", "Behavior", "Adoption", "Grooming"];

function ForumView() {
    const [showSearchCriteria, setShowSearchCriteria] = useState(false);
    const [species, setSpecies] = useState("");
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [ageRange, setAgeRange] = useState([1, 25]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(breeds);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Handle search form submission
    };

    const handleBreedClick = (breed) => {
        if (selectedBreeds.includes(breed)) {
            setSelectedBreeds(selectedBreeds.filter((selectedBreed) => selectedBreed !== breed));
        } else {
            setSelectedBreeds([...selectedBreeds, breed]);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        const filteredBreeds = breeds.filter((breed) =>
            breed.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setSearchResults(filteredBreeds);
    };

    return (
        <Container>
            <Row>
                <h1 className="mb-0">Forum</h1>
            </Row>
            <Row>
                <div className="d-flex align-items-center mb-3">
                    <Col>
                        <Link to="/create/thread">
                            <Button>Create new thread</Button>
                        </Link>
                    </Col>
                    <Col><Button onClick={() => setShowSearchCriteria(!showSearchCriteria)}>
                        {showSearchCriteria ? "Hide Search Criteria" : "Show Search Criteria"}
                    </Button></Col>

                </div>
            </Row>
            {showSearchCriteria && (
                <Form onSubmit={handleSearchSubmit}>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="secondary" id="species-dropdown">
                            {species ? species : "Select species"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSpecies("")}>All species</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSpecies("dog")}>Dog</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSpecies("cat")}>Cat</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="secondary" id="breed-dropdown">
                            {selectedBreeds.length > 0 ? selectedBreeds.join(", ") : "Select breeds"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Form.Group className="mb-3">
                                <Form.Label>Breed</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter breed"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <div className="scrollable-container">
                                    {searchResults.map((breed) => (
                                        <Form.Check
                                            key={breed}
                                            type="checkbox"
                                            label={breed}
                                            checked={selectedBreeds.includes(breed)}
                                            onChange={() => handleBreedClick(breed)}
                                        />
                                    ))}
                                </div>
                            </Form.Group>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Group className="mb-3">
                        <Form.Label>Age Range</Form.Label>
                        <input
                            type="range"
                            min="1"
                            max="25"
                            value={ageRange[1]}
                            onChange={(event) => setAgeRange([ageRange[0], parseInt(event.target.value)])}
                            className="form-range me-2"
                        />
                        <span className="me-2">{ageRange[0]} Years -</span>
                        <span>{ageRange[1]} Years</span>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tags</Form.Label>
                        <div className="scrollable-container">
                            {tags.map((tag) => (
                                <Form.Check
                                    key={tag}
                                    type="checkbox"
                                    id={tag}
                                    label={tag}
                                />
                            ))}
                        </div>
                    </Form.Group>
                    <Button type="submit" variant="primary">Search</Button>
                </Form>
            )}
        </Container>);
}

export default ForumView;




