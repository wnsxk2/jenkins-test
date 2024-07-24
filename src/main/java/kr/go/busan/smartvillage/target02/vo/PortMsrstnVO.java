package kr.go.busan.smartvillage.target02.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PortMsrstnVO {
    private String portMsrstnId;
    private String portName;
    private String portNameEng;
    private String portAddr;
    private String portAddrEng;
    private String installYear;
    private String measureItem;
    private String geom;


}