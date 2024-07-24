package kr.go.busan.smartvillage.main.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.greenblue.http.code.ResponseStatusEnum;
import kr.co.greenblue.http.dto.DataResponseDTO;
import kr.co.greenblue.http.dto.ErrorResponseDTO;
import kr.co.greenblue.http.dto.ResponseDTO;
import kr.go.busan.smartvillage.main.service.MainService;
import kr.go.busan.smartvillage.main.vo.FileVO;
import kr.go.busan.smartvillage.main.vo.JobVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.log4j.Log4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;


@RestController
@RequiredArgsConstructor
@Log4j
public class MainController {

    /* 필드 */
    private final MainService mainService;


    @Value("${smartvillage.api.url}")
    private String apiUrl;


    /* 필드 끝 */

    /* 메서드 */

    /*job 리스트 목록 가져오는 함수*/
    @RequestMapping(value = "/data/main/job-data", method = RequestMethod.GET)
    public ResponseDTO getJobData() {
        ResponseDTO message;

        try {
            List<JobVO> jobData = mainService.selectJobList();
            if (jobData != null && !jobData.isEmpty()) {
                message = DataResponseDTO.of(jobData);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }



   /*파일 업로드 함수*/
    @PostMapping("/file-upload")
    public ResponseDTO fileUpload(MultipartHttpServletRequest request) {
       ResponseDTO message;

        try {
            String fileData = mainService.fileUpload(request);
            if (fileData != null && !fileData.isEmpty()) {
                message = DataResponseDTO.of(fileData);
            } else {
                message = DataResponseDTO.of(null);
            }
       /*     String fileApiUrl = apiUrl;
            URL url = new URL(fileApiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; utf-8");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);

            int responseCode = conn.getResponseCode();
            if(responseCode == HttpURLConnection.HTTP_OK) {
                // 성공적인 응답 처리
                log.info("API 호출 성공: " + responseCode);
            } else {
                // 실패한 응답 처리
                log.error("API 호출 실패: " + responseCode);
            }
            conn.disconnect();*/
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;

    }



    @RequestMapping(value = "/data/file/board", method = RequestMethod.GET)
    public ResponseDTO getFileList() {
        ResponseDTO message;

        try {
            List<FileVO> fileList = mainService.selectFileList();
            if (fileList != null && !fileList.isEmpty()) {
                message = DataResponseDTO.of(fileList);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }


    /*파일 삭제*/
    @RequestMapping(value = "/main/file/{uldFileGroupNum}/{uldFileNum}", method = RequestMethod.DELETE)
    public void deleteUploadFile(@PathVariable("uldFileGroupNum") int uldFileGroupNum, @PathVariable("uldFileNum") int uldFileNum) {
        mainService.deleteUploadFile(uldFileGroupNum, uldFileNum);
    }

    /*파일 수정*/
    @PostMapping("/main/file/update")
    public ResponseDTO fileUpdate(MultipartHttpServletRequest request) {
        ResponseDTO message;

        try {
            String fileData = mainService.fileUpdate(request);
            if (fileData != null && !fileData.isEmpty()) {
                message = DataResponseDTO.of(fileData);
            } else {
                message = DataResponseDTO.of(null);
            }

          /*  String fileApiUrl = apiUrl;
            URL url = new URL(fileApiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; utf-8");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);

            int responseCode = conn.getResponseCode();
            if(responseCode == HttpURLConnection.HTTP_OK) {
                // 성공적인 응답 처리
                log.info("API 호출 성공: " + responseCode);
            } else {
                // 실패한 응답 처리
                log.error("API 호출 실패: " + responseCode);
            }
            conn.disconnect();*/

        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;

    }

    @RequestMapping(value = "/data/file/board/{startDate}/{endDate}", method = RequestMethod.GET)
    public ResponseDTO getFileDateList(@PathVariable("startDate") String startDate, @PathVariable("endDate") String endDate) {
        ResponseDTO message;

        try {
            List<FileVO> fileDateList = mainService.selectDateFileList(startDate, endDate);
            if (fileDateList != null && !fileDateList.isEmpty()) {
                message = DataResponseDTO.of(fileDateList);
            } else {
                message = DataResponseDTO.of(null);
            }
        } catch (Exception e) {
            log.error("에러 메세지 출력: " + e.getMessage());
            message = ErrorResponseDTO.of(ResponseStatusEnum.NOT_FOUND, e);
        }

        return message;
    }
    /* 메서드 끝*/
}
