import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OrgIdGridItem from '../components/OrgIdGridItem';

import Footer from '../components/Footer';
import {Button} from '@material-ui/core';

export default function Home(props) {
    const {orgIds} = props;
    return (
        <Container>
            <Row className="justify-content-center text-center mt-1">
                <Col xs={10}><h1>Home</h1></Col>
            </Row>
            <Row><Button onClick={props.scrapeOrganizations}>Fetch orgIds</Button></Row>
            {orgIds && orgIds.map(orgId => <OrgIdGridItem adress={orgId}/>)}

            <Footer/>
        </Container>
    );
}
