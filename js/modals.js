window.App = window.App || {};

window.App.openModal = function(e) {
    e.preventDefault();
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = '1', 10);
};

window.App.openBodal = function(e) {
    e.preventDefault();
    const modal = document.querySelector('.modal--registration');
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = '1', 10);
};

window.App.openSodal = function(e) {
    e.preventDefault();
    const modal = document.querySelector('.modal--auto');
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = '1', 10);
};

window.App.closeModal = function() {
    document.querySelectorAll('.modal').forEach(m => {
        if (m.style.display === 'block') {
            m.style.opacity = '0';
            setTimeout(() => m.style.display = 'none', 300);
        }
    });
};

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal--auto')) {
        e.target.style.opacity = '0';
        setTimeout(() => e.target.style.display = 'none', 300);
    }
});