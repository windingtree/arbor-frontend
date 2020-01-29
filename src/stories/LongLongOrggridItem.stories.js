import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {withKnobs, boolean} from '@storybook/addon-knobs';

import OrgsGridItem from '../components/OrgsGridItem';

storiesOf('ORG ID/Grid Item', module)
  .addDecorator(withKnobs)
  .add('Long Long Long Grid Item', () => {
    const isSub = boolean('is SubOrganization', false);
    const subs = ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',  ];

    return (
      <Container>
        <Grid container>
          <Grid item style={{ width: '264px' }}>
            <OrgsGridItem
              id={'0xnfjrfh774854nre7ns8r8f8fd'}
              isSub={isSub}
              type={'Hotel'}
              trustLevel={'4'}
              name={'Extremely very enormous and long default organization name with lot of characters'}
              subs={subs}
              entityName={'entityName'}
              entityTrustLevel={'4'}
            />
          </Grid>
        </Grid>
      </Container>
    )
  });