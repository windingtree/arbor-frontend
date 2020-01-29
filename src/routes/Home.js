import React, { Component } from "react";

import {Container, Grid, Typography} from '@material-ui/core';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Typography variant={'h3'}>
          Home
        </Typography>
      </Container>
    )
  }
}

export default Home;
