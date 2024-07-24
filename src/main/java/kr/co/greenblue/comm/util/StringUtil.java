package kr.co.greenblue.comm.util;

/**
 * Stirng과 관련된 Util 함수 클래스
 * Return은 String/StringBuilder 또는 true/false
 */
public class StringUtil {

    /**
     * 다수의 String을 하나의 문자열로 합치는 작업
     *
     * @param s String값
     * @return 합쳐진 문자열
     */
    public static String makeString(String... s) {
        StringBuilder sb = new StringBuilder();
        for (String str : s) {
            sb.append(str);
        }
        return sb.toString();
    }

    /**
     * 마지막 문자 제거
     *
     * @param str 마지막 문자를 제거할 문자열
     * @return 마지막 문자가 제거된 문자열
     */
    public static String removeLastChar(String str) {
        if (str == null || str.length() == 0) {
            return str;
        }
        return str.substring(0, str.length() - 1);
    }


}
