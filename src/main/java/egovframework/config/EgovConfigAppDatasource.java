package egovframework.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class EgovConfigAppDatasource {
    //@Value("${Globals.DbType}")
    //private String dbType;

    @Value("${Globals.postgres.DriverClassName}")
    private String className;

    @Value("${Globals.postgres.Url}")
    private String url;

    @Value("${Globals.postgres.UserName}")
    private String userName;

    @Value("${Globals.postgres.Password}")
    private String password;

    /**
     * @return [dataSource 설정] basicDataSource 설정
     */
    private DataSource basicDataSource() {

        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setDriverClassName(className);
        basicDataSource.setUrl(url);
        basicDataSource.setUsername(userName);
        basicDataSource.setPassword(password);
        return basicDataSource;
    }

    /**
     * @return [DataSource 설정]
     */
    @Bean(name = "dataSource")
    public DataSource dataSource() {
        return basicDataSource();
    }
}
