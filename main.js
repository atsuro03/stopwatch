const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let startTime;
let timeoutId;
let elapsedTime = 0;

function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, "0");
    const s = String(d.getSeconds()).padStart(2, "0");
    const ms = String(d.getMilliseconds()).padStart(3, "0");
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {
        countUp();
    }, 10);
};

function setButtonStateIntial() {
    start.classList.remove("active");
    stop.classList.add("active");
    reset.classList.add("active");
}

function setButtonStateRunning() {
    start.classList.add("active");
    stop.classList.remove("active");
    reset.classList.add("active");
}

function setButtonStateStopped() {
    start.classList.remove("active");
    stop.classList.add("active");
    reset.classList.remove("active");
}

setButtonStateIntial();

start.addEventListener("click", () => {
    if(start.classList.contains("active") === true) {
        return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
});

stop.addEventListener("click", () => {
    if(stop.classList.contains("active") === true) {
        return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
});

reset.addEventListener("click", () => {
    if(reset.classList.contains("active") === true) {
        return;
    }
    setButtonStateIntial();
    timer.textContent = "00:00.000";
    elapsedTime = 0;
});
