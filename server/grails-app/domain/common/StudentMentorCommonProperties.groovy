package common

abstract class StudentMentorCommonProperties extends CommonProperties {

    String name
    String lastName
    String fatherName

    Date birthDate

    float rating

    static constraints = {
        rating min: 0.0f, max: 5.0f
    }
}
