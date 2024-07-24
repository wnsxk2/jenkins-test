package kr.co.greenblue.http.dto;

import kr.co.greenblue.http.code.ResponseStatusEnum;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Http 통신에서 결과 응답에 대한 부모 클래스
 */
@Getter
@RequiredArgsConstructor
public class ResponseDTO {
    /* 필드 */
    private final boolean success;
    private final String code;
    private final String message;
    /* 필드 끝 */

    /**
     * Http 통신의 결과로 성공 여부에 따라 code와 메세지가 전송됨
     * @param success 성공 실패 여부(성공이면 true, 실패면 false)
     * @param status 성공 결과에 대한 상태
     * @return 성공 여부, 코드에 따른 코드값과 메세지가 전송됨
     */
    public static ResponseDTO of(boolean success, ResponseStatusEnum status){
       return new ResponseDTO(success, status.getCode(), status.getMessage());
    }

    /**
     * Http 통신의 실패 결과로 Response로 Exception에 기반한 메세지가 전송됨
     * @param success 성공 실패 여부(성공이면 true, 실패면 false)
     * @param errorStatus 실패 결과에 대한 상태
     * @param e Exception이 발생한 실패에 대한 메세지
     * @return 성공 여부, 실패 코드에 따른 코드값과 exception에 대한 메세지가 전송됨 
     */
    public static ResponseDTO of(boolean success, ResponseStatusEnum errorStatus, Exception e){
        return new ResponseDTO(success, errorStatus.getCode(), errorStatus.getMessage(e));
    }

    /**
     * Http 통신 실패 결과로 Response로 Code의 메세지가 전송됨
     * @param success 성공 실패 여부(성공이면 true, 실패면 false)
     * @param errorStatus 실패 결과에 대한 상태
     * @param message 성공 여부, 실패 코드에 따른 코드값과 코드 메세지가 전송됨
     * @return
     */
    public static ResponseDTO of(boolean success, ResponseStatusEnum errorStatus, String message){
        return new ResponseDTO(success, errorStatus.getCode(), errorStatus.getMessage(message));
    }

}



