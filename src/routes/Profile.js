import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core';
import OrgsListItem from '../components/OrgsListItem';

class Profile extends Component {
  render() {
    const mockOrgs =
      [
        {
          address: "1232323",
          name: "Organization1",
          isSub: false,
          subs: [
            {
              address: "1",
              name: "HotelName",
              isSub: true,
            },
            {
              address: "2",
              name: "AirlineName",
              isSub: true,
              segment: "airline"
            },
          ]
        }];

    const orgs = this.props.organizations || mockOrgs;

    return (
      <Container>
        <Typography variant={'h2'}>Profile</Typography>
        <div>
          <span><h2>Organizations</h2></span>
        </div>
        {orgs.map(org => <OrgsListItem key={org.address} isSub={org.isSub} address={org.address} name={org.name}
                                       subs={org.subs}/>)}
      </Container>
    )
  }
}

export default Profile;