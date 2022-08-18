/**
    Reading progress bar
*/

const addProgressBar = () => {
    const element = document.createElement('div');
    element.id = 'progress-container';
    element.innerHTML = '<div id="progress-bar"></div>';

    document.body.appendChild(element);
};

const readingProgress = (target: any) => {

    const winTop = window.pageYOffset || document.documentElement.scrollTop;
    const progressBar = document.getElementById('progress-bar');
    const targetBottom = target.offsetTop + target.scrollHeight;
    const windowBottom = winTop + window.outerHeight;
    const progress = 100 - (((targetBottom - windowBottom + window.outerHeight / 3) / (targetBottom - window.outerHeight + window.outerHeight / 3)) * 100);

    progressBar.style.width = progress + '%';

    (progress > 100) ? document.querySelector('#progress-container').classList.add('ready') : document.querySelector('#progress-container').classList.remove('ready');
};

document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('#game_one_article');
    if (content) {
        addProgressBar();
        readingProgress(content);
        window.addEventListener('scroll', () => {
            readingProgress(content);
        });
    }
});