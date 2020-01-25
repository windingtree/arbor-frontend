/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Button, Grid} from '@material-ui/core';
import ButtonMetaMask from '../components/ButtonMetaMask';
import Header from './Header';

const HeaderNotConnected = () => (
    <div id="app-header">
        <Header>
            <Grid container>
                <Grid item>
                    <Button variant="contained" color="secondary">
                        Sign up
                    </Button>
                </Grid>
                <ButtonMetaMask/>
            </Grid>
        </Header>
    </div>
);

export default HeaderNotConnected;
