import React from "react";
import { Switch } from 'react-router-dom';
// SCREENS
import Home from './Home';
import NotFound from './NotFound';
/*import Login from './screens/Login';
import Dashboard from './screens/Dashboard';*/
// ROUTES LAYOUTS
// import AuthenticatedRoute from "../layouts(rewrite-all-to-RootRoutes)/AuthenticatedRoute";
// import UnauthenticatedRoute from "../layouts(rewrite-all-to-RootRoutes)/UnauthenticatedRoute";
import DefaultRoute from "../layouts(rewrite-all-to-RootRoutes)/DefaultRoute";
import Organizations from "./Organizations";

const Routes = () => {
    return(
        <Switch>
            {/*<AuthenticatedRoute path={`/dashboard`} component={Dashboard} />
            <UnauthenticatedRoute path={`/login`} component={Login} />*/}
            <DefaultRoute path={`/`} exact component={Home} />
            <DefaultRoute path={`/organizations`} exact component={Organizations} />
            <DefaultRoute component={NotFound} />
        </Switch>
    );
};

export default Routes;
