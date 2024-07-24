/* 전역변수 시작 */
let EmdData = []; //읍면동 데이터


/*그래프*/
let graphMonth = [];
let accumUserCount = [];
let accumLpCount = [];
let activityVol = [];
let activityCountList = []
/*지도관련*/
let ActiveMap;
/* 전역변수 끝 */

$(document).ready(function () {
    /* 통신 함수 시작 */
    //공통
    getSggList();//부산시 지역구목록 불러오기
    getEmdList(); //부산시 읍면동 데이터

    //리빙프로젝트
    createLivingProject(); //리빙프로젝트 생성
    getLProjectList(); //리빙프로젝트 목록 불러오기
    lProjectDetailPage(); //리빙프로젝트 상세조회 페이지로 이동
    searchForm(); //검색기능
    //정화활동

    /* 통신 함수 끝 */


    /* 이벤트 함수 시작 */
    //리빙프로젝트
    detailSearchDropDown(); //상세검색 드롭다운
    onClickLivingProjectBtn(); //리빙프로젝트 생성하기 열고닫기
    changeSggList(); //지역구 데이터 선택 이벤트
    onClickMoreBtn(); //검색결과 더보기
    changeSggCheckbox(); //상세검색 체크박스 제어


    checkWindowSize();
    resizeEvt();
    textMaxLength();
    /* 이벤트 함수 끝 */

    /* 그래프 시작 */
    getLProjectGraph();
    /* 그래프 끝 */





});
/* 통신함수 시작 */
/*공통-부산시 지역구목록 불러오기*/
function getSggList(){
    $.ajax({
        url: "/data/sgg-list",
        type: "get",
        dataType: 'json',
        success: function (resp){
            if(resp.success){
                if (resp.data != null) {
                    console.log("getAdmsdtList success");
                    let sggData = resp.data;
                    for(let i = 0; i < sggData.length; i++) {
                        let sggName = sggData[i].admdstNm;
                        let sggId = sggData[i].id;
                        let sggNameOption= `<option value="${sggId}">${sggName}</option>`;
                        $(".sgg-select-list").append(sggNameOption);
                        let sggNameRadio = `<label><input value="${sggId}" name="sggId" type="checkbox" data-index="other" class="sgg-id"> ${sggName}</label>`;
                        $(".sgg-radio-list").append(sggNameRadio);
                    }
                }
            }
        },
        error: function (e) {
            console.log('error in getAdmsdtList');
        }

    });
}

/*부산시 읍면동 데이터*/
function getEmdList(){
    $.ajax({
        url: "/data/marine-debris/emd-list",
        type: "get",
        dataType: 'json',
        success: function (resp){
            if(resp.success){
                if (resp.data != null) {
                    console.log("getEmdList success");
                    EmdData = resp.data;

                }
            }
        },
        error: function (e) {
            console.log('error in getAdmsdtList');
        }

    });
}

/*리빙프로젝트 생성 insert*/
function createLivingProject(){
    $(".living-create-btn").click(function(e){
        e.preventDefault(); // 기본 제출 방지

        if(!$("#lp-nm").val()){
            alert('프로젝트명을 입력하세요.');
            return;
        }
        if(!$("#begin-date").val()){
            alert('활동일을 선택하세요.');
            return;
        }
        if(!$("#sgg-id").val()){
            alert('지역구를 선택하세요.');
            return;
        }
        if(!$("#emd-id").val()){
            alert('읍면동을 선택하세요.');
            return;
        }
        if(!$("#open-yn").val()){
            alert('공개여부를 선택하세요.');
            return;
        }
        if(!$("#lp-content").val()){
            alert('프로젝트 소개를 입력하세요.');
            return;
        }

        let fileInput = $("#living-file-upload-btn")[0];
        let file = fileInput.files[0];

        let form = $('#create-living-form')[0];
        let formData = new FormData(form);
        formData.append("file", file);



        $.ajax({
            url: "/data/marine-debris/living-project",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(result) {
              if(result.success == true){
                  alert("리빙프로젝트가 생성 되었습니다!");
                  console.log("리빙프로젝트 생성")
                }else {
                    alert("리빙프로젝트 생성 실패.");
                }
               location.reload();
            },
            error: function (e) {
                console.log('error in createLivingProject');
                alert("리빙프로젝트 생성 실패");
               location.reload();
            }
        });
      //  location.reload();
    })

}

/*리빙프로젝트 목록 불러오기*/
function getLProjectList(){
    $.ajax({
        url: "/data/marine-debris/living-project-info",
        type: "get",
        dataType: 'json',
        success: function (resp){
            if(resp.success){
                if (resp.data != null) {
                    console.log("getLProjectList success");
                    let recentLpData = resp.data.sixMonth;
                    let recentImgPath;
                    for (let i = 0; i < recentLpData.length; i++) {
                        if (recentLpData[i].thumbPath == null) {
                            recentImgPath = "/images/target01/lp_img_test/lp_image.webp";
                        } else {
                           // let imgPathDir = "/images/target01/lp_img_test/" + recentLpData[i].thumbPath.slice(-6);
                            recentImgPath = recentLpData[i].thumbPath + recentLpData[i].strgFileNm;
                        }
                        let lpTitle = recentLpData[i].lpNm;
                        let lpAuthor = recentLpData[i].avataNm;
                        let dataIdx = recentLpData[i].lpSeq;

                        let sixMonthLPHtml = ` <div class="recent-lp-content lp-slide-content" data-index="${dataIdx}">
                                               <img src="${ctxPath}${recentImgPath}" alt="">
                                               <div class="lp-text">
                                                  <div class="lp-title">${lpTitle}</div>
                                                  <div class="lp-author">${lpAuthor}</div>
                                               </div>
                                         </div>`;
                        $(".recent-lp-container").append(sixMonthLPHtml);
                    }

                    let allLpData = resp.data.all;
                    let imgPath;
                    for (let i = 0; i < allLpData.length; i++){
                        if (allLpData[i].thumbPath == null){
                            imgPath = "/images/target01/lp_img_test/lp_image.webp";
                        }else {
                        //    let imgPathDir = "/images/target01/lp_img_test/" + allLpData[i].thumbPath.slice(-6);
                            imgPath =  allLpData[i].thumbPath +allLpData[i].strgFileNm
                        }
                        let lpTitle = allLpData[i].lpNm;
                        let lpAuthor = allLpData[i].avataNm;
                        let dataIdx = allLpData[i].lpSeq;

                        let allLPHtml= ` <div class="all-lp-content lp-slide-content" data-index="${dataIdx}">
                                               <img src="${ctxPath}${imgPath}" alt="">
                                               <div class="lp-text">
                                                  <div class="lp-title">${lpTitle}</div>
                                                  <div class="lp-author">${lpAuthor}</div>
                                               </div>
                                         </div>`;
                        $(".all-lp-container").append(allLPHtml);

                    }


                    setRecentSlickSlide();
                    setAllSlickSlide();
                }
            }
        },
        error: function (e) {
            console.log('error in getLProjectList');
        }

    });
}


/*검색함수*/

function searchForm() {
    $(".search-btn").click(function() {
        let form = $('#search-form')[0];
        let formData = new FormData(form);


        let sggIdList = [];
        $(".sgg-id:checked").each(function() {
            sggIdList.push($(this).val());
        });

        let lPStatus = $(".living-status-list input:checked").val();


        //검색어 아무것도 입력 or 선택 안했을때 경고창
        if (sggIdList.length === 0 && !formData.get('lpNm') && !formData.get('lpContent') && lPStatus == undefined) {
            alert("검색 조건을 입력하거나 선택하여 주세요.");
            return; // 검색을 중단합니다.
        }

        //관심 지역 전체 선택했을때
        if(sggIdList[0] != "all"){
            formData.append("sggIdList", JSON.stringify(sggIdList));
        }else {
            sggIdList = [];
        }

        //활동상태 전체 선택 했을 때
        if(lPStatus != "all"){
            formData.append("lPStatus", lPStatus);
        }else{
            lPStatus = "";
        }



        let params = new URLSearchParams();
        formData.forEach((value, key) => {
            params.append(key, value);
        });


            $.ajax({
                url: '/data/marine-debris/living-project-search',
                method: 'GET',
                data: params.toString(),
                processData: false,
                contentType: false,
                success: function(resp) {
                    if(resp.data){
                        $(".living-list").removeClass("show");
                        $(".search-result-list").empty();

                        let imgPath;
                        let allLpData = resp.data;
                        $(".search-count").html("검색 결과 : 총 " + allLpData.length +"건");
                        for (let i = 0; i < allLpData.length; i++) {
                            if (allLpData[i].thumbPath == null) {
                                imgPath = "/images/target01/lp_img_test/lp_image.webp";
                            } else {
                              //  let imgPathDir = "/images/target01/lp_img_test/" + allLpData[i].thumbPath.slice(-6);
                                imgPath = allLpData[i].thumbPath + allLpData[i].strgFileNm
                            }

                            let moreContent
                            if($(".living-detail-search").hasClass("on") && i > 2){
                                moreContent = "hide";
                                $(".more-btn").addClass("show");
                            }else if(i > 5) {
                                moreContent = "hide";
                                $(".more-btn").addClass("show");
                            }else {
                                moreContent = "show"
                                $(".more-btn").removeClass("show");
                            }


                            let lpTitle = allLpData[i].lpNm;
                            let lpAuthor = allLpData[i].avataNm;
                            let dataIdx = allLpData[i].lpSeq;

                            let allLPHtml = ` <div class="search-content lp-slide-content ${moreContent}" data-index="${dataIdx}">
                                                   <img src="${ctxPath}${imgPath}" alt="">
                                                   <div class="lp-text">
                                                      <div class="lp-title">${lpTitle}</div>
                                                      <div class="lp-author">${lpAuthor}</div>
                                                   </div>
                                             </div>`;
                            $(".search-result-list").append(allLPHtml);

                            $(".search-list").addClass("show");
                        }
                    }else {
                        $(".living-list").removeClass("show");
                        $(".search-count").html("검색 결과 : 총 " + "0건");
                        $(".search-result-list").empty();
                        $(".search-list").addClass("show");
                    }
                },
                error: function(xhr, status, error) {
                    // 에러가 발생한 경우
                    console.error("검색 오류:", status, error);
                }
            });


    });

}


/* 그래프 통신 함수 시작*/
function getLProjectGraph(){
    $.ajax({
        url: "/data/marine-debris/living-project-graph-info",
        type: "get",
        dataType: 'json',
        success: function (resp){
            if(resp.success){
                if (resp.data != null) {
                    console.log("getLPAccumCount success");
                    let graphData = resp.data;
                    for(let i = 0; i < graphData.length; i++) {
                        let month = graphData[i].ratioMonth;
                        month = month.substr(5,2)+"월";
                        let userCount = graphData[i].accumUserCount;
                        let lpCount = graphData[i].lpcount;
                        let activityVolume = graphData[i].activityVO[0].clctVolumeSum;
                        let activityCount = graphData[i].activityVO[0].clctCount
                        graphMonth.push(month);
                        accumUserCount.push(userCount);
                        accumLpCount.push(lpCount);
                        activityVol.push(activityVolume);
                        activityCountList.push(activityCount);
                    }
                    setActivityCountGraph();
                    setAccumUserGraph();
                    setAccumCountGraph();
                }
            }
        },
        error: function (e) {
            console.log('error in getLPAccumCount');
        }

    });
}
/* 그래프 통신 함수 끝*/


/* 통신함수 끝*/

/* 이벤트 함수 시작 */
/*리빙프로젝트-상세검색 드롭다운*/
function detailSearchDropDown(){
    $(".living-detail-search-drop-down-btn").click(function (){
        if( $(".living-detail-search-drop-down-btn").hasClass("on")){ //열렸을때 ->닫기
            $(".living-detail-search").removeClass("on");
            $(".living-detail-search-drop-down-btn").removeClass("on");
            $(".arrow_up").removeClass("on");
            $(".arrow_down").addClass("on");
        }else {//닫혔을 때->열기
            $(".living-detail-search").addClass("on");
            $(".living-detail-search-drop-down-btn").addClass("on");
            $(".arrow_down").removeClass("on");
            $(".arrow_up").addClass("on");
        }
    })
}

/*리빙프로젝트-리빙프로젝트 생성하기 버튼 클릭 이벤트*/
function onClickLivingProjectBtn(){

    $(".living-project-btn").click(function (){
        $(".living-ratio-wrap").removeClass("show");//통계 숨기기
        $(".living-create-wrap").addClass("show");//생성하기 열기
        $(".living-left").removeClass("mobile-show");//모바일 검색,리빙프로젝트 슬라이드 영역 숨기기
        $(".living-definition-wrap").removeClass("hide");//오른쪽 해양정화 리빙 표출
        $(".mobile-living-definition-wrap").removeClass("show");//검색영역쪽에 해양정화 리빙 정의 숨기기
        $(".lp-search-btn").removeClass("on");
        $(".living-project-btn").addClass("on");
    });


    $(".living-cancel-btn").click(function (){
        $(".living-create-wrap").removeClass("show");  //생성하기 닫기
        $(".living-ratio-wrap").addClass("show");//통계 열기
        $(".living-left").removeClass("mobile-show");//모바일 검색,리빙프로젝트 슬라이드 영역 숨기기
        $(".mobile-living-definition-wrap").removeClass("show");//검색영역쪽에 해양정화 리빙 정의 숨기기
        $(".lp-search-btn").removeClass("on");//
        $(".living-project-btn").removeClass("on");//
    });

    //모바일-프로젝트 검색버튼 클릭
    $(".lp-search-btn").click(function (){
        $(".living-create-wrap").removeClass("show");  //생성하기 닫기
        $(".living-ratio-wrap").removeClass("show");//통계 숨기기
        $(".living-left").addClass("mobile-show");//검색,리빙프로젝트 슬라이드 영역 표출
        $(".living-definition-wrap").addClass("hide");//오른쪽 해양정화 리빙 정의 숨기기
        $(".mobile-living-definition-wrap").addClass("show");//검색영역쪽에 해양정화 리빙 정의 표출
        $(".lp-search-btn").addClass("on");//
        $(".living-project-btn").removeClass("on");
        $(".lp-slide-btn").trigger("click");
        //$("#recent-lp-prev").trigger("click");

    });
}

/*지역구 데이터 선택 이벤트*/
function changeSggList(){
    $(".sgg-select-list").change(function (){
        let sggId = $(this).val();
        setEmdList(sggId);
    })
}

/*지역구 데이터 선택시 지역구에 맞는 읍면동 데이터 불러오기*/
function setEmdList(sggId){
    $(".emd-select-list").empty();
    $(".emd-select-list").append(`<option value="" disabled selected>읍면동을 선택하세요</option>`);

    for(let i = 0; i < EmdData.length; i++) {
        if(EmdData[i].sggId == sggId){
            let emdName = EmdData[i].emdNm;
            let emdId = EmdData[i].emdId;
            let emdNameOption = `<option value="${emdId}">${emdName}</option>`;
            $(".emd-select-list").append(emdNameOption);
        }
    }
}


function setRecentSlickSlide(){
    $(document).on('slick', '.recent-lp-container', function (){

    });

    $('.recent-lp-container').slick({
        infinite: true,         //무한반복
        autoplay: false,          // 자동 슬라이딩 활성화
        autoplaySpeed: 1000,     // 슬라이딩 간격 (밀리초)
        slidesToShow: 3,         // 보여지는 이미지 수
        slidesToScroll: 1,       // 한 번에 스크롤되는 이미지 수
        speed: 1000,
        centerMode: false,
        prevArrow: $('#recent-lp-prev'),
        nextArrow: $('#recent-lp-next'),
        responsive: [//반응형
            {
                breakpoint: 600,
                settings: {
                   // slidesToShow: 2
                }
            }
        ]
    });


}

function setAllSlickSlide(){
    $('.all-lp-container').slick({
        infinite: true,         //무한반복
        autoplay: false,          // 자동 슬라이딩 활성화
        autoplaySpeed: 1000,     // 슬라이딩 간격 (밀리초)
        slidesToShow: 3,         // 보여지는 이미지 수
        slidesToScroll: 1,       // 한 번에 스크롤되는 이미지 수
        speed: 1000,
        centerMode: false,
        prevArrow: $('#all-lp-prev'),
        nextArrow: $('#all-lp-next'),
        responsive: [//반응형
            {
                breakpoint: 600,
                settings: {
                   // slidesToShow: 2

                }
            }
        ]
    });
}

function lProjectDetailPage(){
    $(document).on('click', '.lp-slide-content', function (){
        let index = $(this).data('index');

        window.location.href = "/living-project-detail.do?index=" + index;
    });
}

function onClickMoreBtn(){
    $('.more-btn').click(function (){
        $(".more-btn").removeClass("show");
        $(".search-content").removeClass("hide");
        $(".search-content").addClass("show");
    })
}

/*상세검색 체크박스 제어함수*/
function changeSggCheckbox(){
    //관심지역-전체 체크박스가 체크됐을 때, 나머지 체크박스를 모두 해제
    $('.sgg-radio-list input[type="checkbox"][value="all"]').change(function() {
        if ($(this).prop('checked')) {
            $('.sgg-radio-list input[type="checkbox"]').not(this).prop('checked', false);
        }
    });

    //활동상태 -전체 체크박스가 체크됐을 때, 나머지 체크박스를 모두 해제
    $('.living-status-list input[type="checkbox"][value="all"]').change(function() {
        if ($(this).prop('checked')) {
            $('.living-status-list input[type="checkbox"]').not(this).prop('checked', false);
        }
    });

    //관심지역- 다른거 누르면 전체체크박스 해제
    $(document).on('change', 'input[type="checkbox"][data-index="other"]', function (){
        if ($(this).prop('checked')) {
            $('input[type="checkbox"][value="all"]').prop('checked', false);
        }
    });

    //활동상태- 다른거 누르면 전체체크박스 해제
    $('input[type="checkbox"][name="lPStatus"]').click(function(){

        if($(this).prop('checked')){

            $('input[type="checkbox"][name="lPStatus"]').prop('checked',false);

            $(this).prop('checked',true);

        }

    });

}

/* 이벤트 함수 끝 */


/* 그래프 셋팅 함수 시작*/
//해양쓰레기 리빙 프로젝트 통계
function setActivityCountGraph() {
    let activityCountGraph = echarts.init(document.getElementById('activity-count-graph'));
    let option = {
        legend: {
            data: ['해양쓰레기 수거량', '정활 활동 횟수'],
            top: 20,
            left: '50px',
            textStyle: {
                fontFamily: 'Gong_Gothic_Medium',
                fontSize:12
            }
        },
        // x축 라벨
        xAxis: {
            data: graphMonth,
            axisLabel : {
                fontFamily: 'Gong_Gothic_Medium',
                fontSize:12

            }
        },
        yAxis: {
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: '해양쓰레기 수거량',
                type: 'bar',
                data: activityVol,
                color: 'rgb(0,32,96)',
                label: {
                    show: true,
                    position: 'top',
                    fontFamily: 'Gong_Gothic_Medium',
                    fontSize:12,
                    formatter: function(params) { //0일때 라벨 숫자 안뜨게
                        return params.value !== 0 ? params.value : '';
                    }
                }
            },
            {
                name: '정활 활동 횟수',
                type: 'bar',
                data: activityCountList, //바꾸기
                color: 'rgb(165,165,165)',
                label: {
                    show: true,
                    position: 'top',
                    fontFamily: 'Gong_Gothic_Medium',
                    formatter: function(params) { //0일때 라벨 숫자 안뜨게
                        return params.value !== 0 ? params.value : '';
                    }
                }
            },
        ],
    }

    $( window ).resize( function() {
        activityCountGraph.resize();
    });

    activityCountGraph.setOption(option);
}

// 리빙프로젝트 활동 누적회원
function setAccumUserGraph() {
    let accumUserGraph = echarts.init(document.getElementById('accum-user-graph'));
    let option = {
        // x축 라벨
        xAxis: {
            data: graphMonth,
            axisLabel : {
                interval: 0,
                fontFamily: 'Gong_Gothic_Medium',
                fontSize:10
            }
        },
        yAxis: {
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: '리빙프로젝트 활동 누적회원',
                type: 'line',
                data: accumUserCount,
                color: 'rgb(0,32,96)',
                label: {
                    show: true,
                    fontFamily: 'Gong_Gothic_Medium',
                    fontSize:10
                }
            },
        ],
    }

    $( window ).resize( function() {
        accumUserGraph.resize();
    });

    accumUserGraph.setOption(option);
}

// 리빙프로젝트 누적 개수

function setAccumCountGraph() {
    let accumCountGraph = echarts.init(document.getElementById('accum-count-graph'));
    let option = {
        // x축 라벨
        xAxis: {
            data: graphMonth,
            axisLabel : {
                interval: 0,
                fontFamily: 'Gong_Gothic_Medium',
                fontSize:10
            }
        },
        yAxis: {
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: '리빙프로젝트 누적 개수',
                type: 'line',
                data: accumLpCount,
                color: 'rgb(0,32,96)',
                label: {
                    show: true,
                    fontFamily: 'Gong_Gothic_Medium',
                    fontSize:10
                }
            },
        ],
    }

    $( window ).resize( function() {
        accumCountGraph.resize();
    });

    accumCountGraph.setOption(option);
}

/* 그래프 셋팅 함수 끝*/



function resizeEvt() {
    $(window).resize(function() {
        let width = $(window).width();
        if (width >= 768 && width <= 1349) {
            if(!$(".living-detail-search-drop-down-btn").hasClass("on")){ //검색 드롭다운 닫혔을 때->열기
                $(".living-detail-search").addClass("on");
                $(".living-detail-search-drop-down-btn").addClass("on");
                $(".arrow_down").removeClass("on");
                $(".arrow_up").addClass("on");
            }
        }

        if(width >= 768){
            if($(".lp-search-btn").hasClass("on")){
                $(".living-create-wrap").removeClass("show");  //생성하기 닫기
                $(".living-ratio-wrap").addClass("show");//통계 열기
            }
        }
    });
}


function checkWindowSize() {
    let width = window.innerWidth;
    if (width >= 768 && width <= 1349) {
        if(!$(".living-detail-search-drop-down-btn").hasClass("on")){ //닫혔을 때->열기
            $(".living-detail-search").addClass("on");
            $(".living-detail-search-drop-down-btn").addClass("on");
            $(".arrow_down").removeClass("on");
            $(".arrow_up").addClass("on");
        }
    }
}


//글자수 감지
function textMaxLength(){
    //프로젝트 명
    $("#lp-nm").keyup(function (e){
        let content = $(this).val();
        //글자수 세기
        if(content.length == 0 || content == ""){
            $(".comment_length").text('0');
        }else{
            $(".comment_length").text(content.length);
        }

        if (content.length > 20) {
            // 20자 부터는 타이핑 x
            $(this).val($(this).val().substring(0, 20));
        }
    });

    //프로젝트 명
    $("#lp-link").keyup(function (e){
        let content = $(this).val();
        //글자수 세기
        if(content.length == 0 || content == ""){
            $(".comment_length").text('0');
        }else{
            $(".comment_length").text(content.length);
        }

        if (content.length > 2000) {
            // 2000자 부터는 타이핑 x
            $(this).val($(this).val().substring(0, 2000));
        }
    });


    // 프로젝트 소개
    $("#lp-content").keyup(function (e){
        let content = $(this).val();
        //글자수 세기
        if(content.length == 0 || content == ""){
            $(".comment_length").text('0');
        }else{
            $(".comment_length").text(content.length);
        }

        if (content.length > 500) {
            // 500자 부터는 타이핑 x
            $(this).val($(this).val().substring(0, 500));
        }
    });


}