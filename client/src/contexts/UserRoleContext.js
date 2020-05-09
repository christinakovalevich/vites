import React from "react";
import RoleService from "../services/Role/RoleService";

export const UserRoleContext = React.createContext(RoleService.anonymous());
