package egovframework.com.cmm.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(urlPatterns = {"/","*.do"}, description = "ParamFilter")
public class HTMLTagFilter implements Filter {

    //@SuppressWarnings("unused")
    private FilterConfig config;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
/*
        ContentCachingResponseWrapper responseWrapper =
                new ContentCachingResponseWrapper((HttpServletResponse) response);
        chain.doFilter(request, responseWrapper);
*/
        chain.doFilter(new HTMLTagFilterRequestWrapper((HttpServletRequest) request), response);
    }

    public void init(FilterConfig config) throws ServletException {
        this.config = config;
    }

    public void destroy() {

    }
}
