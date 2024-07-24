package kr.co.greenblue.geometry.model;

import kr.go.busan.smartvillage.target02.vo.FeaturePropVO;
import kr.go.busan.smartvillage.target02.vo.GalmaetVO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WKTStructure {
    private String geom;
    private final Map<String, Object> properties = new HashMap<>();

    public void setWKTFormatGeom(String geom) {
        this.geom = geom;
    }

    public void addProperty(String key, List<FeaturePropVO> value) {
        properties.put(key, value);
    }

    public void addProperty(String key, String value){
        properties.put(key, value);
    }

    public String getGeom() {
        return geom;
    }

    public Map<String, Object> getProperties() {
        return this.properties;
    }

    public void setProperties(GalmaetVO galmaetVO) {
        System.out.println(galmaetVO);
    }

    public void setGeom(String geom) {
        System.out.println(geom);
    }
}
