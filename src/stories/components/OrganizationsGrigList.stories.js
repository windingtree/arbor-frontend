import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {ORGANISATIONS_SEARCH_RESULT} from "../fixtures.data"
import OrgsGridItem from '../../components/OrgsGridItem';
import {withMemoryRouter} from "../addon-memoryrouter";

storiesOf('ORG ID/Components/Grid Item', module)
    .addDecorator(withMemoryRouter)
  .add('Grid list', () => {
    return (
      <Container>
        <Grid container spacing={3} justify="flex-start" alignItems="flex-start" >
            {ORGANISATIONS_SEARCH_RESULT && ORGANISATIONS_SEARCH_RESULT.map(org=>{
                return <Grid item style={{ width: '264px' }}>
                    <OrgsGridItem
                        organization={org}
                    />
                </Grid>
            })}
        </Grid>
      </Container>
    )
  });