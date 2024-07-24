package kr.go.busan.smartvillage.comm.vo;

/**
 * 데이터를 Geometry와 Properties로 구분하여 리턴할 때 사용하는 클래스
 * @param <T>
 */
public class GeoStructure<T> {
    private String geom;
    private T properties;

    public String getGeom() {
        return geom;
    }

    public void setGeom(String geom) {
        this.geom = geom;
    }

    public T getProperties() {
        return this.properties;
    }

    public void setProperties(T vo) {
        this.properties = vo;
    }
}
