let cliWidth;
let movie = document.getElementById('movie');
let play = false;
let progress = document.querySelector('progress');
let volumeVideo = document.querySelector('#volume');

let myHero = document.getElementsByClassName('team-flex-img')[0];

let goTop = document.getElementsByClassName('btn-top')[0];

let scrolled;
let timer;

window.onload = function(){
    cliWidth = document.body.clientWidth;
    setTimeout(function (){
        document.querySelector('.head-text h1').classList.add('animated', 'bounceIn');
    }, 1000);
};

//плавная прокрутка к якорю
// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 300,
    framesCount = 20;

anchors.forEach(function(item) {
    // каждому якорю присваиваем обработчик события
    item.addEventListener('click', function(e) {
        // убираем стандартное поведение
        e.preventDefault();
        // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top;

        // запускаем интервал, в котором
        let scroller = setInterval(function() {
            // считаем на сколько скроллить за 1 такт
            let scrollBy = coordY / framesCount;

            // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
            // и дно страницы не достигнуто
            if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                // то скроллим на к-во пикселей, которое соответствует одному такту
                window.scrollBy(0, scrollBy);
            } else {
                // иначе добираемся до элемента и выходим из интервала
                window.scrollTo(0, coordY);
                clearInterval(scroller);
            }
            // время интервала равняется частному от времени анимации и к-ва кадров
        }, animationTime / framesCount);
    });
});

goTop.onclick = ()=>{
    scrolled = window.pageYOffset;
    scrollToTop();
};

function scrollToTop(){
  if(scrolled > 0){
      window.scrollTo(0, scrolled);
      scrolled = scrolled - 100;
      timer = setTimeout(scrollToTop,30);
  }  else {
      clearInterval(timer);
      window.scrollTo(0,0);
  }
};

//клик по изображению сотрудников
myHero.addEventListener('click', (e)=>{
    let target = e.target;
    if(e.target.classList.contains('tfi')){
        magicFun(target);
    }
});
//функция смены основного фото и информации о работнике
function magicFun(eData) {
    let textArr = document.querySelectorAll('.tfs');
    let photoArr = document.querySelectorAll('.tfp');

    textArr[0].classList.remove('visible');
    photoArr[0].classList.remove('visible');
    for (let i = 0; i < textArr.length; i++) {
        if (textArr[i].classList.contains('visible')) {
            textArr[i].classList.remove('visible');
            photoArr[i].classList.remove('visible')
        }
    }
    let dNum = eData.getAttribute('data-num');
    textArr[dNum].classList.add('visible');
    photoArr[dNum].classList.add('visible');
}
//премотка при клике на полосе прокрутки
progress.onclick = videoRewind;
//get movie volume value
movie.volume = volumeVideo.getAttribute('value')/100;
//change movie volume value from input-range
volumeVideo.addEventListener('input', changingMovieVolume);

function changingMovieVolume(){
    let v = this.value;
    let volumeText = document.querySelector('.head-video-volume > p > b');
    volumeText.innerText = v;
    movie.volume = v/100;
}

//play movie after click
movie.addEventListener('click', () => {
    if(play == false){
        movie.play();
        play = true;
    } else if (play == true){
        movie.pause();
        play = false;
    }
});

//полоса прокрутки видео
movie.ontimeupdate = progressUpdate;

function progressUpdate(){
    let d = movie.duration;
    let c = movie.currentTime;
    progress.value = 100*c/d;
}
function videoRewind(){
    let w = this.offsetWidth;
    let o = event.offsetX;
    this.value = 100*o/w;
    movie.pause();
    movie.currentTime = movie.duration*o/w;
    movie.play();
}

//new style for cite
document.onscroll = ()=> {
    let scrollHeight = window.pageYOffset;
    let provide = document.getElementsByClassName('provide-flex')[0];
    let products = document.getElementsByClassName('products')[0];
    //change header text message
    changeHeaderTextClass();

    if (document.documentElement.clientHeight - provide.getBoundingClientRect().top> 50){
        provide.children[0].classList.add('animated','bounceInLeft');
        provide.children[1].classList.add('animated','bounceInRight');
    }
    if (document.documentElement.clientHeight - products.getBoundingClientRect().top> 50){
        products.classList.add('animated','bounceInUp');
    }
    if (document.documentElement.clientHeight - provide.getBoundingClientRect().top> 20){
        setTimeout(()=>{
            provide.children[0].classList.add('animated','bounceInLeft');
            provide.children[1].classList.add('animated','bounceInRight');
        }, 300)
    }
    if (scrollHeight < 1000){
        goTop.style.display = '';
    }
    if(scrollHeight >= 1000){
        goTop.style.display = 'inline-block';
    }
};

function changeHeaderTextClass(){
    let cv = document.getElementsByClassName('head-text')[0];
    if (cv.getBoundingClientRect().bottom < -200){
        setTimeout(()=> {
            let header = document.getElementById('header');
            let cvText = document.querySelectorAll('.head-text > p')
            cvText[0].classList.remove('visible');
            cvText[1].classList.add('visible');
            header.classList.add('bac-image')
        }, 2000);
    }
}
let btnSubmit = document.getElementById('btn-submit');
btnSubmit.onclick = function(){
    let form = document.getElementById('form1');
    form.submit();
};
