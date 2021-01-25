import React from 'react'
import Wrapper from "../Wrapper/Wrapper";
import {Container, Nav, Navbar} from "react-bootstrap";

const Layout = props => {

    return <Wrapper>
        <>

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    Doctor
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/doctor/add">Doctor Add</Nav.Link>
                    <Nav.Link href="/patient/add">Patient Reserve</Nav.Link>
                </Nav>

            </Navbar>
        </>
        <Container>
            {props.children}
        </Container>
    </Wrapper>

}

export default Layout;