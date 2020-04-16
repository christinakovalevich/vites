package enums.security

import groovy.transform.CompileStatic

@CompileStatic
enum UserTypes{
    ADMIN("ADMIN"),
    MANAGER("MANAGER"),
    MENTOR("MENTOR"),
    STUDENT("STUDENT")

    private final String value

    UserTypes(String value) {
        this.value = value
    }

    String getValue() {
        return value
    }
}
