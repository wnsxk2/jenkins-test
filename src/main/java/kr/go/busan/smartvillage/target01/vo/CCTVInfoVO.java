package kr.go.busan.smartvillage.target01.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CCTVInfoVO {
    private String cctvId;
    private String cctvName;
    private int totalActive;
    private double totalArea;
    private double totalWeight;
    private double totalVolume;

    private Map<String, WrnInfoVO> wrnInfo;
    private Map<String, CCTVShotInfoVO> cctvShotInfo;
    private List<BizInfoVO> bizInfo;
    private List<WaterLvlVO> waterLvlInfo;

    /* return 값 */
    private Map<String, Object> costChartData;
    private Map<String, Object> waterLevelChartData;
    private List<CCTVShotInfoVO> monitData;

    /**
     * CCTV geom과 조회 기간 total 데이터를 처리하는 생성자
     * @param cctvId cctv 아이디
     * @param cctvName cctv 이름
     * @param totalActive 현재 cctv 활성화 개수
     * @param totalArea 조회 기간 내 모든 부유쓰레기 면적
     * @param totalWeight 조회 기간 내 모든 부유쓰레기 무게
     * @param totalVolume 조회 기간 내 모든 부유쓰레기 부피
     */
    public CCTVInfoVO(String cctvId, String cctvName, int totalActive, double totalArea, double totalWeight, double totalVolume){
        if (this.cctvShotInfo == null) {
            this.cctvShotInfo = new HashMap<>();
        }
        this.cctvId = cctvId;
        this.cctvName = cctvName;
        this.totalActive = totalActive;
        // 실제 데이터 사용시 단위 수정
        this.totalArea = Math.round(totalArea/100) / 10.0;
        this.totalWeight = Math.round(totalWeight/100) / 10.0;
        this.totalVolume = Math.round(totalVolume/100) / 10.0;
    }

    /**
     * 조회 기간 내 수위데이터, 소요예산 데이터를 처리하는 생성자
     * @param cctvId cctv 아이디
     */
    public CCTVInfoVO(String cctvId){
        if (this.wrnInfo == null) {
            this.wrnInfo = new HashMap<>();
        }
        if(this.costChartData == null) {
            this.costChartData = new HashMap<>();
            List<String> bizChartXAxis = new ArrayList<>();
            List<Double> bizTrashData = new ArrayList<>();
            List<Integer> costData = new ArrayList<>();

            this.costChartData.put("xAxis", bizChartXAxis);
            this.costChartData.put("trashData", bizTrashData);
            this.costChartData.put("costData", costData);
        }
        if(this.waterLevelChartData == null){
            this.waterLevelChartData = new HashMap<>();
            List<String> wlChartXAxis = new ArrayList<>();
            List<Double> wlTrashData = new ArrayList<>();
            List<Double> waterLevelData = new ArrayList<>();

            this.waterLevelChartData.put("xAxis", wlChartXAxis);
            this.waterLevelChartData.put("trashData", wlTrashData);
            this.waterLevelChartData.put("waterLevelData", waterLevelData);

        }
        this.cctvId = cctvId;
    }

    /**
     * 같은 기간의 file을 하나의 객체에 담는 메서드
     * @param cctvShotInfoVO file 정보 객체
     */
    public void setCctvShotInfo(CCTVShotInfoVO cctvShotInfoVO){
        if(cctvShotInfoVO.getDate() != null){
            String key = cctvShotInfoVO.getDate();
            if (cctvShotInfo.containsKey(key)) {
                CCTVShotInfoVO cctvVo = new CCTVShotInfoVO(key, cctvShotInfo.get(key), cctvShotInfoVO);
                cctvShotInfo.put(key, cctvVo);
            } else {
                cctvShotInfo.put(key, cctvShotInfoVO);
            }
        }
    }

    /**
     * 같은 월의 기상 특보를 하나의 객체에 담는 메서드
     * @param wrnInfoVO 기상 특보 객체
     */
    public void setWrnInfo(WrnInfoVO wrnInfoVO){
        if(wrnInfoVO.getMonth() != null){
            String key = wrnInfoVO.getKey();
            if (this.wrnInfo.containsKey(key)) {
                WrnInfoVO wrnVo = new WrnInfoVO(key, this.wrnInfo.get(key), wrnInfoVO);
                this.wrnInfo.put(key, wrnVo);
            } else {
                this.wrnInfo.put(key, wrnInfoVO);
            }
        }
    }

    /**
     * 소요예산 데이터를 Map에 담는 메서드
     * @param bizInfo 소요예산 객체
     */
    public void setBizInfo(BizInfoVO bizInfo){
        ((List<String>) this.costChartData.get("xAxis")).add(bizInfo.getBizYear());
        // 실제 데이터 사용시 단위 수정
        ((List<Double>) this.costChartData.get("trashData")).add(Math.round(bizInfo.getBizWeight() / 100) / 10.0);
        ((List<Integer>) this.costChartData.get("costData")).add(bizInfo.getBizBudget() / 1000);

    }

    /**
     * 수위 데이터를 Map에 담는 메서드
     * @param waterLvlVO
     */
    public void setWaterLvlInfo(WaterLvlVO waterLvlVO) {
        ((List<String>) this.waterLevelChartData.get("xAxis")).add(waterLvlVO.getWaterLevelMonth());
        // 실제 데이터 사용시 단위 수정
        ((List<Double>) this.waterLevelChartData.get("trashData")).add(Math.round(waterLvlVO.getDebrisWeight() / 100) / 10.0);
        ((List<Double>) this.waterLevelChartData.get("waterLevelData")).add(waterLvlVO.getWaterLevel());
    }

    /**
     * 같은 cctv의 아이디를 가진 객체를 하나의 객체로 합치는 메서드
     * @param cctvInfo 차트 데이터를 담고 있는 CCTV 객체
     */
    public void setChartData(CCTVInfoVO cctvInfo){

        /* 소요예산 차트 데이터 */
        this.costChartData = cctvInfo.getCostChartData();

        /* 수위대비 발생량 데이터 */
        cctvInfo.getWaterLevelChartData().put("warningData", cctvInfo.getWrnInfo());
        this.waterLevelChartData = cctvInfo.getWaterLevelChartData();


        /* 모니터링 데이터 */
        this.monitData = cctvShotInfo.values().stream().collect(Collectors.toCollection(ArrayList::new));
        this.cctvShotInfo = null;
    }
}
