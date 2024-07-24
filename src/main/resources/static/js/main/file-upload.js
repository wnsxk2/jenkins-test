/*전역변수 시작*/
let SelectedFiles = []; //다중파일업로드-첨부할 파일들 담는 전역변수
let DataIndex; //
let FileLength; //
let FileList=[];


/*상수*/
const MAX_FILE_COUNT = 5; //최대 첨부 가능한 파일 개수
const VISIBLE_PAGES = 5; // 한 번에 보여질 페이지 수
const ITEMS_PER_PAGE = 10; //한페이지당 보여질 게시글 수
const MOBILE = /Mobi/i.test(window.navigator.userAgent); //모바일 / PC 구분 --common.js로 빼야하나?


/*전역변수 끝*/

$(document).ready(function () {
    /*공통 함수 시작*/
    isMobile(); //모바일 / PC 구분 --common.js로 빼야하나?
    /*공통 함수 끝*/

    /*통신 함수 시작*/
    //데이터 업로드
    getJobNameList(); //제공 정보 목록 가져오는 함수
    fileUpload(); //다중 파일 업로드
    //데이터 업로드 이력
    getFileList(); //업로드한 파일 목록 불러오기 (게시판)
    /*통신 함수 끝*/

    /*이벤트 함수 시작*/
    //데이터 업로드
    dragDropFiles(); //드래그엔 드롭+클릭 파일 첨부 이벤트 (다중 첨부)
    selectJobName(); //제공정보 선택시 파일업로드 재확인 팝업에 추가
    deleteAllFiles(); //전체 파일 삭제
    clickUploadPopUp(); //업로드 하기 버튼(데이터 업로드 재확인 팝업열기)
    //데이터 업로드 이력 (게시판)
    onClickEditBtn(); //파일 수정 팝업 열기
    onClickDeleteBtn(); // 파일 삭제 팝업 열기 + 삭제함수

    //공통 사용 함수
    closePopUp(); //팝업 닫기  //!!!

    /*이벤트 함수 끝*/



    /*파일수정*/
    editDragDropFile();

    onCLickDeleteEditBtn()

    /*캘린더*/
    setCalenderMinMax();
});


/* 통신 함수 */
/*제공 정보 목록 가져오는 함수-데이터 업로드*/
function getJobNameList(){
    $.ajax({
        url: "data/main/job-data",
        type: "get",
        dataType: 'json',
        success: function (resp){
            if(resp.success){
                if (resp.data != null) {
                    console.log("getJobNameList success");
                    let jobNameData = resp.data;
                    for (let i = 0; i < jobNameData.length; i++){
                        let jobName = jobNameData[i].jobNm;
                        let jobId = jobNameData[i].jobId;
                        let jobNameOption= `<option value="${jobId}">${jobName}</option>`;
                        $(".job-name-list").append(jobNameOption);
                    }
                }
            }
        },
        error: function (e) {
            console.log('error in getJobNameList');
        }

    });
}

/*다중 파일 업로드 -데이터 업로드*/
function fileUpload() {
    $(".upload-btn").click(function (e) {
        e.preventDefault(); // 기본 제출 방지
        $(".file-delete-btn").removeClass("on");
        let formData = new FormData();
        for (let i = 0; i < SelectedFiles.length; i++) {
            formData.append('file', SelectedFiles[i]);
        }
        let selectedJobId = $(".job-name-list option:selected").val();
        formData.append('jobId', selectedJobId);

      //  $(".file-delete-btn").removeClass("on");
        $(".progress-bar").removeClass("on");
        $(".circular").addClass("full");


        $.ajax({
            url: "file-upload",
            type: "post",
            enctype: "multipart/form-data",
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            xhr: function() {
                let xhr = new XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        let percentComplete = Math.round((evt.loaded * 100) / evt.total);

                        // 각각의 progress-bar 업데이트
                        $('.file-list-container').each(function() {
                            let index = $(this).data('index');
                            let circle = $(this).find('.circular-' + index)[0];
                            let bbox = circle.getBoundingClientRect();
                            let centerX = bbox.width / 2; // 원의 중심 X 좌표
                            let centerY = bbox.height / 2; // 원의 중심 Y 좌표
                            let radius = Math.max(centerX, centerY); // 반지름은 원의 중심으로부터 가장 짧은 거리로 계산

                            let circumference = 2 * Math.PI * radius;
                            let offset = circumference - (percentComplete / 100) * circumference;

                            circle.style.strokeDasharray = `${circumference}`;
                            circle.style.strokeDashoffset = offset;
                        });
                    }
                }, false);
                return xhr;
            },
            success: function (data) {
                // 모든 progress-bar를 100%로 설정
                $('.file-list-container').each(function() {
                    let index = $(this).data('index');
                    let circle = $(this).find('.circular-' + index)[0];
                    let bbox = circle.getBoundingClientRect();
                    let centerX = bbox.width / 2; // 원의 중심 X 좌표
                    let centerY = bbox.height / 2; // 원의 중심 Y 좌표
                    let radius = Math.max(centerX, centerY); // 반지름은 원의 중심으로부터 가장 짧은 거리로 계산

                    let circumference = 2 * Math.PI * radius;


                    circle.style.strokeDasharray = `${circumference}`;//둘레
                    circle.style.strokeDashoffset = 0; // 완전히 채우기
                });
                $(".circular").addClass("full");
                $(".file-upload-check").addClass("on");

                setTimeout(function() {
                    alert("파일 업로드 성공");

                    SelectedFiles.splice(0);
                    $(".file-list-container").remove();
                    $(".delete-all-files").removeClass("on");
                    $(".file-count").empty();
                    $('.job-name-list').val('');
                    $(".progress-bar").addClass("on");
                    $(".circular").removeClass("full");
                    $(".file-upload-check").removeClass("on");
                }, 700);
            },
            error: function (e) {
                console.log('파일 업로드 중 오류 발생');
                alert("파일 업로드 실패");
            }
        });
      //  location.reload();
        $('.pop-wrap').removeClass("on"); // 팝업 닫기
    });
}
/*업로드한 파일 목록 불러오기 (게시판)*/
function getFileList() {
    $.ajax({
        url: "/data/file/board",
        type: "get",
        dataType: 'json',
        success: function (resp) {
            if (resp.data != null) {
                FileList = resp.data;
                FileLength = FileList.length;
                renderPage(1); // 초기에는 첫 번째 페이지를 렌더링
                fileUploadPaging(); // 페이징 초기화

            }
        },
        error: function (e) {
            console.log('파일 목록 불러오기 오류');
            alert("데이터가 존재하지 않습니다.")
        }
    });
}

function reloadFileList(startDate, endDate) {
    let url = "/data/file/board/" + `${startDate}/${endDate}`;
    $.ajax({
        url: url,
        type: "get",
        dataType: 'json',
        success: function (resp) {
            if (resp.data != null) {
                console.log('날짜별 파일 목록 불러오기');
                FileList = resp.data;
                FileLength = FileList.length;
                renderPage(1);
               fileUploadPaging();
            }else {
                alert("해당 날짜에 데이터가 존재하지 않습니다.");
                $(".pagination-container").empty();
                $('.upload-file-list').empty();
            }
        },
        error: function (e) {
            alert("조회할 날짜를 선택해주세요.");
            console.log('파일 목록 불러오기 오류');
        }
    });
}

/* 통신 함수 끝 */


/*파일 첨부: 그래그앤드롭 + 클릭 이벤트 -데이터 업로드*/
function dragDropFiles(){
    $("#file-drop").on("dragenter", function (e){ //dragenter: 드래그가 박스 안에 들어왔을 때
        e.preventDefault();
        e.stopPropagation();
    }).on("dragover", function(e){ //dragover: 박스 안에서 드래그 중일 때
        e.preventDefault();
        e.stopPropagation();
        $(this).css("background-color", "#FFD8D8");
    }).on("dragleave", function(e){ //dragleave: 박스 밖으로 드래그가 나갈 때
        e.preventDefault();
        e.stopPropagation();
    }).on("drop", function (e){ //drop: 박스 안에 드롭했을 때
        e.preventDefault();
        $(this).css("background-color", "#FFF");
        let files = e.originalEvent.dataTransfer.files;
        addFiles(files);

    }).on("click", function() { // 클릭했을 때
        $("#file-btn").click();
    });


    $("#file-btn").on("change", function() { // 파일 선택했을 때(직접 첨부)
        let files = this.files;
        addFiles(files);
    });
}

/*파일 첨부 표출*/
function addFiles(files) {
    for (let i = 0; i < files.length; i++) {
        SelectedFiles.push(files[i]);
    }

    let nowFileCount = SelectedFiles.length; //현재첨부된 파일 총 개수
   // let uploadFileCount = files.length; //현재첨부하는 파일 개수
    let uploadFileCount;

    let addFileCount = MAX_FILE_COUNT - nowFileCount; //첨부 가능한 파일 개수
    let nowFileCountText;
    if(MAX_FILE_COUNT < nowFileCount){ //첨부된 파일이 5개 넘을 경우
         SelectedFiles.splice(5)
        alert("첨부파일은 최대 " + MAX_FILE_COUNT + "개 까지 첨부 가능합니다.");
        nowFileCountText = `<span class="now-file-count">${MAX_FILE_COUNT}개</span>`
        uploadFileCount = MAX_FILE_COUNT - (nowFileCount - files.length);
    }else {
        nowFileCountText = `<span class="now-file-count">${nowFileCount}개</span>`
        uploadFileCount = files.length;
    }
        $(".file-count").html(nowFileCountText + " / " + MAX_FILE_COUNT+"개");

    for(let i = 0; i < Math.min(MAX_FILE_COUNT, uploadFileCount); i++){
            let fileName = files[i].name;
            let dataIdx;
            if(DataIndex == undefined){
                dataIdx = i;
                DataIndex = i;
            }else {
                DataIndex++;
                dataIdx = DataIndex;
            }
            let fileContents = `<div class="file-list-container" data-index="${dataIdx}">
                                    <div class="file-list" data-index="${dataIdx}">${fileName}</div>
                                    <div class="progress-bar on progress-bar-${dataIdx}">
                                        <svg class="circular-chart" viewBox="0 0 36 36">
                                            <path class="circular-bg"
                                                  d="M18 2.0845
                                                     a 15.9155 15.9155 0 0 1 0 31.831
                                                     a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            <path class="circular circular-${dataIdx}"
                                                  stroke-dasharray="0, 100"
                                                  d="M18 2.0845
                                                     a 15.9155 15.9155 0 0 1 0 31.831
                                                     a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        </svg>
                                    </div>
                                    <div class="file-upload-check"><img src="${ctxPath}/images/main/file_upload_check.webp"></div>
                                    <button class="file-delete-btn on" data-index="${dataIdx}">X 삭제</button>
                                </div>`;

            $(".file-name").append(fileContents);
            $(".delete-all-files").addClass("on");
        }


}

function addFiles2(files) {
    for (let i = 0; i < files.length; i++) {
        SelectedFiles.push(files[i]);
    }

    let nowFileCount = SelectedFiles.length; //현재첨부된 파일 총 개수
    let uploadFileCount = files.length; //현재첨부하는 파일 개수

    let addFileCount = MAX_FILE_COUNT - nowFileCount; //첨부 가능한 파일 개수
    if(MAX_FILE_COUNT < nowFileCount){
        SelectedFiles = [];
        alert("첨부파일은 최대 " + MAX_FILE_COUNT + "개 까지 첨부 가능합니다.");
    }else {
        let nowFileCountText = `<span class="now-file-count">${nowFileCount}개</span>`
        $(".file-count").html(nowFileCountText + " / " + MAX_FILE_COUNT+"개");


        for(let i = 0; i < Math.min(MAX_FILE_COUNT, uploadFileCount); i++){
            let fileName = files[i].name;
            let dataIdx;
            if(DataIndex == undefined){
                dataIdx = i;
                DataIndex = i;
            }else {
                DataIndex++;
                dataIdx = DataIndex;
            }
            let fileContents = `<div class="file-list-container" data-index="${dataIdx}">
                                    <div class="file-list" data-index="${dataIdx}">${fileName}</div>
                                    <div class="progress-bar on progress-bar-${dataIdx}">
                                        <svg class="circular-chart" viewBox="0 0 36 36">
                                            <path class="circular-bg"
                                                  d="M18 2.0845
                                                     a 15.9155 15.9155 0 0 1 0 31.831
                                                     a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            <path class="circular circular-${dataIdx}"
                                                  stroke-dasharray="0, 100"
                                                  d="M18 2.0845
                                                     a 15.9155 15.9155 0 0 1 0 31.831
                                                     a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        </svg>
                                    </div>
                                    <div class="file-upload-check"><img src="${ctxPath}/images/main/file_upload_check.webp"></div>
                                    <button class="file-delete-btn on" data-index="${dataIdx}">X 삭제</button>
                                </div>`;

            $(".file-name").append(fileContents);
            $(".delete-all-files").addClass("on");
        }
    }

}

/*선택 파일 삭제*/
$(document).on('click', '.file-delete-btn', function (e){

    let index = $('.file-delete-btn').index(this);
    SelectedFiles.splice(index, 1); // 배열에서 파일 삭제
    $(this).parent().remove(); // UI에서 해당 파일 요소 삭제

    $('.file-list-container').each(function (idx) {
        $(this).attr('data-index', idx);
        $(this).find('.file-delete-btn').attr('data-index', idx);
    });

    // 파일 개수 업데이트
    let nowFileCount = SelectedFiles.length;
    let nowFileCountText = `<span class="now-file-count">${nowFileCount}개</span>`;
    $(".file-count").html(nowFileCountText + " / " + MAX_FILE_COUNT + "개");

    // 모든 파일 삭제 버튼 상태 업데이트
    if (nowFileCount === 0) {
        $(".delete-all-files").removeClass("on");
        $(".file-count").empty();
    }
});


/*전체 파일 삭제-데이터 업로드*/
function deleteAllFiles(){
    $(".delete-all-files").on('click', function (){
        SelectedFiles.splice(0);
        $(".file-list-container").remove();
        $(".delete-all-files").removeClass("on");
        $(".file-count").empty();
    })
}

/*제공정보 선택시 파일업로드 재확인 팝업에 추가-데이터 업로드*/
function selectJobName(){
    $('.job-name-list').change(function() {
        let jobName = $('.job-name-list').find('option:selected').text();
        let jobNameText = `<div>제공 정보: <span >${jobName}</span></div>`
        $(".pop-job-name").html(jobNameText);

    });
}

/*팝업 닫기-공통*/
function closePopUp(){
    $(".pop-close").click(function (){
        $('.pop-wrap').removeClass("on");
        $('.file-upload-board-pop').removeClass("on");
        deleteEditFile();
    })
}

/*외부 영역 클릭시 팝업 닫기*/
$(document).mouseup(function (e){
    if($(".pop-wrap").has(e.target).length === 0){
        $('.pop-wrap').removeClass("on");
    }

    /*if($(".file-upload-board-pop").has(e.target).length === 0){
        $('.file-upload-board-pop').removeClass("on");
        $("#update-file-btn")[0].value = ""
        $(".edit-file-name-container").remove();
    }*/
});

/*업로드 하기 버튼(데이터 업로드 재확인 팝업열기)-데이터업로드*/
function clickUploadPopUp() {
    $(".popup-btn").click(function () {
        if ($('.job-name-list').val() != null) {
            if ($('.file-list').length > 0) { // 파일 목록이 있는지 확인
                $('.pop-wrap').addClass("on");

                let fileListText = '';
                $('.file-list').each(function(index) {
                    fileListText += (index + 1) + '. ' + $(this).text() + '<br>';
                });
                $('.pop-file-name').html(fileListText);
            } else {
                alert("파일을 첨부해 주세요.");
            }
        } else {
            alert("제공정보를 선택해 주세요.");
        }
    });
}

/**게시판**/

/*파일업로드 게시판 파일 삭제 팝업 열기*/
function onClickDeleteBtn(){
    $(document).on("click", ".upload-file-delete-popup-btn", function () {
        if(MOBILE == false){ //PC일때
            $(".delete-pop-container").addClass("on");

            let deleteJobName = $(this).closest('tr').find('td').eq(0).text(); //제공정보
            let deleteJobDate = $(this).closest('tr').find('td').eq(1).text(); //제공일시
            let deleteFileName = $(this).closest('tr').find('td').eq(3).text(); //파일명

            let jobName = `<div class="pop-contents-inner">제공 정보: <span>${deleteJobName}</span></div>`;
            let jobDate = `<div class="pop-contents-inner">제공 일시: <span>${deleteJobDate}</span></div>`;
            let fileName = `<div><p class="pop-contents-inner">제공 파일명:</p>
                        <div class="delete-file-name">${deleteFileName}</div></div>`;

            $(".delete-job-name").html(jobName);
            $(".delete-job-date").html(jobDate);
            $(".delete-file-list").html(fileName);

            let uldFileGroupNum = $(this).data("groupnum");
            let uldFileNum = $(this).data("filenum");
            deleteUploadFile(uldFileGroupNum, uldFileNum); //파일 업로드 목록 게시판-파일삭제
        }else {
            alert("모바일 웹 사용 불가\n" +
                "해당서비스는 모바일에서 사용할 수 없습니다.\n" +
                "PC 버전을 이용해 주세요.");

        }

    });
}

/*파일 업로드 목록 게시판-파일삭제*/
function deleteUploadFile(uldFileGroupNum, uldFileNum){
    $(document).on("click", ".upload-file-delete-btn", function () {
        let url = "/main/file/" + `${uldFileGroupNum}/${uldFileNum}`;

        $.ajax({
            url: url,
            type: "DELETE",
            success: function(result) {
                alert("파일이 삭제되었습니다.");
                $('tr[data-groupnum="' + uldFileGroupNum + '"][data-filenum="' + uldFileNum + '"]').remove();
                location.reload();
            },
            error: function (e) {
                console.log('error in fileUpload');
                alert("파일 삭제 실패");
            }
        });
    });
}



/*페이징*/
function renderPage(page) {
    let start = (page - 1) * ITEMS_PER_PAGE;
    let end = start + ITEMS_PER_PAGE;
    let paginatedItems = FileList.slice(start, end);

    $('.upload-file-list').empty(); // 현재 목록을 비움

    for (let i = 0; i < paginatedItems.length; i++) {
        let fileListItem = `
            <tr data-groupnum="${paginatedItems[i].uldFileGroupNum}"
                    data-filenum="${paginatedItems[i].uldFileNum}">
                <td>${paginatedItems[i].jobNm}</td>
                <td>${paginatedItems[i].dataPvsnDt}</td>
                <td>${paginatedItems[i].nickNm}</td>
                <td>${paginatedItems[i].orgnFileNm}</td>
                <td><button data-groupnum="${paginatedItems[i].uldFileGroupNum}"
                    data-filenum="${paginatedItems[i].uldFileNum}" class="upload-file-update-popup-btn upload-file-popup-btn">
                    <img src="${ctxPath}/images/main/upload_file_edit_icon.webp" alt=""/>
                    수정</button>
                </td>
                <td><button data-groupnum="${paginatedItems[i].uldFileGroupNum}"
                    data-filenum="${paginatedItems[i].uldFileNum}" class="upload-file-delete-popup-btn upload-file-popup-btn">
                     <img src="${ctxPath}/images/main/upload_file_delete_icon.webp" alt=""/>
                    삭제</button>
                </td>
            </tr>`;
        $('.upload-file-list').append(fileListItem);
    }
    isMobile();
}
function fileUploadPaging() {

    let totalPages = Math.ceil(FileLength / ITEMS_PER_PAGE);
    let paginationHtml = `<div id="pagination" class="pagination"></div>`
    $(".pagination-container").html(paginationHtml)

    if (totalPages > 0) {
        $('#pagination').twbsPagination({
            totalPages: totalPages,
            visiblePages: VISIBLE_PAGES,
            startPage: 1,
            first: false,
            last: false,
            prev: "<<",
            next: ">>",
            //initiateStartPageClick:false,	// onPageClick 자동호출 방지
            onPageClick: function (event, page) {
                renderPage(page);
            }
        });
    }
}




/*파일 수정 - 단일파일 업로드*/
function editDragDropFile(){
    $("#update-file-drop").on("dragenter", function (e){ //dragenter: 드래그가 박스 안에 들어왔을 때
        e.preventDefault();
        e.stopPropagation();
    }).on("dragover", function(e){ //dragover: 박스 안에서 드래그 중일 때
        e.preventDefault();
        e.stopPropagation();
        $(this).css("background-color", "#FFD8D8");
    }).on("dragleave", function(e){ //dragleave: 박스 밖으로 드래그가 나갈 때
        e.preventDefault();
        e.stopPropagation();
    }).on("drop", function (e){ //drop: 박스 안에 드롭했을 때
        e.preventDefault();
        $(this).css("background-color", "#FFF");
        let file = e.originalEvent.dataTransfer.files[0];
        addEditFile(file);

    }).on("click", function() { // 클릭했을 때
        $("#update-file-btn").click();
    });


    $("#update-file-btn").on("change", function() { // 파일 선택했을 때(직접 첨부)
        let file = this.files[0];
        addEditFile(file);


    });
}

/*수정할 첨부 파일 명 표출*/
function addEditFile(file) {
    let editFileName= `<div class="edit-file-name">
            ${file.name}
            <img class="delete-edit-file-btn" src="${ctxPath}/images/main/delete_icon.webp">
            </div>`;
    $(".edit-file-name-container").html(editFileName);
}

/*수정 버튼 클릭시 팝업 표출*/
function onClickEditBtn(){
    $(document).on("click", ".upload-file-update-popup-btn", function () {
        if(MOBILE == false){
            $(".edit-pop-container").addClass("on");
            let uldFileGroupNum = $(this).data("groupnum");
            let uldFileNum = $(this).data("filenum");
            updateEditFile(uldFileGroupNum, uldFileNum);
        }else {
            alert("모바일 웹 사용 불가\n" +
                "해당서비스는 모바일에서 사용할 수 없습니다.\n" +
                "PC 버전을 이용해 주세요.");
        }
    })
}
function updateEditFile(uldFileGroupNum, uldFileNum){
    $(document).on("click", ".upload-file-update-btn", function (event) {
        event.preventDefault() // 기본 폼 제출 동작(get) 방지
        let fileInput = $("#update-file-btn")[0];
        let file = fileInput.files[0];

        if (!file) {
            alert("파일을 선택하세요.");
            return;
        }

        let formData = new FormData();
        formData.append("file", file);
        formData.append("uldFileGroupNum", uldFileGroupNum);
        formData.append("uldFileNum", uldFileNum);


        $.ajax({
            url: "/main/file/update",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(result) {
                alert("파일이 수정되었습니다.");
                console.log("파일 수정")
                location.reload();
            },
            error: function (e) {
                console.log('error in fileUpload');
                alert("파일 수정 실패");
            }
        });
    });
}

/*파일 수정 업로드 팝업에서 업로드할 파일 삭제*/
function onCLickDeleteEditBtn(){
    $(document).on('click', '.delete-edit-file-btn', function (){
        deleteEditFile();
    });
}

function deleteEditFile(){
    $("#update-file-btn")[0].value = ""
    $(".edit-file-name-container").empty();
}


/*날짜 검색 관련 함수*/
function setCalenderMinMax(){
    let today = getTodayDate();
    let calendarStart = $('.calendar-start[type="date"]').last();
    let calendarEnd = $('.calendar-end[type="date"]').last();


    //시작 날짜 최대값
    calendarStart.attr('max', today);

    //종료 날짜 최소값
    calendarStart.on('change', function() {
        calendarEnd.val('');
        let startDate = calendarStart.val();
        if (startDate !== "") {

            calendarEnd.attr('min', startDate);
        }
    });
    //종료 날짜 최대값
    calendarEnd.attr('max', today);

    //날짜 조회버튼
    $(".date-search-btn").click(function(){
        reloadFileList(calendarStart.val(), calendarEnd.val());
    })

    //날짜 전체조회(초기화)버튼
    $(".date-refresh-btn").click(function(){
        calendarStart.val('');
        calendarEnd.val('');
        calendarStart.attr('max', today);
        calendarEnd.attr('min', '');
        calendarEnd.attr('max', today);
        getFileList(); //전체목록불러오기
    })

}

/*오늘날짜*/
function getTodayDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

/*모바일인지 PC인지 구분*/ //--common.js로 옮기기?
function isMobile() {
    if(MOBILE == true){ //true = 모바일
      //  $(".mobile-side-menu-container").addClass("show");
        $(".file-upload-main").addClass("hide");
        $(".mobile-file-upload-pop").addClass("show");
      //  $(".mobile-side-menu-wrap").addClass("show");

    }else{ //false = PC
      //  $(".mobile-side-menu-container").removeClass("show");
        $(".file-upload-main").removeClass("hide");
        $(".mobile-file-upload-pop").removeClass("show");
    //    $(".mobile-side-menu-wrap").removeClass("show");

    }
}

