package kr.co.greenblue.comm.util;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.experimental.UtilityClass;

// Object와 JSON 의 변환 Util Class
@UtilityClass
public class ObjectMapperUtils {

    /* 필드 */
    private static final ObjectMapper objectMapper = objectMapper();
    /* 필드 끝 */

    /* 메서드 */
    /**
     * Static으로 선언된 ObjectMapper 사용을 위해 옵션값을 설정할 수 있는 메소드
     * ObjectUtils 클래스를 호출하면 자동으로 호출
     * @return 설정이 완료된 objectMapper 객체가 리턴 */
    private ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); // unknown field 무시
        // 매핑시 필드만 사용.
        mapper.setVisibility(mapper.getSerializationConfig().getDefaultVisibilityChecker()
                .withFieldVisibility(JsonAutoDetect.Visibility.ANY)
                .withGetterVisibility(JsonAutoDetect.Visibility.NONE)
                .withSetterVisibility(JsonAutoDetect.Visibility.NONE)
                .withCreatorVisibility(JsonAutoDetect.Visibility.NONE));
        mapper.registerModule(new JavaTimeModule());
        mapper.writerWithDefaultPrettyPrinter();
        return mapper;
    }

    /**
     * ObjectMapper를 호출할 때 사용하는 메소드
     * @return static으로 선언되어 있는 objectMapper 객체가 리턴 */
    public static ObjectMapper getObjectMapper() {
        return objectMapper;
    }

    /**
     * Object를 JSON 형태의 String으로 변환하는 메소드
     * @param obj Map, Model 등의 객체
     * @return JSON 형태의 String 리턴 */
    public static String getJsonString(Object obj) {
        try {
            if(obj != null)  return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Object를 JSON 형태의 byte 배열로 변화하는 메소드
     * @param obj Map, Model 등의 객체
     * @return JSON 형태의 Byte 배열 리턴 */
    public static byte[] getJsonByteArray(Object obj){
        try {
            if(obj != null)  return objectMapper.writeValueAsBytes(obj);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * JSON 형태의 String을 Object로 변환하는 메소드
     * @param jsonStr JSON 형태의 string 변수
     * @param type jsonStr을 변환 시킬 Object
     * @return 전달받은 type에 맞게 형변환된 데이터 리턴 */
    public static <T> T getObject(String jsonStr, Class<T> type) {
        try {
            return objectMapper.readValue(jsonStr, type);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
    /* 메서드 끝 */
}

