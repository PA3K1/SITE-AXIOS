window.App = window.App || {};

window.App.showToast = function(message) {
    const oldToast = document.querySelector('.comment-toast');
    if (oldToast) oldToast.remove();
    const toast = document.createElement('div');
    toast.className = 'comment-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

window.App.scrollToPrices = function() {
    const pricesSection = document.getElementById('prices');
    if (pricesSection) {
        pricesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};