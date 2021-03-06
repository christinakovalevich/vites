package vites

import course.Course
import enums.security.RoleType
import enums.security.UserType
import enums.student.EducationDegree
import grails.gorm.transactions.Transactional
import mentor.Mentor
import org.grails.datastore.gorm.GormEntity
import rating.CourseRating
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
        initRatings()

        log.info 'Users count: ' + User.count
        log.info 'Courses count: ' + Course.count
        log.info 'Mentor count: ' + Mentor.count
        log.info 'Student count: ' + Student.count

        def firstStudent = Student.first()
        def firstCourse = Course.first()

        log.info firstStudent.courses.toString()
        log.info firstCourse.students.toString()

        log.info 'Available: ' + firstCourse.availablePlacesCount
    }

    def destroy = {
    }

    @Transactional
    private initRatings() {
        def firstStudent = Student.first()
        def firstCourse = Course.first()

        setDefaultFields(new CourseRating(course: firstCourse, ratedBy: firstStudent, value: 4.4f))
                .save(FAIL_ON_ERROR)
        setDefaultFields(new CourseRating(course: firstCourse, ratedBy: firstStudent, value: 2.1f))
                .save(FAIL_ON_ERROR)
    }

    @Transactional
    private initSecurity() {
        log.debug 'Start init security'

        def adminRole = new Role(authority: RoleType.ROLE_ADMIN.value).save(FAIL_ON_ERROR)

        def adminUser = new User(
                username: 'admin',
                password: 'U7VZt9',
                userType: UserType.ADMIN
        ).save(FAIL_ON_ERROR)

        UserRole.create(adminUser, adminRole)

        def managerRole = new Role(authority: RoleType.ROLE_MANAGER.value).save(FAIL_ON_ERROR)

        def managerUser = new User(
                username: 'manager',
                password: 'yy6QSW',
                userType: UserType.MANAGER
        ).save(FAIL_ON_ERROR)

        UserRole.create(managerUser, managerRole)

        def mentorRole = new Role(authority: RoleType.ROLE_MENTOR.value).save(FAIL_ON_ERROR)

        def mentorUser = new User(
                username: 'mentor',
                password: 'nYr7mx',
                userType: UserType.MENTOR
        ).save(FAIL_ON_ERROR)

        UserRole.create(mentorUser, mentorRole)


        def studentRole = new Role(authority: RoleType.ROLE_STUDENT.value).save(FAIL_ON_ERROR)

        def studentUser = new User(
                username: 'student',
                password: 'yn6Nxk',
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
                phone: '80295667328',
                email: 'mogaceg295@jupiterm.com',
                speciality: 'Software engineer')

        setDefaultFields(student)
        student.addToCourses(Course.first())
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
                experienceYears: 5,
                phone: '80293450897',
                email: 'givaxop563@inbov03.com')

        setDefaultFields(mentor)
        mentor.addToCourses(Course.first())
        mentor.save(FAIL_ON_ERROR)

        log.debug 'Finish init mentor'
    }

    private GormEntity setDefaultFields(GormEntity gormEntity, User user = User.findByUsername('admin')) {
        setCreatedBy(gormEntity, user)
        setLastUpdatedBy(gormEntity, user)
        return gormEntity
    }

    private setCreatedBy(GormEntity gormEntity, User user = User.findByUsername('admin')) {
        gormEntity.createdBy = user
        return gormEntity
    }

    private setLastUpdatedBy(GormEntity gormEntity, User user = User.findByUsername('admin')) {
        gormEntity.lastUpdatedBy = user
        return gormEntity
    }
}
