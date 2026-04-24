document.addEventListener('DOMContentLoaded', function() {
    App.updateHeader();               // auth.js
    App.sliderGames();                // slider-games.js
    App.initScreenshotsSlider();      // slider-screenshots.js
    App.initVideoSwitcher();          // video-switcher.js
    App.initFAQ();                    // faq.js
    App.initMobileMenu();             // mobile-menu.js
    // Инициализация комментариев уже произошла в comments.js при DOMContentLoaded
});