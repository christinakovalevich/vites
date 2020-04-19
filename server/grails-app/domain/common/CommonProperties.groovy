package common

import security.User

abstract class CommonProperties {
    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy
    boolean disabled
}
