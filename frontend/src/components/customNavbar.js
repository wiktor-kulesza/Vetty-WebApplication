import {useNavigate} from "react-router-dom";
import * as constants from '../constants/constants';
import * as con from '../constants/constants';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

const CustomNavbar = () => {
  const [search, setSearch] = useState('');
  const [userExists, setUserExists] = useState(null);
  const [searchTrigger, setSearchTrigger] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    console.log("search", search)
  };

  useEffect(() => {
    if (userExists !== null && userExists === true) {
      navigate("/user/" + search);
    } else if (userExists !== null && userExists === false) {
      alert("User " + search + " does not exist");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userExists, searchTrigger]);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const url = con.URL + con.API_CHECK_IF_USER_EXISTS + "?email=" + search;
    try {
      await axios.post(url, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
          .then((response) => {
            console.log("response", response.data)
            setSearchTrigger(!searchTrigger)
            setUserExists(response.data);
          })
    } catch (error) {
      console.log(error);
    }

  };

  const handleButtonClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Remove the JWT token from local storage and redirect to the home page
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      navigate('/');
      window.location.reload();
    } else {
      // Redirect to the register page
      navigate(constants.REGISTER);
    }
  };

  return (
      //
      <Navbar className="navbar navbar-expand-lg navbar-light bg-light" bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Vetty</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"/>
          <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{maxHeight: '100px'}}
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/forum">Forum</Nav.Link>
              {!localStorage.getItem('token') && <Nav.Link href={con.LOGIN}>Login</Nav.Link>}
              {!localStorage.getItem('token') && <Nav.Link href={con.REGISTER}>SignUp</Nav.Link>}
              {localStorage.getItem('token') && <Nav.Link onClick={handleButtonClick}> Logout</Nav.Link>}
            </Nav>
            <Container>
              <Form onSubmit={handleSearchSubmit}>
                <Form.Group className="me-2" controlId="search">
                  <Row>
                    <Col>
                      <Form.Control className="me-2" type="Search" placeholder="Search users"
                                    onChange={handleSearchChange}/>
                    </Col>
                    <Col>
                      <Button variant="dark "
                              size="sm"
                              type="submit"
                              style={{maxHeight: '100%'}}>Search</Button>
                    </Col>
                  </Row>

                </Form.Group>
              </Form>
            </Container>

          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default CustomNavbar;
