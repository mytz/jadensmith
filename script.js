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
    const forwardButton = document.querySelector('.forward-button');
    const backwardButton = document.querySelector('.backward-button');
    const songTitle = document.getElementById('songTitle');

    let isPlaying = false;
    let currentSong = 'Charli xcx - Girl, so confusing.mp3';
    const songs = ['Charli xcx - Girl, so confusing.mp3', 'Blue Foundation - Eyes On Fire.mp3'];
    let songIndex = 0;

    function updateSong() {
        currentSong = songs[songIndex];
        songTitle.textContent = currentSong;
    }

    playPauseButton.addEventListener('click', function() {
        if (isPlaying) {
            // Cambiar a ícono de "play"
            playPauseButton.classList.remove('fa-pause');
            playPauseButton.classList.add('fa-play');
            // Pausar la canción
            console.log('Pausar canción');
        } else {
            // Cambiar a ícono de "pause"
            playPauseButton.classList.remove('fa-play');
            playPauseButton.classList.add('fa-pause');
            // Reproducir la canción
            console.log('Reproducir canción');
        }
        isPlaying = !isPlaying;
    });

    forwardButton.addEventListener('click', function() {
        songIndex = (songIndex + 1) % songs.length;
        updateSong();
        console.log('Siguiente canción:', currentSong);
    });

    backwardButton.addEventListener('click', function() {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        updateSong();
        console.log('Canción anterior:', currentSong);
    });
});
