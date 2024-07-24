package kr.go.busan.smartvillage.main.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 메인 및 회원 정보 등의 페이지만 리턴하는 Controller
 *  throws RuntimeException 사용
 */
@Controller
@Slf4j
public class MainPageController {

    @RequestMapping(value = {"/", "/main.do"}, method = RequestMethod.GET)
    public String main() throws RuntimeException{
        return "main/main";
    }

    @RequestMapping(value = { "/file-upload.do"}, method = RequestMethod.GET)
    public String fileUpload() throws RuntimeException{
        return "main/file-upload";
    }

    @RequestMapping(value = { "/file-upload-board.do"}, method = RequestMethod.GET)
    public String fileUploadBoard() throws RuntimeException{
        return "main/file-upload-board";
    }

}