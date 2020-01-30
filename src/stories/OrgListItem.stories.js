import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {withKnobs, text, boolean, number, array} from '@storybook/addon-knobs';

import OrgsListItem from '../components/OrgsListItem';

storiesOf('ORG ID/List Item', module)
  .addDecorator(withKnobs)
  .add('Organization List Item', () => {
    const id = text('Organization id', '0xnfjrfh774854nre7ns8r8f8fd');
    const name = text('Organization name', 'Default Organization');
    const trustLevel = number('Trust Level', 5);
    const subs = [
      {
        id: '0x67jrfh774854nre7ns8r8f85g',
        entityName: name,
        subName: 'Default subOrg',
        isSub: true,
        type: 'Airline',
        entityTrustLevel: trustLevel
      },
      {
        id: '0x67jrfh774854nre7ns8r8f6ig',
        entityName: name,
        subName: 'Default subOrg with very long name',
        isSub: true,
        type: 'Hotel',
        entityTrustLevel: trustLevel
      },
      {
        id: '0x67jrfh774854nre7ns8r8fmju',
        entityName: name,
        subName: 'Default subOrg',
        isSub: true,
        type: 'Travel Agency',
        entityTrustLevel: trustLevel
      }
      ];

    return (
      <Container>
        <OrgsListItem
          id={id}
          name={name}
          trustLevel={trustLevel}
          subs={subs}
          isOpen={boolean('Is suborgs open', false)}
        />
        <OrgsListItem
          id={'0x67jrfh774854nre7ns8r8f85g'}
          name={'Default organization with extremely long name and no suborganizations'}
          trustLevel={'99'}
          subs={[]}
        />
      </Container>
    )
});