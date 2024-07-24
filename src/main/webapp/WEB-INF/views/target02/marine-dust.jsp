<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
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
    <script src="node_modules/ol-ext/dist/ol-ext.js"></script>

    <!-- scroll out -->
    <script src="assets/scrollout/scroll-out.min.js"></script>

    <!--echarts-->
    <script src="assets/echarts/echarts.js"></script>

    <!--bootstrap-->
    <script src="assets/bootstrap/js/bootstrap.js"></script>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.css">

    <!--turn-->
    <script src="assets/turn/turn.js"></script>

    <!-- custom css -->
    <link rel="stylesheet" href="css/common/common.css">
    <link rel="stylesheet" href="css/common/header.css">
    <link rel="stylesheet" href="css/target02/marine_dust.css">


    <script>
        // 새로고침 시 최상단으로 이동 (스크롤 위치 기억 안함)
        history.scrollRestoration = "manual"
    </script>

</head>
<body>
<header id="header" class="header">
    <%@ include file="/WEB-INF/views/common/header.jsp" %>
</header>
<main>
    <div class="catch-section"></div>
    <div class="content-section" data-scroll>
        <div class="figure">
            <div class="title-section">
                <img class="title-img" src="${ctxPath}/images/target02/ic_title.webp" alt="">
                <span class="title-text">부산시 미세먼지 모니터링 서비스</span>
            </div>
            <div id="map" class="map-section">
                <div class="galmaetgil-overlay" id="galmaetgil-overlay"></div>
                <div id="temp-lidar-img" style="display: none">
                    <a id="temp-lidar-img-close" style="position: absolute;z-index: 10;background-color: white;cursor: pointer;width: 20px;text-align: center;right: 0px;">X</a>
                    <img src="${ctxPath}/images/target02/temp_img_lidar.png"  style="width:400px">
                </div>
                <div class="menu-section">

                    <!-- theme-menu -->
                    <ul class="theme-menu">
                        <li class="theme-item" data-theme="port">
                            <img alt src="${ctxPath}/images/target02/ic_theme_port.webp">
                            <span>바다좋은부산</span>
                        </li>
                        <li class="theme-item" data-theme="area">
                            <img alt src="${ctxPath}/images/target02/ic_theme_area.webp">
                            <span>살기좋은부산</span>
                        </li>
                        <li class="theme-item" data-theme="galmaet">
                            <img alt src="${ctxPath}/images/target02/ic_theme_galmaet.webp">
                            <span>걷기좋은부산</span>
                        </li>
                        <li class="theme-item" data-theme="tipoff">
                            <img alt src="${ctxPath}/images/target02/ic_theme_tipoff.webp">
                            <span>시민 제보</span>
                        </li>
                    </ul>

                    <!-- side-theme-menu -->
                    <div class="side-theme-section">
                        <ul class="side-theme">
                            <li class="side-theme-item" id="port-pm10">
                                <img src="${ctxPath}/images/target02/ic_theme_pm10.webp">
                                <span>미세먼지</span>
                            </li>
                            <li class="side-theme-item" id="port-pm25">
                                <img src="${ctxPath}/images/target02/ic_theme_pm25.webp">
                                <span>초미세먼지</span>
                            </li>
                            <li class="side-theme-item" id="port-ship">
                                <img src="${ctxPath}/images/target02/ic_theme_ship.webp">
                                <span>선박탄소배출 현황</span>
                            </li>
                            <li class="side-theme-item" id="port-slide">
                                <img src="${ctxPath}/images/target02/ic_theme_dust_slide.webp">
                                <span>미세먼지 변화</span>
                            </li>
                            <ul class="monit-item">
                                <li class="monit-dust monit-pm10 on" id="port-slide-pm10">미세먼지</li>
                                <li class="monit-dust monit-pm25" id="port-slide-pm25">초미세먼지</li>
                            </ul>
                            <li class="side-theme-item" id="port-report">
                                <img src="${ctxPath}/images/common/ic_temp_report.webp">
                                <span>보고서 발행</span>
                            </li>
<%--                            <ul>--%>
<%--                                <li class="temp-side-theme-item" id="temp-lidar">라이다 참고 이미지</li>--%>
<%--                            </ul>--%>
                        </ul>

                        <ul class="side-theme">
                            <li class="side-theme-item" id="area-pm10">
                                <img src="${ctxPath}/images/target02/ic_theme_pm10.webp">
                                <span>미세먼지</span>
                            </li>
                            <li class="side-theme-item" id="area-pm25">
                                <img src="${ctxPath}/images/target02/ic_theme_pm25.webp">
                                <span>초미세먼지</span>
                            </li>

                            <li class="side-theme-item" id="area-aod">
                                <span>AOD정보</span>
                                <label class="switch" for="chk-area-aod">
                                    <input type="checkbox" id="chk-area-aod">
                                    <span class="slider round"></span>
                                </label>
                            </li>

                        </ul>
                        <!-- 갈맷길 미세먼지/초미세먼지 메뉴 삭제
                        <ul class="side-theme">
                            <li class="side-theme-item">
                                <img src="${ctxPath}/images/target02/ic_theme_pm10.webp">
                                <span>미세먼지</span>
                            </li>
                            <li class="side-theme-item">
                                <img src="${ctxPath}/images/target02/ic_theme_pm25.webp">
                                <span>초미세먼지</span>
                            </li>
                        </ul>
                        -->
                    </div>
                </div>

                <div class="side-section">
                    <div class="side-section-content">
                        <div class="side-content landscape">
                            <!--바다좋은 부산-->
                            <div class="side-section-port">
                                <!-- side-header -->
                                <div class="side-header-section">
                                    <h1 class="header-title">항만 측정소 <span class="dust-type">미세먼지</span></h1>
                                    <span class="header-name"></span>
                                    <span class="header-date"></span>
                                </div>

                                <!-- side-content -->
                                <div class="side-content-section">
                                    <!-- 버튼 -->
                                    <button class="page-btn prev" move="prev">
                                        <img alt src="${ctxPath}/images/target02/btn_prev.webp">
                                    </button>
                                    <button class="page-btn next" move="next">
                                        <img alt src="${ctxPath}/images/target02/btn_next.webp">
                                    </button>
                                    <!-- page1 -->
                                    <div class="side-section-page side-section-page1 show">
                                        <div class="dash-section msrstn-section">
                                            <div class="dash-section-title">
                                                <span><span class="msrstn-name">부산신항</span> 측정소</span>
                                            </div>
                                            <table class="msrstn-table">
                                                <colgroup>
                                                    <col style="width: 30%">
                                                    <col style="width: 70%">
                                                </colgroup>
                                                <tr>
                                                    <th>구분</th>
                                                    <th>정보</th>
                                                </tr>
                                                <tr>
                                                    <td>측정소 주소</td>
                                                    <td class="msrstn-addr"></td>
                                                </tr>
                                                <tr>
                                                    <td>설치년도</td>
                                                    <td class="msrstn-year"></td>
                                                </tr>
                                                <tr>
                                                    <td>측정항목</td>
                                                    <td class="msrstn-item"></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="forecast-section">
                                            <div style="flex: 2" class="dash-section">
                                                <div class="dash-section-title">
                                                    <span><span class="msrstn-name">부산신항</span> <span class="dust-type">미세먼지</span> 지수</span>
                                                </div>
                                                <div class="forecast-index-section">
                                                    <div class="dust-index-section yesterday-section">
                                                        <img class="dust-index-img yesterday-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">어제 (<span
                                                                    class="yesterday-date">5월 11일</span>)</span>
                                                            <span class="dust-index yesterday-index">보통이에요</span>
                                                        </div>
                                                    </div>
                                                    <div class="dust-index-section today-section">
                                                        <img class="dust-index-img today-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">오늘 (<span class="today-date">5월 12일</span>)</span>
                                                            <span class="dust-index today-index">나빠요</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="flex: 1" class="dash-section">
                                                <div class="dash-section-title">
                                                    <span>부산시 예보 지수</span>
                                                </div>
                                                <div class="dust-index-section tomorrow-section">
                                                    <img class="dust-index-img tomorrow-img"
                                                         src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                    <div class="dust-index-content">
                                                        <span class="dust-index-date">내일 (<span class="tomorrow-date">5월 13일</span>)</span>
                                                        <span class="dust-index tomorrow-index">매우나빠요</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="dash-section dust-chart-section">
                                            <div class="dash-section-title">
                                                <span><span class="msrstn-name">부산신항</span> <span
                                                        class="dust-type">미세먼지</span> 변화</span>
                                                <img src="${ctxPath}/images/target02/img_legend_dust_chart.webp" alt=""
                                                     style="position: absolute;height: calc(var(--font-size-md)* 1.25);right: 0px;bottom: 6px;">
                                            </div>
                                            <div style="height: calc(100% - 127px);width: 100%;">
                                                <div id="dust-chart-landscape" style="width: 100%; height: 100%;"></div>
                                            </div>

                                            <table class="dust-chart-table">
                                                <tr>
                                                    <th>구분</th>
                                                    <th>최저값</th>
                                                    <th>평균값</th>
                                                    <th>최고값</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="dust-type">미세먼지</div>
                                                        <div>(<span class="dust-eng-name">PM10</span>)</div>
                                                    </td>
                                                    <td>
                                                        <span class="dust-min">5</span>
                                                        <div class="dust-min-date">24.06.18 / 0시</div>
                                                    </td>
                                                    <td>
                                                        <span class="dust-avg">21</span>
                                                    </td>
                                                    <td>
                                                        <span class="dust-max">36</span>
                                                        <div class="dust-max-date">24.06.18 / 12시</div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <!-- page1 cover -->
                                        <div class="side-section-cover port-cover">
                                            <div class="side-section-text">조회할 항만 아이콘을</div>
                                            <div>선택해 주세요.</div>
                                        </div>
                                    </div>

                                    <!-- page2 -->
                                    <div class="side-section-page side-section-page2">
                                        <div class="dash-section total-chart-section">
                                            <div class="dash-section-title">
                                                <span><span class="msrstn-name">부산신항</span> 입출항 선박 및 <span
                                                        class="dust-type">미세먼지</span> 농도</span>
                                            </div>
                                            <div id="total-chart-landscape" class="total-chart"></div>
                                        </div>

                                        <div class="dash-section ship-chart-section">

                                            <div class="dash-section-title">
                                                <span class="ship-title">출항 선박 통계 정보 (출항 선박 수 : 16척)</span>
                                            </div>

                                            <div id="ship-chart-landscape" class="ship-chart"></div>

                                            <div class="transport-chart-section">
                                                <div id="transport-chart-landscape" class="transport-chart"></div>
                                                <table class="transport-table">
                                                    <tr>
                                                        <th>운반 톤 수(t)</th>
                                                        <th>비율(%)</th>
                                                    </tr>
                                                    <tr>
                                                        <td>0~99</td>
                                                        <td class="transport-range-1">0%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>100~499</td>
                                                        <td class="transport-range-2">17%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>500~999</td>
                                                        <td class="transport-range-3">50%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>1000 이상</td>
                                                        <td class="transport-range-4">33%</td>
                                                    </tr>
                                                </table>
                                            </div>

                                            <!-- page2 cover -->
                                            <div class="ship-ratio-cover transport-section-cover chart-cover">
                                                <div>
                                                    위의 그래프에서 조회할
                                                </div>
                                                <div>
                                                    입출항 선박 정보를 선택해주세요.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--살기좋은 부산-->
                            <div class="side-section-area">
                                <!-- side-header -->
                                <div class="side-header-section">
                                    <h1 class="header-title">부산시 <span class="dust-type">미세먼지</span></h1>
                                    <span class="header-name"></span>
                                    <span class="header-date"></span>
                                </div>

                                <!-- side-content -->
                                <div class="side-content-section">
                                    <!-- 버튼 -->
                                    <button class="page-btn prev" move="prev">
                                        <img alt src="${ctxPath}/images/target02/btn_prev.webp">
                                    </button>
                                    <button class="page-btn next" move="next">
                                        <img alt src="${ctxPath}/images/target02/btn_next.webp">
                                    </button>
                                    <!-- page1 -->
                                    <div class="side-section-page side-section-page1 show">
                                        <div class="dash-section dust-chart-section area-dash-section">
                                            <div style="flex: 2;">
                                                <div id="area-lpi-section-landscape"
                                                     style="height: 36.2vh;width: 360px;">
                                                    <%--                                                    <img src="${ctxPath}/images/target02/test1.png" alt="" style="width: 100%; height: 100% ">--%>
                                                    <%--                                                    <img src="${ctxPath}/images/target02/test2.png" alt="" style="width: 100%; height: 100% ">--%>
                                                    <%--                                                    <img src="${ctxPath}/images/target02/test3.png" alt="" style="width: 100%; height: 100% ">--%>
                                                    <%--                                                    <img src="${ctxPath}/images/target02/test4.png" alt="" style="width: 100%; height: 100% ">--%>

                                                    <img class="area-lpi-img1" src="${ctxPath}/images/target02/test1.png" alt="" style="width: 100%; height: 100% ">
                                                    <img class="area-lpi-img2" src="${ctxPath}/images/target02/test2.png" alt="" style="width: 100%; height: 100% ">
                                                    <img class="area-lpi-img3" src="${ctxPath}/images/target02/test3.png" alt="" style="width: 100%; height: 100% ">
                                                </div>
                                            </div>
                                            <div class="forecast-section">
                                                <div class="dash-section area-index-section">
                                                    <div class="dash-section-title">
                                                        <span>거주지역 <span class="dust-type">미세먼지</span> 지수</span>
                                                    </div>
                                                    <div class="dust-index-section yesterday-section">
                                                        <img class="dust-index-img yesterday-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">어제 (<span
                                                                    class="yesterday-date">5월 11일</span>)</span>
                                                            <span class="dust-index yesterday-index">보통이에요</span>
                                                        </div>
                                                    </div>
                                                    <div class="dust-index-section today-section">
                                                        <img class="dust-index-img today-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">오늘 (<span class="today-date">5월 12일</span>)</span>
                                                            <span class="dust-index today-index">나빠요</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dash-section area-forecast-section">
                                                    <div class="dash-section-title">
                                                        <span>부산시 예보 지수</span>
                                                    </div>
                                                    <div class="dust-index-section tomorrow-section">
                                                        <img class="dust-index-img tomorrow-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">내일 (<span
                                                                    class="tomorrow-date">5월 13일</span>)</span>
                                                            <span class="dust-index tomorrow-index">매우나빠요</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dash-section dust-chart-section">
                                            <div class="dash-section-title">
                                                <span>거주지역 <span class="dust-type">미세먼지</span> 변화</span>
                                                <img src="${ctxPath}/images/target02/img_legend_dust_chart.webp" alt=""
                                                     style="position: absolute;height: calc(var(--font-size-md)* 1.25);right: 0px;bottom: 6px;">
                                            </div>
                                            <div id="area-chart-landscape" style="height: calc(100% - 127px);"></div>
                                            <table class="dust-chart-table">
                                                <tr>
                                                    <th>구분</th>
                                                    <th>최저값</th>
                                                    <th>평균값</th>
                                                    <th>최고값</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="dust-type">미세먼지</div>
                                                        <div>(<span class="dust-eng-name">PM10</span>)</div>
                                                    </td>
                                                    <td>
                                                        <span class="dust-min">5</span>
                                                        <div class="dust-min-date">24.06.18 / 0시</div>
                                                    </td>
                                                    <td>
                                                        <span class="dust-avg">21</span>
                                                    </td>
                                                    <td>
                                                        <span class="dust-max">36</span>
                                                        <div class="dust-max-date">24.06.18 / 12시</div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <!-- page1 cover -->
                                        <div class="side-section-cover area-cover">
                                            <div class="side-section-text">조회할 지역구를</div>
                                            <div>선택해 주세요.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--걷기좋은 부산-->
                            <div class="side-section-galmaet">
                                <!-- side-header -->
                                <div class="side-header-section">
                                    <h1 class="header-title">갈맷길 미세먼지</h1>
                                    <span class="header-name"></span>
                                    <span class="header-date"></span>
                                </div>

                                <!-- side-content -->
                                <div class="side-content-section">
                                    <!-- page1 -->
                                    <div class="side-section-page side-section-page1 show">
                                        <div class="dash-section dust-chart-section galmaet-dash-section">
                                            <div style="flex: 2;">
                                                <div id="galmaet-lpi-section-landscape" style="height: 36.2vh;width: 360px;">
                                                    <img src="${ctxPath}/images/target02/test1.png" alt="" style="width: 100%; height: 100% ">
                                                    <img src="${ctxPath}/images/target02/test2.png" alt="" style="width: 100%; height: 100% ">
                                                    <img src="${ctxPath}/images/target02/test3.png" alt="" style="width: 100%; height: 100% ">
                                                    <img src="${ctxPath}/images/target02/test4.png" alt="" style="width: 100%; height: 100% ">
                                                </div>
                                            </div>
                                            <div class="forecast-section">
                                                <div class="dash-section galmaet-index-section">
                                                    <div class="dash-section-title">
                                                        <span>갈맷길 미세먼지 지수</span>
                                                    </div>
                                                    <div class="dust-index-section pm10-section">
                                                        <img class="dust-index-img pm10-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">미세먼지(PM10)</span>
                                                            <span class="dust-index pm10-index">보통이에요</span>
                                                        </div>
                                                    </div>
                                                    <div class="dust-index-section pm25-section">
                                                        <img class="dust-index-img pm25-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">초미세먼지(PM2.5)</span>
                                                            <span class="dust-index pm25-index">나빠요</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dash-section galmaet-aod-section">
                                                    <div class="dash-section-title">
                                                        <span>갈맷길 AOD 수치</span>
                                                    </div>
                                                    <div class="dust-index-section aod-section"
                                                         style="background-color: #e5e5e5; border-color: #818181;">
                                                        <img class="dust-index-img aod-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_null.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date" style="height: 20px;"></span>
                                                            <span class="dust-index aod-index" style="color: #818181">교정중</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dash-section dust-chart-section">
                                            <div class="dash-section-title">
                                                <span><span class="header-name">8코스 1구간</span> 정보 및 볼거리</span>
                                            </div>
                                            <div class="galmaet-info-section">
                                                <div id="galmaetCarouselRide" class="carousel slide" data-bs-ride="carousel" style="height: 100%;">
                                                    <div class="carousel-inner" style="height: 100%;">
                                                    </div>
                                                    <button class="carousel-control-prev" type="button" data-bs-target="#galmaetCarouselRide"
                                                            data-bs-slide="prev" style="left: -4%; width: auto;">
                                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Previous</span>
                                                    </button>
                                                    <button class="carousel-control-next" type="button" data-bs-target="#galmaetCarouselRide"
                                                            data-bs-slide="next" style="right: -4%;width: auto;">
                                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- page1 cover -->
                                        <div class="side-section-cover galmaet-cover">
                                            <div class="side-section-text">조회할 갈맷길을</div>
                                            <div>선택해 주세요.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="side-content portrait" style="display: none;">
                            <!--바다좋은 부산-->
                            <div class="side-section-port">
                                <!-- side-header -->
                                <div class="side-header-section">
                                    <h1 class="header-title">항만 측정소 <span class="dust-type">미세먼지</span></h1>
                                    <span class="header-name"></span>
                                    <span class="header-date"></span>
                                </div>

                                <!-- side-content -->
                                <div class="side-content-section">
                                    <!-- 버튼 -->
                                    <button class="page-btn prev" move="prev">
                                        <img alt src="${ctxPath}/images/target02/btn_prev.webp">
                                    </button>
                                    <button class="page-btn next" move="next">
                                        <img alt src="${ctxPath}/images/target02/btn_next.webp">
                                    </button>
                                    <!-- page1 -->
                                    <div class="side-section-page side-section-page1 show">
                                        <div class="dash-section msrstn-section">
                                            <div class="dash-section-title">
                                                <span><span class="msrstn-name">부산신항</span> 측정소</span>
                                            </div>
                                            <table class="msrstn-table">
                                                <colgroup>
                                                    <col style="width: 30%">
                                                    <col style="width: 70%">
                                                </colgroup>
                                                <tr>
                                                    <th>구분</th>
                                                    <th>정보</th>
                                                </tr>
                                                <tr>
                                                    <td>측정소 주소</td>
                                                    <td class="msrstn-addr"></td>
                                                </tr>
                                                <tr>
                                                    <td>설치년도</td>
                                                    <td class="msrstn-year"></td>
                                                </tr>
                                                <tr>
                                                    <td>측정항목</td>
                                                    <td class="msrstn-item"></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="forecast-section">
                                            <div style="flex: 2" class="dash-section">
                                                <div class="dash-section-title">
                                                    <span><span class="msrstn-name">부산신항</span> <span class="dust-type">미세먼지</span> 지수</span>
                                                </div>
                                                <div class="forecast-index-section">
                                                    <div class="dust-index-section yesterday-section">
                                                        <img class="dust-index-img yesterday-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">어제 <span
                                                                    class="yesterday-date">5/11</span></span>
                                                            <span class="dust-index yesterday-index">보통이에요</span>
                                                        </div>
                                                    </div>
                                                    <div class="dust-index-section today-section">
                                                        <img class="dust-index-img today-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">오늘 <span class="today-date">5/12</span></span>
                                                            <span class="dust-index today-index">나빠요</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="flex: 1" class="dash-section">
                                                <div class="dash-section-title">
                                                    <span>부산시 예보 지수</span>
                                                </div>
                                                <div class="dust-index-section tomorrow-section">
                                                    <img class="dust-index-img tomorrow-img"
                                                         src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                    <div class="dust-index-content">
                                                        <span class="dust-index-date">내일 <span class="tomorrow-date">5/13</span></span>
                                                        <span class="dust-index tomorrow-index">매우나빠요</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- page1 cover -->
                                        <div class="side-section-cover port-cover">
                                            <div class="side-section-text">조회할 항만 아이콘을</div>
                                            <div>선택해 주세요.</div>
                                        </div>
                                    </div>

                                    <!-- page2 -->
                                    <div class="side-section-page side-section-page2">
                                        <div class="dash-section dust-chart-section">
                                            <div class="dash-section-title">
                                                <span><span class="msrstn-name">부산신항</span> <span
                                                        class="dust-type">미세먼지</span> 변화</span>
                                                <img src="${ctxPath}/images/target02/img_legend_dust_chart.webp" alt=""
                                                     style="position: absolute;height: calc(var(--font-size-md)* 1.25);right: 0px;bottom: 6px;">
                                            </div>
                                            <div id="dust-chart-portrait" class="dust-chart-portrait"></div>
                                            <table class="dust-chart-table">
                                                <tr>
                                                    <th>구분</th>
                                                    <th>최저값</th>
                                                    <th>평균값</th>
                                                    <th>최고값</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="dust-type">미세먼지</div>
                                                        <div>(<span class="dust-eng-name">PM10</span>)</div>
                                                    </td>
                                                    <td>
                                                        <span class="dust-min">5</span>
                                                        <div class="dust-min-date">24.06.18 / 0시</div>
                                                    </td>
                                                    <td>
                                                        <span class="dust-avg">21</span>
                                                    </td>
                                                    <td>
                                                        <span class="dust-max">36</span>
                                                        <div class="dust-max-date">24.06.18 / 12시</div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                    <!-- page3 -->
                                    <div class="side-section-page side-section-page3">
                                        <div class="dash-section total-chart-section">
                                            <div class="dash-section-title">
                                                <span><span class="msrstn-name">부산신항</span> 입출항 선박 및 <span
                                                        class="dust-type">미세먼지</span> 농도</span>
                                            </div>
                                            <div id="total-chart-portrait" class="total-chart"></div>
                                        </div>
                                    </div>

                                    <!-- page4 -->
                                    <div class="side-section-page side-section-page4">
                                        <div class="dash-section ship-chart-section">
                                            <div class="dash-section-title">
                                                <span class="ship-title">출항 선박 통계 정보 (출항 선박 수 : 16척)</span>
                                            </div>

                                            <div id="ship-chart-portrait" class="ship-chart"></div>

                                            <!-- page2 cover -->
                                            <div class="ship-ratio-cover transport-section-cover chart-cover">
                                                <div>
                                                    앞의 그래프에서 조회할
                                                </div>
                                                <div>
                                                    입출항 선박 정보를 선택해주세요.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- page5 -->
                                    <div class="side-section-page side-section-page5">
                                        <div class="dash-section ship-chart-section">
                                            <div class="dash-section-title">
                                                <span class="ship-title">출항 선박 통계 정보 (출항 선박 수 : 16척)</span>
                                            </div>

                                            <div class="transport-chart-section">
                                                <div id="transport-chart-portrait" class="transport-chart"></div>
                                                <table class="transport-table">
                                                    <tr>
                                                        <th>운반 톤 수(t)</th>
                                                        <th>비율(%)</th>
                                                    </tr>
                                                    <tr>
                                                        <td>0~99</td>
                                                        <td class="transport-range-1">0%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>100~499</td>
                                                        <td class="transport-range-2">17%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>500~999</td>
                                                        <td class="transport-range-3">50%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>1000 이상</td>
                                                        <td class="transport-range-4">33%</td>
                                                    </tr>
                                                </table>
                                            </div>

                                            <!-- page2 cover -->
                                            <div class="ship-ratio-cover transport-section-cover chart-cover">
                                                <div>
                                                    앞의 그래프에서 조회할
                                                </div>
                                                <div>
                                                    입출항 선박 정보를 선택해주세요.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--살기좋은 부산-->
                            <div class="side-section-area">
                                <!-- side-header -->
                                <div class="side-header-section">
                                    <h1 class="header-title">부산시 <span class="dust-type">미세먼지</span></h1>
                                    <span class="header-name"></span>
                                    <span class="header-date"></span>
                                </div>

                                <!-- side-content -->
                                <div class="side-content-section">
                                    <!-- 버튼 -->
                                    <button class="page-btn prev" move="prev">
                                        <img alt src="${ctxPath}/images/target02/btn_prev.webp">
                                    </button>
                                    <button class="page-btn next" move="next">
                                        <img alt src="${ctxPath}/images/target02/btn_next.webp">
                                    </button>
                                    <!-- page1 -->
                                    <div class="side-section-page side-section-page1 show">
                                        <div class="dash-section dust-chart-section area-dash-section">
                                            <div style="flex: 2;">
                                                <div id="area-lpi-section-portrait">
                                                    <img class="area-lpi-img1"
                                                         src="${ctxPath}/images/target02/test1.png" alt=""
                                                         style="width: 100%; height: 100% ">
                                                    <img class="area-lpi-img2"
                                                         src="${ctxPath}/images/target02/test2.png" alt=""
                                                         style="width: 100%; height: 100% ">
                                                    <img class="area-lpi-img3"
                                                         src="${ctxPath}/images/target02/test3.png" alt=""
                                                         style="width: 100%; height: 100% ">
                                                    <%--                                                    <img src="${ctxPath}/images/target02/test1.png" alt="" >--%>
                                                    <%--                                                    <img src="${ctxPath}/images/target02/test2.png" alt="" >--%>
                                                    <%--                                                    <img src="${ctxPath}/images/target02/test3.png" alt="" >--%>
                                                    <%--                                                    <img src="${ctxPath}/images/target02/test4.png" alt="" >--%>
                                                </div>
                                            </div>
                                            <div class="forecast-section">
                                                <div class="dash-section area-index-section">
                                                    <div class="dash-section-title">
                                                        <span>거주지역 <span class="dust-type">미세먼지</span> 지수</span>
                                                    </div>
                                                    <div class="dust-index-section yesterday-section">
                                                        <img class="dust-index-img yesterday-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">어제 (<span
                                                                    class="yesterday-date">5월 11일</span>)</span>
                                                            <span class="dust-index yesterday-index">보통이에요</span>
                                                        </div>
                                                    </div>
                                                    <div class="dust-index-section today-section">
                                                        <img class="dust-index-img today-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">오늘 (<span class="today-date">5월 12일</span>)</span>
                                                            <span class="dust-index today-index">나빠요</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dash-section area-forecast-section">
                                                    <div class="dash-section-title">
                                                        <span>부산시 예보 지수</span>
                                                    </div>
                                                    <div class="dust-index-section tomorrow-section">
                                                        <img class="dust-index-img tomorrow-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">내일 (<span
                                                                    class="tomorrow-date">5월 13일</span>)</span>
                                                            <span class="dust-index tomorrow-index">매우나빠요</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- page1 cover -->
                                        <div class="side-section-cover area-cover">
                                            <div class="side-section-text">조회할 지역구를</div>
                                            <div>선택해 주세요.</div>
                                        </div>
                                    </div>
                                    <div class="side-section-page side-section-page2">
                                        <div class="dash-section dust-chart-section">
                                            <div class="dash-section-title">
                                                <span>거주지역 <span class="dust-type">미세먼지</span> 변화</span>
                                                <img src="${ctxPath}/images/target02/img_legend_dust_chart.webp" alt=""
                                                     style="position: absolute;height: calc(var(--font-size-md)* 1.25);right: 0px;bottom: 6px;">
                                            </div>
                                            <div id="area-chart-portrait" class="area-chart-portrait"></div>
                                            <table class="dust-chart-table">
                                                <tr>
                                                    <th>구분</th>
                                                    <th>최저값</th>
                                                    <th>평균값</th>
                                                    <th>최고값</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="dust-type">미세먼지</div>
                                                        <div>(<span class="dust-eng-name">PM10</span>)</div>
                                                    </td>
                                                    <td>
                                                        <span class="dust-min">5</span>
                                                        <div class="dust-min-date">24.06.18 / 0시</div>
                                                    </td>
                                                    <td>
                                                        <span class="dust-avg">21</span>
                                                    </td>
                                                    <td>
                                                        <span class="dust-max">36</span>
                                                        <div class="dust-max-date">24.06.18 / 12시</div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <!--걷기좋은 부산-->
                            <div class="side-section-galmaet">
                                <!-- side-header -->
                                <div class="side-header-section">
                                    <h1 class="header-title">갈맷길 미세먼지</h1>
                                    <span class="header-name"></span>
                                    <span class="header-date"></span>
                                </div>

                                <!-- side-content -->
                                <div class="side-content-section">
                                    <!-- 버튼 -->
                                    <button class="page-btn prev" move="prev">
                                        <img alt src="${ctxPath}/images/target02/btn_prev.webp">
                                    </button>
                                    <button class="page-btn next" move="next">
                                        <img alt src="${ctxPath}/images/target02/btn_next.webp">
                                    </button>
                                    <!-- page1 -->
                                    <div class="side-section-page side-section-page1 show">
                                        <div class="dash-section dust-chart-section galmaet-dash-section">
                                            <div style="flex: 2;">
                                                <div id="galmaet-lpi-section-portrait">
                                                    <img src="${ctxPath}/images/target02/test1.png" alt=""
                                                         style="width: 100%; height: 100% ">
                                                    <img src="${ctxPath}/images/target02/test2.png" alt=""
                                                         style="width: 100%; height: 100% ">
                                                    <img src="${ctxPath}/images/target02/test3.png" alt=""
                                                         style="width: 100%; height: 100% ">
                                                    <img src="${ctxPath}/images/target02/test4.png" alt=""
                                                         style="width: 100%; height: 100% ">
                                                </div>
                                            </div>
                                            <div class="forecast-section">
                                                <div class="dash-section galmaet-index-section">
                                                    <div class="dash-section-title">
                                                        <span>갈맷길 미세먼지 지수</span>
                                                    </div>
                                                    <div class="dust-index-section pm10-section">
                                                        <img class="dust-index-img pm10-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">미세먼지</span>
                                                            <span class="dust-index pm10-index">보통이에요</span>
                                                        </div>
                                                    </div>
                                                    <div class="dust-index-section pm25-section">
                                                        <img class="dust-index-img pm25-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_good.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date">초미세먼지</span>
                                                            <span class="dust-index pm25-index">나빠요</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dash-section galmaet-aod-section">
                                                    <div class="dash-section-title">
                                                        <span>갈맷길 AOD 수치</span>
                                                    </div>
                                                    <div class="dust-index-section aod-section" style="background-color: #e5e5e5; border-color: #818181;">
                                                        <img class="dust-index-img aod-img"
                                                             src="${ctxPath}/images/target02/lpi_dust_null.webp" alt="">
                                                        <div class="dust-index-content">
                                                            <span class="dust-index-date" style="height: 14px;"></span>
                                                            <span class="dust-index aod-index" style="color: #818181">교정중</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- page1 cover -->
                                        <div class="side-section-cover galmaet-cover">
                                            <div class="side-section-text">조회할 갈맷길을</div>
                                            <div>선택해 주세요.</div>
                                        </div>
                                    </div>
                                    <div class="side-section-page side-section-page2">
                                        <div class="dash-section dust-chart-section">
                                            <div class="dash-section-title">
                                                <span><span class="header-name">8코스 1구간</span> 정보 및 볼거리</span>
                                            </div>
                                            <div class="galmaet-info-section">
                                                <div style="display: flex; height: 60%">
                                                    <div class="galmaet-content-section" style="flex: 1.5;">
                                                        <div class="galmaet-info-content">
                                                            <span>총길이 : 9km</span>
                                                        </div>
                                                        <div class="galmaet-info-content">
                                                            <span>소요시간 : 3시간</span>
                                                        </div>
                                                        <div class="galmaet-info-content">
                                                            <span>난이도 : ★★☆</span>
                                                        </div>
                                                        <div class="galmaet-info-content">
                                                            <span class="galmaet-lk-link">인증대 및 스탬프</span> <a href="">[안내사이트]</a>
                                                        </div>
                                                    </div>
                                                    <div style="flex: 2;">
                                                        <img class="galmaet-lk-img"
                                                             src="${ctxPath}/images/target02/galmaetgil_tour/img_moyeonjeong.webp"
                                                             alt="">
                                                    </div>
                                                </div>
                                                <div class="galmaet-lk-section">
                                                    <h5 class="galmaet-lk-name">기장읍성</h5>
                                                    <span class="galmaet-lk-content">세종7년(1425년)에 축성된 읍성은 높이가 약4m, 둘레가 1,600m였으나, 거의 허물어지고 현재 높이 약 3m, 길이 300m의 성벽과 4개의 문지만 남아 있다. 성내에 있던 대부분의 건물은 일제 강점기에 철거 및 파괴되었고, 현재 유일하게 장관청 건물만 남아있다.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- side-section-button -->
                    <button class="side-section-btn"></button>
                </div>

                <div class="util-section">
                    <!--미세먼지 경보-->
                    <div class="util-issue-section">
                        <div id="carouselRide" class="dust-issue carousel slide" data-bs-ride="true">
                            <div class="carousel-inner">
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselRide"
                                    data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselRide"
                                    data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <!--미세,초미세먼지 범례-->
                    <div class="util-legend-section">
                        <div class="dust-index-img-section">
                            <img class="legend-img dust-legend-img dust-index-img-01"
                                 src="${ctxPath}/images/target02/img_legend_pm10.webp">
                            <img class="legend-img dust-legend-img dust-index-img-02"
                                 src="${ctxPath}/images/target02/img_legend_pm25.webp">
                        </div>

                        <!-- aod 범례 -->
                        <div class="aod-dust-index-img-section">
                            <img class="legend-img aod-dust-index-img"
                                 src="${ctxPath}/images/target02/img_legend_aod.webp"
                                 alt="AOD 범례">
                        </div>

                        <!--시민제보 미세먼지 범례 (나중에 이미지 변경해야함)-->
                        <div class="tipoff-dust-index-img-section">
                            <img class="legend-img tipoff-dust-index-img"
                                 src="${ctxPath}/images/target02/img_legend_tipoff.webp"
                                 alt="" style="width: 30%;">
                            <img class="legend-img tipoff-dust-index-img"
                                 src="${ctxPath}/images/target02/img_legend_pm10.webp">
                        </div>
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
                                <button class="play play-btn" title="play" id="startPlay">▶</button>
                                <button class="paused play-btn" title="paused" id="stopPlay">||</button>
                            </div>

                            <div id="dust-slider" class="slider-bar"></div>
                        </div>
                        <div class="slider-time"></div>
                    </div>
                    <div class="slider-dust-index-img-section monit-item">
                        <img class="slider-dust-index-img slider-dust-index-img-01"
                             src="${ctxPath}/images/target02/img_legend_pm10.webp">
                        <img class="slider-dust-index-img slider-dust-index-img-02"
                             src="${ctxPath}/images/target02/img_legend_pm25.webp">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <%--  시민제보 팝업  --%>
    <div id="tipoff-popup">
        <div class="tipoff-popup-title">
            시민 제보 정보
        </div>
    </div>
    <%--  갈맷길 팝업  --%>
    <div id="gm-popup">
        <div class="gm-popup-title">
        </div>
        <div class="gm-popup-content">
        </div>
    </div>

    <%--  모바일 볼거리 설명 팝업  --%>
    <div class="galmaet-lk-popup">
        <h5 class="galmaet-lk-name" style="margin-bottom: 8px;">기장읍성</h5>
        <span class="galmaet-lk-content" style="font-size: var(--font-size-md);">세종7년(1425년)에 축성된 읍성은 높이가 약4m, 둘레가 1,600m였으나, 거의 허물어지고 현재 높이 약 3m, 길이 300m의 성벽과 4개의 문지만 남아 있다. 성내에 있던 대부분의 건물은 일제 강점기에 철거 및 파괴되었고, 현재 유일하게 장관청 건물만 남아있다.</span>
        <button class="galmaet-lk-close-btn">닫기</button>
    </div>

    <%--보고서 임시 발행--%>
    <div class="temp-report-popup">
        <button class="temp-btn-report-popup">X</button>
        <h3>보고서 미리보기</h3>
        <div class="temp-report-popup-content">
            <img src="${ctxPath}/images/common/img_temp_report.webp">
            <div class="temp-btn-report-download">
                <button type="button" class="btn btn-success">다운로드</button>

            </div>
        </div>
    </div>

</main>
<!-- custom js -->
<script src="js/common/common.js"></script>
<script src="js/common/common-map.js"></script>
<script src="js/common/string-util.js"></script>
<script src="js/target02/marine-dust.js"></script>
<script src="js/target02/marine-dust-map.js"></script>
<script src="js/target02/marine-dust-chart.js"></script>
</body>
</html>
