let imgCategory;
let popupVisible = false;

$(document).ready(function () {

    /* 낮 / 밤 시간 체크 */
    //checkTimeAndShowDiv();

    /* 낮밤 테스트 */
    onClickTestBtn();
    $('.day-btn').addClass('on');
    document.getElementById('main-day').style.display = 'block';
    /* 낮밤 테스트 끝 */
    
    /* 애니메이션 이벤트 */
    $('.aniview').AniView({
        animateClass: 'animate__animated',
        scrollPollInterval: 20 // 스크롤 이벤트 감지
    });

    /* footer 슬라이드 이벤트 */
    $('.footer-content').slick({
        infinite: true,         //무한반복
        autoplay: true,          // 자동 슬라이딩 활성화
        autoplaySpeed: 1000,     // 슬라이딩 간격 (밀리초)
        slidesToShow: 7,         // 보여지는 이미지 수
        slidesToScroll: 1,       // 한 번에 스크롤되는 이미지 수
        speed: 1000,
        centerMode: true,
        // arrows: true,
        prevArrow: $('#footer-prev'),
        nextArrow: $('#footer-next'),
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });

    /* animate.css 이벤트 감지용
       IntersectionObserver : 요소가 화면에 포함되는지 관찰하는 web API
     */
    const animationObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const animation = $(target).data('av-animation');
                $(target).removeClass('animate__animated ' + animation);
                void target.offsetWidth;
                $(target).addClass('animate__animated ' + animation);

            }
        });
    }, {
        root: null,
        // rootMargin: '-30% 0px',
        threshold: 0
    });

    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('.num').each(function(){
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).text()}, {
                        duration: 3000,
                        step: function (now){
                            //  1, 2, 3 -> 01, 02, 03 변환
                            let formattedNumber = ('0' + Math.ceil(now)).slice(-2);
                            $(this).text(formattedNumber);
                        }
                    });
                });
            }
        });
    });

    /* 애니메이션 체크 */
    $('.aniview').each((index, element) => {
        animationObserver.observe(element);
    });

    /* 숫자 카운팅 체크 */
    $('.num').each((index, element) => {
        countObserver.observe(element);
    });

    // mouse hover 이벤트 체크
    $('.question-mark').hover(
        function () {
            if(!popupVisible) {
                // question-mark말고 추가 class 이름 가져오기
                imgCategory = $(this).attr('class').split(/\s+/).filter(cls => cls !== 'question-mark');
                imgCategory = imgCategory[0].replace("-question", "");
                checkMouseHover(imgCategory);
            }
        }
    );

    // 물음표 click 이벤트 체크
    $('.question-mark').click(
        function () {
            if(!popupVisible) {
                // question-mark말고 추가 class 이름 가져오기
                imgCategory = $(this).attr('class').split(/\s+/).filter(cls => cls !== 'question-mark');
                imgCategory = imgCategory[0].replace("-question","");
                clickContent(imgCategory);
                popupVisible = true;
            }

        }
    );

    // popup close 체크
    $('.close-popup').click(
        function () {
            // question-mark말고 추가 class 이름 가져오기
            imgCategory = $(this).attr('id').split(/\s+/);
            imgCategory = imgCategory[0].replace("-close","");
            closeContent(imgCategory);
            popupVisible = false;
        }
    );

    // 팝업 외부 클릭 시 팝업 닫기
    $(document).click(function(event) {
        let visibleContent;
        let visiblePopup;

        if (popupVisible && !$(event.target).closest('.click-content, .question-mark').length) {
            visibleContent = $('.click-content').not('.hide');
            visibleContent.each(function() {
                visiblePopup = $(this).attr('class').split(/\s+/).filter(cls => cls !== 'click-content' && cls !== 'hide');
            });
            if(visiblePopup != undefined){
                visiblePopup = visiblePopup[0].replace("-content","");
                closeContent(visiblePopup);
            }
            popupVisible = false;
        }
    });



});
/*
window.addEventListener('DOMContentLoaded', function(){

    gsap.registerPlugin(Flip);

    // 버튼 클릭 시 애니메이션 실행 (버튼 예: #animate-btn)
    $(".btntest").click(function() {
        // 애니메이션을 위한 상태 캡처
        const state = Flip.getState(".main-busan-img");

        // 이미지 이동 - jQuery를 사용해 클래스를 이동할 위치로 변경
        $(".main-busan-img-01").appendTo(".main-busan-container-after-01");
        $(".main-busan-img-03").appendTo(".main-busan-container-after-03");
        $(".main-busan-img-02").appendTo(".main-busan-container-after-02");

        // Flip 애니메이션 실행
        Flip.from(state, {
            absolute : true,
            duration: 3,
            ease: "power1.inOut",
            scale: true,
            onComplete: function() {
                setTimeout(function (){
                    gsap.to(".main-busan-container", {
                        opacity: 0,
                        duration: 2.5,
                    });
                },1000)
            }
        });
    });
});
*/

// 낮/밤 체크
function checkTimeAndShowDiv() {
    let now = new Date();
    let hour = now.getHours();

    if (hour >= 6 && hour < 18) {
        document.getElementById('main-day').style.display = 'block';

    } else {
        document.getElementById('main-night').style.display = 'block';
    }
}

// 낮/밤 테스트용 버튼
function onClickTestBtn(){

    $('.day-btn').on('click', () => {
        $('.day-btn').addClass('on');
        $('.night-btn').removeClass('on');
        $('#main-day').css('backgroundImage','url(../../images/main/main_day.webp)');

        $('#people-day').removeClass('night');
        $('#trash-day').removeClass('night');
        $('#mountain-day').removeClass('night');
    });

    $('.night-btn').on('click', () => {
        $('.night-btn').addClass('on');
        $('.day-btn').removeClass('on');
        $('#main-day').css('backgroundImage','url(../../images/main/main_night.webp)');

        $('#people-day').addClass('night');
        $('#trash-day').addClass('night');
        $('#mountain-day').addClass('night');
    });
}

// main mouse hover 체크
function checkMouseHover(category) {
    if($('.'+category+'-hover').hasClass('hide')){
        $('.'+category+'-hover').removeClass('hide');
    }else{
        $('.'+category+'-hover').addClass('hide');
    }
}

function clickContent(category) {
    let categoryList = ['people', 'satellite', 'trash', 'ship', 'mountain'];
    $('.' + category + '-content').removeClass('hide');
    $('#' + category + '-hover-day').removeClass('hide');
    $('#main-day').addClass('background-blur');
    categoryList.map(value => {
        if(value != category) {
            $(`.${value}-section`).addClass('blur');
        }
    });
}

// main popup close
function closeContent(category) {
    $('.' + category + '-content').addClass('hide');

    // question mark 보이기
    let elements = document.getElementsByClassName('question-mark');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.visibility = 'visible';
    }

    // 이미지 변경 & blur 처리
    $('#' + category + '-hover-day').addClass('hide');
    $('.' + category + '-hover').addClass('hide');
    $('#' + category + '-day').removeClass('hide');

    $('.blur').removeClass('blur');
    $('.background-blur').removeClass('background-blur');

}

function setLazyLoadObserver() {
    document.addEventListener("DOMContentLoaded", function () {
        const lazyImages = document.querySelectorAll("img.lazyload");
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove("lazyload");
                    img.classList.add("lazyloaded");
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    });
}