/**
    Burger menu
*/

const body = document.getElementsByTagName('body');
const menu = document.querySelector('.menu');

const logoOne = document.getElementById('maybelline_logo');
const logoThree = document.getElementById('unafam_logo');

if (menu) {
    const btn = menu.querySelector('.nav-tgl');

    btn.addEventListener('click', evt => {
        menu.classList.toggle('active');
        body[0].classList.toggle('no-scroll');

        if (menu.classList.contains("active")) {
            logoOne.style.display = "inline-block";
            logoThree.style.display = "inline-block";
        }

        if ((!menu.classList.contains("active")) && (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)) {
            logoOne.style.display = "none";
            logoThree.style.display = "none";
        }
    })

    // Nav bar on scroll
    window.onscroll = function () {
        stickyHeader();
    };
}

/**
    Nav bar on scroll
*/

function stickyHeader() {
    const btn = document.querySelector('#start-game');
    const logoOne = document.getElementById('maybelline_logo');
    const logoTwo = document.getElementById('braveTogether_logo');
    const logoThree = document.getElementById('unafam_logo');

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        menu.classList.add("nav-lg");
        document.querySelector(".nav_items").classList.remove("black_and_white");

        // check if btn is not in page blog
        if (!btn.classList.contains("btn_bg_black")) {
            btn.classList.remove("btn_pink");
            btn.classList.add("btn_black");
        }

        // Hide logo on scroll
        logoOne.style.display = "none";
        logoThree.style.display = "none";

        // check if btn is in page blog
        if (btn.classList.contains("btn_bg_black")) {

            // change logo on scroll for blog page
            (logoTwo as HTMLImageElement).src = '/assets/img/logo_braveTogether.svg';
        }

    } else {
        document.querySelector("#menu").classList.remove("nav-lg");

        if (btn.classList.contains("btn_bg_black")) {

            document.querySelector(".nav_items").classList.add("black_and_white");

            // change logo on scroll for blog page
            (logoTwo as HTMLImageElement).src = '/assets/img/logo_braveTogether_black.svg';
        }

        // Show logos
        logoOne.style.display = "inline-block";
        logoThree.style.display = "inline-block";

        if (!btn.classList.contains("btn_bg_black")) {
            btn.classList.remove("btn_black");
            btn.classList.add("btn_pink");
        }
    }
}