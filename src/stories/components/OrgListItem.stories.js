import React from 'react';
import { Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {SAMPLE_ORGANISATION_SIMARD, SAMPLE_ORGANISATION_ROOMS} from "../fixtures.data"
import OrgsListItem from '../../components/OrgsListItem';
import {withMemoryRouter} from "../addon-memoryrouter";

storiesOf('ORG ID/Components/List Item', module)
  .addDecorator(withMemoryRouter)
  .add('Organization List Item', () => {
    return (
      <Container>
        <OrgsListItem
            organization={SAMPLE_ORGANISATION_SIMARD}
        />
        <OrgsListItem
            organization={SAMPLE_ORGANISATION_ROOMS}
        />
      </Container>
    )
});