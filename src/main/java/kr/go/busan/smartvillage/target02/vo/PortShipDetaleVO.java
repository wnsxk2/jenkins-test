package kr.go.busan.smartvillage.target02.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;


//안씀

@Getter
@Setter
public class PortShipDetaleVO {
    private List<String> entryDepartureDtList;
    private List<Integer> entryCountList;
    private List<Integer> departureCountList;
    private Map<String, Map<String, List<Object>>> shipGroupMap;
}