import React from "react";
import {Route} from "react-router-dom";
import {useWeb3React} from '@web3-react/core';
import HeaderNotConnected from '../components/HeaderNotConnected';
import HeaderConnected from '../components/HeaderConnected';
import Footer from '../components/Footer';

const DefaultRoute = ({ component: Component, ...rest }) => {
    const web3Context = useWeb3React();
    const { active } = web3Context;

    return (
        <Route {...rest} render={matchProps => (
            <div className="DefaultRoute">
                <div className="Header">
                    {active ?
                        <HeaderConnected/>
                        :
                        <HeaderNotConnected/>
                    }
                </div>
                <Component {...matchProps} />
                <Footer/>
            </div>
        )}/>
    )
};

export default DefaultRoute;
