const activitiesLengthMinutes = {
    "Pomodoro": 25,
    "Short Break": 5,
    "Long Break": 20
};

const txtTimer = document.getElementById("timer");
const btnStart = document.getElementById("start");
const btnPause = document.getElementById("pause");
const btnReset = document.getElementById("reset");
const btnContinue = document.getElementById("continue");
const btnSkip = document.getElementById("skip");
const spanCurrentActivity = document.getElementById("currentActivity");
const spanCurrentStatus = document.getElementById("currentStatus");
const spanCurrentPomodoros = document.getElementById("currentPomodoros");

let currentActivity = "Pomodoro";
let currentStatus = "Not started";
let currentPomodoros = 0;

let timerInterval = null;
let remainingSeconds = activitiesLengthMinutes[currentActivity] * 60;

const getMinutes = () => Math.floor(remainingSeconds / 60);
const getSeconds = () => remainingSeconds % 60;
const padZeros = (val) => val < 10 ? "0" + val : val;
const hide = (el) => { el.classList.add("hidden"); }
const show = (el) => { el.classList.remove("hidden"); }

const drawCurrentTime = () => {
    txtTimer.textContent = `${padZeros(getMinutes())}:${padZeros(getSeconds())}`;
}

const drawCurrentActivity = () => {
    spanCurrentActivity.textContent = currentActivity;
}

const drawCurrentStatus = () => {
    spanCurrentStatus.textContent = currentStatus;
}

const drawCurrentPomodoros = () => {
    spanCurrentPomodoros.textContent = `Pomodoros Done: ${currentPomodoros}`;
}

const draw = () => {
    drawCurrentTime();
    drawCurrentActivity();
    drawCurrentStatus();
    drawCurrentPomodoros();
}

const onTimerZero = () => {
    clearInterval(timerInterval);

    hide(btnPause);
    hide(btnReset);
    hide(btnSkip);
    show(btnContinue);

    currentStatus = "Finished";
    drawCurrentStatus();

    if (currentActivity === "Pomodoro") {
        currentPomodoros++;
        drawCurrentPomodoros();
    }
}

const onTimerTick = () => {
    if (remainingSeconds > 0) {
        remainingSeconds--;
        drawCurrentTime();
    } else {
        onTimerZero();
    }
}

const onStartClick = (e) => {
    e.preventDefault();

    timerInterval = setInterval(onTimerTick, 1000);

    hide(btnStart);
    show(btnPause);
    show(btnReset);

    currentStatus = "Started";
    drawCurrentStatus();
}

const onPauseClick = (e) => {
    e.preventDefault();

    clearInterval(timerInterval);

    show(btnStart);
    hide(btnPause);

    currentStatus = "Paused";
    drawCurrentStatus();
}

const onResetClick = (e) => {
    e.preventDefault();

    clearInterval(timerInterval);

    show(btnStart);
    hide(btnPause);
    hide(btnReset)

    remainingSeconds = activitiesLengthMinutes[currentActivity] * 60;
    drawCurrentTime();

    currentStatus = "Not Started";
    drawCurrentStatus();
}

const onContinueClick = (e) => {
    e.preventDefault();

    if (currentActivity === "Pomodoro") {
        currentActivity = currentPomodoros % 4 === 0 ? "Long Break" : "Short Break";
    } else {
        currentActivity = "Pomodoro";
    }
    drawCurrentActivity();

    remainingSeconds = activitiesLengthMinutes[currentActivity] * 60;
    drawCurrentTime();

    currentStatus = "Not Started";
    drawCurrentStatus();

    hide(btnContinue);
    show(btnStart);
    if (currentActivity == "Short Break" || currentActivity == "Long Break") {
        show(btnSkip);
    }
}

const onSkipClick = (e) => {
    e.preventDefault();

    clearInterval(timerInterval);

    currentActivity = "Pomodoro";
    drawCurrentActivity();

    currentStatus = "Not Started";
    drawCurrentStatus();

    remainingSeconds = activitiesLengthMinutes[currentActivity] * 60;
    drawCurrentTime();

    hide(btnSkip);
    hide(btnPause);
    hide(btnReset);
    show(btnStart);
}

const onWindowLoad = (e) => {
    btnStart.addEventListener("click", onStartClick);
    btnPause.addEventListener("click", onPauseClick);
    btnReset.addEventListener("click", onResetClick);
    btnContinue.addEventListener("click", onContinueClick);
    btnSkip.addEventListener("click", onSkipClick);
    draw();
}

window.onload = onWindowLoad