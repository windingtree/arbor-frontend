import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Grid} from '@material-ui/core';

import CardsGridList from '../components/CardsGridList';
import OrgsGridItem from '../components/OrgsGridItem';

import {fetchAllOrganizations} from '../ducks/fetchOrganizations';

class Search extends Component {
  componentDidMount() {
    this.props.fetchAllOrganizations();
  }

  render() {
    const { organizations: { data } }  = this.props;

    return (
      <Container>
        <CardsGridList spacing={2} justify="flex-start" alignItems="flex-start">
          {
            data.map((item, index) => (
              <Grid item key={index.toString()} style={{ width: '264px' }}>
                <OrgsGridItem
                  id={item.orgid}
                />
              </Grid>
            ))
          }
        </CardsGridList>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: state.organizations
  }
};

const mapDispatchToProps = {
  fetchAllOrganizations
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

