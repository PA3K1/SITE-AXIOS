// ============= МОДАЛЬНЫЕ ОКНА =============
function openModal(e) {
    e.preventDefault();
    const modal = document.querySelector('.modal');
    modal.style.opacity = '0';
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = '1', 10);
}

function openBodal(e) {
    e.preventDefault();
    const modal = document.querySelector('.modal--registration');
    modal.style.opacity = '0';
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = '1', 10);
}

function openSodal(e) {
    e.preventDefault();
    const modal = document.querySelector('.modal--auto');
    modal.style.opacity = '0';
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = '1', 10);
}

function closeModal() {
    const activeModal = document.querySelector('.modal[style*="display: block"]');
    if (activeModal) {
        activeModal.style.opacity = '0';
        setTimeout(() => activeModal.style.display = 'none', 300);
    }
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal--auto')) {
        e.target.style.opacity = '0';
        setTimeout(() => e.target.style.display = 'none', 300);
    }
});

function setupMasterCardSelection() {
    const masterCardImage = document.querySelector('.image_focus');
    const continueButton = document.querySelector('.modal-focus-link');
    
    if (masterCardImage && continueButton) {
        masterCardImage.addEventListener('click', function() {
            const isSelected = this.classList.toggle('selected');
            
            if (isSelected) {
                continueButton.classList.remove('disabled');
                continueButton.style.cursor = 'pointer';
            } else {
                continueButton.classList.add('disabled');
                continueButton.style.cursor = 'not-allowed';
            }
        });
        
        continueButton.addEventListener('click', function(e) {
            if (this.classList.contains('disabled')) {
                e.preventDefault();
                alert('Сначала выберите способ оплаты!');
            }
        });
    }
}

// ============= ПЕРЕКЛЮЧАТЕЛЬ КАРТИНОК =============
function setupVideoButtons() {
    const videoButtons = document.querySelectorAll('.mini-text');
    const videoFrame = document.getElementById('ax-mini');
    const videoContainer = document.querySelector('.container-mini-video');
    
    const videoUrls = {
        'rainbow-six': 'https://www.youtube.com/embed/HqpjPnctPtY',
        'rust': 'https://www.youtube.com/embed/ex1F_FYusYI',
        'pubg': 'https://www.youtube.com/embed/SghEK_6I0w0',
        'apex': 'https://www.youtube.com/embed/6hVBI7ZZe5s',
        'csgo': 'https://www.youtube.com/embed/-UNCF6lNNb8'
    };
    
    if (videoButtons.length > 0) {
        videoButtons[0].classList.add('active');
        
        videoButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('active')) return;
                
                videoButtons.forEach(btn => {
                    btn.classList.remove('active', 'switching');
                });
                
                this.classList.add('active');
                
                const videoKey = this.getAttribute('data-video');
                if (videoUrls[videoKey]) {
                    videoFrame.src = videoUrls[videoKey];
                }
            });
        });
    }
}

// Функция для прокрутки к тарифам
// Функция для плавной прокрутки к тарифам
function scrollToPrices() {
    const pricesSection = document.getElementById('prices');
    if (pricesSection) {
        pricesSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// ============= ПОЛЬЗОВАТЕЛИ И АВТОРИЗАЦИЯ =============
let users = [
    {email: "admin@test.com", password: "12345"},
    {email: "user@test.com", password: "qwerty"}
];


function checkCaptcha(inputValue) {
    return inputValue === "6138B";
}

function checkEmailExists(email) {
    return users.find(user => user.email === email);
}

function registerUser(email, password) {
    users.push({email: email, password: password});
}

function updateHeader() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const headerOpen = document.querySelector('.header__open');
    const authMessage = document.getElementById('authMessage');
    const commentForm = document.getElementById('commentForm');
    const commentButton = document.getElementById('commentButton');

    if (loggedInUser) {
        // Пользователь вошел
        headerOpen.innerHTML = `
            <span>${loggedInUser}</span>
            <a class="header__link open__modal" onclick="logoutUser()" href="#">ВЫХОД</a>
        `;

        if (authMessage) authMessage.style.display = 'none';
        if (commentForm) commentForm.style.display = 'block';
        if (commentButton) commentButton.style.display = 'block';

    } else {
        // Пользователь не вошел
        headerOpen.innerHTML = `
            <a class="header__link" onclick="openBodal(event)" href="#">Регистрация</a>
            <a class="header__link open__modal" onclick="openModal(event)" href="">ВХОД</a>
        `;

        if (authMessage) authMessage.style.display = 'block';
        if (commentForm) commentForm.style.display = 'none';
        if (commentButton) commentButton.style.display = 'none';
    }
}

function findUser(email, password) {
    return users.find(u => u.email === email && u.password === password);
}

function loginUser(email) {
    localStorage.setItem('loggedInUser', email);
    updateHeader();
    closeModal();
    alert("Успешный вход!");
}

function logoutUser() {
    localStorage.removeItem('loggedInUser');
    updateHeader();
    alert("Вы вышли из аккаунта!");
}

function handleRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const captcha = form.querySelector('input[placeholder="Введите код"]').value;
    
    if (!checkCaptcha(captcha)) {
        alert("Неверный код с картинки!");
        return;
    }
    
    if (checkEmailExists(email)) {
        alert("Пользователь с таким email уже существует!");
        return;
    }
    
    registerUser(email, password);
    alert("Регистрация успешна! Теперь можете войти.");
    
    closeModal();
    form.reset();
}

function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    const user = findUser(email, password);
    
    if (user) {
        loginUser(email);
        form.reset();
    } else {
        alert("Неверный email или пароль!");
    }
}



// ============= КНОПКА "ПОКАЗАТЬ БОЛЬШЕ" =============
const showBtn = document.getElementById('commentsShowMore');
if (showBtn) {
    showBtn.addEventListener('click', function() {
        const hiddenItems = document.querySelectorAll('.comments__item--hidden');
        
        for (let i = 0; i < 3 && i < hiddenItems.length; i++) {
            hiddenItems[i].classList.remove('comments__item--hidden');
            hiddenItems[i].classList.add('comments__item--visible');
        }
        
        const remaining = document.querySelectorAll('.comments__item--hidden');
        if (remaining.length === 0) {
            this.style.display = 'none';
        }
    });
}

// ============= СИСТЕМА КОММЕНТАРИЕВ  =============

function addComment() {
    const commentText = document.getElementById('commentText');
    const text = commentText.value.trim();
    const user = localStorage.getItem('loggedInUser');
    
    
    if (text.length < 5) {
        alert('Минимум 5 символов!');
        return;
    }
    
    // Создаем элемент комментария
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comments__item comments__item--visible';
    
    // Получаем текущую дату и время
    const now = new Date();
    const dateStr = now.toLocaleString('ru-RU');
    
    // HTML комментария с кнопкой удалить (ТОЛЬКО ДЛЯ НОВЫХ КОММЕНТАРИЕВ)
    commentDiv.innerHTML = `
        <div class="comments__sidebar"></div>
        <div class="comments__header">
            <span class="comments__username">${user}</span>
            <span class="comments__date">${dateStr}</span>
            <button class="delete-comment" onclick="if(confirm('Удалить комментарий?')) { this.closest('.comments__item').remove(); showToast(' Комментарий удален'); }"> Удалить</button>
        </div>
        <p class="comments__text">${text}</p>
    `;
    
    // Находим контейнер комментариев
    const commentsContainer = document.querySelector('.comments');
    
    // Находим ПЕРВЫЙ комментарий на странице
    const firstComment = document.querySelector('.comments__item');
    
    if (firstComment) {
        // Добавляем ПЕРЕД первым комментарием (САМЫЙ ВЕРХ)
        commentsContainer.insertBefore(commentDiv, firstComment);
    } else {
        // Если комментариев нет, добавляем перед сообщением об авторизации
        const authMessage = document.getElementById('authMessage');
        if (authMessage) {
            commentsContainer.insertBefore(commentDiv, authMessage);
        } else {
            commentsContainer.appendChild(commentDiv);
        }
    }
    
    // Очищаем поле
    commentText.value = '';
    
    showToast('✓ Комментарий добавлен');
}

// Настроить кнопку отправки
function setupCommentForm() {
    const submitBtn = document.getElementById('submitComment');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addComment();
        });
    }
}


// Функция для показа всплывающего сообщения
function showToast(message) {
    // Удаляем старое уведомление если есть
    const oldToast = document.querySelector('.comment-toast');
    if (oldToast) oldToast.remove();
    
    // Создаем новое уведомление
    const toast = document.createElement('div');
    toast.className = 'comment-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ---------- СЛАЙДЕР ----------
const track = document.getElementById('track');
const range = document.getElementById('range');

function updateSlider() {
    const firstSlide = track.children[0];
    if (!firstSlide) return;

    const slideWidth = firstSlide.offsetWidth;
    const marginRight = parseFloat(getComputedStyle(firstSlide).marginRight) || 0;
    const stepWidth = slideWidth + marginRight;
    const maxOffset = stepWidth;

    const val = parseInt(range.value, 10);
    const offset = (val / 100) * maxOffset;

    track.style.transform = `translateX(-${Math.round(offset)}px)`;
}

range.addEventListener('input', updateSlider);
window.addEventListener('resize', updateSlider);
updateSlider();

// ---------- МОДАЛКА С УСИЛЕННЫМ СДВИГОМ (переименована) ----------
const slides = document.querySelectorAll('.slide');
const sliderModal = document.getElementById('sliderModal');
const modalImage = document.getElementById('sliderModalImage');
const modalClose = document.getElementById('sliderModalClose');
const modalPrev = document.getElementById('sliderModalPrev');
const modalNext = document.getElementById('sliderModalNext');

// Массив src картинок
const imagesSrc = [];
slides.forEach(slide => {
    const img = slide.querySelector('img:first-child');
    if (img) imagesSrc.push(img.src);
});

let currentIndex = 0;
let isAnimating = false;

// Обновление состояния стрелок (disabled)
function updateNavButtons() {
    modalPrev.classList.toggle('slider-modal__nav--disabled', currentIndex === 0);
    modalNext.classList.toggle('slider-modal__nav--disabled', currentIndex === imagesSrc.length - 1);
}

// Открыть модалку слайдера
function openSliderModal(index) {
    if (index < 0 || index >= imagesSrc.length) return;
    currentIndex = index;
    modalImage.src = imagesSrc[currentIndex];
    sliderModal.classList.add('active');
    document.body.classList.add('modal-open');
    updateNavButtons();
}

// Закрыть модалку слайдера
function closeSliderModal() {
    sliderModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Анимация смены изображения
function changeImage(direction) {
    if (isAnimating) return;
    let newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex >= imagesSrc.length) return;

    isAnimating = true;

    // 1. Текущая картинка уезжает
    const offsetOut = direction > 0 ? '-100vw' : '100vw';
    modalImage.style.transition = 'transform 0.3s ease';
    modalImage.style.transform = `translateX(${offsetOut})`;

    setTimeout(() => {
        // 2. Меняем картинку
        currentIndex = newIndex;
        modalImage.src = imagesSrc[currentIndex];
        updateNavButtons();

        // 3. Мгновенно ставим новую картинку с противоположной стороны (без анимации)
        modalImage.style.transition = 'none';
        const offsetIn = direction > 0 ? '100vw' : '-100vw';
        modalImage.style.transform = `translateX(${offsetIn})`;

        // Небольшая задержка, чтобы браузер применил позицию без transition
        setTimeout(() => {
            // 4. Анимируем въезд в центр
            modalImage.style.transition = 'transform 0.3s ease';
            modalImage.style.transform = 'translateX(0)';

            // 5. Разблокируем кнопки после окончания анимации въезда
            setTimeout(() => {
                isAnimating = false;
                modalImage.style.transition = 'none';
            }, 300);
        }, 20);
    }, 300);
}

// Клик по слайду
slides.forEach((slide, idx) => {
    slide.addEventListener('click', () => {
        openSliderModal(idx);
    });
});

// Закрытие
modalClose.addEventListener('click', closeSliderModal);
sliderModal.addEventListener('click', (e) => {
    if (e.target === sliderModal) closeSliderModal();
});

// Стрелки с проверкой на disabled
modalPrev.addEventListener('click', () => {
    if (!modalPrev.classList.contains('slider-modal__nav--disabled')) {
        changeImage(-1);
    }
});
modalNext.addEventListener('click', () => {
    if (!modalNext.classList.contains('slider-modal__nav--disabled')) {
        changeImage(1);
    }
});

// Клавиши
window.addEventListener('keydown', (e) => {
    if (!sliderModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeSliderModal();
    if (e.key === 'ArrowLeft' && !modalPrev.classList.contains('slider-modal__nav--disabled')) {
        changeImage(-1);
    }
    if (e.key === 'ArrowRight' && !modalNext.classList.contains('slider-modal__nav--disabled')) {
        changeImage(1);
    }
});

// ============= СЛАЙДЕР ИГР =============
const gamesData = [
    { title: "Pubg", img: "https://axios-macro.com/images/gradient/avif/lite.avif", url: "https://axios-macro.com/pubg" },
    { title: "Apex", img: "https://axios-macro.com/images/gradient/avif/apex.avif", url: "https://axios-macro.com/apex" },
    { title: "BF 2042", img: "https://axios-macro.com/images/gradient/avif/bf2042.avif", url: "https://axios-macro.com/battlefield2042" },
    { title: "COD WARZONE", img: "https://axios-macro.com/images/gradient/avif/mw2.avif", url: "https://axios-macro.com/warzone" },
    { title: "cs:go", img: "https://axios-macro.com/images/gradient/avif/csgo.avif", url: "https://axios-macro.com/csgo" },
    { title: "РАСТ", img: "https://axios-macro.com/images/gradient/avif/rust.avif", url: "https://axios-macro.com/rust" },
    { title: "R6 Siege", img: "https://axios-macro.com/images/gradient/avif/r6.avif", url: "https://axios-macro.com/r6siege" }
];

const galery = document.getElementById('galery');
const textGames = document.getElementById('text-games');
const dotsContainer = document.getElementById('dots');

// Проверяем, есть ли слайдер на странице
if (galery && textGames && dotsContainer) {
    const totalRealItems = gamesData.length;
    const itemsToShow = 4;
    let currentIndex = totalRealItems;
    let isTransitioning = false;
    let autoPlayInterval;

    function createElements() {
        const displayItems = [...gamesData, ...gamesData, ...gamesData];
        
        displayItems.forEach((game, index) => {
            const card = document.createElement('div');
            card.className = 'card-game';
            card.setAttribute('data-original-index', index % totalRealItems);
            card.innerHTML = `<a href="${game.url}"><img src="${game.img}" alt="${game.title}"></a>`;
            galery.appendChild(card);

            const btnItem = document.createElement('div');
            btnItem.className = 'text-game-item';
            btnItem.innerHTML = `<a class="text-game" href="${game.url}" data-index="${index % totalRealItems}">${game.title}</a>`;
            textGames.appendChild(btnItem);
        });

        for (let i = 0; i < totalRealItems; i++) {
            const dot = document.createElement('span');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', i);
            dot.onclick = () => goToSlide(i + totalRealItems);
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider(withTransition = true) {
        if (withTransition) {
            galery.classList.add('transition');
            textGames.classList.add('transition');
        } else {
            galery.classList.remove('transition');
            textGames.classList.remove('transition');
        }

        const containerWidth = document.querySelector('.galery-wrapper').clientWidth;
        const gap = 20;
        const cardWidth = (containerWidth - (itemsToShow - 1) * gap) / itemsToShow;
        const step = cardWidth + gap;
        const offset = -currentIndex * step;
        
        galery.style.transform = `translateX(${offset}px)`;
        textGames.style.transform = `translateX(${offset}px)`;

        const activeDotIndex = currentIndex % totalRealItems;
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === activeDotIndex);
        });
    }

    function handleTransitionEnd() {
        isTransitioning = false;
        
        if (currentIndex < totalRealItems) {
            currentIndex += totalRealItems;
            updateSlider(false);
        }
        if (currentIndex >= totalRealItems * 2) {
            currentIndex -= totalRealItems;
            updateSlider(false);
        }
    }

    galery.addEventListener('transitionend', handleTransitionEnd);

    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    function setupImageHighlight() {
        const allImages = document.querySelectorAll('.card-game img');
        const allTextButtons = document.querySelectorAll('.text-game');
        
        function resetAllImages() {
            allImages.forEach(img => {
                img.style.filter = '';
                img.style.transform = '';
            });
        }
        
        allImages.forEach(img => {
            img.addEventListener('mouseenter', (e) => {
                allImages.forEach(img => {
                    img.style.filter = 'grayscale() brightness(100%)';
                });
                e.target.style.filter = 'grayscale(0%) brightness(1)';
            });
            
            img.addEventListener('mouseleave', resetAllImages);
        });
        
        allTextButtons.forEach((button, index) => {
            button.addEventListener('mouseenter', () => {
                allImages.forEach(img => {
                    img.style.filter = 'grayscale() brightness(100%)';
                    img.style.transform = 'scale(1)';
                });
                
                if (allImages[index]) {
                    allImages[index].style.filter = 'grayscale(0%) brightness(1)';
                }
            });
            
            button.addEventListener('mouseleave', resetAllImages);
        });
    }

        document.addEventListener('DOMContentLoaded', function() {
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabId = this.dataset.tab;
                    const info = document.querySelector(`.info[data-tab="${tabId}"]`);
                    const isOpen = info.classList.contains('open');

                    if (isOpen) return;

                    document.querySelectorAll('.info.open').forEach(openInfo => {
                        openInfo.classList.remove('open');
                        const openTabId = openInfo.dataset.tab;
                        const openTab = document.querySelector(`.tab[data-tab="${openTabId}"]`);
                        if (openTab) openTab.classList.remove('active');
                    });

                    info.classList.add('open');
                    this.classList.add('active');
                });
            });
        });


    // Инициализация слайдера
    createElements();
    setTimeout(() => updateSlider(false), 50);
    setupImageHighlight();
    startAutoPlay();

    window.addEventListener('resize', () => updateSlider(false));
    
    const container = document.querySelector('.games-slider-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }
}

// ============= ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =============
function initializeAll() {
    updateHeader(); // обновляет шапку и показывает/скрывает форму комментариев
    
    document.querySelector('.modal form').addEventListener('submit', handleLogin);
    document.querySelector('.modal--registration form').addEventListener('submit', handleRegistration);



    updateNavButtons();
    setupMasterCardSelection();
    setupVideoButtons();
    setupCommentForm();
}

// Запуск при загрузке
window.onload = initializeAll;