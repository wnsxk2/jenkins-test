package kr.go.busan.smartvillage.target01.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LProjectVO {
    private int lpSeq;
    private String sggId;
    private String emdId;
    private String lpNm;
    private String beginDate;
    private String endDate;
    private String relateLink;
    private String  openYN;
    private String lpContent;
    private String thumbPath; //커버 사진 저장 경로

    private String orgnFileNm;
    private String strgFileNm;
    private String createDt;
    //LProjectMember
    private int mbrNum;
    private String avataId;
    private String receiptDate;
    private String approvalYN;
    private String withdrawalDate;
    private String avataNm;

    private String sggNm;
    private String emdNm;
    private String approvalDt;
    private int userCount;
    private String emdCenterGeom;


    //리빙프로젝트 통계
    private String ratioMonth;
    private int accumUserCount; //누적회원
    private int lPCount; //누적 개수





    //검색
    private List<String> sggIdList;
    private String lPStatus; //활동상태

    private String currentDt;

    private List<ActivityVO> activityVO;


}
