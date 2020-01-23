/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Button, Container, Grid, Link} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {useWeb3React, UnsupportedChainIdError} from '@web3-react/core'


const styles = makeStyles({
    header: {
        border: 0,
        color: 'white',
        padding: '36px 56px'
    },
    headerButton: {
        margin: '0 20px'
    },
    headerText: {
        color: 'black'
    },
    searchButton: { //FIXME refactor/use proper icon
        position: 'relative',
        top: '5px'
    },
    loginButtons: {
        marginLeft: '25px'
    }
});

const HeaderButton = (props) => {
    const classes = styles();
    return <LinkContainer to={props.link}><Link className={classes.headerButton}>{props.children}</Link></LinkContainer>
};

export default function Header(props) {
    const web3Context = useWeb3React();
    const classes = styles()
    const {chainId, account, error, active} = web3Context;
    return (
        <div id="app-header" className={classes.header}>
            <Grid direction="row" container={true}>
                <Grid item xs={4}><h1 className={classes.headerText}>Logo</h1></Grid>
                <Grid xs={8} container={true} direction={"row"}>
                    <Grid justify={'flex-end'} container={true} direction={"row"}>
                        <Grid alignItems="center"><HeaderButton link="/how">How it works</HeaderButton>
                            <HeaderButton link="/segments">Segments</HeaderButton>
                            <HeaderButton link="/search"><SearchIcon className={classes.searchButton}/></HeaderButton>
                        </Grid>
                        <Grid className={classes.loginButtons} justify={'flex-end'}>{props.children}</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};