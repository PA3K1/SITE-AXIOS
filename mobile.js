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

    // ============= СЛАЙДЕР СКРИНШОТОВ =============
    const track = document.getElementById('track');
    const range = document.getElementById('range');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (!track || !range || !slides.length) {
        console.log('Слайдер не найден');
        return;
    }

    console.log('Найдено слайдов:', totalSlides);

    function updateSlider() {
        const firstSlide = track.children[0];
        if (!firstSlide) return;

        const slideWidth = firstSlide.offsetWidth;
        const marginRight = parseFloat(getComputedStyle(firstSlide).marginRight) || 0;
        const stepWidth = slideWidth + marginRight;

        let maxOffset;
        if (window.innerWidth <= 450) {
            maxOffset = (totalSlides - 1) * stepWidth;
        } else {
            maxOffset = stepWidth;
        }

        const val = parseInt(range.value, 10);
        const offset = (val / 100) * maxOffset;
        track.style.transform = `translateX(-${Math.round(offset)}px)`;
    }

    range.addEventListener('input', updateSlider);
    window.addEventListener('resize', updateSlider);
    updateSlider();

    // ============= МОДАЛКА СО SWIPER =============
    const sliderModal = document.getElementById('sliderModal');
    const modalClose = document.getElementById('sliderModalClose');
    const swiperWrapper = document.querySelector('#modalSwiper .swiper-wrapper');
    let swiperInstance = null;

    if (!sliderModal || !modalClose || !swiperWrapper) {
        console.log('Элементы модалки не найдены');
        return;
    }

    // Собираем изображения из слайдов
    const images = [];
    slides.forEach(slide => {
        const img = slide.querySelector('img:first-child');
        if (img) {
            console.log('Найдено изображение:', img.src);
            images.push({ 
                src: img.src, 
                alt: img.alt || 'Скриншот' 
            });
        }
    });

    console.log('Загружено изображений:', images.length);

    function openModal(index) {
        console.log('Открытие модалки с индексом:', index);
        
        if (images.length === 0) {
            alert('Нет изображений для отображения');
            return;
        }

        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        // Очищаем и заполняем wrapper
        swiperWrapper.innerHTML = '';
        
        images.forEach(imgData => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'swiper-slide';
            const imgElem = document.createElement('img');
            imgElem.src = imgData.src;
            imgElem.alt = imgData.alt;
            imgElem.onerror = function() {
                console.error('Ошибка загрузки:', imgData.src);
            };
            slideDiv.appendChild(imgElem);
            swiperWrapper.appendChild(slideDiv);
        });

        sliderModal.classList.add('active');
        document.body.classList.add('modal-open');

        setTimeout(() => {
            if (typeof Swiper !== 'undefined') {
                console.log('Инициализация Swiper с индексом:', index);
                swiperInstance = new Swiper('#modalSwiper', {
                    initialSlide: index,
                    speed: 300,
                    spaceBetween: 10,
                    slidesPerView: 1,
                    centeredSlides: true,
                    loop: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    simulateTouch: true,
                    touchRatio: 1,
                    touchAngle: 45,
                    grabCursor: true,
                    on: {
                        init: function() {
                            console.log('Swiper инициализирован');
                        }
                    }
                });
            } else {
                console.error('Swiper не загружен!');
                alert('Ошибка загрузки Swiper');
            }
        }, 100);
    }

    function closeModal() {
        console.log('Закрытие модалки');
        sliderModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Добавляем обработчики на слайды
    slides.forEach((slide, idx) => {
        slide.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Клик по слайду', idx);
            openModal(idx);
        });
    });

    modalClose.addEventListener('click', closeModal);
    
    sliderModal.addEventListener('click', (e) => {
        if (e.target === sliderModal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (sliderModal?.classList.contains('active') && e.key === 'Escape') {
            closeModal();
        }
    });
});

function getItemsToShow() {
    return window.innerWidth <= 450 ? 1 : 4;
}