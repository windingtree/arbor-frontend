import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';

function querystring(name, url = window.location.href) {
    name = name.replace(/[[]]/g, "\\$&");

    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return "";
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function UnauthenticatedRoute({ component: C, ...rest }) {
    const redirect = querystring("redirect");
    const web3Context = useWeb3React();
    const { active } = web3Context;
    console.log(active, redirect);
    return (
        <Route
            {...rest}
            render={props =>
                !active
                    ? <C {...props} />
                    : <Redirect
                        to={redirect === "" || redirect === null ? "/" : redirect}
                    />}
        />
    );
}

export default UnauthenticatedRoute;
