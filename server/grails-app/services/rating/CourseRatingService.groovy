package rating

import grails.gorm.services.Service

@Service(CourseRating)
interface CourseRatingService {

    CourseRating get(Serializable id)

    List<CourseRating> list(Map args)

    Long count()

    void delete(Serializable id)

    CourseRating save(CourseRating courseRating)

}