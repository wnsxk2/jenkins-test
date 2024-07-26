<%@ page language="java" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/default.jsp"%>

<div class="header-logo">
    <a href="/main.do">
        <img src="${ctxPath}/images/common/logo_smartvillage.webp" alt="">
    </a>
</div>
<ul class="header-menu">
    <li>
        <a href="">Jenkins</a>
    </li>
    <li>
        <a href="${ctxPath}/marine-debris.do">부유 쓰레기</a>
    </li>
    <li>
        <a href="${ctxPath}/marine-dust.do">미세 먼지</a>
    </li>
    <li>
        <a href="${ctxPath}/marine-social.do">해양산업 이슈분석</a>
    </li>
</ul>

<ul class="header-icon">
    <li>
        <a href="">
            <img src="${ctxPath}/images/common/join.webp" alt="">
        </a>
    </li>
    <li>
        <a href="${ctxPath}/file-upload.do">
            <img src="${ctxPath}/images/common/user.webp" alt="">
        </a>
    </li>
    <li>
        <a href="">
            <img src="${ctxPath}/images/common/site-map.webp" alt="">
        </a>
    </li>
</ul>

<a href="" class="header-toggle-btn" id="header-toggle-btn">
    <img src="${ctxPath}/images/common/header-menu-ic.webp" alt="">
</a>
<%-- 팝업 --%>
<div class="preparing-popup">
    <button class="preparing-popup-btn">X</button>
    <div class="preparing-popup-content"></div>
</div>

