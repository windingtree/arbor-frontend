import React from 'react';
import { Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {SAMPLE_ORGANISATION_SIMARD, SAMPLE_ORGANISATION_SIMARD_SUBSIDIARIES, SAMPLE_OGRANIZATION_TRIPS_COMMUNITY} from "../../fixtures.data"

import {withStore} from "../../addon-store-decorator";
import {Organization} from "../../../routes/Organization/Organization";
import {MemoryRouter, Route} from "react-router";

const dummyHandler = () => {

}
const verifications = {
    domain: true,
    ssl: true,
    lif: true,
    social: {
        facebook: true,
        twitter: true,
        linkedin: true,
        instagram: true
    }
};

storiesOf('ORG ID/Routes/Organization', module)
    .addDecorator(withStore)
    .add('Organization page - Simard', () => {
        return (
            <MemoryRouter initialEntries={[`/my-organizations/${SAMPLE_ORGANISATION_SIMARD.orgid}`]}>
                <Route path='/my-organizations/:orgId'>
                    <Container>
                        <Organization
                            assertions={SAMPLE_ORGANISATION_SIMARD.jsonContent.trust.assertions}
                            verifications={verifications}
                            organization={SAMPLE_ORGANISATION_SIMARD}
                            isFetchingDeposit={false}
                            orgIdLifDepositAmount={999}
                            subs={SAMPLE_ORGANISATION_SIMARD_SUBSIDIARIES}
                            fetchOrganizationInfo={() => {
                                return SAMPLE_ORGANISATION_SIMARD
                            }}
                            fetchOrganizationSubsInfo={dummyHandler}
                            setOrgId={dummyHandler}
                            resetOrgId={dummyHandler}
                        />
                    </Container>
                </Route>
            </MemoryRouter>
        )
    })
    .add('Organization page - Trips community', () => {
        return (
            <MemoryRouter initialEntries={[`/my-organizations/${SAMPLE_OGRANIZATION_TRIPS_COMMUNITY.orgid}`]}>
                <Route path='/my-organizations/:orgId'>
                    <Container>
                        <Organization
                            assertions={SAMPLE_OGRANIZATION_TRIPS_COMMUNITY.jsonContent.trust.assertions}
                            verifications={verifications}
                            organization={SAMPLE_OGRANIZATION_TRIPS_COMMUNITY}
                            isFetchingDeposit={false}
                            orgIdLifDepositAmount={999}
                            subs={[]}
                            fetchOrganizationInfo={() => {
                                return SAMPLE_OGRANIZATION_TRIPS_COMMUNITY
                            }}
                            fetchOrganizationSubsInfo={dummyHandler}
                            setOrgId={dummyHandler}
                            resetOrgId={dummyHandler}
                        />
                    </Container>
                </Route>
            </MemoryRouter>
        )
    })