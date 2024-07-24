package kr.co.greenblue.comm.util;

public class TimeCheckerUtil {
    private static TimeCheckerUtil timeCheckerUtil= null;

    private static long beforeTime;

    public static TimeCheckerUtil getInstance(){
        // null 체크로 static 변수를 초기화한다.
        if (timeCheckerUtil == null) {
            timeCheckerUtil = new TimeCheckerUtil();
        }

        beforeTime = System.currentTimeMillis();

        return timeCheckerUtil;
    }

    /**
     * 소요 시간을 초(second) 기준으로 출력
     */
    public void secondDiffTime() {
        long afterTime = System.currentTimeMillis();
        long secDiffTime = (afterTime - beforeTime) / 1000;

        System.out.println("소요시간 : " + secDiffTime + "초(s)");
    }

    /**
     * 소요 시간을 밀리초(milli second) 기준으로 출력
     */
    public void milliSecondDiffTime() {
        long afterTime = System.currentTimeMillis();

        System.out.println("소요시간 : " + (afterTime - beforeTime) + "밀리초(ms)");
    }

}
