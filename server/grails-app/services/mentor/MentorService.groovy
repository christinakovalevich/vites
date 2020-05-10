package mentor

import grails.gorm.services.Service
import grails.util.Holders
import rating.MentorRating

interface IMentorService {

    Mentor get(Serializable id)

    List<Mentor> list(Map args)

    Long count()

    void delete(Serializable id)

    Mentor save(Mentor mentor)

}

@Service(Mentor)
abstract class MentorService implements IMentorService {


    float getAverageRating(Mentor mentor) {
        def courseRatingList = MentorRating.findAllByMentor(mentor)
        return Holders.applicationContext.ratingUtilService.getAverageRating(courseRatingList)
    }

}
