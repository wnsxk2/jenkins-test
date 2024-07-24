package kr.go.busan.smartvillage.comm.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Target 서비스에서 공통으로 사용하는 페이지를 위한 컨트롤러
 * throw RuntimeException 사용
 */
@RequiredArgsConstructor
@Controller
public class CommonPageController {

    @RequestMapping(value = "/header", method = RequestMethod.GET)
    public String header() throws RuntimeException{
        return "common/header";
    }
}
