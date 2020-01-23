/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Button, Container, Grid} from '@material-ui/core';
import {useWeb3React, UnsupportedChainIdError} from '@web3-react/core'
import ButtonMetaMask from '../components/ButtonMetaMask';
import {makeStyles} from '@material-ui/core/styles';
import Header from '../components/Header';


const styles = makeStyles({
    helloDiv: {
        color: 'black',
            marginRight: '56px'
    }
});

const HeaderNotConnected = () => {
    const web3Context = useWeb3React();
    const {chainId, account, error, active} = web3Context;
    const classes = styles();
    return (
        <div id="app-header">
            <Header>
                <Grid container>
                    <ButtonMetaMask/>

                </Grid>
            </Header>
            <Grid container justify="flex-end">
                <div className={classes.helloDiv}>Hello, {account} from chain {chainId}</div>
            </Grid>
        </div>
    )
};

export default HeaderNotConnected;
