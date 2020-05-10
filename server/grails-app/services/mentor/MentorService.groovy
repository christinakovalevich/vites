package mentor

import grails.gorm.services.Service

@Service(Mentor)
interface MentorService {

    Mentor get(Serializable id)

    List<Mentor> list(Map args)

    Long count()

    void delete(Serializable id)

    Mentor save(Mentor mentor)

}