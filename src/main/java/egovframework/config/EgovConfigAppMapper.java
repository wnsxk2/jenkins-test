package egovframework.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.egovframe.rte.psl.dataaccess.mapper.MapperConfigurer;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.*;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.support.lob.DefaultLobHandler;

import javax.sql.DataSource;
import java.io.IOException;

@Configuration
@PropertySources({
        @PropertySource("classpath:/application.properties")
})
public class EgovConfigAppMapper {

    @Bean
    @Lazy
    public DefaultLobHandler lobHandler() {
        return new DefaultLobHandler();
    }

    @Bean(name = "sqlSession")
    public SqlSessionFactoryBean sqlSession(DataSource dataSource) {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);

        PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver = new PathMatchingResourcePatternResolver();

        sqlSessionFactoryBean.setConfigLocation(
                pathMatchingResourcePatternResolver
                        .getResource("classpath:/egovframework/mapper/mapper-config.xml"));

/*
        sqlSessionFactoryBean.setConfigLocation(
                pathMatchingResourcePatternResolver
                        .getResource("classpath:/egovframework/mapper/config/mybatis-config.xml"));
*/
        try {
            sqlSessionFactoryBean.setMapperLocations(
                    pathMatchingResourcePatternResolver
                            .getResources("classpath:/egovframework/mapper/*/*.xml"));
        } catch (IOException e) {
            // TODO Exception 처리 필요
        }

        return sqlSessionFactoryBean;
    }

    @Bean
    public SqlSessionTemplate egovSqlSessionTemplate(@Qualifier("sqlSession") SqlSessionFactory sqlSession) {
        SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSession);
        return sqlSessionTemplate;
    }


    /* Mapper Interface 사용 */
    @Bean
    public MapperConfigurer mapperConfigurer(){
        MapperConfigurer mapperConfigurer = new MapperConfigurer();
        mapperConfigurer.setBasePackage("kr.go.busan.smartvillage");
        return mapperConfigurer;
    }
}
