import React, {useEffect, useState} from "react";
import {Button, Col, Container, Dropdown, Form, Row} from "react-bootstrap";
import AddThreadForm from "./forms/addThreadForm";
import useFetch from "./proccess_data/use_fetch";
import * as constants from "./constants";
import ThreadList from "./threadList";


function ForumView() {
    const [showSearchCriteria, setShowSearchCriteria] = useState(false);
    const [showAddThread, setShowAddThread] = useState(false);

    const [species, setSpecies] = useState(null);

    const [allBreeds, setAllBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [breedsToShow, setBreedsToShow] = useState(allBreeds);
    const [breedSearchTerm, setBreedSearchTerm] = useState("");

    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(25);

    const [selectedTags, setSelectedTags] = useState([]);

    const [threads, setThreads] = useState([]);

    const {
        data: breedsData,
    } = useFetch(constants.URL + constants.API_GET_ALL_BREEDS);

    const {
        data: tagsData,
    } = useFetch(constants.URL + constants.API_GET_ALL_TAGS);

    const {
        data: pets,
    } = useFetch(constants.URL + constants.API_GET_PETS_BY_USER_EMAIL + localStorage.getItem('userEmail'));

    const {
        data: threadsFromServer,
    } = useFetch(constants.URL + constants.API_GET_ALL_THREADS);

    useEffect(() => {
        console.log("threadsFromServer", threadsFromServer)
        setThreads(threadsFromServer);
    }, [threadsFromServer]);

    useEffect(() => {
        setAllBreeds(breedsData);
    }, [breedsData]);

    useEffect(() => {
        if (species) {
            setBreedsToShow(allBreeds.filter((breed) => species.includes(breed.type.toLowerCase())));
        }
    }, [species]);

    useEffect(() => {
        setBreedsToShow(allBreeds);
    }, [allBreeds]);

    const handleAddThreadButtonClick = () => {
        setShowAddThread(!showAddThread);
    };

    const handleSearchSubmit = async (event) => {
        console.log("HANDLE SEARCH SUBMIT")
        event.preventDefault();

        const selectedBreedsNames = selectedBreeds.map((breed) => breed.name);
        const selectedTagsNames = selectedTags.map((tag) => tag.value);
        const selectedSpeciesNames = species ? species : ["dog", "cat"]
        console.log("selectedBreeds", selectedBreedsNames)
        console.log("species", species)
        console.log("minAge", minAge)
        console.log("maxAge", maxAge)
        console.log("selectedTags", selectedTagsNames)

        try {
            // Send a POST request with the form data to URL2 using async/await
            const response = await fetch(constants.URL + constants.API_SEARCH_THREADS, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    species: selectedSpeciesNames,
                    breeds: (selectedBreedsNames && selectedBreedsNames.length && selectedBreedsNames.length > 0) ? selectedBreedsNames : null,
                    minAge: minAge,
                    maxAge: maxAge,
                    tags: (selectedTagsNames && selectedTagsNames.length && selectedTagsNames.length > 0) ? selectedTagsNames : null,
                })
            })
            const data = await response.json();
            if (data) {
                if (response.status === 200) {
                    // setThreads(data);
                }
                console.log("data", data)
            }
        } catch (error) {
            console.error('Failed to search threads:', error);
        }
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
        setBreedSearchTerm(event.target.value);
        const tmpFilteredBreeds = allBreeds.filter((breed) =>
            breed.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        console.log("search term", event.target.value.toLowerCase())
        setBreedsToShow(tmpFilteredBreeds);
    };

    const handleMinChange = (e) => {
        const value = parseInt(e.target.value);
        if (value <= maxAge) {
            setMinAge(value);
        }
    };

    const handleMaxChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= minAge && value <= 25) {
            setMaxAge(value);
        }
    };

    const handleTagClick = (tag) => {
        console.log("HANDLE TAG CLICK")
        if (selectedTags.includes(tag)) {
            console.log("includes")
            setSelectedTags(selectedTags.filter((selectedTag) => selectedTag.value !== tag.value));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleThreadAdded = (newThread) => {
        setThreads([...threads, newThread]);
        setShowAddThread(false);
    };

    return (
        <Container className="align-items-center">
            <Row>
                <h1 className="mb-0">Forum</h1>
            </Row>
            <Row>
                <Container className="d-flex align-items-center mb-3">
                    <Col>
                        <Button onClick={handleAddThreadButtonClick}>
                            {showAddThread ? "Cancel" : "Add new thread"}
                        </Button>
                    </Col>
                    <Col><Button onClick={() => {
                        setShowSearchCriteria(!showSearchCriteria)
                    }}>
                        {showSearchCriteria ? "Hide Search Criteria" : "Show Search Criteria"}
                    </Button></Col>

                </Container>
            </Row>
            <Container className="mb-3">
                {showAddThread && <AddThreadForm authorEmail={localStorage.getItem('userEmail')} pets={pets}
                                                 onThreadAdded={handleThreadAdded}/>}
            </Container>
            <div className="mb-3">{showSearchCriteria && (
                <Container className="border p-3 mb-4">
                    <Form onSubmit={handleSearchSubmit}>
                        <Form.Label>Search Criteria</Form.Label>
                        <Row>
                            <Col className="mb-3">
                                <Form.Text>Species</Form.Text>
                                <Dropdown className="mb-3">
                                    <Dropdown.Toggle variant="secondary" id="species-dropdown">
                                        {species ? species : "Select species"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setSpecies(null)}>All species</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSpecies(["dog"])}>Dog</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSpecies(["cat"])}>Cat</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Form.Text>Breeds</Form.Text>
                                <Dropdown className="mb-3">
                                    <Dropdown.Toggle variant="secondary" id="breed-dropdown">
                                        {selectedBreeds.length > 0 ? selectedBreeds.map(breed => {
                                            return (
                                                <Col>
                                                    <span className="text-light">{breed.name + ", "}</span>
                                                </Col>
                                            )
                                        }) : <span className="text-light"> Select breeds </span>}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter breed"
                                                value={breedSearchTerm}
                                                onChange={handleSearchChange}
                                            />
                                            <div className="scrollable-container">
                                                {breedsToShow && breedsToShow.map((breed, index) => (
                                                    <Form.Check
                                                        key={index}
                                                        type="checkbox"
                                                        label={breed.name}
                                                        checked={selectedBreeds.includes(breed)}
                                                        onChange={() => handleBreedClick(breed)}
                                                    />
                                                ))}
                                            </div>
                                        </Form.Group>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Form.Group as={Row}>
                                    <Form.Text>
                                        Min Age
                                    </Form.Text>
                                    <Col sm={2}>
                                        <Form.Control
                                            type="number"
                                            value={minAge}
                                            onChange={handleMinChange}
                                            min={0}
                                            max={maxAge}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Text>
                                        Max Age
                                    </Form.Text>
                                    <Col sm={2}>
                                        <Form.Control
                                            type="number"
                                            value={maxAge}
                                            onChange={handleMaxChange}
                                            min={minAge}
                                            max={25}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Text>Tags</Form.Text>
                            <div className="scrollable-container">
                                {tagsData && tagsData.map((tag, index) => (
                                    <Form.Check
                                        key={index}
                                        type="checkbox"
                                        id={index}
                                        label={tag.value}
                                        onChange={() => handleTagClick(tag)}
                                    />
                                ))}
                            </div>
                        </Form.Group>
                        <Button type="submit" variant="primary">Search</Button>
                    </Form>
                </Container>
            )}
                {threads && (
                    <ThreadList threads={threads}/>
                )}</div>

        </Container>);
}

export default ForumView;




