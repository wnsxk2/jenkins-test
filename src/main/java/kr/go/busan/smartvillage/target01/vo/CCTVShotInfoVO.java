package kr.go.busan.smartvillage.target01.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.co.greenblue.comm.util.DateTimeUtil;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CCTVShotInfoVO {

    /* DB */
    private String date;
    private String month;
    private String fileType;
    private String filePath;
    private double floatDebrisArea;
    private double floatDebrisWeight;
    private double floatDebrisVolume;

    /* return */
    private String recordTime;
    private boolean active;
    private String videoPath;
    private String thumbnailPath;

    public CCTVShotInfoVO(String date, CCTVShotInfoVO cctvShot01, CCTVShotInfoVO cctvShot02) {
        if(cctvShot01.getFileType().equals("vdo")){
            this.videoPath = cctvShot01.getFilePath();
        }
        if(cctvShot01.getFileType().equals("thumb")) {
            this.thumbnailPath = cctvShot01.getFilePath();
        }
        if(cctvShot02.getFileType().equals("vdo")){
            this.videoPath = cctvShot02.getFilePath();
        }
        if(cctvShot02.getFileType().equals("thumb")) {
            this.thumbnailPath = cctvShot02.getFilePath();
        }
        // 포맷 변경
        this.recordTime = DateTimeUtil.getInstance().parseDateFormat(date, "yyyy-MM-dd HH:mm:ss", "yyyy년 MM월 dd일 HH:mm");
        this.active = true;
    }

    public String getKey() {

        return null;
    }
}
