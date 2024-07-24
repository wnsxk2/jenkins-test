const DELAY = 500;
/**
 * 수위대비 쓰레기 발생량
 */
function setAmountRelativeToWaterLevelChart(id, data) {
    let chart = echarts.init(document.getElementById(id));

    let fontSize = Orientation == "landscape" ? 12 : 8;
    option = {
        grid: {
            bottom: 25,
        },
        xAxis: {
            type: "category",
            data: data.xAxis,
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                formatter: function (value){
                    return value.substring(4, 5) == "0" ? value.substring(5) + "월" : value.substring(4) + "월";
                },
                // interval: 1,
                fontFamily: 'Gong_Gothic_Medium',
                fontSize: fontSize
            }
        },
        yAxis:[
            {
                minInterval: 0.2,
                name: '평균 수위',
                type: 'value',
                alignTicks: true,
                position: 'right',
                axisLabel : {
                    fontFamily: 'Gong_Gothic_Medium',
                    /*formatter: function (value) {
                        return Math.round(value);
                    }*/
                },
                max:1
            },
            {
                minInterval: 1,
                name: '쓰레기발생량',
                type: 'value',
                alignTicks: true,
                position: 'left',
                axisLabel : {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            },
        ],
        series: [
            {
                name: '평균 수위',
                type: "bar",
                yAxisIndex: 0,
                color: 'rgb(2,34,97)',
                data: data.waterLevelData,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
                barMaxWidth: 30
            },
            {
                name: '쓰레기발생량',
                type: 'line',
                yAxisIndex: 1,
                color: 'rgb(241,87,123)',
                data: data.trashData,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            },
        ],
        tooltip: {
            trigger: 'axis',
            // formatter: function (params, ticket, callback) {
            // }
        },
        legend: {
            textStyle: {
                fontFamily: 'Gong_Gothic_Medium',
                fontSize : fontSize
            }
        }
    };

    chart.setOption(option);
    $( window ).resize( function() {
            chart.resize();
    });
    chart.on('click', function (params) {
        let warningData = data.warningData["dt" + params.name];
        if(warningData != undefined){
            setShowHide(`#wl-table-cover-${Orientation}`, 'hide');
            $('.cctv-wl-month').html(params.name.substring(4, 5) == "0" ? params.name.substring(5) + "월" : params.name.substring(4) + "월");
            $('.cctv-heavyrain-advisory').html(warningData.heavyRainAdvisoryCount);
            $('.cctv-heavyrain-alarm').html(warningData.heavyRainAlarmCount);
            $('.cctv-typhoon').html(warningData.typhoonCount + "회");
        } else {
            $(`#wl-table-cover-${Orientation} span`).html("데이터가 없습니다.");
        }
    });
}

/**
 * 재해쓰레기-수위대비 쓰레기 발생량 시작
 */
function chartWlSatel(data) {
    let satelChart = echarts.init(document.getElementById('chart-satel'))

    let fontSize = Orientation == "landscape" ? 12 : 8;

    let searchYm = data.wlData.map(item => item.waterLevelMonth);
    let avgWl = data.wlData.map(item => item.waterLevel);
    let ddWeight = data.debrisData.map(item => item.ddWeight);

    let satelChartOption = {
        // 애니메이션
        //animation: false, // 효과 끄기
        legend: {
            data: ['평균 수위', '쓰레기발생량'],
            orient: 'horizontal', //수평
            top: 1,
            textStyle: {
                fontFamily: 'Gong_Gothic_Medium'
            }
        },
        grid: {
            top: 50,
        },
        xAxis: {
            type: 'category',
            data: searchYm,
            axisLabel: {
                formatter: function(value) {
                    let dateFormat = value.split('-');
                    let year = dateFormat[0].slice(2);
                    let month = dateFormat[1].replace(/^0/, '');
                    return year + '년도\n' + month + '월';
                },
                fontSize: fontSize,
                rotate: 0,
                interval: 0, //모든 레이블 표시, 간격 겹치지 않게
                fontFamily: 'Gong_Gothic_Medium'
            },
        },
        yAxis:[
            {
                minInterval: 1, //눈금값 1 : 최소값 설정
                type: 'value',
                alignTicks: true, //각 축의 눈금 정렬
                position: 'right',
                axisLabel : {
                    fontFamily: 'Gong_Gothic_Medium',
                    formatter: function (value) {
                        return Math.round(value);
                    }
                },
            },
            {
                minInterval: 1,
                type: 'value',
                alignTicks: true,
                position: 'left',
                axisLabel : {
                    fontFamily: 'Gong_Gothic_Medium'
                }
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
        series: [
            {
                name: '평균 수위',
                type: "bar",
                yAxisIndex: 0, //y축 번호설정1
                color: 'rgb(2,34,97)',
                data: avgWl,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
                barWidth: 30,
            },
            {
                name: '쓰레기발생량',
                type: 'line',
                yAxisIndex: 1, //y축 번호설정2
                color: 'rgb(241,87,123)',
                data: ddWeight,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            },
        ],
    }
    satelChart.setOption(satelChartOption)

    //윈도우창에 맞춰 리사이즈
    // satelChart.setOption(option);
    // $(window).resize(function() {
    //     setTimeout(function(){
    //         chart.resize();
    //     }, DELAY);
    // });

    satelChart.on('click', (params) => {
        let wlBar;
        let wlMonth;

        if (params.componentType === 'series') {
            wlBar = params.value;
            wlMonth = params.data;
        }

        showChartTable(wlBar, wlMonth);
    });
}

function showChartTable(wlBar, wlMonth) {
    let tableHTML = `
        <div>
            <table style="width: 100%;">
                <tr>
                    <th>관측월</th>
                    <th>기상특보발령종류</th>
                    <th>건수(건)</th>
                    <th>특징</th>
                </tr>
                <tr>
                    <td rowspan="2">${wlMonth}</td>
                    <td>호우주의보/경보</td>
                    <td>18</td>
                    <td rowspan="2">장마기간</td>
                </tr>
                <tr>
                    <td>호우특보</td>
                    <td>25</td>
                </tr>
            </table>
        </div>
    `;

    $('#satel-clicked-show-table').innerHTML = tableHTML;
}
/* 재해쓰레기-수위대비 쓰레기 발생량 끝 */

/**
 * 처리 소요예산 그래프
 */
function setCostChart(id, data) {
    let chart = echarts.init(document.getElementById(id));

    let fontSize = Orientation == "landscape" ? 12 : 8;
    option = {
        grid: {
            bottom: 20,
            right : '14%',
            left : '10%'
        },
        xAxis: {
            type: "category",
            data: data.xAxis,
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                formatter: function (value){
                    return value+ '년';
                },
                // interval: 1,
                fontFamily: 'Gong_Gothic_Medium',
                fontSize: fontSize
            }
        },
        yAxis:[
            {
                minInterval: 1,
                name: Orientation == "landscape" ? '처리 소요예산(억)' : "",
                type: 'value',
                alignTicks: true,
                position: 'right',
                axisLabel : {
                    fontFamily: 'Gong_Gothic_Medium',
                    fontSize : fontSize
                    /*formatter: function (value) {
                        return Math.round(value);
                    }*/
                },
                nameTextStyle: {
                    align: "right",
                },
            },
            {
                minInterval: 1,
                name: Orientation == "landscape" ? "부유쓰레기 발생량(kg)" : "",
                type: 'value',
                alignTicks: true,
                position: 'left',
                axisLabel : {
                    fontFamily: 'Gong_Gothic_Medium',
                    fontSize : fontSize
                },
                nameTextStyle: {
                    align: "left",
                },
            },
        ],
        series: [
            {
                name: '처리 소요예산',
                type: "bar",
                yAxisIndex: 0,
                color: 'rgb(2,34,97)',
                data: data.costData,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
                barMaxWidth: 60
            },
            {
                name: '부유쓰레기 발생량',
                type: 'line',
                yAxisIndex: 1,
                color: 'rgb(241,87,123)',
                data: data.trashData,
                label: {
                    fontFamily: 'Gong_Gothic_Medium'
                },
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            textStyle: {
                fontFamily: 'Gong_Gothic_Medium',
                fontSize : fontSize
            }
        }
    };

    chart.setOption(option);
    $( window ).resize( function() {
            chart.resize();
    });
}