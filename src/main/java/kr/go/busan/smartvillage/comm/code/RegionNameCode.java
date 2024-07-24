package kr.go.busan.smartvillage.comm.code;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum RegionNameCode {
    BUSAN("busan", "busan", "부산광역시", "BUSAN");

    private String engName;
    private String engAlias;
    private String krName;
    private String redisKey;

    public static RegionNameCode getRegionNameCode(String engNm){
        RegionNameCode nameCode = null;
        for(RegionNameCode code : values()){
            if(code.engAlias.equals(engNm) || code.name().equals(engNm.toUpperCase())){
                nameCode = code;
                break;
            }
        }

        return nameCode;
    }

    public String getRedisKey(){
        return this.redisKey;
    }

    public String getKrName(){
        return this.krName;
    }
}
