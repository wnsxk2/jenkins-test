package kr.go.busan.smartvillage.target02.code;


public enum ShipGroup {
    GROUP1("운반선"),
    GROUP2("일반화물선"),
    GROUP3("예선"),
    GROUP4("군함"),
    GROUP5("원양어선"),
    GROUP6("컨테이너선"),
    GROUP7("급유선"),
    GROUP8("기타선");

    private final String shipGroupNm;

    ShipGroup(String shipGroupNm) {
        this.shipGroupNm = shipGroupNm;
    }

    public String getShipGroupNm() {
        return shipGroupNm;
    }
}
