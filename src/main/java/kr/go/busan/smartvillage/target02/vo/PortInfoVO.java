package kr.go.busan.smartvillage.target02.vo;

import kr.go.busan.smartvillage.target02.code.MicroDustLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class PortInfoVO {
    private String msrstnId;
    private int msrstnCd;
    private String msrstnNm;
    private String engMsrstnNm;
    private String msrstnAddr;
    private String engMsrstnAddr;
    private int installYear;
    private String measureItem;
    private String geom;
    private String pm10;
    private String pm25;
    private String msrmtDt;
    private String dustType;
    private List<String> times;
    private String pm10Index;
    private String pm25Index;


    public void setPm10(String pm10) {
        this.pm10 = pm10;
        this.pm10Index = MicroDustLevel.getLevel(this.pm10, "pm10").name();
    }

    public void setPm25(String pm25){
        this.pm25 = pm25;
        this.pm25Index = MicroDustLevel.getLevel(this.pm25, "pm25").name();
    }

    private List<Integer> pmValues;
    private int avg;
    private Map<String, Object> max;
    private Map<String, Object> min;
    public void setPmValues(List<Integer> pmValues) {
        this.pmValues = pmValues;

        int count = 0;
        int total = 0;
        int minIndex = 0;
        int maxIndex = 0;

        Map<String, Object> max = new HashMap<>();
        Map<String, Object> min = new HashMap<>();

        for(int i = 0; i < pmValues.size(); i++){
            if(pmValues.get(i) != null){
                count++;
                total += pmValues.get(i);
                if(pmValues.get(minIndex) != null && pmValues.get(minIndex) > pmValues.get(i)){
                    minIndex = i;
                }
                if(pmValues.get(maxIndex) != null && pmValues.get(maxIndex) < pmValues.get(i)){
                    maxIndex = i;
                }
            }
        }

        max.put("dataTime", times.get(maxIndex));
        max.put("value", pmValues.get(maxIndex) != null ? pmValues.get(maxIndex) : 0);

        min.put("dataTime", times.get(minIndex));
        min.put("value", pmValues.get(minIndex) != null ? pmValues.get(minIndex) : 0);

        this.avg = count > 0 ? (total / count) : 0 ;
        this.max = max;
        this.min = min;

    }


    /*선박정보*/
    private Map<String, Object> portShipGraph;



}
