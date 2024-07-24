package kr.go.busan.smartvillage.target02.service;

import kr.co.greenblue.geometry.model.WKTStructure;
import kr.go.busan.smartvillage.comm.vo.GeoStructure;
import kr.go.busan.smartvillage.target02.vo.*;

import java.util.List;
import java.util.Map;


public interface Target02Service {
    Map<String, FeaturePropVO> selectDustInfo(String mapType);

    List<PortMsrstnVO> selectPortDustData();

    DustDetailVO selectDustDetailInfo(String dustType, String mapType, String code, String selectTime);

    // public List<FeaturePropVO> selectYesterdayDust(String mapType, String msrstnId);
    List<FeaturePropVO> selectYesterdayDust(String mapType, String msrstnId);

    Map<String, List<FeaturePropVO>> selectSliderDustInfo(String mapType, String msrmtDt);

    List<FeaturePropVO> selectDustDateList(String mapType);

    List<GalmaetVO> selectWktGmDataList();

    List<ForecastVO> selectForecastList();

    Map<String, List<IssueInfoVO>> selectIssueInfoList();

    GalmaetVO selectGalmaetDetail(int courseId, int guganId, String selectTime);

    List<WKTStructure> selectWktTipOffDataList(String selectTime);

    Map<String, Map> selectTipoffDataList(String selectTime);

    /*선박정보*/
  /*  public PortShipDetaleVO selectPortShipList(String portMsrstnId, String selectTime);
    public List<PortShipVO> selectPortShipStats(String portMsrstnId, String selectTime);

    public  Map<String, Map<String, List<Object>>> selectPortShipMap (String portMsrstnId, String selectTime);
    public Map<String, Map<String, List<Object>>> selectPortShipRatio(String portMsrstnId, String selectTime);*/

    /*윤경 항만 다시 작업*/
    Map<String, PortInfoVO> selectPortInfoList(String dustType);

    /**
     * 갈맷길 정보 조회 메서드
     *
     * @return 갈맷길 위치 정보와 갈맷길 정보 및 미세먼지 정보 리스트
     */
    List<GeoStructure> selectGalmaetgilInfoList();

    /**
     * AOD 정보 조회 메서드
     *
     * @return 지역 위치 정보와 AOD 정보 리스트
     */
    List<GeoStructure> selectRegionAodDataList();

    List<GeoStructure> selectPortSliderInfo(String dateTime, String pmType);
}
