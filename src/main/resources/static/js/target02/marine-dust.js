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
let lpiTurnAbled = false;

let isProcessing = false;

let isSubProcessing = false;

/*전역 변수 끝*/
$(document).ready(() => {
    /*함수 실행*/
    onClickSBtn();
    onClickSideThemeItem();
    onClickThemeItem();
    onClickPageBtn();
    onClickLkSection();

    initMap();

    setOrientation();
    setForecastPopup();
    /*함수 실행 끝*/

    // 생활지수 turn.js 적용
    setTurnLpi();

    selectDustMode();


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

    /* resize 이벤트 */
    $(window).on('resize', function () {
        setOrientation();
        totalPage = $(`.${nowOrientation} .side-section-${themeType} .side-section-page`).length;
        nowPage = 1;
        setListAddRemove(`.${nowOrientation} .side-section-${themeType} .side-section-page`, (nowPage - 1), 'show')
        setPageBtn();
    });
    /* resize 이벤트 끝 */

    $("#chk-area-aod").on('change', function (e) {
        onChangeAod();
    });

    //라이다 참고 이미지 임시 사용
    $("#temp-lidar").on('click', function (e){
        tempAddLidarImageOverlay();
    })
    $("#temp-lidar-img-close").on('click', function (e){
        tempRemoveLidarImageOverlay();
    })



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
        if(isSubProcessing){
            return
        }
        isSubProcessing=true;

        let idx = $(e.currentTarget).index();
        let isClick = $(e.currentTarget).hasClass('on');

        refreshDashBoard();


        // 이미 클릭된 상태이면 종료
        /*
        if (isClick) {
            return;
        }
        */

        refreshLayer();//전체 레이어 초기화
        //setportdust에서 초기화 진행함
        // if (portSource) { //항만 심볼 초기화
        //    portSource.clear();
        // }
        // if (portGeomSource) { //항만 심볼 초기화
        //     portGeomSource.clear();
        // }

        $(".vessel-list").removeClass("on");
        $('.side-section > div').removeClass('on');
        //!
        $('.side-section-' + themeType).addClass('show');
        // 버튼 계산 추가
        totalPage = $(`.${nowOrientation} .side-section-${themeType} .side-section-page`).length;
        // 1page로 이동
        nowPage = 1;
        setListAddRemove(`.${nowOrientation} .side-section-${themeType} .side-section-page`, (nowPage - 1), 'show')
        // 버튼 계산 추가 끝

        // on 클래스 추가 코드
        setListOnOff('.side-theme.show > .side-theme-item', idx);
        showSideSection();

        // cover show

        $(".side-section-cover").removeClass("hide");
        $(".transport-section-cover").removeClass("hide");

        //$('.switch > input').change(); //aod on/off

        cntAnimationExecuted++;

        // if ($('#chk-area-aod').is(':checked')) {
        //     $('#chk-area-aod').prop('checked', false);
        // }

        stopSliderPlay();

        switch (themeType) {
            case 'port':
                $('.temp-btn-report-popup').click();
                resetStyle(busanSource, BASIC_STYLE['busan']);

                if (portLayer.getVisible()) {
                    portLayer.setVisible(false);
                }

                if (idx == 0) {
                    setPortLocation();

                    // 미세먼지 text 변경
                    $('.side-section-' + themeType + ' .dust-type').html('미세먼지');

                    setIssueData(idx); //미세먼지 경보
                    $(".monit-item").removeClass("on"); //미세먼지 변화 슬라이더+범례 비활성화
                    dustType = 'pm10';
                    $('.preparing-popup').removeClass('on');//준비중 팝업 숨기기
                    indexOnOff(idx); //범례 onoff

                    //isupdate 부분 삭제한다고 박준태가 말했음
                    if (propHasDustData) {
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
                                isSubProcessing=false;
                            }
                        }, 500); // 0.5초 간격
                    }else{
                        setPortDust(dustType, "dustPort");
                        isSubProcessing=false;
                        LidarLayer.setVisible(true);
                    }

                    onClickPort();//항만 클릭 이벤트

                }
                if(idx == 1){
                    setPortLocation();
                    // 초미세먼지 text 변경
                    $('.side-section-' + themeType + ' .dust-type').html('초미세먼지');

                    setIssueData(idx);
                    $(".monit-item").removeClass("on");
                    dustType = 'pm25';
                    $('.preparing-popup').removeClass('on');
                    indexOnOff(idx);

                    if (propHasDustData) {
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
                                isSubProcessing=false;
                            }
                        }, 500); // 0.5초 간격
                    }else{
                        setPortDust(dustType, "dustPort");
                        isSubProcessing=false;
                        LidarLayer.setVisible(true);
                    }

                    onClickPort();//항만 클릭 이벤트

                    /*  if(clickedFeature != null){
                          setPortDetail(clickedFeature);
                      }*/
                }
                if(idx == 2){/* 탄소 배출 현황 */
                    hiddenSideSection();
                    indexOnOff(99);
                    setPortLocation();

                    $(".dust-issue").removeClass("on");
                    $(".monit-item").removeClass("on");
                    $(".dust-index-img").removeClass("on");
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
                                isSubProcessing=false;
                            }
                        }, 500); // 0.5초 간격
                    }else{
                        shipLayer.setVisible(true);
                        isSubProcessing=false;
                    }
                }
                if(idx == 3){
                    hiddenSideSection();
                    setPortLocation();
                    $(".dust-issue").removeClass("on");
                    $('.preparing-popup').removeClass('on');
                    /* 미세먼지 변화 슬라이드 표출 */
                    dustType = 'pm10';

                    //여기 날짜 geom 같이
                    // getDustDate("dustDate"); //미세먼지 변화 날짜 전체 가져오는 함수
                    // getPortGeom();
                    // setSourceFromRequest('busanWkt');  //harin 재호출XXXX
                    // $(".dust-index-img").removeClass("on");
                    $(".monit-item").addClass("on");
                    $(".monit-pm25").removeClass("on");
                    $(".monit-pm10").click();
                    // indexOnOff(0);
                    // selectDustMode();
                    // showDate();
                }
                if(idx == 5){
                    hiddenSideSection();
                    $(".dust-issue").removeClass("on");
                    $(".monit-item").removeClass("on");
                    $('.preparing-popup').removeClass('on');
                    indexOnOff(99);

                    showEffect=false;

                    tempReportPopup();
                    isSubProcessing=false;
                }


                break;
            case 'area':
                $('.temp-btn-report-popup').click();//temp
                if (aodLayer.getVisible()) {
                    aodLayer.setVisible(false);
                }
                resetStyle(busanSource, BASIC_STYLE['busan']);
                // setClickStyle();

                $(".monit-item").removeClass("on");
                $(".dust-index-img").removeClass("on");
                if (idx == 0) {
                    offAod();
                    busanLayer.set('selectable', true)
                    // 미세먼지 text 변경
                    $('.side-section-' + themeType + ' .dust-type').html('미세먼지');
                    setIssueData(idx);
                    indexOnOff(idx);

                    dustType = 'pm10';
                    if (propHasDustData) {
                        resetStyle(busanSource, setAreaStyleText);
                    } else {
                        setFeatureFromRequest(busanSource, "dustArea");
                    }
                    onClickArea();
                    /*
                    if(clickedFeature != null){
                        setAreaDetail(clickedFeature);
                    }

                     */
                }
                if(idx == 1){
                    offAod();
                    busanLayer.set('selectable', true)
                    // 초미세먼지 text 변경
                    $('.side-section-' + themeType + ' .dust-type').html('초미세먼지');
                    setIssueData(idx);
                    indexOnOff(idx);

                    dustType = 'pm25';
                    if (propHasDustData) {
                        resetStyle(busanSource, setAreaStyleText);
                    } else {
                        setFeatureFromRequest(busanSource, "dustArea");
                    }
                    onClickArea();
                    /*
                    if (clickedFeature != null) {
                        setAreaDetail(clickedFeature);
                    }

                     */
                }
                if (idx == 2) { //aod
                    busanLayer.setVisible(false);
                    busanLayer.set('selectable', false)
                    hiddenSideSection();
                }

                if(showEffect){
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
            // galmaetLayer.setVisible(true);
            if (idx == 0){
                $('.side-section-galmaet > .side-section-header > h1').html('갈맷길 미세먼지');
                setIssueData(idx);
                indexOnOff(idx);
                sideSectionCover(themeType, idx);
                dustType = 'pm10';

                setFeatureFromRequest(galmaetSource,"dustGm");
                if(showEffect&& cntAnimationExecuted == 1){
                    //cloud overlay 꺼졌는지 확인
                    //이벤트 settime 때문에 0.5초마다 재확인
                    let isCloudOverlayVisible = cloudOverlay.getVisible();
                    const checkCloudVisible = setInterval(function() {
                        isCloudOverlayVisible = cloudOverlay.getVisible();
                        if (isCloudOverlayVisible == false) {
                            clearInterval(checkCloudVisible); // 반복을 종료
                            galmaetLayer.setVisible(true);
                            // setFeatureFromRequest(galmaetSource,"dustGm");
                        }
                    }, 500); // 0.5초 간격
                }else{
                    galmaetLayer.setVisible(true);
                }

                onClickGalmaet();
                if (clickedFeature != null) {
                    setGmDetail(clickedFeature);
                }

            }
            if (idx == 1){
                $('.side-section-galmaet > .side-section-header > h1').html('갈맷길 초미세먼지');
                setIssueData(idx);
                indexOnOff(idx);
                sideSectionCover(themeType, idx);
                dustType = 'pm25';
                setFeatureFromRequest(galmaetSource,"dustGm");
                if(showEffect&& cntAnimationExecuted == 1){
                    //cloud overlay 꺼졌는지 확인
                    //이벤트 settime 때문에 0.5초마다 재확인
                    let isCloudOverlayVisible = cloudOverlay.getVisible();
                    const checkCloudVisible = setInterval(function() {
                        isCloudOverlayVisible = cloudOverlay.getVisible();
                        if (isCloudOverlayVisible == false) {
                            clearInterval(checkCloudVisible); // 반복을 종료
                            galmaetLayer.setVisible(true);
                        }
                    }, 500); // 0.5초 간격
                }else{
                    galmaetLayer.setVisible(true);
                }

                // setFeatureFromRequest(galmaetSource,"dustGm");
                onClickGalmaet();
                if (clickedFeature != null) {
                    setGmDetail(clickedFeature);
                }
            }

            break;

             */
            /*
        case 'tipoff':
            $(".monit-item").removeClass("on");
            $(".tipoff-dust-index-img").addClass("on");
            break;

             */
        }

        setPageBtn();
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

/* side section 함수 끝 */

/* theme 함수 */
/**
 * theme item 클릭 시 side theme item show 하는 메서드
 * 스타일 메뉴 등의 이벤트만 처리
 */

function onClickThemeItem() {
    $('.theme-item').on('click', handleThemeItemClick);
}


function handleThemeItemClick(e) {
    if(isProcessing) {
        return;
    }
    isProcessing = true;
    showEffect=true;
    cntAnimationExecuted=1;
    isSubProcessing=false;

    // 이벤트 핸들러를 비활성화
    $('.theme-item').off('click', handleThemeItemClick);
    offAod();
    stopSliderPlay();
    $('.temp-btn-report-popup').click();//temp
    let idx = $(e.currentTarget).index();
    let isClick = $(e.currentTarget).hasClass('on');
    $(".monit-item").removeClass("on");
    $(".dust-issue").removeClass("show");
    // $(".dust-legend-img").removeClass("on");
    // $(".tipoff-dust-index-img").removeClass("on");
    $('.preparing-popup').removeClass('on');

    //범례 초기화
    indexOnOff(99);

    // dashboard show 클래스 제거
    $('.side-content > div').removeClass('show');

    $(".side-section-cover").removeClass("hide");
    /*
    if (portSource) { //항만 심볼 초기화
        portSource.clear();
    }
    if (portGeomSource) { //항만 심볼 초기화
        portGeomSource.clear();
    }
     */
    // 이미 클릭된 상태이면 종료
    /*
    if(isClick){
        isProcessing = false; // 이 경우에도 isProcessing을 false로 리셋
        // 이벤트 핸들러를 다시 활성화
        $('.theme-item').on('click', handleThemeItemClick);
        return;
    }

     */

    themeType = $(e.currentTarget).data('theme');
    $('.side-theme-item').removeClass('on');
    // on 클래스 추가 코드
    setListOnOff('.theme-item', idx);
    setListAddRemove('.side-theme', idx, 'show');


    // $(".side-section-content").empty();
    hiddenSideSection();

    dustType = null;
    propHasDustData = false;

    //지도 컨트롤은 setThemeMap 함수에서 처리
    setThemeMap(themeType);

    // 작업 완료 후 isProcessing을 false로 설정하고 이벤트 핸들러를 다시 활성화
    setTimeout(() => {
        isProcessing = false;
        $('.theme-item').on('click', handleThemeItemClick);
    }, 1000); // 1초 정도의 딜레이

    /*

          resetStyle(busanSource, setBasicStyleText);
          selectedSource.clear();
          selectedLayer.setVisible(false);

          // if(portLayer != null) {
          //     portLayer.setVisible(false);
          // }


          if(tipoffLayer != null) {
              tipoffLayer.setVisible(false);
          }
          // busanLayer.setVisible(true); 여기!!
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

          overlay.setVisible(false);
          $('#tipoff-popup').hide();
          setThemeMap(themeType);
          //경보 데이터 호출
          if(issuePM10List==undefined || issuePM25List==undefined){
              getIssueData();
          }
  */

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
//이거를 꼭 여기서 변환해야하나??
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
        indexOnOff(0);
        dustType = 'pm10';
        getDustDate("dustDate"); //미세먼지 변화 날짜 전체 가져오는 함수
        showDate();
        //setPortDust(dustType,"dustPort");
        getPortGeom();
        // setSourceFromRequest('busanWkt');  //harin 재호출 XXX
    });

    $(".monit-pm25").on("click", function () {
        $(".monit-pm10").removeClass("on");
        $(".monit-pm25").addClass("on");
        indexOnOff(1);
        dustType = 'pm25';
        getDustDate("dustDate"); //미세먼지 변화 날짜 전체 가져오는 함수
        showDate();
        //setPortDust(dustType,"dustPort");
        getPortGeom();
        // setSourceFromRequest('busanWkt'); //harin 재호출 XXX
    });
}
/*미세먼지 변화 날짜 가져오는 함수*/
function getDustDate(key) {
    let info = BASE_URL[key];

    let dustDateUrl = "/port";

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

        stopSliderPlay()

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

        stopSliderPlay();

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
            let issueItem = `
            <div class="carousel-item ${activeClass}">
                <div class="dust-issue-text issue-dust-type">${issueDataList[i].dustType}</div>
                <div class="dust-issue-text issue-type">${issueDataList[i].issueType}</div>
                <img src="${ctxPath}/images/target02/ic_issue.webp" alt="">
                <div class="dust-issue-text issue-admdst-name">${issueDataList[i].admdstName}</div>
            </div>
        `;
            $('.carousel-inner').append(issueItem);
        }
    }else{

    }
}

/*범례 on off 함수*/
function indexOnOff(idx){
    $(".legend-img").removeClass("on");
    if(idx == 0){ //미세먼지 pm10
        $(".dust-index-img-01").addClass("on");
        // $(".dust-index-img-02").removeClass("on");
    }else if (idx == 1) { //초미세먼지 pm25
        $(".dust-index-img-02").addClass("on");
        // $(".dust-index-img-01").removeClass("on");
    } else if (idx == 2) { //aod
        // $(".legend-img").removeClass("on");
        $(".aod-dust-index-img").addClass("on");
    } else if (idx == 99) { //off
        $(".legend-img").removeClass("on");
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

function setAreaStyleText(feature){
    let property = feature.getProperties();
    let style = PM_STYLE[property[combineStrings(dustType, 'Index')]] || PM_STYLE["PROOFREADING"];
    if(selectedSource.hasFeature(feature)){
        style.setStroke(STROKE_STYLE["selected"]);
    } else {
        style.setStroke(STROKE_STYLE["basic"]);
    }

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
    // 첫 로딩 시 화면 방향 확인
    let screenHeight = $(window).height();
    if (window.matchMedia('(orientation: portrait)').matches || screenHeight <= 600) {
        nowOrientation = "portrait";
        $('.side-content').each((index, item)=>{
            if($(item).hasClass('portrait')){
                $(item).show();
            } else {
                $(item).hide();
            }
        });
    } else {
        nowOrientation = "landscape";
        $('.side-content').each((index, item)=>{
            if($(item).hasClass('landscape')){
                $(item).show();
            } else {
                $(item).hide();
            }
        });
    }
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
function setTurnLpi(){
    let turnId = ['area-lpi-section-landscape', 'galmaet-lpi-section-landscape', 'area-lpi-section-portrait', 'galmaet-lpi-section-portrait'];
    turnId.forEach((id) => {
        $(`#${id}`).turn({gradients: true, acceleration: true, display: 'single'});
        let page =  $(`#${id}`).turn("pages");
        let nowTurnPage = 1;
        setInterval(function() {
            if (lpiTurnAbled && !lpiHover) {
                if (page == nowTurnPage) {
                    $(`#${id}`).turn("page", 1);
                    nowTurnPage = 1;
                } else {
                    $(`#${id}`).turn('next');
                    nowTurnPage++;
                }
            }
        }, 4000);

        $(`#${id}`).bind("turned", function(event, page) {
            nowTurnPage = page;
        });

        $(`#${id}`).hover(
            ()=>{
                lpiHover = true;
            },
            ()=>{
                lpiHover = false;
            }
        );
        $( window ).resize( function() {
            setTimeout(function(){
                let height =  $(`#${id}`).parent().height();
                let width =  $(`#${id}`).parent().width();
                $(`#${id}`).turn('size', width, height);
            }, DELAY);
        });
    });
}

function setLpiTurn(id, able){
    $(`#${id}`).turn("disable", !able);
    lpiTurnAbled = able;
    if(able){
        $(`#${id}`).turn("page", 1);
    }
}

function onClickLkSection() {
    $('.portrait .galmaet-lk-section').on('click', () => {
        // 팝업 구현
        $('.galmaet-lk-popup').addClass('show');
    });

    $('.galmaet-lk-close-btn').on('click', () => {
        $('.galmaet-lk-popup').removeClass('show');
    });
}

function onChangeAod() {
    if ($("#chk-area-aod").is(":checked")) {
        indexOnOff(2);
        //setAodLayer();
        aodLayer.set('selectable', false);
        aodLayer.setVisible(true);
    } else {
        aodLayer.setVisible(false);
    }
}

function refreshDashBoard() {
    //dashboard header
    $(".side-section-" + themeType + " .header-name").html("")
    $(".side-section-" + themeType + " .header-date").html("")

}

function offAod(){
    if ($('#chk-area-aod').is(':checked')) {
        $('#chk-area-aod').prop('checked', false);
    }
}

function stopSliderPlay(){
    if($("#stopPlay").hasClass("on")){
        $("#stopPlay").click();
    }
}