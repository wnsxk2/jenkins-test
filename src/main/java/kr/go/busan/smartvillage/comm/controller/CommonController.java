package kr.go.busan.smartvillage.comm.controller;

import kr.co.greenblue.geometry.model.WKTStructure;
import kr.co.greenblue.http.code.ResponseStatusEnum;
import kr.co.greenblue.http.dto.DataResponseDTO;
import kr.co.greenblue.http.dto.ErrorResponseDTO;
import kr.co.greenblue.http.dto.ResponseDTO;
import kr.go.busan.smartvillage.comm.code.RegionNameCode;
import kr.go.busan.smartvillage.comm.service.CommonService;
import kr.go.busan.smartvillage.comm.vo.AdmdstDataVO;
import kr.go.busan.smartvillage.main.vo.JobVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Target 서비스에서 공통 데이터 전달용 컨트롤러
 * 데이터 송/수신 결과는 ResponseDto 클래스를 사용함
 */
@RestController
@RequiredArgsConstructor
@Slf4j
public class CommonController {
    /* 필드 */
    private final CommonService commonService;
    /* 필드 끝 */

    /**
     * Geometry 형식이 wkt 타입의 busan 데이터 전달
     * @return ResponseDto 결과값 전달
     */
    @RequestMapping(value = "/data/wkt/{region}/sgg", method = RequestMethod.GET)
    public ResponseDTO getWktData(@PathVariable("region") String region){
        ResponseDTO message;
        RegionNameCode nameCode = null;
        List<WKTStructure> wktSggDataList = null;
        AdmdstDataVO wktSidoData = null;
        try {
            //region 값을 기준으로 code 호출
            nameCode = RegionNameCode.getRegionNameCode(region);

            wktSggDataList = commonService.selectWktSggDataList(nameCode);

            if(RegionNameCode.getRegionNameCode(region) != null){//이거 변수 대입 수정!!!

                if(wktSggDataList != null && wktSggDataList.size()>0){
                    message = DataResponseDTO.of(wktSggDataList);
                }else{
                    if(wktSidoData != null){
                        message = DataResponseDTO.of(wktSidoData);
                    }else{
                        message = DataResponseDTO.of(null);
                    }

                }

            } else {
                //지역명 없으면 에러로 넘겨야 함
                throw new RuntimeException("Region Name has not supported");
            }

        } catch (Exception e) { //exception 임시 조치
            log.error("에러 메세지 출력 : "+ e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }
        return message;
    }


    /*타겟1 리빙프로젝트 부산시 지역구 리스트 표출*/
    @RequestMapping(value = "/data/sgg-list", method = RequestMethod.GET)
    public ResponseDTO getSggList() {
        ResponseDTO message;

        try {
            List<AdmdstDataVO> sggList = commonService.selectSggList();
            if (sggList != null && !sggList.isEmpty()) {
                message = DataResponseDTO.of(sggList);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }


}
