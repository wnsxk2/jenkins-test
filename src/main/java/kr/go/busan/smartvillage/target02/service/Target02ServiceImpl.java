package kr.go.busan.smartvillage.target02.service;


import kr.co.greenblue.geometry.model.WKTStructure;
import kr.go.busan.smartvillage.comm.vo.AdmdstDataVO;
import kr.go.busan.smartvillage.comm.vo.GeoStructure;
import kr.go.busan.smartvillage.target02.code.ShipGroup;
import kr.go.busan.smartvillage.target02.mapper.Target02Mapper;
import kr.go.busan.smartvillage.target02.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service("Tagert02Service")
@RequiredArgsConstructor
public class Target02ServiceImpl implements Target02Service {

    private final Target02Mapper target02Mapper;

    private static List<LifePatternVO> lifePatternData = null;
    @Override
    public Map<String, FeaturePropVO> selectDustInfo(String mapType) {

        List<FeaturePropVO> dustList;
        Map<String, FeaturePropVO> dustMap = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();
        String nowStr = now.format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm"));
        if(mapType.equals("gm")){
            dustList = target02Mapper.selectGmDustInfo(mapType, nowStr);
        } else {
            dustList = target02Mapper.selectDustInfo(mapType, nowStr);
        }


        for(FeaturePropVO prop : dustList){
            if(!mapType.equals("gm")){
                if(dustMap.containsKey(prop.getAdmdstCd())){
                    FeaturePropVO feature = dustMap.get(prop.getAdmdstCd());
                    prop.setPm10(getDustAvg(feature.getPm10(), prop.getPm10()));
                    prop.setPm25(getDustAvg(feature.getPm25(), prop.getPm25()));
                    dustMap.put(prop.getAdmdstCd(), prop);
                } else {
                    if(mapType.equals("port")){
                        dustMap.put(prop.getMsrstnId(), prop);
                    } else if (mapType.equals("area")){
                        dustMap.put(prop.getAdmdstCd(), prop);
                    }
                }
            } else {
                dustMap.put(prop.getGuganNm(), prop);
            }

        }
        return dustMap;
    }

    /**
     * 숫자로 이루어진 문자열들의 평균값을 구하는 메서드
     * @param dust1 숫자로 이루어진 문자열
     * @param dust2 숫자로 이루어진 문자열
     * @return 숫자를 더한 문자열들의 평균값
     */
    public String getDustAvg(String dust1, String dust2){
        int value1 = dust1 != null ? Integer.parseInt(dust1) : 0;
        int value2 = dust2 != null ? Integer.parseInt(dust2) : 0;
        return String.valueOf((value1 + value2) / 2);
    }

    public int getDustAvg(int dust1, int dust2){
        return (dust1 + dust2) / 2;
    }

    @Override
    public List<PortMsrstnVO> selectPortDustData() {
        return target02Mapper.selectPortDustData();
    }

    @Override
    public DustDetailVO selectDustDetailInfo(String dustType, String mapType, String code, String selectTime) {
        // Enum을 활용하여 생활지수 처리 추가 필요
        // 생활 패턴 지수 데이터 확인
        if(!checkLifePatternData()){
            makeLifePatternInfo();
        }

        List<String> dateList = new ArrayList<>();
        List<Integer> pmValues = new ArrayList<>();
        Map<String, LifePatternVO> lifePatternMap = new HashMap<>();
        Map<String, FeaturePropVO> dustMap = new LinkedHashMap<>();
        List<FeaturePropVO> dustList = target02Mapper.selectDAILYDustInfo(mapType, selectTime, code);
        for (FeaturePropVO prop : dustList) {
            if (dustMap.containsKey(prop.getMsrmtDt())) {
                FeaturePropVO feature = dustMap.get(prop.getMsrmtDt());
                feature.setPm10(getDustAvg(feature.getPm10(), prop.getPm10()));
                feature.setPm25(getDustAvg(feature.getPm25(), prop.getPm25()));
                dustMap.put(prop.getMsrmtDt(), feature);
            } else {
                dustMap.put(prop.getMsrmtDt(), prop);
            }
        }

        List<String> sortedKeys = new ArrayList<>(dustMap.keySet());
        Collections.sort(sortedKeys);

        for (String key : sortedKeys) {
            FeaturePropVO feature = dustMap.get(key);
            dateList.add(feature.getMsrmtDt());
            if (dustType.equals("pm10")) {
                pmValues.add(feature.getPm10() != null ? Integer.valueOf(feature.getPm10()) : null);
            } else if (dustType.equals("pm25")) {
                pmValues.add(feature.getPm25() != null ? Integer.valueOf(feature.getPm25()) : null);
            }
        }

        List<FeaturePropVO> lifeIndices = target02Mapper.selectLifeIndex(code, selectTime);
        Map<String, Integer> pm10 = new HashMap<>();
        Map<String, Integer> pm25 = new HashMap<>();

        for(FeaturePropVO lifeIndex : lifeIndices){
            String[] lifeIndexTypeArr = lifeIndex.getLifeIndexType().split("@");
            String[] lifeIndexScrArr = lifeIndex.getLifeIndexScr().split("@");

            for(int i = 0; i < lifeIndexTypeArr.length; i++){

                String[] lifeIndexType = lifeIndexTypeArr[i].split("\\|");
                String[] lifeIndexScr = lifeIndexScrArr[i].split("\\|");

                for (int j = 0; j < lifeIndexType.length; j++) {
                    if (i == 0) {
                        if (pm10.containsKey(lifeIndexType[j])) {
                            pm10.put(lifeIndexType[j], getDustAvg(pm10.get(lifeIndexType[j]), Integer.valueOf(lifeIndexScr[j])));
                        } else {
                            pm10.put(lifeIndexType[j], Integer.valueOf(lifeIndexScr[j]));
                        }
                    } else if (i == 1) {
                        if (pm25.containsKey(lifeIndexType[j])) {
                            pm25.put(lifeIndexType[j], getDustAvg(pm25.get(lifeIndexType[j]), Integer.valueOf(lifeIndexScr[j])));
                        } else {
                            pm25.put(lifeIndexType[j], Integer.valueOf(lifeIndexScr[j]));
                        }
                    }
                }
            }
        }

        for (LifePatternVO lifePattern : lifePatternData) {
            if (dustType.equals("pm10")){
                if (pm10.containsKey(lifePattern.getLpiType())) {
                    if(pm10.get(lifePattern.getLpiType()) <= lifePattern.getLpiMaxScr()){
                        lifePatternMap.put(lifePattern.getLpiType(), lifePattern);
                        pm10.remove(lifePattern.getLpiType());
                    }
                }
            } else if(dustType.equals("pm25")){
                if (pm25.containsKey(lifePattern.getLpiType())) {
                    if(pm25.get(lifePattern.getLpiType()) <= lifePattern.getLpiMaxScr()){
                        lifePatternMap.put(lifePattern.getLpiType(), lifePattern);
                        pm25.remove(lifePattern.getLpiType());
                    }
                }
            }
        }

        DustDetailVO dustDetail = new DustDetailVO();
        dustDetail.setId(code);
        dustDetail.setDustType(dustType);
        dustDetail.setDataList(dateList);
        dustDetail.setPmValues(pmValues);
        dustDetail.setLifePattern(lifePatternMap);

        return dustDetail;
    }

    /*@Override
    public List<FeaturePropVO> selectYesterdayDust(String mapType, String msrstnId) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime yesterday = now.minusDays(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String yesterdayStr = yesterday.format(formatter);

        List<FeaturePropVO> dustList = target02Mapper.selectYesterdayDust(mapType, msrstnId, yesterdayStr);

        int totalPm10 = 0;
        int totalPm25 = 0;
        int count = 0;
            for (FeaturePropVO prop : dustList){
                int intPm10 = Integer.parseInt(prop.getPm10());
                int intPm25 = Integer.parseInt(prop.getPm25());
                totalPm10 += intPm10;
                totalPm25 += intPm25;
                count++;
            }
        int avgPm10 = totalPm10/count;
        int avgPm25 = totalPm25/count;

        List<FeaturePropVO> resultList = new ArrayList<>();
        FeaturePropVO averageData = new FeaturePropVO();
        averageData.setPm10(String.valueOf(avgPm10));
        averageData.setPm25(String.valueOf(avgPm25));
        resultList.add(averageData);

        return resultList;
    }*/

    @Override
    public List<FeaturePropVO> selectYesterdayDust(String mapType, String msrstnId) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime yesterday = now.minusDays(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String yesterdayStr = yesterday.format(formatter);

        List<FeaturePropVO> dustList = target02Mapper.selectYesterdayDust(mapType, msrstnId);

        int totalPm10 = 0;
        int totalPm25 = 0;
        int countPm10 = 0;
        int countPm25 = 0;
        for (FeaturePropVO prop : dustList){
            if(prop.getPm10() != null){
                int intPm10 = Integer.parseInt(prop.getPm10());
                totalPm10 += intPm10;
                countPm10++;
            }
            if (prop.getPm25() != null) {
                int intPm25 = Integer.parseInt(prop.getPm25());

                totalPm25 += intPm25;
                countPm25++;
            }
        }



        int avgPm10 = countPm10 > 0 ? totalPm10 / countPm10 : 0;
        int avgPm25 = countPm25 > 0 ? totalPm25 / countPm25 : 0;

        List<FeaturePropVO> resultList = new ArrayList<>();
        FeaturePropVO averageData = new FeaturePropVO();
        averageData.setPm10(String.valueOf(avgPm10));
        averageData.setPm25(String.valueOf(avgPm25));
        resultList.add(averageData);

        return resultList;
    }

    /*미세먼지 변화값 (시간순 정렬 완료)-슬라이더*/  /*지역측정소 값 평균화 필요*/
    @Override
    public Map<String, List<FeaturePropVO>> selectSliderDustInfo(String mapType, String msrmtDt) {
        Map<String, List<FeaturePropVO>> dustMap = new HashMap<>();
        List<FeaturePropVO> dustList = target02Mapper.selectSliderDustInfo(mapType, msrmtDt);


        for (FeaturePropVO prop : dustList) {
            String key = prop.getMsrmtDt();
            dustMap.computeIfAbsent(key, k -> new ArrayList<>()).add(prop);
        }

        Map<String, List<FeaturePropVO>> sortedMap = dustMap.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));

        return sortedMap;
    }

    /*미세먼지 변화값 슬라이더 날짜 목록 불러오기*/
    @Override
    public List<FeaturePropVO> selectDustDateList(String mapType) {

        return target02Mapper.selectDustDateList(mapType);
    }

    @Override
    public List<GalmaetVO> selectWktGmDataList() {
        List<GalmaetVO> dataList = target02Mapper.selectWktGmDataList();
        return dataList;
    }



    /*미세먼지 예보 데이터*/
    @Override //***넘기는 날짜가 오늘인지, 내일인지 다시 확인필요
    public List<ForecastVO> selectForecastList() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime tomorrow = now.plusDays(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String tomorrowStr = now.format(formatter);
        return target02Mapper.selectForecastList(tomorrowStr);
    }

    @Override
    public GalmaetVO selectGalmaetDetail(int courseId, int guganId, String selectTime) {

        Map<String, LifePatternVO> lifePatternMap = new HashMap<>();
        List<LifePatternVO> lifePatternList = target02Mapper.selectGalmaetLifePattern(courseId, guganId, selectTime);

        for (LifePatternVO lifePattern : lifePatternList) {
            lifePatternMap.put(lifePattern.getLpiType(), lifePattern);
        }

        GalmaetVO galmaet = new GalmaetVO();
        galmaet.setCourseId(courseId);
        galmaet.setGuganId(guganId);
        galmaet.setLifePatterns(lifePatternMap);
        return galmaet;
    }

    @Override
    public List<WKTStructure> selectWktTipOffDataList(String selectTime) {

        String[] selectDate = selectTime.split(" ");

        Map<String, Map> totalMap = new HashMap<>();
        Map<String, List<FeaturePropVO>> avgMap = new HashMap<>();
        Map<String, List<FeaturePropVO>> tipoffMap = new HashMap<>();
        Map<String, List<FeaturePropVO>> dustMap = new HashMap<>();
        List<WKTStructure> wktDataList = new ArrayList<>();

        List<FeaturePropVO> areaAvgDataList = target02Mapper.selectAvgData("area", selectDate[0], selectTime);
        List<FeaturePropVO> tipoffAvgDataList = target02Mapper.selectAvgData("tipoff", selectDate[0], selectTime);
        //
        List<FeaturePropVO> tipoffDataList = target02Mapper.selectTipoffDataList(selectDate[0], selectTime);
        List<FeaturePropVO> dustDataList = target02Mapper.selectDustDataList(selectDate[0], selectTime);

        List<AdmdstDataVO> admdstDataVOList = target02Mapper.selectWktTipoffDataList();

        for (FeaturePropVO feature : tipoffAvgDataList){
            List<FeaturePropVO> features = new ArrayList<>();
            features.add(feature);
            avgMap.put(feature.getId(), features);
        }

        for (FeaturePropVO feature : areaAvgDataList){
            List<FeaturePropVO> features = null;
            if(avgMap.containsKey(feature.getId())){
                features = avgMap.get(feature.getId());
            } else {
                features = new ArrayList<>();
                features.add(null);
            }
            features.add(feature);
            avgMap.put(feature.getId(), features);
        }

        for (FeaturePropVO feature : tipoffDataList){
            if(tipoffMap.containsKey(feature.getId())){
                List<FeaturePropVO> features = tipoffMap.get(feature.getId());
                features.add(feature);
                tipoffMap.put(feature.getId(), features);
            } else {
                List<FeaturePropVO> features = new ArrayList<>();
                features.add(feature);
                tipoffMap.put(feature.getId(), features);
            }
        }

        for(FeaturePropVO feature : dustDataList){
            if(dustMap.containsKey(feature.getId())){
                List<FeaturePropVO> features = dustMap.get(feature.getId());
                features.add(feature);
                dustMap.put(feature.getId(), features);
            } else {
                List<FeaturePropVO> features = new ArrayList<>();
                features.add(feature);
                dustMap.put(feature.getId(), features);
            }
        }

        if (admdstDataVOList.size() > 0) {
            for(AdmdstDataVO admdstDataVO : admdstDataVOList) {
                WKTStructure WKTStructure = new WKTStructure();
                int sggDivNum = Integer.parseInt(admdstDataVO.getProperties().getSggDivNum()) - 1;
                String id = admdstDataVO.getProperties().getId();
                FeaturePropVO prop = avgMap.get(id).get(sggDivNum);

                WKTStructure.setWKTFormatGeom(admdstDataVO.getGeom());
                WKTStructure.addProperty("id", admdstDataVO.getProperties().getId());
                WKTStructure.addProperty("admdstCd", admdstDataVO.getProperties().getAdmdstCd());
                WKTStructure.addProperty("admdstNm", admdstDataVO.getProperties().getAdmdstNm());
                WKTStructure.addProperty("engAdmdstNm", admdstDataVO.getProperties().getEngAdmdstNm());
                WKTStructure.addProperty("sggDivNum", admdstDataVO.getProperties().getSggDivNum());

                if (prop != null) {
                    WKTStructure.addProperty("pm10", prop.getPm10());
                    WKTStructure.addProperty("pm10Index", prop.getPm10Index());
                }

                if (sggDivNum == 0) {
                    WKTStructure.addProperty("tipoffData", tipoffMap.get(id));
                } else if (sggDivNum == 1) {
                    WKTStructure.addProperty("dustData", dustMap.get(id));
                }
                wktDataList.add(WKTStructure);
            }
        }else{
            log.info("SGG Data List size : 0");
            return null;
        }

        return wktDataList;
    }

    @Override
    public Map<String, Map> selectTipoffDataList(String selectTime){
        String[] selectDate = selectTime.split(" ");
        Map<String, Map> totalMap = new HashMap<>();
        Map<String, List<FeaturePropVO>> avgMap = new HashMap<>();
        Map<String, List<FeaturePropVO>> tipoffMap = new HashMap<>();
        Map<String, List<FeaturePropVO>> dustMap = new HashMap<>();
        List<FeaturePropVO> areaAvgDataList = target02Mapper.selectAvgData("area", selectDate[0], selectTime);
        List<FeaturePropVO> tipoffAvgDataList = target02Mapper.selectAvgData("tipoff", selectDate[0], selectTime);
        //
        List<FeaturePropVO> tipoffDataList = target02Mapper.selectTipoffDataList(selectDate[0], selectTime);
        List<FeaturePropVO> dustDataList = target02Mapper.selectDustDataList(selectDate[0], selectTime);

        for (FeaturePropVO feature : tipoffAvgDataList){
            List<FeaturePropVO> features = new ArrayList<>();
            features.add(feature);
            avgMap.put(feature.getId(), features);
        }

        for (FeaturePropVO feature : areaAvgDataList){
            List<FeaturePropVO> features = null;
            if(avgMap.containsKey(feature.getId())){
                features = avgMap.get(feature.getId());
            } else {
                features = new ArrayList<>();
                features.add(null);
            }
            features.add(feature);
            avgMap.put(feature.getId(), features);
        }

        for (FeaturePropVO feature : tipoffDataList){
            if(tipoffMap.containsKey(feature.getId())){
                List<FeaturePropVO> features = tipoffMap.get(feature.getId());
                features.add(feature);
                tipoffMap.put(feature.getId(), features);
            } else {
                List<FeaturePropVO> features = new ArrayList<>();
                features.add(feature);
                tipoffMap.put(feature.getId(), features);
            }
        }

        for(FeaturePropVO feature : dustDataList){
            if(dustMap.containsKey(feature.getId())){
                List<FeaturePropVO> features = dustMap.get(feature.getId());
                features.add(feature);
                dustMap.put(feature.getId(), features);
            } else {
                List<FeaturePropVO> features = new ArrayList<>();
                features.add(feature);
                dustMap.put(feature.getId(), features);
            }
        }

        totalMap.put("mapData", avgMap);
        totalMap.put("tipoffData", tipoffMap);
        totalMap.put("dustData", dustMap);
        return totalMap;
    }

    /**
     * 미세먼지 경보 정보 리스트
     * @return pm10, pm25가 key인 경보 정보 리스트를 반환
     */
    @Override
    public Map<String, List<IssueInfoVO>> selectIssueInfoList() {
        Map<String, List<IssueInfoVO>> issueMap = null;
        List<IssueInfoVO> issueInfoVOList = target02Mapper.selectIssueInfoList();
        if(issueInfoVOList.size()>0){
            issueMap = issueInfoVOList.stream().collect(Collectors.groupingBy(IssueInfoVO::getDustType));
        }
        return issueMap;
    }


    /**
     * 생활 패턴 지수 데이터가 존재하는지 확인하는 메서드
     * @return
     */
    private boolean checkLifePatternData() {
        return lifePatternData != null && lifePatternData.size() != 0;
    }

    /**
     * 생활 패턴 지수 데이터를 초기화 하는 메서드
     */
    private void makeLifePatternInfo() {
        if(lifePatternData == null){
            lifePatternData = target02Mapper.selectLifePatternList();
        }
    }

    /*항만 선박 + 통계*/
   /* @Override
    public PortShipDetaleVO selectPortShipList(String portMsrstnId, String selectTime) {
        List<String> entryDepartureDtList = new ArrayList<>();
        List<Integer> entryCountList = new ArrayList<>();
        List<Integer> departureCountList = new ArrayList<>();


        // 항만별 선박 정보를 가져옴
        List<PortShipVO> shipList = target02Mapper.selectPortShipList(portMsrstnId, selectTime);

        // 가져온 정보에서 필요한 데이터 추출 및 리스트에 추가
        for (PortShipVO ship : shipList) {
            entryDepartureDtList.add(ship.getEntryDepartureDt());
            entryCountList.add(ship.getEntryCount());
            departureCountList.add(ship.getDepartureCount());
        }


        PortShipDetaleVO portShipDetaleVO = new PortShipDetaleVO();

        portShipDetaleVO.setEntryDepartureDtList(entryDepartureDtList);
        portShipDetaleVO.setEntryCountList(entryCountList);
        portShipDetaleVO.setDepartureCountList(departureCountList);

        return portShipDetaleVO;
    }

    @Override
    public List<PortShipVO> selectPortShipStats(String portMsrstnId, String selectTime) {
        return target02Mapper.selectPortShipStats(portMsrstnId, selectTime);
    }

    @Override
    public Map<String, Map<String, List<Object>>> selectPortShipMap(String portMsrstnId, String selectTime) {
        Map<String, Map<String, List<Object>>> resultMap = new HashMap<>();
        List<PortShipVO> shipList = target02Mapper.selectPortShipMap(portMsrstnId, selectTime);

        for (PortShipVO prop : shipList) {
            String timeKey = prop.getTime();
            String shipGroupName = prop.getShipGroupName();
            int shipGroupEntry = prop.getShipGroupEntry();
            int shipGroupDeparture = prop.getShipGroupDeparture();

            // 결과 맵에 시간 키가 있는지 확인하고, 없으면 새로운 맵을 추가
            resultMap.computeIfAbsent(timeKey, k -> new HashMap<>());

            // 시간 키에 해당하는 맵에서 shipGroupName, entryCount, departureCount 리스트 추가
            resultMap.get(timeKey).computeIfAbsent("shipGroupName", k -> new ArrayList<>()).add(shipGroupName);
            resultMap.get(timeKey).computeIfAbsent("shipGroupEntry", k -> new ArrayList<>()).add(shipGroupEntry);
            resultMap.get(timeKey).computeIfAbsent("shipGroupDeparture", k -> new ArrayList<>()).add(shipGroupDeparture);
        }

        return resultMap;
    }

    @Override
    public Map<String, Map<String, List<Object>>>  selectPortShipRatio(String portMsrstnId, String selectTime) {
        Map<String, Map<String, List<Object>>> resultMap = new HashMap<>();
        List<PortShipVO> ratioList = target02Mapper.selectPortShipRatio(portMsrstnId, selectTime);

        for (PortShipVO prop : ratioList) {
            String timeKey = prop.getEntryDt();
            int shipEntryWeight = prop.getEntryWeight();
            int shipDepartureWeight = prop.getDepartureWeight();

            resultMap.computeIfAbsent(timeKey, k -> new HashMap<>());

            resultMap.get(timeKey).computeIfAbsent("shipEntryWeight", k -> new ArrayList<>()).add(shipEntryWeight);
            resultMap.get(timeKey).computeIfAbsent("shipDepartureWeight", k -> new ArrayList<>()).add(shipDepartureWeight);
        }

        return resultMap;
    }
*/




    /*윤경 항만 다시 작업*/
    @Override
    public Map<String, PortInfoVO> selectPortInfoList(String dustType) {
        LocalDateTime now = LocalDateTime.now();
        String nowStr = now.format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm"));

        List<PortInfoVO> portInfoList = target02Mapper.selectPortInfoList(nowStr);
        List<PortShipInfoVO> portShipInfoList = target02Mapper.selectPortShipInfoList(nowStr);


        // 포트 정보를 담을 맵을 생성
        Map<String, PortInfoVO> portInfoMap = new HashMap<>();

        // 포트 정보 리스트를 맵에 추가
                /*for(int i = 0; i < portInfoList.size(); i++) {
                  PortInfoVO portInfo = portInfoList.get(i);*/
        for (PortInfoVO portInfo : portInfoList) {
            String msrstnId = portInfo.getMsrstnId();
            // 이미 맵에 해당 포트 정보가 있는지 확인
            if (portInfoMap.containsKey(msrstnId)) { //containsKey: key값 존재 확인: true
                // 이미 있는 경우 해당 포트 정보의 times에 추가
                PortInfoVO existPortInfo = portInfoMap.get(msrstnId);
                existPortInfo.getTimes().add(portInfo.getMsrmtDt()); //.add(): 기존 times에 추가하기(list에서 사용)
                existPortInfo.setPm10(portInfo.getPm10());    //.set(): 새로 갈아엎기
                existPortInfo.setPm25(portInfo.getPm25());

                List<Integer> existingPmValues = existPortInfo.getPmValues();

                if(dustType.equals("pm10")){
                    existingPmValues.add(portInfo.getPm10() != null ? Integer.parseInt(portInfo.getPm10()) : null);
                }else if(dustType.equals("pm25")){
                    existingPmValues.add(portInfo.getPm25() != null ? Integer.parseInt(portInfo.getPm25()) : null);
                }

                existPortInfo.setPmValues(existingPmValues);

            } else { //false
                // 없는 경우 새로운 포트 정보를 맵에 추가
                List<String> times = new ArrayList<>();
                times.add(portInfo.getMsrmtDt());
                portInfo.setTimes(times);


                List<Integer> pmValues = new ArrayList<>();

                if(dustType.equals("pm10")){
                    pmValues.add(portInfo.getPm10() != null ? Integer.parseInt(portInfo.getPm10()) : null);
                }else if(dustType.equals("pm25")){
                    pmValues.add(portInfo.getPm25() != null ? Integer.parseInt(portInfo.getPm25()) : null);

                }

                portInfo.setPmValues(pmValues);
                portInfo.setDustType(dustType);
                portInfoMap.put(msrstnId, portInfo);
            }

        }

        //마지막 시간(가장 최근시간)을 MsrmtDt에 셋팅
        for (PortInfoVO portInfo : portInfoMap.values()) { //portInfoMap.values() : PortInfoVO 객체
            List<String> times = portInfo.getTimes();
            if (!times.isEmpty()) {
                portInfo.setMsrmtDt(times.get(times.size() - 1));
            }
        }


// 포트 선박 그래프를 저장할 맵 생성
        for (PortInfoVO portInfo : portInfoMap.values()) {
            String msrstnId = portInfo.getMsrstnId();
            Map<String, Object> portShipGraph = new LinkedHashMap<>(); //LinkedHashMap: 순서 유지

            for (String time : portInfo.getTimes()) {
                Map<String, Object> entryInfo = new LinkedHashMap<>();
                Map<String, Object> departureInfo = new LinkedHashMap<>();

                int entryCount = 0;
                int departureCount = 0;

                List<String> shipGroupNames = Arrays.stream(ShipGroup.values()).map(ShipGroup::getShipGroupNm).collect(Collectors.toList());//Enum을 List로 추출하기 (for문 돌려도 됨)
                List<Integer> entryGroupCounts = new ArrayList<>(Collections.nCopies(shipGroupNames.size(), 0)); //shipGroupNames 배열 0으로 초기화
                List<Integer> entryWeights = new ArrayList<>();

                List<Integer> departureGroupCounts = new ArrayList<>(Collections.nCopies(shipGroupNames.size(), 0));
                List<Integer> departureWeights = new ArrayList<>();

                for (PortShipInfoVO portShipInfo : portShipInfoList) {
                    if (msrstnId.equals(portShipInfo.getMsrstnId()) && time.equals(portShipInfo.getEntryDepatureDt())) {
                        int groupIndex = shipGroupNames.indexOf(portShipInfo.getShipGroupNM());

                        if (portShipInfo.getDtType() == 1) { //1=입항
                            entryCount++;
                            entryGroupCounts.set(groupIndex, entryGroupCounts.get(groupIndex) + 1);
                            entryWeights.add(portShipInfo.getWeight());
                        }
                        if (portShipInfo.getDtType() == 2) { //2=출항
                            departureCount++;
                            departureGroupCounts.set(groupIndex, departureGroupCounts.get(groupIndex) + 1);
                            departureWeights.add(portShipInfo.getWeight());
                        }
                    }
                }

                entryInfo.put("entryCount", entryCount);
                entryInfo.put("shipGroupName", shipGroupNames);
                entryInfo.put("shipGroupEntry", entryGroupCounts);
                entryInfo.put("shipEntryWeight", entryWeights);

                departureInfo.put("departureCount", departureCount);
                departureInfo.put("shipGroupName", shipGroupNames);
                departureInfo.put("shipGroupDeparture", departureGroupCounts);
                departureInfo.put("shipDepartureWeight", departureWeights);

                Map<String, Object> timeInfo = new LinkedHashMap<>();
                timeInfo.put("entry", entryInfo);
                timeInfo.put("departure", departureInfo);

                portShipGraph.put(time, timeInfo);
            }

            portInfo.setPortShipGraph(portShipGraph);
        }

        return portInfoMap;
    }

    /**
     * 갈맷길 정보 조회 메서드
     * @return 갈맷길 위치 정보와 갈맷길 정보 및 미세먼지 정보 리스트
     */
    @Override
    public List<GeoStructure> selectGalmaetgilInfoList() {
        try {
            List<GeoStructure> list = target02Mapper.selectGalmaetgilInfoList();
            if (list.size() > 0) {
                return list;
            } else {
                throw new Exception("Data size is 0");
            }
        } catch (Exception e) {//temp
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * AOD 정보 조회 메서드
     *
     * @return 지역 위치 정보와 AOD 정보 리스트
     */
    @Override
    public List<GeoStructure> selectRegionAodDataList() {
        try {
            List<GeoStructure> list = target02Mapper.selectRegionAodDataList();
            if (list.size() > 0) {
                return list;
            } else {
                throw new Exception("Data size is 0");
            }
        } catch (Exception e) { //temp
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<GeoStructure> selectPortSliderInfo(String dateTime, String pmType) {
        try {
            if("".equals(dateTime) || null==dateTime){
                throw new RuntimeException("DateTime is blank or null");
            }

            if ("".equals(pmType) || null==pmType){
                throw new RuntimeException("PmType is blank or null");
            }




            List<GeoStructure> list = target02Mapper.selectPortSliderInfo();
            if (list.size() > 0) {
                return list;
            } else {
                throw new Exception("Data size is 0");
            }
        } catch (Exception e) { //temp
            throw new RuntimeException(e.getMessage());
        }
    }

}
