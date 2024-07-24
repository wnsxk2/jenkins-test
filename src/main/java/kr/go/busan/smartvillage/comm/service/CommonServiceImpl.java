package kr.go.busan.smartvillage.comm.service;

import kr.co.greenblue.geometry.model.WKTStructure;
import kr.go.busan.smartvillage.comm.code.RegionNameCode;
import kr.go.busan.smartvillage.comm.mapper.CommonMapper;
import kr.go.busan.smartvillage.comm.vo.AdmdstDataVO;
import kr.go.busan.smartvillage.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommonServiceImpl implements CommonService {
    /* 필드 */
    private final CommonMapper commonMapper;

    private final RedisService redisService;
    /* 필드 끝 */

    @Override
    public List<WKTStructure> selectWktSggDataList(RegionNameCode code) {
        List<WKTStructure> wktDataList = new ArrayList<>();


/*
        // 부산 시군구 레디스 데이터 확인
        if(redisService.hasKey(RegionNameCode.BUSAN.getRedisKey())){
          //  wktDataList = redisService.getCachedList(RegionNameCode.BUSAN.getRedisKey());
        }else{
            List<AdmdstDataVO> admdstDataVOList = commonMapper.selectWktSggDataList(code.getKrName());

            if(admdstDataVOList.size()>0){
                for(AdmdstDataVO admdstDataVO : admdstDataVOList){
                    wktStructure.setWKTFormatGeom(admdstDataVO.getGeom());
                    wktStructure.addProperty("admdstCd", admdstDataVO.getAdmdstCd());
                    wktStructure.addProperty("admdstNm", admdstDataVO.getAdmdstNm());
                    wktStructure.addProperty("engAdmdstNm", admdstDataVO.getEngAdmdstNm());
                    wktDataList.add(wktStructure);
                }
            }else{
                log.info(code.getKrName() + " SGG Data List size : 0");
                return null;
            }
            redisService.addCache(RegionNameCode.BUSAN.getRedisKey(), wktDataList);
        }
*/
        List<AdmdstDataVO> admdstDataVOList = commonMapper.selectWktSggDataList(code.getKrName());

        if(admdstDataVOList.size()>0){
            for(AdmdstDataVO admdstDataVO : admdstDataVOList) {
                WKTStructure WKTStructure = new WKTStructure();
                WKTStructure.setWKTFormatGeom(admdstDataVO.getGeom());
                WKTStructure.addProperty("admdstCd", admdstDataVO.getAdmdstCd());
                WKTStructure.addProperty("admdstNm", admdstDataVO.getAdmdstNm());
                WKTStructure.addProperty("engAdmdstNm", admdstDataVO.getEngAdmdstNm());
                wktDataList.add(WKTStructure);
            }
        }else{
            log.info(code.getKrName() + " SGG Data List size : 0");
            return null;
        }
        return wktDataList;
    }

    @Override
    public List<AdmdstDataVO> selectSggList() {
        return commonMapper.selectSggList();
    }

}
