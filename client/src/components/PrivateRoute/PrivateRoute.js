import React from "react";
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({children, isAuthenticated, loginPathname, ...rest}) => {
    return (
        <Route {...rest}
               render={() =>
                   isAuthenticated ? (
                       children
                   ) : (
                       <Redirect
                           to={loginPathname}
                       />
                   )
               }/>
    );
};

export default PrivateRoute