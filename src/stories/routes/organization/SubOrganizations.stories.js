import React from 'react';
import { Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {SAMPLE_ORGANISATION_SIMARD, SAMPLE_ORGANISATION_SIMARD_SUBSIDIARIES} from "../../fixtures.data"
import {withMemoryRouter} from "../../addon-router-decorator";
import SubOrganizations from "../../../routes/Organization/Components/SubOrganizations";

storiesOf('ORG ID/Routes/Organization/Components', module)
  .addDecorator(withMemoryRouter)
  .add('SubOrganizations list', () => {
    return (
      <Container>
        <SubOrganizations
            organization={SAMPLE_ORGANISATION_SIMARD}
            subs={SAMPLE_ORGANISATION_SIMARD_SUBSIDIARIES}/>
      </Container>
    )
});