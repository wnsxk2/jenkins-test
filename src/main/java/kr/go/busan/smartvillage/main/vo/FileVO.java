package kr.go.busan.smartvillage.main.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileVO {
    private String userId;
    private String jobId;
    private int uldFileGroupNum;
    private int uldFileNum;
    private String orgnFileNm;
    private long orgnFileSize;
    private String filePath;
    private String strgFileNm;
    private String dataPvsnDt;
    private String loadDate;

    private double updateVersion; //1.0
    private String updateDt;
    private Boolean isDelete;  //false
    private String deleteDt;


    private String jobNm;
    private String nickNm;

}
