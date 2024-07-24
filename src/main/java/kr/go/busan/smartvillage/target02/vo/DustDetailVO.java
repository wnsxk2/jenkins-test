package kr.go.busan.smartvillage.target02.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class DustDetailVO {

    private String id;
    private String dustType;
    private List<String> dataList;
    private List<Integer> pmValues;
    private int avg;
    private Map<String, Object> max;
    private Map<String, Object> min;
    private Map<String, LifePatternVO> lifePattern;

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
                if(pmValues.get(minIndex) > pmValues.get(i)){
                    minIndex = i;
                }
                if(pmValues.get(maxIndex) < pmValues.get(i)){
                    maxIndex = i;
                }
            }
        }
        max.put("dataTime", dataList.get(maxIndex));
        max.put("value", pmValues.get(maxIndex));

        min.put("dataTime", dataList.get(minIndex));
        min.put("value", pmValues.get(minIndex));

        this.avg = (total / count);
        this.max = max;
        this.min = min;
    }
}
