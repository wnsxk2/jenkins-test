<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Data Upload</title>

    <!--jquery-->
    <script src="assets/jquery/jquery-3.7.1.min.js"></script>
    <script src="assets/jquery/jquery-ui.js"></script>
    <script src="assets/jquery/jquery.twbsPagination.js"></script>

    <!--bootstrap-->
    <script src="assets/bootstrap/js/bootstrap.js"></script>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.css">

    <!-- custom css -->
    <link href="css/common/common.css" type="text/css" rel="stylesheet">
    <link href="css/common/header.css" type="text/css" rel="stylesheet">
    <link href="css/main/file-upload.css" type="text/css" rel="stylesheet">
</head>
<body>
<header id="header" class="header">
    <%@ include file="/WEB-INF/views/common/header.jsp"%>
</header>
<aside id="side-menu">
    <%@ include file="/WEB-INF/views/main/user-side-menu.jsp"%>
</aside>

<main>
    <div class="mobile-side-menu-container mobile">
        <a href="/main.do">
            <img src="${ctxPath}/images/main/main_page_home_icon.webp" alt="">
        </a>
        <img src="${ctxPath}/images/main/menu_arrow.webp" alt="">
        <div class="mobile-top-menu">
            데이터 업로드
        </div>
        <img src="${ctxPath}/images/main/menu_arrow.webp" alt="">
        <div class="mobile-low-menu file-upload">
            데이터 업로드
        </div>
    </div>
    <div class="file-upload-main">
    <div class="file-upload-wrap">
        <div class="file-upload-title-wrap">
            <div class="file-upload-title">
                데이터 업로드
            </div>
            <div class="job-name-container">
                <div class="job-name">제공 정보</div>
                <select class="job-name-list">
                    <option value="" disabled selected>:: 선 택 해 주 세 요 ::</option>
                </select>
            </div>
        </div>
        <div class="file-upload-container">
            <div class="file-box">
                <form id="file-form" name="file-form" enctype="multipart/form-data" method="post">
                    <input id="file-btn" type="file" name="file" style="display: none;" multiple/>
                    <div id="file-drop" class="file-drop">
                        <div class="file-upload-text">
                            <p>
                                첨부할 파일을 여기에 끌어다 놓거나,
                                <span class="break-line">파일 선택 버튼을 직접 선택해주세요.</span>
                                <span class="break-line">(다중 선택 가능)</span>
                            </p><br>
                            <p class="file-select-text">파일 선택</p>
                        </div>
                    </div>
                    <div class="pop-wrap">
                        <div class="pop-container">
                            <div class="pop-header">
                                <p class="pop-header-title">데이터 업로드 재확인</p>
                                <div class="pop-header-close pop-close">
                                    <img src="${ctxPath}/images/main/delete_icon.webp">
                                </div>
                               <%-- <p class="pop-header-close pop-close">X</p>--%>
                            </div>
                            <div class="pop-contents">
                                <div class="pop-title pop-contents-inner">
                                    업로드 하고자 하는 파일 종류 및 목록을 확인하여 주세요.
                                </div>
                                <div class="pop-contents-info">
                                    <div class="pop-job-name pop-contents-inner"></div>
                                    <div class="pop-file-list">
                                        <p class="pop-contents-inner">제공 파일명:</p>
                                        <div class="pop-file-name"></div>
                                    </div>
                                </div>
                                <div class="upload-btn-container">
                                    <button type="submit" class="upload-btn">업로드</button>
                                    <div class="pop-close-btn pop-close">취소</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="file-count-container">
                    <div class="file-count"></div>
                    <button class="delete-all-files">X 전체 파일 삭제</button>
                </div>
                <div class="file-name"></div>
                <div class="canvas-wrap">
                    <canvas class="file-canvas" data-percent="100"></canvas>
                </div>
                <div class="popup-btn-container">
                    <button id="save" class="popup-btn">업로드 하기</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</main>
<div class="mobile-file-upload-pop">
    <img src="${ctxPath}/images/main/mobile-file-upload-none.webp" alt="">
    <div class="mobile-file-upload-pop-text">
        <div class="mobile-file-upload-pop-title">
            모바일 웹 사용 불가<br>
        </div>
        <div>
            해당 서비스는 모바일에서<br>
            사용할 수 없습니다.<br>
            PC 버전을 이용해 주세요.
        </div>
    </div>

</div>
<script src="js/common/common.js"></script>
<script src="js/main/file-upload.js"></script>
</body>
</html>
