document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu__close');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            hamburger.style.display = 'none';
        });
    }

    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.style.display = 'block';
        });
    }

    const mobileLinks = document.querySelectorAll('.mobile-nav__link:not(.mobile-nav__dropdown-trigger)');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.style.display = 'block';
        });
    });

    const dropdownTrigger = document.querySelector('.mobile-nav__dropdown-trigger');
    if (dropdownTrigger) {
        dropdownTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.mobile-nav__dropdown');
            dropdown.classList.toggle('active');
        });
    }
});

function getItemsToShow() {
    return window.innerWidth <= 450 ? 1 : 4;
}

// ============= МОБИЛЬНЫЙ СЛАЙДЕР =============
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
            track.style.transition = 'none';
        }, 300);
    }

    updatePosition(0);
    range.value = 0;

    range.addEventListener('input', (e) => {
        if (isDragging) return;
        const val = parseFloat(e.target.value);
        const offset = (val / 100) * maxOffset;
        track.style.transition = 'none';
        updatePosition(offset);
    });

    window.addEventListener('resize', () => {
        slideWidth = slides[0].offsetWidth;
        maxOffset = slideWidth * (totalSlides - 1);
        updatePosition(currentOffset);
    });

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

// ============= МОДАЛКА: ПРОСТЫЕ СВАЙПЫ =============
(function initModalSwipe() {
    if (window.innerWidth > 450) return;

    const modal = document.getElementById('sliderModal');
    const modalImage = document.getElementById('sliderModalImage');
    const images = window.imagesSrc || [];
    
    if (!modal || !modalImage || !images.length) return;

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipe = 30; // минимальное расстояние свайпа

    // Обновляем индекс при открытии
    const originalOpen = window.openSliderModal;
    window.openSliderModal = function(index) {
        currentIndex = index;
        originalOpen(index);
    };

    // Функции переключения
    function nextSlide() {
        if (currentIndex < images.length - 1 && typeof changeImage === 'function') {
            changeImage(1);
        }
    }

    function prevSlide() {
        if (currentIndex > 0 && typeof changeImage === 'function') {
            changeImage(-1);
        }
    }

    // Обработчики касаний
    modalImage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modalImage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > minSwipe) {
            if (diff < 0) {
                nextSlide(); // свайп влево
            } else {
                prevSlide(); // свайп вправо
            }
        }
    }, { passive: true });

    // Не закрывать модалку при клике на картинку
    modalImage.addEventListener('click', (e) => e.stopPropagation());
})();