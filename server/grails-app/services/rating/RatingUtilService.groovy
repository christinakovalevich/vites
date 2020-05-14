package rating

import course.Course
import grails.gorm.transactions.NotTransactional
import grails.gorm.transactions.ReadOnly
import mentor.Mentor
import org.grails.datastore.gorm.GormEntity
import student.Student

@ReadOnly
class RatingUtilService {

    @NotTransactional
    float getAverageRating(GormEntity gormEntity) {
        switch (gormEntity.class) {
            case Course:
                return getAverageRating(CourseRating.findAllByCourse(gormEntity as Course))
            case Student:
                return getAverageRating(StudentRating.findAllByStudent(gormEntity as Student))
            case Mentor:
                return getAverageRating(MentorRating.findAllByMentor(gormEntity as Mentor))
            default:
                return -1
        }
    }

    @NotTransactional
    float getAverageRating(List<Object> ratingList) {
        float value = 0.0f

        if (ratingList) {
            float totalValue = 0.0f
            int size = ratingList.size()

            for (ratingObject in ratingList) {
                totalValue += ratingObject.value
            }

            value = totalValue / size
        }

        return value
    }

}
