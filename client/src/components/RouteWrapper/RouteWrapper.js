import React from "react";
import {Route} from "react-router-dom";

const RouteWrapper = ({children, ...rest}) => {
    return (
        <Route {...rest}
               render={() => children}/>
    );
};

export default RouteWrapper