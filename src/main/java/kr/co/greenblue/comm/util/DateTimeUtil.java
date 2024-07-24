package kr.co.greenblue.comm.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.DateTimeParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class DateTimeUtil {

    public static final int MILLI_SEC_A_DAY = 1000 * 60 * 60 * 24;
    /* pattern을 파라미터로 받아서 사용하는 방법으로 변경 */
    private static final DateTimeFormatter dateTimeFormatter = new DateTimeFormatterBuilder()
            .parseCaseInsensitive()
            .appendPattern("yyyy-MM-dd HH:mm")
            .toFormatter(Locale.KOREA);
    private static DateTimeUtil dateTimeUtil = null;

    private DateTimeUtil() {
    }

    /**
     * staic 변수 dateTimeUtil 최초 호출에만 초기화 하는 메서드
     *
     * @return DateTimeUtil 객체
     */
    public static DateTimeUtil getInstance() {
        if (dateTimeUtil == null) {
            dateTimeUtil = new DateTimeUtil();
        }
        return dateTimeUtil;
    }

    /**
     * 문자열을 동적으로 전달받은 패턴에 맞게 파싱
     *
     * @param dataTime 파싱할 문자열
     * @param pattern  패턴 문자열
     * @return 파싱된 문자열
     */
    public String parseDateFormat(String dataTime, String pattern) {
        DateTimeFormatter formatter = getDateTimeFormatter(pattern);
        return parseStringToDateTime(dataTime).format(formatter);
    }

    /**
     * 현재 문자열을 원하는 포맷으로 변경
     * @param dataTime
     * @param prevPattern
     * @param nextPattern
     * @return
     */
    public String parseDateFormat(String dataTime, String prevPattern, String nextPattern){
        DateTimeFormatter prevFormatter = getDateTimeFormatter(prevPattern);
        DateTimeFormatter nextFormatter = getDateTimeFormatter(nextPattern);
        return parseStringToDateTime(dataTime, prevFormatter).format(nextFormatter);
    }

    /**
     * 두 시간의 간격을 시간으로 리턴하는 메서드
     *
     * @param startDate 시작 시간
     * @param endDate   종료 시간
     * @return 두 시간의 간격 시간
     */
    public int getTermToHours(String startDate, String endDate) {
        LocalDateTime dateTime1 = parseStringToDateTime(startDate);
        LocalDateTime dateTime2 = parseStringToDateTime(endDate);
        Duration between = Duration.between(dateTime1, dateTime2);
        return (int) between.toHours();
    }

    private LocalDateTime parseStringToDateTime(String dataTime) {
        try {
            return LocalDateTime.parse(dataTime, dateTimeFormatter);
        } catch (DateTimeParseException e) {
            // format 형식이 맞지 않는 경우 Exception 발생
            throw new RuntimeException(e.getMessage());
        }
    }
    private LocalDateTime parseStringToDateTime(String dataTime, DateTimeFormatter formatter){
        try {
            return LocalDateTime.parse(dataTime, formatter);
        } catch (DateTimeParseException e) {
            // format 형식이 맞지 않는 경우 Exception 발생
            throw new RuntimeException(e.getMessage());
        }
    }

    public Date addDate(Date date, int amount) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date); // 시간 설정
        cal.add(Calendar.DATE, amount); // 일 연산
        date = new Date(cal.getTimeInMillis());

        return date;
    }


    /**
     * 날짜차이구함
     *
     * @param destDate
     * @param srcDate
     * @param containStartEndDt 시작,종료일 포함 true: 2008-03-05 - 2008-03-02 => 4 false: 2008-03-05 -
     *                          2008-03-02 => 3
     * @return
     */
    public int dateDiff(String destDate, String srcDate, boolean containStartEndDt) {
        int diffDate = 0;
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date destDt = format.parse(destDate);
            Date srcDt = format.parse(srcDate);

            diffDate = Long.valueOf(((destDt.getTime() - srcDt.getTime()) / MILLI_SEC_A_DAY)).intValue();

            if (containStartEndDt) {
                diffDate += 1;
            }

        } catch (Exception ignore) {
        }
        return diffDate;
    }

    public Date getDate(String dateStr) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date = format.parse(dateStr);
            return date;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

    }

    public String nowDateTime() {
        LocalDateTime now = LocalDateTime.now();
        // 포맷팅
        String formatedNow = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        return formatedNow;
    }

    /**
     * 주어진 패턴으로 DateTimeFormatter 생성
     *
     * @param pattern 패턴 문자열
     * @return 생성된 DateTimeFormatter 객체
     */
    private DateTimeFormatter getDateTimeFormatter(String pattern) {
        return new DateTimeFormatterBuilder()
                .parseCaseInsensitive()
                .appendPattern(pattern)
                .toFormatter(Locale.KOREA);
    }

    /**
     * 날짜 시간을 문자열로 리턴하는 메서드
     *
     * @return 날짜 시간을 문자열로 리턴
     */
    public String nowDateHour() {
        LocalDateTime now = LocalDateTime.now();
        String formatedNow = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:00:00"));
        return formatedNow;
    }

    /**
     * yyyy-MM-dd HH:mm 형태의 날짜에서 요일을 구하는 메소드
     *
     * @param date yyyy-MM-dd HH:mm 형태의 날짜
     * @return 요일
     */
    public String getDayOfWeek(String date) {
        String dayOfWeek = "";
        LocalDateTime dateTime = parseStringToDateTime(date);
        int dayOfWeekNumber = dateTime.getDayOfWeek().getValue();

        switch (dayOfWeekNumber) {
            case 1:
                dayOfWeek = "월";
                break;
            case 2:
                dayOfWeek = "화";
                break;
            case 3:
                dayOfWeek = "수";
                break;
            case 4:
                dayOfWeek = "목";
                break;
            case 5:
                dayOfWeek = "금";
                break;
            case 6:
                dayOfWeek = "토";
                break;
            case 7:
                dayOfWeek = "일";
                break;
        }
        return dayOfWeek;

    }

}
