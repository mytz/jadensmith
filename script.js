// Hacer que el rectángulo se pueda arrastrar por la página
const rectangle = document.querySelector('.rectangle');
const titleBar = document.querySelector('.title-bar');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - rectangle.getBoundingClientRect().left;
    offsetY = e.clientY - rectangle.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let xPos = e.clientX - offsetX;
        let yPos = e.clientY - offsetY;

        // Limitar el movimiento a los bordes de la ventana
        const rectWidth = rectangle.offsetWidth;
        const rectHeight = rectangle.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        xPos = Math.max(0, Math.min(xPos, windowWidth - rectWidth));
        yPos = Math.max(0, Math.min(yPos, windowHeight - rectHeight));

        rectangle.style.left = `${xPos}px`;
        rectangle.style.top = `${yPos}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});



// REPRODUCTOR DE MUSICA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
document.addEventListener('DOMContentLoaded', function() {
    const playPauseButton = document.getElementById('playPauseButton');
    const forwardButton = document.getElementById('forwardButton');
    const backwardButton = document.getElementById('backwardButton');
    const songTitle = document.getElementById('songTitle');
    const audioPlayer = document.getElementById('audioPlayer');

    const songs = ['Charli_xcx_-_Girl_so_confusing.mp3', 'Blue_Foundation_-_Eyes_On_Fire.mp3'];
    let songIndex = 0;

    function updateSong() {
        audioPlayer.src = songs[songIndex];
        songTitle.textContent = songs[songIndex];
        audioPlayer.play();
        playPauseButton.classList.remove('fa-play');
        playPauseButton.classList.add('fa-pause');
    }

    playPauseButton.addEventListener('click', function() {
        console.log('Play/Pause button clicked');
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.classList.remove('fa-play');
            playPauseButton.classList.add('fa-pause');
        } else {
            audioPlayer.pause();
            playPauseButton.classList.remove('fa-pause');
            playPauseButton.classList.add('fa-play');
        }
    });

    forwardButton.addEventListener('click', function() {
        console.log('Forward button clicked');
        songIndex = (songIndex + 1) % songs.length;
        updateSong();
    });

    backwardButton.addEventListener('click', function() {
        console.log('Backward button clicked');
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        updateSong();
    });

    playPauseButton.classList.add('fa-play'); // Asegura que el botón de play esté visible al inicio
    updateSong();
});
