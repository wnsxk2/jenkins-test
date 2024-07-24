package kr.go.busan.smartvillage.comm.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

/**
 * 시도, 시군구, 읍면동 등의 데이터 관련 클래스
 */
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdmdstDataVO {
    /* DB */
    private String id;
    private String admdstCd;
    private String admdstNm;
    private String engAdmdstNm;
    private String geom;
    /* 시민제보용 필드 */
    private String sggDivNum;

    /* API Data */
    private AdmdstDataVO properties;
}
