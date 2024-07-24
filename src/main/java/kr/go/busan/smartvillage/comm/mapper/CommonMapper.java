package kr.go.busan.smartvillage.comm.mapper;

import kr.go.busan.smartvillage.comm.code.RegionNameCode;
import kr.go.busan.smartvillage.comm.vo.AdmdstDataVO;
import kr.go.busan.smartvillage.comm.vo.BusanDataVO;
import kr.go.busan.smartvillage.comm.vo.UlGyeongDataVO;
import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CommonMapper {

    /**
     * WKT 형식의 시군구 데이터 처리
     * @param nameCode 지역명 코드
     * @return WKT 형식의 시군구 정보가 포함된 리스트
     */
    public List<AdmdstDataVO> selectWktSggDataList(String nameCode);


    /*타겟1 리빙프로젝트 부산시 지역구 리스트 표출*/
    List<AdmdstDataVO> selectSggList();

}
