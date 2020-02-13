import React from 'react';
// import { Route, Switch, Link } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function TrustGeneral(props){
  return (
    <Container>
      <Typography variant={'h2'}>TrustGeneral</Typography>
        <Link to={'/trust/ssl'}>
            trust ssl
        </Link>
        <br/>
        <Link to={'/trust/website'}>
            trust website
        </Link>
    </Container>
  )
}

export default TrustGeneral;
