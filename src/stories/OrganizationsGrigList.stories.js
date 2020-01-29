import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {withKnobs, text, boolean, number, array} from '@storybook/addon-knobs';

import OrgsGridItem from '../components/OrgsGridItem';

storiesOf('ORG ID/Grid Item', module)
  .addDecorator(withKnobs)
  .add('Grid list', () => {
    const isSub = boolean('is SubOrganization', false);
    const subs = ['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1', ];

    const name2 = text('Org name', 'Default organization');
    const id2 = text('org id', '0x6584993ddddki888');
    const isSub2 = boolean('SubOrganization', true);
    const type2 = text('SubOrganization type', 'Hotel');
    const subs2 = array('subs', ['1', 'a', '0xpps'], ', ');
    const trustLevel2 = number('Trust level', 4);
    const entityName2 = text('Legal entity name', 'Default corp.');
    const entityTrustLevel2 = number('Entity Trust level', 5) ;

    return (
      <Container>
        <Grid container spacing={3}  justify="center" alignItems="flex-start" >
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
          <Grid item style={{ width: '264px' }}>
            <OrgsGridItem
              id={id2}
              isSub={isSub2}
              type={type2}
              trustLevel={trustLevel2}
              name={name2}
              subs={subs2}
              entityName={entityName2}
              entityTrustLevel={entityTrustLevel2}
            />
          </Grid>
          <Grid item style={{ width: '264px' }}>
            <OrgsGridItem
              id={'0xnfjrfh774854nre7ns8r8f8fd'}
              isSub={false}
              type={'Hotel'}
              trustLevel={'4'}
              name={'organization names'}
              subs={['1', ]}
              entityName={'entityName'}
              entityTrustLevel={'4'}
            />
          </Grid>
          <Grid item style={{ width: '264px' }}>
            <OrgsGridItem
              id={'0xnfjrfh774854nre7ns8r8f8fd'}
              isSub={false}
              type={'Hotel'}
              trustLevel={'4'}
              name={'organization name'}
              subs={[]}
              entityName={'entityName'}
              entityTrustLevel={'4'}
            />
          </Grid>
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
          <Grid item style={{ width: '264px' }}>
            <OrgsGridItem
              id={'0xnfjrfh774854nre7ns8r8f8fd'}
              isSub={isSub}
              type={'Hotel'}
              trustLevel={'4'}
              name={'Extremely very enormous and long default organization name'}
              subs={['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', ]}
              entityName={'entityName'}
              entityTrustLevel={'4'}
            />
          </Grid>
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
          <Grid item style={{ width: '264px' }}>
            <OrgsGridItem
              id={'0xnfjrfh774854nre7ns8r8f8fd'}
              isSub={isSub}
              type={'Hotel'}
              trustLevel={'4'}
              name={'Extremely very enormous and long default organization name'}
              subs={['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', ]}
              entityName={'entityName'}
              entityTrustLevel={'4'}
            />
          </Grid>
        </Grid>
      </Container>
    )
  });