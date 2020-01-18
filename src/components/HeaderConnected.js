/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Container, Grid } from '@material-ui/core';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import ButtonMateMask from '../components/ButtonMateMask';


const HeaderNotConnected = () => {
    const web3Context = useWeb3React();
    const { chainId, account, error, active } = web3Context;
    return (
        <div id="app-header">
            <Grid direction="row" container={true}>
                <Grid direction="column" lg={9}>
                    <span>[LOGO HERE]</span>

                    <span>Hello, {account} from chain {chainId}</span>
                </Grid>
                <Grid direction="column" lg={3} alignItems={'flex-end'}>
                    <ButtonMateMask/>
                </Grid>
            </Grid>
        </div>
    )
};

export default HeaderNotConnected;
