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

// REPRODUCTOR DE MUSICA
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const forwardButton = document.getElementById('forwardButton');
    const backwardButton = document.getElementById('backwardButton');
    const songTitle = document.getElementById('songTitle');
    const audioPlayer = document.getElementById('audioPlayer');
    const cdImage = document.getElementById('cdImage');
    const spinSound = new Audio('spin.wav');

    const songs = ['Charli_xcx_-_Girl_so_confusing.mp3', 'Blue_Foundation_-_Eyes_On_Fire.mp3'];
    const images = ['CD1.png', 'CD2.png'];
    let songIndex = 0;
    let isPlaying = false;

    function updateSong() {
        audioPlayer.src = songs[songIndex];
        songTitle.textContent = songs[songIndex];
        cdImage.src = images[songIndex];
    }

    function playAudio() {
        audioPlayer.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';

        // Mostrar la imagen del CD y hacerla girar
        cdImage.style.display = 'block';
        cdImage.classList.add('rotate');
        spinSound.play();
        isPlaying = true;
    }

    function pauseAudio() {
        audioPlayer.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';

        // Detener la rotación de la imagen del CD y fijar su ángulo
        cdImage.classList.remove('rotate');
        spinSound.pause();
        spinSound.currentTime = 0; // Reiniciar el sonido
        isPlaying = false;
    }

    function nextSong() {
        songIndex = (songIndex + 1) % songs.length;
        updateSong();
        playAudio(); // Reproduce la canción automáticamente
    }

    playButton.addEventListener('click', function() {
        playAudio();
    });

    pauseButton.addEventListener('click', function() {
        pauseAudio();
    });

    forwardButton.addEventListener('click', function() {
        nextSong(); // Avanza a la siguiente canción
    });

    backwardButton.addEventListener('click', function() {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        updateSong();
        playAudio(); // Reproduce la canción automáticamente
    });

    audioPlayer.addEventListener('ended', function() {
        nextSong(); // Avanza a la siguiente canción cuando la actual termine
    });

    // Configurar la rotación utilizando CSS
    const rotateStyle = document.createElement('style');
    rotateStyle.innerHTML = `
        @keyframes rotation {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        .rotate {
            animation: rotation 2s infinite linear;
        }
    `;
    document.head.appendChild(rotateStyle);

    // Función para obtener el ángulo actual de rotación
    function getRotationAngle(element) {
        const style = window.getComputedStyle(element);
        const matrix = new WebKitCSSMatrix(style.transform || style.webkitTransform);
        return Math.round(Math.atan2(matrix.m21, matrix.m11) * (180 / Math.PI));
    }

    // Ajustar la rotación del CD al hacer clic en pausa
    function pauseAudio() {
        audioPlayer.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';

        // Detener la rotación de la imagen del CD y fijar su ángulo
        const angle = getRotationAngle(cdImage);
        cdImage.classList.remove('rotate');
        cdImage.style.transform = `rotate(${angle}deg)`;
        spinSound.pause();
        spinSound.currentTime = 0; // Reiniciar el sonido
        isPlaying = false;
    }

    // Actualizar el estado inicial del reproductor
    playButton.style.display = 'block'; // Mostrar el botón de Play al inicio
    updateSong(); // Actualizar la canción sin reproducir automáticamente
});
