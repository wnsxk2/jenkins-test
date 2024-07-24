package kr.go.busan.smartvillage.target01.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ActivityVO {
    private int clctSeq;
    private String clctTitle;
    private String clctRegDate;
    private String clctClassification;
    private String clctPositionGeom;
    private String clctTrashClassification;
    private float clctVolume ;
    private String pureContent;
    private String clctImgPath; //커버 사진 저장 경로
    private String clctOrgnFileNm;
    private String clctStrgFileNm;


    //해양쓰레기 수거량 및 정화활동 횟수
    private String ratioMonth;
    private int clctCount;
    private float clctVolumeSum;


}
