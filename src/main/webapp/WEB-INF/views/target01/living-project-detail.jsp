<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Target1: Living Project Detail</title>
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
        <img src="${ctxPath}/images/common/menu_arrow.webp" alt="">
        <div class="mobile-low-menu">
          리빙프로젝트 상세 페이지
        </div>
      </div>
    </div>
    <div class="living-title">
      부산시 해양정화 리빙 프로젝트 상세 페이지
    </div>
    <div class="lp-detail-top-wrap">
      <div class="lp-detail-left-wrap lp-detail-horizon-wrap">
        <div class="lp-detail-header-wrap">
          <div class="living-menu-title mobile-living-menu-title">프로젝트 설명</div>
          <button class="lp-join-btn">가입하기</button>
          <hr>
          <div class="lp-join-success-pop-wrap lp-join-pop-wrap">
            <div class="lp-join-pop-title-wrap">
              <div class="lp-join-pop-title">리빙 프로젝트 가입완료</div>
              <img src="${ctxPath}/images/target01/delete_icon.webp" class="lp-join-success-close-btn" alt="">
            </div>
            <div class="lp-img-wrap">
              <img class="join-success-img" src="${ctxPath}/images/target01/lp_join_success.webp">
            </div>
            <div class="lp-join-pop-text">
              축하드립니다.<br>
              <c:if test="${not empty index}">
                <span>"${index[0].lpNm}" </span> 리빙프로젝트에<br>
              </c:if>
              정상적으로 가입되었습니다.
            </div>
          </div>
          <div class="lp-join-wait-pop-wrap lp-join-pop-wrap">
            <div class="lp-join-pop-title-wrap">
              <div class="lp-join-pop-title">리빙 프로젝트 승인대기</div>
              <img src="${ctxPath}/images/target01/delete_icon.webp" class="lp-join-success-close-btn" alt="">
            </div>
            <div class="lp-img-wrap">
              <img class="join-success-img" src="${ctxPath}/images/target01/lp_join_wait.webp">
            </div>
            <div class="lp-join-pop-text">
              가입신청이 완료되었습니다.<br>
              현재 가입승인 대기상태 이오니<br>
              관리자의 승인을<br>
              기다리시길 바랍니다.
            </div>
          </div>

        </div>
        <hr>
        <div class="lp-detail-content-wrap">
          <c:if test="${not empty index}">
            <div class="lp-detail-text-wrap">
              <div>
                프로젝트 명 : <span>${index[0].lpNm}</span>
              </div>
              <div>
                활동일 : <span>${index[0].beginDate} ~ ${index[0].endDate}</span>
              </div>
              <div>
                참여자 : <span>${index[0].userCount}</span>
              </div>
              <div>
                주요 활동지역 : <span>${index[0].sggNm} ${index[0].emdNm}</span>
              </div>
              <div>
                가입 방식 : <span class="lp-open-yn">${index[0].openYN}</span>
              </div>
              <div>
                관련 링크 :
                <c:if test="${not empty index[0].relateLink}">
                  <a href="${index[0].relateLink}">링크 이동</a>
                </c:if>
              </div>
              <div class="lp-contents-title">
                프로젝트 소개 :
              </div>
              <div class="lp-contents-wrap">
                <p class="lp-contents">${index[0].lpContent}</p>
                <button class="lp-contents-more-btn">더보기</button>
              </div>
            </div>
            <div class="lp-detail-img-wrap">
              <c:choose>
                <c:when test="${empty index[0].thumbPath}">
                  <img src="${ctxPath}/images/target01/lp_img_test/lp_image.webp" alt="">
                </c:when>
                <c:otherwise>
                  <img src="${ctxPath}${index[0].thumbPath}/${index[0].strgFileNm}" alt="">
                </c:otherwise>
              </c:choose>
            </div>
          </c:if>
        </div>
      </div>
      <div class="lp-detail-right-wrap lp-detail-horizon-wrap">
        <div class="living-menu-title mobile-living-menu-title">프로젝트 통계</div>
        <hr>
        <div class="lp-detail-ratio-wrap">
          <div class="lp-detail-map-wrap lp-detail-ratio-content">
            <div id="map" class="active-map"></div>
            <div class="lp-detail-ratio-title active-map-title">프로젝트 주요 활동 지역</div>
          </div>
          <div class="lp-detail-graph-wrap lp-detail-ratio-content">
            <div id="activity-sum-graph" class="activity-sum-graph"></div>
            <div class="lp-detail-ratio-title activity-sum-graph-title">프로젝트 활동(수거량) 통계</div>
          </div>
        </div>
      </div>
    </div>
    <div class="lp-detail-bottom-wrap">
      <div class="lp-active-slide lp-detail-horizon-wrap">
        <div class="living-menu-title mobile-living-menu-title">프로젝트 갤러리</div>
        <hr>
          <div class="activity-slide-wrap">
            <button class="lp-slide-btn" id="activity-prev">◀</button>
            <div class="activity-slide-container">
             <c:forEach var="item" items="${index}">
               <c:forEach var="activityVO" items="${item.activityVO}">
                   <div class="activity-slide-list on" data-index="${activityVO.clctSeq}">
                       <c:set var="path" value="${activityVO.clctImgPath}" />
                       <c:set var="length" value="${fn:length(path)}" />
                       <c:set var="pathDir" value="${fn:substring(path, length - 6, length)}" />
                       <c:choose>
                         <c:when test="${empty pathDir}">
                           <img src="${ctxPath}/images/target01/lp_img_test/lp_image.webp" alt="">
                         </c:when>
                         <c:otherwise>
                           <img src="${ctxPath}/images/target01/lp_img_test/${pathDir}/${activityVO.clctImgPath.clctStrgFileNm}" alt="">
                         </c:otherwise>
                       </c:choose>
                     <div class="activity-slide-text">
                       <div class="activity-slide-img-wrap">
                         <img src="${ctxPath}/images/target01/ic_like.webp" alt="">
                         <div class="activity-slide-like-count active-slide-count">5</div>
                         <img src="${ctxPath}/images/target01/ic_reply.webp" alt="">
                         <div class="activity-slide-reply-count active-slide-count">0</div>
                         <img class="activity-slide-share" src="${ctxPath}/images/target01/ic_share.webp" alt="">
                       </div>
                       <div class="activity-slide-title">${activityVO.clctTitle}</div>
                       <div class="activity-slide-author">${item.avataNm}</div>
                       <div class="activity-slide-date">${activityVO.clctRegDate}</div>
                     </div>
                   </div>
               </c:forEach>
             </c:forEach>
            </div>
            <button class="lp-slide-btn" id="activity-next">▶</button>
          </div>
      </div>
    </div>
  </div>
</main>

<script>

  let activityMonth;
  let monthList = [];
  let activitySumData = [];

  let format = new ol.format.WKT();

  let clctPositionGeom
  let activityGeomList = [];
  let activityGeom;


  //프로젝트 활동(수거량) 통계 그래프
  <c:forEach var="item" items="${graph}">
    activityMonth = '${item.ratioMonth}'.substring(5, 7)+'월';
    monthList.push(activityMonth);
    activitySumData.push(Number('${item.clctVolumeSum}'));
  </c:forEach>


  <c:if test="${not empty index}">
    let emdCenterGeom = '${index[0].emdCenterGeom}';
    // WKT를 Feature로 변환
    let activityFeature = format.readFeature(emdCenterGeom);
    let activityCenter = activityFeature.getGeometry().flatCoordinates;
  </c:if>


  <c:forEach var="item" items="${index}">
    <c:forEach var="activityVO" items="${item.activityVO}">
      clctPositionGeom = '${activityVO.clctPositionGeom}'; // 문자열로 처리
      activityGeom = format.readFeature(clctPositionGeom).getGeometry();
      activityGeomList.push(activityGeom);
    </c:forEach>
  </c:forEach>

</script>



<!-- custom js -->
<script src="js/common/common.js"></script>
<script src="js/common/common-map.js"></script>
<script src="js/target01/living-project-detail.js"></script>

</body>
</html>
