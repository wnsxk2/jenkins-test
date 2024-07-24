package kr.go.busan.smartvillage.main.service;

import kr.go.busan.smartvillage.main.vo.FileVO;
import kr.go.busan.smartvillage.main.vo.JobVO;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

public interface MainService {
     List<JobVO> selectJobList();

     String insertFile(FileVO fileVO);
     String fileUpload(MultipartHttpServletRequest request);
     List<FileVO> selectFileList();

     void deleteUploadFile(int uldFileGroupNum, int uldFileNum);
     void updateUploadFile(FileVO fileVO);
     String fileUpdate(MultipartHttpServletRequest request);
     List<FileVO> selectDateFileList(String startDate, String endDate);
}
