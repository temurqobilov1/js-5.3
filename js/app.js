const playBtn = document.querySelector("#play");
const forwardBtn = document.querySelector("#forward");
const backgwordBtn = document.querySelector("#backward");
const progressContainer = document.querySelector(".progress-container");
const progressEl = document.querySelector(".progress");
const audio = document.querySelector("audio");
const container = document.querySelector(".container");
const volumeChanger = document.querySelector("#volume-changer");

function play() {
  audio.volume = 0.1;
  audio.play();
  container.classList.add("play");
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pause() {
  audio.pause();
  container.classList.remove("play");
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function musicPlay() {
  const isPlaying = container.classList.contains("play");
  if (isPlaying) {
    pause();
  } else {
    play();
  }
}

function progress() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  const p = (currentTime / duration) * 100;
  progressEl.style.width = `${p}%`;
}

function changeTime(e) {
  const p = (e.offsetX / this.clientWidth) * 100;
  const currentTime = (audio.duration / 100) * p;
  audio.currentTime = currentTime;
}

playBtn.addEventListener("click", musicPlay);
audio.addEventListener("timeupdate", progress);
progressContainer.addEventListener("click", changeTime);
volumeChanger.addEventListener("input", () => {
  audio.volume = +volumeChanger.value / 100;
});
