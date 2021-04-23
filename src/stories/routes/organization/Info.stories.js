import React from 'react';
import { Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {SAMPLE_ORGANISATION_SIMARD} from "../../fixtures.data"
import Info from "../../../routes/Organization/Components/Info";

storiesOf('ORG ID/Routes/Organization/Components', module)
  .add('Info', () => {
    return (
      <Container>
        <Info
            organization={SAMPLE_ORGANISATION_SIMARD}
            canManage={true}
        />
      </Container>
    )
});