import React, { Component } from "react";
import {connect} from 'react-redux';
import { fetchAllOrganizations } from '../ducks/fetchOrganizations';

import OrgsGridList from '../components/OrgsGridList';
import OrgsGridItem from '../components/OrgsGridItem';

import {Container, Grid} from '@material-ui/core';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllOrganizations();
  }

  render() {
    const { organizations: { data } }  = this.props;

    return (
      <Container>
        <OrgsGridList spacing={3} justify="center" alignItems="flex-start" >
          {
            data.map((item, index) => (
              <Grid item key={index.toString()} style={{ width: '264px' }}>
                <OrgsGridItem
                  id={item.orgid}
                />
              </Grid>
            ))
          }
        </OrgsGridList>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
