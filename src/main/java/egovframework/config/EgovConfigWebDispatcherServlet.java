package egovframework.config;

import kr.co.greenblue.exception.handler.ExceptionHandlerResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Configuration
public class EgovConfigWebDispatcherServlet implements WebMvcConfigurer {
/*
    private static final String RESOLVER_DEFAULT_ERROR_VIEW = "common/egovError";
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {
        SimpleMappingExceptionResolver simpleMappingExceptionResolver = new SimpleMappingExceptionResolver();

        simpleMappingExceptionResolver.setDefaultErrorView(RESOLVER_DEFAULT_ERROR_VIEW);

        Properties mappings = new Properties();
//        mappings.setProperty("org.springframework.dao.DataAccessException", "cmm/error/dataAccessFailure");
//        mappings.setProperty("org.springframework.transaction.TransactionException", "cmm/error/transactionFailure");
        mappings.setProperty("org.egovframe.rte.fdl.cmmn.exception.EgovBizException", "cmm/error/egovError");
        mappings.setProperty("org.springframework.security.AccessDeniedException", "cmm/error/accessDenied");

        simpleMappingExceptionResolver.setExceptionMappings(mappings);

        exceptionResolvers.add(simpleMappingExceptionResolver);
    }

 */
    public void extendHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        resolvers.add(new ExceptionHandlerResolver()); // ExceptionHandler 등록
    }

    // 메인 이미지 캐시 설정
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Default cache period for all static resources
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.maxAge(30, TimeUnit.DAYS).cachePublic());

        // Specific cache period for the main folder
        registry.addResourceHandler("/static/images/main/**")
                .addResourceLocations("classpath:/static/images/main/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS).cachePublic())
                .resourceChain(true)
                .addResolver(new PathResourceResolver());

        // video 폴더 설정
        registry.addResourceHandler("/videoPath/**")
                .addResourceLocations("file:///D:/video/");

        // video 폴더 설정
        registry.addResourceHandler("/livingPath/**")
                .addResourceLocations("file:///D:/sv_lproject_cover/");
    }

}
