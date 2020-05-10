package rating


import grails.gorm.transactions.Transactional

@Transactional
class RatingUtilService {

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
