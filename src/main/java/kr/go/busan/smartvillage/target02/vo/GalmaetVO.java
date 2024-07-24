package kr.go.busan.smartvillage.target02.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.co.greenblue.comm.util.DateTimeUtil;
import kr.co.greenblue.comm.util.StringUtil;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GalmaetVO {
    /* DB */
    private int courseId;
    private int guganId;
    private String areaMsrstnId;
    private String courseNm;
    private String guganNm;
    private String gmRange;
    private String gmDegree;
    private String gmCourse;
    private String lkNm;
    private String lkImgPath;
    private String reqHr;
    // 삭제 예정
    private String geom;
    /* API Data */
    private GalmaetVO properties;
    private Map<String, LifePatternVO> lifePatterns;

    /*return용*/
    private GalmaetVO courseInfo; //갈맷길 코스
    private List<GalmaetGilTourVO> tourInfo; //갈맷길 투어
    private AodVO aodInfo; //aod
    private Map<String, Object> dustInfo;//(초)미세먼지

    public GalmaetVO() {

    }

    /**
     * Mybatis의 ResultMap 중 GalmaetgilGeoStructureMap에 사용되는 성성자
     * @param courseId 갈맷길 코스 아이디
     * @param guganId 갈맷길 구간 아이디
     * @param guganNm 구간명
     * @param courseNm 코스명
     * @param gmRange 거리
     * @param gmDegree 난이도
     * @param gmCourse 코스 요약
     * @param lkNm 명소명
     * @param lkImgPath 명소 이미지
     * @param reqHr 소요 시간
     * @param dustMsrmtDt 미세먼지 측정 시간
     */
    public GalmaetVO(int courseId, int guganId, String guganNm, String courseNm, String gmRange, String gmDegree, String gmCourse, String lkNm, String lkImgPath, String reqHr, String dustMsrmtDt) {
        if (this.dustInfo == null) {
            this.dustInfo = new HashMap<>();

            String dayOfWeek = DateTimeUtil.getInstance().getDayOfWeek(dustMsrmtDt);
            String[] dtArr = dustMsrmtDt.split("\\s");

            dustInfo.put("msrstdt", StringUtil.makeString(dtArr[0], "(", dayOfWeek, ") ", dtArr[1]));
        }

        if (this.courseInfo == null) {
            this.courseInfo = new GalmaetVO();
            this.courseInfo.courseId = courseId;
            this.courseInfo.guganId = guganId;
            this.courseInfo.guganNm = guganNm;
            this.courseInfo.courseNm = courseNm;
            this.courseInfo.gmRange = gmRange;
            this.courseInfo.gmDegree = galmaetGilDegreeForStar(gmDegree);
            this.courseInfo.gmCourse = gmCourse;
            this.courseInfo.lkNm = lkNm;
            this.courseInfo.lkImgPath = lkImgPath;
            this.courseInfo.reqHr=reqHr;
        }
        this.courseId = courseId;
        this.guganId = guganId;
    }

    /**
     * Mybatis collection property setter 메서드
     * Collection은 list가 아닌 개별 setter를 반복 호출함
     *
     * @param lifePatternVO
     */
    public void setDustInfo(LifePatternVO lifePatternVO) {

        String outerKey = lifePatternVO.getLpiType().contains("초미세") ? "pm25" : "pm10";
        String innerKey = lifePatternVO.getLpiType();

        dustInfo.computeIfAbsent(outerKey, k -> new HashMap<String, LifePatternVO>());
        ((Map<String, LifePatternVO>) dustInfo.get(outerKey)).put(innerKey, lifePatternVO);
    }

    /**
     * 갈맷길 구간 난이도 표출 변환 메서드
     * @param gmDegree 구간 난이도
     * @return 별표로 표시된 갈맷길 구간 난이도
     */
    private String galmaetGilDegreeForStar(String gmDegree){
        String starExpression = "";
        switch (gmDegree){
            case "상":
                starExpression = "★★★";
                break;
            case "중":
                starExpression = "★★☆";
                break;
            case "하":
                starExpression = "★☆☆";
                break;
            default:
                starExpression = "☆☆☆";
                break;
        }
        return starExpression;
    }
}
