import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core';

class Registration extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Typography variant={'h2'}>Registration</Typography>
      </Container>
    )
  }
}

export default Registration;