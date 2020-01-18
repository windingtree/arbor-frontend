import React from "react";
import { Button, Container, Grid } from '@material-ui/core';

import { withRouter } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';
import { injected } from '../web3/connectors';



const MetaMaskButton = (props) => {
    const { connectToMetaMask, disconnectFromMetaMask,  isConnected } = props;
    const handleOnClick = isConnected ? disconnectFromMetaMask : connectToMetaMask;

    return (
        <Button variant="contained" color="primary"  onClick={handleOnClick}>
            {isConnected ? 'Disconnect': 'Connect to MetaMask'}
        </Button>
    );
};

const MetaMaskLogin = (props) => {
    const web3Context = useWeb3React();
    const { activate, deactivate, active } = web3Context;

    const connectToMetaMask = async () => {
        await activate(injected);
        // REDIRECT: setTimeout(()=> props.history.push('dashboard'), 100);
    };

    function disconnectFromMetaMask () {
        deactivate();
    }

    return (
        <MetaMaskButton
            connectToMetaMask={connectToMetaMask}
            disconnectFromMetaMask={disconnectFromMetaMask}
            isConnected={active}
        />
    );
};


export default withRouter(MetaMaskLogin);
