package kr.go.busan.smartvillage.target02.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

//안씀
@Getter
@Setter
public class PortShipVO {
    private int portMsrstnNum;
    private String portMsrstnId;
    private String shipName;
    private String engShipName;
    private String shipGroupName;
    private String engShipGroupName;
    private int weight;
    private String entryDt;
    private String departureDt;
    private int entryCount;
    private int departureCount;
    private String entryDepartureDt;

    private String time;
    private int shipGroupEntry;
    private int shipGroupDeparture;

    private int entryWeight;
    private int departureWeight;


}
