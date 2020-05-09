import React, {useContext} from "react";
import {Route} from "react-router-dom";
import {UserRoleContext} from "../../contexts/UserRoleContext";

const RouteWrapper = ({children, roles = [], ...rest}) => {

    const role = useContext(UserRoleContext)

    const isRoleAppropriate = (role, roles) => roles.includes(role);

    return isRoleAppropriate(role, roles) ?
        <Route {...rest} render={() => children}/> : null

};

export default RouteWrapper