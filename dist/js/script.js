window.addEventListener('DOMContentLoaded', () => { 
    const menu = document.querySelector('.menu'),
          hamburger = document.querySelector('.hamburger'),
          closeMenu = document.querySelector('.menu__close'),
          overlay = document.querySelector('.overlay');

    hamburger.addEventListener('click', () => {
        menu.classList.add('visible');
        menu.classList.remove('hidden');
        overlay.classList.add('visible');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', () => {
        menu.classList.add('hidden');
        menu.classList.remove('visible');
        overlay.classList.add('hidden');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    });

    // slider

    let slideIndex = 1;
    let offset = 0;

    const slides = document.querySelectorAll('.main__slider-slide'),
          slider = document.querySelector('.main__slider'),
          next = document.querySelector('.main__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.main__slider-wrapper'),
          slidesField = document.querySelector('.main__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
    
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    const indicators = document.createElement('ol'),
    dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dots');
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            } else {
                current.textContent =  slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex-1].style.opacity = 1;
        });
    });

    //scroll 

//     function scrollTo(element) {
//         window.scroll({
//           left: 0, 
//           top: element.offsetTop, 
//           behavior: 'smooth'
//         });
//       }
      
//       const button = document.querySelector('.pageup');
//       const main = document.querySelector('.main');
      
//       button.addEventListener('click', () => {
//         scrollTo(main);
//     });


});