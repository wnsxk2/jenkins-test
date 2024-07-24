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

  <!-- custom js -->
  <script src="js/common/common.js"></script>
  <script src="js/common/string-util.js"></script>
  <script src="js/target01/marine-debris.js"></script>

  <!-- custom css -->
  <link href="css/common/common_test.css" type="text/css" rel="stylesheet">
  <link href="css/common/header_test.css" type="text/css" rel="stylesheet">
  <link href="css/target01/marine-debris.css" type="text/css" rel="stylesheet">

  <script>
    // 새로고침 시 최상단으로 이동 (스크롤 위치 기억 안함)
    history.scrollRestoration = "manual"

    $(document).ready(()=>{

      setMap();
      ScrollOut({
        cssProps: {
          visibleY: true,
          viewportY: true
        }
      });

      $(window).scroll(()=>{
        resetDrag();
      });
      setListOnOff('.menu-item > a', 1);
    });

  </script>
</head>
<!-- 배경 이미지 수정 필요 -->
<body style="background-color: #f5c7b1">
<header id="header">
  <%@ include file="/WEB-INF/views/common/header.jsp"%>
</header>
<!-- 배경 이미지 수정 필요 -->
<main>
  <div style="height: 500px;"></div>
  <div class="content-section" data-scroll>
    <div class="figure">
      <div class="title-section" >
        <img src="images/target01/title_icon.webp" alt="" style="height: 40px; width: 40px;">
        <h1>부산시 부유 쓰레기 모니터링 서비스</h1>
      </div>
      <div id="map" class="map-section">
      </div>
    </div>
  </div>
</main>
</body>
</html>