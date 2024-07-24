package kr.go.busan.smartvillage.target01.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.co.greenblue.comm.util.StringUtil;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WrnInfoVO {
    /* DB */
    private String startTime;
    private String endTime;
    private String month;
    private String wrnTypeName;
    private String wrnLevelName;
    private int count;

    /* return */
    private int heavyRainAdvisoryCount;
    private int heavyRainAlarmCount;
    private int typhoonCount;

    public WrnInfoVO(String key, WrnInfoVO wrnInfo01, WrnInfoVO wrnInfo02) {
        this.heavyRainAdvisoryCount += (wrnInfo01.getHeavyRainAdvisoryCount() + wrnInfo02.getHeavyRainAdvisoryCount());
        this.heavyRainAlarmCount += (wrnInfo01.getHeavyRainAlarmCount() + wrnInfo02.getHeavyRainAlarmCount());
        this.typhoonCount += (wrnInfo01.getTyphoonCount() + wrnInfo02.getTyphoonCount());
        this.month = key;
    }

    public WrnInfoVO(String month, int count, String wrnTypeName, String wrnLevelName){
        this.month = month;
        if (wrnTypeName.equals("호우") && wrnLevelName.equals("주의보")) {
            this.heavyRainAdvisoryCount = count;
        }
        if (wrnTypeName.equals("호우") && wrnLevelName.equals("경보")) {
            this.heavyRainAlarmCount = count;
        }
        if (wrnTypeName.equals("태풍")) {
            this.typhoonCount = count;
        }
    }

    public String getKey() {
        return StringUtil.makeString("dt", this.month);
    }
}
