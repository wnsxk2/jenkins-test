<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="side-menu-wrap">
    <div class="side-menu-id">아이디<span>님</span></div>
    <hr>
    <div class="menu-list">
        <li class="menu-list-title">
            이용현황
        </li>
        <ol>
            <li class="menu-list-item">
                <a href="">리빙프로젝트 목록</a>
            </li>
            <li class="menu-list-item">
                <a href="">미세먼지 제보 내역</a>
            </li>
            <li class="menu-list-item">
                <a href="">미세먼지 알림 서비스 관리</a>
            </li>
            <li class="menu-list-item">
                <a href="">해양이슈 관심 지역 관리</a>
            </li>
            <li class="menu-list-item">
                <a href="">나의 문의 내역</a>
            </li>
        </ol>

        <hr>
        <li class="menu-list-title">
            데이터 업로드
        </li>
        <ol>
            <li class="menu-list-item">
                <a href="/file-upload.do">데이터 업로드</a>
            </li>
            <li class="menu-list-item">
                <a href="/file-upload-board.do">데이터 업로드 이력</a>
            </li>
        </ol>

    </div>
</div>

<div class="mobile-side-menu-wrap">
    <img class="mobile-my-page" src="${ctxPath}/images/main/my_page_title.webp" alt="">
    <div class="mobile-side-menu-data-pop-wrap">
        <div class="mobile-side-menu-data-pop-container">
            <div>
                <div class="mobile-side-btn-container">
                    <button class="mobile-side-prev-btn mobile-side-btn" >이전</button>
                    <button class="mobile-side-next-btn mobile-side-btn" disabled="disabled">다음</button>
                    <button class="mobile-side-select-btn mobile-side-btn" >완료</button>
                </div>
                <div class="mobile-side-menu-close-btn-wrap">
                    <img class="mobile-side-menu-close-btn" src="${ctxPath}/images/main/delete_icon.webp">
                </div>
            </div>
            <div class="mobile-side-menu-radio-wrap mobile-side-top-menu">
                <label>
                    <input type="radio" name="top-menu" value="status"> 이용 현황
                </label>
                <label>
                    <input type="radio" name="top-menu" value="upload"> 데이터 업로드
                </label>
            </div>
            <div class="mobile-side-menu-radio-wrap mobile-side-low-menu status-menu">
                <label>  <!--라디오 버튼 value값은 url주소-->
                    <input type="radio" name="status" value=""> 리빙프로젝트 목록
                </label>
                <label>
                    <input type="radio" name="status" value=""> 미세먼지 제보 내역
                </label>
                <label>
                    <input type="radio" name="status" value=""> 미세먼지 알림 서비스 관리
                </label>
                <label>
                    <input type="radio" name="status" value=""> 해양이슈 관심 지역 관리
                </label>
                <label>
                    <input type="radio" name="status" value=""> 나의 문의 내역
                </label>
            </div>
            <!--나중에 show 클래스는 이용현항 하위항목에 디폴트로 들어가야함-->
            <div class="mobile-side-menu-radio-wrap mobile-side-low-menu upload-menu">
                <label>
                    <input type="radio" name="upload" value="file-upload"> 데이터 업로드
                </label>
                <label>
                    <input type="radio" name="upload" value="file-upload-board"> 데이터 업로드 이력
                </label>
            </div>

        </div>
    </div>
</div>