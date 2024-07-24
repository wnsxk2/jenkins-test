package kr.go.busan.smartvillage.comm.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UlGyeongDataVO {
    /* 필드 */
    /* Feature 속성 */
    private int gid;
    private String ctprvnCd;
    private String ctpEngNm;
    private String ctpKorNm;
    private String geom;

}
