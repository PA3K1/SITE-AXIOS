document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu__close');

    // Открытие меню
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            hamburger.style.display = 'none'; // скрываем гамбургер
        });
    }

    // Закрытие по крестику
    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.style.display = 'block'; // показываем гамбургер
        });
    }

    // Закрытие по клику на любую ссылку внутри меню (кроме "Контакты")
    const mobileLinks = document.querySelectorAll('.mobile-nav__link:not(.mobile-nav__dropdown-trigger)');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.style.display = 'block';
        });
    });

    // Выпадающий список "Контакты"
    const dropdownTrigger = document.querySelector('.mobile-nav__dropdown-trigger');
    if (dropdownTrigger) {
        dropdownTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.mobile-nav__dropdown');
            dropdown.classList.toggle('active');
        });
    }
});

// Количество видимых карточек в зависимости от ширины экрана
function getItemsToShow() {
    return window.innerWidth <= 450 ? 1 : 4;
}