//harin comment : tg2 -> marin-dust로 변경, 파라미터 값 포함되면 post로 변경
//common은 타겟1,2,3 공통으로 사용하는 파일임
//baseurl에 넣을만한건 지도 정도임

/* 전역 상수 */
// 타겟 1,2 공통 사용으로 marine-dust-map.js -> common-map.js 이동
const SRID = "EPSG:3857";
const FORMAT_WKT = new ol.format.WKT();

const BUSAN_CENTER= [14376721.545472704, 4186427.0264562466]; //3857 기준
const DEFAULT_ZOOM = 11.6;
const MAX_EXTENT = [14274691.443737995, 4134937.460061596, 14453668.805965098, 4240726.322252416];

const BASE_URL = {
    busanWkt : {
        url : 'data/wkt/busan/sgg',
        type : 'get'
    },
    dustArea : {
        url: 'data/marine-dust/area',
        type: 'get'
    },
    dustPort : {
        url: 'data/marine-dust/port-info/',
        type: 'get'
    },
    dustGalmaet : {
        url: 'data/marine-dust/gm',
        type: 'get'
    },
    dustTipoff : {
        url: 'data/marine-dust/tipoff',
        type: 'get'
    },
    yesterdayPortDust : {
        url: 'data/marine-dust/yesterday/port/',
        type: 'get'
    },
    yesterdayAreaDust : {
        url: 'data/marine-dust/yesterday/area/',
        type: 'get'
    },
    dust24Graph : {
        url: 'data/marine-dust',
        type: 'get'
    },
    dustDate : { //미세먼지 변화값 슬라이더 날짜 목록 불러오기
        url: 'data/marine-dust/date',
        type: 'get'
    },
    galmaetWkt : {
        url: 'data/marine-dust/galmaet',
        type: 'get'
    },
    forecastData : {
        url: 'data/marine-dust/forecast',
        type: 'get'
    },
    issueData: {
        url: 'data/marine-dust/issue',
        type: 'get'
    },
    dust24Data: {
        url: 'data/marine-dust/',
        type: 'get'
    },
    galmaetgilData: {
        url: 'data/marine-dust/galmaetgil-info',
        type: 'get'
    },
    aodData: {
        url: 'data/marine-dust/aod-info',
        type: 'get'
    },
    cctvData: {
        url: 'data/marine-debris/cctv',
        type: 'get'
    }

};

const BASIC_STYLE = {
    busan : new ol.style.Style({
        stroke : new ol.style.Stroke({
            color : 'rgb(86,86,86)',
            width : 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0,0,0,0)',
        }),
        text : new ol.style.Text({
            text : '',
            font: '9px sans-serif',
            stroke: new ol.style.Stroke({
                width: 1,
            }),
            text : '',
            // overflow : true
        })

    }),
    none : new ol.style.Style({
        stroke : new ol.style.Stroke({
            color : new ol.style.Stroke({
                color: 'rgba(0,0,0,0)',
                width : 1
            })
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0,0,0,0)',
        })
    })
}
/* 전역 상수 끝 */

/**
 * Ajax 호출 데이터를 source로 리턴
 * BASE_URL 전역 상수의 key 값
 */
function setSourceFromRequest(key){

    let info = BASE_URL[key];
    let features = [];

    $.ajax({
        url: info.url,
        type: info.type,
        dataType: 'json',
        async: false,
        success: function (resp) {
            if(resp.code==0){
                if(resp.data != null){
                    resp.data.forEach((item) => {
                        let feature = FORMAT_WKT.readFeature(item.geom);
                        if (item.properties != null){
                            feature.setProperties(item.properties);
                        }
                        features.push(feature);
                    });

                }else{
                    console.log("data is null");
                    // alert("data is null");
                }
            }else{
                alert(resp.message);
            }
        },
        error: function (e) {
            console.log('error in setSourceFromRequest');
        }
    });

    return new ol.source.Vector({
        features : features
    });
}

/**
 * 개방해 레이어 호출
 */
function getBaseLayer(){
    return new ol.layer.Tile({
        source:  new ol.source.XYZ({
            projection: "EPSG:3857",
            url : "http://www.khoa.go.kr/oceanmap/D53E1E6DB9D555867D97116A1/BASEMAP_NPERIOD3857/{z}/{y}/{x}/basemapWMTS.do",
            cacheSize : 200
        })
    });
}

/**
 * geoserver 호출 레이어 중 해상도에 따라 캐시 레이어 호출
 */
function getLayerByWidth(layerName){
    let width = window.innerWidth;
    if(width!=1920){//pc 외는 image 한판으로
        return new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: geoserverUrl,
                params: {
                    'LAYERS': layerName,
                    'Tiled': true,
                    'VERSION': '1.1.0'
                },
                serverType: 'geoserver',
                transition: 0
            })
        })
    }else{ //pc일때는 캐시 사용
        return new ol.layer.Tile({
            source : new ol.source.TileWMS({
                url: geoserverGwcUrl,
                params: {
                    'LAYERS': layerName,
                    'Tiled': true,
                    'VERSION': '1.1.0'
                },
                serverType: 'geoserver',
                transition: 0,
                cacheSize : 200
            })
            , visible: true
        });
    }
}