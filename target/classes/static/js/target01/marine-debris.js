/* 전역 상수 */
const DEFAULT_SRC = `${ctxPath}/images/target01/ic_theme_debris.webp`;
const DEFAULT_TEXT = '육상기인부유쓰레기';
/* 전역 상수 끝 */

/*전역 변수*/
let Theme;
let NowPage = 1;
let TotalPage;
let CCTVId;
let Orientation;
let StartDate;
let EndDate;
/*전역 변수 끝*/

$(document).ready(() => {

    setScrollEvent();
    onClickSBtn();
    onClickDropdownBtn();
    onClickPageBtn();
    onClickCCTVBtn();
    setStartEndDate();
    setOrientation();
    onClickPopupClose();
    onClickPreparingPopup();

    initMap();
    $('.title-section').css('height', $('#header').css('height'));

    getSatelInfo();
    changeContentByDate();
    getSatelImage();
    getAvgSatelWlInfo();

    /* resize 이벤트 */
    $(window).on('resize', function () {
        setOrientation();
        // header 크기를 동적으로 조절하기 위해 사용
        $('.title-section').css('height', $('#header').css('height'));
    });
    /* resize 이벤트 끝 */
});

/* scroll 함수 */
function setScrollEvent() {
    ScrollOut({
        targets: '.content-section',
        cssProps: {
            visibleY: true,
            viewportY: true
        }
    });
    $(window).scroll(() => {
        resetDrag();
    });
}
/* scroll 함수 끝 */
/* side section */

/**
 * side section show/hidden 하는 메서드
 */
function onClickSBtn(){
    $('.side-section-btn').on('click', () => {
        $('.side-section').toggleClass('on');
        $('.zoom-control').toggleClass('on');
        $('.overviewmap-control').toggleClass('on');
        setSideBtn();
    });
}
/**
 * side section show 메서드
 */
function showSideSection() {
    // side section show
    if(!$('.side-section').hasClass('on') || !$('.side-section-btn').hasClass('on')){

        /* 대시보드 */
        $('.side-section-btn').addClass('on');
        $('.side-section').addClass('on');

        /* openlayers control */
        $('.zoom-control').addClass('on');
        $('.overviewmap-control').addClass('on');

    }
    setSideBtn();
}

/**
 * side section hidden 메서드
 */
function hiddenSideSection() {
// side section hidden
    if($('.side-section').hasClass('on') || $('.side-section-btn').hasClass('on')){

        /* 대시보드 */
        $('.side-section').removeClass('on');
        $('.side-section-btn').removeClass('on');
        $('.side-theme-section').removeClass('on');

        /* openlayers control */
        $('.zoom-control').removeClass('on');
        $('.overviewmap-control').removeClass('on');

    }
    setSideBtn();
}

function onClickDropdownBtn(){
    $(".theme-item").on('click', (e) => {

        /* dash 설정 */
        setShowHide('.dash-cover','show');

        /* Theme 설정 */
        setPageByTheme(e);

        /* dash btn 설정*/
        NowPage = 1;
        TotalPage = $(`#${Theme}-page .${Orientation} .dash-section-page`).length;
        setPageBtn();

        /* Map 설정 */
        setMapByTheme();
    });
}
// 화면이동 시 비디오 정지
function slideMonitVideo(){
    $('video').each((index, item) => {
        if (!item.paused) {
            item.pause();
        }
    });
}
/* side section 끝 */

/* common */
/**
 * 페이지 이동 버튼 클릭 이벤트 메서드
 */
function onClickPageBtn() {
    $('.page-btn').on('click', (e)=>{
        let move = $(e.currentTarget).data('move');
        switch (move){
            case 'prev':
                NowPage--;
                break;
            case 'next':
                NowPage++;
                break;
        }

        setPageBtn();
        slideMonitVideo();
        if (NowPage != 1) {
            setShowHide('.report-btn', 'show');
        } else {
            setShowHide('.report-btn', 'hide');
        }
    });
}

function setPageBtn(){
    /* 보고서 버튼 show hide */
    if (NowPage != 1) {
        setShowHide('.report-btn', 'show');
    } else {
        setShowHide('.report-btn', 'hide');
    }

    $(`#${Theme}-page .${Orientation} .dash-section-page`).each((index, item) => {
        if ($(item).data('page') == NowPage) {
            setShowHide(item, 'show');
        } else {
            setShowHide(item, 'hide');
        }
    });

    if (TotalPage == 1) {
        // 둘다 끔
        setShowHide(`#${Theme}-page .prev`, 'hide');
        setShowHide(`#${Theme}-page .next`, 'hide');
    } else {
        if (NowPage == 1) {
            // next
            setShowHide(`#${Theme}-page .prev`, 'hide');
            setShowHide(`#${Theme}-page .next`, 'show');
        } else if (TotalPage - NowPage > 0) {
            // next prev
            setShowHide(`#${Theme}-page .prev`, 'show');
            setShowHide(`#${Theme}-page .next`, 'show');
        } else if (TotalPage - NowPage == 0) {
            // prev
            setShowHide(`#${Theme}-page .prev`, 'show');
            setShowHide(`#${Theme}-page .next`, 'hide');
        }
    }
}



function setShowHide(tag, className){
    if(className == 'show') {
        $(tag).addClass('show');
        $(tag).removeClass('hide');
    } else if(className =='hide') {
        $(tag).addClass('hide');
        $(tag).removeClass('show');
    }
}

function setOrientation(){
    if (window.matchMedia('(orientation: portrait)').matches) {
        Orientation = "portrait";
        $('.side-content-section').each((index, item)=>{
            if($(item).hasClass('portrait')){
                $(item).show();
            } else {
                $(item).hide();
            }
        });
    } else {
        Orientation = "landscape";
        $('.side-content-section').each((index, item)=>{
            if($(item).hasClass('landscape')){
                $(item).show();
            } else {
                $(item).hide();
            }
        });
    }
    NowPage = 1;
    TotalPage = $(`#${Theme}-page .${Orientation} .dash-section-page`).length;
    setPageBtn();
    slideMonitVideo();
}

function onClickPopupClose() {
    $('#date-check-btn').on('click', () => {
        setShowHide('.date-check-popup', 'hide');
    });

    $('#cctv-live-btn').on('click', () => {
        setShowHide('.cctv-live-popup', 'hide');
    });
}

function onClickPreparingPopup() {
    $('.report-btn').on('click', ()=>{
        let message = `해당 서비스는 현재 데이터 제공 기관으로부터<br>
    데이터 수급이 되지않아 개발 진행중에 있습니다.<br>
        이용에 불편을 드려 죄송합니다.`;
        setPreparingPopup(message);
    });

    $('#cctv-tooltip-btn').on('click', ()=>{
    //     let message = `해당 서비스는 현재 데이터 제공 기관으로부터<br>
    // 데이터 수급이 되지않아 개발 진행중에 있습니다.<br>
    //     이용에 불편을 드려 죄송합니다.`;
    //     setPreparingPopup(message);
        setShowHide('.cctv-live-popup', 'show');
    });


}

function setPageByTheme(e){
    let message = `해당 서비스는 현재 데이터 제공 기관으로부터<br>
    데이터 수급이 되지않아 개발 진행중에 있습니다.<br>
        이용에 불편을 드려 죄송합니다.`;

    Theme = $(e.currentTarget).data('theme');
    $('.side-section-page').addClass("hide");
    $(`#${Theme}-page`).removeClass('hide');

    /* dashboard 설정 */
    hiddenSideSection();

    switch (Theme){
        case 'cctv':
            showSideSection();
            break;
        case 'satel' :
            showSideSection();
            break;
        case 'activity' :
            showSideSection();
            break;
        default :
            setPreparingPopup(message);
            break;
    }

    /* theme-item 설정 */
    $(".theme-item").each((index, item) => {
        if($(item).data('theme') == Theme){
            if(Theme == 'cctv' || Theme == 'satel'){
                $('#dropdownMenuButton1 .theme-item-img').attr('src', $(item).children()[0].src);
                $('#dropdownMenuButton1 span').html($(item).children()[1].innerHTML);
                $('#dropdownMenuButton1').addClass('on');
            }else {
                $(item).addClass('on');
                $('#dropdownMenuButton1 .theme-item-img').attr('src', DEFAULT_SRC);
                $('#dropdownMenuButton1 span').html(DEFAULT_TEXT);
                $('#dropdownMenuButton1').removeClass('on');
            }
        } else {
            $(item).removeClass('on');
        }
    });
}
/* common 끝 */

/* 시작,종료월 기본설정 */
function setStartEndDate() {
    let today = new Date();
    today.setMonth(today.getMonth() - 2);
    let setStartDate = today.toISOString().slice(0, 7);
    let setEndDate = new Date().toISOString().slice(0, 7);

    $('#datepicker-start-cctv-landscape').val(setStartDate);
    $('#datepicker-end-cctv-landscape').val(setEndDate);
    $('#datepicker-start-cctv-portrait').val(setStartDate);
    $('#datepicker-end-cctv-portrait').val(setEndDate);
    $('#datepicker-start-satel').val(setStartDate);
    $('#datepicker-end-satel').val(setEndDate);
}

function onClickCCTVBtn(){
    $('.cctv-select-btn').on('click', () => {

        slideMonitVideo();

        let startDateStr = $(`#datepicker-start-cctv-${Orientation}`).val();
        let endDateStr = $(`#datepicker-end-cctv-${Orientation} `).val();

        // 최대 12개월 검색으로 개월 초과시 팝업
        let startArr = startDateStr.split('-');
        let endArr = endDateStr.split('-');
        StartDate = new Date(startArr[0], startArr[1]);
        EndDate = new Date(endArr[0], endArr[1]);

        let diffMonth = (EndDate - StartDate) / (24 * 60 * 60 * 1000 * 30);
        if(diffMonth > 12) {
            setShowHide('.date-check-popup', 'show');
            return;
        }

        setCCTVFeature(CCTVId, startDateStr, endDateStr);
        NowPage = 1;
        setPageBtn();
        setShowHide(`#wl-table-cover-${Orientation}`, 'show');
    });
}
/* dashboard 내용 변경 함수 */
function setCCTVDetail(prop){

    /* 유출 추정량 */
    $('.cctv-weight').html(prop.totalWeight);
    $('.cctv-volume').html(prop.totalVolume);
    $('.total-active').html(prop.totalActive);
    /* 모니터링 */
    $('.carousel-inner').empty();
    $('.carousel-indicators').empty();

    for(let i = 0; i < prop.monitData.length; i++){
        let monitData = prop.monitData[i];
        let activeClass = i === 0 ? ' active' : '';

        let cctvActive = monitData.active ? '정상작동' : '작동중지';
        let videoItem = '<div class="carousel-item'
        + activeClass
        + '">'
        + '<div class="monit-video">'
        + '<video controls width="100%" height="100%" preload="auto">'
        + '<source src="'
        + `${ctxPath}/`
        + monitData.videoPath
        + '" type="video/mp4">'
        + '</video>'
        + '</div>'
        + '<div>'
        + '<table class="monit-table">'
        + '<tr>'
        + '<th>속성</th>'
        + '<th>내용</th>'
        + '</tr>'
        + '<tr>'
        + '<td>최근촬영일자</td>'
        + '<td>'
        + monitData.recordTime
        + '</td>'
        + '</tr>'
        + '<tr>'
        + '<td>작동여부</td>'
        + '<td>'
        + cctvActive
        + '</td>'
        + '</tr>';

        let indicatorItemLandscape = '<button type="button" data-bs-target="#monit-carousel-landscape" data-bs-slide-to="'
            + i
        +'" class="carousel-indicators-round '
        +activeClass
        +'"></button>';
        let indicatorItemPortrait = '<button type="button" data-bs-target="#monit-carousel-portrait" data-bs-slide-to="'
            + i
            +'" class="carousel-indicators-round '
            +activeClass
            +'"></button>';

        $('.carousel-inner').append(videoItem);
        $('.landscape .carousel-indicators').append(indicatorItemLandscape);
        $('.portrait .carousel-indicators').append(indicatorItemPortrait);
    }

    /* 수위대비 쓰레기 */
    setAmountRelativeToWaterLevelChart(`cctv-wl-chart-${Orientation}`, prop.waterLevelChartData);

    /* 최근 3년 소요예산 */
    setCostChart(`cctv-cost-chart-${Orientation}`, prop.costChartData);

}
/* dashboard 내용 변경 함수 끝 */

/* 조회시 날짜별 내용 변경 함수 */
function changeContentByDate() {
    $('#search-btn').on('click', () => {
        getSatelInfo();

        StartDate = $('#datepicker-start-satel').val();
        EndDate = $('#datepicker-end-satel').val();

        let monthDiff = getMonthDiff(StartDate, EndDate);
        if (monthDiff > 12) {
            setShowHide('.date-check-popup', 'show');
            return;
        } else {
            getAvgSatelWlInfo();
        }
    });
}

/* 날짜 차이 계산 함수 */
function getMonthDiff(StartDate, EndDate) {
    StartDate = new Date(StartDate);
    EndDate = new Date(EndDate);
    let years = EndDate.getFullYear()-StartDate.getFullYear();
    let months = EndDate.getMonth()-StartDate.getMonth();
    return years * 12 + months;
}

/* 재해쓰레기 추정량 */
function getSatelInfo() {
    StartDate = $('#datepicker-start-satel').val();
    EndDate = $('#datepicker-end-satel').val();

    $.ajax({
        url: "data/marine-debris/satel-info",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=UTF-8",
        data: {
            startDate: StartDate,
            endDate: EndDate
        },
        success: function(response) {
            let satelInfoList = response.data;
            if (satelInfoList != null){
                satelInfoList.forEach((satel) => {
                    $('.info-update-section').html('<h1 class="info-content-update">' + ymdhsFormat(satel.shotDt,'ymd') + '</h1>');
                    $('.info-content-div4').html('<h1 class="info-content-h1">' + satel.ddWeight + '</h1> <span class="info-content-span">ton</span>');
                    $('.info-content-div5').html('<h1 class="info-content-h1">' + satel.ddArea + '</h1> <span class="info-content-span">m2</span>');

                    $('.satel-shot-ymdhs').html(ymdhsFormat(satel.shotDt,'ymdhs'));
                    $('.satel-area').html(satel.ddArea + 'm2')
                })
                chartWlSatel(satelInfoList);
            } else {
                $('.info-update-section').html('<p>No data</p>');
            }
        },
        error: function(request, status, error){
            $('.info-update-section').html('<p>Error</p>');
            alert("code : " + request.status + "\n" + "message : " + request.responseText + "\n" + "error : " + error);
        }
    });
}

/* 날짜형식 변경 함수 */
function ymdhsFormat(dateParam, format) {
    let date = new Date(dateParam);

    let dateFormat = (num) => String(num).padStart(2, '0');
    let year = date.getFullYear();
    let month = dateFormat(date.getMonth() +1);
    let day = dateFormat(date.getDay());
    let hour = dateFormat(date.getHours());
    let minutes = dateFormat(date.getMinutes());

    if (format === 'ymd'){
        return `${year}.${month}.${day}`;
    } else if (format === 'ymdhs'){
        return `${year}년 ${month}월 ${day}일 ${hour}:${minutes}`;
    }
}

/* 인공위성 이미지 (수정중) */
function getSatelImage() {
    StartDate = $('#datepicker-start-satel').val();
    EndDate = $('#datepicker-end-satel').val();

    $.ajax({
        url: "data/marine-debris/satel-image",
        method: "GET",
        data: {
            startDate: StartDate,
            endDate: EndDate
        },
        success: function(response) {
            if (response) {
                let imageUrl = response.data;

                imageUrl.forEach(function(imageInfo) {
                    //let satelImg = $("<img>").attr("src", imageInfo.satelFilePath);

                    //$('.satel-image-path').attr('src' + '/' + imageUrl);
                    $('.satel-image-path').html('<img src= "' + imageUrl + '"/>');
                    $('.satel-shot-ymdhs').html(ymdhsFormat(imageInfo.shotDt, 'ymdhs'));
                    $('.satel-area').html(imageInfo.ddArea + 'm2');
                });
            } else {
                alert("이미지 없음");
                $('.satel-image-path').html('<p>No image found</p>');
            }
        },
        error: function(request, status, error) {
            $('.satel-image-path').html('<p>Error loading image</p>');
            alert("code : " + request.status + "\n" + "message : " + request.responseText + "\n" + "error : " + error);
        }
    });
}

/* 수위대비 재해쓰레기 발생량 */
function getAvgSatelWlInfo() {
    StartDate = $('#datepicker-start-satel').val();
    EndDate = $('#datepicker-end-satel').val();

    $.ajax({
        url: "data/marine-debris/wl-debris-info",
        method: "GET",
        dataType: 'json',
        data: {
            startDate: StartDate,
            endDate: EndDate
        },
        success: function(response) {
            let avgWlSatel = response.data;

            if (avgWlSatel != null) {
                chartWlSatel(avgWlSatel);
            } else {
                $('#chart-satel').html('<h5>No data</h5>');
            }
        },
        error: function(request, status, error) {
            $('.info-update-section').html('<p>Error</p>');
            alert("#code:"+request.status+"\n"+"#message:"+request.responseText+"\n"+"#error:"+error);
        }
    });
}

