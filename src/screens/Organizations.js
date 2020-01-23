import React from "react";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Organizations() {
    return (
        <Container>
            <Row className="justify-content-center text-center mt-1">
                <Col><h2>Organizations</h2></Col>
            </Row>
            <Row className="justify-content-center mt-1">
                <ListGroup>

                </ListGroup>
            </Row>
        </Container>
    );
}
