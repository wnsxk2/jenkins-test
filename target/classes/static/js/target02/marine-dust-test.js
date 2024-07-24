/* 전역 상수 */
const PM_INDEX = {
    GOOD : '좋아요',
    NORMAL : '보통이에요',
    BAD : '나빠요',
    VERY_BAD : '매우나빠요',
    PROOFREADING : '교정중'
}
const DUST_INDEX_IMG = {
    GOOD : { src: `${ctxPath}/images/target02/lpi_dust_good.webp`},
    NORMAL :{ src: `${ctxPath}/images/target02/lpi_dust_normal.webp`},
    BAD :{ src: `${ctxPath}/images/target02/lpi_dust_bad.webp`},
    VERY_BAD : { src: `${ctxPath}/images/target02/lpi_dust_very_bad.webp`},
    PROOFREADING : { src: `${ctxPath}/images/target02/lpi_dust_null.webp`} //이미지 수정해야함
}
const SELECTED = new ol.style.Style({
    fill: new ol.style.Fill({
        color: '#eeeeee',
    }),
    stroke: new ol.style.Stroke({
        // 선택되었을때 색상
        color: 'rgb(255,255,255)',
        width: 8,
    }),
    text : new ol.style.Text({
        text : '',
        font: '9px sans-serif',
        stroke: new ol.style.Stroke({
            width: 1,
        }),
    })
});

const SELECT_GALMAET = new ol.interaction.Select({
    condition: ol.events.condition.click,
    style: selectGalmaetStyle,
    layers: function (layer) {
        return layer.get('selectable') == true;
    }
});
/* 전역 상수 끝 */

/*전역 변수*/
let themeType;
let pages;
// 첫 로딩시 확인 필요..
let nowOrientation = 'landscape';


let portResp; //미세먼지변화슬라이더-항만
let areaResp; //미세먼지변화슬라이더-지역구
let playTimeout; //미세먼지변화슬라이더시간

let dust24GraphData; //미세먼지변화 그래프, 표 데이터

let portShipData; // 항만 선박 입출항 그래프
let portShipGroup; //항만 선박 종류
let portShipRatio; //선박 무게 통계

let dustDateList=[]
/*let dateIndex;*/

let issuePM10List; //미세먼지 경보 리스트
let issuePM25List; //초미세먼지 경보 리스트
let select = null;

let showEffect=true;

let nowPage = 1;
let totalPage;

let sliderStyleData;

let lpiHover = false;

/*전역 변수 끝*/
$(document).ready(() => {
    /*함수 실행*/
    onClickSBtn();
    onClickSideThemeItem();
    onClickThemeItem();
    onClickPageBtn();

    initMap();

    setForecastPopup();
    setTurnLpi();
    setTurnLpiHover();
    /*함수 실행 끝*/

    /* scroll out 설정 */
    ScrollOut({
        cssProps: {
            visibleY: true,
            viewportY: true
        }
    });
    /* scroll out 설정 끝 */

    /* scroll 이벤트 */
    $(window).scroll(() => {
        // 메서드 명 변경 예정
        resetDrag();
    });
    /* scroll 이벤트 끝 */

});

/* 통신 함수 */

/* 통신 함수 끝 */

/* side section 함수 */
/**
 * side section show/hidden 하는 메서드
 */
function onClickSBtn(){
    $('.side-section-btn').on('click', () => {
        $('.side-section').toggleClass('on');
        $('.side-theme-section').toggleClass('on');
        $('.util-section').toggleClass('on');
        setSideBtn();
    });
}

/**
 * side theme item 클릭 시 side section show 하는 메서드
 */
function onClickSideThemeItem(){
    $('.side-theme-item').on('click', (e) => {

        let idx = $(e.currentTarget).index();
        let isClick = $(e.currentTarget).hasClass('on');

        // 이미 클릭된 상태이면 종료
        if(isClick){
            return ;
        }

        refreshLayer();

        //setportdust에서 초기화 진행함
        // if (portSource) { //항만 심볼 초기화
        //    portSource.clear();
        // }
        if (portGeomSource) { //항만 심볼 초기화
            portGeomSource.clear();
        }

        $(".vessel-list").removeClass("on");
        $('.side-section > div').removeClass('on');
        //!
        $('.side-section-'+themeType).addClass('show');
        // 버튼 계산 추가
        totalPage = $(`.${nowOrientation} .side-section-${themeType} .side-section-page`).length;
        $(`.${nowOrientation} .side-section-${themeType} .side-section-page`).each((index, item)=>{
            if($(item).hasClass('show')){
                nowPage = ++index;
            }
        });
        setPageBtn();
        // 버튼 계산 추가 끝

        // on 클래스 추가 코드
        setListOnOff('.side-theme.show > .side-theme-item', idx);
        showSideSection();

        cntAnimationExecuted++;

        switch (themeType){
            case 'port':
                resetStyle(busanSource, BASIC_STYLE['busan']);

                if(portLayer.getVisible()){
                    portLayer.setVisible(false);
                }

                /*
                if(portLayer != undefined){
                    portLayer.setVisible(false);
                }
                 */

                /*    if(portLayer){
                        portLayer.set('selectable', true);
                    }*/
                if(idx == 0){
                    // 미세먼지 text 변경
                    $('.side-section-' + themeType + ' .dust-type').html('미세먼지');

                    setIssueData(idx); //미세먼지 경보
                    $(".monit-item").removeClass("on"); //미세먼지 변화 슬라이더+범례 비활성화
                    dustType = 'pm10';
                    $('.side-section-front').addClass('on'); //대시보드1페이지
                    $('.side-section-back').removeClass('on');//대시보드2페이지
                    $('.preparing-popup').removeClass('on');//준비중 팝업 숨기기
                    indexOnOff(idx); //범례 onoff

                    //isupdate 부분 삭제한다고 박준태가 말했음
                    if (isUpdate) {
                        resetStyle(busanSource, setAreaStyleText);
                    } else {
                        setFeatureFromRequest(busanSource, "dustArea");
                    }

                    if(showEffect&& cntAnimationExecuted == 1){
                        //cloud overlay 꺼졌는지 확인
                        //이벤트 settime 때문에 0.5초마다 재확인
                        let isCloudOverlayVisible = cloudOverlay.getVisible();
                        const checkCloudVisible = setInterval(function() {
                            isCloudOverlayVisible = cloudOverlay.getVisible();
                            if (isCloudOverlayVisible == false) {
                                clearInterval(checkCloudVisible); // 반복을 종료
                                setPortDust(dustType, "dustPort"); //항만 미세먼지 모든정보+선박
                            }
                        }, 500); // 0.5초 간격
                    }else{
                        setPortDust(dustType, "dustPort");
                    }

                    onClickPort();//항만 클릭 이벤트

                    // if(clickedFeature != null){
                    //     setPortDetail(clickedFeature);
                    // }
                }
                if(idx == 1){
                    // 초미세먼지 text 변경
                    $('.side-section-' + themeType + ' .dust-type').html('초미세먼지');

                    setIssueData(idx);
                    $(".monit-item").removeClass("on");
                    $(".ship-ratio-cover").removeClass("active1");
                    $(".ship-ratio-cover").addClass("active2");
                    dustType = 'pm25';
                    $('.side-section-front').addClass('on');
                    $('.side-section-back').removeClass('on');
                    $('.preparing-popup').removeClass('on');
                    // setPortDust(dustType, "dustPort");
                    //  setFeatureFromRequest(portSource,"dustPort");
                    indexOnOff(idx);

                    if (isUpdate) {
                        resetStyle(busanSource, setAreaStyleText);
                    } else {
                        setFeatureFromRequest(busanSource, "dustArea");
                    }

                    if(showEffect&& cntAnimationExecuted == 1){
                        //cloud overlay 꺼졌는지 확인
                        //이벤트 settime 때문에 0.5초마다 재확인
                        let isCloudOverlayVisible = cloudOverlay.getVisible();
                        const checkCloudVisible = setInterval(function() {
                            isCloudOverlayVisible = cloudOverlay.getVisible();
                            if (isCloudOverlayVisible == false) {
                                clearInterval(checkCloudVisible); // 반복을 종료
                                setPortDust(dustType, "dustPort"); //항만 미세먼지 모든정보+선박
                            }
                        }, 500); // 0.5초 간격
                    }else{
                        setPortDust(dustType, "dustPort");
                    }

                    onClickPort();//항만 클릭 이벤트

                    /*  if(clickedFeature != null){
                          setPortDetail(clickedFeature);
                      }*/
                }
                if(idx == 2){/* 탄소 배출 현황 */
                    hiddenSideSection();
                    $(".dust-issue").removeClass("show");
                    $(".monit-item").removeClass("on");
                    $(".dust-legend-img").removeClass("on");
                    $(".ship-ratio-cover").removeClass('active1');
                    $(".ship-ratio-cover").addClass('active2');
                    // setPreparingPopup();

                    if(showEffect&& cntAnimationExecuted == 1){
                        //cloud overlay 꺼졌는지 확인
                        //이벤트 settime 때문에 0.5초마다 재확인
                        let isCloudOverlayVisible = cloudOverlay.getVisible();
                        const checkCloudVisible = setInterval(function() {
                            isCloudOverlayVisible = cloudOverlay.getVisible();
                            if (isCloudOverlayVisible == false) {
                                clearInterval(checkCloudVisible); // 반복을 종료
                                shipLayer.setVisible(true);
                            }
                        }, 500); // 0.5초 간격
                    }else{
                        shipLayer.setVisible(true);
                    }
                }
                if(idx == 3){
                    hiddenSideSection();
                    $(".dust-issue").removeClass("show");
                    $(".ship-ratio-cover").removeClass('active1');
                    $(".ship-ratio-cover").addClass('active2');
                    $('.preparing-popup').removeClass('on');
                    /* 미세먼지 변화 슬라이드 표출 */
                    dustType = 'pm10';

                    //여기 날짜 geom 같이
                    getDustDate("dustDate"); //미세먼지 변화 날짜 전체 가져오는 함수
                    getPortGeom();
                    // setSourceFromRequest('busanWkt');  //harin 재호출XXXX
                    $(".dust-legend-img").removeClass("on");
                    $(".monit-item").addClass("on");
                    $(".monit-pm25").removeClass("on");
                    $(".slider-dust-index-img-01").addClass("on");
                    $(".slider-dust-index-img-02").removeClass("on");
                    selectDustMode();
                    showDate();
                }
                break;
            case 'area':
                resetStyle(busanSource, BASIC_STYLE['busan']);
                setClickStyle();
                busanLayer.set('selectable', true);
                $(".monit-item").removeClass("on");
                $(".dust-legend-img").removeClass("on");
                if(idx == 0){
                    // 미세먼지 text 변경
                    $('.side-section-' + themeType + ' .dust-type').html('미세먼지');
                    setIssueData(idx);
                    indexOnOff(idx);

                    dustType = 'pm10';
                    if (isUpdate) {
                        resetStyle(busanSource, setAreaStyleText);
                    } else {
                        setFeatureFromRequest(busanSource, "dustArea");
                    }
                    onClickArea();
                    if(clickedFeature != null){
                        setAreaDetail(clickedFeature);
                    }
                }
                if(idx == 1){
                    // 초미세먼지 text 변경
                    $('.side-section-' + themeType + ' .dust-type').html('초미세먼지');
                    setIssueData(idx);
                    indexOnOff(idx);

                    dustType = 'pm25';
                    if (isUpdate) {
                        resetStyle(busanSource, setAreaStyleText);
                    } else {
                        setFeatureFromRequest(busanSource, "dustArea");
                    }
                    onClickArea();
                    if(clickedFeature != null){
                        setAreaDetail(clickedFeature);
                    }

                }
                if(idx == 2){
                    hiddenSideSection();
                    // AOD 버튼
                    // toggle 버튼 on/off 확인 코드 on=ture, off=false
                    $('.switch > input').is(':checked')
                }

                if(showCloudEffect){
                    setTimeout(function (){
                        busanLayer.setVisible(true);
                    }, 450)
                }

                break;
                /*
            case 'galmaet':
                // resetStyle(busanSource, setGalmaetStyleText);
                resetStyle(busanSource, BACKGROUND_STYLE);

                setClickStyle();
                onHoverGm();
                galmaetLayer.set('selectable', true);
                $(".monit-item").removeClass("on");
                galmaetLayer.setVisible(true);
                if (idx == 0){
                    $('.side-section-galmaet > .side-header-section > h1').html('갈맷길 미세먼지');
                    setIssueData(idx);
                    indexOnOff(idx);

                    dustType = 'pm10';
                    setFeatureFromRequest(galmaetSource,"dustGm");
                    onClickGalmaet();
                    if (clickedFeature != null) {
                        setGmDetail(clickedFeature);
                    }
                }
                if (idx == 1){
                    $('.side-section-galmaet > .side-header-section > h1').html('갈맷길 초미세먼지');
                    setIssueData(idx);
                    indexOnOff(idx);

                    dustType = 'pm25';
                    setFeatureFromRequest(galmaetSource,"dustGm");
                    onClickGalmaet();
                    if (clickedFeature != null) {
                        setGmDetail(clickedFeature);
                    }
                }

                setTimeout(function (){
                    galmaetLayer.setVisible(true);
                    busanLayer.setVisible(true);
                }, 450);

                break;

                 */
            /*
        case 'tipoff':
            $(".monit-item").removeClass("on");
            $(".tipoff-dust-index-img").addClass("on");
            break;

             */
        }

        // if(showCloudEffect){
        //     showCloudEffect = false;
        //
        //     setTimeout(function (){
        //         cloudControl.setVisible(false);
        //     }, 2000)
        // }

    });
}

/**
 * side section show 메서드
 */
function showSideSection() {
    // side section show
    if(!$('.side-section').hasClass('on') || !$('.side-section-btn').hasClass('on')){
        $('.side-section-btn').addClass('on');
        $('.side-theme-section').addClass('on');
        $('.util-section').addClass('on');
        $('.side-section').addClass('on');
    }
    setSideBtn();
}

/**
 * side section hidden 메서드
 */
function hiddenSideSection() {
// side section hidden
    if($('.side-section').hasClass('on') || $('.side-section-btn').hasClass('on')){
        $('.side-section-btn').removeClass('on');
        $('.side-theme-section').removeClass('on');
        $('.util-section').removeClass('on');
        $('.side-section').removeClass('on');
        setSideBtn();
    }
}

/**
 * side section btn 의 상태를 변경하는 메서드
 */
function setSideBtn(){
    if($('.side-section').hasClass('on')){
        $('.side-section-btn').removeClass('back');
        $('.side-section-btn').addClass('next');
    } else {
        $('.side-section-btn').addClass('back');
        $('.side-section-btn').removeClass('next');
    }
}
/* side section 함수 끝 */

/* theme 함수 */
/**
 * theme item 클릭 시 side theme item show 하는 메서드
 * 스타일 메뉴 등의 이벤트만 처리
 */
function onClickThemeItem(){
    $('.theme-item').on('click', (e)=>{
        let idx = $(e.currentTarget).index();
        let isClick = $(e.currentTarget).hasClass('on');
        $(".monit-item").removeClass("on");
        $(".dust-issue").removeClass("show");
        $(".dust-legend-img").removeClass("on");
        $(".tipoff-dust-index-img").removeClass("on");
        $('.preparing-popup').removeClass('on');

        /*
        if (portSource) { //항만 심볼 초기화
            portSource.clear();
        }
        if (portGeomSource) { //항만 심볼 초기화
            portGeomSource.clear();
        }
         */
        // 이미 클릭된 상태이면 종료
        if(isClick){
            return ;
        }
        themeType = $(e.currentTarget).data('theme');
        $('.side-theme-item').removeClass('on');
        // on 클래스 추가 코드
        setListOnOff('.theme-item', idx);
        setListAddRemove('.side-theme', idx, 'show');


        // $(".side-section-content").empty();
        hiddenSideSection();

        dustType = null;
        isUpdate = false;

        //지도 컨트롤은 setThemeMap 함수에서 처리
        setThemeMap(themeType);
        /*
        selectedSource.clear();
        selectedLayer.setVisible(false);
        if(portLayer != null) {
            portLayer.setVisible(false);
        }
        if(tipoffLayer != null) {
            tipoffLayer.setVisible(false);
        }
        busanLayer.setVisible(true);
        galmaetLayer.setVisible(false);
        dustType = null;
        clickedFeature = null;
        isUpdate = false;

        // click 이벤트 해제
        if(portLayer){
            portLayer.set('selectable', false);
        }
        busanLayer.set('selectable', false);
        galmaetLayer.set('selectable', false);
        tipoffLayer.set('selectable', false);
        if (select !== null) {
            map.removeInteraction(select);
        }

        tipoffOverlay.setVisible(false);
        $('#tipoff-popup').hide();
        setThemeMap(themeType);
        //경보 데이터 호출
        if(issuePM10List==undefined || issuePM25List==undefined){
            getIssueData();
        }
*/
    });
}
/* theme 함수 끝 */

/* event 함수 */

/*미세먼지 변화 표(최저,평균,최고)*/
function setDustTable(){

    $('.side-section-' + themeType + " .dust-eng-name").html(dustType.toUpperCase());

    $('.side-section-' + themeType + " .dust-min").html(dust24GraphData.min.value);
    let minDataTime = formatDateTime(dust24GraphData.min.dataTime);
    $('.side-section-' + themeType + " .dust-min-date").html(minDataTime);

    $('.side-section-' + themeType + " .dust-avg").html(dust24GraphData.avg);
    $('.side-section-' + themeType + " .dust-max").html(dust24GraphData.max.value);

    let maxDataTime = formatDateTime(dust24GraphData.max.dataTime);
    $('.side-section-' + themeType + " .dust-max-date").html(maxDataTime);
}


/*날짜 형태 24.05.23 / 20시로 변환하는는 함수*/
function formatDateTime(dateString) {
    // 주어진 날짜 문자열을 Date 객체로 변환
    let date = new Date(dateString);


    let year = date.getFullYear().toString().slice(2); // 년
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월
    let day = date.getDate().toString().padStart(2, '0'); //일
    let hour = date.getHours(); // 19

    let formattedDateTime = `${year}.${month}.${day} / ${hour}시`;

    return formattedDateTime;
}
/*미세먼지 변화 미세먼지/초미세먼지 버튼 선택 함수*/
function selectDustMode(){
    $(".monit-pm10").on("click", function () {
        $(".monit-pm25").removeClass("on");
        $(".monit-pm10").addClass("on");
        $(".slider-dust-index-img-01").addClass("on");
        $(".slider-dust-index-img-02").removeClass("on");
        dustType = 'pm10';
        getDustDate("dustDate"); //미세먼지 변화 날짜 전체 가져오는 함수
        showDate();
        //setPortDust(dustType,"dustPort");
        getPortGeom();
        setSourceFromRequest('busanWkt');  //harin 재호출 XXX
    });

    $(".monit-pm25").on("click", function () {
        $(".monit-pm10").removeClass("on");
        $(".monit-pm25").addClass("on");
        $(".slider-dust-index-img-02").addClass("on");
        $(".slider-dust-index-img-01").removeClass("on");
        dustType = 'pm25';
        getDustDate("dustDate"); //미세먼지 변화 날짜 전체 가져오는 함수
        showDate();
        //setPortDust(dustType,"dustPort");
        getPortGeom();
        setSourceFromRequest('busanWkt'); //harin 재호출 XXX
    });
}
/*미세먼지 변화 날짜 가져오는 함수*/
function getDustDate(key) {
    let info = BASE_URL[key];

    let dustDateUrl = "port";

    $.ajax({
        url: info.url + dustDateUrl,
        type: info.type,
        dataType: 'json',
        success: function (resp){
            if (resp.data != null) {
                console.log("getDustDate success");


                dustDateList = []; // 배열 초기화
                for (let i = 0; i < resp.data.length; i++) {
                    dustDateList.push(resp.data[i].msrmtDt);
                }

                $('.dust-date').text(dustDateList[0]);
                //가장최근날짜
                getDust24Data(busanSource, dustDateList[0], "dust24Data", "area");
                getDust24Data(portGeomSource, dustDateList[0], "dust24Data", "port");


                //가장 최근 날짜이면 next 버튼 비활성화
                if (dustDateList[0] == $('.dust-date').text()) {
                    $(".next-date-btn").addClass("off");
                    $(".next-date-btn.off").prop('disabled', true);
                }
            }
        },
        error: function (e) {
            console.log('error in getDustDate');
        }

    });

}
/*미세먼지 변화 슬라이더 날짜 표출 함수*/
function showDate(){
    let dateIndex = 0;
    $('.dust-date').text(dustDateList[dateIndex]); //가장 최근날짜 셋팅

    //◀이전 버튼 클릭
    $(".prev-date-btn").on('click', function(e) {
        $(".next-date-btn").removeClass("off");
        $(".next-date-btn").prop('disabled', false);

        if($("#stopPlay").hasClass("on")){
            $("#stopPlay").trigger("click");
        }

        clearTimeout(playTimeout);
        playTimeout = null;

        dateIndex = dateIndex + 1;

        $('.dust-date').text(dustDateList[dateIndex]);

        console.log("dustDateList[dateIndex]: " + dustDateList[dateIndex]);

        getDust24Data(busanSource, dustDateList[dateIndex], "dust24Data", "area");
        getDust24Data(portGeomSource, dustDateList[dateIndex], "dust24Data", "port");

    });


    $(".next-date-btn").on('click', function (e) {
        if (dustDateList[1] == $('.dust-date').text()) {
            $(".next-date-btn").addClass("off");
            $(".next-date-btn.off").prop('disabled', true);
        }

        if($("#stopPlay").hasClass("on")){
            $("#stopPlay").trigger("click");
        }

        clearTimeout(playTimeout);
        playTimeout = null;

        dateIndex = dateIndex - 1;
        $('.dust-date').text(dustDateList[dateIndex]);
        getDust24Data(busanSource, dustDateList[dateIndex], "dust24Data", "area");
        getDust24Data(portGeomSource, dustDateList[dateIndex], "dust24Data", "port");

    });
}



/*미세먼지 변화 슬라이더 함수*/
function initializeDustSlider(portResp, areaResp, date, dateMin, dateMax) {
    $("#dust-slider").slider({
        range: "min",
        value: dateMin, //초기값
        min: dateMin, //최소값
        max: dateMax, //최대값
        step: 1, //1씩 증가
        slide: function (event, ui) {
            let dustSliderValue = ui.value; //현재값
            updatePortFeatures(portResp, date, dustSliderValue);
            updateAreaFeatures(areaResp, date, dustSliderValue);
        }
    });




    $("#startPlay").on("click", function () {
        $("#startPlay").hide();
        $("#stopPlay").show();
        $("#stopPlay").addClass("on");

        clearTimeout(playTimeout);
        playTimeout = null;

        if (!playTimeout) {
            playTimeout = setTimeout(function play() {
                let currentVal = $("#dust-slider").slider("value");
                //console.log("currentVal: " +currentVal);
                if (currentVal < dateMax) {
                    $("#dust-slider").slider("value", currentVal + 1);
                    $("#dust-slider").slider("option", "slide").call($("#dust-slider"), null, { value: currentVal + 1 });
                    playTimeout = setTimeout(play, 2000);
                } else {
                    $("#startPlay").css("display", "block");
                    $("#stopPlay").css("display", "none");
                    clearTimeout(playTimeout);
                    playTimeout = null;
                }
            }, 2000);
        }else{
            $("#dust-slider").slider("value",0);
            playTimeout = setTimeout(function play() {
                let currentVal = $("#dust-slider").slider("value");
                if (currentVal < dateMax) {
                    $("#dust-slider").slider("value", currentVal + 1);
                    //   $("#dust-slider").slider("option", "slide").call($("#dust-slider"), null, { value: currentVal + 1 });
                    playTimeout = setTimeout(play, 3000);
                } else {
                    $("#startPlay").css("display", "block");
                    $("#stopPlay").css("display", "none");
                }
            }, 3000);
        }
    });

    $("#stopPlay").on("click", function () {
        clearTimeout(playTimeout);
        playTimeout = null;
        $("#startPlay").css("display", "block");
        $("#stopPlay").css("display", "none");
        $("#stopPlay").removeClass("on");
    });
}


//경보 데이터 호출
function getIssueData(){
    let info = BASE_URL.issueData;
    $.ajax({
        url: info.url,
        type: info.type,
        dataType: 'json',
        success: function (resp){
            if(resp.success){
                if (resp.data != null) {
                    console.log("getIssueData success");
                    if("초미세먼지" in resp.data){
                        issuePM25List = resp.data["초미세먼지"];
                    }

                    if("미세먼지" in resp.data){
                        issuePM10List = resp.data["미세먼지"];
                    }
                }
            }
        },
        error: function (e) {
            console.log('error in getIssueData');
        }

    });
}

/*미세먼지 경보*/
function setIssueData(idx){
    let issueDataList;

    if(idx == 0) {
        issueDataList = issuePM10List;
    }else if(idx == 1){
        issueDataList = issuePM25List;
    }

    if(issueDataList != undefined){
        $(".dust-issue").addClass("show");
        $('.carousel-inner').empty();

        for(let i=0; i< issueDataList.length; i++){
            let activeClass = i === 0 ? ' active' : '';
            let issueItem =`
            <div class="carousel-item ${activeClass}">
                <div class="dust-issue-text issue-dust-type">${issueDataList[i].dustType}</div>
                <div class="dust-issue-text issue-type">${issueDataList[i].issueType}</div>
                <img src="${ctxPath}/images/target02/issue_ic.webp" alt="">
                <div class="dust-issue-text issue-admdst-name">${issueDataList[i].admdstName}</div>
            </div>
        `;
            $('.carousel-inner').append(issueItem);
        }
    }else{
        return;
    }
}

/*범례 on off 함수*/
function indexOnOff(idx){
    if(idx == 0){ //미세먼지 pm10
        $(".dust-index-img-01").addClass("on");
        $(".dust-index-img-02").removeClass("on");
    }else if(idx == 1){ //초미세먼지 pm25
        $(".dust-index-img-02").addClass("on");
        $(".dust-index-img-01").removeClass("on");
    }
}
/* event 함수 끝 */

// 위젯 로드
function widgetLoad() {
    grid = GridStack.init({
        column: 10,
        minRow: 10,
        float: true, acceptWidgets: true
    });
}

function selectGalmaetStyle(feature) {
    let fill = null;
    // const property = feature.getProperties();
    let style = SELECTED
    style.getText().setText('');
    style.setFill(fill);

    return style;
}

function setClickStyle(){
    if (select !== null) {
        map.removeInteraction(select);
    }
    if (themeType == 'galmaet') {
        select = SELECT_GALMAET;
    }

    if (select !== null) {
        map.addInteraction(select);
    }
}

function setAreaStyleText(feature){
    let property = feature.getProperties();
    let style = PM_STYLE[property[combineStrings(dustType, 'Index')]] || PM_STYLE["PROOFREADING"];
    if(selectedSource.hasFeature(feature)){
        style.setStroke(STROKE_STYLE["selected"]);
    } else {
        style.setStroke(STROKE_STYLE["basic"]);
    }
    /* gradient test */
    /*
        var pixelRatio = ol.has.DEVICE_PIXEL_RATIO;

        var extent = feature.getGeometry().getExtent();

        var resolution = map.getView().getResolution();

        var x1 = ol.extent.getWidth(extent) / resolution * pixelRatio;

        x1 = 1500;
        // var grad = context.createLinearGradient(0, 0, x1, 0);


        if(property[combineStrings(dustType, 'Index')]=="GOOD"){
            // style = TEST_PM_STYLE["NORMAL"];

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            // Gradient and pattern are in canvas pixel space, so we adjust for the
            // renderer's pixel ratio

            // Gradient starts on the left edge of each feature, and ends on the right.
            // Coordinate origin is the top-left corner of the extent of the geometry, so
            // we just divide the geometry's extent width by resolution and multiply with
            // pixelRatio to match the renderer's pixel coordinate system.
            var grad = context.createLinearGradient(0, 0, x1, 0);
            //var grad = context.createLinearGradient(0, 0, ol.extent.getWidth(extent) *pixelRatio, 0);
            //var grad = context.createLinearGradient(0, 0,  ol.extent.getWidth(extent)/resolution, 0);
            // var grad = context.createLinearGradient(0, 0,  1500, 0);
            grad.addColorStop(0, 'rgb(225,250,228)');
            grad.addColorStop(1 / 4, 'rgb(122,189,184)');
            grad.addColorStop(2 / 4, 'rgb(25,176,146)');
            grad.addColorStop(3 / 4, 'rgb(87,153,140)');
            grad.addColorStop(1, 'rgb(4,154,119)');

            style.getFill().setColor(grad);
        }else if(property[combineStrings(dustType, 'Index')]=="NORMAL"){

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            // var grad = context.createLinearGradient(0, 0,  1500, 0);
            var grad = context.createLinearGradient(0, 0, x1, 0);
            grad.addColorStop(0, 'rgb(119,170,255)');
            grad.addColorStop(1 / 4, 'rgb(153,204,255)');
            grad.addColorStop(2 / 4, 'rgb(187,238,255)');
            grad.addColorStop(3 / 4, 'rgb(85,136,255)');
            grad.addColorStop(1, 'rgb(51,102,255)');

            style.getFill().setColor(grad);
        }else if(property[combineStrings(dustType, 'Index')]=="BAD"){

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            // var grad = context.createLinearGradient(0, 0,  1500, 0);
            var grad = context.createLinearGradient(0, 0, x1, 0);
            grad.addColorStop(0, 'rgb(237, 214, 34)');
            grad.addColorStop(1 / 4, 'rgb(255,240,120)');
            grad.addColorStop(2 / 4, 'rgb(255,244,155)');
            grad.addColorStop(3 / 4, 'rgb(176, 155, 18)');
            grad.addColorStop(1, 'rgb(255,215,0)');

            style.getFill().setColor(grad);
        }else if(property[combineStrings(dustType, 'Index')]=="VERY_BAD"){

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            // var grad = context.createLinearGradient(0, 0,  1500, 0);
            var grad = context.createLinearGradient(0, 0, x1, 0);
            grad.addColorStop(0, 'rgb(255,153,153)');
            grad.addColorStop(1 / 4, 'rgb(255,200,200)');
            grad.addColorStop(2 / 4, 'rgb(255,231,231)');
            grad.addColorStop(3 / 4, 'rgb(255,99,99)');
            grad.addColorStop(1, 'rgb(255,0,0)');

            style.getFill().setColor(grad);
        }else if(property[combineStrings(dustType, 'Index')]=="PROOFREADING"){

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var grad = context.createLinearGradient(0, 0,  1500, 0);
            grad.addColorStop(0, 'rgb(119,170,255)');
            grad.addColorStop(1 / 4, 'rgb(153,204,255)');
            grad.addColorStop(2 / 4, 'rgb(187,238,255)');
            grad.addColorStop(3 / 4, 'rgb(85,136,255)');
            grad.addColorStop(1, 'rgb(51,102,255)');

            style.getFill().setColor(grad);
        }

     */

    /*
    //label layer
    if(!busanSggLableLayer.getVisible()){
        busanSggLableLayer.setVisible(true);
    }
    */

    // style.getText().setText(feature.getProperties().admdstNm);
    /*
        var geom = feature.getGeometry();
        var polys = geom.getPolygons().sort(function(a, b) {
            var areaA = a.getArea();
            var areaB = b.getArea();
            return areaA > areaB ? 1 : areaA < areaB ? -1 : 0;
        });
        // style is an ol.style.Style with an ol.style.Text
        style.setGeometry(polys.pop())
    */
    return style;
}

function setGalmaetStyleText(feature){
    let property = feature.getProperties();
    let style = BACKGROUND_STYLE;
    // style.getText().setText(feature.getProperties().admdstNm);

    /*
    //label layer
    if(!busanSggLableLayer.getVisible()){
        busanSggLableLayer.setVisible(true);
    }
     */
    return style;
}

function setSliderStyleText(feature){
    let property = feature.getProperties();
    let style = PM_STYLE[sliderStyleData] || BASIC_STYLE['busan'];

    style.getText().setText(feature.getProperties().admdstNm);
    return style;
}


function onClickTipOff(){
    map.on('click', function(evt) {
        if(themeType == 'tipoff'){
            let feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
                return feature;
            });
            if(feature && feature.getProperties() != undefined){
                let properties = feature.getProperties();
                selectedSource.clear();
                selectedLayer.setVisible(true);
                selectedSource.addFeature(feature.clone());

                let coordinate = evt.coordinate;
                $('.tipoff-popup-content').remove();

                if (properties.sggDivNum ==1) {

                    if(properties.tipoffData != undefined){
                        let tipoffList = properties.tipoffData;
                        $('.tipoff-popup-title').html('시민 제보 정보');
                        let contrainer = $('#tipoff-popup').clone()[0];
                        let lastNum = tipoffList.length >= 3 ? 3 : tipoffList.length;
                        for(i = 0; i < lastNum; i++){
                            const div = document.createElement("div");
                            div.setAttribute('class', "tipoff-popup-content");
                            const span1 = document.createElement("span");
                            span1.setAttribute('class',"tipoff-popup-date");
                            span1.textContent = setDateFormat(tipoffList[i].msrmtDt);
                            const span2 = document.createElement("span");
                            span2.textContent = `${tipoffList[i].admdstNm} 대기오염은 ${PM_INDEX[tipoffList[i].pm10Index]}`;
                            span2.setAttribute('class',"tipoff-popup-tipoff");

                            div.appendChild(span1);
                            div.appendChild(span2);
                            contrainer.appendChild(div);
                        }

                        tipoffOverlay.setElement(contrainer);
                        tipoffOverlay.setPosition(coordinate);
                        tipoffOverlay.setVisible(true);
                        $('#tipoff-popup').show();
                    } else {

                        $('.tipoff-popup-title').html('제보된 데이터가 없어요');
                        let contrainer = $('#tipoff-popup').clone()[0];
                        tipoffOverlay.setElement(contrainer);
                        tipoffOverlay.setPosition(coordinate);
                        tipoffOverlay.setVisible(true);
                        $('#tipoff-popup').show();
                    }
                } else if(properties.sggDivNum ==2 ) {

                    if(properties.dustData != undefined){
                        let dustData = properties.dustData;

                        $('.tipoff-popup-title').html('미세먼지 실제지수');
                        let contrainer = $('#tipoff-popup').clone()[0];
                        let lastNum = dustData.length >= 3 ? 3 : dustData.length;
                        for(i = 0; i < lastNum; i++){
                            const div = document.createElement("div");
                            div.setAttribute('class', "tipoff-popup-content");
                            const span1 = document.createElement("span");
                            span1.setAttribute('class',"tipoff-popup-date");
                            span1.textContent = setDateFormat(dustData[i].msrmtDt);
                            const span2 = document.createElement("span");
                            span2.textContent = `${dustData[i].admdstNm} 미세먼지는 ${PM_INDEX[dustData[i].pm10Index]}`
                            span2.setAttribute('class',"tipoff-popup-tipoff");

                            div.appendChild(span1);
                            div.appendChild(span2);
                            contrainer.appendChild(div);
                        }
                        tipoffOverlay.setElement(contrainer);
                        tipoffOverlay.setPosition(coordinate);
                        tipoffOverlay.setVisible(true);
                        $('#tipoff-popup').show();
                    } else {

                        $('.tipoff-popup-title').html('교정중');
                        let contrainer = $('#tipoff-popup').clone()[0];
                        tipoffOverlay.setElement(contrainer);
                        tipoffOverlay.setPosition(coordinate);
                        tipoffOverlay.setVisible(true);
                        $('#tipoff-popup').show();
                    }

                } else {
                    tipoffOverlay.setVisible(false);
                    $('#tipoff-popup').hide()
                }
            } else {
                tipoffOverlay.setVisible(false);
                $('#tipoff-popup').hide();
            }
        }
    });
}

function onHoverGalmaet(){
    map.on('pointermove', function(evt) {
        if(themeType == 'galmaet'){
            let feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
                return feature;
            });
            if (feature) {
                let properties = feature.getProperties();
                if(properties.mapType == 'gm'){
                    let coordinate = evt.coordinate;
                    let tipoffList = properties.tipoffData;

                    $('.gm-popup-title').html(`${properties.guganNm}`);
                    $('.gm-popup-content').html(`${properties.gmRange}`);

                    let contrainer = $('#gm-popup').clone()[0];
                    tipoffOverlay.setElement(contrainer);
                    tipoffOverlay.setPosition(coordinate);
                    tipoffOverlay.setVisible(true);
                    $('#gm-popup').show();
                } else {
                    tipoffOverlay.setVisible(false);
                    $('#gm-popup').hide();
                }
            } else {
                tipoffOverlay.setVisible(false);
                $('#gm-popup').hide();
                console.log('No feature clicked.');
            }
        }
    });
}

function setForecastPopup(){
    $('.forecast-info').on('mouseover', function () {
        $(".forecast-content").addClass("on");
    });
    $('.forecast-info').on('mouseout', function () {
        $(".forecast-content").removeClass("on");
    });
}

function setOrientation() {
    // 대시보드 화면 on, off 사용
    $(window).on('resize', function(){
        if (window.matchMedia('(orientation: portrait)').matches) {
            nowOrientation = "portrait";
            // 활성화 되어있던 애들 취소
            console.log("portrait");
            $('.side-theme-section').each((index, item)=>{
                if($(item).hasClass('portrait')){
                    $(item).show();
                } else {
                    $(item).hide();
                }
            });
        } else {
            nowOrientation = "landscape";
            // 활성화 되어있던 애들 취소
            console.log("landscape");
            $('.side-theme-section').each((index, item)=>{
                if($(item).hasClass('landscape')){
                    $(item).show();
                } else {
                    $(item).hide();
                }
            });
        }
    });
}

/**
 * 페이지 이동 버튼 클릭 이벤트 메서드
 */
function onClickPageBtn() {
    $('.page-btn').on('click', (e)=>{
        let move = $(e.currentTarget).attr('move');
        switch (move){
            case 'prev':
                nowPage--;
                break;
            case 'next':
                nowPage++;
                break;
        }
        setListAddRemove(`.${nowOrientation} .side-section-${themeType} .side-section-page`, (nowPage - 1), 'show')
        setPageBtn();
        //가로 세로 변경 할 때 화면의 첫 화면으로 이동
    });
}

function setPageBtn(){
    if (totalPage == 1) {
        $('.side-section-' + themeType + ' .prev').removeClass('show');
        $('.side-section-' + themeType + ' .next').removeClass('show');
        // 둘다 끔
    } else {
        if (nowPage == 1) {
            // next
            $('.side-section-' + themeType + ' .prev').removeClass('show');
            $('.side-section-' + themeType + ' .next').addClass('show');
        } else if (totalPage - nowPage > 0) {
            // next prev
            $('.side-section-' + themeType + ' .prev').addClass('show');
            $('.side-section-' + themeType + ' .next').addClass('show');
        } else if (totalPage - nowPage == 0) {
            // prev
            $('.side-section-' + themeType + ' .prev').addClass('show');
            $('.side-section-' + themeType + ' .next').removeClass('show');
        }
    }
}

// 함수 정리 하고 호출 위치 선정 ..
// 대시보드가 열렸을때!
// 마우스 올렸을 경우 자동 전환 x
function setTurnLpi(){
    $('#area-lpi-section').turn({gradients: true, acceleration: true, display: 'single'});
    let page =  $("#area-lpi-section").turn("pages");
    let nowTurnPage = 1;
        setInterval(function() {
            if (!lpiHover) {
                if (page == nowTurnPage) {
                    $("#area-lpi-section").turn("page", 1);
                    nowTurnPage = 1;
                } else {
                    $('#area-lpi-section').turn('next');
                    nowTurnPage++;
                }
            }
        }, 4000);

    $("#area-lpi-section").bind("turned", function(event, page) {
        nowTurnPage = page;
    });
    $('#galmaet-lpi-section').turn({gradients: true, acceleration: true, display: 'single'});
    // setInterval(function() {
    //     let page =  $("#galmaet-lpi-section").turn("pages");
    //     if(page == nowTurnPage) {
    //         $("#galmaet-lpi-section").turn("page", 1);
    //     } else  {
    //         $('#galmaet-lpi-section').turn('next');
    //     }
    //
    //     $("#galmaet-lpi-section").bind("turned", function(event, page) {
    //         nowTurnPage = page;
    //     });
    //
    // }, 4000);
}

function setTurnLpiHover(){
    $('#area-lpi-section').hover(
        ()=>{
            lpiHover = true;
        },
        ()=>{
            lpiHover = false;
        });

}