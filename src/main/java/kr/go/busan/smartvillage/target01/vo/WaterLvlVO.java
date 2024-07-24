package kr.go.busan.smartvillage.target01.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WaterLvlVO {
    private String waterLevelMonth;
    private double waterLevel;
    private double debrisWeight;
}
