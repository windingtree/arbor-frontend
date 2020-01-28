import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Typography variant={'h2'}>Profile</Typography>
      </Container>
    )
  }
}

export default Profile;