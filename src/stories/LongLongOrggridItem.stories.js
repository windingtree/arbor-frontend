import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {SAMPLE_ORGANISATION_SIMARD} from "./fixtures.data"

import OrgsGridItem from '../components/OrgsGridItem';
import {withMemoryRouter} from "./addon-memoryrouter";

storiesOf('ORG ID/Grid Item', module)
    .addDecorator(withMemoryRouter)
    .add('Long Long Long Grid Item', () => {
    return (
      <Container>
        <Grid container>
          <Grid lg={3} sm={4} xs={10} item>
            <OrgsGridItem
                organization={Object.assign({},SAMPLE_ORGANISATION_SIMARD,{name:'very very very very very very long name'})}
            />
          </Grid>
        </Grid>
      </Container>
    )
  });