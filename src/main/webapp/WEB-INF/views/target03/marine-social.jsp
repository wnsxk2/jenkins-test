<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Target3</title>
    <link rel="preload" href="fonts/Gong_Gothic_Medium.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <!-- jquery -->
    <script src="assets/jquery/jquery-3.7.1.min.js"></script>

    <!-- ol -->
    <script src="assets/ol/ol.js"></script>
    <link rel="stylesheet" href="assets/ol/ol.css">

    <!-- scroll out -->
    <script src="assets/scrollout/scroll-out.min.js"></script>

    <!--echarts-->
    <script src="assets/echarts/echarts.js"></script>

    <!--turn-->
    <script src="assets/turn/turn.js"></script>

    <!--bookblock-->
<%--    <script src="assets/bookblock/bookblock.js"></script>--%>
<%--    <link rel="stylesheet" href="assets/bookblock/bookblock.css">--%>

    <!-- custom css -->
    <link rel="stylesheet" href="css/common/common.css">
    <link rel="stylesheet" href="css/common/header.css">
    <link href="css/target03/marine_social.css" type="text/css" rel="stylesheet">

    <script>
        // 새로고침 시 최상단으로 이동 (스크롤 위치 기억 안함)
        history.scrollRestoration = "manual"

        $(document).ready(() => {

            // setMap();
            ScrollOut({
                targets: '.content-section',
                cssProps: {
                    visibleY: true,
                    viewportY: true
                }
            });
            // header 크기를 동적으로 조절하기 위해 사용
            $('.title-section').css('height', $('#header').css('height'));
            window.addEventListener('resize', function () {
                $('.title-section').css('height', $('#header').css('height'));
            });

            $(window).scroll(() => {
                // 메서드 명 변경 예정
                resetDrag();
            });
        });

    </script>
</head>
<body>
<header id="header" class="header">
    <%@ include file="/WEB-INF/views/common/header.jsp" %>
</header>
<main>
    <div style="height: 500px;"></div>
    <div class="content-section" data-scroll>
        <div class="figure">
            <div class="title-section">
                <img class="title-img" src="${ctxPath}/images/target03/title_ic.webp" alt="">
                <span class="title-text">부산시 지역 해양산업 이슈 분석 서비스</span>
            </div>
            <section id="map" class="map-section">
                <div style="position: absolute;right: 0;top: 4px;bottom: 4px;background-color: #ffffff;width: 33vw;z-index: 999;border: 1px solid black;">
                    <div style="height: 8%; width: 100%;background:dimgray;">

                    </div>
                    <div style="height: calc(100% - 8%);width: 100%;display: flex; gap: 1vh; flex-direction: column; padding: 1vh;">
                        <div style="width: 100%;height: 50%; display: flex; border: 1px solid black; padding: 1vh; gap: 1vh">
                            <div style="background: lightcoral; height: 100%; /*width: 60%;*/ flex: 2;">
                                <div id="bb-bookblock" style="width: 100%; height: 100%;">
                                    <img class="area-lpi-img1" src="${ctxPath}/images/target02/test1.png" alt="" style="width: 100%; height: 100% ">
                                    <img class="area-lpi-img2" src="${ctxPath}/images/target02/test2.png" alt="" style="width: 100%; height: 100% ">
                                    <img class="area-lpi-img3" src="${ctxPath}/images/target02/test3.png" alt="" style="width: 100%; height: 100% ">
                                </div>
                            </div>
                            <div style=" height: 100%; /*width: 40%;*/display: flex; flex-direction:column;gap:1vh; flex: 1">
                                <div style="width: 100%; /*height: 65%;*/ border: 1px solid black; padding: 1vh; display: flex; flex-direction: column; gap: 1vh; flex: 2">
                                    <span style="font-size: 0.8vw;">거주지역 미세먼지 지수</span>
                                    <div style="border: 2px solid rgb(44, 173, 228);display: flex;width: 100%;height: 45%;padding: 0.5vh;align-items: center;    border-radius: 8px;">
                                        <div style="position: relative;width: 33%;height: 0;padding-top: 33%;overflow: hidden;">
                                            <img src="/images/target02/lpi_dust_good.webp" alt="" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;">
                                        </div>
                                        <div style="display: flex; flex-direction: column; height: 100%;width: 67%;align-items: center;justify-content: center;">
                                            <span style="font-size: 0.6vw;">어제 (06월 29일)</span>
                                            <span style="font-size: 1vw;">매우나빠요</span>
                                        </div>
                                    </div>
                                    <div style="border: 2px solid rgb(44, 173, 228);display: flex;width: 100%;height: 45%;padding: 0.5vh;align-items: center;    border-radius: 8px;">
                                        <div style="position: relative;width: 33%;height: 0;padding-top: 33%;overflow: hidden;">
                                            <img src="/images/target02/lpi_dust_good.webp" alt="" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;">
                                        </div>
                                        <div style="display: flex; flex-direction: column; height: 100%;width: 67%;align-items: center;justify-content: center;">
                                            <span style="font-size: 0.6vw;">어제 (06월 29일)</span>
                                            <span style="font-size: 1vw;">매우나빠요</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 100%;/*height: 35%;*/ border: 1px solid black;padding: 1vh; display: flex; flex-direction: column; gap: 1vh; flex: 1;">
                                    <span style="font-size: 0.8vw;">부산시 예보 지수</span>
                                    <div style="border: 2px solid rgb(44, 173, 228); display: flex; width: 100%;padding: 0.5vh;    border-radius: 8px;align-items: center;">
                                        <div style="position: relative;width: 33%;height: 0;padding-top: 33%;overflow: hidden;">
                                            <img src="/images/target02/lpi_dust_good.webp" alt="" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;">
                                        </div>
                                        <div style="display: flex; flex-direction: column; height: 100%;width: 67%;align-items: center;justify-content: center;">
                                            <span style="font-size: 0.6vw;">어제 (06월 29일)</span>
                                            <span style="font-size: 1vw;">매우나빠요</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%;height: 50%;background: lightgray;">

                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</main>
</body>
<script>
    // let modalChart = echarts.init(document.getElementById('chart'));
    let option = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: 1048, name: 'Search Engine'},
                    {value: 735, name: 'Direct'},
                    {value: 580, name: 'Email'},
                    {value: 484, name: 'Union Ads'},
                    {value: 300, name: 'Video Ads'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // modalChart.setOption(option);
    // $('#turn').turn({gradients: true, acceleration: true, display: 'single'});
    // $(function() {
    //     Test.init();
    //     $('#bb-bookblock a').click(function() {
    //         Test.nextFlip();
    //     });
    // });

    var Test = {
        /**
         * initialize
         */
        init : function() {
            $bookBlock = $('#bb-bookblock');

            $bookBlock.bookblock({
                // vertical or horizontal flip
                // 수평 또는 수직 flip
                orientation : 'vertical',

                // ltr (left to right) or rtl (right to left)
                // 기본방향 좌우 또는 우좌 설정
                direction : 'ltr',

                // speed for the flip transition in ms.
                // flip 전환 속도 설정
                speed       : 1000,

                // easing for the flip transition.
                // flip 시, easing 옵션(CSS3 옵션) (ease-in, ease-out, ease-in-out)
                easing      : 'ease-in-out',

                // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
                // 플립시 가상 그림자 설정
                shadows     : true,

                // opacity value for the "shadow" on both sides (when the flipping page is over it).
                // value : 0.1 - 1
                // 사이드 shadow 옵션
                shadowSides : 0.2,

                // opacity value for the "shadow" on the flipping page (while it is flipping).
                // value : 0.1 - 1
                // shadow 플립 옵션
                shadowFlip  : 0.1,

                // if we should show the first item after reaching the end.
                // 마지막 페이지일 경우, 첫 페이지로 이동여부 설정
                circular    : true,

                // if we want to specify a selector that triggers the next() function. example: '#bb-nav-next'.
                // jQuery의 next() 함수에 대한 selector 설정
                nextEl      : '',

                // if we want to specify a selector that triggers the prev() function.
                // jQuery의 prev() 함수에 대한 selector 설정
                prevEl      : '',

                // If true it overwrites the circular option to true!
                // 자동 롤링 설정
                autoplay        : false,

                // time (ms) between page switch, if autoplay is true.
                // autoplay가 true일 경우 페이지 전환 속도
                interval        : 3000,

                // callback after the flip transition.
                // page is the current item's index.
                // isLimit is true if the current page is the last one (or the first one).
                // flip 이후 callback 함수
                onEndFlip   : function( page, isLimit ) { return false; },

                // callback before the flip transition.
                // page is the current item's index.
                // flip 이전 callback 함수
                onBeforeFlip: function( page ) { return false; }
            });
        },
        /**
         * 다음 플립으로 이동
         */
        nextFlip : function() {
            $bookBlock.bookblock('next');
        }
    };

</script>
<!-- custom js -->
<script src="js/common/common.js"></script>
<script src="js/common/string-util.js"></script>
</html>
