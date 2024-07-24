package kr.go.busan.smartvillage.target02.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.go.busan.smartvillage.target02.code.MicroDustLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FeaturePropVO {
    /* 갈맷길 */
    private String guganNm;
    /* 항만 */
    private String msrstnId;
    /* 지역 */
    private String admdstCd;
    /* 시민제보 */
    private String id;
    private String admdstNm;
    private String engAdmdstNm;
    private String lifeIndexType;
    private String lifeIndexScr;
    private String pm10;
    private String pm25;
    private String mapType;
    private String msrmtDt;

    private String pm10Index;
    private String pm25Index;

    /* 항만 point */


    public void setPm10(String pm10) {
        this.pm10 = pm10;
        this.pm10Index = MicroDustLevel.getLevel(this.pm10, "pm10").name();
    }

    public void setPm25(String pm25) {
        this.pm25 = pm25;
        this.pm25Index = MicroDustLevel.getLevel(this.pm25, "pm25").name();
    }
}
