window.App = window.App || {};

/* ============================================
   ЗАЩИТА ОТ КОПИРОВАНИЯ (косметика)
   Обход: Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
   ============================================ */
(function() {
    // Запрет правого клика
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Запрет горячих клавиш DevTools
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I / J / C
        if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (просмотр кода)
        if (e.ctrlKey && e.key.toUpperCase() === 'U') {
            e.preventDefault();
            return false;
        }
        // Ctrl+S (сохранение страницы)
        if (e.ctrlKey && e.key.toUpperCase() === 'S') {
            e.preventDefault();
            return false;
        }
    });

    // Запрет выделения текста
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Запрет перетаскивания картинок
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
})();

/* ============================================
   TOAST-УВЕДОМЛЕНИЯ
   ============================================ */
window.App.showToast = function(message) {
    const oldToast = document.querySelector('.comment-toast');
    if (oldToast) oldToast.remove();
    const toast = document.createElement('div');
    toast.className = 'comment-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

/* ============================================
   СКРОЛЛ К ТАРИФАМ
   ============================================ */
window.App.scrollToPrices = function() {
    const pricesSection = document.getElementById('prices');
    if (pricesSection) {
        pricesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};