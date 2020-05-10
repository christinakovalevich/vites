package util

class DateTimeService {

    Date buildDateFrom(int year, int month, int dayOfMonth, int hourOfDay = 0, int minute = 0, int second = 0) {
        return new GregorianCalendar(year, month, dayOfMonth, hourOfDay, minute, second).time
    }
}
