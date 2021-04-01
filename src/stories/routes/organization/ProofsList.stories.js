import React from 'react';
import { Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import {SAMPLE_ORGANISATION_SIMARD} from "../../fixtures.data"
import {ProofsList} from "../../../components/ProofsList";
import {withStore} from "../../addon-store-decorator";

storiesOf('ORG ID/Routes/Organization/Components', module)
    .addDecorator(withStore)
  .add('ProofsList', () => {
      const verifications = {
          domain: true,
          ssl: true,
          lif: true,
          social: {
              facebook: true,
              twitter: true,
              linkedin: true,
              instagram: true
          }
      };
      const assertions = SAMPLE_ORGANISATION_SIMARD.jsonContent.trust.assertions;
    return (
      <Container>
          <ProofsList
              canManage={false}
              title='Trust assertions'
              orgid={SAMPLE_ORGANISATION_SIMARD.orgid}
              assertions={assertions}
              verifications={verifications}
              organization={SAMPLE_ORGANISATION_SIMARD}
          />
      </Container>
    )
});