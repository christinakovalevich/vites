package enums.student

import groovy.transform.CompileStatic

@CompileStatic
enum EducationDegree {
    ASSOCIATE("ASSOCIATE"),
    BACHELOR("BACHELOR"),
    MASTER("MASTER"),
    DOCTORAL("DOCTORAL")

    private final String value

    EducationDegree(String value) {
        this.value = value
    }

    String getValue() {
        return value
    }
}