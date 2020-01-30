import React, { Component } from "react";

import {Container, Typography, List} from '@material-ui/core';

import OrgsListItem from '../components/OrgsListItem';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubsOpen: false
    }
  }

  toggleSubsOpen = () => {
    this.setState(prevState => ({
      isSubsOpen: !prevState.isSubsOpen
    }));
  };

  render() {
    return (
      <Container>
        <Typography variant={'h3'}>
          Home
        </Typography>
        <List>
          <OrgsListItem
            handleOpenSubs={this.toggleSubsOpen}
            isOpen={this.state.isSubsOpen}
          />
          <OrgsListItem
            subs={[]}
            handleOpenSubs={this.toggleSubsOpen}
            isOpen={this.state.isSubsOpen}
          />
        </List>
      </Container>
    )
  }
}

export default Home;
