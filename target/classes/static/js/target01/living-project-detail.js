$(document).ready(function () {

    setActivitySlide(); //프로젝트 갤러리-정화활동 슬라이드
    setActivitySumGraph(); //프로젝트 활동(수거량) 통계 그래프
    setActivityMap();

    /* 이벤트 */
    openJoinLPPopUp();
    onClickContentMoreBtn();

});


/*이벤트*/
function openJoinLPPopUp(){
    $(".lp-join-btn").click(function () {
        if($(".lp-open-yn").text() == '공개'){
                $(".lp-join-success-pop-wrap").addClass("show");
        }else if($(".lp-open-yn").text() == '비공개'){
            $(".lp-join-wait-pop-wrap").addClass("show");
        }
    });


    $(document).on('click','.lp-join-success-close-btn', function (){
        $(".lp-join-success-pop-wrap").removeClass("show");
        $(".lp-join-wait-pop-wrap").removeClass("show");
    });


}

function  onClickContentMoreBtn(){
    $(".lp-contents-more-btn").click(function (){
        
        if($(".lp-contents-more-btn").hasClass("on")){
            $(".lp-contents").removeClass("show");
            $(".lp-detail-left-wrap").removeClass("on");
            $(".lp-contents-more-btn").removeClass("on");
            $(".lp-contents-more-btn").html("더보기");
        }else{
            $(".lp-contents").addClass("show");
            $(".lp-detail-left-wrap").addClass("on");
            $(".lp-contents-more-btn").addClass("on");
            $(".lp-contents-more-btn").html("접기");
        }
    })
    
}





/*지도*/

function setActivityMap(){
    let maxExtent = [14274691.443737995, 4134937.460061596, 14453668.805965098, 4240726.322252416];

    let activityMap = new ol.Map({
        target: 'map',
        controls: ol.control.defaults({zoom: false}).extend([]),
        view: new ol.View({
            projection: "EPSG:3857",
            center: activityCenter,
            zoom: 12,
            extent : maxExtent,
            minZoom: 11,
        })
    });

    let activityStyle = new ol.style.Style({
        image: new ol.style.Icon({
            opacity: 1.0,
            scale: 0.1,
            src: ctxPath + '/images/target01/ic_activity_off.webp'
        })
    });


    let activityFeatures = activityGeomList.map(geometry => {
        let feature = new ol.Feature({
            geometry: geometry
        });
        feature.setStyle(activityStyle);
        return feature;
    });


    let activitySource = new ol.source.Vector({
        features: activityFeatures
    });
    let activityLayer = new ol.layer.Vector({
        source: activitySource
    });

    let baseLayer = getBaseLayer();
    let backgroundLayer = getLayerByWidth('smartvillage:map_background');
    let BusanSource = setSourceFromRequest('busanWkt');
    let BusanLayer = new ol.layer.Vector({
        source : BusanSource,
        style : BASIC_STYLE['busan'],
        zIndex : 0
    });
    let busanSggLableLayer =  getLayerByWidth('smartvillage:tsgg');

    activityMap.addLayer(baseLayer);
    activityMap.addLayer(backgroundLayer);
    activityMap.addLayer(BusanLayer);
    activityMap.addLayer(busanSggLableLayer);
    activityMap.addLayer(activityLayer);

}


/*정화활동-프로젝트 활동(수거량) 통계*/
function setActivitySumGraph() {
    let activitySumGraph = echarts.init(document.getElementById('activity-sum-graph'));
    let option = {
        // x축 라벨
        xAxis: {
            data: monthList,
            axisLabel : {
                interval: 0,
                fontFamily: 'Gong_Gothic_Medium'
            }
        },
        yAxis: {
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: '프로젝트 활동(수거량) 통계',
                type: 'bar',
                data: activitySumData,
                color: 'rgb(0,32,96)',
                label: {
                    show: true,
                    position: 'top',
                    fontFamily: 'Gong_Gothic_Medium',
                    formatter: function(params) { //0일때 라벨 숫자 안뜨게
                        return params.value !== 0 ? params.value : '';
                    }
                }
            }
        ],
    }

    $( window ).resize( function() {
        activitySumGraph.resize();
    });

    activitySumGraph.setOption(option);
}


function setActivitySlide(){
    if(!$(".activity-slide-list").hasClass("on")){
        $(".activity-slide-wrap").addClass("hide");
    }

    $('.activity-slide-container').slick({
        infinite: true,         //무한반복
        autoplay: false,          // 자동 슬라이딩 활성화
        autoplaySpeed: 1000,     // 슬라이딩 간격 (밀리초)
        slidesToShow: 6,         // 보여지는 이미지 수
        slidesToScroll: 1,       // 한 번에 스크롤되는 이미지 수
        speed: 1000,
        centerMode: false,
        prevArrow: $('#activity-prev'),
        nextArrow: $('#activity-next') ,
        variableWidth: true,
        row: 1,
        responsive: [//반응형
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                  /*  rows: 2, // 2줄로 설정
                    variableWidth: false,*/
                }
            }
        ]
    });
}

