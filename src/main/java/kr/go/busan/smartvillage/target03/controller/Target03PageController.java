package kr.go.busan.smartvillage.target03.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Target Service 3과 관련된 페이지만 리턴하는 Controller
 * throws RuntimeException 사용
 */
@Controller
@Slf4j
public class Target03PageController {

    @RequestMapping(value = "/marine-social.do", method = RequestMethod.GET)
    public String main()throws RuntimeException {
        return "target03/marine-social";
    }
}