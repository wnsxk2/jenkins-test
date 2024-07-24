package kr.go.busan.smartvillage.target02.controller;

import kr.co.greenblue.geometry.model.WKTStructure;
import kr.co.greenblue.http.code.ResponseStatusEnum;
import kr.co.greenblue.http.dto.DataResponseDTO;
import kr.co.greenblue.http.dto.ErrorResponseDTO;
import kr.co.greenblue.http.dto.ResponseDTO;
import kr.go.busan.smartvillage.comm.vo.AdmdstDataVO;
import kr.go.busan.smartvillage.comm.vo.GeoStructure;
import kr.go.busan.smartvillage.target02.service.Target02Service;
import kr.go.busan.smartvillage.target02.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.List;
import java.util.Map;

/**
 * Target2의 데이터 전달용 컨트롤러
 * 데이터 송/수신 결과는 ResponseDto 클래스를 사용함
 */
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("data/marine-dust")
public class Target02Controller {

    /* 필드 */
    private final Target02Service target02Service;
    /* 필드 끝 */

    /* 메서드 */
    @RequestMapping(value = "/{mapType}", method = RequestMethod.GET)
    public ResponseDTO getDustInfoData(@PathVariable("mapType") String mapType){
        ResponseDTO message;
        Map<String, FeaturePropVO> propList = null;
        try{
            // area를 파라미터로 전달
            propList = target02Service.selectDustInfo(mapType);
            if(propList != null && propList.size() > 0){
                message = DataResponseDTO.of(propList);
            } else {
                message = DataResponseDTO.of(null);
            }


        } catch (Exception e) { //exception 임시 조치
            log.error("에러 메세지 출력 : "+ e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }


    /*항만*/
    @RequestMapping(value = "/port-location-data", method = RequestMethod.GET)
    public ResponseDTO getPortDustData() {
        ResponseDTO message;

        try {
            List<PortMsrstnVO> portDustData = target02Service.selectPortDustData();
            if (portDustData != null && !portDustData.isEmpty()) {
                message = DataResponseDTO.of(portDustData);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }

    /*어제 데이터*/

    @RequestMapping(value = "/yesterday/{mapType}/{msrstnId}", method = RequestMethod.GET)
    public ResponseDTO getYesterdayDustAvg(@PathVariable("mapType") String mapType, @PathVariable("msrstnId") String msrstnId) {
        ResponseDTO message;

        try {
            List<FeaturePropVO> yesterdayDustAvg = target02Service.selectYesterdayDust(mapType, msrstnId);
            if (yesterdayDustAvg != null) {
                message = DataResponseDTO.of(yesterdayDustAvg);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }


    /**
     * 현재 시간 기준 24시간 이전 데이터를 리턴하는 메서드
     * @param dustType 미세먼지 타입
     * @param code 지역 데이터는 지역구 코드, 항구 데이터는 측정소 코드
     * @param mapType 지역 데이터는 area, 항구 데이터는 port
     * @param selectTime 조회할 시간
     * @return 24시간 이전 데이터 시간과 수치값 리턴
     */
    @RequestMapping(value = "/{dustType}/{code}/{mapType}/{selectTime}", method = RequestMethod.GET)
    public ResponseDTO getDetailDustInfo(@PathVariable("dustType") String dustType, @PathVariable("code") String code, @PathVariable("mapType") String mapType, @PathVariable("selectTime") String selectTime){

        ResponseDTO message;
        DustDetailVO dustDetail;

        try {
            dustDetail = target02Service.selectDustDetailInfo(dustType, mapType, code, selectTime);
            if(dustDetail != null){
                message = DataResponseDTO.of(dustDetail);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }

    /**
     * 미세먼지 변화 슬라이더 데이터를 리턴하는 메서드
     * @param mapType 지역 데이터는 area, 항구 데이터는 port
     * @param msrmtDt 조회할 날짜
     */
    @RequestMapping(value = "/{mapType}/{sliderTime}", method = RequestMethod.GET)
    public ResponseDTO getSliderDustData(@PathVariable("mapType") String mapType, @PathVariable("sliderTime") String msrmtDt){
        ResponseDTO message;
        Map<String, List<FeaturePropVO>> propList = null;
        try{
            // 날짜를 파라미터로 전달
            propList = target02Service.selectSliderDustInfo(mapType, msrmtDt);
            if(propList != null && propList.size() > 0){
                message = DataResponseDTO.of(propList);
            } else {
                message = DataResponseDTO.of(null);
            }

        } catch (Exception e) { //exception 임시 조치
            log.error("에러 메세지 출력 : "+ e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }

    /*미세먼지 변화값 슬라이더 날짜 목록 불러오기*/
    @RequestMapping(value = "/date/{mapType}", method = RequestMethod.GET)
    public ResponseDTO getDustDateList(@PathVariable("mapType") String mapType){
        ResponseDTO message;
        try {
            List<FeaturePropVO> dustDate = target02Service.selectDustDateList(mapType);
            if (dustDate != null) {
                message = DataResponseDTO.of(dustDate);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }
/*
    @RequestMapping(value = "/galmaet", method = RequestMethod.GET)
    public ResponseDTO getWktGalmaetData(){
        ResponseDTO message;
        List<GalmaetVO> wktDataList = null;
        AdmdstDataVO wktSidoData = null;
        try {
            wktDataList = target02Service.selectWktGmDataList();

            if(wktDataList != null && wktDataList.size()>0){
                message = DataResponseDTO.of(wktDataList);
            }else{
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) { //exception 임시 조치
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }
*/

    @RequestMapping(value = "/galmaet", method = RequestMethod.GET)
    public ResponseDTO getGailmaetgilData() {
        ResponseDTO message;
        List<GalmaetVO> wktDataList = null;
        AdmdstDataVO wktSidoData = null;
        try {
            wktDataList = target02Service.selectWktGmDataList();

            if (wktDataList != null && wktDataList.size() > 0) {
                message = DataResponseDTO.of(wktDataList);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) { //exception 임시 조치
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }



/*
    @RequestMapping(value = "/data/tg2/map/tipoff",method = RequestMethod.GET)
    public ResponseDTO getWktTipOffData(){
        ResponseDTO message;
        List<WKTStructure> wktDataList = null;
        try {
//            wktDataList = target02Service.selectWktTipOffDataList();

            if(wktDataList != null && wktDataList.size()>0){
                message = DataResponseDTO.of(wktDataList);
            }else {
                message = DataResponseDTO.of(null);
            }
        }catch (Exception e) { //exception 임시 조치
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }
*/

    @RequestMapping(value = "/tipoff/{selectTime}", method = RequestMethod.GET)
    public ResponseDTO getTipoffData(@PathVariable("selectTime") String selectTime){
        ResponseDTO message;
        List<WKTStructure> propList = null;
        try{
            propList = target02Service.selectWktTipOffDataList(selectTime);
            if(propList != null && propList.size() > 0){
                message = DataResponseDTO.of(propList);
            } else {
                message = DataResponseDTO.of(null);
            }

        } catch (Exception e) { //exception 임시 조치
            log.error("에러 메세지 출력 : "+ e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }


    @RequestMapping(value = "/forecast", method = RequestMethod.GET)
    public ResponseDTO getForecastData() {
        ResponseDTO message;

        try {
            List<ForecastVO> forecastData = target02Service.selectForecastList();
            if (forecastData != null) {
                message = DataResponseDTO.of(forecastData);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }

    @RequestMapping(value = "/gm/{courseId}/{guganId}/{selectTime}", method = RequestMethod.GET)
    public ResponseDTO getGmDetail(@PathVariable("courseId") int courseId, @PathVariable("guganId") int guganId, @PathVariable("selectTime") String selectTime){
        ResponseDTO message;
        GalmaetVO wktDataList = null;
        try {
            wktDataList = target02Service.selectGalmaetDetail(courseId, guganId, selectTime);

            if(wktDataList != null && wktDataList.getLifePatterns().size() >0){
                message = DataResponseDTO.of(wktDataList);
            }else{
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }


    @RequestMapping(value = "/issue", method = RequestMethod.GET)
    public ResponseDTO getIssueData(){
        ResponseDTO message;
        try{
            Map<String, List<IssueInfoVO>> issueMap = target02Service.selectIssueInfoList();

            if(issueMap != null){
                message = DataResponseDTO.of(issueMap);
            }else{
                message = DataResponseDTO.of(null);
            }

        }catch (Exception e){
            log.error("에러 메세지 출력 : "+ e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }

/*    @RequestMapping(value = "/data/tg2/test/port-ship/{portMsrstnId}/{selectTime}", method = RequestMethod.GET)
    public ResponseDTO getPortShipStats(@PathVariable("portMsrstnId") String portMsrstnId, @PathVariable("selectTime") String selectTime){
        ResponseDTO message;
        try {
            List<PortShipVO> portShipStats = target02Service.selectPortShipStats(portMsrstnId, selectTime);

            if (portShipStats != null) {
                message = DataResponseDTO.of(portShipStats);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) { //exception 임시 조치
            log.error("에러 메세지 출력 : "+ e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }*/
/*    @RequestMapping(value = "/data/tg2/port-ship/{portMsrstnId}/{selectTime}", method = RequestMethod.GET)
    public ResponseDTO getPortShipData(@PathVariable("portMsrstnId") String portMsrstnId, @PathVariable("selectTime") String selectTime){
        ResponseDTO message;
        try {
            PortShipDetaleVO portShipDetaleVO = target02Service.selectPortShipList(portMsrstnId, selectTime);
            if (portShipDetaleVO != null) {
                message = DataResponseDTO.of(portShipDetaleVO);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }*/
/*    @RequestMapping(value = "/data/tg2/port-ship/group/{portMsrstnId}/{selectTime}", method = RequestMethod.GET)
    public ResponseDTO getPortShipMap(@PathVariable("portMsrstnId") String portMsrstnId, @PathVariable("selectTime") String selectTime){
        ResponseDTO message;
        try {
            Map<String, Map<String, List<Object>>> portShipMap = target02Service.selectPortShipMap(portMsrstnId, selectTime);

            if (portShipMap != null) {
                message = DataResponseDTO.of(portShipMap);
            } else {
                message = DataResponseDTO.of(null);
            }
        }catch (Exception e) { //exception 임시 조치
            log.error("에러 메세지 출력 : "+ e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }*/

/*
    @RequestMapping(value = "/data/tg2/port-ship/ratio/{portMsrstnId}/{selectTime}", method = RequestMethod.GET)
    public ResponseDTO getPortShipRatio(@PathVariable("portMsrstnId") String portMsrstnId, @PathVariable("selectTime") String selectTime){
        ResponseDTO message;
        try {
            Map<String, Map<String, List<Object>>> portShipRatio = target02Service.selectPortShipRatio(portMsrstnId, selectTime);

            if (portShipRatio != null) {
                message = DataResponseDTO.of(portShipRatio);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) { //exception 임시 조치
            log.error("에러 메세지 출력 : "+ e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }
*/



    /*윤경 항만 다시 작업*/
    @RequestMapping(value = "/port-info/{dustType}", method = RequestMethod.GET)
    public ResponseDTO getPortInfoData(@PathVariable("dustType") String dustType) {
        ResponseDTO message;

        try {
            Map<String, PortInfoVO> portInfoData = target02Service.selectPortInfoList(dustType);
            if (portInfoData != null && !portInfoData.isEmpty()) {
                message = DataResponseDTO.of(portInfoData);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }

    /**
     * 갈맷길 정보 호출 API
     * @return 결과값에 대한 상태 및 갈맷길 데이터
     */
    @RequestMapping(value = "/galmaetgil-info", method = RequestMethod.GET)
    public ResponseDTO getGalmategetPortInfoData() {
        ResponseDTO message;
//        TimeCheckerUtil timeCheckerUtil = TimeCheckerUtil.getInstance();
        try {
            List<GeoStructure> data = target02Service.selectGalmaetgilInfoList();

            if(data.size()>0){
                message = DataResponseDTO.of(data);
            }else {
                message = DataResponseDTO.of(null);
            }

        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

//        timeCheckerUtil.milliSecondDiffTime();

        return message;
    }

    /**
     * AOD 정보 호출 API
     *
     * @return 결과값에 대한 상태 및 AOD 데이터
     */
    @RequestMapping(value = "/aod-info", method = RequestMethod.GET)
    public ResponseDTO getAodData() {
        ResponseDTO message;
        try {
            List<GeoStructure> data = target02Service.selectRegionAodDataList();

            if(data.size()>0){
                message = DataResponseDTO.of(data);
            }else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }

    @RequestMapping(value = "/port-slider-info/{pmType}/{dateTime}", method = RequestMethod.GET)
    public ResponseDTO getSliderData(@PathVariable("pmType") String pmType, @PathVariable("dateTime") String dateTime){
        ResponseDTO message;
        try {
            List<GeoStructure> data = target02Service.selectPortSliderInfo(dateTime, pmType);

            if(data.size()>0){
                message = DataResponseDTO.of(data);
            }else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }


    /* 메서드 끝 */
}
