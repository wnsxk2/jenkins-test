package kr.go.busan.smartvillage.target01.mapper;

import kr.go.busan.smartvillage.target01.vo.*;
import kr.go.busan.smartvillage.comm.vo.GeoStructure;
import org.apache.ibatis.annotations.Param;
import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface Target01Mapper {
    /* !리빙프로젝트! */

    /**
     * 읍면동 목록 조회 메서드
     *
     * @return 읍면동 리스트
     */
    List<EmdDataVO> selectEmdList();

    /**
     * 리빙프로젝트 데이터 insert 메서드
     *
     * @param lProjectVO 리빙 프로젝트 정보
     * @return 사용자가 입력한 리빙프로젝트 데이터
     */
    LProjectVO insertLProject(LProjectVO lProjectVO);

    /**
     * 리빙 프로젝트 목록 조회 메서드
     *
     * @return 리빙프로젝트 정보 리스트
     */
    List<LProjectVO> selectLProjectList();

    /**
     * 리빙 프로젝트 상세 조회 메서드
     *
     * @param index 리빙프로젝트 번호 (lp_seq)
     * @return index에 맞는 리빙프로젝트 목록, 사용자 데이터
     */
    List<LProjectVO> selectLProjectDetail(@Param("index") int index);

    /**
     * 월별 해양쓰레기 리빙 프로젝트 통계 그래프 데이터 목록 조회 메서드
     *
     * @return 월별 해양쓰레기 수거량 및 정화활동 횟수, 리빙프로젝트 누적회원수,
     *          리빙프로젝트 누적개수 3개의 그래프에 대한 데이터 리스트
     */
    List<LProjectVO> selectLProjectGraph();

    /**
     * 리빙 프로젝트 검색 목록 조회 메서드
     * @param lProjectVO
     * @return 검색 결과를 포함하는 리빙프로젝트 데이터 리스트
     */
    List<LProjectVO> searchLProject(LProjectVO lProjectVO);

    /**
     * 월별 리빙 프로젝트 해양쓰레기 수거량 조회 메서드
     * @param index 리빙프로젝트 번호 (lp_seq)
     * @return index에 맞는 리빙프로젝트 월별 해양쓰레기 수거량 데이터
     */
    List<ActivityVO> selectActivityCount(@Param("index") int index);


    /* !재해쓰레기! */
    List<SatelVO> selectSatelInfoList(Map<String, String> param);
    List<SatelVO> getSatelImage(Map<String, String> param);
    List<WaterLvlVO> selectAvgWlInfo(Map<String, String> param);
    List<SatelVO> selectAvgDebrisInfo(Map<String, String> param);

    /* !부유쓰레기! */
    List<GeoStructure> selectCCTVInfoList();

    List<GeoStructure> selectCCTVFileList(Map<String, String> param);
    List<CCTVInfoVO> selectCCTVChartDataList(Map<String, String> param);
}
