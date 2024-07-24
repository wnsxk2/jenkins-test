package egovframework.com.cmm;

import org.springframework.context.MessageSource;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

import java.util.Locale;

public class EgovMessageSource extends ReloadableResourceBundleMessageSource implements MessageSource {

    private ReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource;

    /**
     * getReloadableResourceBundleMessageSource()
     *
     * @param reloadableResourceBundleMessageSource - resource MessageSource
     * @return ReloadableResourceBundleMessageSource
     */
    public void setReloadableResourceBundleMessageSource(ReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource) {
        this.reloadableResourceBundleMessageSource = reloadableResourceBundleMessageSource;
    }

    /**
     * getReloadableResourceBundleMessageSource()
     *
     * @return ReloadableResourceBundleMessageSource
     */
    public ReloadableResourceBundleMessageSource getReloadableResourceBundleMessageSource() {
        return reloadableResourceBundleMessageSource;
    }

    /**
     * Default Locale 정의된 메세지 조회
     *
     * @param code - 메세지 코드
     * @return String
     */
    public String getMessage(String code) {
        return this.getMessage(code, Locale.getDefault());
    }

    /**
     * 정의된 메세지 조회
     *
     * @param code   - 메세지 코드
     * @param locale - locale 설정
     * @return String
     */
    public String getMessage(String code, Locale locale) {
        return getReloadableResourceBundleMessageSource().getMessage(code, null, locale);
    }
}