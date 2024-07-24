package kr.go.busan.smartvillage.target02.code;

import lombok.AllArgsConstructor;

import java.util.Arrays;

@AllArgsConstructor
public enum MicroDustLevel {
    GOOD(0, 30, 0, 15, "좋아요", "Good"),
    NORMAL(31, 80, 16, 35, "보통이에요", "Moderate"),
    BAD(81, 150, 36, 75, "나빠요", "Unhealthy"),
    VERY_BAD(151, Integer.MAX_VALUE, 76, Integer.MAX_VALUE, "매우나빠요", "Very Unhealthy"),
    PROOFREADING(0, 0, 0, 0, "교정중", "Not available");

    private int pm10Min;
    private int pm10Max;
    private int pm25Min;
    private int pm25Max;

    private String lpiNm;
    private String engLpiNm;

    public static MicroDustLevel getLevel(String value, String dustType){
        int num;
        try{
             num = Integer.parseInt(value);
        }catch(NumberFormatException e){
            return PROOFREADING;
        }
        for (MicroDustLevel level :MicroDustLevel.values()){
            if(dustType.equals("pm10")){
                if (num >= level.pm10Min && num <= level.pm10Max ){
                    return level;
                }
            } else if (dustType.equals("pm25")){
                if (num >= level.pm25Min && num <= level.pm25Max ){
                    return level;
                }
            }
        }
        throw new IllegalArgumentException("Invalid dust value: " + value);
    }

    public static MicroDustLevel fineByLevel(String name) {
        return Arrays.stream(MicroDustLevel.values())
                .filter(level -> level.lpiNm.equals(name))
                .findAny()
                .orElse(MicroDustLevel.PROOFREADING);
    }
}
