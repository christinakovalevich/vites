package rating

import grails.gorm.services.Service

@Service(StudentRating)
interface StudentRatingService {

    StudentRating get(Serializable id)

    List<StudentRating> list(Map args)

    Long count()

    void delete(Serializable id)

    StudentRating save(StudentRating studentRating)

}