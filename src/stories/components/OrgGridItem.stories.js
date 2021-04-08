import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {SAMPLE_ORGANISATION_SIMARD} from "../fixtures.data"
import OrgsGridItem from '../../components/OrgsGridItem';
import {withMemoryRouter} from "../addon-router-decorator";

storiesOf( 'ORG ID/Components/Grid Item', module)
    .addDecorator(withMemoryRouter)
  .add('Organization Grid Item',() => {
    return (
     <Container>
       <Grid container>
         <Grid item style={{ width: '264px' }}>
           <OrgsGridItem
               organization={SAMPLE_ORGANISATION_SIMARD}
               canManage={false}
           />
         </Grid>
       </Grid>
     </Container>
    );
  });

