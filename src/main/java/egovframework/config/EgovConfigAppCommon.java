package egovframework.config;

import egovframework.com.cmm.EgovComTraceHandler;
import org.egovframe.rte.fdl.cmmn.trace.LeaveaTrace;
import org.egovframe.rte.fdl.cmmn.trace.handler.TraceHandler;
import org.egovframe.rte.fdl.cmmn.trace.manager.DefaultTraceHandleManager;
import org.egovframe.rte.fdl.cmmn.trace.manager.TraceHandlerService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.util.AntPathMatcher;

/**
 * 공통 configuration 등록
 *
 */
@Configuration
@ComponentScan(basePackages = {"egovframework", "kr"}, includeFilters = {
        @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Service.class),
        @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Repository.class)
}, excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class),
        @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Configuration.class)
})
public class EgovConfigAppCommon {
    /**
     * @return AntPathMatcher 등록.  Ant 경로 패턴 경로와 일치하는지 여부를 확인
     */
    @Bean
    public AntPathMatcher antPathMatcher() {
        return new AntPathMatcher();
    }

    /**
     * @return [LeaveaTrace 설정] defaultTraceHandler 등록
     */
    @Bean
    public EgovComTraceHandler defaultTraceHandler() {
        return new EgovComTraceHandler();
    }

    /**
     * @return [LeaveaTrace 설정] traceHandlerService 등록. TraceHandler 설정
     */
    @Bean
    public DefaultTraceHandleManager traceHandlerService() {
        DefaultTraceHandleManager defaultTraceHandleManager = new DefaultTraceHandleManager();
        defaultTraceHandleManager.setReqExpMatcher(antPathMatcher());
        defaultTraceHandleManager.setPatterns(new String[] {"*"});
        defaultTraceHandleManager.setHandlers(new TraceHandler[] {defaultTraceHandler()});
        return defaultTraceHandleManager;
    }

    /**
     * @return [LeaveaTrace 설정] LeaveaTrace 등록
     */
    @Bean
    public LeaveaTrace leaveaTrace() {
        LeaveaTrace leaveaTrace = new LeaveaTrace();
        leaveaTrace.setTraceHandlerServices(new TraceHandlerService[] {traceHandlerService()});
        return leaveaTrace;
    }

}
