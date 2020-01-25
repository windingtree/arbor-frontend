import React from "react";

import {Container} from '@material-ui/core';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OrgIdGridItem from '../components/OrgIdGridItem';


const mockOrgs =
    [
        {
            address: "1232323",
            name: "Organization1",
            isSub: false,
            subs: [
                {
                    address: "1",
                    name: "HotelName",
                    isSub: true,
                },
                {
                    address: "2",
                    name: "AirlineName",
                    isSub: true,
                    segment: "airline"
                },
            ]
        }];

export default function Organizations(props) {
    const orgs = props.organizations || mockOrgs;
    return (
        <Container>
            <Row className="justify-content-center text-center mt-1">
                <Col><h2>Organizations</h2></Col>
            </Row>
            {orgs.map(org => <OrgIdGridItem key={org.address} isSub={org.isSub} address={org.address} name={org.name}
                                            subs={org.subs}/>)}
        </Container>
    );
}
