
const BACKGROUND_COLOR = {
    PM10 : [
        [
            {
                yAxis: 150,
                itemStyle: {
                    color: 'rgb(255,180,128)',
                    opacity: 0.7,
                },
            },
            { yAxis: 9999 },
        ],
        [
            {
                yAxis: 80,
                itemStyle: {
                    color: 'rgb(255,234,128)',
                    opacity: 0.7,
                },
            },
            { yAxis: 150 },
        ],
        [
            {
                yAxis: 30,
                itemStyle: {
                    color: 'rgb(198,234,156)',
                    opacity: 0.7,
                },
            },
            { yAxis: 80 },
        ],
        [
            {
                yAxis: 0,
                itemStyle: {
                    color: 'rgb(162,227,249)',
                    opacity: 0.7,
                },
            },
            { yAxis: 30 },
        ],
    ],
    PM25 : [
        [
            {
                yAxis: 75,
                itemStyle: {
                    color: 'rgb(255,180,128)',
                    opacity: 0.7,
                },
            },
            { yAxis: 9999 },
        ],
        [
            {
                yAxis: 35,
                itemStyle: {
                    color: 'rgb(255,234,128)',
                    opacity: 0.7,
                },
            },
            { yAxis: 75 },
        ],
        [
            {
                yAxis: 15,
                itemStyle: {
                    color: 'rgb(198,234,156)',
                    opacity: 0.7,
                },
            },
            { yAxis: 35 },
        ],
        [
            {
                yAxis: 0,
                itemStyle: {
                    color: 'rgb(162,227,249)',
                    opacity: 0.7,
                },
            },
            { yAxis: 15 },
        ],
    ]
};

const DELAY = 500;

let timer = null;

/*24시간 미세먼지 데이터 -그래프*/
function getDust24GraphData(realTimeData, key, id){
    let info = BASE_URL[key];
    let msrmtDt = realTimeData.msrmtDt;
    let mapType = realTimeData.mapType;
    let code = function (mapType){
        if(mapType == 'port'){
            return realTimeData.msrstnId;
        } else if (mapType =='area'){
            return realTimeData.admdstCd;
        }
    };
    let graphUrl =  `/${dustType}/${code(mapType)}/${mapType}/${msrmtDt}`;

    $.ajax({
        url: info.url + graphUrl,
        type: info.type,
        dataType: 'json',
        success: function (resp){
            if (resp.data != null) {
                dust24GraphData = resp.data;
                let array = dust24GraphData.dataList;
                dust24GraphData.midnight = array.find(value => value.includes(' 00:00:00'));
                if(mapType =='area'){
                    setDustC(id);
                    setDustTable();
                    let lifePatterns = resp.data.lifePattern;
                    // 생활지수 부분 이미지 변경 부분
                    // $.each(lifePatterns, (key, value)=>{
                    //     switch (key){
                    //         case '산책미세먼지':
                    //             $(`.area-lpi-img1`).attr('src', `${ctxPath}/images/target02/${value.lpiImgFileNm}`);
                    //             break;
                    //         case '세탁미세먼지':
                    //             $(`.area-lpi-img2`).attr('src', `${ctxPath}/images/target02/${value.lpiImgFileNm}`);
                    //             break;
                    //         case '환기미세먼지':
                    //             $(`.area-lpi-img3`).attr('src', `${ctxPath}/images/target02/${value.lpiImgFileNm}`);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    // });
                }
            }
        },
        error: function (e) {
            console.log('error in getDustC');
        }

    });

}

/*항만 선박 입출항정보 */
function getPortShipData(realTimeData, key, id) {
    let info = BASE_URL[key];
    let msrstnId = realTimeData.msrstnId;
    let graphUrl =  `${msrstnId}/${realTimeData.msrmtDt}`;

    $.ajax({
        url: info.url + graphUrl,
        type: info.type,
        dataType: 'json',
        success: function (resp){
            if (resp.data != null) {
                portShipData = resp.data;


             //   setTotalC(id);


            }
        },
        error: function (e) {
            console.log('error in getDustC');
        }

    });
}

function getPortShipGroup(realTimeData, key) {
    let info = BASE_URL[key];
    let msrstnId = realTimeData.msrstnId;
    let graphUrl =  `${msrstnId}/${realTimeData.msrmtDt}`;

    $.ajax({
        url: info.url + graphUrl,
        type: info.type,
        dataType: 'json',
        success: function (resp){
            if (resp.data != null) {
                portShipGroup = resp.data;


            //    setTotalC(id);


            }
        },
        error: function (e) {
            console.log('error in getDustC');
        }

    });
}

function getPortShipRatio(realTimeData, key) {
    let info = BASE_URL[key];
    let msrstnId = realTimeData.msrstnId;
    let graphUrl =  `${msrstnId}/${realTimeData.msrmtDt}`;

    $.ajax({
        url: info.url + graphUrl,
        type: info.type,
        dataType: 'json',
        success: function (resp){
            if (resp.data != null) {
                portShipRatio = resp.data;




            }
        },
        error: function (e) {
            console.log('error in getDustC');
        }

    });
}
/**
 * 미세먼지 변화 그래프를 표출하는 함수
 */
function setDustC(id){
    let tag = document.getElementById(id)
    let modalChart = echarts.init(tag);
    let fontSize = nowOrientation == 'portrait' ? 8: 12;

    option = {
        grid: {
            top: 20,
            right: 25,
            bottom: 20,
            left: 40
        },
        xAxis: {
            type: "category",
            data: dust24GraphData.dataList,  // 날짜
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                formatter: function (value){
                   return value.substring(11, 13) + '시';
                },
                interval: 1,
                fontFamily: 'Gong_Gothic_Medium',
                fontSize: fontSize
            },
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: function (value) {
                return Math.ceil((value.max + 10) / 10) * 10;
            },
            axisLabel : {
                fontFamily: 'Gong_Gothic_Medium'
            }
        },
        series: [
            {
                data: dust24GraphData.pmValues,
                type: 'line',
                symbol: 'circle',
                symbolSize: 6,
                color: 'rgb(255,96,2)',
                markArea: {
                    // 속성부분에 object랑 array도 들어감
                    data: BACKGROUND_COLOR["PM10"]
                },
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            }
        ],
        tooltip: {
            trigger: 'axis',
        }
    };

    modalChart.setOption(option);
    $( window ).resize( function() {
        setTimeout(function(){
            modalChart.resize();
        }, DELAY);
    });
}

/**
 * 입출항 선박에 따른 미세먼지 농도 그래프를 표출하는 함수
 */
function setTotalC(id) {
    let modalChart = echarts.init(document.getElementById(id));

    option = {
        grid: {
            top: 40,
            right: 25,
            bottom: 50,
            left: 40,
        },
        xAxis: {
            type: "category",
            data: dust24GraphData.dataList,
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                formatter: function (value){
                    return value.substring(11, 13) + ':00';
                },
                interval: 3,
                fontFamily: 'Gong_Gothic_Medium'
            }
        },
        yAxis:[
            {
                name: '미세먼지',
                type: 'value',
                alignTicks: true,
                position: 'left',
                axisLabel : {
                    fontFamily: 'Gong_Gothic_Medium'
                }
            },
            {
                name: '선박 수',
                type: 'value',
                alignTicks: true,
                position: 'right',
                axisLabel : {
                    fontFamily: 'Gong_Gothic_Medium'
                }
            },
        ],
        series: [
            {
                name: '입항 선박 수',
                type: "bar",
                yAxisIndex: 1,
                color: 'rgb(255,192,2)',
                data: portShipData.entryCountList,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            },
            {
                name: '출항 선박 수',
                type: "bar",
                yAxisIndex: 1,
                color: 'rgb(113,50,161)',
                data: portShipData.departureCountList,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            },
            {
                name: '미세먼지',
                type: 'line',
                yAxisIndex: 0,
                symbol: 'none',
                symbolSize: 6,
                color: 'rgb(166,166,166)',
                data: dust24GraphData.pmValues,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            }
        ],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: 'bottom',
            textStyle: {
                fontFamily: 'Gong_Gothic_Medium'
            }
        }
    };

    modalChart.setOption(option);
    modalChart.on('click', function (params) {
       //setShipC(portShipGroup, params);
       // setTransportC(portShipRatio, params);

    });
}


function countNumbersInRanges(numbers) {
    // 범위별 카운터를 담을 객체
    const rangeCount = {
        "0~99": 0,
        "100~499": 0,
        "500~999": 0,
        "1000 이상": 0
    };

    // 배열 순회하여 각 숫자의 범위를 확인하고 해당하는 범위의 카운터를 증가
    numbers.forEach(num => {
        if (num >= 0 && num < 100) {
            rangeCount["0~99"]++;
        } else if (num >= 100 && num < 500) {
            rangeCount["100~499"]++;
        } else if (num >= 500 && num < 1000) {
            rangeCount["500~999"]++;
        } else if (num >= 1000) {
            rangeCount["1000 이상"]++;
        }
    });

    return rangeCount;
}



/**
 * 입출항 선박들의 운반 톤수 그래프를 표출하는 함수
 */
function setTransportC(portShipRatio, params) {
    $(".ship-ratio-cover").removeClass('active1');
    let modalChart = echarts.init(document.getElementById('transport-chart'), null, {
        height: 200
    });

    let idx = params.name+"+09";
    let portShipRatioDate = portShipRatio[idx];
    let portShipWeight;

    if(params.seriesName  == '입항 선박 수'){
        portShipWeight = portShipRatioDate.shipEntryWeight;


    }else if(params.seriesName  == '출항 선박 수'){
        portShipWeight = portShipRatioDate.shipDepartureWeight;

    }

    const rangeCount = countNumbersInRanges(portShipWeight);
    const ratioData = [];

    $('.vessel-board').empty();
    let ratioTitle=`
                    <tr>
                        <th>운반 톤 수(t)</th>
                        <th>비율(%)</th>
                    </tr>
                    `;
    $(".vessel-board").append(ratioTitle);
    for (const [range, count] of Object.entries(rangeCount)) {
        console.log(`${range}: ${count/portShipWeight.length*100}%`);
        const percent = Math.round((count / portShipWeight.length) * 100);
        let ratioItem =`
                    <tr>
                        <th>${range}</th>
                        <th>${percent}%</th>
                    </tr>
                    `;
        $(".vessel-board").append(ratioItem);
        if(percent <= 0){
            ratioData.push({ value: null, name: range });
        } else {
            ratioData.push({ value: count, name: range });
        }
    }

    option = {
        title: {
            text: '운반 톤수',
            fontFamily: 'Gong_Gothic_Medium',
        },
        grid: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        // 범례
        // legend: {
        //     bottom: 'bottom',
        //     textStyle: {
        //         fontFamily: 'Gong_Gothic_Medium'
        //     }
        // },
        tooltip: {
            trigger: 'item',
            valueFormatter: (value) => value + '개'
        },
        series: [
            {
                name: '운반 톤수',
                type: 'pie',
                radius: '80%',
                label: {
                    fontFamily: 'Gong_Gothic_Medium',
                    fontSize: 12,
                    // position: 'inner',
                    color: "rgb(66,64,64)",
                    formatter: function(data){
                        return data.value != null ? data.value + '개' : '';
                    }
                },
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: ratioData,
                color: ["rgb(85,113,198)", "rgb(146,204,118)", "rgb(250,200,89)", "rgb(238,103,103)"],
                bottom: '-1%',
            }
        ]
    };
    modalChart.setOption(option);
}

/**
 * 입출항 선박의 선박 용도 그래프를 표출하는 함수
 */
function setShipC(portShipGroup, params) {
    let modalChart = echarts.init(document.getElementById('ship-chart'));
    let idx = params.name+"+09";
    let portShipGroupDate = portShipGroup[idx];
    let portShipGroupCateory = portShipGroupDate.shipGroupName;
    let portShipEnDe;
    let graphColor;

    if(params.seriesName  == '입항 선박 수'){
        portShipEnDe = portShipGroupDate.shipGroupEntry;
        let count = portShipEnDe.reduce(function (prev, cur){return prev + cur});
        $(".dust-ship-count > span").html("입항 선박 통계 정보 (" + params.seriesName + " : " + count + ")" );
        graphColor = "rgb(255,192,2)"
    }else if(params.seriesName  == '출항 선박 수'){
        portShipEnDe = portShipGroupDate.shipGroupDeparture;
        let count = portShipEnDe.reduce(function (prev, cur){return prev + cur});
        $(".dust-ship-count > span").html("출항 선박 통계 정보 (" + params.seriesName + " : " + count + ")" );
        graphColor = "rgb(113,50,161)"
    }
    
    $(".dust-ship-count").html()

    option = {
        grid: {
            top: 40,
            right: 25,
            bottom: 50,
            left: 40
        },
        title: {
            text: '선박 용도',
            fontFamily: 'Gong_Gothic_Medium',
            // left: 'center'
        },
        xAxis: {
            type: "category",
            data: portShipGroupCateory,
            boundaryGap: true,
            axisLabel: {
                interval: 0,
                rotate: 40,
                fontFamily: 'Gong_Gothic_Medium',
            },
        },
        yAxis:[
            {
                type: 'value',
                alignTicks: true,
                position: 'left',
                axisLabel: {
                    fontFamily: 'Gong_Gothic_Medium',
                },
            },
        ],
        series: [
            {
                name: params.seriesName,
                type: "bar",
                color: graphColor,
                data: portShipEnDe,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                }
            }
        ],
        tooltip: {
            trigger: 'axis'
        }
    };

    modalChart.setOption(option);
}


/*24시간 미세먼지 변화 그래프*/
function setDust24Graph(dustType, properties, id){ //**나중에 area랑 통합 필요
    let modalChart = echarts.init(document.getElementById(id));

    let fontSize = nowOrientation == 'portrait' ? 8: 12;

    option = {
        grid: {
            top: 10,
            right: 25,
            bottom: 30,
            left: 40
        },
        xAxis: {
            type: "category",
            data: properties.times,  // 날짜
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                formatter: function (value){
                    return value.substring(11, 13) + '시';
                },
                interval: 1,
                fontFamily: 'Gong_Gothic_Medium',
                fontSize: fontSize,
            },
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: function (value) {
                return Math.ceil((value.max + 10) / 10) * 10;
            },
            axisLabel : {
                fontFamily: 'Gong_Gothic_Medium'
            }
        },
        series: [
            {
                data: properties.pmValues,
                type: 'line',
                symbol: 'circle',
                symbolSize: 6,
                color: 'rgb(255,96,2)',
                markArea: {
                    // 속성부분에 object랑 array도 들어감
                    data: BACKGROUND_COLOR[dustType]
                },
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            }
        ],
        tooltip: {
            trigger: 'axis',
        }
    };

    modalChart.setOption(option);
    window.addEventListener('resize', function() {
        setTimeout(function(){
            modalChart.resize();
        }, DELAY);
    });
}

 /*24시간 기준 미세먼지 최저,평균,최고값*/
function setDustValueTable(properties) {

    $('.side-section-' + themeType + " .dust-eng-name").html(dustType.toUpperCase());

    $('.side-section-' + themeType + " .dust-min").html(properties.min.value);
    let minDataTime = formatDateTime(properties.min.dataTime);
    $('.side-section-' + themeType + " .dust-min-date").html(minDataTime);

    $('.side-section-' + themeType + " .dust-avg").html(properties.avg);
    $('.side-section-' + themeType + " .dust-max").html(properties.max.value);

    let maxDataTime = formatDateTime(properties.max.dataTime);
    $('.side-section-' + themeType + " .dust-max-date").html(maxDataTime);
}


/*24시간 기준 선박 입출항 그래프*/
function setEntryDepartureGraph(properties, id) {
    let modalChart = echarts.init(document.getElementById(id));
    let entryValueList = [];
    let departureValueList = [];
    Object.keys(properties.portShipGraph).forEach(function (key) {
        let entryValue = properties.portShipGraph[key].entry.entryCount;
        entryValueList.push(entryValue);
        let departureValue = properties.portShipGraph[key].departure.departureCount;
        departureValueList.push(departureValue);
    });

    let fontSize = nowOrientation == 'portrait' ? 8: 12;

/*    let entryMax = Math.max(entryValueList);
    let departureMax = Math.max(departureValueList);

    let shipMax;
    if(entryMax >= departureMax) {
        shipMax = entryMax;
    }else if(entryMax <= departureMax){
        shipMax = departureMax;
    }*/

    option = {
        grid: {
            top: 40,
            right: 30,
            bottom: 50,
            left: 40,
        },
        xAxis: {
            type: "category",
            data: properties.times,
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                formatter: function (value){
                    return value.substring(11, 13) + ':00';
                },
                interval: 3,
                fontFamily: 'Gong_Gothic_Medium',
                fontSize: fontSize
            }
        },
        yAxis:[
            {
                minInterval: 1,
                name: '미세먼지',
                type: 'value',
                alignTicks: true,
                position: 'left',
                axisLabel : {
                    fontFamily: 'Gong_Gothic_Medium'
                }
            },
            {
                interval: 1,
                minInterval: 1,
                name: '선박 수',
                type: 'value',
                alignTicks: true,
                position: 'right',
                axisLabel : {
                    fontFamily: 'Gong_Gothic_Medium',
                    /*formatter: function (value) {
                        return Math.round(value);
                    }*/
                }

            },
        ],
        series: [
            {
                name: '입항 선박 수',
                type: "bar",
                yAxisIndex: 1,
                color: 'rgb(255,192,2)',
                data: entryValueList,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            },
            {
                name: '출항 선박 수',
                type: "bar",
                yAxisIndex: 1,
                color: 'rgb(113,50,161)',
                data: departureValueList,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            },
            {
                name: '미세먼지',
                type: 'line',
                yAxisIndex: 0,
                symbol: 'none',
                symbolSize: 6,
                color: 'rgb(166,166,166)',
                data: properties.pmValues,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            }
        ],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: 'bottom',
            textStyle: {
                fontFamily: 'Gong_Gothic_Medium'
            }
        }
    };

    modalChart.setOption(option);
    $( window ).resize( function() {
        setTimeout(function(){
            modalChart.resize();
        }, DELAY);
    });
    modalChart.on('click', function (params) {
        if(nowOrientation == 'portrait') {
            nowPage = 4;
            setListAddRemove(`.${nowOrientation} .side-section-${themeType} .side-section-page`, (nowPage - 1), 'show')
            setPageBtn();
        }
        $(".transport-section-cover").addClass('hide');
        setShipGroup(properties, params, `ship-chart-${nowOrientation}`);
        setShipRatio(properties, params, `transport-chart-${nowOrientation}`);

    });
}

/*입출항 그래프 클릭시 입항/항만 선박 종류 표시*/
function setShipGroup(properties, params, id) {
    let modalChart = echarts.init(document.getElementById(id));
    let portShipGroupCateory = properties.portShipGraph[params.name].entry.shipGroupName;
    let portShipEnDe;
    let graphColor;

    if(params.seriesName  == '입항 선박 수'){
        portShipEnDe = properties.portShipGraph[params.name].entry.shipGroupEntry;
        let count = properties.portShipGraph[params.name].entry.entryCount;
        $(".ship-title").html("입항 선박 통계 정보 (" + params.seriesName + " : " + count + ")" );
        graphColor = "rgb(255,192,2)"
    }else if(params.seriesName  == '출항 선박 수'){
        portShipEnDe = properties.portShipGraph[params.name].departure.shipGroupDeparture;
        let count = properties.portShipGraph[params.name].departure.departureCount;
        $(".ship-title").html("출항 선박 통계 정보 (" + params.seriesName + " : " + count + ")" );
        graphColor = "rgb(113,50,161)"
    }

    let fontSize = nowOrientation == 'portrait' ? 8: 12;

    option = {
        grid: {
            top: 40,
            right: 25,
            bottom: 50,
            left: 40
        },
        title: {
            text: '선박 용도',
            fontFamily: 'Gong_Gothic_Medium',
            // left: 'center'
        },
        xAxis: {
            type: "category",
            data: portShipGroupCateory,
            boundaryGap: true,
            axisLabel: {
                interval: 0,
                rotate: 40,
                fontFamily: 'Gong_Gothic_Medium',
                fontSize: fontSize,
            },
        },
        yAxis:[
            {
                minInterval: 1,
                type: 'value',
                alignTicks: true,
                position: 'left',
                axisLabel: {
                    fontFamily: 'Gong_Gothic_Medium',
                },
            },
        ],
        series: [
            {
                name: params.seriesName,
                type: "bar",
                color: graphColor,
                data: portShipEnDe,
                label: {
                    fontFamily: 'Gong_Gothic_Medium',
                }
            }
        ],
        tooltip: {
            trigger: 'axis'
        }
    };

    modalChart.setOption(option);
    $( window ).resize( function() {
        clearTimeout(timer);
        timer = setTimeout(function(){
            modalChart.resize();
        }, DELAY);
    });
}

/*입출항 그래프 클릭시 입항/출항 운반톤수 그래프, 표 표출*/
function setShipRatio(properties, params, id) {

    let screenHeight = $(window).height();

    let fontSize = nowOrientation == 'portrait' ? 8: 12;
    let height = nowOrientation == 'portrait' && screenHeight >= 600 ? 160: 200;
    let show = nowOrientation == 'portrait' && screenHeight >= 600 ? false: true;
    let tag = document.getElementById(id);
    let modalChart = echarts.init(tag, null, {
        height: height
    });

    let portShipRatioDate = properties.portShipGraph[params.name];
    let portShipWeight;

    if(params.seriesName  == '입항 선박 수'){
        portShipWeight = portShipRatioDate.entry.shipEntryWeight;
    }else if(params.seriesName  == '출항 선박 수'){
        portShipWeight = portShipRatioDate.departure.shipDepartureWeight;
    }

    const rangeCount = countNumbersInRanges(portShipWeight);
    const ratioData = [];

    let rangeNum = 1;
    for (const [range, count] of Object.entries(rangeCount)) {
        // console.log(`${range}: ${count/portShipWeight.length*100}%`);
        const percent = Math.round((count / portShipWeight.length) * 100);
        $(`.transport-range-${rangeNum}`).html(`${percent}%`);
        if(percent <= 0){
            ratioData.push({ value: null, name: range });
        } else {
            ratioData.push({ value: count, name: range });
        }
        rangeNum++;
    }

    option = {
        title: {
            text: '운반 톤수',
            fontFamily: 'Gong_Gothic_Medium',
        },
        grid: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        // 범례
        // legend: {
        //     bottom: 'bottom',
        //     textStyle: {
        //         fontFamily: 'Gong_Gothic_Medium'
        //     }
        // },
        tooltip: {
            trigger: 'item',
            valueFormatter: (value) => value + '개'
        },
        series: [
            {
                name: '운반 톤수',
                type: 'pie',
                radius: '80%',
                label: {
                    fontFamily: 'Gong_Gothic_Medium',
                    fontSize: fontSize,
                    // position: 'inner',
                    show: show,
                    color: "rgb(66,64,64)",
                    formatter: function(data){
                        return data.value != null || data.value >= 0 ? data.value + '개' : '';
                    }
                },
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: ratioData,
                color: ["rgb(85,113,198)", "rgb(146,204,118)", "rgb(250,200,89)", "rgb(238,103,103)"],
                bottom: '-1%',
                top: "10%",
            }
        ]
    };
    modalChart.setOption(option);
    $( window ).resize( function() {
        setTimeout(function(){
            modalChart.resize();
        }, DELAY);
    });
}