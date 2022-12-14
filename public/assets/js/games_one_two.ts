// import Swiper JS
import Swiper from 'swiper/bundle';

/**
    Game one
-----------------------------------------------------------*/
const gameAreaElement = document.querySelector('#game-area');
const foundEelemntsNumbr = document.querySelector('#found_areas');
const imageWithErrorElement = document.querySelector('#image-with-errors') as HTMLImageElement;
const imageWithErrorParts = document.getElementsByClassName("image-with-error-parts");

const mapArea = document.getElementsByTagName("area")[0];

const modal = document.getElementById("myModal");
const modalBg = document.getElementById("modal_bg");
const span = document.getElementsByClassName("close")[0] as HTMLImageElement;

const modalSbuTitle = document.querySelector("#modal_subtitle");
const modalContent = document.querySelector("#modal_content");

const inGameModalSubtitle = document.getElementsByClassName("modal_subtitle");
const inGameModalContent = document.getElementsByClassName("modal_content");

let missingAreas = imageWithErrorParts.length;
let foundAreas = 0;

if (gameAreaElement) {

    foundEelemntsNumbr.innerHTML = '0';


    window.onload = () => {
        const imageOriginalSizeWidth = imageWithErrorElement.naturalWidth;
        const imageOriginalSizeHeight = imageWithErrorElement.naturalHeight;
        const imageCurrentSizeWidth = imageWithErrorElement.width;
        const imageCurrentSizeHeight = imageWithErrorElement.height;

        const imageWidthRatio = imageCurrentSizeWidth / imageOriginalSizeWidth;
        const imageHeightRatio = imageCurrentSizeHeight / imageOriginalSizeHeight;

        mapArea.addEventListener('click', (ev) => {
            addSuccessCheck(document.getElementById("image_margot"));
            document.getElementById("image_margot").classList.add('found_element');

            modal.style.display = "block";
            modalCard.classList.add("visible");

            cloneElements(inGameModalSubtitle[0], modalSbuTitle);
            cloneElements(inGameModalContent[0], modalContent);

            foundEelemntsNumbr.innerHTML = foundAreas.toString();
        }, false);

        for (let index = 0; index < imageWithErrorParts.length; index++) {
            const imageWithErrorPart = imageWithErrorParts[index];

            // (imageWithErrorPart as HTMLImageElement).style.top = (imageWithErrorPart as HTMLImageElement).offsetTop * imageHeightRatio + 'px';
            // (imageWithErrorPart as HTMLImageElement).style.left = (imageWithErrorPart as HTMLImageElement).offsetLeft * imageWidthRatio + 'px';
            (imageWithErrorPart as HTMLImageElement).style.width = (imageWithErrorPart as HTMLImageElement).width * imageWidthRatio + 'px';
            (imageWithErrorPart as HTMLImageElement).style.height = (imageWithErrorPart as HTMLImageElement).height * imageHeightRatio + 'px';

            imageWithErrorPart.addEventListener('click', (ev) => {

                if (!imageWithErrorPart.classList.contains('image_margot')) {
                    imageWithErrorPart.classList.add('found_element');
                    addSuccessCheck(imageWithErrorPart);

                    modal.style.display = "block";
                    modalCard.classList.add("visible");

                    if (index == 4) {
                        cloneElements(inGameModalSubtitle[index], modalSbuTitle);
                        cloneElements(inGameModalContent[index], modalContent);
                    } else {
                        cloneElements(inGameModalSubtitle[index + 1], modalSbuTitle);
                        cloneElements(inGameModalContent[index + 1], modalContent);
                    }

                    foundEelemntsNumbr.innerHTML = foundAreas.toString();
                }

            }, false);
        }

        function addSuccessCheck(imageCurrentSuccessArea: any) {
            const successImage = document.createElement('img');
            successImage.src = '/assets/img/colored-check.png';
            successImage.classList.add('green-check');
            successImage.style.width = 30 + 'px';
            successImage.style.height = 30 + 'px';
            successImage.style.top = ((imageCurrentSuccessArea.offsetTop) + (imageCurrentSuccessArea.offsetHeight / 2) - 15) + 'px';
            successImage.style.left = ((imageCurrentSuccessArea.offsetLeft) + (imageCurrentSuccessArea.offsetWidth / 2) - 15) + 'px';

            imageCurrentSuccessArea.style.pointerEvents = 'none';
            foundAreas = foundAreas + 1;
            missingAreas = missingAreas - 1;
            gameAreaElement.appendChild(successImage);
        }
    };

    // Close the modal with close button
    span.onclick = function () {
        modal.style.display = "none";
        modalCard.classList.remove("visible");

        if (missingAreas === 0) {
            window.location.href = "/jeux/apprenez-a-reperer-les-signes/success";
        }
    }

    // Close the modal when clicking anywhere on the screen
    modalBg.onclick = function () {
        modal.style.display = "none";
        modalCard.classList.remove("visible");

        if (missingAreas === 0) {
            window.location.href = "/jeux/apprenez-a-reperer-les-signes/success";
        }
    }

};


// Expend Modal
const modalCard = document.getElementsByClassName('modal_inner')[0] as HTMLImageElement;

if (modalCard) {
    modalCard.onclick = function () {
        modalCard.classList.toggle("visible");
    }
}

// Clone html elements
function cloneElements(elementTobeCloned: any, clone: any) {
    clone.innerHTML = elementTobeCloned.innerHTML;
}

function copyElements(elementTobeCloned: any, clone: any) {
    clone.innerHTML = elementTobeCloned;
}

/**
    Swiper __page Game one
*/
if (screen.width < 760) {
    const gameSwiper = new Swiper('#game_swiper-container', {
        // Optional parameters
        loop: false,
        slidesPerView: "auto",
        spaceBetween: 20,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}


/**
    Game Two
-----------------------------------------------------------*/

//*  Game two part One : Chat */

const inputField = <HTMLInputElement>document.getElementById("chat");
const gamePartTwo = document.getElementById("game_two_part_two");
const gameMultiChoiceAreas = document.getElementsByClassName("message_box__container");
const choiseMessage = document.getElementsByClassName("choice_response");

const chatBox = document.querySelector(".chat_box");
const continueBtn = document.getElementById("continue");

const seenBox = document.getElementsByClassName('seen_box');
const messageBox = document.getElementsByClassName('message');
const responseBox = document.getElementsByClassName('response');

var snd = new Audio('/assets/sounds/definite-555.mp3'); // buffers automatically when created

let roundsCount = 0; // Used to count numbr of times the user plays
let dialogCount = roundsCount + 3; // Used to count the index of dialog after each play 
let dialogIndex = 0; // Used as index to loop throught the dialog after each play 

let rightAnswerClicked = false;
let rightAnswerClickedOnce = false;

let pointer = 0; // Used for detecting a selected element
let rightAnswerIndex = 0; // Used for detecting a selected element
let newDialogIndex = 0; //Used as index for the popup of each selected answer in dialog

const chat = [
    {
        message: 'Salut, ??a va ?',
        reponse: '??a va... et toi ?',
    },
    {
        message: "??a fait un moment qu'on ne s'est pas parl?? mais j'ai beaucoup pens?? ?? toi.",
        reponse: "Ah c'est sympa mais ??a va t'inqui??te.",
    },
    {
        message: "Ben justement je m'inqui??te pour toi. D'habitude t'es hyper joyeuse, j'ai l'impression que tu te renfermes, ??a fait des jours qu'on ne t'a pas vue... Tu veux qu'on en parle ?",
        reponse: "En ce moment, j'ai la flemme de tout, je dors hyper mal, j'me pose plein de questions???",
    },
    {
        message: "Je suis l?? tu sais. Tu peux compter sur moi, vraiment ! Tu te poses pleins de questions, genre ?",
        reponse: "Franchement, j'ai l'impression que je suis trop nulle, que j'sers ?? rien... Et puis la derni??re fois que je suis sortie faire des courses, j'avais la gorge serr??e, j'me suis mise ?? transpirer, j'avais le coeur qui battait hyper vite. j'ai r??ussi ?? rentrer chez moi mais j'??tais grave mal... ",
    },
    {
        message: "Ah ouais c'est chaud??? mais c'est bien que tu m'en parles. Tu sais tu comptes pour moi ???  on va chercher des solutions ensemble.",
        reponse: "??a m'fait du bien de t'en parler. Et j'crois que t'as raison j'ai besoin d'aide.",
    },
    {
        message: "Je suis sur qu'y a des applis, des sites ou des N?? qu'on peut appeler pour se faire aider. On va trouver ??a t'inqui??te ! T'es dispo cet apr??m ou demain qu'on regarde ensemble? On pourrait faire un tour apr??s.",
        reponse: "Je suis pas s??re encore pour la ballade &#128522; mais je veux bien qu'on se voit demain, ??a me fera du bien. Merci d'??tre l?????",
    },
];

const dialog = [
    {
        message: "Moi ??a va super, plein de trucs trop cool ?? te raconter.",
        popup: "Il n'y a pas de bonne ou de mauvaise r??ponse, cependant ce message ne va pas forc??ment encourager la personne ?? se confier. L'important est de montrer que tu es l?? pour l'autre.",
        rightAnswer: false
    },
    {
        message: "??a fait un moment qu'on ne s'est pas parl?? mais j'ai beaucoup pens?? ?? toi.",
        popup: "Bravo tu as s?? choisir les mots pour ouvrir le dialogue. Tu as install?? un climat de confiance qui va permettre ?? la personne de se confier. Continuons la discussion.",
        rightAnswer: true
    },
    {
        message: "T'es s??r que ??a va ? On peut en parler si tu veux.",
        popup: "Il n'y a pas de bonne ou de mauvaise r??ponse, cependant ce message est un peu trop direct et ne laisse pas le temps ?? la personne de se sentir ?? l'aise pour te parler.",
        rightAnswer: false
    },
    {
        message: "Ben justement je m'inqui??te pour toi. D'habitude t'es hyper joyeuse, j'ai l'impression que tu te renfermes, ??a fait des jours qu'on ne t'a pas vue... Tu veux qu'on en parle ?",
        popup: "Bravo tu as s?? choisir les mots pour oser en parler. Tu as montr?? que tu es attentif ?? la personne et tu as exprim?? ton inqui??tude. Continue comme ??a.",
        rightAnswer: true
    },
    {
        message: "OK OK j'insiste pas???",
        popup: "Cette r??ponse ne va pas te permettre de poursuivre la discussion. Tu sais, exprimer ton inqui??tude pour la personne n'est pas intrusif, au contraire cela va l'aider ?? partager ses ??motions.",
        rightAnswer: false
    },
    {
        message: "T'es s??re ? Tiens regarde cette vid??o pour te changer les id??es, c'est trop dr??le.",
        popup: "Bien essay?? mais lui changer les id??es ne sera sans doute pas suffisant pour aider la personne et ne te permettra pas de comprendre les raisons de son mal-??tre.",
        rightAnswer: false
    },
    {
        message: "Je sentais bien que ??a n'allait pas???",
        popup: "Cette r??ponse te permet de confirmer tes impressions, mais n'apporte pas de r??confort ?? la personne.",
        rightAnswer: false
    },
    {
        message: "Je suis l?? tu sais. Tu peux compter sur moi, vraiment ! Tu te poses pleins de questions, genre ?",
        popup: "Bravo tu as s?? choisir les mots pour montrer que tu es pr??sent et concern??. Tu vas lui permettre d'exprimer plus ce qu'elle ressent.",
        rightAnswer: true
    },
    {
        message: "Essaie de te reposer au max, c'est peut-??tre juste un gros coup de fatigue, ??a va aller mieux.",
        popup: "Ta r??ponse est sympa, mais elle minimise ses probl??mes et ne va pas lui permettre de continuer ?? se confier. Elle ne va non plus te permettre de comprendre ce qui ne va pas.",
        rightAnswer: false
    },
    {
        message: "Ah ouais c'est chaud??? mais c'est bien que tu m'en parles. Tu sais tu comptes pour moi ???  on va chercher des solutions ensemble.",
        popup: "Bravo tu as s?? choisir les mots pour la rassurer et lui montrer ton soutien.",
        rightAnswer: true
    },
    {
        message: "Qu'est-ce que je peux faire pour t'aider ?",
        popup: "Bonne id??e. Mais tu la mets dans la situation difficile de devoir trouver des solutions pour l'aider.",
        rightAnswer: false
    },
    {
        message: "Mais non, tu sais tr??s bien que c'est pas vrai, t'es la meilleure ! &#10084;",
        popup: "Tentative interessante, mais cette r??ponse met en doute ce qu'elle ressent. ??a pourait affecter le climat de confiance que tu as r??ussi ?? installer.",
        rightAnswer: false
    },
    {
        message: "Je serai toujours l?? pour toi. Tu m'appelles quand tu veux.",
        popup: "L'intention est bonne mais si tu veux rester vigilant, il est pr??f??rable que tu l'appelles. La tendance ?? s'isoler que tu as observ??e plus-t??t pourrait l'emp??cher de le faire.",
        rightAnswer: false
    },
    {
        message: "Je suis sur qu'y a des applis, des sites ou des N?? qu'on peut appeler pour se faire aider. On va trouver ??a t'inqui??te ! T'es dispo cet apr??m ou demain qu'on regarde ensemble? On pourrait faire un tour apr??s.",
        popup: "Bravo tu as s?? faire preuve d'attention et de bienveillance et proposer des actions concr??tes pour l'accompagner.",
        rightAnswer: true
    },
    {
        message: "T'as d??j?? pens?? ?? aller voir un psy ?",
        popup: "C'est peut-??tre un peu t??t pour lui proposer ??a, diff??rentes ressources et accompagnements existent. Tu pourrais lui proposer de la voir pour faire des recherches  et trouver l'aide la plus adapt??e.",
        rightAnswer: false
    },
];


if (inputField) {
    inputField.disabled = true;

    // Start chat 
    chatRound(roundsCount, chat[roundsCount].message, chat[roundsCount].reponse);

    inputField.addEventListener('click', evt => {
        gamePartTwo.classList.remove('hidden_content');

        // Rset Elements and remove selected class 
        document.getElementById('send_message').classList.add('hidden_content');
        document.getElementById('send_message_text').classList.remove('hidden_content');
        chatBox.classList.remove('colored_input');
        inputField.disabled = true;
        inputField.readOnly = false;

        let i = 0;
        rightAnswerClicked = false;

        for (let index = 0; index < dialogCount; index++) {
            if (choiseMessage[index]) {
                choiseMessage[index].classList.remove('selected');
                pointer = 0
            }
        }

        // Add New answer for a new chat
        for (let index = dialogIndex; index < dialogCount; index++) {

            copyElements(dialog[index].message, choiseMessage[i]);
            i++;
        }

    })

}

//*  Game two part two : select response*/
if (gamePartTwo) {

    for (let i = 0; i < dialogCount; i++) {
        choiseMessage[i].classList.remove('colored_bg');
        choiseMessage[i].classList.remove('selected_right');

        choiseMessage[i].addEventListener('click', evt => {
            // add colored background to selected element
            choiseMessage[i].classList.add('colored_bg');

            // detect the right answer
            if (dialog[newDialogIndex + i].rightAnswer) {
                rightAnswerClicked = true;
                rightAnswerClickedOnce = true;
                continueBtn.classList.add('hidden_content');
            }

            // display Modal
            setTimeout(function () {
                modal.style.display = "block";
                modalCard.classList.toggle("visible");



                if (!rightAnswerClicked) {
                    // show Continue Button
                    continueBtn.classList.remove('hidden_content');
                    // Add seen to wrong answers only
                    addSeenCheck(gameMultiChoiceAreas[pointer]);

                    document.getElementById('send_message').classList.add('selected');
                    modal.style.height = "100%";

                    choiseMessage[pointer].classList.add('selected');
                }

                // Modal Content
                copyElements(dialog[newDialogIndex + i].popup, modalContent);

                document.getElementById('send_message').classList.remove('hidden_content');

                if (rightAnswerClicked) {
                    document.getElementById('send_message').classList.remove('selected');
                    if (screen.width < 400) {
                        modal.style.height = "77vh";
                    } else {
                        modal.style.height = "83vh";
                    }

                    choiseMessage[pointer].classList.add('selected_right');
                }

            }, 300);

            // Hide "que repondrais tu"
            document.getElementById('send_message_text').classList.add('hidden_content');

            pointer = i;
        })
    }

    // Close the modal with close button
    span.onclick = function () {
        whenClosingTheModal()
    }

    // Close the modal when clicking anywhere on the screen
    modalBg.onclick = function () {
        whenClosingTheModal()
    }

    // Button 'contiune' also used to close Modal
    continueBtn.addEventListener('click', e => {
        whenClosingTheModal()
    })

    // Flow of the game
    const sendMessage = document.getElementById("send_message");

    if (sendMessage) {
        sendMessage.addEventListener('click', e => {
            if (modal.style.display = "block") {
                whenClosingTheModal();
            }

            choiseMessage[rightAnswerIndex].classList.remove('colored_bg');
            choiseMessage[rightAnswerIndex].classList.remove('selected_right');
            choiseMessage[0].scrollIntoView();

            gamePartTwo.classList.add('hidden_content');
            inputField.disabled = true;

            roundsCount += 1;
            dialogIndex = dialogCount;
            dialogCount = dialogCount + 3;
            newDialogIndex = dialogIndex;
            rightAnswerClickedOnce = false;

            // Remove all checkmarks
            removeSeenCheck();

            chatRound(roundsCount, chat[roundsCount].message, chat[roundsCount].reponse);

            if (roundsCount == 5) {
                setTimeout(function () {
                    inputField.style.display = "none";

                    addFinishBtn(chatBox);
                }, 6000);
            }

        })
    }
}

function whenClosingTheModal() {
    modal.style.display = "none";
    modalCard.classList.remove("visible");

    // remove colored background from priviously selected element if the element is not the right answer
    if (!rightAnswerClicked) {
        choiseMessage[pointer].classList.remove('colored_bg');
        choiseMessage[pointer].classList.remove('selected_right');
    }

    if (rightAnswerClicked) {
        rightAnswerIndex = pointer;
        choiseMessage[pointer].classList.add('colored_bg');
        choiseMessage[pointer].classList.add('selected_right');
    }

    if (rightAnswerClickedOnce) {
        document.getElementById('send_message').classList.remove('selected');
    }

    rightAnswerClicked = false;
}

function createMessageBox(message: any, index: any) {
    const messageBox = document.querySelectorAll('.message_box p');

    messageBox[index].innerHTML = message;
    messageBox[index].scrollIntoView();
}

function createResponseBox(message: any, index: any) {
    const responseBox = document.querySelectorAll('.response_box p');

    responseBox[index].innerHTML = message;
    responseBox[index].scrollIntoView();
}

function chatRound(roundNumbr: any, message: any, response: any) {
    if (roundNumbr == 0) {
        setTimeout(function () {
            document.getElementById('avatar_box').classList.add('hidden_content');
            messageBox[roundNumbr].classList.remove('hidden_content');
            createMessageBox(message, roundNumbr);

            snd.play();
        }, 3000);
    }

    if (roundNumbr !== 0) {
        setTimeout(function () {
            messageBox[roundNumbr].classList.remove('hidden_content');
            createMessageBox(message, roundNumbr);
            snd.play();
        }, 1000);
    }

    setTimeout(function () {
        seenBox[roundNumbr].classList.remove('hidden_content');
        document.getElementById('writing_dots').classList.remove('hidden_content');
    }, 4000);

    setTimeout(function () {
        document.getElementById('writing_dots').classList.add('hidden_content');
        responseBox[roundNumbr].classList.remove('hidden_content');
        createResponseBox(response, roundNumbr);

        snd.play();
    }, 6000);

    if (roundNumbr !== 5) {
        setTimeout(function () {
            chatBox.classList.add('colored_input');
            inputField.disabled = false;
            inputField.readOnly = true;
        }, 6500);
    }
}


// Add check mark 
function addSeenCheck(messageCurrentSeenArea: any) {
    const seenPopup = document.createElement('img');
    seenPopup.src = '/assets/img/colored-check.png';
    seenPopup.classList.add('green-check');
    seenPopup.style.width = 30 + 'px';
    seenPopup.style.height = 30 + 'px';
    seenPopup.style.top = '0px';
    seenPopup.style.right = '-4px';

    messageCurrentSeenArea.appendChild(seenPopup);
}

// Remove all check marks 
function removeSeenCheck() {
    const seenPopups = document.querySelectorAll('.green-check');

    seenPopups.forEach(seenPopup => {
        seenPopup.remove();
    });

}

// Add finish button 
function addFinishBtn(section: any) {
    const btn = document.createElement('button');
    btn.innerHTML = "Terminer";
    btn.classList.add('btn');
    btn.classList.add('btn_bg_colored');
    btn.style.cursor = "pointer";

    btn.onclick = function () {
        window.location.href = "/jeux/choisir-les-mots/success";
    };

    section.appendChild(btn);
}