App.initScreenshotsSlider = function() {
    const track = document.getElementById('track');
    const range = document.getElementById('range');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    if (!track || !range || !slides.length) return;

    function updateSlider() {
        const firstSlide = track.children[0];
        if (!firstSlide) return;
        const slideWidth = firstSlide.offsetWidth;
        const slideMargin = parseFloat(getComputedStyle(firstSlide).marginLeft) || 0;
        const stepWidth = slideWidth + slideMargin;
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

    // Swiper modal
    const sliderModal = document.getElementById('sliderModal');
    const modalClose = document.getElementById('sliderModalClose');
    const swiperWrapper = document.querySelector('#modalSwiper .swiper-wrapper');
    let swiperInstance = null;

    if (!sliderModal || !modalClose || !swiperWrapper) return;

    const images = [];
    slides.forEach(slide => {
        const img = slide.querySelector('img:first-child');
        if (img) images.push({ src: img.src, alt: img.alt || 'Скриншот' });
    });

    function openModal(index) {
        if (images.length === 0) {
            alert('Нет изображений для отображения');
            return;
        }
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }
        swiperWrapper.innerHTML = '';
        images.forEach(imgData => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'swiper-slide';
            const imgElem = document.createElement('img');
            imgElem.src = imgData.src;
            imgElem.alt = imgData.alt;
            slideDiv.appendChild(imgElem);
            swiperWrapper.appendChild(slideDiv);
        });
        sliderModal.classList.add('active');
        document.body.classList.add('modal-open');

        // Дождёмся полной загрузки всех изображений
        const allImages = swiperWrapper.querySelectorAll('img');
        let loadedCount = 0;
        const totalImages = allImages.length;

        function checkAllLoaded() {
            loadedCount++;
            if (loadedCount === totalImages) {
                initSwiper(index);
            }
        }

        if (totalImages === 0) {
            initSwiper(index);
        } else {
            allImages.forEach(img => {
                if (img.complete) {
                    checkAllLoaded();
                } else {
                    img.addEventListener('load', checkAllLoaded);
                    img.addEventListener('error', checkAllLoaded);
                }
            });
        }
    }

    function initSwiper(index) {
        swiperInstance = new Swiper('#modalSwiper', {
            initialSlide: index,
            speed: 300,
            spaceBetween: 10,
            slidesPerView: 1,
            centeredSlides: true,
            loop: false,
            navigation: {
                nextEl: '#modalSwiper .swiper-button-next',
                prevEl: '#modalSwiper .swiper-button-prev',
            },
            simulateTouch: true,
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
        });
    }

    function closeModal() {
        sliderModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    slides.forEach((slide, idx) => {
        slide.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(idx);
        });
    });

    modalClose.addEventListener('click', closeModal);
    sliderModal.addEventListener('click', (e) => {
        if (e.target === sliderModal) closeModal();
    });
    window.addEventListener('keydown', (e) => {
        if (sliderModal?.classList.contains('active') && e.key === 'Escape') {
            closeModal();
        }
    });
};