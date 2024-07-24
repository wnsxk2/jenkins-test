package kr.go.busan.smartvillage.main.mapper;

import kr.go.busan.smartvillage.main.vo.FileVO;
import kr.go.busan.smartvillage.main.vo.JobVO;
import org.apache.ibatis.annotations.Param;
import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;
@Mapper
public interface MainMapper {

    List<JobVO> selectJobList();
    String insertFile(FileVO fileVO);

    int selectFileGroupNum();

    List<FileVO> selectFileList();

    void deleteUploadFile(@Param("uldFileGroupNum") int uldFileGroupNum, @Param("uldFileNum") int uldFileNum);
    void updateUploadFile(FileVO fileVO);

    FileVO selectEditFile(FileVO fileVO);

    List<FileVO> selectDateFileList(@Param("startDate") String startDate, @Param("endDate") String endDate);

}
