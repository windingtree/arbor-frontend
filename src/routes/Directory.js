import React from 'react';

import { Container, Typography } from '@material-ui/core';

export default function Directory(props) {
  return (
    <Container>
      <Typography variant={'h2'}>
        {props.match.params.directory}
      </Typography>
    </Container>
  )
}