const rectangle = document.querySelector('.rectangle');
const titleBar = document.querySelector('.title-bar');

let offsetX, offsetY;

titleBar.addEventListener('mousedown', (e) => {
    offsetX = e.clientX - rectangle.getBoundingClientRect().left;
    offsetY = e.clientY - rectangle.getBoundingClientRect().top;

    function onMouseMove(e) {
        rectangle.style.left = `${e.clientX - offsetX}px`;
        rectangle.style.top = `${e.clientY - offsetY}px`;
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
});

// Centrar el rectángulo al cambiar el tamaño de la ventana o el zoom
window.addEventListener('resize', () => {
    const rectWidth = rectangle.offsetWidth;
    const rectHeight = rectangle.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    rectangle.style.left = `${(windowWidth - rectWidth) / 2}px`;
    rectangle.style.top = `${(windowHeight - rectHeight) / 2}px`;
});

// Inicializar la posición centrada
window.dispatchEvent(new Event('resize'));

document.addEventListener('mouseup', () => {
    isDragging = false;
});
