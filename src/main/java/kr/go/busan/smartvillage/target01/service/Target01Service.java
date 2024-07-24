package kr.go.busan.smartvillage.target01.service;
import kr.go.busan.smartvillage.target01.vo.*;
import kr.go.busan.smartvillage.comm.vo.GeoStructure;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface Target01Service {
    /* !리빙프로젝트! */
    List<EmdDataVO> selectEmdList();
    LProjectVO insertLProject(LProjectVO lProjectVO);
    String lProjectFileUpload(MultipartHttpServletRequest request, LProjectVO lProjectVO) throws IOException;
    Map<String, List<LProjectVO>> selectLProjectList();
    List<LProjectVO> selectLProjectDetail(int index);
    List<ActivityVO> selectActivityCount(int index);
    List<LProjectVO> searchLProject(HttpServletRequest request, LProjectVO lProjectVO);
    List<LProjectVO> selectLProjectGraph();

    /* !재해쓰레기! */
    List<SatelVO> selectSatelInfoList(Map<String, String> param);
    List<SatelVO> getSatelImage(Map<String, String> param);
    List<WaterLvlVO> selectAvgWlInfo(Map<String, String> param);
    List<SatelVO> selectAvgDebrisInfo(Map<String, String> param);

    /* !부유쓰레기! */
    List<GeoStructure> selectCCTVInfoList(String cctvId, String startDate, String endDate);
}
