/* 전역 상수 */
// 타겟 1,2 공통 사용으로 marine-dust-map.js -> common-map.js 이동
const PORT_IC_SCALE = 0.45;
const PORT_CENTER = [14370592.452440148, 4178922.788486468]; //3857 기준
// const BUSAN_CENTER= [14371255.132472211, 4187104.2811642727]; //3857 기준

const BACKGROUND_STYLE = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'rgb(86,86,86)',
        width: 1
    }),
    fill: new ol.style.Fill({
        // color: 'rgba(208,245,116,0.7)',
        color: 'rgba(188,224,103,0.7)',
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
            // color: 'rgba(47,164,246,0.3)',
            color: 'rgba(36,120,255, 0.7)'
            // color: 'rgba(37,36,255, 0.7)'
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
            // color: 'rgba(194,249,140,0.3)',
            color: 'rgba(65,255,58,0.7)'
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
            // color: 'rgba(250,230,1,0.3)'
            color: 'rgba(255,255,36,0.7)'
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
            // color: 'rgba(250,0,0,0.3)'
            color: 'rgba(255,36,36,0.7)'
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
            // color: 'rgba(128,128,128, 0.3)'
            color: 'rgba(116,116,116, 0.7)'
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
const PORT_SHADOW_STYLE = new ol.style.Style({
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
});
const PORT_PM_STYLE = {
    GOOD : [
        PORT_SHADOW_STYLE,
        new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1.0, // 투명도 1=100%
                scale: PORT_IC_SCALE,
                anchor: [0.5, 1],
                src: ctxPath + '/images/target02/ic_port_good.svg'
            })

        })
    ],
    NORMAL :[
        PORT_SHADOW_STYLE,
        new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1.0,
                scale: PORT_IC_SCALE,
                anchor: [0.5, 1],
                src: ctxPath + '/images/target02/ic_port_normal.svg'
            })
        })
    ],
    BAD : [
        PORT_SHADOW_STYLE,
        new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1.0,
                scale: PORT_IC_SCALE,
                anchor: [0.5, 1],
                src: ctxPath + '/images/target02/ic_port_bad.svg'
            })
        })
    ],
    VERY_BAD : [
        PORT_SHADOW_STYLE,
        new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1.0,
                scale: PORT_IC_SCALE,
                anchor: [0.5, 1],
                src: ctxPath + '/images/target02/ic_port_very_bad.svg'
            })
        })
    ],
    PROOFREADING : [
        PORT_SHADOW_STYLE,
        new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1.0, // 투명도 1=100%
                scale: PORT_IC_SCALE,
                anchor: [0.5, 1],
                src: ctxPath + '/images/target02/ic_port_null.svg'
            })
        })
    ]
}

//라이다 스타일
const LIDAR_STYLE = new ol.style.Style({
    image: new ol.style.Icon({
        opacity: 1.0, // 투명도 1=100%
        scale: 0.1,
        anchor: [0.5, 1],
        offset : [2,2],
        src: ctxPath + '/images/target02/ic_lidar.png'
    })
});

const GALMAETGIL_TEXT_STYLE = new ol.style.Text({
    font: 'bold 15px Gong_Gothic_Medium',
    maxAngle: Math.PI / 5,
    overflow: true,
    placement: 'line',
    color: 'rgb(0,0,0)',
    rotateWithView: true,
    stroke: new ol.style.Stroke({
        color: 'rgb(255,255,255)',
        width: 5
    }),
});

const GALMAET_PM_STYLE = {
    GOOD : new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(47,164,246,0.84)',
            width: 8
        }),
        text: GALMAETGIL_TEXT_STYLE
    }),
    MODERATE: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(115,212,16,0.85)',
            width: 8
        }),
        text: GALMAETGIL_TEXT_STYLE
    }),
    UNHEALTHY: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(250,230,1,0.66)',
            width: 8
        }),
        text: GALMAETGIL_TEXT_STYLE
    }),
    VERY_UNHEALTHY: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(250,0,0,0.66)',
            width: 8
        }),
        text: GALMAETGIL_TEXT_STYLE
    }),
    NOT_AVAILABLE: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(128,128,128)',
            width: 8
        }),
        text: GALMAETGIL_TEXT_STYLE
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
    side: 'top'
    // side: $("#side").prop('checked')
})

const GALMAETGIL_SELECT_STYLE =
    new ol.style.Style({
        stroke: new ol.style.Stroke({
            // 선택되었을때 색상
            color: 'rgb(90,255,255)',
            width: 20,
        }),
        text: GALMAETGIL_TEXT_STYLE
    });

/* 전역 상수 */

/*전역 변수*/
/* 지도 관련 */
let busanLayerRenderExtent;
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
let aodLayer;
let galmaetgilTourLayer, galmaetgilTourSource;
let galmaetgilSelectLayer;
let LidarLayer, LidarDataLayer;

/*항만*/
let portSource;
let portLayer;

let portGeomSource;
let portGeomLayer;

/*Overlay*/
let cloudOverlay;
let lidarTempOverlay;

/* 데이터 관련 */
let dustType;
let propHasDustData = false;
let clickedFeature = null;
let tipoffData;

/* Port Animation 실행 효과 관련 */
let cntAnimationExecuted = 0;
let lidarAnimateCnt=0;

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
            zoom: DEFAULT_ZOOM,
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
            url : "http://www.khoa.go.kr/oceanmap/D53E1E6DB9D555867D97116A1/BASEMAP_NPERIOD3857/{z}/{y}/{x}/basemapWMTS.do",
            cacheSize : 200
        })
    });

    backgroundLayer = new ol.layer.Tile({
        source : new ol.source.TileWMS({
            url: geoserverGwcUrl,
            // url: geoserverUrl,
            params: {
                'LAYERS': 'smartvillage:map_background',
                'Tiled': true,
                'VERSION': '1.1.0'
            },
            serverType: 'geoserver',
            transition: 0,
            cacheSize : 200
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
            // url: geoserverUrl,
            params: {
                'LAYERS': 'smartvillage:tsgg',
                'Tiled': true,
                'VERSION': '1.1.0'
            },
            serverType: 'geoserver',
            transition: 0,
            cacheSize : 200
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

    /*바다좋은부산*/
    portSource = new ol.source.Vector();
    portLayer =  new ol.layer.Vector({
        source: portSource,
        selectable : true,
        // visible : false
        zIndex: 1
    });

    shipLayer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: geoserverUrl,
            params: {
                'LAYERS': 'smartvillage:Jancarb_out',
                'Tiled': true,
                'VERSION': '1.1.0'
            },
            serverType: 'geoserver',
            transition: 0
        })
        , visible: false
    });

    portGeomSource = new ol.source.Vector();
    portGeomLayer =  new ol.layer.Vector({
        source: portGeomSource,
        selectable : true
    });



    galmaetSource = new ol.source.Vector();
    galmaetLayer = new ol.layer.Vector({
        visible: false,
        source: galmaetSource,
        style: setGalmaetgilStyle
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



    aodLayer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: geoserverUrl,
            params: {
                'LAYERS': 'smartvillage:view_aod',
                'Tiled': true,
                'VERSION': '1.1.0'
            },
            serverType: 'geoserver',
            transition: 0
        })
        , visible: false
    });

    galmaetgilTourSource = new ol.source.Vector();
    galmaetgilTourLayer = new ol.layer.Vector({
        source: galmaetgilTourSource,
        visible: false,
        id: 'galmaetgilTour'
    });

    galmaetgilSelectLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        visible: false,
        style: setGalmaetgilSelectStyle
    });



    LidarLayer = new ol.layer.Vector({
       source : new ol.source.Vector({
           features : [
               new ol.Feature({
                   geometry : new ol.geom.Point(ol.proj.transform([129.0813, 35.065], "EPSG:4326", "EPSG:3857")),
               })
           ],
       }),
       style : LIDAR_STYLE,
       visible : false,
       id: 'Lidar',
       selectable : true
    });


    /*
    * addlayer 순서 중요함!
    * osmlayer -> background -> 나머지 올려야함
    * busanSggLableLayer는 마지막에 위치해야 함
    */
    // map.addLayer(osmLayer);
    map.addLayer(baseLayer);
    map.addLayer(backgroundLayer);
    map.addLayer(busanLayer);
    map.addLayer(galmaetLayer);
    map.addLayer(tipoffLayer);
    map.addLayer(selectedLayer);

    map.addLayer(portLayer); //port lidar 그룹 지을 예정
    map.addLayer(LidarLayer);
    map.addLayer(shipLayer);
    map.addLayer(aodLayer);
    map.addLayer(galmaetgilSelectLayer);
    map.addLayer(galmaetgilTourLayer);
    map.addLayer(portGeomLayer);
    map.addLayer(busanSggLableLayer);
    /*--------Interaction----------*/


    setInteraction();
    /*--------Control----------*/

    /*--------Overlay----------*/
    tipoffOverlay = new ol.Overlay({
        visible: false
    });
    cloudOverlay = new ol.Overlay.AnimatedCanvas({
        particule: ol.particule.Cloud,
        density: 1,
        speed: 3,
        angle: 0.75//Math.PI/1
    });

    let galmaetgilTourOverlay = new ol.Overlay({
        visible: false,
        element: document.getElementById('galmaetgil-overlay')
    })

    map.addOverlay(tipoffOverlay);
    cloudOverlay.setVisible(false); //extent라서 visible 함수 써야 함
    map.addOverlay(cloudOverlay);
    map.addOverlay(galmaetgilTourOverlay);

    /*--------map function----------*/
    //map.onclick...등등
    //map click 이벤트들 위치 여기로 전부 옮겨야 함
    map.on('click', function (e) {
        if (themeType == 'galmaet') {
            onClickGalmaet(e);
        }else if(themeType == 'port'){
            let feature = map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                if (layer.get('id') == 'Lidar') {
                    addLidarDataLayer();
                    // 지도 로드 후 애니메이션 시작
                    // LidarDataLayer.on('postrender', animateLidar);
                    map.once('rendercomplete', animateLidar);
                    return ;
                }
            });
        }


    });

    map.on('pointermove', (e) => {
        map.getViewport().style.cursor = '';
        let feature = map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
            if (layer.get('selectable') == true) {
                map.getViewport().style.cursor = 'pointer';

            }
            if (layer.get('id') == 'galmaetgilTour') {
                return feature;
            }
        });

        if (feature) {
            if (feature != undefined) {
                let overlayEm = $("#galmaetgil-overlay");
                overlayEm.show();
                overlayEm.text(feature.getProperties().place);

                galmaetgilTourOverlay.setPosition(e.coordinate);
            } else {
                if ($("#galmaetgil-overlay").css('display') != 'none') {
                    $("#galmaetgil-overlay").hide();
                    galmaetgilTourOverlay.setVisible(false);
                }

            }
        } else {
            if ($("#galmaetgil-overlay").css('display') != 'none') {
                $("#galmaetgil-overlay").hide();
                galmaetgilTourOverlay.setVisible(false);
            }
        }
    });


    /* Layer 렌더링 시 작업 요소 */

    //busan 레이어 그리기 전 -> cloud 표출
    busanLayer.on('prerender', function (event) {
        if ($(".theme-item").hasClass("on")) {
            if (!showEffect) {
                return;
            }

            if (showEffect && cntAnimationExecuted == 1) {
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

                    if($(".theme-item.on").attr('data-theme')!="port"){
                        showEffect=false;
                        isSubProcessing=false;
                    }

                    // showEffect=false;
                }, 2500);
            }
        }
    });

    let animationCnt = 0;
    DROP_ANIMATION.on('animationend', function () {
        animationCnt++;
        if (animationCnt == 4) {
            showEffect = false;
            isSubProcessing = false;
            animationCnt = 0;

            LidarLayer.setVisible(true);
        }
    });


}

/*Map 함수 끝*/

/* Interaction 함수 */
function setInteraction() {
    // 드래그와 스크롤 비활성화
    let interactions = ol.interaction.defaults();
    interactions.forEach((interaction) => {
        if (interaction instanceof ol.interaction.DragPan) {
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
        async : false,
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
                });
            }
        },
        error: function (e) {
            console.log('error in setPortDust');
        }

    });
    setTimeout(function () {
        showEffect = false;
    }, 3000);

    // showEffect = false;

    return true;
}

/* 미세/초미세 */
function setPortLayer(msrstnKey) {
    // let lonLat = msrstnKey.geom.match(/\((.*?)\)/)[1].split(' ');
    // let lon = parseFloat(lonLat[0]);
    // let lat = parseFloat(lonLat[1]);

    let pointFeature = FORMAT_WKT.readFeature(msrstnKey.geom);
    pointFeature.setProperties(msrstnKey);
    /*
        let pointFeature = new ol.Feature({
            geometry:new ol.geom.Point([lon, lat]),
            properties: msrstnKey
        });
    */
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
    /*
    if (portGeomSource) { //항만 심볼 초기화
        portGeomSource.clear();
    }
    portGeomSource = new ol.source.Vector();
     */

    portGeomSource.clear();

    $.ajax({
        url : 'data/marine-dust/port-location-data',
        type: 'get',
        dataType:'json',
        contentType : 'application/json',
        success: function (resp){
            if (resp.data != null) {
                console.log("success getPortGeom");
                for (i=0; i<resp.data.length; i++){
                    // let geom = resp.data[i].geom;
                    setPortGeomLayer(resp.data[i]);
                }

                portGeomLayer.setVisible(true);

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
                        else if (key == 'dustTipoff') {
                            feature.setStyle(setAreaStyleText);
                        }
                    });
                    propHasDustData = true;
                }else{
                    console.log("data is null");
                }
            } else {
                alert(resp.message);
            }
        },
        error: function (e) {
            console.log('error in setFeatureFromRequest');
        }
    });
}

function setGalmaetgilFeature() {

    let info = BASE_URL['galmaetgilData'];

    let galmaetgilFeatures = [];
    let galmaetgilTourFeatures = [];
    $.ajax({
        url: info.url,
        type: info.type,
        dataType: 'json',
        success: function (resp) {
            if (resp.code == 0) {
                if (resp.data != null) {
                    galmaetSource.clear();
                    galmaetgilTourSource.clear();

                    resp.data.forEach((item) => {
                        let featureProperty = item.properties;
                        let feature = FORMAT_WKT.readFeature(item.geom);

                        if (featureProperty != null) {
                            feature.setProperties(featureProperty);
                            // feature.setStyle(setGalmaetgilStyle);

                            galmaetSource.addFeature(feature);
                            // galmaetgilFeatures.push(feature);

                            if (Object.keys(item.properties).includes('tourInfo')) {
                                item.properties.tourInfo.forEach((tourItem) => {
                                    if (Object.keys(tourItem).includes('geom')) {
                                        // GALMAETGIL_STYLE
                                        feature = FORMAT_WKT.readFeature(tourItem.geom);
                                        feature.setProperties(tourItem.properties);
                                        feature.setStyle(getGalmaetgilTourStyle(tourItem.properties));

                                        galmaetgilTourSource.addFeature(feature)
                                        // galmaetgilTourFeatures.push(feature);
                                    }
                                });
                            }
                        }
                    });

                    // galmaetSource.addFeatures(galmaetgilFeatures)
                    // galmaetLayer.setVisible(true);

                    // galmaetgilTourSource.addFeatures(galmaetgilTourFeatures);
                    // galmaetgilTourLayer.setVisible(true);


                } else {
                    console.log("data is null");
                }
            } else {
                alert(resp.message);
            }
        },
        error: function (e) {
            console.log('error in setFeatureFromRequest');
        }
    });
}

/* 갈맷길 style*/
function setGalmaetgilStyle(feature, resolution) {
    if (feature == null) {
        console.log("setGalmaetgilStyle feature null");
    } else {
        let properties = feature.getProperties();
        let style = GALMAET_PM_STYLE[properties.aodInfo.engAodIndex];
        let labelText = properties.courseInfo.guganNm;

        style.getText().setText(labelText);
        return style;
    }
}

function setGalmaetgilSelectStyle(feature) {
    if (feature == null) {
        console.log("setGalmaetgilSelectStyle feature null");
    } else {
        let style = [];
        let properties = feature.getProperties();
        let labelText = properties.courseInfo.guganNm;
        let innerStyle = GALMAET_PM_STYLE[properties.aodInfo.engAodIndex];
        let outerStyle = GALMAETGIL_SELECT_STYLE;

        innerStyle.getText().setText(labelText);
        style.push(outerStyle);
        style.push(innerStyle);
        return style;
    }
}


// 아이콘 src 동적 변경안되서 함수화함
function getGalmaetgilTourStyle(properties) {
    let iconFileName = properties.iconFileNm;
    return new ol.style.Style({
        image: new ol.style.Icon({
            src: ctxPath + '/images/target02/galmaetgil_tour/' + iconFileName,
        })
    });
}

/**
 * 미세먼지/초미세먼지 스타일 초기화
 * @param source 초기화할 소스
 * @param style 적용할 스타일
 */
function resetStyle(source, style) {
    /*
    //label layer
    if(!busanSggLableLayer.getVisible()){
        busanSggLableLayer.setVisible(true);
    }
    */

    source.forEachFeature(function (feature) {
        let property = feature.getProperties();
        feature.setStyle(style);
    });

    busanLayer.setVisible(true);
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

    $(".portrait .yesterday-date").html(formatDate(yesterday, 'portrait'));
    $(".portrait .today-date").html(formatDate(today, 'portrait'));
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
                    $('.side-section-' + themeType + " .yesterday-section").css('borderColor', LPI_LINE_COLOR[yesterdayPm25Index]);
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
            /*
            clickedFeature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {

                portSource.forEachFeature(function (feature) {
                    // let properties = feature.A.properties;
                    let properties = feature.getProperties();
                    feature.setStyle((PORT_PM_STYLE[properties[combineStrings(dustType, 'Index')]]));
                });

                return feature;
            });

             */

            clickedFeature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                    /*click 된 게 있으면 원래 사이즈로 / 로직 수정 필요함 */
                    portSource.forEachFeature(function (feature) {
                        let properties = feature.getProperties();
                        feature.setStyle((PORT_PM_STYLE[properties[combineStrings(dustType, 'Index')]]));
                    });

                    return feature;
                }, {
                    layerFilter: function (layer) {
                        return layer === portLayer;
                    },
                }
            );


            // 1page로 이동
            nowPage = 1;
            setListAddRemove(`.${nowOrientation} .side-section-${themeType} .side-section-page`, (nowPage - 1), 'show');
            setPageBtn();

            //클릭했을때 크기 커지게
            if (clickedFeature != null && clickedFeature.getProperties() != null) {
                setPortDetail(clickedFeature);
                let currentStyle = clickedFeature.getStyle()[1];
                if (currentStyle) {
                    let newStyle = new ol.style.Style({
                        image: new ol.style.Icon({
                            opacity: currentStyle.getImage().getOpacity(),
                            scale: PORT_IC_SCALE + 0.15,
                            src: currentStyle.getImage().getSrc()
                        })
                    });
                    clickedFeature.setStyle(newStyle);
                }


                //라이다 레이어 초기화
                refreshLidar();
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
            if(aodLayer.getVisible()){
                return;
            }

            let feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                if(layer == busanLayer){
                    return feature;
                }else {
                    return null;
                }
            });

            if (feature != null) {
                selectedSource.clear();
                selectedLayer.setVisible(true);
                setAreaDetail(feature);
                selectedSource.addFeature(feature.clone());

            } else {
                console.log('No feature clicked.');
            }
        }
    });
}

/* onclickmap 함수 하나로 처리 하기 */
function onClickGalmaet(evt) {

    clickedFeature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            return feature;
        }, {
            layerFilter: function (layer) {
                return layer === galmaetLayer;
            },
        }
    );


    if (clickedFeature != null) {
        setGalmaetDetail(clickedFeature);
    } else {
        console.log('No feature clicked galmaetgil.');
    }

}

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
        },
        complete: function (){
            isSubProcessing=false;
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
            // console.log("date: "+date[j]);
            // console.log("dustSliderValue: "+dustSliderValue);
            if (feature.getProperties().properties.portMsrstnId == portResp.data[date[dustSliderValue]][j].msrstnId) {

                if (Object.keys(portResp.data[date[dustSliderValue]][j]).includes(combineStrings(dustType, 'Index'))) {
                    if (portResp.data[date[dustSliderValue]][j][combineStrings(dustType, 'Index')] == undefined) {
                        feature.setStyle(PORT_PM_STYLE["PROOFREADING"]);
                    } else {
                        feature.setStyle(PORT_PM_STYLE[portResp.data[date[dustSliderValue]][j][combineStrings(dustType, 'Index')]]);
                    }
                } else {
                    feature.setStyle(PORT_PM_STYLE["PROOFREADING"]);
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
    if (feature.getProperties() != null) {
        // 대시보드 cover hide
        $(".side-section-cover").addClass('hide');
        // 차트 cover show
        $('.transport-section-cover').removeClass('hide');
        // 대시보드 열림
        showSideSection();

        let properties = feature.getProperties();
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
        if (dustType == 'pm10' && properties.pm10Index != undefined) {

            // 생활패턴 데이터 변경으로 패턴명과 이미지명 java에서 전달하는 방식으로 변경 필요
            $('.side-section-' + themeType + " .today-index").html(PM_INDEX[properties.pm10Index]);
            $('.side-section-' + themeType + " .today-index").css('color', LPI_LINE_COLOR[properties.pm10Index]);
            $('.side-section-' + themeType + " .today-img").attr("src", DUST_INDEX_IMG[properties.pm10Index].src);
            $('.side-section-' + themeType + " .today-section").css('backgroundColor', LPI_BACKGROUND_COLOR[properties.pm10Index]);
            $('.side-section-' + themeType + " .today-section").css('borderColor', LPI_LINE_COLOR[properties.pm10Index]);
        } else if (dustType == 'pm25' && properties.pm25Index != undefined) {

            // 생활패턴 데이터 변경으로 패턴명과 이미지명 java에서 전달하는 방식으로 변경 필요
            $('.side-section-' + themeType + " .today-index").html(PM_INDEX[properties.pm25Index]);
            $('.side-section-' + themeType + " .today-index").css('color', LPI_LINE_COLOR[properties.pm25Index]);
            $('.side-section-' + themeType + " .today-img").attr("src", DUST_INDEX_IMG[properties.pm25Index].src);
            $('.side-section-' + themeType + " .today-section").css('backgroundColor', LPI_BACKGROUND_COLOR[properties.pm25Index]);
            $('.side-section-' + themeType + " .today-section").css('borderColor', LPI_LINE_COLOR[properties.pm25Index]);
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
        },
        beforeSend: function (){ //로직 수정 필요
            //전송 3초 후에 로딩바 표시
            // loadingTimeout = setTimeout(showLoading, 5000);

            let left = 0;
            let top = 0;

            if($("#div_ajax_load_image").length != 0) {
                $("#div_ajax_load_image").css({
                    "top": top+"px",
                    "left": left+"px"
                });
                $("#div_ajax_load_image").show();
            } else {
                $('body').append('' +
                    '<div id="div_ajax_load_image" style="position:absolute; top:' + top + 'px; left:' + left + 'px; width: 100%' + '; height: 100%' + '; z-index:9999; background:#00000033; filter:alpha(opacity=50); opacity:alpha*0.5; margin:auto; padding:0; ">' +
                    '<img src="../../images/common/loader.webp" style="width: 150px; height: 150px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>');
            }

        },
        complete: function (){
            hideLoading();
            // $("#div_ajax_load_image").hide();
        }
    });
}

function setAreaDetail(feature){
    if(feature.getProperties().mapType == 'area'){

        // 생활지수 넘기기 이벤트 true
        setLpiTurn(`area-lpi-section-${nowOrientation}`, true);
        // 대시보드 cover hide
        $(".side-section-cover").addClass('hide');
        // 대시보드 열림
        showSideSection();

        let properties = feature.getProperties();
        getFormattedDates(properties.msrmtDt);

        /* header text 설정*/
        $('.side-section-'+themeType+' .header-date').html(setDateFormat(properties.msrmtDt, '')+ " 기준");
        $('.side-section-'+themeType+' .header-name').html(properties.admdstNm);

        if (dustType == 'pm10' && properties.pm10Index != undefined) {

            // 지역 미세먼지 부분 수정 필요.. 처음 모든 지역구 데이터 넘길때 level측정 필요
            $('.side-section-' + themeType + " .today-index").html(PM_INDEX[properties.pm10Index]);
            $('.side-section-' + themeType + " .today-index").css('color', LPI_LINE_COLOR[properties.pm10Index]);
            $('.side-section-' + themeType + " .today-img").attr("src", DUST_INDEX_IMG[properties.pm10Index].src);
            $('.side-section-' + themeType + " .today-section").css('backgroundColor', LPI_BACKGROUND_COLOR[properties.pm10Index]);
            $('.side-section-' + themeType + " .today-section").css('borderColor', LPI_LINE_COLOR[properties.pm10Index]);
        } else if (dustType == 'pm25' && properties.pm25Index != undefined) {

            $('.side-section-' + themeType + " .today-index").html(PM_INDEX[properties.pm25Index]);
            $('.side-section-' + themeType + " .today-index").css('color', LPI_LINE_COLOR[properties.pm25Index]);
            $('.side-section-' + themeType + " .today-img").attr("src", DUST_INDEX_IMG[properties.pm25Index].src);
            $('.side-section-' + themeType + " .today-section").css('backgroundColor', LPI_BACKGROUND_COLOR[properties.pm25Index]);
            $('.side-section-' + themeType + " .today-section").css('borderColor', LPI_LINE_COLOR[properties.pm25Index]);

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

    }
}

function setGalmaetDetail(feature) {

    // select=GALMAETGIL_TEXT_STYLE;
    if (galmaetgilSelectLayer.getSource().getFeatures().length > 0) {
        galmaetgilSelectLayer.getSource().clear();
    }
    galmaetgilSelectLayer.getSource().addFeature(feature);
    galmaetgilSelectLayer.setVisible(true);

    // 대시보드 cover hide
    $(".side-section-cover").addClass('hide');
    // 대시보드 열림
    showSideSection();

    // 1page로 이동
    //반응형 대시보드 셋팅
    totalPage = $(`.${nowOrientation} .side-section-${themeType} .side-section-page`).length;
    nowPage = 1;

    setListAddRemove(`.${nowOrientation} .side-section-${themeType} .side-section-page`, (nowPage - 1), 'show');
    setPageBtn();
    // 생활지수 넘기기 이벤트만 활성화
    setLpiTurn(`galmaet-lpi-section-${nowOrientation}`, true);
    /* 대시보드 셋팅 끝*/

    /* Data 바인딩 */
    let properties = feature.getProperties();
    // let courseId = properties.courseId;
    // let guganId = properties.guganId;
    let tourInfo = properties.tourInfo;
    let courseInfo = properties.courseInfo;
    let dustInfo = properties.dustInfo;
    let aodInfo = properties.aodInfo;

    /* 기준일 header text 설정*/
    $('.side-section-' + themeType + ' .header-date').html(dustInfo.msrstdt + " 기준");
    $('.side-section-' + themeType + ' .header-name').html(courseInfo.guganNm);

    /* 생활 패턴 */
    getGalmaetLifePattern(properties, "dustGalmaet");

    $('.galmaet-info-section .carousel-inner').empty();
    /* 생활 패턴 */
    //pm10
    $('.side-section-' + themeType + ' .pm10-img').attr("src", ctxPath + '/images/target02/' + dustInfo.pm10['미세먼지'].lpiImgFileNm);
    $('.side-section-' + themeType + ' .pm10-index').html(dustInfo.pm10['미세먼지'].lifePatternNm);
    $('.side-section-' + themeType + ' .pm10-section').css('color', LPI_LINE_COLOR[dustInfo.pm10['미세먼지'].engLifePatternNm]);
    $('.side-section-' + themeType + ' .pm10-section').css('backgroundColor', LPI_BACKGROUND_COLOR[dustInfo.pm10['미세먼지'].engLifePatternNm]);
    $('.side-section-' + themeType + ' .pm10-section').css('borderColor', LPI_LINE_COLOR[dustInfo.pm10['미세먼지'].engLifePatternNm]);

    //pm25
    $('.side-section-' + themeType + ' .pm25-img').attr("src", ctxPath + '/images/target02/' + dustInfo.pm25['초미세먼지'].lpiImgFileNm);
    $('.side-section-' + themeType + ' .pm25-index').html(dustInfo.pm25['초미세먼지'].lifePatternNm);
    $('.side-section-' + themeType + ' .pm25-section').css('color', LPI_LINE_COLOR[dustInfo.pm25['초미세먼지'].engLifePatternNm]);
    $('.side-section-' + themeType + ' .pm25-section').css('backgroundColor', LPI_BACKGROUND_COLOR[dustInfo.pm25['초미세먼지'].engLifePatternNm]);
    $('.side-section-' + themeType + ' .pm25-section').css('borderColor', LPI_LINE_COLOR[dustInfo.pm25['초미세먼지'].engLifePatternNm]);

    //aod
    $('.side-section-' + themeType + ' .aod-img').attr("src", ctxPath + '/images/target02/' + aodInfo.aodImgFileNm);
    $('.side-section-' + themeType + ' .aod-index').html(aodInfo.aodIndex);
    $('.side-section-' + themeType + ' .aod-section').css('color', LPI_LINE_COLOR[dustInfo.pm25['초미세먼지'].engLifePatternNm]);
    $('.side-section-' + themeType + ' .aod-section').css('backgroundColor', LPI_BACKGROUND_COLOR[dustInfo.pm25['초미세먼지'].engLifePatternNm]);
    $('.side-section-' + themeType + ' .aod-section').css('borderColor', LPI_LINE_COLOR[dustInfo.pm25['초미세먼지'].engLifePatternNm]);

    $('.aod-img').attr("src", ctxPath + '/images/target02/' + aodInfo.aodImgFileNm);
    $('.aod-index').text(aodInfo.aodIndex);

    // getGalmaetLifePattern( properties, "dustGalmaet"); //추후 변경
    /* 갈맷길 정보  */
    /*
    $('.galmaet-range').html();
    $('.galmaet-').html();
    $('.galmaet-degree').html();
*/

    for (let i = 0; i < tourInfo.length; i++) {
        let activeClass = i === 0 ? ' active' : '';
        let tourItem = '<div class="carousel-item'
            +activeClass
            +'" style="background-color: white; height: 100%">'
            +'<div style="display: flex; height: 60%">'
            +'<div class="galmaet-content-section" style="flex: 1.5;">'
            +'<div class="galmaet-info-content">'
            +'<span>총길이 : <span class="galmaet-range">'
            +courseInfo.gmRange
            +'</span></span>'
            +'</div>'
            +'<div class="galmaet-info-content">'
            + '<span>소요시간 : <span class="galmaet-req-hr">'
            + courseInfo.reqHr
            + '</span></span>'
            + '</div>'
            + '<div class="galmaet-info-content">'
            + '<span>난이도 : <span class="galmaet-degree">'
            + courseInfo.gmDegree
            + '</span></span>'
            + '</div>'
            + '<div class="galmaet-info-content">'
            + '<span style="margin-right: 10px">인증대 및 스탬프</span>'
            + '<a href="http://www.galmaetgil.org/bbs/certify.php?co_id=certify&type=2" target="_blank">[안내사이트]</a>'
            + '</div>'
            + '</div>'
            + '<div style="flex: 2;">'
            + '<img class="galmaet-lk-img" src="'
            + tourInfo[i].properties.imgFileNm
            + '" alt="">'
            +'</div>'
            +'</div>'
            +'<div class="galmaet-lk-section">'
            +'<h5 class="galmaet-lk-name">'
            +tourInfo[i].properties.place
            +'</h5>'
            +'<span class="galmaet-lk-content">'
            +tourInfo[i].properties.itemCntnts
            +'</span>'
            +'</div>'
            +'</div>';

        $('.galmaet-info-section  .carousel-inner').append(tourItem);
    }

    //     /* 갈맷길 정보  */
    //     $('.galmaet-range').html();
    //     $('.galmaet-req-hr').html();
    //     $('.galmaet-degree').html();
    //
    // /* 볼거리 정보  */
    // $('.galmaet-lk-img').html();
    // $('.galmaet-lk-name').html();
    // $('.galmaet-lk-content').html();
}

/**
 * Theme 버튼 클릭 시 호출 되는 메서드
 * 테마별로 지도 관련된 기능
 * @param themeType
 */
function setThemeMap(themeType) {

    //지도 효과 초기화
    busanLayerRenderExtent = 0;
    showEffect = true;
    cntAnimationExecuted = 0;

    clickedFeature = null;

    // 미세먼지 변화 슬라이더 메뉴 on/off
    $(".monit-item").removeClass("on");

    refreshLayer();
    resetStyle(busanSource, BASIC_STYLE['busan']);

    //경보 데이터 호출
    if (issuePM10List == undefined || issuePM25List == undefined) {
        getIssueData();
    }

    switch (themeType) {
        case 'port':
            setPortLocation();
            break;
        case 'area':
            map.getView().setCenter(BUSAN_CENTER);
            map.getView().setZoom(DEFAULT_ZOOM);
            break;
        case 'galmaet':
            map.getView().setCenter(BUSAN_CENTER);
            map.getView().setZoom(DEFAULT_ZOOM);
            $('.side-section-' + themeType).addClass('show'); //대시보드
            indexOnOff(2); //aod 범례

            setGalmaetgilFeature();
            if (showEffect) {

                cloudOverlay.setVisible(true);
                //1초 후 지역 on
                setTimeout(function () {
                    resetStyle(busanSource, BACKGROUND_STYLE);
                    galmaetLayer.setVisible(true);
                    galmaetgilTourLayer.setVisible(true);
                }, 1000);

                //2.5초 후 cloud off
                setTimeout(function () {
                    cloudOverlay.setVisible(false);
                }, 2500);

            } else {
                resetStyle(busanSource, BACKGROUND_STYLE);
                galmaetLayer.setVisible(true);
                galmaetgilTourLayer.setVisible(true);
                // busanLayer.setVisible(true);
            }

            showSideSection();
            galmaetLayer.set('selectable', true);
            // setClickStyle();

            // 미세먼지 주의보 - 솔대리님이 안 넣는대
            //setIssueData(idx);//얘 왜 매번 호출하는지???
            // AOD 범례로 변경 예정 현재 이미지 없음
            // indexOnOff(idx);

            /*
            map.getView().setCenter(BUSAN_CENTER);  //O

            $('.side-section-'+themeType).addClass('show'); //O

            galmaetSource = setSourceFromRequest('galmaetWkt'); //O
            galmaetLayer.setSource(galmaetSource); //O

            resetStyle(busanSource, BACKGROUND_STYLE); //O
            showSideSection(); //O
            setClickStyle(); //O

            onHoverGalmaet();
            galmaetLayer.set('selectable', true); //O
            // 미세먼지 변화 슬라이더 메뉴 on/off
            $(".monit-item").removeClass("on"); //O
            galmaetLayer.setVisible(true); //O
            // 미세먼지 주의보
            //setIssueData(idx); //O
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
            */
            break;
        case 'tipoff': //박준태가 데이터 한번에 부른다고 했음
            map.getView().setCenter(BUSAN_CENTER);

            busanLayer.setVisible(false);
            onClickTipOff();
            dustType = 'pm10';
            setFeatureFromRequest(tipoffSource, 'dustTipoff');
            // tipoffLayer.setVisible(true);
            $(".monit-item").removeClass("on");
            $(".tipoff-dust-index-img").addClass("on");

            if (showEffect) {
                cloudOverlay.setVisible(true);
                //1.5초 후 지역 on
                setTimeout(function () {
                    tipoffLayer.setVisible(true);
                }, 1000);

                //2.5초 후 cloud off
                setTimeout(function () {
                    cloudOverlay.setVisible(false);
                    // showEffect=false;
                }, 2500);

            } else {
                tipoffLayer.setVisible(true);
            }

            break;
    }
}

function refreshLayer() {

    //선택 레이어 초기화
    selectedSource.clear();
    selectedLayer.setVisible(false);

    galmaetgilSelectLayer.getSource().clear();
    galmaetgilSelectLayer.setVisible(false);

    //항만 레이어 초기화
    portLayer.setVisible(false);
    initPortLayer();
    if (portGeomLayer != undefined) {
        portGeomLayer.setVisible(false);
    }

    //라이다 초기화
    LidarLayer.setVisible(false);
    if(LidarDataLayer != undefined){
        LidarDataLayer.setVisible(false);
    }

    //시민 제보 레이어 초기화
    tipoffLayer.setVisible(false);

    //갈맷길 레이어 초기화
    galmaetLayer.setVisible(false);
    galmaetgilTourLayer.setVisible(false);

    //탄소 레이어 초기화
    shipLayer.setVisible(false);

    //시민제보 오버레이 초기화
    tipoffOverlay.setVisible(false);
    $('#tipoff-popup').hide();

    //aod 레이어 초기화
    aodLayer.setVisible(false);

    //click 해제
    portLayer.set('selectable', false);
    busanLayer.set('selectable', false);
    galmaetLayer.set('selectable', false);
    tipoffLayer.set('selectable', false);

    //temp
    tempRemoveLidarImageOverlay();

    // feature click 스타일 해제
    /*
    if (select !== null) {
        map.removeInteraction(select);
    }
    */
}

/*
function setClickStyle() {
    if (select !== null) {
        map.removeInteraction(select);
    }
    if (themeType == 'galmaet') {
        select = SELECT_GALMAET;
    }

    if (select !== null) {
        map.addInteraction(select);
    }
}
*/

function setAodLayer() {
    if (aodLayer.getSource().getFeatures().length > 0) {
        aodLayer.getSource().clear();
    }

    let info = BASE_URL.aodData;

    $.ajax({
        url: info.url,
        type: info.type,
        async: false,
        dataType: 'json',
        contentType: 'application/json',
        success: function (resp) {
            if (resp.data != null) { //여기결과 코드 값으로 변경해야 함

                resp.data.forEach((item) => {
                    let feature = FORMAT_WKT.readFeature(item.geom);
                    if (item.properties != null) {
                        feature.setProperties(item.properties);
                        //select 스타일이 먹어서 강제로 basic으로 변경
                        let style = PM_STYLE[item.properties.engAodIndex];
                        style.setStroke(STROKE_STYLE["basic"]);
                        feature.setStyle(style);
                    }
                    // features.push(feature);
                    aodLayer.getSource().addFeature(feature);

                });

                aodLayer.setVisible(true);

            }
        },
        error: function (e) {
            console.log('error in setPortDust');
        }

    });
}

function addLidarDataLayer(){
    if(LidarDataLayer==undefined){
        let width = window.innerWidth;
        if(width<1920){//pc 외는 image 한판으로
            LidarDataLayer = new ol.layer.Image({
                extent : [14368260.70776581, 4172657.782908702, 14375443.041311791, 4179254.1394502777],
                source: new ol.source.ImageWMS({
                    url: geoserverUrl,
                    params: {
                        'LAYERS': 'smartvillage:view_lidar',
                        'Tiled': true,
                        'VERSION': '1.1.0'
                    },
                    serverType: 'geoserver',
                    transition: 0
                })
            })
        }else{ //pc일때는 캐시 사용
            LidarDataLayer = new ol.layer.Tile({
                extent : [14368260.70776581, 4172657.782908702, 14375443.041311791, 4179254.1394502777],
                source: new ol.source.TileWMS({
                    url : geoserverGwcUrl,
                    params: {
                        'LAYERS': 'smartvillage:view_lidar',
                        'Tiled': true,
                        'VERSION': '1.1.0'
                    },
                    serverType: 'geoserver',
                    transition: 0
                })
            })
        }
        LidarDataLayer.setVisible(true);
        map.addLayer(LidarDataLayer);

        map.getView().setZoom(12.66);
        map.getView().setCenter([14368851.263429802, 4176243.352488824]);
    }else{
        LidarDataLayer.setVisible(true);
        map.getView().setZoom(12.66);
        map.getView().setCenter([14368851.263429802, 4176243.352488824]);
    }

    //port 크기 조정
    portSource.forEachFeature(function (feature) {
        let properties = feature.getProperties();
        feature.setStyle((PORT_PM_STYLE[properties[combineStrings(dustType, 'Index')]]));
    });

    //대시보드
    // refreshDashBoard();
    hiddenSideSection();



}

function refreshLidar(){
    if(LidarDataLayer != undefined && LidarDataLayer.getVisible()){
        LidarLayer.getSource().getFeatures()[0].setStyle(LIDAR_STYLE.getImage().setScale(0.1));
        LidarDataLayer.setVisible(false);
    }
}


function animateLidar() {
    const radarLayer = LidarDataLayer; // WMS 레이어

    // LidarTileLayer가 제대로 정의되었는지 확인
    if (!radarLayer) {
        console.error('LidarTileLayer is not defined or not properly initialized.');
        return;
    }

    let opacity = 0.1;
    let increasing = true;
    const blinkCount = 5; // 깜박임 횟수
    const blinkSpeed = 0.02; // 깜박임 속도
    let currentBlink = 0; // 현재 깜박임 횟수

    function updateOpacity() {
        if (increasing) {
            opacity += blinkSpeed;
            if (opacity >= 1) {
                opacity = 1;
                increasing = false;
                currentBlink++;
                console.log('Current Blink (Increasing -> Decreasing):', currentBlink);
            }
        } else {
            opacity -= blinkSpeed;
            if (opacity <= 0.1) {
                opacity = 0.1;
                increasing = true;
                currentBlink++;
                console.log('Current Blink (Decreasing -> Increasing):', currentBlink);
            }
        }

        // radarLayer가 setOpacity 메서드를 가지고 있는지 확인
        if (radarLayer.setOpacity) {
            radarLayer.setOpacity(opacity);
        } else {
            console.error('radarLayer does not have setOpacity method.');
            return;
        }

        // 증가와 감소가 한 번의 깜박임을 나타내므로 * 2
        if (currentBlink < blinkCount * 1) {
            requestAnimationFrame(updateOpacity);
        } else {
            lidarAnimateCnt = 1;
            console.log('Animation complete.');
        }
    }

    updateOpacity();
}

function setPortLocation(){
    map.getView().setCenter(PORT_CENTER);
    map.getView().setZoom(DEFAULT_ZOOM);
}

function tempAddLidarImageOverlay(){

    if(lidarTempOverlay == undefined){
        lidarTempOverlay = new ol.Overlay({
            visible: true,
            element: document.getElementById('temp-lidar-img'),
            position : ol.proj.transform([129.0811, 35.0698], "EPSG:4326", "EPSG:3857"),
            positioning : 'bottom-right',
            offset:[-50,0]
        })

        map.addOverlay(lidarTempOverlay);
    }else{
        lidarTempOverlay.setVisible(true);
    }

    $("#temp-lidar-img").show();
}

function tempRemoveLidarImageOverlay(){
    // map.removeOverlay(lidarTempOverlay);
    if(lidarTempOverlay != undefined){
        lidarTempOverlay.setVisible(false);
        $("#temp-lidar-img").hide();
    }
}
