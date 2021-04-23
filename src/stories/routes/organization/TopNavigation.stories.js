import React from 'react';
import { Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {SAMPLE_ORGANISATION_SIMARD} from "../../fixtures.data"
import TopNavigation from "../../../routes/Organization/Components/TopNavigation";

storiesOf('ORG ID/Routes/Organization/Components', module)
  .add('TopNavigation', () => {
    return (
      <Container>
        <TopNavigation
            organization={SAMPLE_ORGANISATION_SIMARD}
            canManage={true}
        />
      </Container>
    )
});