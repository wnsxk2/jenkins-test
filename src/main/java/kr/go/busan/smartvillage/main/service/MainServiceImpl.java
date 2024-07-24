package kr.go.busan.smartvillage.main.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.greenblue.comm.util.FileUtils;
import kr.go.busan.smartvillage.main.mapper.MainMapper;
import kr.go.busan.smartvillage.main.vo.FileVO;
import kr.go.busan.smartvillage.main.vo.JobVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service("MainService")
@RequiredArgsConstructor
@Log4j
public class MainServiceImpl implements MainService {

    private final MainMapper mainMapper;
    @Value("${smartvillage.api.url}")
    private String apiUrl;

    /*파일 저장경로*/
    @Value("${file.dir}")
    private String fileDir;

    /*제공 정보 목록 불러오기*/
    @Override
    public List<JobVO> selectJobList() {
        return mainMapper.selectJobList();
    }

    /*파일업로드 (테이블에 저장)*/
    @Override
    public String insertFile(FileVO fileVO) {
        return mainMapper.insertFile(fileVO);
    }

    /*파일 저장*/
    @Override
    public String fileUpload(MultipartHttpServletRequest request) {
       List<MultipartFile> uploadFiles = request.getFiles("file"); //form에서 보낸 파일 가져오기
        LocalDateTime now = LocalDateTime.now();
        String dataPvsnDt = now.format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm"));
        String dirDate = now.format(DateTimeFormatter.ofPattern("YYMMdd"));

       if(!uploadFiles.isEmpty()){
           String userId = "1"; //로그인 기능 만들어지면 바꿔야함
           Integer lastGroupNum = mainMapper.selectFileGroupNum();
           int currentGroupNum = (lastGroupNum == 0) ? 1 : lastGroupNum + 1;
           int fileNum = 1;

           List<FileVO> fileVOList = new ArrayList<>();

           for (int i=0; i < uploadFiles.size(); i++){
               try {
                   MultipartFile file = uploadFiles.get(i);
                   String fileName = file.getOriginalFilename();
                   long fileSize = file.getSize();
                   String jobId = request.getParameter("jobId");

                   UUID uuid = UUID.randomUUID();
                   String strgFileName = uuid.toString()+ "_" +fileName;

                   /*파일 저장 경로*/
                   String filePath = fileDir + File.separator + jobId;
                   FileUtils.makeFolder(filePath);
                   String savePath = filePath + File.separator + dirDate;
                   FileUtils.makeFolder(savePath);
                   File dest = new File(savePath, strgFileName);
                   file.transferTo(dest); //저장
                   /*파일 저장 경로 끝*/


                   FileVO fileVO = new FileVO();
                   fileVO.setUserId(userId);
                   fileVO.setJobId(jobId);
                   fileVO.setUldFileGroupNum(currentGroupNum);
                   fileVO.setUldFileNum(fileNum++);
                   fileVO.setOrgnFileNm(fileName);
                   fileVO.setOrgnFileSize(fileSize);
                   fileVO.setFilePath(savePath);
                   fileVO.setStrgFileNm(strgFileName);
                   fileVO.setDataPvsnDt(dataPvsnDt);
                   fileVO.setUpdateVersion(1.0);
                   //fileVO.setUpdateDt();
                   fileVO.setIsDelete(false);
                   //fileVO.setDeleteDt();
                   insertFile(fileVO);

                   fileVOList.add(fileVO);

               } catch (IOException e) {
                   e.printStackTrace();
                   return "File upload failed: " + e.getMessage();
               }
           }
           /**/
           // JSON 변환 및 전송
           try {
               ObjectMapper objectMapper = new ObjectMapper();
               String fileVOJson = objectMapper.writeValueAsString(fileVOList);

               String fileApiUrl = apiUrl;
               URL url = new URL(fileApiUrl);
               HttpURLConnection conn = (HttpURLConnection) url.openConnection();
               conn.setRequestMethod("POST");
               conn.setRequestProperty("Content-Type", "application/json; utf-8");
               conn.setRequestProperty("Accept", "application/json");
               conn.setDoOutput(true);

               try (OutputStream os = conn.getOutputStream()) {
                   byte[] input = fileVOJson.getBytes("utf-8");
                   os.write(input, 0, input.length);
               }

               int responseCode = conn.getResponseCode();
               if (responseCode == HttpURLConnection.HTTP_OK) {
                   log.info("API 호출 성공: " + responseCode);
               } else {
                   log.error("API 호출 실패: " + responseCode);
               }
               conn.disconnect();
           } catch (Exception e) {
               e.printStackTrace();
               return "File upload successful, but API call failed: " + e.getMessage();
           }
           /**/
           return "File upload successful";
       } else {
           return "No files to upload";
       }
    }



    /*데이터 업로드 이력 게시판에 목록 불러오기*/
    @Override
    public List<FileVO> selectFileList() {
        return mainMapper.selectFileList();
    }

    /*파일 삭제*/
    @Override
    public void deleteUploadFile(int uldFileGroupNum, int uldFileNum) {
        mainMapper.deleteUploadFile(uldFileGroupNum, uldFileNum);
    }

    /*파일수정*/
    @Override
    public void updateUploadFile(FileVO fileVO) {
        mainMapper.updateUploadFile(fileVO);
    }

    @Override
    public String fileUpdate(MultipartHttpServletRequest request) {
        MultipartFile updateFile = request.getFile("file"); //form에서 보낸 파일 가져오기
        int uldFileGroupNum = Integer.parseInt(request.getParameter("uldFileGroupNum"));
        int uldFileNum = Integer.parseInt(request.getParameter("uldFileNum"));
        LocalDateTime now = LocalDateTime.now();
        String updateDt = now.format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm"));
        String dirDate = now.format(DateTimeFormatter.ofPattern("YYMMdd"));

        if(!updateFile.isEmpty()){//** 로그인 기능 구현후 아이디 검증 필요 //**jobId도 검증 필요

                try {
                    FileVO fileVO = new FileVO();
                    fileVO.setUldFileGroupNum(uldFileGroupNum);
                    fileVO.setUldFileNum(uldFileNum);
                    FileVO selectVO = mainMapper.selectEditFile(fileVO);



                    String fileName = updateFile.getOriginalFilename();
                    long fileSize = updateFile.getSize();
                    String jobId = selectVO.getJobId();
                    double updatedVersion = selectVO.getUpdateVersion();
                    double updateVersion = updatedVersion + 0.1;
                    UUID uuid = UUID.randomUUID();
                    String strgFileName = uuid.toString()+ "_" +fileName;

                    /*파일 저장 경로*/
                    String filePath = fileDir + File.separator + jobId;
                    FileUtils.makeFolder(filePath);
                    String savePath = filePath + File.separator + dirDate;
                    FileUtils.makeFolder(savePath);
                    File dest = new File(savePath, strgFileName);
                    updateFile.transferTo(dest); //저장
                    /*파일 저장 경로 끝*/


                //    FileVO fileVO = new FileVO();
                    fileVO.setOrgnFileNm(fileName);
                    fileVO.setOrgnFileSize(fileSize);
                    fileVO.setFilePath(savePath);
                    fileVO.setStrgFileNm(strgFileName);
                    fileVO.setUpdateVersion(updateVersion);
                   // fileVO.setUpdateDt(updateDt);
                    fileVO.setUldFileGroupNum(uldFileGroupNum);
                    fileVO.setUldFileNum(uldFileNum);

                    updateUploadFile(fileVO);

                    /**/
                    // JSON 변환 및 전송
                    ObjectMapper objectMapper = new ObjectMapper();
                    String fileVOJson = objectMapper.writeValueAsString(fileVO);

                    String fileApiUrl = apiUrl;
                    URL url = new URL(fileApiUrl);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("POST");
                    conn.setRequestProperty("Content-Type", "application/json; utf-8");
                    conn.setRequestProperty("Accept", "application/json");
                    conn.setDoOutput(true);

                    try (OutputStream os = conn.getOutputStream()) {
                        byte[] input = fileVOJson.getBytes("utf-8");
                        os.write(input, 0, input.length);
                    }

                    int responseCode = conn.getResponseCode();
                    if (responseCode == HttpURLConnection.HTTP_OK) {
                        log.info("API 호출 성공: " + responseCode);
                    } else {
                        log.error("API 호출 실패: " + responseCode);
                    }
                    conn.disconnect();
                    /**/


                } catch (IOException e) {
                    e.printStackTrace();
                    return "File upload failed: " + e.getMessage();
                }
         


            return "File upload successful";
        } else {
            return "No files to upload";
        }
    }

    @Override
    public List<FileVO> selectDateFileList(String startDate, String endDate) {
        return mainMapper.selectDateFileList(startDate, endDate);
    }


}
