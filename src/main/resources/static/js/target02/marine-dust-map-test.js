/* 전역 상수 */
const MAX_EXTENT = ol.proj.transformExtent([128.231735, 34.786739, 129.839516, 35.563512], 'EPSG:4326', 'EPSG:3857');
const SRID = "EPSG:3857";
const PORT_CENTER = [14370592.452440148, 4178922.788486468]; //3857 기준
// const BUSAN_CENTER= [14371255.132472211, 4187104.2811642727]; //3857 기준
const BUSAN_CENTER= [14376721.545472704, 4186427.0264562466]; //3857 기준

const FORMAT_WKT = new ol.format.WKT();
const BACKGROUND_STYLE = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'rgb(86,86,86)',
        width: 1
    }),
    fill: new ol.style.Fill({
        color: 'rgba(208,245,116,0.7)',
    }),
    text: new ol.style.Text({
        text: ''
    })
})
const LPI_BACKGROUND_COLOR = {
    // 영문 생활 패턴 명으로 전부 변경 후 삭제
    NORMAL : '#ddf4dd',
    BAD : '#fff1cc',
    VERY_BAD : '#ffe0de',
    'VERY BAD' : '#ffe0de',
    PROOFREADING : '#e5e5e5',
    // 영문 생활 패턴 명으로 전부 변경 후 삭제
    GOOD:'#d4eef9',
    MODERATE: '#ddf4dd',
    UNHEALTHY : '#fff1cc',
    VERY_UNHEALTHY : '#ffe0de',
    NOT_AVAILABLE : '#e5e5e5',
}

const LPI_LINE_COLOR = {
    // 영문 생활 패턴 명으로 전부 변경 후 삭제
    NORMAL : '#54c555',
    BAD : '#fec118',
    VERY_BAD : '#fe685b',
    'VERY BAD' : '#fe685b',
    PROOFREADING : '#818181',
// 영문 생활 패턴 명으로 전부 변경 후 삭제
    GOOD:'#2cade4',
    MODERATE: '#54c555',
    UNHEALTHY : '#fec118',
    VERY_UNHEALTHY : '#fe685b',
    NOT_AVAILABLE : '#818181',
}

const PM_STYLE = {
    GOOD : new ol.style.Style({
        stroke: new ol.style.Stroke({
            color : 'rgb(86,86,86)',
            width : 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(47,164,246,0.3)',
        }),
        text: new ol.style.Text({
            text: '',
            font: '9px sans-serif',
            stroke: new ol.style.Stroke({
                width: 1,
            }),
        })
    }),
    NORMAL : new ol.style.Style({
        stroke: new ol.style.Stroke({
            color : 'rgb(86,86,86)',
            width : 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(194,249,140,0.3)',
        }),
        text: new ol.style.Text({
            text: '',
            font: '9px sans-serif',
            stroke: new ol.style.Stroke({
                width: 1,
            }),
        })
    }),
    BAD : new ol.style.Style({
        stroke: new ol.style.Stroke({
            color : 'rgb(86,86,86)',
            width : 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(250,230,1,0.3)'
        }),
        text: new ol.style.Text({
            text: '',
            font: '9px sans-serif',
            stroke: new ol.style.Stroke({
                width: 1,
            }),
        })
    }),
    VERY_BAD : new ol.style.Style({
        stroke: new ol.style.Stroke({
            color : 'rgb(86,86,86)',
            width : 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(250,0,0,0.3)'
        }),
        text: new ol.style.Text({
            text: '',
            font: '9px sans-serif',
            stroke: new ol.style.Stroke({
                width: 1,
            }),
        })
    }),
    PROOFREADING : new ol.style.Style({
        stroke: new ol.style.Stroke({
            color : 'rgb(86,86,86)',
            width : 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(128,128,128, 0.3)'
        }),
        text: new ol.style.Text({
            text: '',
            font: '9px sans-serif',
            stroke: new ol.style.Stroke({
                width: 1,
            }),
        })
    }),
}

//항만 스타일
const PORT_PM_STYLE = {
    GOOD : [
        new ol.style.Style({
            image: new ol.style.Shadow({
                radius: 15,
            }),
            stroke: new ol.style.Stroke({
                color: [0,0,0,0.3],
                width: 2
            }),
            fill: new ol.style.Fill({
                color: [0,0,0,0.3]
            }),
            zIndex: -1
        }),
        new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1.0, // 투명도 1=100%
                scale: 0.3,
                anchor: [0.5, 1],
                src: ctxPath+'/images/target02/port_good.webp',
            })

        })
    ],
    NORMAL :[
        new ol.style.Style({
            image: new ol.style.Shadow({
                radius: 15,
            }),
            stroke: new ol.style.Stroke({
                color: [0,0,0,0.3],
                width: 2
            }),
            fill: new ol.style.Fill({
                color: [0,0,0,0.3]
            }),
            zIndex: -1
        }),
        new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1.0,
                scale: 0.3,
                anchor: [0.5, 1],
                src: ctxPath+'/images/target02/port_normal.webp'
            })
        })
    ],
    BAD : [
        new ol.style.Style({
            image: new ol.style.Shadow({
                radius: 15,
            }),
            stroke: new ol.style.Stroke({
                color: [0,0,0,0.3],
                width: 2
            }),
            fill: new ol.style.Fill({
                color: [0,0,0,0.3]
            }),
            zIndex: -1
        }),
        new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1.0,
                scale: 0.3,
                anchor: [0.5, 1],
                src: ctxPath+'/images/target02/port_bad.webp'
            })
        })
    ],
    VERY_BAD : [
        new ol.style.Style({
            image: new ol.style.Shadow({
                radius: 15,
            }),
            stroke: new ol.style.Stroke({
                color: [0,0,0,0.3],
                width: 2
            }),
            fill: new ol.style.Fill({
                color: [0,0,0,0.3]
            }),
            zIndex: -1
        }),
        new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1.0,
                scale: 0.3,
                anchor: [0.5, 1],
                src: ctxPath+'/images/target02/port_very_bad.webp'
            })
        })
    ],
    PROOFREADING : [
        new ol.style.Style({
            image: new ol.style.Shadow({
                radius: 15,
            }),
            stroke: new ol.style.Stroke({
                color: [0,0,0,0.3],
                width: 2
            }),
            fill: new ol.style.Fill({
                color: [0,0,0,0.3]
            }),
            zIndex: -1
        }),
        new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1.0, // 투명도 1=100%
                scale: 0.3,
                anchor: [0.5, 1],
                src: ctxPath+'/images/target02/port_null.webp'
            })
        })
    ]
}

const GALMAET_PM_STYLE = {
    GOOD : new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(47,164,246,0.84)',
            width : 8
        }),
    }),
    NORMAL : new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(115,212,16,0.85)',
            width : 8
        })
    }),
    BAD : new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(250,230,1,0.66)',
            width : 8
        })
    }),
    VERY_BAD : new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(250,0,0,0.66)',
            width : 8
        })
    }),
    PROOFREADING : new ol.style.Style({
        stroke: new ol.style.Stroke({
            color : 'rgb(128,128,128)',
            width : 8
        })
    }),
}
const STROKE_STYLE = {
    selected: new ol.style.Stroke({
        // 선택되었을때 색상
        color: 'rgb(255,255,255)',
        width: 8,
    }),
    basic: new ol.style.Stroke({
        color: 'rgb(86,86,86)',
        width: 1
    })
};

const DROP_ANIMATION = new ol.featureAnimation.Drop({
    speed: 0.9,
    // duration: Number(1000-0.7*300),
    side : 'top'
    // side: $("#side").prop('checked')
})

/* 전역 상수 */

/*전역 변수*/
/* 지도 관련 */
let map;
let osmLayer;
let busanLayer;
let busanSource;
let galmaetLayer;
let galmaetSource;
let tipoffLayer, tipoffSource;
let backgroundLayer;
let tipoffOverlay;
let busanSggLableLayer;
let selectedLayer, selectedSource;
let shipLayer;

/*항만*/
let portSource;
let portLayer;

let portGeomSource;
let portGeomLayer;

/*Overlay*/
let cloudOverlay;

/* 데이터 관련 */
let dustType;
let isUpdate = false;
let clickedFeature = null;
let tipoffData;

/* Port Animation 실행 효과 관련 */
let cntAnimationExecuted = 0;

/*전역 변수 끝*/

/*Map 함수*/
function initMap() {

    /*--------Map----------*/
    map = new ol.Map({
        target: 'map',
        controls: ol.control.defaults({zoom: false}),
        interactions: setInteraction(), //setinteraction 밑에 선언되어 있는데 왜 또 넣었니?
        view: new ol.View({
            projection: SRID,
            center: BUSAN_CENTER,
            zoom: 11.66,
            extent : MAX_EXTENT,
            minZoom: 11,
            // constrainResolution: true,	//강제로 해상도 맞춤 (지도 마우스 휠시 해상도에 맞게 줌인/아웃)
        })
    });

    /*--------Layer----------*/
    // osmLayer = new ol.layer.Tile({
    //     source: new ol.source.OSM()
    // });

    let baseLayer = new ol.layer.Tile({
        source:  new ol.source.XYZ({
            projection: "EPSG:3857",
            url : "http://www.khoa.go.kr/oceanmap/D53E1E6DB9D555867D97116A1/BASEMAP_3857/{z}/{y}/{x}/basemapWMTS.do"
        })
    });

    backgroundLayer = new ol.layer.Tile({
        source : new ol.source.TileWMS({
            url : geoserverGwcUrl,
            params : {
                'LAYERS' : 'smartvillage:map_background',
                'Tiled' : true,
                'VERSION': '1.1.0'
            },
            serverType : 'geoserver',
            transition : 0,
            /*
            tileGrid : new ol.tilegrid.TileGrid({
                tileSize : [256,256]
            })
             */
        })
        , visible: true
    });

    busanSggLableLayer = new ol.layer.Tile({
        source : new ol.source.TileWMS({
            url : geoserverGwcUrl,
            params : {
                'LAYERS' : 'smartvillage:tsgg',
                'Tiled' : true,
                'VERSION': '1.1.0'
            },
            serverType : 'geoserver',
            transition : 0
        })
        , visible: true
    })

    busanSource = setSourceFromRequest('busanWkt');
    busanLayer = new ol.layer.Vector({
        source : busanSource,
        // style : setBasicStyleText
        style : BASIC_STYLE['busan'],
        zIndex : 0
    });

    galmaetSource = new ol.source.Vector();
    galmaetLayer = new ol.layer.Vector({
        visible: false,
        source: galmaetSource,
        style: BASIC_STYLE['none']
    });

    tipoffSource = new ol.source.Vector();
    tipoffLayer = new ol.layer.Vector({
        visible : false,
        source : tipoffSource,
        style: BASIC_STYLE['none']
    });

    selectedSource = new ol.source.Vector();
    selectedLayer = new ol.layer.Vector({
        source : selectedSource,
        visible: true
    });

    portSource = new ol.source.Vector();
    portLayer =  new ol.layer.Vector({
        source: portSource,
        selectable : true,
        // visible : false
        zIndex : 1
    });

    shipLayer = new ol.layer.Tile({
        source : new ol.source.TileWMS({
            url : geoserverUrl,
            params : {
                'LAYERS' : 'smartvillage:Jancarb_out',
                'Tiled' : true,
                'VERSION': '1.1.0'
            },
            serverType : 'geoserver',
            transition : 0
        })
        , visible: false
    })


    tipoffOverlay = new ol.Overlay({
        visible: false
    });


    /*
    * addlayer 순서 중요함!
    * osmlayer -> background -> 나머지 올려야함
    */
    // map.addLayer(osmLayer);
    map.addLayer(baseLayer);
    map.addLayer(backgroundLayer);
    map.addLayer(busanLayer);
    map.addLayer(galmaetLayer);
    map.addLayer(tipoffLayer);
    map.addLayer(selectedLayer);
    map.addOverlay(tipoffOverlay); //누가 여기다가 overlay 추가 했니

    map.addLayer(busanSggLableLayer);
    map.addLayer(portLayer);
    map.addLayer(shipLayer);

    /*--------Interaction----------*/
    setInteraction();

    /*--------Control----------*/


    /*--------Overlay----------*/
    cloudOverlay = new ol.Overlay.AnimatedCanvas({
        particule: ol.particule.Cloud,
        density: 1,
        speed: 3,
        angle: 0.75//Math.PI/1
    });

    cloudOverlay.setVisible(false);
    map.addOverlay(cloudOverlay);


    /*--------map function----------*/
    //map.onclick...등등
    map.on('pointermove', (e) => {
        map.getViewport().style.cursor = '';
        let feature = map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
            if (layer.get('selectable') == true) {
                return feature;
            }
        });
        if(feature){
            map.getViewport().style.cursor = 'pointer';
        }
    });

    //map click 이벤트들 위치 여기로 전부 옮겨야 함
    /* Layer 렌더링 시 작업 요소 */
    let busanLayerRenderExtent;
    //busan 레이어 그리기 전 -> cloud 표출
    busanLayer.on('prerender', function (event){
        if($(".side-theme-item").hasClass("on")) {
            if (!showEffect) {
                return;
            }

            if (showEffect) {
                if (event.frameState.extent.toString() === busanLayerRenderExtent) {
                    return;
                }
                busanLayerRenderExtent = event.frameState.extent.toString();

                //지역 off/cloud on
                busanLayer.setVisible(false);
                cloudOverlay.setVisible(true);

                //1.5초 후 지역 on
                setTimeout(function (){
                    busanLayer.setVisible(true);
                }, 1000);

                //2.5초 후 cloud off
                setTimeout(function () {
                    cloudOverlay.setVisible(false);
                    // showEffect=false;
                }, 2500);
            }
        }
    });

}
/*Map 함수 끝*/

/* Interaction 함수 */
function setInteraction() {
    // 드래그와 스크롤 비활성화
    let interactions = ol.interaction.defaults();
    interactions.forEach((interaction) => {
        if(interaction instanceof ol.interaction.DragPan){
            interaction.setActive(false);
        }else if (interaction instanceof ol.interaction.MouseWheelZoom){
            interaction.setActive(false);
        }
    });
    return interactions;
}

/* Interaction 함수 끝 */

//portlayer 초기화
function initPortLayer(){
    //Drop 효과 때문에 재생성
    portSource = new ol.source.Vector();

    portLayer =  new ol.layer.Vector({
        source: portSource,
        selectable : true,
        // visible : false
        zIndex : 1
    });
    map.addLayer(portLayer);
}

/*
항만 미세먼지 + 선박 모든 데이터 가져오기
* */
function setPortDust(dustType, key){
    /*
    if (portSource) { //항만 심볼 초기화
        portSource.clear();
        console.log("port source clear");
    }
     */
    /*
        if(clickedFeature != null){
            // console.log("sfsdf");
        }
     */
    // portSource = new ol.source.Vector(); //clear하면 new 필요 없음

    //항만 레이어 초기화
    initPortLayer();

    let info = BASE_URL[key];
    let portUrl = dustType;
    $.ajax({
        url : info.url+portUrl,
        type: info.type,
        dataType:'json',
        contentType : 'application/json',
        success: function (resp){
            if (resp.data != null) { //여기결과 코드 값으로 변경해야 함

                let t = 0;
                Object.keys(resp.data).forEach(function (key) {
                    let msrstnKey = resp.data[key];

                    if(showEffect && cntAnimationExecuted == 1){
                        setTimeout(function (){
                            setPortLayer(msrstnKey);
                        }, 100*t)
                        t++;
                    }else{
                        setPortLayer(msrstnKey);
                    }

                    // setTimeout(function (){
                    //     showEffect=false;
                    // },1000)

                    // showEffect = false;
                });

                /*
                //여기 layer 재생성XX
                //이미 생성된 portLayer source 셋팅하고 style만 생성해야 함
                portLayer =  new ol.layer.Vector({
                    source: portSource,
                    selectable : true,
                    style: function(feature) {
                        let dustTypeIndex = combineStrings(dustType, 'Index');
                        return PORT_PM_STYLE[feature.get('properties')[dustTypeIndex]];
                    },
                    visible : false
                });
                map.addLayer(portLayer);
                */

            }
        },
        error: function (e) {
            console.log('error in setPortDust');
        }

    });
}

/* 미세/초미세 */
function setPortLayer(msrstnKey){
    let lonLat = msrstnKey.geom.match(/\((.*?)\)/)[1].split(' ');
    let lon = parseFloat(lonLat[0]);
    let lat = parseFloat(lonLat[1]);

    let pointFeature = new ol.Feature({
        geometry:new ol.geom.Point([lon, lat]),
        properties: msrstnKey
    });

    let dustTypeIndex = combineStrings(dustType, 'Index');
    // return PORT_PM_STYLE[feature.get('properties')[dustTypeIndex]];

    let indexKey = msrstnKey[dustTypeIndex];
    pointFeature.setStyle(PORT_PM_STYLE[indexKey]);

    portSource.addFeature(pointFeature);
    portLayer.setSource(portSource);

    if(showEffect && cntAnimationExecuted == 1){
        setTimeout(function() {
            portLayer.animateFeature(pointFeature, DROP_ANIMATION);
        },10);
    }
}

/*항만 위치 데이터*/
function getPortGeom(){
    if (portGeomSource) { //항만 심볼 초기화
        portGeomSource.clear();
    }
    portGeomSource = new ol.source.Vector();
    $.ajax({
        url : 'data/target02/port-location-data',
        type: 'get',
        dataType:'json',
        contentType : 'application/json',
        success: function (resp){
            if (resp.data != null) {
                console.log("success");
                for (i=0; i<resp.data.length; i++){
                    let geom = resp.data[i].geom;
                    setPortGeomLayer(resp.data[i]);
                }

                //레이어 여기서 생성XXXX
                portGeomLayer =  new ol.layer.Vector({
                    source: portGeomSource,
                    selectable : true
                });
                map.addLayer(portGeomLayer);
            }
        },
        error: function (e) {
            console.log('error in getPortGeom');
        }
    });
}

/* 미세먼지 변화 */
function setPortGeomLayer(properties){
    let lonLat = properties.geom.match(/\((.*?)\)/)[1].split(' ');
    let lon = parseFloat(lonLat[0]);
    let lat = parseFloat(lonLat[1]);

    let pointFeature = new ol.Feature({
        geometry:new ol.geom.Point([lon, lat]),
        properties: properties
    });
    portGeomSource.addFeature(pointFeature);
}


/*항만 끝*/

/**
 * 서버에 미세먼지 수치를 요청하고 feature의 properties를 수정하는 메서드
 * @param source properties를 적용할 source
 */
function setFeatureFromRequest(source, key){
    let info = BASE_URL[key];
    let url = '';
    if(key == 'dustTipoff'){
        url = '/' + setUrlDateFormat();
    }
    let features = [];

    $.ajax({
        url: info.url + url,
        type: info.type,
        dataType: 'json',
        success: function (resp) {
            if(resp.code==0){
                if(resp.data != null){
                    if(key == 'dustTipoff'){
                        resp.data.forEach((item) => {
                            let feature = FORMAT_WKT.readFeature(item.geom);
                            if (item.properties != null){
                                feature.setProperties(item.properties);
                            }
                            features.push(feature);
                        });
                        source = new ol.source.Vector({
                            features : features
                        });
                        tipoffLayer.setSource(source);
                        tipoffLayer.set('selectable', true);
                    }

                    source.forEachFeature(function (feature){
                        let property;
                        if(key == 'dustArea'){
                            let admdstCd = feature.getProperties().admdstCd;
                            property = resp.data[admdstCd];
                            if(property == undefined){
                                return;
                            }
                            if (admdstCd == property.admdstCd) {
                                feature.setProperties(property);
                                feature.setStyle(setAreaStyleText);

                            }
                        }
                        /*
                        else if(key == 'dustPort') {
                            let msrstnId = feature.getProperties().properties.portMsrstnId;
                             property = resp.data[msrstnId];
                            if(property == undefined){
                                return;
                            }
                            if(property.msrstnId == msrstnId){
                                feature.setProperties(property);
                                if (PORT_PM_STYLE[property[combineStrings(dustType, 'Index')]] != undefined) {
                                    feature.setStyle(PORT_PM_STYLE[property[combineStrings(dustType, 'Index')]]);
                                } else {
                                    feature.setStyle(PORT_PM_STYLE['PROOFREADING']);
                                }
                            }
                        }
                        */
                        else if(key == 'dustGalmaet'){
                            let guganNm = feature.getProperties().guganNm;
                            property = resp.data[guganNm];
                            if(property == undefined){
                                return;
                            }
                            if(property.guganNm == guganNm){
                                feature.setProperties(property);
                                // 임시로 미세먼지 지수 표현
                                if (GALMAET_PM_STYLE[property['pm10Index']] != undefined) {
                                    feature.setStyle(GALMAET_PM_STYLE[property['pm10Index']]);
                                } else {
                                    feature.setStyle(GALMAET_PM_STYLE['PROOFREADING']);
                                }
                            }
                        } else if(key == 'dustTipoff'){
                            feature.setStyle(setAreaStyleText);
                        }
                    });
                    isUpdate = true;
                }else{
                    console.log("data is null");
                }
            }else{
                alert(resp.message);
            }
        },
        error: function (e) {
            console.log('error in setFeatureFromRequest');
        }
    });
}

/**
 * 미세먼지/초미세먼지 스타일 초기화
 * @param source 초기화할 소스
 * @param style 적용할 스타일
 */
function resetStyle(source, style){
    /*
    //label layer
    if(!busanSggLableLayer.getVisible()){
        busanSggLableLayer.setVisible(true);
    }
    */

    source.forEachFeature(function (feature){
        let property = feature.getProperties();
        feature.setStyle(style);
    });
}

/*항만 Layer Visible*/
function visiblePortLayer(){
    if(!portLayer.getVisible()){
        portLayer.setVisible(true);
    }
}

//harin 이거 java단에서 하면 안되는건가???
function formatDate(date, type) {
    // 날짜, 월, 연도 추출
    let day = date.getDate();
    let month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    let year = date.getFullYear();

    if(type == 'portrait'){
        return `${month}/${day}`;
    }

    // 한 자리 숫자를 두 자리로 표시
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // 원하는 형식으로 문자열 조합
    return `${month}월 ${day}일`;
}

/*
 * 어제, 오늘, 내일 날짜 설정하는 메서드
 */
function getFormattedDates(msrmtDt) {

    // 오늘 날짜
    let today = new Date(msrmtDt);
    let formattedToday = formatDate(today, 'landscape');

    // 어제 날짜
    let yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    let formattedYesterday = formatDate(yesterday, 'landscape');

    // 내일 날짜
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    let formattedTomorrow = formatDate(tomorrow, 'landscape');

    $(".yesterday-date").html(formattedYesterday);
    $(".today-date").html(formattedToday);
    $(".tomorrow-date").html(formattedTomorrow);

    $(".portrait .yesterday-date").html(formatDate(today, 'portrait'));
    $(".portrait .today-date").html(formatDate(yesterday, 'portrait'));
    $(".portrait .tomorrow-date").html(formatDate(tomorrow, 'portrait'));
}


//어제 데이터
function setYesterdayPortDust(msrstnId, key){
    let info = BASE_URL[key]
    let yesterdayDustUrl = `${msrstnId}`;


    $.ajax({
        url: info.url + yesterdayDustUrl,
        type: info.type,
        dataType: 'json',
        success: function (resp){
            if (resp.data != null) {
                console.log("setYesterdayDust success");
                let yesterdayDust = resp.data[0];
                let yesterdayPm10Index = yesterdayDust.pm10Index;
                let yesterdayPm25Index = yesterdayDust.pm25Index;

                if(dustType == 'pm10'){
                    $('.side-section-' + themeType + " .yesterday-index").html(PM_INDEX[yesterdayPm10Index]);
                    $('.side-section-' + themeType + " .yesterday-index").css('color', LPI_LINE_COLOR[yesterdayPm10Index]);
                    $('.side-section-' + themeType + " .yesterday-img").attr("src", DUST_INDEX_IMG[yesterdayPm10Index].src);
                    $('.side-section-' + themeType + " .yesterday-section").css('backgroundColor', LPI_BACKGROUND_COLOR[yesterdayPm10Index]);
                    $('.side-section-' + themeType + " .yesterday-section").css('borderColor', LPI_LINE_COLOR[yesterdayPm10Index]);
                } else if (dustType == 'pm25') {
                    $('.side-section-' + themeType + " .yesterday-index").html(PM_INDEX[yesterdayPm25Index]);
                    $('.side-section-' + themeType + " .yesterday-index").css('color', LPI_LINE_COLOR[yesterdayPm25Index]);
                    $('.side-section-' + themeType + " .yesterday-img").attr("src", DUST_INDEX_IMG[yesterdayPm25Index].src);
                    $('.side-section-' + themeType + " .yesterday-section").css('backgroundColor', LPI_BACKGROUND_COLOR[yesterdayPm25Index]);
                    $('.side-section-' + themeType + " .yesterday-section").css('borderColor', LPI_LINE_COLOR[yesterdayPm10Index]);
                }

            } else {
                // java에서 지수의 이름으로 변경전달 필요
                $('.side-section-' + themeType + " .yesterday-index").html(PM_INDEX['PROOFREADING']);
                $('.side-section-' + themeType + " .yesterday-img").attr("src", DUST_INDEX_IMG['PROOFREADING'].src);

                $('.side-section-' + themeType + " .yesterday-index").css('color', LPI_LINE_COLOR['NOT_AVAILABLE']);
                $('.side-section-' + themeType + " .yesterday-section").css('backgroundColor', LPI_BACKGROUND_COLOR['NOT_AVAILABLE']);
                $('.side-section-' + themeType + " .yesterday-section").css('borderColor', LPI_LINE_COLOR['NOT_AVAILABLE']);
            }
        },
        error: function (e) {
            console.log('error in setYesterdayDust');
        }

    });
}
/* onclickmap 함수 하나로 처리 하기 */
/*예보데이터*/
function setForecastData(key){
    let info = BASE_URL[key]

    $.ajax({
        url: info.url,
        type: info.type,
        dataType: 'json',
        success: function (resp){
            if (resp.data != null) {
                console.log("setForecastData success");
                let forecastImg = "../../images/target02/";
                if(resp.data.length >0) {
                    let forecastPm10Index = resp.data[0].lifePatternName;
                    let forecastPm25Index = resp.data[1].lifePatternName;

                    let forecastPm10Img = forecastImg+resp.data[0].lpiImgFileName;
                    let forecastPm25Img = forecastImg+resp.data[1].lpiImgFileName;

                    let forecastPm10Nm = resp.data[0].engLifePatternName.toUpperCase();
                    let forecastPm25Nm = resp.data[1].engLifePatternName.toUpperCase();

                    if(dustType == 'pm10'){
                        $('.side-section-' + themeType + " .tomorrow-index").html(forecastPm10Index);
                        $('.side-section-' + themeType + " .tomorrow-index").css('color', LPI_LINE_COLOR[forecastPm10Nm]);
                        $('.side-section-' + themeType + " .tomorrow-img").attr("src", forecastPm10Img);
                        $('.side-section-' + themeType + " .tomorrow-section").css('backgroundColor', LPI_BACKGROUND_COLOR[forecastPm10Nm]);
                        $('.side-section-' + themeType + " .tomorrow-section").css('borderColor', LPI_LINE_COLOR[forecastPm10Nm]);
                    } else if (dustType == 'pm25') {
                        $('.side-section-' + themeType + " .tomorrow-index").html(forecastPm25Index);
                        $('.side-section-' + themeType + " .tomorrow-index").css('color', LPI_LINE_COLOR[forecastPm25Nm]);
                        $('.side-section-' + themeType + " .tomorrow-img").attr("src", forecastPm25Img);
                        $('.side-section-' + themeType + " .tomorrow-section").css('backgroundColor', LPI_BACKGROUND_COLOR[forecastPm25Nm]);
                        $('.side-section-' + themeType + " .tomorrow-section").css('borderColor', LPI_LINE_COLOR[forecastPm25Nm]);
                    }
                }else{
                    $('.side-section-' + themeType + " .tomorrow-index").html("교정중");
                    $('.side-section-' + themeType + " .tomorrow-img").attr("src", forecastImg + "lpi_dust_null.webp");
                    $('.side-section-' + themeType + " .tomorrow-section").css('backgroundColor', LPI_BACKGROUND_COLOR['PROOFREADING']);
                    $('.side-section-' + themeType + " .tomorrow-section").css('borderColor', LPI_LINE_COLOR['PROOFREADING']);
                }
            }
        },
        error: function (e) {
            console.log('error in setForecastData');
        }

    });
}


function onClickPort() {

    map.on('click', function(evt) {
        if(themeType == 'port'){
            clickedFeature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {

                portSource.forEachFeature(function (feature){
                    let properties = feature.A.properties;
                    feature.setStyle((PORT_PM_STYLE[properties[combineStrings(dustType,'Index')]]));
                });

                return feature;
            });

            //클릭했을때 크기 커지게
            if (clickedFeature != null && clickedFeature.A.properties != null) {
                setPortDetail(clickedFeature);
                let currentStyle = clickedFeature.getStyle()[1];
                if (currentStyle) {
                    let newStyle = new ol.style.Style({
                        image: new ol.style.Icon({
                            opacity: currentStyle.getImage().getOpacity(),
                            scale: 0.45,
                            src: currentStyle.getImage().getSrc()
                        })
                    });
                    clickedFeature.setStyle(newStyle);
                }
            } else {
                console.log('No feature clicked.');
            }
        }
    });
}
/* onclickmap 함수 하나로 처리 하기 */
function onClickArea() {
    map.on('click', function(evt) {
        if(themeType == 'area'){
            clickedFeature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                if(layer == busanLayer){
                    return feature;
                }else {
                    return null;
                }
            });

            if (clickedFeature != null) {
                selectedSource.clear();
                selectedLayer.setVisible(true);
                setAreaDetail(clickedFeature);
                selectedSource.addFeature(clickedFeature.clone());

            } else {
                console.log('No feature clicked.');
            }
        }
    });
}

/* onclickmap 함수 하나로 처리 하기 */
function onClickGalmaet() {
    map.on('click', function(evt) {
        if(themeType == 'galmaet'){
            clickedFeature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
                return feature;
            });

            if (clickedFeature != null) {
                setGalmaetDetail(clickedFeature);

            } else {
                console.log('No feature clicked.');
            }
        }
    });
}

/* hover 스타일 메서드 */
function onHoverMap(){
    let selected = null;
    map.on('pointermove', function (e){
        if(selected !== null){
            selected.setStyle(undefined);
            selected = null;
        }
        map.forEachFeatureAtPixel(e.pixel, function (feature) {
            selected = feature;
            selectStyle.getFill().setColor(PM_STYLE[feature.get('pm10Index')].getFill().getColor() || '#eeeeee');
            feature.setStyle(selectStyle);
            return true;
        });
    });
}

const displayFeatureInfo = function (pixel, target) {
    const feature = target.closest('.ol-control')
        ? undefined
        : map.forEachFeatureAtPixel(pixel, function (feature) {
            return feature;
        });
    if (feature) {
        info.style.left = pixel[0] + 'px';
        info.style.top = pixel[1] + 'px';
        if (feature !== currentFeature) {
            info.style.visibility = 'visible';
            info.innerText = '1234';
        }
    } else {
        info.style.visibility = 'hidden';
    }
    currentFeature = feature;
};

function getDust24Data(source, msrstnDt, key, type) {
    let info = BASE_URL[key];
    let dustUrl = `${type}/${msrstnDt}`;

    $.ajax({
        url: info.url + dustUrl,
        type: info.type,
        dataType: 'json',
        success: function (resp) {
            if (resp.data != null) {
                console.log("getDust24Data 성공");
                let date = Object.keys(resp.data);
                let dateMin = parseInt(date[0].substr(11, 2));
                let dateMax = parseInt(date[date.length - 1].substr(11, 2));


                if (type == 'port') {
                    portResp = resp;
                    processPortData(source, portResp, date);
                } else if (type === 'area') {
                    areaResp = resp;
                    processAreaData(source, areaResp, date);
                }
                if (portResp && areaResp) {
                    initializeDustSlider(portResp, areaResp, date, dateMin, dateMax);
                }
            }
        },
        error: function (e) {
            console.log('getPortDust24Data 오류');
        }
    });
}

/*날짜마다 지도에 표출되는 가장 처음의 값 (00:00시)*/
function processPortData(source, resp, date) {
    let sliderTime;
    $(".slider-time").empty();
    for (let i = 0; i < date.length; i++) {
        sliderTime = date[i].substr(11, 5);
        let sliderTimeInt = parseInt(date[i].substr(11, 2));
        if (date.length >= 22) {
            if (sliderTimeInt % 3 == 0) {
                let sliderTimeHtml = `<span>${sliderTime}</span>`;
                $(".slider-time").append(sliderTimeHtml);
            }
        } else if (8 < date.length < 22) {
            if (sliderTimeInt % 2 == 0) {
                let sliderTimeHtml = `<span>${sliderTime}</span>`;
                $(".slider-time").append(sliderTimeHtml);
            }
        } else if (date.length <= 8) {
            let sliderTimeHtml = `<span>${sliderTime}</span>`;
            $(".slider-time").append(sliderTimeHtml);
        }
    }

    source.forEachFeature(function (feature) {
        for (let j = 0; j < resp.data[date[0]].length; j++) {
            if (feature.getProperties().properties.portMsrstnId == resp.data[date[0]][j].msrstnId) {
                if(resp.data[date[0]][j][combineStrings(dustType, 'Index')] == undefined){
                    feature.setStyle(PORT_PM_STYLE['PROOFREADING']);
                }else {
                    feature.setStyle(PORT_PM_STYLE[resp.data[date[0]][j][combineStrings(dustType, 'Index')]]);
                }

            }
        }
    });
}

/*날짜마다 지도에 표출되는 가장 처음의 값 (00:00시)*/
function processAreaData(source, resp, date) {
    source.forEachFeature(function (feature) {
        for (let j = 0; j < resp.data[date[0]].length; j++) {
            if (feature.A.admdstCd == resp.data[date[0]][j].admdstCd) {
                if(resp.data[date[0]][j][combineStrings(dustType, 'Index')] == undefined){
                    let style = PM_STYLE['PROOFREADING'];
                    // style.getText().setText('');
                    feature.setStyle(style);
                }else{
                    let style = PM_STYLE[resp.data[date[0]][j][combineStrings(dustType, 'Index')]];
                    // style.getText().setText('');
                    feature.setStyle(style);
                }

            }
        }
    });
}


/*슬라이더 진행될때의 미세먼지값*/
function updatePortFeatures(portResp, date, dustSliderValue) {
    portGeomSource.forEachFeature(function (feature) {
        for (let j = 0; j < portResp.data[date[dustSliderValue]].length; j++) {
            if (feature.getProperties().properties.portMsrstnId == portResp.data[date[dustSliderValue]][j].msrstnId) {
                if(portResp.data[date[dustSliderValue]][j][combineStrings(dustType, 'Index')] == undefined){
                    feature.setStyle(PORT_PM_STYLE["PROOFREADING"]);
                }else{
                    feature.setStyle(PORT_PM_STYLE[portResp.data[date[dustSliderValue]][j][combineStrings(dustType, 'Index')]]);
                }
            }
        }
    });
}

/*슬라이더 진행될때의 미세먼지값*/
function updateAreaFeatures(areaResp, date, dustSliderValue) {
    busanSource.forEachFeature(function (feature) {
        for (let j = 0; j < areaResp.data[date[dustSliderValue]].length; j++) {
            if (feature.A.admdstCd == areaResp.data[date[dustSliderValue]][j].admdstCd) {
                if(areaResp.data[date[dustSliderValue]][j][combineStrings(dustType, 'Index')] == undefined){
                    feature.setStyle(PM_STYLE["PROOFREADING"]);
                }else{
                    feature.setStyle(PM_STYLE[areaResp.data[date[dustSliderValue]][j][combineStrings(dustType, 'Index')]]);
                }

            }
        }
    });
}

/**
 * 항만 대시보드의 text 설정 함수
 */
function setPortDetail(feature) {
    //항만 정보
    if(feature.A.properties != null){

        // 대시보드 cover hide
        $('.side-section-' + themeType + '.side-section-cover').addClass('hide');
        // 차트 cover show
        $('.transport-section-cover').removeClass('hide');
        // 대시보드 열림
        showSideSection();

        let properties = feature.A.properties;
        getFormattedDates(properties.msrmtDt);

        /* header text 설정*/
        $('.side-section-'+themeType+' .header-date').html(setDateFormat(properties.msrmtDt, '') + " 기준");
        $('.side-section-'+themeType+' .header-name').html(properties.msrstnNm);

        /* page 1 설정 */
        $(".msrstn-name").html(properties.msrstnNm);
        $(".msrstn-addr").html(properties.msrstnAddr);
        $(".msrstn-year").html(properties.installYear);
        $(".msrstn-item").html(properties.measureItem);

        //오늘
        if(properties.pm10Index != undefined){
            if(dustType == 'pm10'){

                // 생활패턴 데이터 변경으로 패턴명과 이미지명 java에서 전달하는 방식으로 변경 필요
                $('.side-section-' + themeType + " .today-index").html(PM_INDEX[properties.pm10Index]);
                $('.side-section-' + themeType + " .today-index").css('color', LPI_LINE_COLOR[properties.pm10Index]);
                $('.side-section-' + themeType + " .today-img").attr("src", DUST_INDEX_IMG[properties.pm10Index].src);
                $('.side-section-' + themeType + " .today-section").css('backgroundColor', LPI_BACKGROUND_COLOR[properties.pm10Index]);
                $('.side-section-' + themeType + " .today-section").css('borderColor', LPI_LINE_COLOR[properties.pm10Index]);
            }else if(dustType == 'pm25'){

                // 생활패턴 데이터 변경으로 패턴명과 이미지명 java에서 전달하는 방식으로 변경 필요
                $('.side-section-' + themeType + " .today-index").html(PM_INDEX[properties.pm25Index]);
                $('.side-section-' + themeType + " .today-index").css('color', LPI_LINE_COLOR[properties.pm25Index]);
                $('.side-section-' + themeType + " .today-img").attr("src", DUST_INDEX_IMG[properties.pm25Index].src);
                $('.side-section-' + themeType + " .today-section").css('backgroundColor', LPI_BACKGROUND_COLOR[properties.pm25Index]);
                $('.side-section-' + themeType + " .today-section").css('borderColor', LPI_LINE_COLOR[properties.pm10Index]);
            }
        } else {
            $('.side-section-' + themeType + " .today-index").html(PM_INDEX['PROOFREADING']);
            $('.side-section-' + themeType + " .today-index").css('color', LPI_LINE_COLOR['NOT_AVAILABLE']);
            $('.side-section-' + themeType + " .today-img").attr("src", DUST_INDEX_IMG['PROOFREADING'].src);
            $('.side-section-' + themeType + " .today-section").css('backgroundColor', LPI_BACKGROUND_COLOR['NOT_AVAILABLE']);
            $('.side-section-' + themeType + " .today-section").css('borderColor', LPI_LINE_COLOR['NOT_AVAILABLE']);
        }

        //어제평균 /** 이부분 바꿔야함
        setYesterdayPortDust(properties.msrstnId, 'yesterdayPortDust');
        //내일
        setForecastData("forecastData");

        setDust24Graph(dustType.toUpperCase(), properties, `dust-chart-${nowOrientation}`); //24시간 미세먼지 변화 그래프
        setDustValueTable(properties); //24시간 기준 미세먼지 최저,평균,최고값
        setEntryDepartureGraph(properties, `total-chart-${nowOrientation}`);
    }else{
        return;
    }

}
function getGalmaetLifePattern(properties, key){
    let info = BASE_URL[key];
    let dustUrl = `/${properties.courseId}/${properties.guganId}/${properties.msrmtDt}`;

    $.ajax({
        url: info.url + dustUrl,
        type: info.type,
        dataType: 'json',
        success: function (resp) {
            if (resp.data != null) {
                let lifePatterns = resp.data.lifePatterns;
                $.each(lifePatterns, (key, value)=>{
                    switch (key){
                        case '미세먼지':
                            $(`.side-section-${themeType} .pm10-img`).attr('src', `${ctxPath}/images/target02/${value.lpiImgFileNm}`);
                            $(`.side-section-${themeType} .pm10-index`).html(value.lifePatternNm);
                            $(`.side-section-${themeType} .pm10-index`).css('color', LPI_LINE_COLOR[value.level]);
                            $(`.side-section-${themeType} .pm10-section`).css('backgroundColor', LPI_BACKGROUND_COLOR[value.level]);
                            $(`.side-section-${themeType} .pm10-section`).css('borderColor', LPI_LINE_COLOR[value.level]);
                            break;
                        case '초미세먼지':
                            $(`.side-section-${themeType} .pm25-img`).attr('src', `${ctxPath}/images/target02/${value.lpiImgFileNm}`);
                            $(`.side-section-${themeType} .pm25-index`).html(value.lifePatternNm);
                            $(`.side-section-${themeType} .pm25-index`).css('color', LPI_LINE_COLOR[value.level]);
                            $(`.side-section-${themeType} .pm25-section`).css('backgroundColor', LPI_BACKGROUND_COLOR[value.level]);
                            $(`.side-section-${themeType} .pm25-section`).css('borderColor', LPI_LINE_COLOR[value.level]);
                            break;
                        default:
                            break;
                    }
                });
            }
        },
        error: function (e) {
            console.log('getAreaDust24Data 오류');
        }
    });
}

function setAreaDetail(feature){
    if(feature.getProperties().mapType == 'area'){

        // 대시보드 cover hide
        $(".side-section-cover").addClass('hide');
        // 대시보드 열림
        showSideSection();

        let properties = feature.getProperties();
        getFormattedDates(properties.msrmtDt);

        /* header text 설정*/
        $('.side-section-'+themeType+' .header-date').html(setDateFormat(properties.msrmtDt, '')+ " 기준");
        $('.side-section-'+themeType+' .header-name').html(properties.admdstNm);

        if(properties.pm10Index != undefined){
            if(dustType == 'pm10'){

                // 지역 미세먼지 부분 수정 필요.. 처음 모든 지역구 데이터 넘길때 level측정 필요
                $('.side-section-' + themeType + " .today-index").html(PM_INDEX[properties.pm10Index]);
                $('.side-section-' + themeType + " .today-index").css('color', LPI_LINE_COLOR[properties.pm10Index]);
                $('.side-section-' + themeType + " .today-img").attr("src", DUST_INDEX_IMG[properties.pm10Index].src);
                $('.side-section-' + themeType + " .today-section").css('backgroundColor', LPI_BACKGROUND_COLOR[properties.pm10Index]);
                $('.side-section-' + themeType + " .today-section").css('borderColor', LPI_LINE_COLOR[properties.pm10Index]);
            }else if(dustType == 'pm25'){

                $('.side-section-' + themeType + " .today-index").html(PM_INDEX[properties.pm25Index]);
                $('.side-section-' + themeType + " .today-index").css('color', LPI_LINE_COLOR[properties.pm25Index]);
                $('.side-section-' + themeType + " .today-img").attr("src", DUST_INDEX_IMG[properties.pm25Index].src);
                $('.side-section-' + themeType + " .today-section").css('backgroundColor', LPI_BACKGROUND_COLOR[properties.pm25Index]);
                $('.side-section-' + themeType + " .today-section").css('borderColor', LPI_LINE_COLOR[properties.pm10Index]);
            }
        } else {
            $('.side-section-' + themeType + " .today-index").html(PM_INDEX['PROOFREADING']);
            $('.side-section-' + themeType + " .today-index").css('color', LPI_LINE_COLOR['NOT_AVAILABLE']);
            $('.side-section-' + themeType + " .today-img").attr("src", DUST_INDEX_IMG['PROOFREADING'].src);
            $('.side-section-' + themeType + " .today-section").css('backgroundColor', LPI_BACKGROUND_COLOR['NOT_AVAILABLE']);
            $('.side-section-' + themeType + " .today-section").css('borderColor', LPI_LINE_COLOR['NOT_AVAILABLE']);
        }


        //어제평균
        setYesterdayPortDust(properties.msrstnId, 'yesterdayAreaDust'); //어제 평균
        //내일
        setForecastData("forecastData");
        getDust24GraphData(properties,'dust24Graph', `area-chart-${nowOrientation}`);
    }else{
        return;
    }
}

function setGalmaetDetail(feature){
    if(feature.getProperties().mapType == 'gm'){

        // 대시보드 cover hide
        $(".side-section-cover").addClass('hide');
        // 대시보드 열림
        showSideSection();

        let properties = feature.getProperties();
        let courseId = properties.courseId;
        let guganId = properties.guganId;

        /* header text 설정*/
        $('.side-section-'+themeType+' .header-date').html(setDateFormat(properties.msrmtDt, '')+ " 기준");
        $('.side-section-'+themeType+' .header-name').html(properties.guganNm);

        /* 생활 패턴 */
        getGalmaetLifePattern( properties, "dustGalmaet");
        /* 갈맷길 정보  */
        $('.galmaet-range').html(properties.gmRange);
        $('.galmaet-degree').html(properties.gmDegree);
        $('.galmaet-course').html(properties.gmCourse);

        /* 볼거리 정보  */
        $('.galmaet-slider img').attr('src', `${ctxPath}/images/target02/gm_img/${properties.lkImgPath}`);
        $('.galmaet-slider span').html(properties.lkNm);
    }else{
        return;
    }
}

/**
 * Theme 버튼 클릭 시 호출 되는 메서드
 * 테마별로 지도 관련된 기능
 * @param themeType
 */
function setThemeMap(themeType){

    //지도 효과 초기화
    showEffect=true;
    cntAnimationExecuted=0;

    clickedFeature = null;

    refreshLayer();
    resetStyle(busanSource, BASIC_STYLE['busan']);

    //경보 데이터 호출
    if(issuePM10List==undefined || issuePM25List==undefined){
        getIssueData();
    }

    switch (themeType) {
        case 'port':
            map.getView().setCenter(PORT_CENTER);
            break;
        case 'area':
            map.getView().setCenter(BUSAN_CENTER);
            break;
        case 'galmaet':
            map.getView().setCenter(BUSAN_CENTER);

            $('.side-section-'+themeType).addClass('show');
            galmaetSource = setSourceFromRequest('galmaetWkt');
            galmaetLayer.setSource(galmaetSource);

            resetStyle(busanSource, BACKGROUND_STYLE);
            setClickStyle();
            onHoverGalmaet();
            galmaetLayer.set('selectable', true);
            // 미세먼지 변화 슬라이더 메뉴 on/off
            $(".monit-item").removeClass("on");
            galmaetLayer.setVisible(true);
            // 미세먼지 주의보
            //setIssueData(idx);
            // AOD 범례로 변경 예정 현재 이미지 없음
            // indexOnOff(idx);

            setFeatureFromRequest(galmaetSource,"dustGalmaet");
            onClickGalmaet();
            if (clickedFeature != null) {
                setGalmaetDetail(clickedFeature);
            }

            setTimeout(function (){
                galmaetLayer.setVisible(true);
                busanLayer.setVisible(true);
            }, 450);

            break;
        case 'tipoff':
            map.getView().setCenter(BUSAN_CENTER);

            // if(showEffect){
            //     cloudOverlay.setVisible(true);
            // }

            busanLayer.setVisible(false);
            onClickTipOff();
            dustType = 'pm10';
            setFeatureFromRequest(tipoffSource, 'dustTipoff');
            tipoffLayer.setVisible(true);
            $(".monit-item").removeClass("on");
            $(".tipoff-dust-index-img").addClass("on");

            /*
            setTimeout(function (){
                tipoffLayer.setVisible(true);
            }, 450);

            setTimeout(function (){
                portLayer.setVisible(true);
                cloudOverlay.setVisible(false);
            }, 2000);

            if(showEffect&& cntAnimationExecuted == 1){
                //cloud overlay 꺼졌는지 확인
                //이벤트 settime 때문에 0.5초마다 재확인
                let isCloudOverlayVisible = cloudOverlay.getVisible();
                const checkCloudVisible = setInterval(function() {
                    isCloudOverlayVisible = cloudOverlay.getVisible();
                    if (isCloudOverlayVisible == false) {
                        clearInterval(checkCloudVisible); // 반복을 종료
                        galmaetLayer.setVisible(true);
                    }
                }, 500); // 0.5초 간격
            }else{
                galmaetLayer.setVisible(true);
            }
            */

            break;
    }
}

function refreshLayer(){

    //선택 레이어 초기화
    selectedSource.clear();
    selectedLayer.setVisible(false);

    //시민 제보 레이어 초기화
    tipoffLayer.setVisible(false);

    //갈맷길 레이어 초기화
    galmaetLayer.setVisible(false);

    //탄소 레이어 초기화
    shipLayer.setVisible(false);

    //시민제보 오버레이 초기화
    tipoffOverlay.setVisible(false);
    $('#tipoff-popup').hide();


    //click 해제
    portLayer.set('selectable', false);
    busanLayer.set('selectable', false);
    galmaetLayer.set('selectable', false);
    tipoffLayer.set('selectable', false);

    // feature click 스타일 해제
    if (select !== null) {
        map.removeInteraction(select);
    }
}
