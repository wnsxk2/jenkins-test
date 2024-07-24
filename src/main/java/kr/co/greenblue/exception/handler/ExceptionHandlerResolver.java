package kr.co.greenblue.exception.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class ExceptionHandlerResolver implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {


        /*
            if(ex instanceof RuntimeException){
                log.info("Exception resolver to 400");

                //500 에러를 400 에러로 변환
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

                if("application/json".equals(request.getHeader("accept"))){
                    //return 메세지
                    ErrorResponseDto message = ErrorResponseDto.of(ResponseStatusEnum.INTERNAL_ERROR, ex.getMessage());

                    // HTTP Body 영역에 write하기
                    response.setContentType("application/json"); //JSON 타입으로 설정하기
                    response.setCharacterEncoding("utf-8");
                    response.getWriter().write(message);



//                    ResponseDto message = ErrorResponseDto.of(ResponseStatusEnum.)
                    return new ModelAndView();
                }else{
                    return new ModelAndView("error/500");//에러페이지 응답
                }
            }
            */


        return new ModelAndView("common/error");//에러페이지 응답;
    }
}
