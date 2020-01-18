import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';

function AuthenticatedRoute({ component: C, ...rest }) {
    const web3Context = useWeb3React();
    const { active } = web3Context;
    return (
        <Route
            {...rest}
            render={props =>
                active
                    ? <C {...props} />
                    : <Redirect
                        to={`/login?redirect=${props.location.pathname}${props.location.search}`}
                    />}
        />
    );
}

export default AuthenticatedRoute;
