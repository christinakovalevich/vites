package student

import common.CommonProperties
import util.EducationDegree

class Student extends CommonProperties {

    String name
    String lastName
    String fatherName

    Date birthDate

    EducationDegree educationDegree
    String institutionName
    String speciality

    float rating

    static constraints = {
    }
}
