<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main Page</title>
    <link rel="preload" href="fonts/Gong_Gothic_Medium.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" as="image" href="${ctxPath}/images/main/main_collection_1.webp" type="image/webp">
    <link rel="preload" as="image" href="${ctxPath}/images/main/main_collection_2.webp" type="image/webp">
    <link rel="preload" as="image" href="${ctxPath}/images/main/text_collection.webp" type="image/webp">
    <link rel="preload" as="image" href="${ctxPath}/images/main/main_day.webp" type="image/webp">
    <link rel="preload" as="image" href="${ctxPath}/images/main/main_night.webp" type="image/webp">

    <!-- jquery -->
    <script defer src="assets/jquery/jquery-3.7.1.js"></script>

    <!-- AniView js -->
    <script defer src="assets/aniview/jquery.aniview.js"></script>
    <link rel="stylesheet" href="assets/aniview/animate.min.css">

    <!-- slick js-->
    <script defer src="assets/slick/slick.min.js"></script>
    <link rel="stylesheet" href="assets/slick/slick.css"/>
    <link rel="stylesheet" href="assets/slick/slick-theme.css"/>

    <!-- custom css -->
    <link rel="stylesheet" href="css/common/common.css">
    <link rel="stylesheet" href="css/common/header.css">
    <link href="css/common/footer.css" type="text/css" rel="stylesheet">
    <link href="css/main/main.css" type="text/css" rel="stylesheet">

</head>
<body style="background: #f9f9f9;">
<header id="header" class="header">
    <%@ include file="/WEB-INF/views/common/header.jsp" %>
</header>
    <button class="btntest" style="display: none"></button>
    <!-- 메인 화면 -->
    <div style="margin-bottom: 60px;">
        <div id="main-day" class="main-section">
            <!-- 낮/밤 테스트용 버튼 -->
            <div class="test-div">
                <div class="hour-test-btn">
                    <button class="day-btn">Day</button>
                    <button class="night-btn">Night</button>
                </div>
            </div>

            <!-- 변경 요소들 위치 선정 -->
            <!-- 사람들 -->
            <div class="people-section">
                <div class="main-content-img people-img" id="people-day"></div>
                <div class="main-content-img people-hover hide" id="people-hover-day"></div>
                <div class="question-mark people-question"></div>
            </div>

            <!-- 위성 -->
            <div class="satellite-section">
                <div class="main-content-img satellite-img" id="satellite-day"></div>
                <div class="main-content-img satellite-hover hide" id="satellite-hover-day"></div>
                <div class="question-mark satellite-question"></div>
            </div>

            <!-- 쓰레기 -->
            <div class="trash-section">
                <div class="main-content-img trash-img" id="trash-day"></div>
                <div class="main-content-img trash-hover hide" id="trash-hover-day"></div>
                <div class="question-mark trash-question"></div>
            </div>

            <!-- 배 -->
            <div class="ship-section">
                <div class="main-content-img ship-img" id="ship-day"></div>
                <div class="main-content-img ship-hover hide" id="ship-hover-day"></div>
                <div class="question-mark ship-question"></div>
            </div>

            <!-- 산 -->
            <div class="mountain-section">
                <div class="main-content-img mountain-img" id="mountain-day"></div>
                <div class="main-content-img mountain-hover hide" id="mountain-hover-day"></div>
                <div class="question-mark mountain-question"></div>
            </div>

            <!-- content -->
            <div class="click-content people-content hide">
                <div class="people-msg"></div>
                <div class="close-popup" id="people-close"></div>
            </div>
            <div class="click-content trash-content hide">
                <div class="trash-msg"></div>
                <div class="close-popup" id="trash-close"></div>
            </div>
            <div class="click-content satellite-content hide">
                <div class="satellite-msg"></div>
                <div class="close-popup" id="satellite-close"></div>
            </div>
            <div class="click-content ship-content hide">
                <div class="ship-msg"></div>
                <div class="close-popup" id="ship-close"></div>
            </div>
            <div class="click-content mountain-content hide">
                <div class="mountain-msg"></div>
                <div class="close-popup" id="mountain-close"></div>
            </div>
        </div>
    </div>

    <!-- 부유 쓰레기 -->
    <div style="margin-bottom: 60px;">
        <div id="section2">
            <div class="left-line">
                <img class="aniview lazyload" data-av-animation="animate__lightSpeedInLeft"
                     src="${ctxPath}/images/main/line_short.webp" alt="">
            </div>
            <div class="right-line">
                <img class="aniview lazyload" data-av-animation="animate__lightSpeedInRight"
                     src="${ctxPath}/images/main/line_short.webp" alt="">
            </div>

            <div class="count">
                <span class="num">65</span>
            </div>

            <div class="cctv01">
                <img class="aniview lazyload" data-av-animation="animate__rotateInDownLeft animate__slow" id="section02-cctv01" src="${ctxPath}/images/main/section02/section02_cctv01.webp" alt="">
            </div>

            <div class="cctv02">
                <img class="aniview lazyload" data-av-animation="animate__rotateInUpLeft animation-delay: 1s animate__slow" id="section02-cctv02" src="${ctxPath}/images/main/section02/section02_cctv02.webp" alt="">
            </div>

            <div class="dron">
                <img class="aniview lazyload" data-av-animation="animate__shakeX animate__infinite animate__slow" id="dron" src="${ctxPath}/images/main/section02/dron.webp" alt="">
            </div>
        </div>
    </div>

    <!-- 미세먼지 -->
    <div style="margin-bottom: 60px;">
        <div id="section3">
            <div class="left-line">
                <img class="aniview lazyload" data-av-animation="animate__lightSpeedInLeft" src="${ctxPath}/images/main/line_short.webp" alt="">
            </div>
            <div class="right-line">
                <img class="aniview lazyload" data-av-animation="animate__lightSpeedInRight" src="${ctxPath}/images/main/line_short.webp" alt="">
            </div>

            <div class="satellite">
                <img id="section03-satellite" class="aniview lazyload" data-av-animation="animate__tada animate__repeat-2" src="${ctxPath}/images/main/section03/section03_satellite.webp" alt="">
            </div>

            <div class="magnifier">
                <img id="magnifier" class="aniview lazyload" data-av-animation="animate__shakeY animate__repeat-2 animate__slow" src="${ctxPath}/images/main/section03/magnifier.webp" alt="">
            </div>

            <div class="message">
                <img id="message" class="aniview lazyload"  data-av-animation="animate__jello animate__infinite " src="${ctxPath}/images/main/section03/message.webp" alt="">
            </div>

        </div>
    </div>

    <!-- 스마트 오션 빌리지 -->
    <div style="margin-bottom: 60px;">
        <div id="section4">
            <div class="left-line">
                <img class="aniview lazyload" data-av-animation="animate__lightSpeedInLeft"
                     src="${ctxPath}/images/main/line_short.webp" alt="">
            </div>
            <div class="right-line">
                <img class="aniview lazyload" data-av-animation="animate__lightSpeedInRight"
                     src="${ctxPath}/images/main/line_short.webp" alt="">
            </div>
            <div class="satellite">
                <img id="section04-satellite" class="aniview lazyload" data-av-animation="animate__swing" src="/images/main/section04/section04_satellite.webp" alt="">
            </div>
            <div class="cctv">
                <img id="section04-cctv" class="aniview lazyload" data-av-animation="animate__slideInUp" src="/images/main/section04/section04_cctv.webp" alt="">
            </div>
            <div class="busan">
                <img id="section04-busan" class="aniview lazyload" data-av-animation="animate__heartBeat animate__repeat-2 animate__slow" src="/images/main/section04/section04_busan.webp" alt="">
            </div>
        </div>
    </div>
</main>
<footer>
    <button class="footer-btn" id="footer-prev">◀</button>
    <%@ include file="/WEB-INF/views/common/footer.jsp" %>
    <button class="footer-btn" id="footer-next">▶</button>
</footer>
<!-- custom js -->
<script defer src="js/common/common.js"></script>
<script defer src="js/main/main.js"></script>
</body>
</html>
