/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Button, Container, Grid} from '@material-ui/core';
import ButtonMetaMask from '../components/ButtonMetaMask';
import Header from '../components/Header';

const HeaderNotConnected = () => (
    <div id="app-header">
        <Header>
            <Grid direction="column">
            </Grid>
            <Grid container>
                <Button variant="contained" color="secondary">
                    Sign up
                </Button>
                <ButtonMetaMask/>
            </Grid>
        </Header>
    </div>
);

export default HeaderNotConnected;
