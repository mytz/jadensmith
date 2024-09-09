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
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const forwardButton = document.getElementById('forwardButton');
    const backwardButton = document.getElementById('backwardButton');
    const songTitle = document.getElementById('songTitle');
    const audioPlayer = document.getElementById('audioPlayer');
    const cdImage = document.getElementById('cdImage');
    const spinSound = new Audio('spin.wav');

    const songs = [
        { title: 'Charli_xcx_-_Girl_so_confusing.mp3', image: 'CD1.png' },
        { title: 'Blue_Foundation_-_Eyes_On_Fire.mp3', image: 'CD2.png' }
    ];
    let songIndex = 0;

    function updateSong() {
        audioPlayer.src = songs[songIndex].title;
        songTitle.textContent = songs[songIndex].title;
        cdImage.src = songs[songIndex].image;
    }

    function playAudio() {
        audioPlayer.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
        cdImage.style.display = 'block';
        cdImage.style.animationDuration = '2s'; // Ajusta la velocidad de rotación
        spinSound.loop = true;
        spinSound.play();
    }

    function pauseAudio() {
        audioPlayer.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        cdImage.style.animationDuration = '0s'; // Detiene la rotación
        spinSound.pause();
    }

    function nextSong() {
        songIndex = (songIndex + 1) % songs.length;
        updateSong();
        playAudio();
    }

    playButton.addEventListener('click', function() {
        playAudio();
    });

    pauseButton.addEventListener('click', function() {
        pauseAudio();
    });

    forwardButton.addEventListener('click', function() {
        nextSong();
    });

    backwardButton.addEventListener('click', function() {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        updateSong();
        playAudio();
    });

    audioPlayer.addEventListener('ended', function() {
        nextSong();
    });

    playButton.style.display = 'block';
    updateSong();
});

    playButton.style.display = 'block'; // Mostrar el botón de Play al inicio
    updateSong(); // Actualizar la canción sin reproducir automáticamente
});
