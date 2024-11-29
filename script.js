/*--------CHANGER LE NBR DE CHRONOS--------*/
const nbChronos = 40;

/*-------CODE-------*/
const chronoContainer = document.querySelector('.chrono-container');

for (let i = 0; i < nbChronos; i++) {
    const chronoElement = createChronoElement();
    chronoContainer.appendChild(chronoElement);
}

function createChronoElement() {
    const chronoElement = document.createElement('div');
    chronoElement.classList.add('chrono');

    const display = document.createElement('div');
    display.classList.add('chrono__display');
    display.textContent = '00:00:00';

    const startButton = document.createElement('button');
    startButton.classList.add('chrono__start');
    startButton.textContent = 'Start';
    
    const stopButton = document.createElement('button');
    stopButton.classList.add('chrono__stop');
    stopButton.textContent = 'Stop';
    
    const resetButton = document.createElement('button');
    resetButton.classList.add('chrono__reset');
    resetButton.textContent = 'Reset';
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('chrono__buttons');
    buttonsContainer.appendChild(startButton);
    buttonsContainer.appendChild(stopButton);
    buttonsContainer.appendChild(resetButton);

    chronoElement.appendChild(display);
    chronoElement.appendChild(buttonsContainer);

    let intervalId;
    let startTime;
    let elapsedTime = 0;

    startButton.addEventListener('click', () => {
        if (!intervalId) {
            startTime = Date.now() - elapsedTime;
            display.textContent = formatTime(elapsedTime);
            intervalId = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                display.textContent = formatTime(elapsedTime);
            }, 1000);
        }
    });
    

    stopButton.addEventListener('click', () => {
        clearInterval(intervalId);
        intervalId = null;
    });

    resetButton.addEventListener('click', () => {
        clearInterval(intervalId);
        intervalId = null;
        elapsedTime = 0;
        display.textContent = '00:00:00';
    });

    return chronoElement;
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}