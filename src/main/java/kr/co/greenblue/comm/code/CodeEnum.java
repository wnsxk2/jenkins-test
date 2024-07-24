package kr.co.greenblue.comm.code;

/**
 * Code 값을 Enum 클래스로 사용할 때 상속받는 인터페이스
 */
public interface CodeEnum {
    /**
     * CodeEnum의 code 값을 전달하는 메소드
     * @return code
     */
    String getCode();

    /**
     * CodeEnum의 name 값을 전달하는 메소드
     * @return name
     */
    String getName();

    /**
     * CodeEnum의 message 값을 전달하는 메소드
     * @return message
     */
    String getMessage();
}
