package vites

import course.Course
import enums.security.RoleType
import enums.security.UserType
import enums.student.EducationDegree
import grails.gorm.transactions.Transactional
import mentor.Mentor
import org.grails.datastore.gorm.GormEntity
import security.Role
import security.User
import security.UserRole
import student.Student

class BootStrap {

    def dateTimeService

    private final static FAIL_ON_ERROR = [failOnError: true]

    def init = { servletContext ->
        initSecurity()
        initCourse()
        initMentor()
        initStudent()

        log.info 'Users count: ' + User.count
        log.info 'Courses count: ' + Course.count
        log.info 'Mentor count: ' + Mentor.count
        log.info 'Student count: ' + Student.count

        Student.first().addToCourses(Course.first())
        Mentor.first().addToCourses(Course.first())

        log.info 'Available ' + Course.first().availablePlacesCount
    }
    def destroy = {
    }

    @Transactional
    private initSecurity() {
        log.debug 'Start init security'

        def adminRole = new Role(authority: RoleType.ROLE_ADMIN.value).save(FAIL_ON_ERROR)

        def adminUser = new User(
                username: 'admin',
                password: 'admin',
                userType: UserType.ADMIN
        ).save(FAIL_ON_ERROR)

        UserRole.create(adminUser, adminRole)

        def managerRole = new Role(authority: RoleType.ROLE_MANAGER.value).save(FAIL_ON_ERROR)

        def managerUser = new User(
                username: 'manager',
                password: 'manager',
                userType: UserType.MANAGER
        ).save(FAIL_ON_ERROR)

        UserRole.create(managerUser, managerRole)

        def mentorRole = new Role(authority: RoleType.ROLE_MENTOR.value).save(FAIL_ON_ERROR)

        def mentorUser = new User(
                username: 'mentor',
                password: 'mentor',
                userType: UserType.MENTOR
        ).save(FAIL_ON_ERROR)

        UserRole.create(mentorUser, mentorRole)


        def studentRole = new Role(authority: RoleType.ROLE_STUDENT.value).save(FAIL_ON_ERROR)

        def studentUser = new User(
                username: 'student',
                password: 'student',
                userType: UserType.STUDENT
        ).save(FAIL_ON_ERROR)

        UserRole.create(studentUser, studentRole)

        log.debug 'Finish init security'
    }

    @Transactional
    private initCourse() {
        log.debug 'Start init security'

        def coursesMap = [
                [
                        name            : 'Java Students Lab',
                        startDate       : dateTimeService.buildDateFrom(2020, Calendar.APRIL, 18),
                        endDate         : dateTimeService.buildDateFrom(2020, Calendar.AUGUST, 26),
                        difficulty      : 4,
                        popularity      : 4.5,
                        totalPlacesCount: 20,
                ],

                [
                        name            : 'JavaScript Students Lab',
                        startDate       : dateTimeService.buildDateFrom(2020, Calendar.MAY, 18),
                        endDate         : dateTimeService.buildDateFrom(2020, Calendar.SEPTEMBER, 26),
                        difficulty      : 3.33,
                        popularity      : 5,
                        totalPlacesCount: 20,
                ],

                [
                        name            : 'Ruby Students Lab',
                        startDate       : dateTimeService.buildDateFrom(2020, Calendar.JULY, 18),
                        endDate         : dateTimeService.buildDateFrom(2020, Calendar.OCTOBER, 26),
                        difficulty      : 4,
                        popularity      : 4.5,
                        totalPlacesCount: 20,
                ],

                [
                        name            : 'Node.js Students Lab',
                        startDate       : dateTimeService.buildDateFrom(2020, Calendar.JUNE, 1),
                        endDate         : dateTimeService.buildDateFrom(2020, Calendar.SEPTEMBER, 30),
                        difficulty      : 4,
                        popularity      : 4.5,
                        totalPlacesCount: 20,
                ],

                [
                        name            : 'Python Students Lab',
                        startDate       : dateTimeService.buildDateFrom(2020, Calendar.SEPTEMBER, 1),
                        endDate         : dateTimeService.buildDateFrom(2020, Calendar.DECEMBER, 30),
                        difficulty      : 4,
                        popularity      : 4.5,
                        totalPlacesCount: 20,
                ],
        ]

        coursesMap.each {
            def course = new Course(it)
            setDefaultFields(course)
            course.save(FAIL_ON_ERROR)
        }
        log.debug 'Finish init courses'
    }

    @Transactional
    private initStudent() {
        log.debug 'Start init student'

        def student = new Student(
                lastName: 'Иванов',
                name: 'Никита',
                fatherName: 'Семёнович',
                birthDate: dateTimeService.buildDateFrom(1998, Calendar.JANUARY, 10),
                user: User.findByUsername('student'),
                institutionName: 'BSUIR',
                educationDegree: EducationDegree.BACHELOR,
                speciality: 'Software engineer')

        setDefaultFields(student)
        student.save(FAIL_ON_ERROR)

        log.debug 'Finish init student'
    }

    @Transactional
    private initMentor() {
        log.debug 'Start init mentor'

        def mentor = new Mentor(
                lastName: 'Стрельцов',
                name: 'Алексей',
                fatherName: 'Петрович',
                birthDate: dateTimeService.buildDateFrom(1985, Calendar.MAY, 12),
                user: User.findByUsername('mentor'),
                institutionName: 'BSUIR',
                educationDegree: EducationDegree.BACHELOR,
                speciality: 'Software engineer')

        setDefaultFields(mentor)
        mentor.save(FAIL_ON_ERROR)

        log.debug 'Finish init mentor'
    }

    private setDefaultFields(GormEntity gormEntity, User user = User.findByUsername('admin')) {
        setCreatedBy(gormEntity, user)
        setLastUpdatedBy(gormEntity, user)
    }

    private setCreatedBy(GormEntity gormEntity, User user = User.findByUsername('admin')) {
        gormEntity.createdBy = user
    }

    private setLastUpdatedBy(GormEntity gormEntity, User user = User.findByUsername('admin')) {
        gormEntity.lastUpdatedBy = user
    }
}
