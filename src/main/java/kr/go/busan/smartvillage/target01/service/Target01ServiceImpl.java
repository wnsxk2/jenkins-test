package kr.go.busan.smartvillage.target01.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.greenblue.comm.util.FileUtils;
import kr.go.busan.smartvillage.comm.vo.GeoStructure;
import kr.go.busan.smartvillage.target01.mapper.Target01Mapper;
import kr.go.busan.smartvillage.target01.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class Target01ServiceImpl implements Target01Service{
    /* 필드 */
    private final Target01Mapper target01Mapper;

    /*커버 이미지 저장경로*/
    @Value("${lproject.cover.dir}")
    private String coverImgDir;

    /* 필드 끝 */




    /* !리빙프로젝트! */

    /**
     * 읍면동 리스트 조회 메서드
     * @return 읍면동 리스트
     */
    @Override
    public List<EmdDataVO> selectEmdList() {
        return target01Mapper.selectEmdList();
    }

    /**
     * 리빙프로젝트 데이터 insert 메서드
     * @param lProjectVO 리빙 프로젝트 정보
     * @return 사용자가 입력한 리빙프로젝트 데이터
     */
    @Override
    public LProjectVO insertLProject(LProjectVO lProjectVO) {
        return target01Mapper.insertLProject(lProjectVO);
    }

    /**
     * 리빙 프로젝트 파일 및 데이터 저장 메서드
     * @param request
     * @param lProjectVO 리빙 프로젝트 정보
     * @return 리빙프로젝트 파일 업로드 + 정보 데이터
     */
    @Override
    public String lProjectFileUpload(MultipartHttpServletRequest request, LProjectVO lProjectVO) throws IOException {
        MultipartFile uploadCoverImg = request.getFile("file");
        LocalDateTime now = LocalDateTime.now();
        String nowDate = now.format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm"));
        String dirDate = now.format(DateTimeFormatter.ofPattern("YYMMdd"));
        String userId = "1"; // 로그인 기능 만들어지면 바꿔야함

        if (uploadCoverImg != null && !uploadCoverImg.isEmpty()) {
            String fileName = uploadCoverImg.getOriginalFilename();
            UUID uuid = UUID.randomUUID();
            String strgFileName = uuid.toString() + "_" + fileName;

            // 파일 저장 경로 설정 및 파일 저장
            String savePath = coverImgDir + File.separator + dirDate;
            FileUtils.makeFolder(savePath);
            File dest = new File(savePath, strgFileName);
            uploadCoverImg.transferTo(dest);
            String dbSavePath = "/livingPath" + File.separator + dirDate + File.separator;

            lProjectVO.setThumbPath(dbSavePath);
            lProjectVO.setOrgnFileNm(fileName);
            lProjectVO.setStrgFileNm(strgFileName);
        }

        // 공통된 설정
        setLProjectCommonFields(lProjectVO, userId, nowDate);

        insertLProject(lProjectVO);
        return null;
    }

    /**
     * 리빙 프로젝트 공통 조건 메서드
     * @param lProjectVO
     * @param userId 사용자
     * @param nowDate 오늘 날짜
     */
    private void setLProjectCommonFields(LProjectVO lProjectVO, String userId, String nowDate) {
        if (lProjectVO.getEndDate().equals("")) {
            lProjectVO.setEndDate(null);
        }
        if (lProjectVO.getRelateLink().equals("")) {
            lProjectVO.setRelateLink(null);
        }

        lProjectVO.setMbrNum(1); // 회원순차번호: 1 = 리빙프로젝트 최초 생성자
        lProjectVO.setAvataId(userId);
        lProjectVO.setReceiptDate(nowDate);
        lProjectVO.setApprovalYN("Y");
    }


    /**
     * 리빙프로젝트 목록 조회
     * @return sixMonth 6개월, all 전체날짜 리빙푸로젝트 목록 리스트 반환
     */
   @Override
    public Map<String, List<LProjectVO>> selectLProjectList() {
        List<LProjectVO> lpList = target01Mapper.selectLProjectList();
        Map<String, List<LProjectVO>> lpMap = new HashMap<>();
       SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
       Date currentDate = new Date();
       Calendar cal = Calendar.getInstance();
       cal.setTime(currentDate);
       cal.add(Calendar.MONTH, -6);
       Date sixMonthsAgo = cal.getTime();

       List<LProjectVO> sixMonthProjects = lpList.stream()
               .filter(lp -> {
                   try {
                       Date createDate = sdf.parse(lp.getCreateDt());
                       return createDate.after(sixMonthsAgo);
                   } catch (Exception e) {
                       e.printStackTrace();
                       return false;
                   }
               })
               .collect(Collectors.toList());

       List<LProjectVO> allProjects = lpList;

       lpMap.put("sixMonth", sixMonthProjects);
       lpMap.put("all", allProjects);

        return lpMap;
    }

    /**
     * 리빙프로젝트 상세 조회 메서드
     * @param index 리빙프로젝트 번호 (lp_seq)
     * @return index에 해당하는 리빙프로젝트 상세정보 리스트 반환
     */
    @Override
    public List<LProjectVO> selectLProjectDetail(int index) {
        List<LProjectVO> projectList = target01Mapper.selectLProjectDetail(index);

        for (LProjectVO project : projectList) {
            if (project.getOpenYN().equals("Y")) {
                project.setOpenYN("즉시 가입");
            } else {
                project.setOpenYN("관리자 승인 후 가입");
            }
        }
        return projectList;
    }

    /**
     * 월별 리빙 프로젝트 해양쓰레기 수거량 조회 메서드
     * @param index 리빙프로젝트 번호 (lp_seq)
     * @return index에 맞는 리빙프로젝트 월별 해양쓰레기 수거량 리스트 반환
     */
    @Override
    public List<ActivityVO> selectActivityCount(int index) {
        return target01Mapper.selectActivityCount(index);
    }

    /**
     * 리빙 프로젝트 검색 목록 조회 메서드
     * @param request
     * @param lProjectVO 검색 조건을 포함하는 리빙프로젝트 데이터
     * @return 검색 결과를 포함하는 리빙프로젝트 데이터 리턴
     */
    @Override
    public List<LProjectVO> searchLProject(HttpServletRequest request, LProjectVO lProjectVO) {
        String sggIdParams = request.getParameter("sggIdList");
        if (sggIdParams != null && !sggIdParams.isEmpty()) {

            try {
                ObjectMapper objectMapper = new ObjectMapper();
                String[] sggIdArray = objectMapper.readValue(sggIdParams, String[].class);

                List<String> sggIdList = Arrays.asList(sggIdArray);
                lProjectVO.setSggIdList(sggIdList);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        String lPStatusParam = request.getParameter("lPStatus");
        if(lPStatusParam !=null && !lPStatusParam.isEmpty()){

            LocalDateTime now = LocalDateTime.now();
            String currentDate = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            lProjectVO.setCurrentDt(currentDate);
            lProjectVO.setLPStatus(lPStatusParam);
        }

        return target01Mapper.searchLProject(lProjectVO);
    }


    /**
     * 해양 쓰레기 리빙프로젝트 통계 그래프 데이터 리턴 메서드
     *
     * @return  3개의 그래프에 대한 데이터 리턴
     */
    @Override
    public List<LProjectVO> selectLProjectGraph() {
        return target01Mapper.selectLProjectGraph();
    }
    /* !리빙프로젝트 끝*/

    /* !재해쓰레기! */
    @Override
    public List<SatelVO> selectSatelInfoList(Map<String, String> param) {
        return target01Mapper.selectSatelInfoList(param);
    }
    @Override
    public List<SatelVO> getSatelImage(Map<String, String> param) {
        return target01Mapper.getSatelImage(param);
    }
    @Override
    public List<WaterLvlVO> selectAvgWlInfo(Map<String, String> param) {
        return target01Mapper.selectAvgWlInfo(param);
    }
    @Override
    public List<SatelVO> selectAvgDebrisInfo(Map<String, String> param) {
        return target01Mapper.selectAvgDebrisInfo(param);
    }

    /* !부유쓰레기! */

    /**
     * cctv 데이터 요청 메서드
     * @param cctvId cctv 아이디 모든 데이터 조회 시 'all'
     * @param startDate 조회 시작 날짜
     * @param endDate 조회 종료 날짜
     * @return cctv Geom, 속성 데이터
     */
    @Override
    public List<GeoStructure> selectCCTVInfoList(String cctvId, String startDate, String endDate) {
        //VO 구현 시 변경 예정
        Map<String, String> param = new HashMap<>();
        try {
            // YearMonth를 사용하여 연도와 월만 파싱
            YearMonth startMonth = YearMonth.parse(startDate, DateTimeFormatter.ofPattern("yyyy-MM"));
            LocalDate firstDate = startMonth.atDay(1);

            YearMonth endMonth = YearMonth.parse(endDate, DateTimeFormatter.ofPattern("yyyy-MM"));
            LocalDate lastDate = endMonth.atEndOfMonth();

            param.put("cctvId", cctvId);
            param.put("startDate", firstDate.toString());
            param.put("endDate", lastDate.toString());
            List<GeoStructure> cctvInfoList = target01Mapper.selectCCTVFileList(param);
            List<CCTVInfoVO> cctvInfoVO = target01Mapper.selectCCTVChartDataList(param);
            for(int i = 0; i < cctvInfoList.size(); i++){
                GeoStructure geoStructure = cctvInfoList.get(i);
                CCTVInfoVO properties = (CCTVInfoVO) geoStructure.getProperties();
                properties.setChartData(cctvInfoVO.get(i));
            }
            if (cctvInfoList.size() > 0) {
                return cctvInfoList;
            } else {
                throw new Exception("Data size is 0");
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
