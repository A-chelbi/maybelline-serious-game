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
        message: 'Salut, ça va ?',
        reponse: 'ça va... et toi ?',
    },
    {
        message: "ça fait un moment qu'on ne s'est pas parlé mais j'ai beaucoup pensé à toi.",
        reponse: "Ah c'est sympa mais ça va t'inquiète.",
    },
    {
        message: "Ben justement je m'inquiète pour toi. D'habitude t'es hyper joyeuse, j'ai l'impression que tu te renfermes, ça fait des jours qu'on ne t'a pas vue... Tu veux qu'on en parle ?",
        reponse: "En ce moment, j'ai la flemme de tout, je dors hyper mal, j'me pose plein de questions…",
    },
    {
        message: "Je suis là tu sais. Tu peux compter sur moi, vraiment ! Tu te poses pleins de questions, genre ?",
        reponse: "Franchement, j'ai l'impression que je suis trop nulle, que j'sers à rien... Et puis la dernière fois que je suis sortie faire des courses, j'avais la gorge serrée, j'me suis mise à transpirer, j'avais le coeur qui battait hyper vite. j'ai réussi à rentrer chez moi mais j'étais grave mal... ",
    },
    {
        message: "Ah ouais c'est chaud… mais c'est bien que tu m'en parles. Tu sais tu comptes pour moi …  on va chercher des solutions ensemble.",
        reponse: "Ça m'fait du bien de t'en parler. Et j'crois que t'as raison j'ai besoin d'aide.",
    },
    {
        message: "Je suis sur qu'y a des applis, des sites ou des N° qu'on peut appeler pour se faire aider. On va trouver ça t'inquiète ! T'es dispo cet aprèm ou demain qu'on regarde ensemble? On pourrait faire un tour après.",
        reponse: "Je suis pas sûre encore pour la ballade &#128522; mais je veux bien qu'on se voit demain, ça me fera du bien. Merci d'être là…",
    },
];

const dialog = [
    {
        message: "Moi ça va super, plein de trucs trop cool à te raconter.",
        popup: "Il n'y a pas de bonne ou de mauvaise réponse, cependant ce message ne va pas forcément encourager la personne à se confier. L'important est de montrer que tu es là pour l'autre.",
        rightAnswer: false
    },
    {
        message: "Ça fait un moment qu'on ne s'est pas parlé mais j'ai beaucoup pensé à toi.",
        popup: "Bravo tu as sû choisir les mots pour ouvrir le dialogue. Tu as installé un climat de confiance qui va permettre à la personne de se confier. Continuons la discussion.",
        rightAnswer: true
    },
    {
        message: "T'es sûr que ça va ? On peut en parler si tu veux.",
        popup: "Il n'y a pas de bonne ou de mauvaise réponse, cependant ce message est un peu trop direct et ne laisse pas le temps à la personne de se sentir à l'aise pour te parler.",
        rightAnswer: false
    },
    {
        message: "Ben justement je m'inquiète pour toi. D'habitude t'es hyper joyeuse, j'ai l'impression que tu te renfermes, ça fait des jours qu'on ne t'a pas vue... Tu veux qu'on en parle ?",
        popup: "Bravo tu as sû choisir les mots pour oser en parler. Tu as montré que tu es attentif à la personne et tu as exprimé ton inquiétude. Continue comme ça.",
        rightAnswer: true
    },
    {
        message: "OK OK j'insiste pas…",
        popup: "Cette réponse ne va pas te permettre de poursuivre la discussion. Tu sais, exprimer ton inquiétude pour la personne n'est pas intrusif, au contraire cela va l'aider à partager ses émotions.",
        rightAnswer: false
    },
    {
        message: "T'es sûre ? Tiens regarde cette vidéo pour te changer les idées, c'est trop drôle.",
        popup: "Bien essayé mais lui changer les idées ne sera sans doute pas suffisant pour aider la personne et ne te permettra pas de comprendre les raisons de son mal-être.",
        rightAnswer: false
    },
    {
        message: "Je sentais bien que ça n'allait pas…",
        popup: "Cette réponse te permet de confirmer tes impressions, mais n'apporte pas de réconfort à la personne.",
        rightAnswer: false
    },
    {
        message: "Je suis là tu sais. Tu peux compter sur moi, vraiment ! Tu te poses pleins de questions, genre ?",
        popup: "Bravo tu as sû choisir les mots pour montrer que tu es présent et concerné. Tu vas lui permettre d'exprimer plus ce qu'elle ressent.",
        rightAnswer: true
    },
    {
        message: "Essaie de te reposer au max, c'est peut-être juste un gros coup de fatigue, ça va aller mieux.",
        popup: "Ta réponse est sympa, mais elle minimise ses problèmes et ne va pas lui permettre de continuer à se confier. Elle ne va non plus te permettre de comprendre ce qui ne va pas.",
        rightAnswer: false
    },
    {
        message: "Ah ouais c'est chaud… mais c'est bien que tu m'en parles. Tu sais tu comptes pour moi …  on va chercher des solutions ensemble.",
        popup: "Bravo tu as sû choisir les mots pour la rassurer et lui montrer ton soutien.",
        rightAnswer: true
    },
    {
        message: "Qu'est-ce que je peux faire pour t'aider ?",
        popup: "Bonne idée. Mais tu la mets dans la situation difficile de devoir trouver des solutions pour l'aider.",
        rightAnswer: false
    },
    {
        message: "Mais non, tu sais très bien que c'est pas vrai, t'es la meilleure ! &#10084;",
        popup: "Tentative interessante, mais cette réponse met en doute ce qu'elle ressent. Ça pourait affecter le climat de confiance que tu as réussi à installer.",
        rightAnswer: false
    },
    {
        message: "Je serai toujours là pour toi. Tu m'appelles quand tu veux.",
        popup: "L'intention est bonne mais si tu veux rester vigilant, il est préférable que tu l'appelles. La tendance à s'isoler que tu as observée plus-tôt pourrait l'empêcher de le faire.",
        rightAnswer: false
    },
    {
        message: "Je suis sur qu'y a des applis, des sites ou des N° qu'on peut appeler pour se faire aider. On va trouver ça t'inquiète ! T'es dispo cet aprèm ou demain qu'on regarde ensemble? On pourrait faire un tour après.",
        popup: "Bravo tu as sû faire preuve d'attention et de bienveillance et proposer des actions concrètes pour l'accompagner.",
        rightAnswer: true
    },
    {
        message: "T'as déjà pensé à aller voir un psy ?",
        popup: "C'est peut-être un peu tôt pour lui proposer ça, différentes ressources et accompagnements existent. Tu pourrais lui proposer de la voir pour faire des recherches  et trouver l'aide la plus adaptée.",
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