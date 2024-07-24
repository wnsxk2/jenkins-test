package kr.go.busan.smartvillage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

//기본 scan은 kr.go.busan.smartvillage인데 egoveframework 설정 적용 필요해서 패키지 추가
@SpringBootApplication(scanBasePackages = {"kr.go.busan.smartvillage", "egovframework"})
@EnableCaching
@EnableAspectJAutoProxy
public class SmartVillageApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartVillageApplication.class, args);
	}

}
