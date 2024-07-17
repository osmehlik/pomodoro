const activitiesLengthMinutes = {
    "Pomodoro": 25,
    "Short Break": 5,
    "Long Break": 20
};

const spanTimer = document.getElementById("timer");
const spanActivity = document.getElementById("activity");
const spanProgress = document.getElementById("progress");
const spanPomodoros = document.getElementById("pomodoros");

const btnStart = document.getElementById("start");
const btnPause = document.getElementById("pause");
const btnReset = document.getElementById("reset");
const btnContinue = document.getElementById("continue");
const btnSkip = document.getElementById("skip");

let activity = "Pomodoro";
let progress = "Not started";
let pomodoros = 0;

let timerInterval = null;
let remainingSeconds = activitiesLengthMinutes[activity] * 60;

const getMinutes = () => Math.floor(remainingSeconds / 60);
const getSeconds = () => remainingSeconds % 60;
const padZeros = (val) => val < 10 ? "0" + val : val;
const hide = (el) => { el.classList.add("hidden"); }
const show = (el) => { el.classList.remove("hidden"); }

const drawTime = () => { spanTimer.textContent = `${padZeros(getMinutes())}:${padZeros(getSeconds())}`; }
const drawActivity = () => { spanActivity.textContent = activity; }
const drawProgress = () => { spanProgress.textContent = progress; }
const drawPomodoros = () => { spanPomodoros.textContent = `Pomodoros Done: ${pomodoros}`; }

const onTimerZero = () => {
    clearInterval(timerInterval);

    hide(btnPause);
    hide(btnReset);
    hide(btnSkip);
    show(btnContinue);

    progress = "Finished";
    drawProgress();

    if (activity === "Pomodoro") {
        pomodoros++;
        drawPomodoros();
    }
}

const onTimerTick = () => {
    if (remainingSeconds > 0) {
        remainingSeconds--;
        drawTime();
    } else {
        onTimerZero();
    }
}

const onStartClick = () => {
    timerInterval = setInterval(onTimerTick, 1000);

    hide(btnStart);
    show(btnPause);
    show(btnReset);

    progress = "Started";
    drawProgress();
}

const onPauseClick = () => {
    clearInterval(timerInterval);

    show(btnStart);
    hide(btnPause);

    progress = "Paused";
    drawProgress();
}

const onResetClick = () => {
    clearInterval(timerInterval);

    show(btnStart);
    hide(btnPause);
    hide(btnReset)

    remainingSeconds = activitiesLengthMinutes[activity] * 60;
    drawTime();

    progress = "Not Started";
    drawProgress();
}

const onContinueClick = () => {
    if (activity === "Pomodoro") {
        activity = pomodoros % 4 === 0 ? "Long Break" : "Short Break";
    } else {
        activity = "Pomodoro";
    }
    drawActivity();

    remainingSeconds = activitiesLengthMinutes[activity] * 60;
    drawTime();

    progress = "Not Started";
    drawProgress();

    hide(btnContinue);
    show(btnStart);
    if (activity == "Short Break" || activity == "Long Break") {
        show(btnSkip);
    }
}

const onSkipClick = () => {
    clearInterval(timerInterval);

    activity = "Pomodoro";
    drawActivity();

    progress = "Not Started";
    drawProgress();

    remainingSeconds = activitiesLengthMinutes[activity] * 60;
    drawTime();

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

    drawTime();
    drawActivity();
    drawProgress();
    drawPomodoros();
}

window.onload = onWindowLoad