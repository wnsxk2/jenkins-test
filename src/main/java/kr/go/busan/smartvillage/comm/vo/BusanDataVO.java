package kr.go.busan.smartvillage.comm.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BusanDataVO {
    private int gid;
    private String sggNm;
    private String sggOid;
    private String admSectC;
    private String colAdmSe;
    private String geom;

}
