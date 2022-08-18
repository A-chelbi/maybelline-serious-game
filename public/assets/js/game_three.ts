
/**
    Game Three
-----------------------------------------------------------*/
const imageParts = document.getElementsByClassName("photo_pool__image");
const foundImagesNumbr = document.getElementById("found_image");
const singleSuccessBtns = document.getElementsByClassName("single_sucess_btn");
const singleSuccessBtnId = document.getElementById("single_sucess_btn");

let results: any[] = [];
let counter = getCookiesNubmre();

const clickSnd = new Audio('/assets/sounds/knob-458.mp3'); // Click on image sound
const correctSnd = new Audio('/assets/sounds/insight-578.mp3'); // Correct images sound
const wrongSnd = new Audio('/assets/sounds/brute-force-22.mp3'); // Wrong images sound
const sucessSnd = new Audio('/assets/sounds/i-demand-attention-244.mp3'); // Game Sucess sound

if (imageParts) {
    if (foundImagesNumbr) foundImagesNumbr.innerHTML = '0';

    for (let index = 0; index < imageParts.length; index++) {
        // Check for cookies
        let imageDataArg = (imageParts[index] as HTMLElement).dataset.image; // Get image data attribute
        let dataCookies = getCookie("dataImage" + imageDataArg); // Get cookies 

        if (!dataCookies) {
            // Show image if not already selected
            imageParts[index].classList.remove('hidden_content');
        }

        if (dataCookies) {
            // Assigne cookies to trak number of images found
            foundImagesNumbr.innerHTML = getCookiesNubmre().toString();
        }

        imageParts[index].addEventListener('click', e => {
            // clickSnd.play();

            // Unselect image when clicked for the second time
            if (imageParts[index].classList.contains('selected_part')) {
                check("selected_part", 'remove');
                results = [];
            }

            // Select Image and get the data-image arg
            if (!imageParts[index].classList.contains('selected_part') && !imageParts[index].classList.contains('correct')) {
                imageParts[index].classList.add('selected_part');
                // get data-image arg 
                var imageDataArgVar = (imageParts[index] as HTMLElement).dataset.image;
                results.push(imageDataArgVar);
            }

            // Compare data-image arg of the selected images
            if (results.length > 1) {

                if (results[0] === results[1]) {
                    // correctSnd.play();

                    check("correct", 'add');
                    check("selected_part", 'remove');

                    counter = getCookiesNubmre();
                    results = [];

                    // Assigne cookie when correct images couple is selected
                    checkCookie(imageDataArgVar);
                    setTimeout(function () {
                        window.location.href = "/jeux/trouver-de-l-aide/single-success/" + imageDataArgVar;
                    }, 200);
                    
                } else {
                    check("wrong", 'add');

                    // restore data when wrong images are selected
                    setTimeout(function () {
                        // wrongSnd.play();
                        check("wrong", 'remove');
                        check("selected_part", 'remove');
                    }, 500);

                    results = [];
                }
            }
        })
    }

    // Finish the game
    win();
}

// Add or Remove class Name
function check(className: string, action: string) {
    let x = document.getElementsByClassName("selected_part");

    setTimeout(function () {
        for (let i = (x.length - 1); i >= 0; i--) {
            if (action == 'add') { x[i].classList.add(className); }

            if (action == 'remove') { x[i].classList.remove(className); }
        }

    }, 500);
}

// Finish the game function
function win() {

    if (counter === 3) {

        // Change link of 'Continue' button in case of success
        Array.from(singleSuccessBtns).forEach(singleSuccessBtn => {
            singleSuccessBtn.addEventListener('click', e => {
                e.preventDefault;
                // sucessSnd.play();
                
                singleSuccessBtn.setAttribute('href', "/jeux/trouver-de-l-aide/success");
                return false;
            });
        });

        // Reset Counter of number of correct images 
        counter = 0;
        
        // Expire all cookies to reset the game 
        expireCookies();
    }
}

//* Dealing with cookies -------------------------------------/

// Add New cookie Function
function setCookie(cname: any, cvalue: any, exdays: any) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Get Cookie by Name
function getCookie(cname: any) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Set Cookie if does not exist
function checkCookie(data: string) {
    let dataImage = getCookie("dataImage" + data);

    if (dataImage != "") {
        // counter = 0;
    } else {
        dataImage = data;
        setCookie("dataImage" + data, dataImage, 365);
    }
}

// Get the numbr of existing Cookies
function getCookiesNubmre() {
    let ca = document.cookie.split(';');
    let cookiesNumber = ca.filter(value => {
        if (value.includes('dataImage')) return value;
    });

    return cookiesNumber.length;
}

// Expire all Cookies
function expireCookies() {
    const cookiesNames = ['dataImageone', 'dataImagetwo', 'dataImagethree', 'dataImagefour']

    cookiesNames.forEach(cookiesName => {
        setCookie(cookiesName, "", "");
    });
}
