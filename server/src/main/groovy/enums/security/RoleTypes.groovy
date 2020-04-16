package enums.security

import groovy.transform.CompileStatic

@CompileStatic
enum RoleTypes {
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_MANAGER("ROLE_MANAGER"),
    ROLE_MENTOR("ROLE_MENTOR"),
    ROLE_STUDENT("ROLE_STUDENT"),

    private final String value

    RoleTypes(String value) {
        this.value = value
    }

    String getValue() {
        return value
    }
}