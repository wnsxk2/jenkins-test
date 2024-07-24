package kr.go.busan.smartvillage.target02.mapper;

import kr.go.busan.smartvillage.comm.vo.AdmdstDataVO;
import kr.go.busan.smartvillage.comm.vo.GeoStructure;
import kr.go.busan.smartvillage.target02.vo.*;
import org.apache.ibatis.annotations.Param;
import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

@Mapper
public interface Target02Mapper {

    /* Harin Comment : mybatis에서 mapper의 파라미터는 공식적으로 1개만 가능함 */

    /* 하나의 메서드로 변경 */
    List<FeaturePropVO> selectDustInfo(@Param("mapType") String mapType, @Param("currentTime") String currentTime);

    List<FeaturePropVO> selectGmDustInfo(@Param("mapType") String mapType, @Param("currentTime") String currentTime);

    List<PortMsrstnVO> selectPortDustData();

    List<FeaturePropVO> selectDAILYDustInfo(@Param("mapType") String mapType, @Param("selectTime") String selectTime, @Param("code") String code);

    // public List<FeaturePropVO> selectYesterdayDust(@Param("mapType") String mapType, @Param("msrstn_id") String msrstnId, @Param("yesterdayStr") String yesterdayStr);
    List<FeaturePropVO> selectYesterdayDust(@Param("mapType") String mapType, @Param("msrstn_id") String msrstnId);

    /**
     * 생활 패턴 지수 데이터 조회 메서드
     *
     * @return 모든 생활 패턴 지수 데이터
     */
    List<LifePatternVO> selectLifePatternList();

    List<FeaturePropVO> selectLifeIndex(@Param("code") String code, @Param("selectTime") String selectTime);

    List<FeaturePropVO> selectSliderDustInfo(@Param("mapType") String mapType, @Param("sliderTime") String msrmtDt);

    List<FeaturePropVO> selectDustDateList(@Param("mapType") String mapType);

    /**
     * 갈맷길 WKT 데이터 조회 메서드
     *
     * @return 모든 갈맷길 데이터
     */
    List<GalmaetVO> selectWktGmDataList();

    List<ForecastVO> selectForecastList(@Param("tomorrowStr") String tomorrowStr);

    List<LifePatternVO> selectGalmaetLifePattern(@Param("courseId") int courseId, @Param("guganId") int guganId, @Param("selectTime") String selectTime);

    List<AdmdstDataVO> selectWktTipoffDataList();

    List<FeaturePropVO> selectTipoffDataList(@Param("selectDate") String selectDate, @Param("selectTime") String selectTime);

    List<FeaturePropVO> selectDustDataList(@Param("selectDate") String selectDate, @Param("selectTime") String selectTime);

    List<FeaturePropVO> selectAvgData(@Param("mapType") String mapType, @Param("selectDate") String selectDate, @Param("selectTime") String selectTime);


    /**
     * 미세먼지 경보 정보 조회
     *
     * @return 조회일에 발생 해지 되지 않은 미세먼지 경보 데이터
     */
    List<IssueInfoVO> selectIssueInfoList();

    /*선박*/
/*    public List<PortShipVO> selectPortShipList(@Param("portMsrstnId") String portMsrstnId, @Param("selectTime") String selectTime);
    public List<PortShipVO> selectPortShipStats(@Param("portMsrstnId") String portMsrstnId, @Param("selectTime") String selectTime);

    public List<PortShipVO> selectPortShipMap(@Param("portMsrstnId") String portMsrstnId, @Param("selectTime") String selectTime);

    //선박통계
    public List<PortShipVO> selectPortShipRatio(@Param("portMsrstnId") String portMsrstnId, @Param("selectTime") String selectTime);*/


    /*윤경 항만 다시 작업*/
    List<PortInfoVO> selectPortInfoList(@Param("currentTime") String currentTime);

    List<PortShipInfoVO> selectPortShipInfoList(@Param("currentTime") String currentTime);

    List<PortInfoVO> selectYesterdayData();


    //harin
    /**
     * 갈맷길 정보 조회 메서드
     *
     * @return 갈맷길 위치 정보와 갈맷길 정보 및 미세먼지 정보 리스트
     */
    List<GeoStructure> selectGalmaetgilInfoList(); //최신날짜 파라미터 추가 필요

    /**
     * AOD 정보 조회 메서드
     *
     * @return 지역 위치 정보와 AOD 정보 리스트
     */
    List<GeoStructure> selectRegionAodDataList();//최신날짜 파라미터 추가 필요

    List<GeoStructure> selectPortSliderInfo();

}
