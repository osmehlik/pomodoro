const pomodoroMinutes = 25;

const txtTimer = document.getElementById("timer");
const btnStart = document.getElementById("start");
const btnPause = document.getElementById("pause");
const btnReset = document.getElementById("reset");

let timerInterval = null;
let remainingSeconds = pomodoroMinutes * 60;

const getMinutes = () => Math.floor(remainingSeconds / 60);
const getSeconds = () => remainingSeconds % 60;
const padZeros = (seconds) => seconds < 10 ? "0" + seconds : seconds;

const updateDisplay = () => {
    txtTimer.textContent = `${padZeros(getMinutes())}:${padZeros(getSeconds())}`;
}

const onTimerZero = () => {
    clearInterval(timerInterval);
    btnPause.classList.add("hidden");
}

const onTimerTick = () => {
    if (remainingSeconds > 0) {
        remainingSeconds--;
    } else {
        onTimerZero();
    }
    updateDisplay();
}

const onStartClick = (e) => {
    e.preventDefault();
    btnStart.classList.add("hidden");
    btnPause.classList.remove("hidden");
    btnReset.classList.remove("hidden");
    timerInterval = setInterval(onTimerTick, 1000);
}

const onPauseClick = (e) => {
    e.preventDefault();
    btnStart.classList.remove("hidden");
    btnPause.classList.add("hidden");
    clearInterval(timerInterval);
}

const onResetClick = (e) => {
    e.preventDefault();
    btnStart.classList.remove("hidden");
    btnPause.classList.add("hidden");
    btnReset.classList.add("hidden")
    clearInterval(timerInterval);
    remainingSeconds = pomodoroMinutes * 60;
    updateDisplay();
}

btnStart.addEventListener("click", onStartClick);
btnPause.addEventListener("click", onPauseClick);
btnReset.addEventListener("click", onResetClick);
updateDisplay();