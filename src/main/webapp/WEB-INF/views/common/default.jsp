<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%-- <%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %> --%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%--<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>--%>
<%
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",-1);
    if (request.getProtocol().equals("HTTP/1.1")) {
        response.setHeader("Cache-Control", "no-cache");
    }
    pageContext.setAttribute("carriagereturn","\n");
%>
<c:set var="ctxPath" value="${pageContext.request.contextPath}" scope="request"/>
<meta http-equiv="X-UA-Compatible" content="chrome=1,IE=Edge" />

<script>
    const ctxPath = '<c:out value="${ctxPath}"/>';
    const geoserverUrl = '<spring:eval expression="@environment.getProperty('geoserver.urlLink')" />';
    const geoserverGwcUrl = '<spring:eval expression="@environment.getProperty('geoserver.gwc.urlLink')" />';
    const baseMapURL = '<spring:eval expression="@environment.getProperty('base.map.url')" />';
    const baseMapKey = '<spring:eval expression="@environment.getProperty('base.map.key')" />';
</script>