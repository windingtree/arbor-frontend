import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {withKnobs, text, boolean, number, array} from '@storybook/addon-knobs';

import OrgsGridItem from '../components/OrgsGridItem';

storiesOf( 'ORG ID/Grid Item', module)
  .addDecorator(withKnobs)
  .add('Organization Grid Item',() => {
    const name = text('Organization name', 'Default organization');
    const id = text('id', '0x6584993ddddki888');
    const isSub = boolean('SubOrganization', true);
    const type = text('SubOrganization type', 'Hotel');
    const subs = array('subs', ['1', 'a', '0xpps'], ', ');
    const trustLevel = number('Trust level', 4);
    const entityName = text('Legal entity name', 'Default corp.');
    const entityTrustLevel = number('Entity Trust level', 5) ;

    return (
     <Container>
       <Grid container>
         <Grid item style={{ width: '264px' }}>
           <OrgsGridItem
             id={id}
             isSub={isSub}
             type={type}
             trustLevel={trustLevel}
             name={name}
             subs={subs}
             entityName={entityName}
             entityTrustLevel={entityTrustLevel}
           />
         </Grid>
       </Grid>
     </Container>
    );
  });

