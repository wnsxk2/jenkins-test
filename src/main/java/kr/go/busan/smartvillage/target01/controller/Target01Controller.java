package kr.go.busan.smartvillage.target01.controller;

import kr.co.greenblue.http.code.ResponseStatusEnum;
import kr.co.greenblue.http.dto.DataResponseDTO;
import kr.co.greenblue.http.dto.ErrorResponseDTO;
import kr.co.greenblue.http.dto.ResponseDTO;
import kr.go.busan.smartvillage.comm.vo.GeoStructure;
import kr.go.busan.smartvillage.target01.service.Target01Service;
import kr.go.busan.smartvillage.target01.vo.EmdDataVO;
import kr.go.busan.smartvillage.target01.vo.LProjectVO;
import kr.go.busan.smartvillage.target01.vo.SatelVO;
import kr.go.busan.smartvillage.target01.vo.WaterLvlVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Target1의 데이터 전달용 컨트롤러
 * 데이터 송/수신 결과는 ResponseDto 클래스를 사용함
 */
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("data/marine-debris")
public class Target01Controller {
    /* 필드 */
    private final Target01Service target01Service;
    /* 필드 끝 */

    /* 메서드 */

    /* !리빙프로젝트! */

    /**
     * 읍면동 목록 불러오는 메서드
     *
     * @return 읍면동 목록 데이터 리턴
     */
    //**여기** 시군구랑 합쳐서 한번에 표출해야함
    @RequestMapping(value = "/emd-list", method = RequestMethod.GET)
    public ResponseDTO getEmdList() {
        ResponseDTO message;

        try {
            List<EmdDataVO> emdList = target01Service.selectEmdList();
            if (emdList != null && !emdList.isEmpty()) {
                message = DataResponseDTO.of(emdList);
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
     * 리빙프로젝트 생성 및 파일 업로드 메서드
     *
     * @param request     업로드할 파일을 포함하는 멀티파트 HTTP 요청
     * @param lProjectVO  리빙 프로젝트 정보
     * @return 리빙프로젝트 파일 업로드 + 정보 데이터
     */
    @PostMapping("/living-project")
    public ResponseDTO lProjectFileUpload(MultipartHttpServletRequest request, LProjectVO lProjectVO) {
        ResponseDTO message;

        try {
            String lProjectData = target01Service.lProjectFileUpload(request, lProjectVO);
            if (lProjectData != null && !lProjectData.isEmpty()) {
                message = DataResponseDTO.of(lProjectData);
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
     *리빙프로젝트 목록 리턴 메서드
     *
     * @return 리빙프로젝트 목록 데이터 리턴
     */
    @RequestMapping(value = "/living-project-info", method = RequestMethod.GET)
    public ResponseDTO getLProjectList() {
        ResponseDTO message;

        try {
            Map<String, List<LProjectVO>> lProjectData = target01Service.selectLProjectList();
            if (lProjectData != null && !lProjectData.isEmpty()) {
                message = DataResponseDTO.of(lProjectData);
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
     * 해양 쓰레기 리빙프로젝트 통계 그래프 데이터 리턴 메서드
     *
     * @return 3개의 그래프에 대한 데이터 리턴
     */
    @RequestMapping(value = "/living-project-graph-info", method = RequestMethod.GET)
    public ResponseDTO getLProjectGraphData() {
        ResponseDTO message;

        try {
            List<LProjectVO> data = target01Service.selectLProjectGraph();
            if (data != null && !data.isEmpty()) {
                message = DataResponseDTO.of(data);
            } else {
                message = DataResponseDTO.of(null);
            }

        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;

    }

    //검색

    /**
     * 리빙 프로젝트 검색 결과 리턴 메서드
     * @param request HTTP 요청
     * @param lProjectVO 검색 조건을 포함하는 리빙프로젝트 데이터
     * @return 검색 결과를 포함하는 리빙프로젝트 데이터 리턴
     */
    @RequestMapping(value = "/living-project-search", method = RequestMethod.GET)
    public ResponseDTO searchLProject(HttpServletRequest request, LProjectVO lProjectVO) {
        ResponseDTO message;

        try {
            List<LProjectVO> data = target01Service.searchLProject(request, lProjectVO);
            if (data != null && !data.isEmpty()) {
                message = DataResponseDTO.of(data);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }

    /* !재해쓰레기! */
    @RequestMapping(value = "/satel-info", method = RequestMethod.GET)
    public ResponseDTO getSatelInfoList(@RequestParam String startDate, @RequestParam String endDate) {
        ResponseDTO message;

        Map<String, String> param = new HashMap<>();

        try {
            param.put("startDate", startDate);
            param.put("endDate", endDate);

            List<SatelVO> data = target01Service.selectSatelInfoList(param);
            if (data != null && !data.isEmpty()) {
                message = DataResponseDTO.of(data);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }

    @RequestMapping(value = "/satel-image", method = RequestMethod.GET)
    public ResponseDTO getSatelImage(@RequestParam String startDate, @RequestParam String endDate) {
        ResponseDTO message;

        Map<String, String> param = new HashMap<>();

        try {
            param.put("startDate", startDate);
            param.put("endDate", endDate);

            List<SatelVO> data = target01Service.getSatelImage(param);
            if (data != null && !data.isEmpty()) {
                message = DataResponseDTO.of(data);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }

    @RequestMapping(value = "/wl-debris-info", method = RequestMethod.GET)
    public ResponseDTO getAvgDebrisInfo(@RequestParam String startDate, @RequestParam String endDate) {
        ResponseDTO message;

        Map<String, String> param = new HashMap<>();

        try {
            param.put("startDate", startDate);
            param.put("endDate", endDate);

            List<WaterLvlVO> wlData = target01Service.selectAvgWlInfo(param);
            List<SatelVO> debrisData = target01Service.selectAvgDebrisInfo(param);

            //두 서비스 결합
            Map<String, Object> data = new HashMap<>();
            data.put("wlData", wlData);
            data.put("debrisData", debrisData);

            if (data != null && !data.isEmpty()) {
                message = DataResponseDTO.of(data);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }

    /* !부유쓰레기! */
    @RequestMapping(value = "/cctv", method = RequestMethod.GET)
    public ResponseDTO getCCTVData(@RequestParam("cctvId") String cctvId, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
        ResponseDTO message;
        try {
            //VO 구현 시 변경 예정
            List<GeoStructure> data = target01Service.selectCCTVInfoList(cctvId, startDate, endDate);
            if (data != null && !data.isEmpty()) {
                message = DataResponseDTO.of(data);
            } else {
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