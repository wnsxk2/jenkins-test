package kr.go.busan.smartvillage.target02.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MeasuringStationVO {
    private String msrstnId;
    private int msrstnCode;
    private String msrstnName;

    private MeasuringStationVO msrstnInfo;
//    private MicroDustInfoVO pmInfo;

    private Map<String, String> pmInfo;
    public MeasuringStationVO(){

    }

    //항만 슬라이더
    public MeasuringStationVO(String id, int code, String name){
        if(this.msrstnInfo==null){
            this.msrstnInfo = new MeasuringStationVO();
        }
        msrstnInfo.msrstnId=id;
        msrstnInfo.msrstnCode=code;
        msrstnInfo.msrstnName=name;
    }

    public void setPmInfo(MicroDustInfoVO microDustInfoVO) {
        if(this.pmInfo==null){
            this.pmInfo = new HashMap<>();
        }
        pmInfo.put(microDustInfoVO.getMsrmtDateTime(), microDustInfoVO.getEngLifePatternName());
    }
}
