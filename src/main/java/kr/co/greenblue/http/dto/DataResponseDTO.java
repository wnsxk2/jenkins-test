package kr.co.greenblue.http.dto;

import kr.co.greenblue.http.code.ResponseStatusEnum;
import lombok.Getter;

/**
 * Http 통신에서 데이터를 포함한 결과 응답에 대한 클래스
 * @param <T> Data 클래스
 */
@Getter
public class DataResponseDTO<T> extends ResponseDTO {
    private final T data;

    /**
     * Data 클래스를 파라미터로 받아 결과를 리턴하는 생성자 
     * @param data 사용자에게 전달할 결과 데이터 클래스
     */
    private DataResponseDTO(T data){
        super(true, ResponseStatusEnum.OK.getCode(), ResponseStatusEnum.OK.getMessage());
        this.data=data;
    }

    /**
     * Data 클래스와 전달할 메세지를 파라미터로 받아 결과를 리턴하는 생성자
     * @param data 사용자에게 전달할 결과 데이터 클래스
     * @param message 사용자에게 전달할 메세지
     */
    private DataResponseDTO(T data, String message){
        super(true, ResponseStatusEnum.OK.getCode(), ResponseStatusEnum.OK.getMessage(message));
        this.data=data;
    }

    /**
     * Data를 전달하는 메소드
     * @param data 전달할 Data가 담겨 있는 클래스
     * @return DataResponseDto 생성자를 통해 데이터를 포함한 결과 리턴
     * @param <T>
     */
    public static <T> DataResponseDTO<T> of(T data){
        return new DataResponseDTO<>(data);
    }

    /**
     * Data와 특정 메세지를 함께 전달하는 메소드
     * @param data 전달할 Data가 담겨 있는 클래스
     * @param message 전달할 메세지
     * @return DataResponseDto 생성자를 통해 데이터를 포함한 결과 리턴
     * @param <T>
     */
    public static <T> DataResponseDTO<T> of(T data, String message){
        return new DataResponseDTO<>(data, message);
    }

    /**
     * 통신은 성공이지만 Data의 결과가 없을 때 사용하는 메소드
     * @return DataResponseDto 생성자를 통해 데이터가 null을 포함한 결과 리턴
     * @param <T>
     */
    public static <T> DataResponseDTO<T> empty(){
        return new DataResponseDTO<>(null);
    }


}
