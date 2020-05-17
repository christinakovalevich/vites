grails.gorm.default.constraints = {
    '*'(blank: false, size: 1..100)
    ratable(min: 0.0f, max: 5.0f)
    name(blank: false, size: 1..50)
    birthDate(max: new Date())
    email(blank: false, email: true, uniq: true)
    phone(blank: false, size: 1..16, uniq: true)
}