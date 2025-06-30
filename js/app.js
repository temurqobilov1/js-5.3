const playBtn = document.querySelector("#play");
const forwardBtn = document.querySelector("#forward");
const backgwordBtn = document.querySelector("#backward");
const progressContainer = document.querySelector(".progress-container");
const progressEl = document.querySelector(".progress");
const container = document.querySelector(".container");
const volumeChanger = document.querySelector("#volume-changer");
const volum = document.querySelector("#volum");
const muteBtn = document.querySelector("#mute")
const audio = document.querySelector("audio");
const cover = document.querySelector("#cover");
const musicTitle = document.querySelector("#music-title");
const durationEl = document.querySelector("#duration");
const currentTimeEl = document.querySelector("#current-time")
const speed1 = document.getElementById("speed1") 
const speed2 = document.getElementById("speed2") 
const speed3 = document.getElementById("speed3") 
const speed4 = document.getElementById("speed4")

const speeds = document.querySelectorAll("fast")

speeds.forEach((button)=>{
  button.addEventListener("click",()=>{
    speeds.forEach((btn)=>btn.classList.remove("result"));
    button.classList.add("result");
  });
});

speed1.addEventListener("click", () => {
  audio.playbackRate = 0.5
})
speed2.addEventListener("click", () => {
  audio.playbackRate = 1
})
speed3.addEventListener("click", () => {
  audio.playbackRate = 1.5
})
speed4.addEventListener("click", () => {
  audio.playbackRate = 2
})



audio.addEventListener("loadeddata", ()=> {
  const duration = audio.duration;
  const minutes = String((duration - (duration % 60)) / 60);
  const seconds = String( parseInt(duration % 60));
  let time =
  `
  ${+minutes < 10 ? `${minutes.padStart(2,0)}`:minutes} :
  ${+seconds < 10 ? `${seconds.padStart(2,0)}`:seconds}
  `
  durationEl.textContent = time;
  currentTimeEl.textContent = time;
})

const songs = [
  "Weeknd - Blinding Lights",
  "Munisa Rizayeva - Jonginam",
  "Muhammadziyo Anvarov - Bir so'mi yo'q",
  "Billie Eilish - Wildflower",
  "Nadyr - Ismigul",
];

let currentPlaySong = 4;

function changeSong(current){
  audio.src = `../audios/${songs[current]}.mp3`;
  cover.src = `../images/${songs[current]}.png`;
  musicTitle.textContent = songs[current];
}

changeSong(currentPlaySong);


function nextSong() {
  if (currentPlaySong < songs.length-1){
    currentPlaySong++;
  }else{
    currentPlaySong = 0;
  }
  changeSong(currentPlaySong)
  play()
}
function prevSong() {
  if (currentPlaySong > 0){
    currentPlaySong--;
  }else{
    currentPlaySong = songs.length-1;
  }
  changeSong(currentPlaySong)
  play()
}

audio.volume = +volumeChanger.value / 100;
volum.textContent = +volumeChanger.value;

function mute() {
  audio.volume = 0;
  container.classList.add("voise");
  muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
}
function unmute() {
  audio.volume = +volumeChanger.value / 100;
  container.classList.remove("voise");
  muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
}

function musicMute(){
  const isMute = container.classList.contains("voise");
  if(isMute){
    unmute()
  }else{
    mute()
  }
}

function play() { 
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

  const decresingTime = isNaN(duration - currentTime)
    ? 0
    : duration - currentTime

    const minutes = String((decresingTime - (decresingTime % 60)) / 60);
    const seconds = String(parseInt(decresingTime % 60));
    let time = `
  ${+minutes < 10 ? `${minutes.padStart(2, 0)}` : minutes} :
  ${+seconds < 10 ? `${seconds.padStart(2, 0)}` : seconds}
  `;

  currentTimeEl.textContent = time;


  const p = (currentTime / duration) * 100;
  progressEl.style.width = `${p}%`;
}

function changeTime(e) {
  const p = (e.offsetX / this.clientWidth) * 100;
  const currentTime = (audio.duration / 100) * p;
  audio.currentTime = currentTime;
}

function volumechange(){
  audio.volume = +volumeChanger.value / 100;
  volum.textContent = +volumeChanger.value;
}

playBtn.addEventListener("click", musicPlay);
audio.addEventListener("timeupdate", progress);
progressContainer.addEventListener("click", changeTime);
volumeChanger.addEventListener("input", volumechange);
audio.addEventListener("ended", nextSong)
backgwordBtn.addEventListener("click", prevSong)
forwardBtn.addEventListener("click", nextSong)
muteBtn.addEventListener("click", musicMute)
