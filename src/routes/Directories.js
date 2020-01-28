import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core';

class Directories extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Typography variant={'h2'}>Directories</Typography>
      </Container>
    )
  }
}

export default Directories;