document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu__close');

    // Открытие меню
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            hamburger.style.display = 'none';
        });
    }

    // Закрытие по крестику
    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.style.display = 'block';
        });
    }

    // Закрытие по клику на любую ссылку внутри меню
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

// ============= МОБИЛЬНЫЙ СЛАЙДЕР СКРИНШОТОВ =============
(function initMobileSlider() {
    if (window.innerWidth > 450) return;

    const track = document.querySelector('.track');
    const slides = document.querySelectorAll('.slide');
    const range = document.getElementById('range');
    if (!track || !slides.length || !range) return;

    const totalSlides = slides.length;
    let slideWidth = slides[0].offsetWidth;
    let maxOffset = slideWidth * (totalSlides - 1);
    let currentOffset = 0;
    let startX = 0;
    let isDragging = false;

    function updatePosition(offset) {
        offset = Math.min(maxOffset, Math.max(0, offset));
        track.style.transform = `translateX(-${offset}px)`;
        currentOffset = offset;
        range.value = (offset / maxOffset) * 100;
    }

    function snapToSlide() {
        const nearestIndex = Math.round(currentOffset / slideWidth);
        const targetOffset = nearestIndex * slideWidth;
        track.style.transition = 'transform 0.3s ease';
        updatePosition(targetOffset);
        setTimeout(() => {
            track.style.transition = '';
        }, 300);
    }

    // Инициализация
    updatePosition(0);
    range.value = 0;

    // Ползунок
    range.addEventListener('input', (e) => {
        if (isDragging) return;
        const val = parseFloat(e.target.value);
        const offset = (val / 100) * maxOffset;
        track.style.transition = 'none';
        updatePosition(offset);
    });

    // Обновление при изменении размера
    window.addEventListener('resize', () => {
        slideWidth = slides[0].offsetWidth;
        maxOffset = slideWidth * (totalSlides - 1);
        updatePosition(currentOffset);
    });

    // Свайпы
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none';
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const diff = (startX - e.touches[0].clientX);
        let newOffset = currentOffset + diff;
        newOffset = Math.min(maxOffset, Math.max(0, newOffset));
        track.style.transform = `translateX(-${newOffset}px)`;
        range.value = (newOffset / maxOffset) * 100;
    });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        snapToSlide();
    });

    track.addEventListener('touchcancel', () => {
        if (!isDragging) return;
        isDragging = false;
        snapToSlide();
    });
})();

// ============= МОДАЛКА СЛАЙДЕРА =============
(function initModalSwipe() {
    if (window.innerWidth > 450) return;

    const modal = document.getElementById('sliderModal');
    const modalImage = document.getElementById('sliderModalImage');
    if (!modal || !modalImage) return;

    let startX = 0;
    let isDragging = false;
    let currentIndex = 0;

    // Получаем массив изображений (он уже есть глобально из script.js)
    const images = window.imagesSrc || [];
    if (!images.length) return;

    // Обновляем индекс при открытии
    const originalOpen = window.openSliderModal;
    window.openSliderModal = function(index) {
        currentIndex = index;
        originalOpen(index);
    };

    // Обработчики свайпов
    modalImage.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false });

    modalImage.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    }, { passive: false });

    modalImage.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = e.changedTouches[0].clientX - startX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            let newIndex = currentIndex + (diff < 0 ? 1 : -1);
            if (newIndex >= 0 && newIndex < images.length && typeof changeImage === 'function') {
                changeImage(diff < 0 ? 1 : -1);
            }
        }
    });

    // Не даём клику по картинке закрывать модалку
    modalImage.addEventListener('click', (e) => e.stopPropagation());
})();