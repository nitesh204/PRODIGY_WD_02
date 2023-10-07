let startTime;
let running = false;
let interval;
let laps = [];
let lapNumber = 1;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function startStop() {
    if (running) {
        clearInterval(interval);
        startStopButton.textContent = "Start";
    } else {
        startTime = Date.now() - (laps.reduce((acc, lap) => acc + lap, 0) || 0);
        interval = setInterval(updateDisplay, 10);
        startStopButton.textContent = "Stop";
    }
    running = !running;
}

function updateDisplay() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    display.textContent = formattedTime;
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function reset() {
    clearInterval(interval);
    display.textContent = "00:00:00.000";
    running = false;
    startStopButton.textContent = "Start";
    laps = [];
    lapNumber = 1;
    lapsList.innerHTML = "";
}

function lap() {
    if (running) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        laps.push(elapsedTime);
        const formattedTime = formatTime(elapsedTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapNumber}: ${formattedTime}`;
        lapsList.appendChild(lapItem);
        lapNumber++;
    }
}

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
