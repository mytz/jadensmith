const rectangle = document.querySelector('.rectangle');
const titleBar = document.querySelector('.title-bar');

let isDragging = false;
let offsetX, offsetY;

titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - rectangle.offsetLeft;
    offsetY = e.clientY - rectangle.offsetTop;
    titleBar.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = rectangle.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate new position
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Limit the rectangle's position to the viewport
        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + rect.width > viewportWidth) newX = viewportWidth - rect.width;
        if (newY + rect.height > viewportHeight) newY = viewportHeight - rect.height;

        rectangle.style.left = `${newX}px`;
        rectangle.style.top = `${newY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    titleBar.style.cursor = 'move';
});

// Ensure the rectangle remains within bounds on resize
const updateRectanglePosition = () => {
    const rect = rectangle.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Adjust position if the rectangle goes out of bounds
    let newX = parseFloat(rectangle.style.left) || 0;
    let newY = parseFloat(rectangle.style.top) || 0;

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX + rect.width > viewportWidth) newX = viewportWidth - rect.width;
    if (newY + rect.height > viewportHeight) newY = viewportHeight - rect.height;

    rectangle.style.left = `${newX}px`;
    rectangle.style.top = `${newY}px`;
};

window.addEventListener('resize', updateRectanglePosition);
