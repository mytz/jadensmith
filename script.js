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



// BOTONES DE LA BARRA!!!!!!!!!!!!!!!!!!!!!!
// Archivo: script.js
document.addEventListener('DOMContentLoaded', function() {
    const lightButton = document.getElementById('lightButton');
    const minimizeButton = document.getElementById('minimizeButton');
    const buttons = document.querySelectorAll('.btn'); // Selecciona todos los botones .btn
    const hoverSound = new Audio('hover.wav'); // Archivo de sonido para hover

    let isLightOn = true;
    let isExpanded = false;

    function playHoverSound() {
        hoverSound.currentTime = 0; // Reiniciar el sonido para reproducirlo desde el principio
        hoverSound.play();
    }

    lightButton.addEventListener('click', function() {
        playHoverSound(); // Reproduce el sonido al hacer clic
        if (isLightOn) {
            body.style.backgroundImage = "url('fondo1.png')";
            updateButtonHover(lightButton, 'LIGHTSOFF1.png', 'LIGHTSOFF2.png', 'LIGHTSOFF1.png', 'LIGHTSOFF2.png');
        } else {
            body.style.backgroundImage = "url('fondo2.png')";
            updateButtonHover(lightButton, 'LIGHTSON1.png', 'LIGHTSON2.png', 'LIGHTSON1.png', 'LIGHTSON2.png');
        }
        isLightOn = !isLightOn;
    });

    minimizeButton.addEventListener('click', function() {
        playHoverSound(); // Reproduce el sonido al hacer clic
        if (isExpanded) {
            updateButtonHover(minimizeButton, 'MIN1.png', 'MIN2.png', 'MIN1.png', 'MIN2.png');
        } else {
            updateButtonHover(minimizeButton, 'EXPAND1.png', 'EXPAND2.png', 'EXPAND1.png', 'EXPAND2.png');
        }
        isExpanded = !isExpanded;
    });

    buttons.forEach(button => {
        button.addEventListener('mouseover', playHoverSound); // Reproduce el sonido al pasar el mouse
    });
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

    function updateSong() {
        audioPlayer.src = songs[songIndex];
        songTitle.textContent = songs[songIndex];
        cdImage.src = images[songIndex];
    }

    function playAudio() {
        audioPlayer.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';

        // Mostrar la imagen del CD y reanudar la rotación
        cdImage.style.display = 'block';
        cdImage.style.animationPlayState = 'running'; // Reanudar animación
        spinSound.play();
    }

    function pauseAudio() {
        audioPlayer.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';

        // Detener la rotación de la imagen del CD y fijar su ángulo
        cdImage.style.animationPlayState = 'paused'; // Pausar animación
        spinSound.pause();
        spinSound.currentTime = 0; // Reiniciar el sonido
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

    // Inicializar el reproductor
    playButton.style.display = 'block'; // Mostrar el botón de Play al inicio
    updateSong(); // Actualizar la canción sin reproducir automáticamente
});

