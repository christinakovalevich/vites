package rating

import grails.gorm.services.Service

@Service(MentorRating)
interface MentorRatingService {

    MentorRating get(Serializable id)

    List<MentorRating> list(Map args)

    Long count()

    void delete(Serializable id)

    MentorRating save(MentorRating mentorRating)

}