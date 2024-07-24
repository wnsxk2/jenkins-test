package egovframework.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

/**
 * 프로젝트의 Bean 설정 class 및 Property 파일 등록
 *  1. @Configuraion 설정
 *  2. @Import 설정
 *   - Bean 설정 Class
 *  3. @PropertySources 설정
 *   - Property 파일
 */

@Configuration
@Import({
        EgovConfigAppDatasource.class,
        EgovConfigAppMapper.class,
        EgovConfigAppCommon.class,
        EgovConfigAppMsg.class,
        EgovConfigWebDispatcherServlet.class
})
@PropertySources({
        @PropertySource("classpath:/application.properties")
})
public class EgovConfigApp {
}
