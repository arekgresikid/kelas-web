const button = document.getElementById('colorBtn');
const statusText = document.getElementById('status');
const colors = ['#0d0d0d', '#1e1b4b', '#14532d', '#7c2d12', '#4c1d95'];
let currentIndex = 0;

button.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[currentIndex];
    
    statusText.innerText = `Status: Background diganti ke ${colors[currentIndex]}`;
    statusText.style.color = '#10b981';
    
    setTimeout(() => {
        statusText.style.color = '';
    }, 1000);
});

console.log('Demo Script Loaded! 🚀');
