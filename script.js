"strict mode";

const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

let isPlaying = false;
let songIndex = 0;

const playSong = () => {
  isPlaying = true;

  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");

  music.play();
};

const pauseSong = () => {
  isPlaying = false;

  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");

  music.pause();
};

const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

loadSong(songs[songIndex]);

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;

  loadSong(songs[songIndex]);
  playSong();
};

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;

  loadSong(songs[songIndex]);
  playSong();
};

const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;

    // Duration time
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    // avoid display NaN in 'duration' when switch song
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Current time
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;

  // set click in current time for music
  music.currentTime = (clickX / width) * duration;
};

// addEventListener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
