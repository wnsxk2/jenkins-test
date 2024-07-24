<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <title>Target2</title>
    <link rel="preload" href="fonts/Gong_Gothic_Medium.woff2" as="font" type="font/woff2" crossorigin="anonymous">

    <!--gridstack-->
    <link href="node_modules/gridstack/dist/gridstack.min.css" rel="stylesheet"/>
    <link href="node_modules/gridstack/dist/gridstack-extra.css" rel="stylesheet"/>
    <script src="node_modules/gridstack/dist/gridstack-all.js"></script>

    <!-- jquery -->
    <script src="assets/jquery/jquery-3.7.1.min.js"></script>
    <script src="assets/jquery/jquery-ui.js"></script>
    <link rel="stylesheet" href="assets/jquery/jquery-ui.css">

    <!-- ol -->
    <link rel="stylesheet" href="assets/ol/ol.css">
    <script src="assets/ol/ol.js"></script>

    <!-- ol-ext -->
    <%--<link rel="stylesheet" href="node_modules/ol-ext/dist/ol-ext.css">--%>
    <%--<script src="node_modules/ol-ext/dist/ol-ext.js"></script>--%>
    <link rel="stylesheet" href="assets/ol/ol-ext.css">
    <script src="assets/ol/ol-ext.js"></script>

    <!-- scroll out -->
    <script src="assets/scrollout/scroll-out.min.js"></script>

    <!--echarts-->
    <script src="assets/echarts/echarts.js"></script>

    <!--bootstrap-->
    <script src="assets/bootstrap/js/bootstrap.js"></script>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.css">

    <!-- custom css -->
    <link href="css/common/common_test.css" type="text/css" rel="stylesheet">
    <link href="css/common/header_test.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="css/target02/marine-dust.css">


    <script>
        // 새로고침 시 최상단으로 이동 (스크롤 위치 기억 안함)
        history.scrollRestoration = "manual"
        /*$(window).on('load', () => {
            $("#header").load("/header");
        });*/
    </script>
</head>
<!-- 배경 이미지 수정 필요 -->
<body style="background-color: #d7bad5">
<header id="header">
    <%@ include file="/WEB-INF/views/common/header.jsp"%>
</header>
<main>
    <div class="catch-section"></div>
    <div class="content-section" data-scroll>
        <div class="figure">
            <div class="title-section">
                <img src="${ctxPath}/images/target02/title_ic.webp" alt="" style="height: 40px; width: 40px;">
                <h1>부산시 미세먼지 모니터링 서비스</h1>
            </div>
            <div id="map" class="map-section">
                <ul class="theme-menu">
                    <li class="theme-item" data-theme="port">
                        <img alt src="${ctxPath}/images/target02/theme_port_ic.webp">
                        <span>바다좋은부산</span>
                    </li>
                    <li class="theme-item" data-theme="area">
                        <img alt src="${ctxPath}/images/target02/theme_area_ic.webp">
                        <span>살기좋은부산</span>
                    </li>
                    <li class="theme-item" data-theme="galmaet">
                        <img alt src="${ctxPath}/images/target02/theme_galmaet_ic.webp">
                        <span>걷기좋은부산</span>
                    </li>
                    <li class="theme-item" data-theme="tipoff">
                        <img alt src="${ctxPath}/images/target02/theme_tipoff_ic.webp">
                        <span>시민 제보</span>
                    </li>
                </ul>

                <div class="side-section">
                    <div class="side-section-cover active">
                        <div class="side-section-cover-content">
                            <div class="side-section-text"></div>
                            <div class="side-section-img"></div>
                            <div>선택해 주세요.</div>
                        </div>

                    </div>

                    <div class="ship-ratio-cover active2">
                        <div class="ship-ratio-cover-content" >
                            <div>
                                위의 그래프에서 조회할
                            </div>
                            <img src="${ctxPath}/images/target02/ship_ratio_cover_img.webp">
                            <div>
                                입출항 선박 정보를 선택해주세요.
                            </div>
                        </div>
                    </div>
                    <!--바다좋은 부산-->
                    <div class="side-section-port">
                        <div class="side-section-header">
                            <h1 class="side-section-port-title"></h1>
                            <span id="port-title-name" style="color: #595959;font-size: 20px;"></span>
                            <span id="dust-date" class="side-section-date"></span>
                        </div>
                        <div class="side-section-content">
                            <div class="side-section-front">
                                <!-- 버튼 -->
                                <button id="dust-next" class="page-btn" move="next">
                                    <img alt src="${ctxPath}/images/target02/next_btn.webp">
                                </button>
                                <div class="dust-board" style="height: 20vh;">
                                    <div class="dust-board-title">
                                        <span class="port-name"></span>
                                    </div>
                                    <table class="dust-board-01 dust-board-content"
                                           style="top: 0px;bottom: 0px;min-height: 130px;">
                                        <tr>
                                            <th>구분</th>
                                            <th>정보</th>
                                        </tr>
                                        <tr>
                                            <th>측정소 주소</th>
                                            <th id="port-addr"></th>
                                        </tr>
                                        <tr>
                                            <th>설치년도</th>
                                            <th id="port-year"></th>
                                        </tr>
                                        <tr>
                                            <th>측정항목</th>
                                            <th id="port-item"></th>
                                        </tr>
                                    </table>
                                </div>
                                <div class="dust-board dust-board-table" style="height: 18vh">
                                    <div class="dust-board-table-01">
                                        <div class="dust-board-title">
                                            <span class="port-dust-index-title"></span>
                                        </div>
                                        <table class="dust-board-02 dust-board-content dust-now-table">
                                            <tr>
                                                <th>어제
                                                    <div class="yesterday-date"></div>
                                                </th>
                                                <th>오늘
                                                    <div class="today-date"></div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <img alt class="yesterday-img" src="">
                                                    <span class="yesterday-pm-index"></span>
                                                </th>
                                                <th>
                                                    <img class="today-img" alt src="">
                                                    <span class="today-pm-index"></span>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="dot-line"></div>
                                    <div class="dust-board-table-02">
                                        <div class="forecast-container">
                                            <div class="dust-board-title">
                                                <span class="">부산시 예보</span>
                                            </div>
                                            <div class="forecast-info">
                                                <img src="${ctxPath}/images/target02/forecast_info.webp">
                                            </div>
                                            <div class="forecast-content">
                                                '부산시 예보'는 환경부 국립환경과학원에서 매일 4회(05시, 11시, 17시, 23시) 기준으로 발표하는 예보자료입니다.
                                            </div>
                                        </div>

                                        <table class="dust-board-02 dust-board-content dust-forecast-table">
                                            <tr>
                                                <th>내일
                                                    <div class="tomorrow-date"></div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <img class="forecast-img" alt src="">
                                                    <span class="forecast-pm-index"></span>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="dust-board">
                                    <div class="dust-board-title dust-chart-header">
                                        <span class="port-dust-graph-title"></span>
                                        <img src="${ctxPath}/images/target02/dust_chart_legend.webp" alt="">
                                    </div>
                                    <div id="dust-chart" style="height: 240px;"></div>
                                    <table class="dust-board-03 dust-board-content">
                                        <tr>
                                            <th>구분</th>
                                            <th>
                                                <div>최저값</div>
                                            </th>
                                            <th>
                                                <div>평균값</div>
                                            </th>
                                            <th>
                                                <div>최고값</div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <div class="dust-name"></div>
                                                <div class="dust-eng-name"></div>
                                            </th>
                                            <th>
                                                <span class="dust-min"></span>
                                                <div class="dust-min-date"></div>
                                            </th>
                                            <th>
                                                <span class="dust-avg"></span>
                                            </th>
                                            <th>
                                                <span class="dust-max"></span>
                                                <div class="dust-max-date"></div>
                                            </th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="side-section-back">
                                <!-- 버튼 -->
                                <button id="dust-prev" class="page-btn" move="prev">
                                    <img alt src="${ctxPath}/images/target02/prev_btn.webp">
                                </button>
                                <div class="dust-board dust-ship-board">
                                    <div class="dust-board-title dust-ship-title">
                                        <span></span>
                                    </div>
                                    <div id="total-chart" class="total-chart"></div>
                                </div>
                                <div class="dust-board dust-ratio-board">
                                    <div class="dust-board-title dust-ship-count">
                                        <span></span>
                                    </div>
                                    <div id="ship-chart" class="ship-chart"></div>
                                    <!-- css 클래스로 변경 필요 -->
                                    <div class="ship-ratio-chart-container">
                                        <div id="transport-chart" class="transport-chart">
                                        </div>
                                        <table class="vessel-board">
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--살기좋은 부산-->
                    <div class="side-section-area">
                        <div class="side-section-header">
                            <h1>부산시 미세먼지</h1>
                            <span style="color: #595959;font-size: 20px;"></span>
                            <span class="side-section-date"></span>
                        </div>
                        <div class="side-section-content">
                            <div class="dust-board" style="height: 22vh;">
                                <div class="dust-board-title">
                                    <span id="area-name">거주지역 미세먼지 생활지수</span>
                                    <div style="display: flex;justify-content: space-evenly;margin: 8px 0;">
                                        <div class="dust-board-04">
                                            <span class="vent-title" >환기지수</span>
                                            <img class="vent-img" src="" alt="">
                                            <span class="vent-index">괜찮아요</span>
                                        </div>
                                        <div class="dust-board-04">
                                            <span class="walk-title">산책지수</span>
                                            <img class="walk-img" src="" alt="">
                                            <span class="walk-index">매우나빠요</span>
                                        </div>
                                        <div class="dust-board-04">
                                            <span class="laundry-title">세탁지수</span>
                                            <img class="laundry-img" src="" alt="">
                                            <span class="laundry-index" >나빠요</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="dust-board dust-board-table" style="height: 19vh;">
                                <div class="dust-board-table-01">
                                    <div class="dust-board-title">
                                        <span class="dust-table-title"></span>
                                    </div>
                                    <table class="dust-board-02 dust-board-content dust-now-table">
                                        <tr>
                                            <th>어제
                                                <div class="yesterday-date"></div>
                                            </th>
                                            <th>오늘
                                                <div class="today-date"></div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <img alt class="yesterday-img" src="">
                                                <span class="yesterday-pm-index"></span>
                                            </th>
                                            <th>
                                                <img class="today-img" alt src="">
                                                <span class="today-pm-index"></span>
                                            </th>
                                        </tr>
                                    </table>
                                </div>
                                <div class="dot-line"></div>
                                <div class="dust-board-table-02">
                                    <div class="forecast-container">
                                        <div class="dust-board-title">
                                            <span class="">부산시 예보</span>
                                        </div>
                                        <div class="forecast-info">
                                            <img src="${ctxPath}/images/target02/forecast_info.webp">
                                        </div>
                                        <div class="forecast-content">
                                            '부산시 예보'는 환경부 국립환경과학원에서 매일 4회(05시, 11시, 17시, 23시) 기준으로 발표하는 예보자료입니다.
                                        </div>
                                    </div>

                                    <table class="dust-board-02 dust-board-content dust-forecast-table">
                                        <tr>
                                            <th>내일
                                                <div class="tomorrow-date"></div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <img class="forecast-img" alt src="">
                                                <span class="forecast-pm-index"></span>
                                            </th>
                                        </tr>
                                    </table>
                                </div>
                                <%--    <div class="dust-board-table-02">
                                        <div class="dust-board-title">
                                            <span class="">부산시 예보</span>
                                        </div>
                                        <table class="dust-board-02 dust-board-content dust-forecast-table">
                                            <tr>
                                                <th>내일
                                                    <div class="tomorrow-date"></div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <img class="forecast-img" alt src="">
                                                    <span class="forecast-pm-index"></span>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>--%>
                            </div>
                            <div class="dust-board" style="height: 37vh;">
                                <div class="dust-board-title dust-chart-header">
                                    <span class="dust-chart-title">거주지역 미세먼지 변화</span>
                                    <img src="${ctxPath}/images/target02/dust_chart_legend.webp" alt="">
                                </div>
                                <div id="dust-chart01" style="height: 22vh;"></div>
                                <table class="dust-board-03 dust-board-content">
                                    <tr>
                                        <th>구분</th>
                                        <th>
                                            <div>최저값</div>
                                        </th>
                                        <th>
                                            <div>평균값</div>
                                        </th>
                                        <th>
                                            <div>최고값</div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <div class="dust-name"></div>
                                            <div class="dust-eng-name"></div>
                                        </th>
                                        <th>
                                            <span class="dust-min"></span>
                                            <div class="dust-min-date"></div>
                                        </th>
                                        <th>
                                            <span class="dust-avg"></span>
                                        </th>
                                        <th>
                                            <span class="dust-max"></span>
                                            <div class="dust-max-date"></div>
                                        </th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!--걷기좋은 부산-->
                    <div class="side-section-galmaet">
                        <div class="side-section-header">
                            <h1>갈맷길 미세먼지</h1>
                            <span style="color: #595959;font-size: 20px;"></span>
                            <span class="side-section-date"></span>
                        </div>
                        <div class="side-section-content">
                            <div class="dust-board" style="height: 22vh;">
                                <div class="dust-board-title">
                                    <span id="galmaet-name">제1-1구간 미세먼지 생활지수</span>
                                    <div style="display: flex;justify-content: space-evenly;margin: 8px 0;">
                                        <div class="dust-board-04">
                                            <span class="pm10-title">미세먼지</span>
                                            <img class="pm10-img" src="" alt="">
                                            <span class="pm10-index">괜찮아요</span>
                                        </div>
                                        <div class="dust-board-04">
                                            <span class="pm25-title">환기지수</span>
                                            <img class="pm25-img" src="" alt="">
                                            <span class="pm25-index">매우나빠요</span>
                                        </div>
                                        <div class="dust-board-04">
                                            <span class="walk-title">산책지수</span>
                                            <img class="walk-img" src="" alt="">
                                            <span class="walk-index" >나빠요</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="dust-board" style="height: 57.5vh;">
                                <div class="dust-board-title">
                                    <span class="dust-table-title">제1-1구간 코스 정보 및 주변 볼거리</span>
                                </div>
                                <table class="dust-board-03 galmaet-table">
                                    <colgroup>
                                        <col style="width : 20%;">
                                        <col style="width : 80%;">
                                    </colgroup>
                                    <tr>
                                        <th>거리</th>
                                        <td class="galmaet-range">11.5km</td>
                                    </tr>
                                    <tr>
                                        <th>난이도</th>
                                        <td class="galmaet-degree">중</td>
                                    </tr>
                                    <tr>
                                        <th>코스 요약</th>
                                        <td class="galmaet-course">임랑해수욕장-칠암파출소-부경대학교 수산과학연구소-일광해수욕장-기장체육관-기장군청</td>
                                    </tr>
                                </table>
                                <div class="galmaet-slider">
                                    <img src="" alt="">
                                    <span>일광 해수욕장</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- side-theme-menu -->
                    <ul class="side-theme">
                        <li class="side-theme-item" type="PM10">
                            <img src="${ctxPath}/images/target02/theme_pm10_ic.webp">
                            <span>미세먼지</span>
                        </li>
                        <li class="side-theme-item" type="PM25">
                            <img src="${ctxPath}/images/target02/theme_pm25_ic.webp">
                            <span>초미세먼지</span>
                        </li>
                        <li class="side-theme-item" type="C">
                            <img src="${ctxPath}/images/target02/theme_ship_ic.webp">
                            <span>선박탄소배출 현황</span>
                        </li>
                        <li class="side-theme-item" type="Monit">
                            <img src="${ctxPath}/images/target02/theme_dust_slide_ic.webp">
                            <span>미세먼지 변화</span>
                        </li>
                        <ul class="monit-item">
                            <li class="monit-dust monit-pm10 on">미세먼지</li>
                            <li class="monit-dust monit-pm25">초미세먼지</li>
                        </ul>
                    </ul>
                    <ul class="side-theme">
                        <li class="side-theme-item" type="PM10">
                            <img src="${ctxPath}/images/target02/theme_pm10_ic.webp">
                            <span>미세먼지</span>
                        </li>
                        <li class="side-theme-item" type="PM25">
                            <img src="${ctxPath}/images/target02/theme_pm25_ic.webp">
                            <span>초미세먼지</span>
                        </li>
                    </ul>
                    <ul class="side-theme">
                        <li class="side-theme-item" type="PM10">
                            <img src="${ctxPath}/images/target02/theme_pm10_ic.webp">
                            <span>미세먼지</span>
                        </li>
                        <li class="side-theme-item" type="PM25">
                            <img src="${ctxPath}/images/target02/theme_pm25_ic.webp">
                            <span>초미세먼지</span>
                        </li>
                    </ul>
                    <!-- side-section-button -->
                    <button class="side-section-btn"></button>
                    <!--미세,초미세먼지 범례-->
                    <div class="dust-index-img-section">
                        <img class="dust-index-img dust-index-img-01" src="../../images/target02/pm10_legend.webp">
                        <img class="dust-index-img dust-index-img-02" src="../../images/target02/pm25_legend.webp">
                    </div>
                    <!--미세먼지 경보-->
                    <div id="carouselRide" class="dust-issue carousel slide" data-bs-ride="true">
                        <div class="carousel-inner">
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselRide" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselRide" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <!--시민제보 미세먼지 범례 (나중에 이미지 변경해야함)-->
                <div class="tipoff-dust-index-img-section">
                    <img class="tipoff-dust-index-img" src="${ctxPath}/images/target02/tipoff_legend.webp" alt="" style="width: 170px;">
                    <img class="tipoff-dust-index-img" src="${ctxPath}/images/target02/pm10_legend.webp">
                </div>

                <!--미세먼지변화 슬라이더-->
                <div class="dust-slider-section monit-item">
                    <div class="dust-slider-btn-container">
                        <button class="prev-date-btn dust-slider-btn">◀</button>
                        <div class="dust-date"></div>
                        <button class="next-date-btn dust-slider-btn">▶</button>
                    </div>
                    <div class="play-container">
                        <div class="slider-btn">
                            <button class="play play-btn" title="play" id="startPlay" >▶</button>
                            <button class="paused play-btn" title="paused" id="stopPlay" >||</button>
                        </div>

                        <div id="dust-slider" class="slider-bar"></div>
                    </div>
                    <div class="slider-time"></div>
                </div>
                <div class="slider-dust-index-img-section monit-item">
                    <img class="slider-dust-index-img slider-dust-index-img-01" src="${ctxPath}/images/target02/pm10_legend.webp">
                    <img class="slider-dust-index-img slider-dust-index-img-02" src="${ctxPath}/images/target02/pm25_legend.webp">
                </div>
            </div>
        </div>
    </div>

    <div id="tipoff-popup">
        <div class="tipoff-popup-title">
            시민 제보 정보
        </div>
    </div>
    <div id="gm-popup">
        <div class="gm-popup-title">
        </div>
        <div class="gm-popup-content">
        </div>
    </div>
</main>
<script src="js/target02/marine-dust.js"></script>
</body>
<!-- custom js -->
<script src="js/common/common.js"></script>
<script src="js/common/common-map.js"></script>
<script src="js/common/string-util.js"></script>
<script src="js/target02/marine-dust-map.js"></script>
<script src="js/target02/marine-dust-chart.js"></script>
</html>