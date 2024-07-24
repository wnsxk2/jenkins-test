/* 전역 상수 */
//['88.98513888888889', '161.3685277777778']
const CCTV_CENTER = [14355400.62338994, 4178446.959954389];
const CCTV_ICON_SCALE = 0.45;
const CCTV_ICON_STYLE = {
    normal: new ol.style.Style({
        image: new ol.style.Icon({
            opacity: 1.0, // 투명도 1=100%
            scale: CCTV_ICON_SCALE,
            anchor: [0.5, 1],
            src: ctxPath + '/images/target01/ic_cctv_enable.svg'
        })

    }),
    select: new ol.style.Style({
        image: new ol.style.Icon({
            opacity: 1.0, // 투명도 1=100%
            scale: CCTV_ICON_SCALE,
            anchor: [0.5, 1],
            src: ctxPath + '/images/target01/ic_cctv_disable.svg'
        })

    })
}
const OVERVIEWMAP_CENTER = [14365780.921469564, 4192070.2788602207];
const OVERVIEWMAP_MAX_EXTENT = [14352608.090815373, 4177553.7778251553, 14375233.451187786, 4199414.767914716];

//const SATEL_CENTER = [35.06856061904335, 128.8902323980273];
/* 전역 변수 */
/* 지도 관련 */
let Target1Map;
let BusanLayer, BusanSource;
let CCTVLayer, CCTVSource;
let CCTVOverlay;
/* 전역 변수 끝*/


/* Map 함수 */
function setInteraction() {
    // 드래그와 스크롤 비활성화
    let interactions = ol.interaction.defaults();
    interactions.forEach((interaction) => {
        if (interaction instanceof ol.interaction.DragPan) {
            interaction.setActive(false);
        } else if (interaction instanceof ol.interaction.MouseWheelZoom) {
            interaction.setActive(false);
        }
    });
}

function initMap() {
    /*--------Map----------*/
    Target1Map = new ol.Map({
        target: 'map',
        controls: ol.control.defaults({zoom: false}).extend([]),
        // interactions: setInteraction(), //setinteraction 밑에 선언되어 있는데 왜 또 넣었니?
        view: new ol.View({
            projection: SRID,
            center: BUSAN_CENTER,
            zoom: DEFAULT_ZOOM,
            extent: MAX_EXTENT,
            minZoom: 11,
        })
    });

    /*--------Layer----------*/

    let baseLayer = getBaseLayer();
    let backgroundLayer = getLayerByWidth('smartvillage:map_background');
    let busanSggLableLayer = getLayerByWidth('smartvillage:tsgg');

    BusanSource = setSourceFromRequest('busanWkt');
    BusanLayer = new ol.layer.Vector({
        source: BusanSource,
        style: BASIC_STYLE['busan'],
        zIndex: 0
    });

    CCTVSource = new ol.source.Vector();
    CCTVLayer = new ol.layer.Vector({
        visible: false,
        source: CCTVSource,
        selectable: true,
    });

    /*
    * addlayer 순서 중요함!
    * osmlayer -> background -> 나머지 올려야함
    * busanSggLableLayer는 마지막에 위치해야 함
    */
    Target1Map.addLayer(baseLayer);
    Target1Map.addLayer(backgroundLayer);
    Target1Map.addLayer(BusanLayer);
    Target1Map.addLayer(CCTVLayer);

    Target1Map.addLayer(busanSggLableLayer);
    /*--------Interaction----------*/
    // setInteraction();
    /*--------Control----------*/
    setZoomEvent();

    let overviewMapLayer = getLayerByWidth('smartvillage:overviewmap_busan');
    let overviewMapControl = new ol.control.OverviewMap({
        className: 'overviewmap-control ol-overviewmap',
        layers: [
            overviewMapLayer
        ],
        view: new ol.View({
            minZoom: 8,
            maxZoom: 10,
            center: OVERVIEWMAP_CENTER,
            extent: OVERVIEWMAP_MAX_EXTENT,
            constrainOnlyCenter: true,
        }),
    });

    // let mousePosition = new ol.control.MousePosition({
    //     coordinateFormat: (coord) => ol.coordinate.toStringHDMS(coord, 1)
    // })
    // Target1Map.addControl(mousePosition);
    Target1Map.addControl(OverviewMapControl);

    /*--------Overlay----------*/
    CCTVOverlay = new ol.Overlay({
        positioning: 'top-center',
        offset: [0, -80]
    });
    Target1Map.addOverlay(CCTVOverlay);

    /*--------map function----------*/
    //map.onclick...등등
    //map click 이벤트들 위치 여기로 전부 옮겨야 함
    Target1Map.on('click', (e) => {
        //CCTV 아이콘 클릭 이벤트
        onClickCCTV(e);
    });
    Target1Map.on('pointermove', (e)=>{
        //CCTV 아이콘 hover 시 커서 스타일 변경 이벤트
        hoverFeature(e);
    });
}

function setZoomEvent() {
    $('.zoom-control-btn').on('click', (e) => {
        const view = Target1Map.getView();
        const zoom = view.getZoom();
        let amount = $(e.currentTarget).data("amount");
        view.animate({zoom: zoom + amount})
    });
}

function setCCTVFeature(cctvId, startDate, endDate) {

    let info = BASE_URL['cctvData'];

    $.ajax({
        url: info.url,
        type: info.type,
        data: {
            "cctvId": cctvId,
            "startDate": startDate,
            "endDate": endDate
        },
        dataType: 'json',
        success: function (resp) {
            if (resp.code == 0) {
                if (resp.data != null) {
                    if (cctvId == "all") {
                        CCTVSource.clear();
                        resp.data.forEach((item) => {
                            let featureProperty = item.properties;
                            let feature = FORMAT_WKT.readFeature(item.geom);

                            if (featureProperty != null) {
                                feature.setProperties(featureProperty);
                                feature.setStyle(CCTV_ICON_STYLE["normal"]);
                                CCTVSource.addFeature(feature);
                            }
                        });
                    } else {
                        // 조회 했을 경우
                        resp.data.forEach((item) => {
                            let featureProperty = item.properties;
                            CCTVSource.forEachFeature(function (feature) {
                                feature.setProperties(featureProperty);
                            });
                            setCCTVDetail(featureProperty);
                        });
                    }

                } else {
                    console.log("data is null");
                }
            } else {
                alert(resp.message);
            }
        },
        error: function (e) {
            console.log('error in setCCTVFeature');
        },
        beforeSend: function () {
            showLoading();
        },
        complete: function () {
            hideLoading();
        }
    });
}

/* map event 함수 */
function onClickCCTV(e) {
    if (Theme == 'cctv') {
        // feature 설정
        let feature = Target1Map.forEachFeatureAtPixel(e.pixel, function (selectFeature) {
                CCTVSource.forEachFeature(function (feature) {
                    feature.setStyle(CCTV_ICON_STYLE['normal']);
                });
                selectFeature.setStyle(CCTV_ICON_STYLE['select']);
                // tooltip 설정
                let cctvTooltip = document.getElementById('cctv-tooltip');
                let coordinate = selectFeature.getGeometry().getCoordinates();
                CCTVOverlay.setPosition(coordinate);
                CCTVOverlay.setElement(cctvTooltip);
                setShowHide('#cctv-tooltip', 'show');

                return selectFeature;
            }, {
                layerFilter: function (layer) {
                    return layer === CCTVLayer;
                },
            }
        );

        // dashboard 설정
        if (feature) {
            setShowHide(`#cctv-dash-cover-${Orientation}`, 'hide');
            let properties = feature.getProperties();
            CCTVId = properties.cctvId;
            setCCTVDetail(properties);
        } else {
            console.log('Feature not clicked');
        }
    }
}

function hoverFeature(e) {
    Target1Map.getViewport().style.cursor = '';
    Target1Map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        if (layer.get('selectable') == true) {
            Target1Map.getViewport().style.cursor = 'pointer';
        }
        return;
    });
}

/* map event 함수 끝 */
function setCCTVLocation() {
    Target1Map.getView().setCenter(CCTV_CENTER);
    Target1Map.getView().setZoom(16);
}

/*Map 함수 끝*/

function setMapByTheme() {
    refreshLayer();
    switch (Theme) {
        case 'cctv':
            let startDate = $(`#datepicker-start-cctv-${Orientation}`).val();
            let endDate = $(`#datepicker-end-cctv-${Orientation}`).val();
            setCCTVLocation();
            setCCTVFeature('all', startDate, endDate);
            CCTVLayer.setVisible(true);
            break;
        case 'satel':
            setSatelLocation();
            break;
        default:
            break;
    }
}

function refreshLayer() {
    //cctv 레이어 초기화
    CCTVLayer.setVisible(false);

    CCTVOverlay.setVisible(false);
    setShowHide('#cctv-tooltip', 'hide');
}

function setSatelLocation(){
    Target1Map.getView().setCenter(SATEL_CENTER);
    Target1Map.getView().setZoom(16);
}