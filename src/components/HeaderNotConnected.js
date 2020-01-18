/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Container, Grid } from '@material-ui/core';
import ButtonMateMask from '../components/ButtonMateMask';

const HeaderNotConnected = () => (
    <div id="app-header">
        <Grid direction="row" container={true}>
            <Grid direction="column" lg={9}>
                <span>[LOGO HERE]</span>
            </Grid>
            <Grid direction="column" lg={3} alignItems={'flex-end'}>
                <Button variant="contained" color="secondary">
                    Sign up
                </Button>

                <ButtonMateMask/>
            </Grid>
        </Grid>
    </div>
);

export default HeaderNotConnected;
