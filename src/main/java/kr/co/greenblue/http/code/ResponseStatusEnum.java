package kr.co.greenblue.http.code;

import kr.co.greenblue.comm.code.CodeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.Optional;
import java.util.function.Predicate;

@Getter
@AllArgsConstructor
public enum ResponseStatusEnum implements CodeEnum {

    OK("0", HttpStatus.OK, "Ok"),

    BAD_REQUEST("HS1000", HttpStatus.BAD_REQUEST, "Bad request"),
    VALIDATION_ERROR("HS1001", HttpStatus.BAD_REQUEST, "Validation error"),
    NOT_FOUND("HS1002", HttpStatus.NOT_FOUND, "Requested resource is not found"),

    INTERNAL_ERROR("HS2000", HttpStatus.INTERNAL_SERVER_ERROR, "Internal error"),
    DATA_ACCESS_ERROR("HS2001", HttpStatus.INTERNAL_SERVER_ERROR, "Data access error"),

    UNAUTHORIZED("HS4000", HttpStatus.UNAUTHORIZED, "User unauthorized");


    /* 필드 */
    private String code;
    private HttpStatus httpStatus;
    private String message;
    /* 필드 끝 */

    /* 메서드 */

    /**
     * ResponseStatusEnum의 code 전달
     * @return ResponseStatusEnum의 code 전달
     */
    @Override
    public String getCode() {
        return this.code;
    }

    /**
     * ResponseStatusEnum의 HttpsStatus의 이름 전달
     * @return HttpsStatus의 이름
     */
    public String getHttpStatus() {
        return this.httpStatus.name();
    }

    /**
     * ResponseStatusEnum의 HttpsStatus의 code 번호 전달
     * @return HttpsStatus의 code 번호
     */
    public int getHttpsCode() {
        return httpStatus.value();
    }

    /**
     * ResponseStatusEnum의 변수명 전달
     * @return ResponseStatusEnum의 변수명
     */
    @Override
    public String getName() {
        return this.name();
    }

    /**
     * 메세지를 전달하는 메소드로 파라미터의 message 값을 전달
     * message는 null이거나 비어있으면 ResponseStatusEnum의 메세지를 전달함
     * @param message 전달할 메세지
     * @return 전달 메세지 또는 ResponseStatusEnum의 메세지
     */
    public String getMessage(String message) {
        return Optional.ofNullable(message)
                .filter(Predicate.not(String::isBlank))
                .orElse(this.getMessage());
    }

    /**
     * HttpStatus에 대한 상세 Exception 메세지를 함께 출력
     * @param e 발생한 Exception 인자
     * @return 기본 메세지와 exception 메세지를 함께 린턴
     */
    public String getMessage(Exception e){
        return this.getMessage(this.getMessage() + " - " + e.getMessage());
    }


    /* 메서드 끝 */
}
