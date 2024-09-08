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
    
    let isPlaying = false;
    let currentSong = 'Charli xcx - Girl, so confusing.mp3';

    // Función para actualizar el título de la canción
    function updateSong() {
        songTitle.textContent = currentSong;
    }

    // Evento para el botón de play/pause
    playPauseButton.addEventListener('click', function() {
        if (isPlaying) {
            playPauseButton.classList.remove('fa-pause');
            playPauseButton.classList.add('fa-play');
            // Aquí iría la lógica para pausar la canción
            console.log('Pausar canción');
        } else {
            playPauseButton.classList.remove('fa-play');
            playPauseButton.classList.add('fa-pause');
            // Aquí iría la lógica para reproducir la canción
            console.log('Reproducir canción');
        }
        isPlaying = !isPlaying;
    });

    // Evento para el botón de forward
    forwardButton.addEventListener('click', function() {
        currentSong = 'Blue Foundation - Eyes On Fire.mp3';
        updateSong();
        console.log('Siguiente canción:', currentSong);
    });

    // Evento para el botón de backward
    backwardButton.addEventListener('click', function() {
        currentSong = 'Charli xcx - Girl, so confusing.mp3';
        updateSong();
        console.log('Canción anterior:', currentSong);
    });
});

