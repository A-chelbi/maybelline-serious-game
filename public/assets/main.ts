// Import Swiper JS
import Swiper from 'swiper/bundle';

// Import files
import './js/games_one_two';
import './js/game_three';
import './js/menu';
import './js/progress-bar';
import './js/sticky_menu_share';


/**
    Scroll down Button
*/
function scrollDown() {
    const scrollDownBtn = document.getElementById('btn_scroll_down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({
                top: 700,
                left: 700,
                behavior: 'smooth'
            });
        })
    }
}

scrollDown();


/**
    Swiper __page article
*/
const swiper = new Swiper('#swiper-container', {
    // Optional parameters
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView: 'auto',
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    }
});

