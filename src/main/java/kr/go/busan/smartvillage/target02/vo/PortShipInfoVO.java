package kr.go.busan.smartvillage.target02.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PortShipInfoVO {
    private int msrstnNum;
    private String msrstnId;
    private String shipGroupNM;
    private int weight;
    private String entryDt;
    private String depatureDt;

    private String entryDepatureDt;
    private int dtType;

    private String weightRange;

    public void setWeight(int weight) {

        if (weight > 0 && weight < 100) {
            this.weightRange = "0~99";
        } else if (weight >= 100 && weight < 500) {
            this.weightRange = "100~499";
        } else if (weight >= 500 && weight < 1000) {
            this.weightRange = "500~999";
        } else if (weight >= 1000) {
            this.weightRange = "1000이상";
        } else {
            this.weightRange = "정보 없음";
        }
        this.weight = weight;
    }

}
