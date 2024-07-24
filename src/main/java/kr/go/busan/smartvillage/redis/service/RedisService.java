package kr.go.busan.smartvillage.redis.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
@Slf4j
public class RedisService {
    private final RedisTemplate redisTemplate;

    public boolean hasKey(String key){
        if(redisTemplate.hasKey(key)){
            return true;
        }else {
            return false;
        }
    }

    public <T> T getCached(String key) {
        ValueOperations<String, T> ops = redisTemplate.opsForValue();
        T found = ops.get(key);
//        log.debug(String.format("%s: Hits cache by key = %s >> result = %s", RuntimeUtils.getMethodName(3), key, found));
        return found;
    }

    public <T extends List<?>> T getCachedList(String key) {
        ValueOperations<String, T> ops = redisTemplate.opsForValue();
        T found = ops.get(key);
//        log.debug(String.format("%s: Hits cache by key = %s >> result = %s", RuntimeUtils.getMethodName(3), key, Arrays.toString(found.toArray())));
        return found;
    }

    public void deleteCachedList(List<String> keys) {
        redisTemplate.delete(keys);
//        log.debug(String.format("%s: Delete cache List = %s", RuntimeUtils.getMethodName(3), Arrays.toString(keys.toArray())));
    }

    public void deleteCached(String key) {
        redisTemplate.delete(key);
//        log.debug(String.format("%s: Delete cache by key = %s", RuntimeUtils.getMethodName(3), Arrays.toString(keys.toArray())));
    }

    public <T> void addCache(String key, T model){
        ValueOperations<String, T> ops = redisTemplate.opsForValue();
        ops.set(key, model, 2, TimeUnit.HOURS);

    }
}
