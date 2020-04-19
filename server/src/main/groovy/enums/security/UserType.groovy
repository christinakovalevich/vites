package enums.security

import groovy.transform.CompileStatic

@CompileStatic
enum UserType {
    ADMIN("ADMIN"),
    MANAGER("MANAGER"),
    MENTOR("MENTOR"),
    STUDENT("STUDENT")

    private final String value

    UserType(String value) {
        this.value = value
    }

    String getValue() {
        return value
    }
}
