const playlistIcon = document.querySelector('.fa-music');
const playlist = document.querySelector('.playlist');
const media = document.querySelector('.media');
const playBtn = document.querySelector('.fa-play');
const prevBtn = document.querySelector('.fa-backward');
const nextBtn = document.querySelector('.fa-forward');
const darkModeIcon = document.querySelector('.fa-moon-o');
const lightModeIcon = document.querySelector('.fa-sun-o');
const body = document.querySelector('body');
const btns = document.querySelectorAll('button');
const hearts = document.querySelectorAll('.fa-heart');
const musicIcon = document.querySelector('music-icon');
const label = document.querySelector('.label');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const songTitles = document.querySelectorAll('.song-title');
const songAuthor = document.querySelectorAll('.song-author');
const icon = document.querySelector('.music-icon');
const uiHeart = document.querySelector('.media .fa-heart');
const audio = document.querySelector('#audio');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress-container');
const timePlayed = document.querySelector('.progress-time-played');
const timeDuration = document.querySelector('.progress-time-duration');
const downloadBtns = document.querySelectorAll('.fa-download');


// Showing and hiding playlist
playlistIcon.addEventListener('click', () => {
  if(playlist.classList.contains('hide')){
    playlist.classList.remove('hide');
    playlist.classList.add('show');
    media.classList.remove('show');
    media.classList.add('hide');
  } else {
    playlist.classList.remove('show');
    playlist.classList.add('hide');
    media.classList.remove('hide');
    media.classList.add('show');
  }
});

// Toggling dark and night modes
darkModeIcon.addEventListener('click', () => {
  body.classList.remove('body-light');
  body.classList.add('body');

   btns.forEach(btn => {
    btn.classList.add('btn-dark');
    btn.classList.remove('btn-light');
  });
});

lightModeIcon.addEventListener('click', () => {
  body.classList.remove('body');
  body.classList.add('body-light');
 
  btns.forEach(btn => {
    btn.classList.remove('btn-dark');
    btn.classList.add('btn-light');
  });
});

// Changing hearts (favorite icons) color on click
hearts.forEach(heart => {
  heart.addEventListener('click', () => {
    if(heart.classList.contains('favorited')){
      heart.classList.remove('favorited');
    } else {
      heart.classList.add('favorited');
    }
  })
});


// Music Constructor
class Music {
  constructor(id, cover, title, author){
    this.id = id,
    this.cover = cover,
    this.title = title,
    this.author = author
  }

  download(){
    let link = document.createElement("a");
    link.setAttribute('download', `${this.title}`);
    link.href = `public/sounds/${this.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

// Creating music objects and storing them in array
const everythingWeNeed = new Music(0, 'one', 'Everything We Need', 'Kanye West');
const revengeOfTheDreamers = new Music(1, 'two', 'Revenge Of The Dreamers', 'J. Cole');
const summersOver = new Music(2, 'three', 'Summers Over', 'Drake');
const jesusIsLord = new Music(3, 'four', 'Jesus Is Lord', 'Kanye West');
const laws = new Music(4, 'five', '48 Laws', 'Omen');
const moMoney = new Music(5, 'six', 'Mo Money', 'J. Cole');

const songs = [everythingWeNeed, revengeOfTheDreamers, summersOver, jesusIsLord, laws, moMoney];


// Load first song on load
window.addEventListener('load', () => {
  currentSong(songs[0]);
  label.classList.remove('playing');
  playBtn.classList.remove('fa-pause');
  playBtn.classList.add('fa-play');

  audio.pause();
});

// Updating UI with songs
function currentSong(id){
  function updateProgress (e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;

    progressBar.style.width = `${progressPercent}%`;

    function format(time) {
     // Minutes and seconds
      const mins = ~~((time % 3600) / 60);
      const secs = ~~time % 60;

    // Output like "01:01" 
      let output = "";
      output += `${mins < 10 ? '0' + mins : mins} : ${secs < 10 ? '0' + secs : secs}`;

      return output;
    }

      timePlayed.innerText = format(currentTime);
      timeDuration.innerText = format(duration);
    }

  audio.addEventListener('timeupdate', updateProgress);

  title.innerHTML = id.title;
  icon.id = id.cover;
  author.innerHTML = id.author;
  audio.src = `public/sounds/${id.title}.mp3`;


  label.classList.add('playing');
  playBtn.classList.add('fa-pause');
  playBtn.classList.remove('fa-play');
}


// Load song in UI on click
songTitles.forEach(songTitle => {
  songTitle.addEventListener('click', () => {
    songs.forEach(song => {
      if(song.title === songTitle.innerText){
        currentSong(songs[song.id]);
        audio.play();
        
        // uiHeart.style.color = heart.style.color;
      }
    });
  })
});

// Toggling play and pause
playBtn.addEventListener('click', () => {
  if(playBtn.classList.contains('fa-play')){
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
    label.classList.add('playing');
    audio.play();
  } else {
    playBtn.classList.remove('fa-pause');
    playBtn.classList.add('fa-play');
    label.classList.remove('playing');
    audio.pause();
  }
});

// Previous and next operations
function previousSong(){
  songs.forEach(song => {
    if(title.innerText === song.title){
      if(song.id < 0){
        currentSong(songs[songs.length - 1])
      } else {
        currentSong(songs[song.id--]);
      }
    }

      audio.play()
    });
}

function nextSong(){
  songs.forEach(song => {
    if(title.innerText === song.title){
      if(song.id > songs.length - 1){
        currentSong(songs[0])
      } else {
        currentSong(songs[song.id++]);
      }
    }

      audio.play();
    });
}

prevBtn.addEventListener('click', previousSong);

nextBtn.addEventListener('click', nextSong);


// Seeking
progressContainer.addEventListener('click', (e) => {
  const width = 321;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

// Go To Next On End
audio.addEventListener('ended', nextSong)


// Download music
downloadBtns.forEach(downloadBtn => downloadBtn.addEventListener('click', song.download));