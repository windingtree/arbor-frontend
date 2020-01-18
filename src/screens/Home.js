import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
    return (
        <Container>
            <Row className="justify-content-center text-center mt-1">
                <Col xs={10}><h1>Home</h1></Col>
            </Row>
        </Container>
    );
}
