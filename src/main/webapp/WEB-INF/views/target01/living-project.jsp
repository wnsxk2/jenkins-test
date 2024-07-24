<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Target1: Living Project</title>
    <link rel="preload" href="fonts/Gong_Gothic_Medium.woff2" as="font" type="font/woff2" crossorigin="anonymous">

    <!-- jquery -->
    <script src="assets/jquery/jquery-3.7.1.min.js"></script>

    <!-- ol -->
    <script src="assets/ol/ol.js"></script>
    <link rel="stylesheet" href="assets/ol/ol.css">


    <!--echarts-->
    <script src="assets/echarts/echarts.js"></script>

    <!--bootstrap-->
    <script src="assets/bootstrap/js/bootstrap.js"></script>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.css">

    <!-- slick js-->
    <script defer src="assets/slick/slick.min.js"></script>
    <link rel="stylesheet" href="assets/slick/slick.css"/>
    <link rel="stylesheet" href="assets/slick/slick-theme.css"/>

    <!-- custom css -->
    <link href="css/common/common.css" type="text/css" rel="stylesheet">
    <link href="css/common/header.css" type="text/css" rel="stylesheet">
    <link href="css/target01/living-project.css" type="text/css" rel="stylesheet">
</head>
<body>
<header id="header" class="header">
    <%@ include file="/WEB-INF/views/common/header.jsp"%>
</header>
<main>
    <div class="living-wrap">
        <div class="mobile-side-menu-wrap">
            <div class="mobile-side-menu-container mobile">
                <a href="/main.do">
                    <img src="${ctxPath}/images/common/main_page_home_icon.webp" alt="">
                </a>
                <img src="${ctxPath}/images/common/menu_arrow.webp" alt="">
                <div class="mobile-top-menu">
                    시민 참여 활동
                </div>
                <img src="${ctxPath}/images/common/menu_arrow.webp" alt="">
                <div class="mobile-low-menu">
                    리빙프로젝트
                </div>
            </div>
        </div>

        <div class="living-title">
            부산시 해양정화 리빙 프로젝트
        </div>
        <div class="living-container">
            <div class="mobile-living-definition-wrap right-wrap"> <!--show 지우기-->
                <div class="living-definition-title-wrap">
                    <div class="living-definition-title">
                        해양쓰레기 리빙 프로젝트란?
                    </div>
                    <div class="mobile-lp-btn-container">
                        <button class="lp-search-btn project-btn">프로젝트 검색</button>
                        <button class="living-project-btn project-btn">프로젝트 생성</button>
                    </div>
                </div>
                <hr>
                <div class="living-definition-content-wrap">
                    <div class="living-definition-content">
                        해양쓰레기 리빙 프로젝트는<br>
                        해양환경 보호에 관심있는 부산시민들이 모여<br>
                        해양쓰레기 수거 등 해양정화활동을 진행하는<br>
                        <span>시민참여형 공공프로젝트</span>입니다.
                    </div>
                    <div class="living-definition-img">
                        <img src="${ctxPath}/images/target01/ic_living_project.webp" alt="">
                    </div>
                </div>
            </div>
            <div class="living-left">
                <div class="living-search-wrap">
                    <form id="search-form" name="search-form" method="get">
                        <div class="living-search-container">
                            <div class="living-search">
                                <input name="lpNm" type="text" id="search-input" placeholder="검색할 프로젝트의 이름을 입력하세요.">
                            </div>
                            <div class="living-search-btn">
                                <button type="button" class="search-btn">검색</button>
                            </div>
                        </div>
                        <div class="living-detail-search-container">
                            <div class="living-detail-search-drop-down">
                                <div class="living-detail-search"> <!--여기 on 지우기-->
                                    <div class="living-detail-search-title">
                                        어떤 프로젝트를 찾고 계신가요? 아래의 내용을 선택하여 관심 프로젝트를 찾아보세요.
                                    </div>
                                    <div class="living-detail-search-table">
                                        <table>
                                            <tr>
                                                <th>키워드</th>
                                                <th>
                                                    <input class="living-detail-search-keyword" name="lpContent" type="text" placeholder="검색할 프로젝트 키워드를 입력하세요.">
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>관심 지역</th>
                                                <th class="sgg-radio-list living-checkbox">
                                                    <label><input value="all" type="checkbox" name="sggId" class="sgg-id"> 전체</label>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>활동 상태</th>
                                                <th class="living-status-list living-checkbox">
                                                    <label><input type="checkbox" value="all" name="lPStatus">전체</label>
                                                    <label><input type="checkbox" value="lPStatus01" name="lPStatus">진행중</label>
                                                    <label><input type="checkbox" value="lPStatus02" name="lPStatus">진행 종료</label>
                                                    <label><input type="checkbox" value="lPStatus03" name="lPStatus">진행 예정</label>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="living-detail-search-drop-down-btn">
                                    <img class="arrow_down on" src="${ctxPath}/images/target01/arrow_down.webp" alt="">
                                    <img class="arrow_up" src="${ctxPath}/images/target01/arrow_up.webp" alt="">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="living-list show">
                    <div class="recent-living-wrap">
                        <div class="recent-living-title living-menu-title lp-menu-title">
                            최근 개설된 리빙 프로젝트
                        </div>
                        <div class="lp-slide-container">
                            <button class="lp-slide-btn" id="recent-lp-prev">◀</button>
                            <div class="lp-slide">
                                <div class="recent-lp-container">
                                </div>
                            </div>
                            <button class="lp-slide-btn" id="recent-lp-next">▶</button>
                        </div>
                    </div>
                    <div class="all-living-wrap">
                        <div class="all-living-title living-menu-title lp-menu-title">
                            전체 개설 리빙 프로젝트
                        </div>
                        <div class="lp-slide-container">
                            <button class="lp-slide-btn" id="all-lp-prev">◀</button>
                            <div class="lp-slide">
                                <div class="all-lp-container">
                                </div>
                            </div>
                            <button class="lp-slide-btn" id="all-lp-next">▶</button>
                        </div>
                    </div>
                </div>
                <div class="search-list">
                    <div class="search-list-header">
                        <div class="search-count"></div>
                        <hr>
                    </div>
                    <div class="search-result-list-container">
                        <div class="search-result-list"></div>
                    </div>
                    <div class="more-btn-container">
                        <button class="more-btn">
                            +더보기
                        </button>
                    </div>
                </div>
            </div>
            <div class="living-right">
                <div class="living-definition-wrap right-wrap">
                    <div class="living-definition-title-wrap">
                        <div class="living-definition-title">
                            해양쓰레기 리빙 프로젝트란?
                        </div>
                        <div class="mobile-lp-btn-container">
                            <button class="lp-search-btn project-btn">프로젝트 검색</button>
                            <button class="living-project-btn project-btn">프로젝트 생성</button>
                        </div>
                    </div>
                    <hr>
                    <div class="living-definition-content-wrap">
                        <div class="living-definition-content">
                            해양쓰레기 리빙 프로젝트는<br>
                            해양환경 보호에 관심있는 부산시민들이 모여<br>
                            해양쓰레기 수거 등 해양정화활동을 진행하는<br>
                            <span>시민참여형 공공프로젝트</span>입니다.
                        </div>
                        <div class="living-definition-img">
                            <img src="${ctxPath}/images/target01/ic_living_project.webp" alt="">
                        </div>
                    </div>
                </div>
                <div class="right-wrap right-ratio-wrap">
                    <div class="living-ratio-wrap show">
                        <div class="right-title">해양쓰레기 리빙 프로젝트 통계</div>
                        <div class="debris-ratio-wrap">
                            <div class="lp-sub-title">해양쓰레기 수거량 및 정화활동 횟수</div>
                            <div id="activity-count-graph" class="activity-count-graph"></div>
                        </div>
                        <div class="living-accum-wrap">
                            <div class="accum-member accum">
                                <div class="lp-sub-title">리빙 프로젝트 활동 누적 회원</div>
                                <div id="accum-user-graph" class="accum-graph"></div>
                            </div>
                            <div class="accum-count accum">
                                <div class="lp-sub-title">리빙 프로젝트 누적 개수</div>
                                <div id="accum-count-graph" class="accum-graph"></div>
                            </div>
                        </div>
                    </div>
                    <div class="living-create-wrap">
                        <div class="living-create-title right-title">해양쓰레기 리빙 프로젝트 생성하기</div>
                        <div class="living-create-table">
                            <form id="create-living-form" name="create-living-form" enctype="multipart/form-data" method="POST">
                                <table>
                                    <tr>
                                        <th>프로젝트명*</th>
                                        <th><input id="lp-nm" name="lpNm" type="text" maxlength="20" placeholder="프로젝트 이름을 입력하세요."></th>
                                    </tr>
                                    <tr class="lp-date">
                                        <th>활동일*</th>
                                        <th><input id="begin-date" name="beginDate" type="date"></th>
                                    </tr>
                                    <tr class="lp-date">
                                        <th>종료일</th>
                                        <th><input name="endDate" type="date" id="end-date"></th>
                                    </tr>
                                    <tr>
                                        <th>주요 활동 지역*</th>
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
</main>
<!-- custom js -->
<script src="js/common/common.js"></script>
<script src="js/target01/living-project.js"></script>
</body>
</html>
