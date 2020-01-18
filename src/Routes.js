import React from "react";
import { Switch } from 'react-router-dom';
// SCREENS
import Home from './screens/Home';
import NotFound from './screens/NotFound';
/*import Login from './screens/Login';
import Dashboard from './screens/Dashboard';*/
// ROUTES LAYOUTS
import AuthenticatedRoute from "./layouts/AuthenticatedRoute";
import UnauthenticatedRoute from "./layouts/UnauthenticatedRoute";
import DefaultRoute from "./layouts/DefaultRoute";

const Routes = () => {
    return(
        <Switch>
            {/*<AuthenticatedRoute path={`/dashboard`} component={Dashboard} />
            <UnauthenticatedRoute path={`/login`} component={Login} />*/}
            <DefaultRoute path={`/`} exact component={Home} />
            <DefaultRoute component={NotFound} />
        </Switch>
    );
};

export default Routes;
