import {useNavigate} from "react-router-dom";
import * as constants from './constants';
import * as con from './constants';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";

const CustomNavbar = () => {
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate('/');
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
                Vetty
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
                      <Button variant="outline-success" size="sm" type="submit">Search</Button>
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