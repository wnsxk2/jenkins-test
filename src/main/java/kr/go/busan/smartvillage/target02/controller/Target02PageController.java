package kr.go.busan.smartvillage.target02.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Target Service 2와 관련된 페이지만 리턴하는 Controller
 * throws RuntimeException 사용
 */
@Controller
@Slf4j
public class Target02PageController {

    @RequestMapping(value = "/marine-dust.do", method = RequestMethod.GET)
    public String main() throws RuntimeException{
        return "target02/marine-dust";
    }
}