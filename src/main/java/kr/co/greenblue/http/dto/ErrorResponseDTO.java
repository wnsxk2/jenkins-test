package kr.co.greenblue.http.dto;

import kr.co.greenblue.http.code.ResponseStatusEnum;
import lombok.Getter;


/**
 * Http 통신에서 에러 결과 응답에 대한 클래스
 */
@Getter
public class ErrorResponseDTO extends ResponseDTO {

    private final int httpErrorCode;
    /**
     * ResponseStatusEnum의 Error Code를 파라미터로 받아 결과를 리턴하는 생성자
     * @param errorCode ResponseStatusEnum의 Error Code
     */
    private ErrorResponseDTO(ResponseStatusEnum errorCode){
        super(false, errorCode.getCode(), errorCode.getMessage());
        this.httpErrorCode = errorCode.getHttpsCode();
    }

    /**
     * ResponseStatusEnum의 Error Code와 발생한 Exception을 파라미터로 받아 결과를 리턴하는 생성자
     * @param errorCode ResponseStatusEnum의 Error Code
     * @param e 메세지를 추출할 Exception 
     */
    private ErrorResponseDTO(ResponseStatusEnum errorCode, Exception e){
        super(false, errorCode.getCode(), errorCode.getMessage(e));
        this.httpErrorCode = errorCode.getHttpsCode();
    }

    /**
     * ResponseStatusEnum의 Error Code와 전달할 메세지를 파라미터로 받아 결과를 리턴하는 생성자
     * @param errorCode ResponseStatusEnum의 Error Code
     * @param message 전달할 에러 메세지
     */
    private ErrorResponseDTO(ResponseStatusEnum errorCode, String message){
        super(false, errorCode.getCode(), errorCode.getMessage(message));
        this.httpErrorCode = errorCode.getHttpsCode();
    }

    /**
     * 에러 코드를 전달하는 메소드
     * @param errorCode 발생한 Error Code 종류
     * @return DataResponseDto 생성자를 통해 에러 코드, 실패 결과 리턴
     */
    public static ErrorResponseDTO of(ResponseStatusEnum errorCode){
        return new ErrorResponseDTO(errorCode);
    }

    /**
     * 에러 코드와 Exception 메세지를 전달하는 메소드
     * @param errorCode 발생한 Error Code 종류
     * @param e 발생한 Exception
     * @return DataResponseDto 생성자를 통해 에러 코드, Exception 메세지, 실패 결과 리턴
     */
    public static ErrorResponseDTO of(ResponseStatusEnum errorCode, Exception e){
        return new ErrorResponseDTO(errorCode, e);
    }

    /**
     * 에러 코드와 특정 메세지를 전달하는 메소드
     * @param errorCode 발생한 Error Code 종류
     * @param message 전달할 메세지
     * @return DataResponseDto 생성자를 통해 에러 코드, 메세지, 실패 결과 리턴
     */
    public static ErrorResponseDTO of(ResponseStatusEnum errorCode, String message){
        return new ErrorResponseDTO(errorCode, message);
    }
}
