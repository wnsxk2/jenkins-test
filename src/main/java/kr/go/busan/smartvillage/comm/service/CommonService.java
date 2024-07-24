package kr.go.busan.smartvillage.comm.service;

import kr.co.greenblue.geometry.model.WKTStructure;
import kr.go.busan.smartvillage.comm.code.RegionNameCode;
import kr.go.busan.smartvillage.comm.vo.AdmdstDataVO;

import java.util.List;

public interface CommonService {

    List<WKTStructure> selectWktSggDataList(RegionNameCode code);

   List<AdmdstDataVO> selectSggList();
}
