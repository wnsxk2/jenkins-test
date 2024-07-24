<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Main Page</title>
    <link rel="preload" href="fonts/Gong_Gothic_Medium.woff2" as="font" type="font/woff2" crossorigin="anonymous">

    <!-- jquery -->
    <script src="assets/jquery/jquery-3.7.1.js"></script>

    <!-- custom js -->
    <script src="js/common/common.js"></script>
    <script src="js/main/main.js"></script>

    <!-- custom css -->
    <link href="css/common/common_test.css" type="text/css" rel="stylesheet">
    <link href="css/common/header_test.css" type="text/css" rel="stylesheet">
    <link href="css/common/footer.css" type="text/css" rel="stylesheet">
    <link href="css/main/main.css" type="text/css" rel="stylesheet">

    <!-- AniView js -->
    <script src="assets/aniview/jquery.aniview.js"></script>
    <link rel="stylesheet" href="assets/aniview/animate.min.css">

    <!-- slick js-->
    <script src="assets/slick/slick.min.js"></script>
    <link rel="stylesheet" href="assets/slick/slick.css" />
    <link rel="stylesheet" href="assets/slick/slick-theme.css" />

</head>
<body>
<header id="header">
    <%@ include file="/WEB-INF/views/common/header.jsp"%>
</header>
<main>
    <!-- 메인 화면 -->
    <div id="section1">
        <div id="main-day">
            <!-- 낮/밤 테스트용 버튼 -->
            <div class="test-div">
                <div class="hour-test-btn">
                    <button class="day-btn">Day</button>
                    <button class="night-btn">Night</button>
                </div>
            </div>
            <!-- 변경 요소들 위치 선정 -->
            <!-- 사람들 -->
            <img class="main-content-img people-img" id="people-day" src="/images/main/people_day.webp" alt="">
            <img class="main-content-img people-hover hidden" id="people-hover-day" src="/images/main/people_hover.webp" alt="">
            <img class="question-mark people-question" src="/images/main/question_mark_right_down.webp" alt="">
            <!-- 위성 -->
            <img class="main-content-img satellite-img" id="satellite-day" src="/images/main/satellite.webp" alt="">
            <img class="main-content-img satellite-hover hidden"  id="satellite-hover-day" src="/images/main/satellite_hover.webp" alt="">
            <img class="question-mark satellite-question" src="/images/main/question_mark_left_down.webp" alt="">
            <!-- 쓰레기 -->
            <img class="main-content-img trash-img" id="trash-day" src="/images/main/trash_day.webp" alt="">
            <img class="main-content-img trash-hover hidden" id="trash-hover-day" src="/images/main/trash_hover.webp" alt="">
            <img class="question-mark trash-question" src="/images/main/question_mark_left_down.webp" alt="">
            <!-- 배 -->
            <img class="main-content-img ship-img" id="ship-day" src="/images/main/ship.webp" alt="">
            <img class="main-content-img ship-hover hidden" id="ship-hover-day" src="/images/main/ship_hover.webp" alt="">
            <img class="question-mark ship-question" src="/images/main/question_mark_right_down.webp" alt="">
            <!-- 산 -->
            <img class="main-content-img mountain-img" id="mountain-day" src="/images/main/mountain_day.webp" alt="">
            <img class="main-content-img mountain-hover hidden" id="mountain-hover-day" src="/images/main/mountain_hover.webp" alt="">
            <img class="question-mark mountain-question" src="/images/main/question_mark_right_down.webp" alt="">

        </div>
        <div id="main-night">
            <!-- 낮/밤 테스트용 버튼 -->
            <div class="test-div">
                <div class="hour-test-btn">
                    <button class="day-btn">Day</button>
                    <button class="night-btn">Night</button>
                </div>
            </div>

            <!-- 변경 요소들 위치 선정 -->
            <!-- 사람들 -->
            <img class="main-content-img people-img" id="people-night" src="/images/main/people_night.webp" alt="">
            <img class="main-content-img people-hover hidden" id="people-hover-night" src="/images/main/people_hover.webp" alt="">
            <img class="question-mark people-question" src="/images/main/question_mark_right_down.webp" alt="">

            <!-- 위성 -->
            <img class="main-content-img satellite-img" id="satellite-night" src="/images/main/satellite.webp" alt="">
            <img class="main-content-img satellite-hover hidden"  id="satellite-hover-night" src="/images/main/satellite_hover.webp" alt="">
            <img class="question-mark satellite-question" src="/images/main/question_mark_left_down.webp" alt="">
            <!-- 쓰레기 -->
            <img class="main-content-img trash-img" id="trash-night" src="/images/main/trash_night.webp" alt="">
            <img class="main-content-img trash-hover hidden" id="trash-hover-night" src="/images/main/trash_hover.webp" alt="">
            <img class="question-mark trash-question" src="/images/main/question_mark_left_down.webp" alt="">
            <!-- 배 -->
            <img class="main-content-img ship-img" id="ship-night" src="/images/main/ship.webp" alt="">
            <img class="main-content-img ship-hover hidden" id="ship-hover-night" src="/images/main/ship_hover.webp" alt="">
            <img class="question-mark ship-question" src="/images/main/question_mark_right_down.webp" alt="">
            <!-- 산 -->
            <img class="main-content-img mountain-img" id="mountain-night" src="/images/main/mountain_night.webp" alt="">
            <img class="main-content-img mountain-hover hidden" id="mountain-hover-night" src="/images/main/mountain_hover.webp" alt="">
            <img class="question-mark mountain-question" src="/images/main/question_mark_right_down.webp" alt="">
        </div>

        <!-- content -->
        <div class="click-content people-content hidden">
            <img class="" src="/images/main/people_content.webp" alt="">
            <img class="close-popup" id="people-close" src="/images/main/close_popup.webp" alt="">
        </div>
        <div class="click-content trash-content hidden">
            <img class="" src="/images/main/trash_content.webp" alt="">
            <img class="close-popup" id="trash-close" src="/images/main/close_popup.webp" alt="">
        </div>
        <div class="click-content satellite-content hidden">
            <img class="" src="/images/main/satellite_content.webp" alt="">
            <img class="close-popup" id="satellite-close" src="/images/main/close_popup.webp" alt="">
        </div>
        <div class="click-content ship-content hidden">
            <img class="" src="/images/main/ship_content.webp" alt="">
            <img class="close-popup" id="ship-close" src="/images/main/close_popup.webp" alt="">
        </div>
        <div class="click-content mountain-content hidden">
            <img class="" src="/images/main/mountain_content.webp" alt="">
            <img class="close-popup" id="mountain-close" src="/images/main/close_popup.webp" alt="">
        </div>
    </div>

    <!-- 부유 쓰레기 -->
    <div id="section2">
        <div class="line-content">
            <div class="line-left">
                <img class="aniview" data-av-animation="animate__lightSpeedInLeft" src="/images/main/line_short.webp" alt="">
            </div>
            <div class="line-right">
                <img class="aniview" data-av-animation="animate__lightSpeedInRight" src="/images/main/line_short.webp" alt="">
            </div>
        </div>
        <div class="count">
            <span class="num">65</span>
        </div>
        <img class="aniview" data-av-animation="animate__rotateInDownLeft animate__slow" id="section02-cctv01" src="/images/main/section02/section02_cctv01.webp" alt="">
        <img class="aniview" data-av-animation="animate__rotateInUpLeft animation-delay: 1s animate__slow" id="section02-cctv02" src="/images/main/section02/section02_cctv02.webp" alt="">
        <img class="aniview" data-av-animation="animate__shakeX animate__infinite animate__slow" id="dron" src="/images/main/section02/dron.webp" alt="">
    </div>

    <!-- 미세먼지 -->
    <div id="section3">
        <div class="line-content">
            <div class="line-left">
                <img class="aniview" data-av-animation="animate__lightSpeedInLeft" src="/images/main/line.webp" alt="">
            </div>
            <div class="line-right">
                <img class="aniview" data-av-animation="animate__lightSpeedInRight" src="/images/main/line.webp" alt="">
            </div>
        </div>

        <img id="section03-satellite" class="aniview" data-av-animation="animate__tada animate__repeat-2" src="/images/main/section03/section03_satellite.webp" alt="">
        <img id="magnifier" class="aniview" data-av-animation="animate__shakeY animate__repeat-2 animate__slow" src="/images/main/section03/magnifier.webp" alt="">
        <img id="message" class="aniview"  data-av-animation="animate__jello animate__infinite " src="/images/main/section03/message.webp" alt="">
    </div>

    <!-- 스마트 오션 빌리지 -->
    <div id="section4">
        <img id="section04-satellite" class="aniview" data-av-animation="animate__swing " src="/images/main/section04/section04_satellite.webp" alt="">
        <img id="section04-cctv" class="aniview" data-av-animation="animate__slideInUp " src="/images/main/section04/section04_cctv.webp" alt="">
        <img id="section04-busan" class="aniview" data-av-animation="animate__heartBeat animate__repeat-2 animate__slow" src="/images/main/section04/section04_busan.webp" alt="">
        <footer>
            <%@ include file="/WEB-INF/views/common/footer.jsp"%>
        </footer>
    </div>



</main>
</body>
</html>