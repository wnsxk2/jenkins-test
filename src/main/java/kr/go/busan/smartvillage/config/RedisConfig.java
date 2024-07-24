package kr.go.busan.smartvillage.config;

import kr.go.busan.smartvillage.comm.code.RegionNameCode;
import kr.go.busan.smartvillage.redis.vo.RedisCacheKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class RedisConfig {
    @Value("${spring.redis.host}")
    public String host;
    @Value("${spring.redis.port}")
    public int port;
    @Value("${spring.redis.password}")
    public String password;

    /**
     * Redis Connection
     *  Lettuce: Multi-Thread 에서 Thread-Safe한 Redis 클라이언트로 netty에 의해 관리된다.
     *           Sentinel, Cluster, Redis data model 같은 고급 기능들을 지원하며
     *           비동기 방식으로 요청하기에 TPS/CPU/Connection 개수와 응답속도 등 전 분야에서 Jedis 보다 뛰어나다.
     *           스프링 부트의 기본 의존성은 현재 Lettuce로 되어있다.
     * @return
     */
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration();
        configuration.setHostName(host);
        configuration.setPort(port);
        configuration.setPassword(password);

        return new LettuceConnectionFactory(configuration);
    }

    /**
     * Redis data access code를 간소화 하기 위해 제공되는 클래스
     * 주어진 객체들을 자동으로 직렬화/역직렬화하며 binary 데이터를 Redis에 저장
     * StringRedisSerializer: binary 데이터로 저장되기 때문에 이를 String 으로 변환(반대로도 가능) UTF-8 인코딩
     * GenericJackson2JsonRedisSerializer: 객체를 json타입으로 직렬화/역직렬화를 수행
     * @return
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();

        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());


//        redisTemplate.setConnectionFactory(redisConnectionFactory());
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//        redisTemplate.setValueSerializer(new StringRedisSerializer());
//        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
//        redisTemplate.setHashValueSerializer(new StringRedisSerializer());


        return redisTemplate;
    }

    /**
     * Redis Cache 적용을 위한 RedisCacheManager 설정
     * @param redisConnectionFactory
     * @return
     */
    @Bean
    public RedisCacheManager redisCacheManager(RedisConnectionFactory redisConnectionFactory) {
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
//                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new Jackson2JsonRedisSerializer<String>()))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));

        Map<String, RedisCacheConfiguration> cacheConfiguration = new HashMap<>();

        cacheConfiguration.put(RegionNameCode.BUSAN.getRedisKey(), redisCacheConfiguration.entryTtl(Duration.ZERO)); //삭제 시간을 두지 않음

        return RedisCacheManager
                .RedisCacheManagerBuilder
                .fromConnectionFactory(redisConnectionFactory)
                .cacheDefaults(redisCacheConfiguration)
                .build();
    }

}
