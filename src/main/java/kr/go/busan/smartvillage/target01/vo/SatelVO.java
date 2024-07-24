package kr.go.busan.smartvillage.target01.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SatelVO {
    /* 인공위성 촬영 정보 테이블 (tsatel_shot_info) */
    private String shotDt;
    /* 재해쓰레기 정보 테이블 (tdisaster_debris_info) */
    private float ddArea;
    private float ddWeight;
    /* 인공위성 파일 정보 테이블 (tsatel_file_info) */
    private String satelFilePath;
}
