package kr.go.busan.smartvillage.target01.controller;

import kr.go.busan.smartvillage.target01.service.Target01Service;
import kr.go.busan.smartvillage.target01.vo.ActivityVO;
import kr.go.busan.smartvillage.target01.vo.LProjectVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
/*import org.jetbrains.annotations.NotNull;*/
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Target Service 1과 관련된 페이지만 리턴하는 Controller
 * throws RuntimeException 사용
 */
@Controller
@RequiredArgsConstructor
@Slf4j
public class Target01PageController {


    private final Target01Service target01Service;



    @RequestMapping(value = "/marine-debris.do", method = RequestMethod.GET)
    public String main() throws RuntimeException{

        return "target01/marine-debris";
    }


    /* !리빙프로젝트! */
    @RequestMapping(value = "/living-project.do", method = RequestMethod.GET)
    public String livingProject() throws RuntimeException{
        return "target01/living-project";
    }


    @RequestMapping(value = "/living-project-detail.do", method = RequestMethod.GET)
    public String livingProjectDetail(@RequestParam("index") int index, Model model) throws RuntimeException{
        List<LProjectVO> lProjectDetailData = target01Service.selectLProjectDetail(index);
        List<ActivityVO> lProjectGraphData = target01Service.selectActivityCount(index);
        model.addAttribute("index", lProjectDetailData);
        model.addAttribute("graph", lProjectGraphData);

        return "target01/living-project-detail";
    }

    /* !재해쓰레기! */
}