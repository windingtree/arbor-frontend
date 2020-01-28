import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Typography variant={'h2'}>Search</Typography>
      </Container>
    )
  }
}

export default Search;