import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core';

class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Typography variant={'h2'}>Login</Typography>
      </Container>
    )
  }
}

export default SignIn;