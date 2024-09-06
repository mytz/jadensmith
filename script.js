const rectangle = document.querySelector('.rectangle');
const titleBar = document.querySelector('.title-bar');
let isDragging = false;
let offsetX, offsetY;

titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = rectangle.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;

        // Limitar los movimientos del rectángulo dentro de los bordes visibles
        const minX = 0;
        const minY = 0;
        const maxX = window.innerWidth - rectangle.offsetWidth;
        const maxY = window.innerHeight - rectangle.offsetHeight;

        x = Math.max(minX, Math.min(x, maxX));
        y = Math.max(minY, Math.min(y, maxY));

        rectangle.style.left = `${x}px`;
        rectangle.style.top = `${y}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('resize', () => {
    const rect = rectangle.getBoundingClientRect();
    const maxX = window.innerWidth - rectangle.offsetWidth;
    const maxY = window.innerHeight - rectangle.offsetHeight;

    let x = Math.min(rect.left, maxX);
    let y = Math.min(rect.top, maxY);

    rectangle.style.left = `${x}px`;
    rectangle.style.top = `${y}px`;
});
