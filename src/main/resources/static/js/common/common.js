/*전역 변수*/
let isPageDrag = true;
/*전역 변수 끝*/
let loadingTimeout;
$(document).on('scroll', function() {
    setScrollHeader();
});

$(document).ready(function (){
    onClickMenu();
    onClickHeaderToggleBtn();

    let url = window.location.href;
    url = url.split('/');
    switch(url[url.length - 1]){
        case 'marine-debris.do':
            setListAddRemove('.header-menu  a', 1, 'on');
            break;
        case 'marine-dust.do':
            setListAddRemove('.header-menu  a', 2, 'on');
            break;
        case 'marine-social.do':
            setListAddRemove('.header-menu  a', 3, 'on');
            break;
        case 'file-upload.do':
            setListAddRemove('.menu-list-item  a', 4, 'on');
            break;
        case 'file-upload-board.do':
            setListAddRemove('.menu-list-item  a', 5, 'on');
            break;
    }

    /* 로딩 중 표시 */
    $.ajaxSetup({
        beforeSend: function (){ //로직 수정 필요
            //전송 3초 후에 로딩바 표시
            // loadingTimeout = setTimeout(showLoading, 5000);
            /*
            var left = 0;
            var top = 0;

            if($("#div_ajax_load_image").length != 0) {
                $("#div_ajax_load_image").css({
                    "top": top+"px",
                    "left": left+"px"
                });
                $("#div_ajax_load_image").show();
            } else {
                $('body').append('' +
                    '<div id="div_ajax_load_image" style="position:absolute; top:' + top + 'px; left:' + left + 'px; width: 100%' + '; height: 100%' + '; z-index:9999; background:#00000033; filter:alpha(opacity=50); opacity:alpha*0.5; margin:auto; padding:0; ">' +
                    '<img src="../../images/common/loader.webp" style="width: 150px; height: 150px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>');
            }
             */
        },
        complete: function (){
            hideLoading();
            // $("#div_ajax_load_image").hide();
        }
    });

    /*마이페이지 사이드메뉴 함수 시작*/
    //PC
    onClickSideList(); //사이드메뉴 클릭시 강조 표시 이벤트 --수정필요
    //모바일
    onClickMobileSideMenu(); //모바일 사이드 메뉴 팝업 클릭이벤트모음

    /*마이페이지 사이드메뉴 함수 끝*/

});

/**
 * Floating Menu의 스크롤 이벤트 부여 메서드
 */
function setFMAnimate(){
    let floatPosition = parseInt($('.float-menu').css('top'), 10);

    $(window).scroll(function (){
        let currentTop = $(window).scrollTop();
        let menuTop = currentTop + floatPosition + 'px';

        $('.float-menu').stop().animate({
            'top' : menuTop
        }, 500);
    }).scroll();
}

/* Event 함수 */
/**
 * Header의 스크롤 이벤트 부여 메서드
 */
function setScrollHeader() {
    if($(window).scrollTop() > 50){
        $("#header").removeClass("header-deactive");
        $("#header").addClass("header-active");
    }else{
        $("#header").removeClass("header-active");
        $("#header").addClass("header-deactive");
    }
}

/**
 * 스크롤이 끝에 도달했을때 map의 Drag는 활성화 하고 page의 drag는 제거하는 메서드
 */
function resetDrag(){
    let scrT = $(window).scrollTop();
    let y = $(document).height() - $(window).height();

    if(scrT >= y - 50){
        $('.catch-section').css('height', '0px');
        $('#header').css('backgroundColor', 'white');
        // map 객체가 있을 경우
        if(map instanceof ol.Map) {
            // 드래그와 스크롤 활성화
            map.getInteractions().forEach((interaction)=>{
                if(interaction instanceof ol.interaction.DragPan){
                    interaction.setActive(true);
                } else if (interaction instanceof ol.interaction.MouseWheelZoom){
                    interaction.setActive(true);
                }
            });
        }
        // 모서리 라운드 제거
        $('.figure').css('border-radius', 0);
    }
}

/**
 * 메뉴 클릭 시 on 클래스를 추가하는 이벤트 메서드
 */
function onClickMenu(){
    let message = `해당 서비스는 현재 데이터 제공 기관으로부터<br>
    데이터 수급이 되지않아 개발 진행중에 있습니다.<br>
        이용에 불편을 드려 죄송합니다.`;
    $('.header-menu li').on('click', function (e){
        let idx = $(this).index();
        switch (idx){
            case 0:
                setPreparingPopup(message);
                return false;
                break;
            case 1:
                // setPreparingPopup(message);
                // return false;
                break;
            case 2:
                break;
            case 3:
                setPreparingPopup(message);
                return false;
                break;
        }
    });
}

/* Event 함수 끝 */

/* 함수 */
/**
 * tag 리스트에서 on off 처리 메서드
 * @param tag 태그의 class 이름
 * @param attr 구별하기 위한 속성 이름
 * @param value 구별하기 위한 값
 */
function setListOnOff(tag, value){
    $(tag).each((index, item) => {
        if(index == value) {
            $(item).addClass('on');
        } else {
            $(item).removeClass('on');
        }
    });
}

function setListAddRemove(tag, value, className, attrName){
    if (typeof value == "number") {
        $(tag).each((index, item) => {
            if (index == value) {
                $(item).addClass(className);
            } else {
                $(item).removeClass(className);
            }
        });
    } else {
        $(tag).each((index, item) => {
            if ($(item).attr(attrName) == value) {
                $(item).addClass(className);
            } else {
                $(item).removeClass(className);
            }
        });
    }
}

/* format에 맞추어 변경되도록 메서드 수정 */
function setDateFormat(myDate, format){
    let date = new Date(myDate);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
    const day = ('0' + date.getDate()).slice(-2);
    let dayOfWeek;
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    switch (date.getDay()){
        case 0:
            dayOfWeek = '일';
            break;
        case 1:
            dayOfWeek = '월';
            break;
        case 2:
            dayOfWeek = '화';
            break;
        case 3:
            dayOfWeek = '수';
            break;
        case 4:
            dayOfWeek = '목';
            break;
        case 5:
            dayOfWeek = '금';
            break;
        case 6:
            dayOfWeek = '토';
            break;
    }

    return `${year}.${month}.${day}(${dayOfWeek}) ${hour}:${minute}`;
}

function setUrlDateFormat(){
    let date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hour}:${minute}`;
}

function setPreparingPopup(message){
    let popMessage = `<div>${message}</div>`;

    $(".preparing-popup").addClass("active");
    $(".preparing-popup-content").html(popMessage);
    $('.preparing-popup-btn').on('click', function () {
        $(".preparing-popup").removeClass("active");
    });
}

function onClickHeaderToggleBtn(){
    $('#header-toggle-btn').on('click', function (e){
        e.preventDefault();
        $('.header-menu').toggleClass('active');
        $('.header-icon').toggleClass('active');
        $("#header").toggleClass('active');
    });
}

//로딩 표출
function showLoading(){
    var left = 0;
    var top = 0;

    if($("#div_ajax_load_image").length != 0) {
        $("#div_ajax_load_image").css({
            "top": top+"px",
            "left": left+"px"
        });
        $("#div_ajax_load_image").show();
    } else {
        $('body').append('' +
            '<div id="div_ajax_load_image" style="position:absolute; top:' + top + 'px; left:' + left + 'px; width: 100%' + '; height: 100%' + '; z-index:9999; background:#00000033; filter:alpha(opacity=50); opacity:alpha*0.5; margin:auto; padding:0; ">' +
            '<img src="../../images/common/loader.webp" style="width: 150px; height: 150px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>');
    }
}

// loading Timeout 제거 후 로딩 숨기기
function hideLoading(){
    // clearTimeout(loadingTimeout);

    $("#div_ajax_load_image").hide();
}

function showLoading(){
    let left = 0;
    let top = 0;

    if($("#div_ajax_load_image").length != 0) {
        $("#div_ajax_load_image").css({
            "top": top+"px",
            "left": left+"px"
        });
        $("#div_ajax_load_image").show();
    } else {
        $('body').append('' +
            '<div id="div_ajax_load_image" style="position:absolute; top:' + top + 'px; left:' + left + 'px; width: 100%' + '; height: 100%' + '; z-index:9999; background:#00000033; filter:alpha(opacity=50); opacity:alpha*0.5; margin:auto; padding:0; ">' +
            `<img src="${ctxPath}/images/common/loader.webp" style="width: 150px; height: 150px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>`);
    }
}

//temp 보고서
function tempReportPopup(){
    // let popMessage = `<div>${message}</div>`;

    $(".temp-report-popup").addClass("active");
    // $(".temp-report-popup-content").html("보고서 미리보기");
    $('.temp-btn-report-popup').on('click', function () {
        $(".temp-report-popup").removeClass("active");
    });
}


/* side section */

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
/* side section 끝 */


/*마이페이지 사이드 메뉴 함수 시작*/

/*사이드메뉴 클릭시 강조 표시 이벤트*/ //수정해야함
function onClickSideList() {
    $('.menu-list-item a').on('click', function() {
        $('.menu-list-item').removeClass("on ");
        $(this).closest('.menu-list-item').addClass('on');
    });
}

/*모바일 사이드 메뉴 팝업 클릭이벤트*/
function onClickMobileSideMenu(){
    //상단 메뉴 (이용현황, 데이터업로드)
    $(".mobile-top-menu").click(function () {
        $(".mobile-side-menu-data-pop-wrap").addClass("show"); //모바일 사이드메뉴 팝업 표출
        setMobilePrevShow();
    });

    //하단 메뉴 (리빙프로젝트 목록... , 데이터 업로드...)
    $(".mobile-low-menu").click(function () {
        $(".mobile-side-menu-data-pop-wrap").addClass("show"); //모바일 사이드메뉴 팝업 표출

        setMobileNextShow();
        if($(".mobile-low-menu").hasClass("status")){
            $(".status-menu").addClass("show");
            $(".upload-menu").removeClass("show");
        }else if($(".mobile-low-menu").hasClass("file-upload")){
            $(".status-menu").removeClass("show");
            $(".upload-menu").addClass("show");
        }
    });

    //팝업 이전 버튼
    $(".mobile-side-prev-btn").click(function () {
        setMobilePrevShow()
    });

    //팝업 다음 버튼
    $(".mobile-side-next-btn").click(function () {
        let selectedValue = $('input[name="top-menu"]:checked').val();
        if(selectedValue){
            setMobileNextShow();
            if(selectedValue == "status"){
                $(".status-menu").addClass("show");
                $(".upload-menu").removeClass("show");
            }else if (selectedValue == "upload"){
                $(".status-menu").removeClass("show");
                $(".upload-menu").addClass("show");
            }
        } else {
            alert("옵션을 선택하세요.");
        }

    });

    //팝업 완료 버튼
    $(".mobile-side-select-btn").click(function () {
        let selectedValue = $('input[name="upload"]:checked').val();
        if(selectedValue){
            window.location.href = "/"+selectedValue+".do";
            $(".mobile-side-menu-data-pop-wrap").removeClass("show")
            $(".mobile-top-menu").html();
            $(".mobile-low-menu").html();
        }else {
            alert("옵션을 선택하세요.");
        }

    });

    //사이드 메뉴 닫기
    $(".mobile-side-menu-close-btn").click(function (){
        $(".mobile-side-menu-data-pop-wrap").removeClass("show");
        $(".mobile-top-menu").removeClass("under-line");
        $(".mobile-low-menu").removeClass("under-line");
    })

}

//이전 버튼 눌렀을 때 발생하는 이벤트 (모바일 사이드 메뉴 팝업 1페이지 표출)
function setMobilePrevShow() {
    //이전버튼 비활성화
    $(".mobile-side-prev-btn").attr("disabled", true);
    $(".mobile-side-prev-btn").removeClass("on");
    //다음버튼 활성화
    $(".mobile-side-next-btn").attr("disabled", false);
    $(".mobile-side-next-btn").addClass("on");
    //완료버튼 비활성화
    $(".mobile-side-select-btn").attr("disabled", true);
    $(".mobile-side-select-btn").removeClass("on");
    //상위메뉴 보여주고 하위메뉴 숨김
    $(".mobile-side-top-menu").addClass("show");
    $(".mobile-side-low-menu").removeClass("show");
    //상위메뉴 언더라인 추가
    $(".mobile-top-menu").addClass("under-line");
    $(".mobile-low-menu").removeClass("under-line");
}

//다음 버튼 눌렀을 때 발생하는 이벤트 (모바일 사이드 메뉴 팝업 2페이지 표출)
function setMobileNextShow() {
    //이전버튼 활성화
    $(".mobile-side-prev-btn").attr("disabled", false);
    $(".mobile-side-prev-btn").addClass("on");
    //다음버튼 비활성화
    $(".mobile-side-next-btn").attr("disabled", true);
    $(".mobile-side-next-btn").removeClass("on");
    //완료버튼 활성화
    $(".mobile-side-select-btn").attr("disabled", false);
    $(".mobile-side-select-btn").addClass("on");
    //하위메뉴 보여주고 상위메뉴 숨김
    $(".mobile-side-low-menu").addClass("show");
    $(".mobile-side-top-menu").removeClass("show");
    //하위메뉴 언더라인 추가
    $(".mobile-low-menu").addClass("under-line");
    $(".mobile-top-menu").removeClass("under-line");
}

/*마이페이지 사이드 메뉴 함수 끝*/


/* 함수 끝 */
