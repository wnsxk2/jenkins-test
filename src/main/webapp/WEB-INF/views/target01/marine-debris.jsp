<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Target1</title>
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

    <!--bootstrap-->
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.css">
    <!--dropdown-->
    <script src="assets/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- custom css -->
    <%--    <link rel="stylesheet" href="css/common/common.css">--%>
    <link rel="stylesheet" href="css/common/header.css">
    <link href="css/target01/marine_debris.css" type="text/css" rel="stylesheet">

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
                <img class="title-img" src="${ctxPath}/images/target01/ic_title.webp" alt="">
                <span class="title-text">부산시 부유 쓰레기 모니터링 서비스</span>
            </div>
            <div id="map" class="map-section">
                    <div class="theme-menu-section">
                        <ul class="theme-menu">
                            <li>
                                <div class="dropdown">
                                    <button class="dropdown-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        <img class="theme-item-img" alt src="${ctxPath}/images/target01/ic_theme_debris.webp">
                                        <span>육상기인부유쓰레기</span>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item theme-item" href="#" data-theme="cctv">
                                            <img class="theme-item-img" alt src="${ctxPath}/images/target01/ic_theme_cctv.webp">
                                            <span>관내 외 부유쓰레기</span></a></li>
                                        <li><a class="dropdown-item theme-item" href="#" data-theme="satel">
                                            <img class="theme-item-img" alt src="${ctxPath}/images/target01/ic_theme_satel.webp">
                                            <span>광역 재해쓰레기</span>
                                        </a></li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <button class="dropdown-btn"  type="button">
                                                    <%-- 사용전에 theme 변경해주세요--%>
                                    <a class="theme-item" href="#" data-theme="area">
                                        <img class="theme-item-img" alt src="${ctxPath}/images/target01/ic_theme_region.webp">
                                        <span>지역분포</span>
                                    </a>
                                </button>
                            </li>
                            <li>
                                <button class="dropdown-btn"  type="button">
                                    <%-- 사용전에 theme 변경해주세요--%>
                                    <a class="theme-item" href="#" data-theme="activity">
                                        <img class="theme-item-img" alt src="${ctxPath}/images/target01/ic_theme_activity.webp">
                                        <span>해양정화활동</span>
                                    </a>
                                </button>
                            </li>
                        </ul>
                    </div>
                <%-- dash board --%>
                <div class="side-section">
                    <%-- 관내,외 부유쓰레기 --%>
                    <div class="side-section-page hide" id="cctv-page">
                        <%-- 헤더 --%>
                        <div class="side-header-section">
                            <h1 class="header-title">부산시 관내외 부유쓰레기 모니터링</h1>
                            <button class="header-btn report-btn">보고서 작성</button>
                        </div>
                        <div class="side-content-section landscape hide">
                            <!-- cover -->
                            <div class="dash-cover" id="cctv-dash-cover-landscape">
                                <span>조회할 CCTV를</span>
                                <span>선택해 주세요.</span>
                            </div>
                            <!-- 버튼 -->
                            <button class="page-btn prev" data-move="prev">
                                <img alt src="${ctxPath}/images/target02/btn_prev.webp">
                            </button>
                            <button class="page-btn next" data-move="next">
                                <img alt src="${ctxPath}/images/target02/btn_next.webp">
                            </button>
                            <div style="height: 100%; display: flex; flex-direction: column;">
                                <%-- 년월 조회 --%>
                                <div class="dash-section date-section" style="flex: 1;">
                                    <div class="datepicker-section">
                                        <span class="datepicker-span">시작</span>
                                        <input class="datepicker-input" id="datepicker-start-cctv-landscape" type="month">
                                    </div>
                                    <span>~</span>
                                    <div class="datepicker-section">
                                        <span class="datepicker-span">종료</span>
                                        <input class="datepicker-input" id="datepicker-end-cctv-landscape" type="month">
                                    </div>
                                    <div class="datepicker-btn-section">
                                        <button class="cctv-select-btn datepicker-btn select-btn">조회</button>
                                    </div>
                                </div>
                                <div style="flex: 24;">
                                    <%-- page1 --%>
                                    <div class="dash-section-page cctv-dash-page1" data-page="1">
                                        <%-- 추정량 --%>
                                        <div class="dash-section info-section" style="flex: 1">
                                            <div class="dash-title-section">
                                                <span class="dash-title-span">CCTV 기반 관외 부유쓰레기 유출 추정량</span>
                                            </div>
                                            <div class="info-content-section">
                                                <div style="flex: 1">
                                                    <div class="info-content-div1">
                                                        <h1 class="cctv-weight info-content-h1">81.6</h1>
                                                        <span class="info-content-span">kg</span>
                                                    </div>
                                                    <div>
                                                        <span class="info-content-title">관외 부유쓰레기 유출 추정 무게량</span>
                                                    </div>
                                                </div>
                                                <div style="flex: 1">
                                                    <div class="info-content-div2">
                                                        <h1 class="cctv-volume info-content-h1">64.1</h1>
                                                        <span class="info-content-span">㎥</span>
                                                    </div>
                                                    <div>
                                                        <span class="info-content-title">관외 부유쓰레기 유출 추정 부피</span>
                                                    </div>
                                                </div>
                                                <div style="flex: 1">
                                                    <div class="info-content-div3">
                                                        <h1 class="total-active info-content-h1">6</h1>
                                                        <span class="info-content-span">대</span>
                                                    </div>
                                                    <div>
                                                        <span class="info-content-title">관외 CCTV 활성화 대수</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <img class="cctv-img" src="${ctxPath}/images/target01/img_cctv.webp" alt="">
                                        </div>
                                        <%-- 모니터링 : 캐러셀 --%>
                                        <div class="dash-section monit-section" style="flex: 5">
                                            <div class="dash-title-section" style="margin-bottom: 0">
                                                <span class="dash-title-span">CCTV 기반 관외 부유쓰레기 모니터링</span>
                                            </div>
                                            <div>
                                                <div id="monit-carousel-landscape" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
                                                    <div class="carousel-inner">
                                                    </div>
                                                    <div class="carousel-indicators">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <%-- page2 --%>
                                    <div class="dash-section-page cctv-dash-page2 hide" data-page="2">
                                        <%-- 수위대비 발생량 차트 --%>
                                        <div class="dash-section" style="flex: 1">
                                            <div class="dash-title-section">
                                                <span class="dash-title-span">월평균 수위대비 관외 부유쓰레기 발생량</span>
                                            </div>

                                            <div class="cctv-wl-chart-section">
                                                <div id="cctv-wl-chart-landscape" class=""></div>
                                            </div>
                                            <div>
                                                <div class="dash-cover" id="wl-table-cover-landscape">
                                                    <span>조회할 월을 선택해 주세요.</span>
                                                </div>
                                                <table class="wl-table">
                                                    <tr>
                                                        <th>관측월</th>
                                                        <th>기상특보발령종류</th>
                                                        <th>건수(건)</th>
                                                        <th>태풍 발생 건수</th>
                                                    </tr>
                                                    <tr>
                                                        <td class="cctv-wl-month" rowspan="2">8월</td>
                                                        <td>호우주의보</td>
                                                        <td class="cctv-heavyrain-advisory">18</td>
                                                        <td class="cctv-typhoon" rowspan="2">2회</td>
                                                    </tr>
                                                    <tr>
                                                        <td>호우경보</td>
                                                        <td class="cctv-heavyrain-alarm">25</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <%-- 소요예산 그래프 --%>
                                        <div class="dash-section" style="flex: 1">
                                            <div class="dash-title-section">
                                                <span class="dash-title-span">최근 3년 관외 부유쓰레기 발생량 및 처리 소요예산 그래프</span>
                                            </div>
                                            <div style="height: 30vh;justify-items: center;">
                                                <div id="cctv-cost-chart-landscape" class="chart"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="side-content-section portrait">
                            <!-- cover -->
                            <div class="dash-cover" id="cctv-dash-cover-portrait">
                                <span>조회할 CCTV를</span>
                                <span>선택해 주세요.</span>
                            </div>
                            <!-- 버튼 -->
                            <button class="page-btn prev" data-move="prev">
                                <img alt src="${ctxPath}/images/target02/btn_prev.webp">
                            </button>
                            <button class="page-btn next" data-move="next">
                                <img alt src="${ctxPath}/images/target02/btn_next.webp">
                            </button>
                            <div style="height: 100%; display: flex; flex-direction: column;">
                                <%-- 년월 조회 --%>
                                <div class="dash-section date-section" style="flex: 1;">
                                    <div class="datepicker-section">
                                        <span class="datepicker-span">시작</span>
                                        <input class="datepicker-input" id="datepicker-start-cctv-portrait" type="month">
                                    </div>
                                    <span>~</span>
                                    <div class="datepicker-section">
                                        <span class="datepicker-span">종료</span>
                                        <input class="datepicker-input" id="datepicker-end-cctv-portrait" type="month">
                                    </div>
                                    <div class="datepicker-btn-section">
                                        <button class="cctv-select-btn datepicker-btn select-btn">조회</button>
                                    </div>
                                </div>
                                <div style="flex: 24;">
                                    <%-- page1 --%>
                                    <div class="dash-section-page cctv-dash-page1" data-page="1">
                                        <%-- 추정량 --%>
                                        <div class="dash-section info-section" style="flex: 1">
                                            <div class="dash-title-section">
                                                <span class="dash-title-span">부유쓰레기 유출 추정량</span>
                                            </div>
                                            <div class="info-content-section">
                                                <div style="flex: 1">
                                                    <div class="info-content-div1">
                                                        <h1 class="cctv-weight info-content-h1">81.6</h1>
                                                        <span class="info-content-span">kg</span>
                                                    </div>
                                                    <div>
                                                        <span class="info-content-title">유출 추정 무게량</span>
                                                    </div>
                                                </div>
                                                <div style="flex: 1">
                                                    <div class="info-content-div2">
                                                        <h1 class="cctv-volume info-content-h1">64.1</h1>
                                                        <span class="info-content-span">㎥</span>
                                                    </div>
                                                    <div>
                                                        <span class="info-content-title">유출 추정 부피</span>
                                                    </div>
                                                </div>
                                                <div style="flex: 1">
                                                    <div class="info-content-div3">
                                                        <h1 class="total-active info-content-h1">6</h1>
                                                        <span class="info-content-span">대</span>
                                                    </div>
                                                    <div>
                                                        <span class="info-content-title">CCTV 활성화 대수</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            <%-- 모니터링 : 캐러셀 --%>
                                            <div class="dash-section monit-section" style="flex: 2">
                                                <div class="dash-title-section" style="margin-bottom: 0">
                                                    <span class="dash-title-span">CCTV 기반 관외 부유쓰레기 모니터링</span>
                                                </div>
                                                <div>
                                                    <div id="monit-carousel-portrait" class="carousel slide"
                                                         data-bs-touch="false" data-bs-interval="false">
                                                        <div class="carousel-inner">
                                                        </div>
                                                        <div class="carousel-indicators">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    <%-- page2 --%>
                                    <div class="dash-section-page cctv-dash-page2 hide" data-page="2">
                                        <%-- 수위대비 발생량 차트 --%>
                                        <div class="dash-section" style="flex: 1">
                                            <div class="dash-title-section">
                                                <span class="dash-title-span">월평균 수위대비 관외 부유쓰레기 발생량</span>
                                            </div>

                                            <div class="cctv-wl-chart-section">
                                                <div id="cctv-wl-chart-portrait" class=""></div>
                                            </div>
                                            <div>
                                                <div class="dash-cover" id="wl-table-cover-portrait">
                                                    <span>조회할 월을 선택해 주세요.</span>
                                                </div>
                                                <table class="wl-table">
                                                    <tr>
                                                        <th>관측월</th>
                                                        <th>기상특보발령종류</th>
                                                        <th>건수(건)</th>
                                                        <th>태풍 발생 건수</th>
                                                    </tr>
                                                    <tr>
                                                        <td class="cctv-wl-month" rowspan="2">8월</td>
                                                        <td>호우주의보</td>
                                                        <td class="cctv-heavyrain-advisory">18</td>
                                                        <td class="cctv-typhoon" rowspan="2">2회</td>
                                                    </tr>
                                                    <tr>
                                                        <td>호우경보</td>
                                                        <td class="cctv-heavyrain-alarm">25</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                    <%-- page3 --%>
                                    <div class="dash-section-page cctv-dash-page3 hide" data-page="3">
                                        <%-- 소요예산 그래프 --%>
                                        <div class="dash-section" style="flex: 1">
                                            <div class="dash-title-section">
                                                <span class="dash-title-span">최근 3년 관외 부유쓰레기 발생량 및 처리 소요예산 그래프</span>
                                            </div>
                                            <div class="cctv-cost-chart-section">
                                                <div id="cctv-cost-chart-portrait" class="chart"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <%-- 광역 재해쓰레기 --%>
                    <div class="side-section-page hide" id="satel-page" >
                        <%-- 헤더 --%>
                        <div class="side-header-section">
                            <h1 class="header-title">부산시 광역 재해쓰레기 모니터링</h1>
                            <button class="header-btn report-btn">보고서 작성</button>
                        </div>
                        <div class="side-content-section landscape">
                            <!-- 버튼 -->
                            <button class="page-btn prev" data-move="prev">
                                <img alt src="${ctxPath}/images/target02/btn_prev.webp">
                            </button>
                            <button class="page-btn next" data-move="next">
                                <img alt src="${ctxPath}/images/target02/btn_next.webp">
                            </button>
                            <%-- 년월 조회 --%>
                            <div class="dash-section date-section">
                                <div class="datepicker-section">
                                    <span class="datepicker-span">시작</span>
                                    <input class="datepicker-input-satal" id="datepicker-start-satel" type="month">
                                </div>
                                <span>~</span>
                                <div class="datepicker-section">
                                    <span class="datepicker-span">종료</span>
                                    <input class="datepicker-input-satal" id="datepicker-end-satel" type="month">
                                </div>
                                <div class="datepicker-btn-section">
                                    <button class="datepicker-btn select-btn" id="search-btn">조회</button>
                                </div>
                            </div>
                            <%-- page1 --%>
                            <div class="dash-section-page" data-page="1">
                                <%-- 추정량 --%>
                                <div class="dash-section info-section">
                                    <div class="dash-title-section">
                                        <span class="dash-title-span">인공위성 기반 광역 재해쓰레기 유출 추정량</span>
                                    </div>
                                    <div class="info-content-section">
                                        <div style="flex: 1">
                                            <div class="info-content-div4">
                                            </div>
                                            <div>
                                                <span class="info-content-title">광역재해쓰레기 추정 무게량</span>
                                            </div>
                                        </div>
                                        <div style="flex: 1">
                                            <div class="info-content-div5">
                                            </div>
                                            <div>
                                                <span class="info-content-title">광역 재해쓰레기 추정 면적</span>
                                            </div>
                                        </div>
                                        <div style="flex: 1">
                                            <div class="info-update-section">
                                           </div>
                                           <div>
                                               <span class="info-content-title">최근 업데이트 위성사진날짜</span>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <%-- 위성사진 : 캐러셀 --%>
                                <div class="dash-section monit-section">
                                    <div class="dash-title-section">
                                        <span class="dash-title-span">부산시 광역 재해쓰레기 위성사진</span>
                                    </div>
                                    <div class="satel-image-path">
                                        <!--<img src="D:\DEV\intelliJ-workspace\smartvillage_web\src\main\resources\static\images\target01\satel_img_test\satel_img_test_2.webp">-->
                                        <!--<img src="../target01/satel_img_test/satel_img_test_1.webp" alt="">-->
                                    </div>
                                    <!-- 240723-->
                                    <div class="carousel slide" data-bs-touch="false" data-bs-interval="false">
                                        <div class="carousel-inner">
                                        </div>
                                        <div class="carousel-indicators">
                                        </div>
                                    </div>
                                    <!-- 240723-->
                                    <div>
                                        <table style="width: 100%;">
                                            <tr>
                                                <th>속성</th>
                                                <th>내용</th>
                                            </tr>
                                            <tr class="satal-shot-dt">
                                                <td>최근촬영일자</td>
                                                <td class="satel-shot-ymdhs"></td>
                                            </tr>
                                            <tr>
                                                <td>재해쓰레기 면적</td>
                                                <td class="satel-area"></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <%-- page2 --%>
                            <div class="dash-section-page hide" data-page="2">
                                <%-- 수위대비 발생량 차트 --%>
                                <div class="dash-section">
                                    <div class="dash-title-section">
                                        <span class="dash-title-span">월평균 수위대비 광역 재해쓰레기 발생량</span>
                                    </div>

                                    <div>
                                        <div class="chart" id="chart-satel" style="width: 550px; height: 230px;"></div>
                                    </div>
                                    <div id="satel-clicked-show-table">
                                        <div class="dash-cover" id="wl-table-cover-chartInfo">
                                            <span>조회할 월을 선택해 주세요.</span>
                                        </div>
                                        <!--
                                        <table style="width: 100%;">
                                            <tr>
                                                <th>관측월</th>
                                                <th>기상특보발령종류</th>
                                                <th>건수(건)</th>
                                                <th>특징</th>
                                            </tr>
                                            <tr>
                                                <td rowspan="2">8월</td>
                                                <td>호우주의보/경보</td>
                                                <td>18</td>
                                                <td rowspan="2">장마기간</td>
                                            </tr>
                                            <tr>
                                                <td>호우특보</td>
                                                <td>25</td>
                                            </tr>
                                        </table>
                                        -->
                                    </div>
                                </div>
                                <%-- 소요예산 그래프 --%>
                                <div class="dash-section">
                                    <div class="dash-title-section">
                                        <span class="dash-title-span">최근 관내 발생한 광역 재해쓰레기 및 처리 소요예산 그래프</span>
                                    </div>
                                    <div>
                                        <div class="chart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <%-- 해양 정화활동 --%>
                    <div class="side-section-page hide" id="activity-page">
                        <%-- 헤더 --%>
                        <div class="side-header-section">
                            <h1 class="header-title">부산시 해양 정화활동</h1>
                            <button class="my-activity-btn">내 활동 모아보기</button>
                        </div>
                        <div class="side-content-section landscape hide">
                                <!-- cover -->
                               <%-- <div class="dash-cover" id="cctv-dash-cover-landscape11">
                                    <span>조회할 CCTV를</span>
                                    <span>선택해 주세요.</span>
                                </div>--%>
                            <div style="height: 100%; display: flex; flex-direction: column;">
                                <%-- 정화활동 년월 조회 --%>
                                <div class="dash-section date-section" style="flex: 1;">
                                    <div class="datepicker-section">
                                        <span class="datepicker-span">시작</span>
                                        <input class="datepicker-input" id="datepicker-start-cctv-landscape11" type="month">
                                    </div>
                                    <span>~</span>
                                    <div class="datepicker-section">
                                        <span class="datepicker-span">종료</span>
                                        <input class="datepicker-input" id="datepicker-end-cctv-landscape11" type="month">
                                    </div>
                                    <div class="datepicker-btn-section">
                                        <button class=" select-btn">조회</button>
                                    </div>
                                </div>
                                    <div style="flex: 24;">
                                        <div class="dash-section-page cctv-dash-page1" data-page="1">
                                            <%-- 해양쓰레기 정화활동 상황판 --%>
                                            <div class="dash-section info-section" style="flex: 1">
                                                <div class="dash-title-section">
                                                    <span class="dash-title-span">거주지역 해양쓰레기 정화활동 상황판</span> <!--거주지역->지역구명으로 바껴야함-->
                                                </div>
                                                <div class="info-content-section">
                                                    <div style="flex: 1">
                                                        <div class="info-content-div1">
                                                            <h1 class="cctv-weight info-content-h1">4</h1>
                                                            <span class="info-content-span">건</span>
                                                        </div>
                                                        <div>
                                                            <span class="info-content-title">해양쓰레기 정화 건수</span>
                                                        </div>
                                                    </div>
                                                    <div style="flex: 1">
                                                        <div class="info-content-div2">
                                                            <h1 class="cctv-volume info-content-h1">33.6</h1>
                                                            <span class="info-content-span">kg</span>
                                                        </div>
                                                        <div>
                                                            <span class="info-content-title">해양쓰레기 수거량</span>
                                                        </div>
                                                    </div>
                                             <%--       <div style="flex: 1">
                                                        <div class="info-content-div3">
                                                            <h1 class="total-active info-content-h1">6</h1>
                                                            <span class="info-content-span">대</span>
                                                        </div>
                                                        <div>
                                                            <span class="info-content-title">관외 CCTV 활성화 대수</span>
                                                        </div>
                                                    </div>--%>
                                                </div>
                                            </div>
                                            <%-- 정화활동 등록하기 --%>
                                            <div class="dash-section monit-section" style="flex: 5">
                                                <div class="dash-title-section" style="margin-bottom: 0">
                                                    <span class="dash-title-span">거주지역 해양쓰레기 정화활동 등록하기</span>
                                                    <button class="">신규 글 등록하기</button>
                                                </div>
                                                <div class="living-create-table">
                                                    <form id="" name="create-living-form" enctype="multipart/form-data" method="POST">
                                                        <table>
                                                            <tr>
                                                                <th>프로젝트명*</th>
                                                                <th><input id="lp-nm" name="lpNm" type="text" maxlength="20" placeholder="프로젝트 이름을 입력하세요."></th>
                                                            </tr>
                                                            <tr class="lp-date">
                                                                <th>활동일*</th>
                                                                <th><input id="begin-date" name="beginDate" type="date"></th>
                                                            </tr>
                                                            <tr>
                                                                <th>활동 분류*</th>
                                                                <th class="area-list">
                                                                    <select name="sggId" id="sgg-id" class="sgg-select-list">
                                                                        <option value="" disabled selected>지역구를 선택하세요</option>
                                                                    </select>
                                                                    <select name="emdId" id="emd-id" class="emd-select-list">
                                                                        <option value="" disabled selected>읍면동을 선택하세요</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th>관련 링크</th>
                                                                <th><input id="lp-link" name="relateLink" type="text" placeholder="해당활동 관련 링크를 입력하세요"></th>
                                                            </tr>
                                                            <tr>
                                                                <th>가입 방식*</th>
                                                                <th>
                                                                    <select class="open-yn" name="openYN" id="open-yn">
                                                                        <option value="" disabled selected>:: 선 택 해 주 세 요 ::</option>
                                                                        <option value="Y">즉시 가입</option>
                                                                        <option value="N">관리자 승인 후 가입</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr class="exclude-height">
                                                                <th>프로젝트 소개*</th>
                                                                <th><textarea id="lp-content" name="lpContent" placeholder="프로젝트 관련 소개 내용을 자유롭게 입력하여 주세요."></textarea></th>
                                                            </tr>
                                                            <tr>
                                                                <th>커버사진</th>
                                                                <th>
                                                                    <%--      <label class="custom-file-upload">파일선택</label>--%>
                                                                    <input id="living-file-upload-btn" class="living-file-upload-btn" type="file" name="file"/>
                                                                </th>
                                                            </tr>
                                                        </table>
                                                        <div class="living-create-btn-container">
                                                            <button type="submit" class="living-create-btn living-btn">생성</button>
                                                            <div class="living-cancel-btn living-btn">취소</div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                            </div>

                        </div>
                    <!-- side-section-button -->
                    <button class="side-section-btn"></button>
                </div>
                <%-- dash board --%>
                <div class="zoom-control">
                    <div style="display: flex;flex-direction: column;width: 32px;height: 50px;overflow: hidden;border-radius: 4px;">
                        <button class="zoom-control-in zoom-control-btn" data-amount=1>+</button>
                        <div>
                            <div style="background-color: #dadce0;height: 1px;left: 4px;right: 4px;position: absolute;z-index: 1;"></div>
                        </div>
                        <button class="zoom-control-out zoom-control-btn" data-amount=-1>-</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <%-- cctv 영상 팝업 --%>
    <div class="cctv-live-popup popup-section hide">
        <div class="cctv-live-header">
            <span>관외 부유쓰레기 실시간 CCTV 영상</span>
            <button type="button" class="cctv-live-btn" id="cctv-live-btn">X</button>
        </div>
        <div class="cctv-live-div" style="height: 210px; margin-bottom: 8px">
            <span>을숙도 1번 CCTV</span>
            <video controls width="100%" height="186px" preload="auto" autoplay muted>
                <source src="${ctxPath}/videoPath/20220811.mp4" type="video/mp4">
            </video>
        </div>
        <div class="cctv-live-div">
            <span style="font-size: 0.8rem;">영상 출처 : (주)아이렘기술개발</span>
            <span style="font-size: 0.8rem;">실제 상황과 30초~1분 정도 차이가 날 수 있습니다.</span>
            <span style="color: red;font-size: 0.8rem;">현재 테스트 중이라 실제 CCTV 화면은 아닙니다.</span>
        </div>
    </div>
    <%-- cctv tooltip --%>
    <div id="cctv-tooltip" class="hide">
        <button type="button" id="cctv-tooltip-btn" class="cctv-tooltip-btn">CCTV 실시간</button>
    </div>
    <%-- 조회 범위 팝업--%>
    <div class="date-check-popup popup-section hide">
        <div class="date-check-div">
            <img class="date-check-img" src="${ctxPath}/images/target01/ic_check_date.webp" alt="">
        </div>
        <div class="date-check-div" style="margin: 16px 0;">
            <span style="color: #6d6d6d;">상세 정보 조회 기간은</span>
            <br>
            <span style="color: #6d6d6d;">최대 12개월까지만 가능합니다.</span>
        </div>
        <div class="date-check-div">
            <button type="button" class="date-check-btn" id="date-check-btn">확인</button>
        </div>
    </div>
    <%-- 보고서 팝업 --%>

</main>
<!-- custom js -->
<script src="js/common/common.js"></script>
<script src="js/common/common-map.js"></script>
<script src="js/common/string-util.js"></script>
<script src="js/target01/marine-debris.js"></script>
<script src="js/target01/marine-debris-map.js"></script>
<script src="js/target01/marine-debris-chart.js"></script>
</body>
</html>
