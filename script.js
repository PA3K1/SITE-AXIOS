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

function setupMasterCardSelection() {
    const masterCardImage = document.querySelector('.image_focus');
    
    if (masterCardImage) {
        masterCardImage.addEventListener('click', function() {
            // Добавляем/убираем класс selected при клике
            this.classList.toggle('selected');
        });
    }
}

function setupMasterCardSelection() {
    const masterCardImage = document.querySelector('.image_focus');
    const continueButton = document.querySelector('.modal-focus-link');
    
    if (masterCardImage && continueButton) {
        masterCardImage.addEventListener('click', function() {
            // Переключаем selected у картинки
            const isSelected = this.classList.toggle('selected');
            
            // Если картинка выбрана - активируем кнопку
            if (isSelected) {
                continueButton.classList.remove('disabled');
                continueButton.style.cursor = 'pointer';
            } else {
                continueButton.classList.add('disabled');
                continueButton.style.cursor = 'not-allowed';
            }
        });
        
        // При клике на кнопку проверяем
        continueButton.addEventListener('click', function(e) {
            if (this.classList.contains('disabled')) {
                e.preventDefault(); // Не даём перейти
                alert('Сначала выберите способ оплаты!');
            }
            // Если не disabled - переход сработает нормально
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
    
    // Первая кнопка активна по умолчанию
    videoButtons[0].classList.add('active');
    
    videoButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Если уже активна - ничего не делаем
            if (this.classList.contains('active')) return;
            
            // 1. Добавляем эффект нажатия на текущую активную кнопку
            const currentActive = document.querySelector('.mini-text.active');
            if (currentActive) {
                currentActive.classList.add('switching');
            }
            
            // 2. Плавно скрываем видео
            videoContainer.style.opacity = '0.9';
            
            // 3. Через 200ms меняем всё
            setTimeout(() => {
                // Убираем классы у всех кнопок
                videoButtons.forEach(btn => {
                    btn.classList.remove('active', 'switching');
                });
                
                // Добавляем active к нажатой
                this.classList.add('active');
                
                // Меняем видео
                const videoKey = this.getAttribute('data-video');
                if (videoUrls[videoKey]) {
                    videoFrame.src = videoUrls[videoKey];
                }
                
                // Плавно показываем новое видео
                setTimeout(() => {
                    videoContainer.style.opacity = '1';
                }, 50);
                
            }, 200); // Совпадает с временем opacity transition
        });
    });
}


// Функция для прокрутки к тарифам
function scrollToPrices() {
    document.getElementById('prices')?.scrollIntoView();
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
    
    if (loggedInUser) {
        headerOpen.innerHTML = `
            <span>${loggedInUser}</span>
            <a class="header__link open__modal" onclick="logoutUser()" href="#">ВЫХОД</a>
        `;
    }
}

function findUser(email, password) {
    return users.find(u => u.email === email && u.password === password);
}

function loginUser(email) {
    localStorage.setItem('loggedInUser', email);
    updateHeader();
}

function logoutUser() {
    localStorage.removeItem('loggedInUser');
    const headerOpen = document.querySelector('.header__open');
    headerOpen.innerHTML = `
        <a class="header__link" onclick="openBodal(event)" href="#">Регистрация</a>
        <a class="header__link open__modal" onclick="openModal(event)" href="">ВХОД</a>
    `;
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
        closeModal();
        form.reset();
        alert("Успешный вход!");
    } else {
        alert("Неверный email или пароль!");
    }
}

function initializeApp() {
    updateHeader();
    
    document.querySelector('.modal--registration form').addEventListener('submit', handleRegistration);
    document.querySelector('.modal form').addEventListener('submit', handleLogin);
    
    document.querySelectorAll('.modal__close').forEach(btn => {
        btn.onclick = closeModal;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для всех модальных окон
    document.querySelectorAll('.modal, .modal_windoy').forEach(modal => {
        modal.addEventListener('click', function(e) {
            // Если кликнули на сам оверлей (фон), а не на его содержимое
            if (e.target === this) {
                closeModal();
            }
        });
    });
});


const showBtn = document.getElementById('showMoreBtn');

showBtn.addEventListener('click', function() {
    // Каждый раз ищем СВЕЖИЙ список скрытых комментариев
    const hiddenComments = document.querySelectorAll('.coments-section.hidden');
    
    // Берём первые 3 из ТЕКУЩИХ скрытых
    for (let i = 0; i < 3 && i < hiddenComments.length; i++) {
        hiddenComments[i].classList.remove('hidden');
    }
    
    // Проверяем сколько осталось скрытых
    const remaining = document.querySelectorAll('.coments-section.hidden');
    if (remaining.length === 0) {
        showBtn.style.display = 'none';
    }
});


// ============= СЛАЙДЕР ИГР =============

// Массив данных об играх, содержащий название, URL картинки и ссылку
const gamesData = [
    { title: "Pubg", img: "https://axios-macro.com/images/gradient/avif/lite.avif", url: "https://axios-macro.com/pubg" },
    { title: "Apex", img: "https://axios-macro.com/images/gradient/avif/apex.avif", url: "https://axios-macro.com/apex" },
    { title: "BF 2042", img: "https://axios-macro.com/images/gradient/avif/bf2042.avif", url: "https://axios-macro.com/battlefield2042" },
    { title: "COD WARZONE", img: "https://axios-macro.com/images/gradient/avif/mw2.avif", url: "https://axios-macro.com/warzone" },
    { title: "cs:go", img: "https://axios-macro.com/images/gradient/avif/csgo.avif", url: "https://axios-macro.com/csgo" },
    { title: "РАСТ", img: "https://axios-macro.com/images/gradient/avif/rust.avif", url: "https://axios-macro.com/rust" },
    { title: "R6 Siege", img: "https://axios-macro.com/images/gradient/avif/r6.avif", url: "https://axios-macro.com/r6siege" }
];

// Получаем DOM-элементы слайдера
const galery = document.getElementById('galery'); // Контейнер для изображений игр
const textGames = document.getElementById('text-games'); // Контейнер для текстовых кнопок
const dotsContainer = document.getElementById('dots'); // Контейнер для точек-индикаторов

// Настройки слайдера
const totalRealItems = gamesData.length; // Количество реальных элементов (7)
const itemsToShow = 4; // Сколько элементов показывать одновременно
let currentIndex = totalRealItems; // Текущий индекс (стартуем с середины для бесконечного эффекта)
let isTransitioning = false; // Флаг анимации (чтобы не было конфликтов при быстрых кликах)
let autoPlayInterval; // Интервал для автопрокрутки

// ============= ОСНОВНЫЕ ФУНКЦИИ СЛАЙДЕРА =============

// Функция создания всех элементов слайдера (картинки, кнопки, точки)
function createElements() {
    // Создаем 3 копии массива для эффекта бесконечного скролла
    const displayItems = [...gamesData, ...gamesData, ...gamesData];
    
    // Создаем карточки с изображениями игр
    displayItems.forEach((game, index) => {
        // Создаем div для карточки игры
        const card = document.createElement('div');
        card.className = 'card-game'; // Добавляем CSS-класс
        // Сохраняем оригинальный индекс (0-6) для связи с кнопками
        card.setAttribute('data-original-index', index % totalRealItems);
        // Вставляем изображение с ссылкой
        card.innerHTML = `<a href="${game.url}"><img src="${game.img}" alt="${game.title}"></a>`;
        galery.appendChild(card); // Добавляем в контейнер

        // Создаем текстовую кнопку для игры
        const btnItem = document.createElement('div');
        btnItem.className = 'text-game-item'; // CSS-класс
        // Кнопка с текстом названия игры
        btnItem.innerHTML = `<a class="text-game" href="${game.url}" data-index="${index % totalRealItems}">${game.title}</a>`;
        textGames.appendChild(btnItem); // Добавляем в контейнер
    });

    // Создаем точки-индикаторы (по количеству реальных игр)
    for (let i = 0; i < totalRealItems; i++) {
        const dot = document.createElement('span');
        dot.className = `dot ${i === 0 ? 'active' : ''}`; // Первая точка активна
        dot.setAttribute('data-index', i); // Сохраняем индекс
        dot.onclick = () => goToSlide(i + totalRealItems); // Обработчик клика
        dotsContainer.appendChild(dot); // Добавляем в контейнер
    }
}

// Функция обновления позиции слайдера
function updateSlider(withTransition = true) {
    // Включаем или выключаем CSS-переходы
    if (withTransition) {
        galery.classList.add('transition');
        textGames.classList.add('transition');
    } else {
        galery.classList.remove('transition');
        textGames.classList.remove('transition');
    }

    // Рассчитываем ширину контейнера
    const containerWidth = document.querySelector('.galery-wrapper').clientWidth;
    const gap = 20; // Расстояние между элементами
    // Рассчитываем ширину одной карточки
    const cardWidth = (containerWidth - (itemsToShow - 1) * gap) / itemsToShow;
    const step = cardWidth + gap; // Шаг смещения (ширина карточки + отступ)
    const offset = -currentIndex * step; // Общее смещение
    
    // Применяем смещение к слайдерам изображений и текстов
    galery.style.transform = `translateX(${offset}px)`;
    textGames.style.transform = `translateX(${offset}px)`;

    // Обновляем активную точку-индикатор
    const activeDotIndex = currentIndex % totalRealItems; // Индекс от 0 до 6
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === activeDotIndex); // Делаем активной нужную точку
    });
}

// Обработчик завершения CSS-перехода
function handleTransitionEnd() {
    isTransitioning = false; // Сбрасываем флаг анимации
    
    // Если вышли за левую границу (перешли в начало)
    if (currentIndex < totalRealItems) {
        currentIndex += totalRealItems; // Перемещаемся в середину
        updateSlider(false); // Обновляем без анимации
    }
    // Если вышли за правую границу (перешли в конец)
    if (currentIndex >= totalRealItems * 2) {
        currentIndex -= totalRealItems; // Перемещаемся в середину
        updateSlider(false); // Обновляем без анимации
    }
}

// Вешаем обработчик на завершение CSS-перехода
galery.addEventListener('transitionend', handleTransitionEnd);

// Функция перехода к конкретному слайду
function goToSlide(index) {
    if (isTransitioning) return; // Если уже идет анимация - выходим
    isTransitioning = true; // Устанавливаем флаг анимации
    currentIndex = index; // Обновляем текущий индекс
    updateSlider(); // Запускаем обновление с анимацией
}

// Функция перехода к следующему слайду
function nextSlide() {
    goToSlide(currentIndex + 1);
}

// Функция запуска автопрокрутки
function startAutoPlay() {
    stopAutoPlay(); // Сначала останавливаем предыдущий интервал
    autoPlayInterval = setInterval(nextSlide, 5000); // Запускаем с интервалом 5 сек
}

// Функция остановки автопрокрутки
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval); // Очищаем интервал
    }
}

// Функция настройки подсветки картинок при наведении
function setupImageHighlight() {
    const allImages = document.querySelectorAll('.card-game img'); // Все изображения
    const allTextButtons = document.querySelectorAll('.text-game'); // Все текстовые кнопки
    
    // Функция сброса всех эффектов подсветки
    function resetAllImages() {
        allImages.forEach(img => {
            img.style.filter = ''; // Сбрасываем фильтры
            img.style.transform = ''; // Сбрасываем трансформации
        });
    }
    
    // 1. Наведение на саму картинку
    allImages.forEach(img => {
        img.addEventListener('mouseenter', (e) => {
            // Все картинки делаем черно-белыми
            allImages.forEach(img => {
                img.style.filter = 'grayscale() brightness(100%)';
            });
            // Текущую картинку оставляем цветной
            e.target.style.filter = 'grayscale(0%) brightness(1)';
        });
        
        img.addEventListener('mouseleave', resetAllImages); // При уходе сбрасываем
    });
    
    // 2. Наведение на текстовую кнопку
    allTextButtons.forEach((button, index) => {
        button.addEventListener('mouseenter', () => {
            // Все картинки делаем черно-белыми
            allImages.forEach(img => {
                img.style.filter = 'grayscale() brightness(100%)';
                img.style.transform = 'scale(1)';
            });
            
            // Находим соответствующую картинку по индексу
            if (allImages[index]) {
                allImages[index].style.filter = 'grayscale(0%) brightness(1)';
            }
        });
        
        button.addEventListener('mouseleave', resetAllImages); // При уходе сбрасываем
    });
}

// ============= ИНИЦИАЛИЗАЦИЯ ВСЕГО ПРИЛОЖЕНИЯ =============

// Главная функция инициализации всего приложения
function initializeAll() {
    initializeApp();
    
    // Инициализация слайдера
    createElements(); // Создаем элементы
    setTimeout(() => updateSlider(false), 50); // Обновляем позицию после небольшой задержки
    
    // Инициализация подсветки картинок
    setupImageHighlight();
    
    setupMasterCardSelection();
    // Автоплей слайдера
    startAutoPlay();

    setupVideoButtons();

    // Обработка изменения размера окна
    window.addEventListener('resize', () => updateSlider(false)); // Без анимации
    
    // Остановка автоплея при наведении на слайдер
    const container = document.querySelector('.games-slider-container');
    container.addEventListener('mouseenter', stopAutoPlay); // Останавливаем при наведении
    container.addEventListener('mouseleave', startAutoPlay); // Возобновляем при уходе
}

// Запуск при полной загрузке страницы
window.onload = initializeAll;

