package kr.go.busan.smartvillage.target02.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class MicroDustInfoVO {
//    private String msrmtDt;
//    private String pm10;
//    private String pm25;

//    private List<LifePatternVO> lifePatternVOList;


    private String pmType;
    private String pmValue;
    private String msrmtDateTime;
    private String lifePatternName;
    private String engLifePatternName;
    private String lifePatternImageName;

    //port-area slider용
    public MicroDustInfoVO(String time, String engLifePatternName){
        this.msrmtDateTime=time;
        this.engLifePatternName=engLifePatternName;
    }


}
