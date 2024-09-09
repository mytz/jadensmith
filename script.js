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

// REPRODUCTOR DE MÚSICA
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const forwardButton = document.getElementById('forwardButton');
    const backwardButton = document.getElementById('backwardButton');
    const songTitle = document.getElementById('songTitle');
    const audioPlayer = document.getElementById('audioPlayer');
    const cdImage = document.createElement('img');
    const spinSound = new Audio('spin.wav');

    // Configurar imagen del CD
    cdImage.style.position = 'absolute';
    cdImage.style.bottom = '0';
    cdImage.style.left = '0';
    cdImage.style.zIndex = '10'; // Asegurar que esté por delante de "FONDOSECTION3.png"
    cdImage.style.width = '100px'; // Ajustar el tamaño de la imagen según sea necesario
    cdImage.style.height = '100px';
    cdImage.style.transition = 'transform 0.1s linear';
    document.querySelector('.section3').appendChild(cdImage);

    const songs = [
        { src: 'Charli_xcx_-_Girl_so_confusing.mp3', image: 'CD1.png' },
        { src: 'Blue_Foundation_-_Eyes_On_Fire.mp3', image: 'CD2.png' }
    ];
    let songIndex = 0;
    let isPlaying = false;
    let spinInterval;

    function updateSong() {
        audioPlayer.src = songs[songIndex].src;
        songTitle.textContent = songs[songIndex].src;
        cdImage.src = songs[songIndex].image;
    }

    function playAudio() {
        audioPlayer.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
        startSpinning();
        spinSound.play();
        isPlaying = true;
    }

    function pauseAudio() {
        audioPlayer.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        stopSpinning();
        spinSound.pause();
        isPlaying = false;
    }

    function nextSong() {
        songIndex = (songIndex + 1) % songs.length;
        updateSong();
        playAudio(); // Reproduce la canción automáticamente
    }

    function startSpinning() {
        stopSpinning(); // Detener cualquier intervalo previo
        spinInterval = setInterval(() => {
            if (isPlaying) {
                cdImage.style.transform = `rotate(${(Date.now() / 10) % 360}deg)`;
            }
        }, 100);
    }

    function stopSpinning() {
        clearInterval(spinInterval);
        cdImage.style.transform = 'rotate(0deg)';
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

    playButton.style.display = 'block'; // Mostrar el botón de Play al inicio
    updateSong(); // Actualizar la canción sin reproducir automáticamente
});
