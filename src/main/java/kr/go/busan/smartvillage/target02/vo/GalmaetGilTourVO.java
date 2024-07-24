package kr.go.busan.smartvillage.target02.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

/**
 * 갈맷길 관광 정보 클래스
 */
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GalmaetGilTourVO {
    private String imgFileNm;
    private String iconFileNm;
    private String place;
    private String title;
    private String itemCntnts;
    private String geom;

    private GalmaetGilTourVO properties;

    /**
     * MYBATIS에서 데이터 조회시 관광 정보를 properties 담을 때 사용되는 메서드
     * @param galmaetGilTourVO
     */
    public void setProperties(GalmaetGilTourVO galmaetGilTourVO) {
        if (galmaetGilTourVO.getIconFileNm().equals("temp")) {
            this.geom = null;
        }
        this.properties = galmaetGilTourVO;
    }

}
