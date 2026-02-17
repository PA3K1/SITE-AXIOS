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

// ============= МОБИЛЬНЫЙ СЛАЙДЕР СКРИНШОТОВ (плавный ползунок и свайп) =============
(function() {
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
    let startTransform = 0;
    let isDragging = false;

    // Функция обновления позиции по значению ползунка (0-100)
    function updatePositionFromRange() {
        const val = parseFloat(range.value);
        const offset = (val / 100) * maxOffset;
        track.style.transform = `translateX(-${offset}px)`;
        currentOffset = offset;
    }

    // Синхронизация ползунка по смещению
    function updateRangeFromOffset(offset) {
        let val = (offset / maxOffset) * 100;
        val = Math.min(100, Math.max(0, val));
        range.value = val;
    }

    // Начальная установка
    updatePositionFromRange();

    // Обработчик изменения ползунка (плавное перемещение)
    range.addEventListener('input', () => {
        if (isDragging) return; // во время свайпа не реагируем
        updatePositionFromRange();
    });

    // Обновление геометрии при изменении размера окна
    window.addEventListener('resize', () => {
        slideWidth = slides[0].offsetWidth;
        maxOffset = slideWidth * (totalSlides - 1);
        updatePositionFromRange();
    });

    // Свайпы
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startTransform = currentOffset;
        isDragging = true;
        track.style.transition = 'none';
        e.preventDefault();
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const diff = (startX - e.touches[0].clientX) * 1; // чувствительность
        let newOffset = startTransform + diff;
        newOffset = Math.min(maxOffset, Math.max(0, newOffset));
        track.style.transform = `translateX(-${newOffset}px)`;
        updateRangeFromOffset(newOffset);
        currentOffset = newOffset;
    });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.3s ease';
        // Определяем ближайший слайд
        const nearestIndex = Math.round(currentOffset / slideWidth);
        const targetOffset = nearestIndex * slideWidth;
        track.style.transform = `translateX(-${targetOffset}px)`;
        currentOffset = targetOffset;
        updateRangeFromOffset(targetOffset);
        setTimeout(() => {
            track.style.transition = '';
        }, 300);
    });

    track.addEventListener('touchcancel', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = '';
        track.style.transform = `translateX(-${currentOffset}px)`;
        updateRangeFromOffset(currentOffset);
    });
})();


// ---------- МОДАЛКА: поддержка свайпов на мобильных ----------
(function() {
    if (window.innerWidth > 450) return;

    document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('sliderModal');
        const modalImage = document.getElementById('sliderModalImage');
        // imagesSrc должен быть глобальным из script.js
        if (!modal || !modalImage || typeof imagesSrc === 'undefined' || !imagesSrc.length) return;

        let modalStartX = 0;
        let modalCurrentIndex = 0;
        let modalIsDragging = false;
        const threshold = 50;

        // Сохраняем оригинальную функцию
        const originalOpen = window.openSliderModal;

        // Переопределяем открытие, чтобы запоминать индекс
        window.openSliderModal = function(index) {
            modalCurrentIndex = index;
            originalOpen(index);
        };

        // Переключение по направлению
        function switchSlide(direction) {
            let newIndex = modalCurrentIndex + direction;
            if (newIndex >= 0 && newIndex < imagesSrc.length) {
                openSliderModal(newIndex);
            }
        }

        // События касания на изображении
        modalImage.addEventListener('touchstart', (e) => {
            modalStartX = e.touches[0].clientX;
            modalIsDragging = true;
            e.preventDefault(); // запрещаем скролл страницы
            e.stopPropagation(); // запрещаем закрытие модалки
        }, { passive: false });

        modalImage.addEventListener('touchmove', (e) => {
            if (!modalIsDragging) return;
            e.preventDefault();
        }, { passive: false });

        modalImage.addEventListener('touchend', (e) => {
            if (!modalIsDragging) return;
            modalIsDragging = false;
            const diff = e.changedTouches[0].clientX - modalStartX;
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // свайп вправо -> предыдущий
                    switchSlide(-1);
                } else {
                    // свайп влево -> следующий
                    switchSlide(1);
                }
            }
        });

        // Предотвращаем всплытие клика, чтобы не закрыть модалку случайно
        modalImage.addEventListener('click', (e) => e.stopPropagation());
    });
})();