package course

import mentor.Mentor
import rating.CourseRating
import security.User
import student.Student

class Course {

    String name
    Date startDate
    Date endDate

    float difficulty
    float popularity

    int totalPlacesCount

    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy
    boolean disabled

    int getAvailablePlacesCount() {
        if (students) {
            return totalPlacesCount - students.size()
        }
        return totalPlacesCount
    }

    static hasMany = [mentors: Mentor, students: Student, ratings: CourseRating]

    static belongsTo = [Mentor, Student]

    static constraints = {
        name size: 0..100
        endDate validator: { val, obj, errors ->
            if (val < obj.startDate) {
                errors.rejectValue('endDate', 'datePriorTo')
            }
        }
        difficulty shared: "ratable"
        popularity shared: "ratable"
        totalPlacesCount min: 0, max: 250
    }
}
