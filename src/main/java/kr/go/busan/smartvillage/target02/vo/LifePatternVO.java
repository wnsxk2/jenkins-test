package kr.go.busan.smartvillage.target02.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.go.busan.smartvillage.target02.code.MicroDustLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LifePatternVO {

    private String lpiId;
    private String lifePatternNm;
    private String engLifePatternNm;
    private String lpiImgFileNm;
    private int lpiMaxScr;
    private String lpiType;
    private MicroDustLevel level;

    public LifePatternVO(String lifePatternNm, String engLifePatternNm, String lpiImgFileNm, String lpiType) {
        this.lifePatternNm = lifePatternNm;
        this.engLifePatternNm = engLifePatternNm.replace(" ", "_").toUpperCase();
        this.lpiImgFileNm = lpiImgFileNm;
        this.lpiType = lpiType;
    }

    public void setLifePatternNm(String lifePatternNm) {
        this.lifePatternNm = lifePatternNm;
        this.level = MicroDustLevel.fineByLevel(lifePatternNm);
    }

}
