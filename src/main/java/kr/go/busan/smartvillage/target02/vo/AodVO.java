package kr.go.busan.smartvillage.target02.vo;

import lombok.Getter;

/**
 * AOD 정보 클래스
 */
@Getter
public class AodVO {
    private String aod;
    private String aodIndex;
    private String engAodIndex;
    private String aodImgFileNm;
    private String msrmtDt;
    private String admdstName;

    public AodVO() {
    }

    /**
     * 갈맷길 기준 MYBATIS 정보 바인딩용 생성자
     *
     * @param aod      AOD 수치값
     * @param aodIndex AOD 지수값
     * @param msrmtDt  AOD 측정일시
     */
    public AodVO(String aod, String aodIndex, String msrmtDt) {
        if (aod != null) {
            double aodValue = Double.parseDouble(aod);
            if (aodValue >= 0 && aodValue < 0.4) {
                this.aodIndex = "좋아요";
                this.engAodIndex = "GOOD";
                this.aodImgFileNm = "lpi_dust_good.webp";
            } else if (aodValue >= 0.4 && aodValue < 0.6) {
                this.aodIndex = "보통이에요";
                this.engAodIndex = "Moderate".toUpperCase();
                this.aodImgFileNm = "lpi_dust_normal.webp";
            } else if (aodValue >= 0.6 && aodValue < 0.9) {
                this.aodIndex = "나빠요";
                this.engAodIndex = "Unhealthy".toUpperCase();
                this.aodImgFileNm = "lpi_dust_bad.webp";
            } else if (aodValue >= 0.9) {
                this.aodIndex = "매우 나빠요";
                this.engAodIndex = "Very_Unhealthy".toUpperCase();
                this.aodImgFileNm = "lpi_dust_very_bad.webp";
            }

        } else {
            this.aodIndex = "교정중";
            this.engAodIndex = "Not_available".toUpperCase();
            this.aodImgFileNm = "lpi_dust_null.webp";
        }
        this.aod = aod;
        this.msrmtDt = msrmtDt;
    }

    public AodVO(String admdstName, String aod, String aodIndex, String msrmtDt) {
        if (aod != null) {
            double aodValue = Double.parseDouble(aod);
            if (aodValue >= 0 && aodValue < 0.4) {
                this.aodIndex = "좋아요";
                this.engAodIndex = "GOOD";
                this.aodImgFileNm = "lpi_dust_good.webp";
            } else if (aodValue >= 0.4 && aodValue < 0.6) {
                this.aodIndex = "보통이에요";
                this.engAodIndex = "NORMAL";
                this.aodImgFileNm = "lpi_dust_normal.webp";
            } else if (aodValue >= 0.6 && aodValue < 0.9) {
                this.aodIndex = "나빠요";
                this.engAodIndex = "BAD";
                this.aodImgFileNm = "lpi_dust_bad.webp";
            } else if (aodValue >= 0.9) {
                this.aodIndex = "매우 나빠요";
                this.engAodIndex = "VERY_BAD";
                this.aodImgFileNm = "lpi_dust_very_bad.webp";
            }

        } else {
            this.aodIndex = "교정중";
            this.engAodIndex = "PROOFREADING";
            this.aodImgFileNm = "lpi_dust_null.webp";
        }
        this.aod = aod;
        this.msrmtDt = msrmtDt;
        this.admdstName = admdstName;
    }
}
