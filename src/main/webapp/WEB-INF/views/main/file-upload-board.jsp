<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>data-upload-board</title>

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
            <img src="${ctxPath}/images/common/main_page_home_icon.webp" alt="">
        </a>
        <img src="${ctxPath}/images/common/menu_arrow.webp" alt="">
        <div class="mobile-top-menu">
            데이터 업로드
        </div>
        <img src="${ctxPath}/images/common/menu_arrow.webp" alt="">
        <div class="mobile-low-menu file-upload">
            데이터 업로드 이력
        </div>
    </div>
    <div class="file-upload-board-container">
        <div class="file-board-header">
            <h2 class="file-board-title">데이터 업로드 이력</h2>
            <div class="calendar-wrap">
                <div class="calendar-container">
                    <span>시작</span>
                    <input class="calendar calendar-start" type="date">
                    <span>~ 종료</span>
                    <input class="calendar calendar-end" type="date" max="">
                    <button class="calendar-btn date-search-btn">조회</button>
                    <button class="calendar-btn date-refresh-btn">전체조회</button>
                </div>
            </div>
        </div>
        <table class="file-upload-board" id="table">
            <thead>
            <tr class="table-header">
                <th>제공 정보</th>
                <th>제공 일시</th>
                <th>제공자</th>
                <th>파일명</th>
                <th class="table-header-edit">수정</th>
                <th class="table-header-delete">삭제</th>
            </tr>
            </thead>
            <tbody class="upload-file-list"></tbody>
        </table>
        <div class="pagination-container">
        </div>
        <div class="edit-pop-container file-upload-board-pop">
            <div class="pop-header">
                <p>파일 수정 업로드</p>
                <div class="pop-header-close pop-close board-pop-close">
                    <img src="${ctxPath}/images/main/delete_icon.webp">
                </div>
                <%--<p class="pop-header-close pop-close board-pop-close">X</p>--%>
            </div>
            <form id="file-edit-form" name="file-edit-form" enctype="multipart/form-data" method="post">
                <div class="update-file-container">
                    <input id="update-file-btn" type="file" name="file" style="display: none;"/>
                    <div id="update-file-drop" class="update-file-drop">
                        <div>
                            <p>
                                첨부할 파일을 여기에 끌어다 놓거나, <br>
                                파일 선택 버튼을 직접 선택해주세요.
                            </p>
                            <p class="file-select-text">파일 선택</p>
                        </div>
                    </div>
                </div>
                <div class="edit-file-name-container">
                </div>
                <div class="upload-btn-container board-pop-btn-container">
                    <button type="submit" class="upload-file-update-btn">수정</button>
                    <div class="pop-close-btn pop-close">취소</div>
                </div>
            </form>
        </div>
        <div class="delete-pop-container file-upload-board-pop">
            <div class="pop-header">
                <p>파일 삭제 재확인</p>
                <div class="pop-header-close pop-close board-pop-close">
                    <img src="${ctxPath}/images/main/delete_icon.webp">
                </div>
            <%--<p class="pop-header-close pop-close board-pop-close">X</p>--%>
            </div>
            <div class="pop-contents">
                <div class="pop-title pop-contents-inner">
                    삭제하고자 하는 파일 종류 및 목록을 확인하여 주세요.
                </div>
                <div class="pop-contents-info">
                    <div class="delete-job-name"></div>
                    <div class="delete-job-date">
                    </div>
                    <div class="delete-file-list"></div>
                </div>
                <div class="upload-btn-container board-pop-btn-container">
                    <button class="upload-file-delete-btn">삭제</button>
                    <button class="pop-close-btn pop-close">취소</button>
                </div>
            </div>
        </div>
    </div>
</main>
<script src="js/common/common.js"></script>
<script src="js/main/file-upload.js"></script>
</body>
</html>
