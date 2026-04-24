window.App = window.App || {};

window.App.users = [
    { email: "admin@test.com", password: "12345" },
    { email: "user@test.com", password: "qwerty" }
];

window.App.checkCaptcha = function(input) {
    return input === "6138B";
};

window.App.checkEmailExists = function(email) {
    return window.App.users.find(u => u.email === email);
};

window.App.registerUser = function(email, password) {
    window.App.users.push({ email, password });
};

window.App.updateHeader = function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const headerOpen = document.querySelector('.header__open');
    const mobileActions = document.querySelector('.mobile-actions');
    const authMessage = document.getElementById('authMessage');
    const commentForm = document.getElementById('commentForm');
    const commentButton = document.getElementById('commentButton');

    if (loggedInUser) {
        if (headerOpen) {
            headerOpen.innerHTML = `<span>${loggedInUser}</span> <a class="header__link open__modal" onclick="window.App.logoutUser()" href="#">ВЫХОД</a>`;
        }
        if (mobileActions) {
            mobileActions.innerHTML = `<span class="header__link" style="color:white;">${loggedInUser}</span> <a class="header__link open__modal" onclick="window.App.logoutUser()" href="#">ВЫХОД</a>`;
        }
        if (authMessage) authMessage.style.display = 'none';
        if (commentForm) commentForm.style.display = 'block';
        if (commentButton) commentButton.style.display = 'block';
    } else {
        if (headerOpen) {
            headerOpen.innerHTML = `<a class="header__link" onclick="window.App.openBodal(event)" href="#">Регистрация</a> <a class="header__link open__modal" onclick="window.App.openModal(event)" href="">ВХОД</a>`;
        }
        if (mobileActions) {
            mobileActions.innerHTML = `<a class="header__link" onclick="window.App.openBodal(event)" href="#">Регистрация</a> <a class="header__link open__modal" onclick="window.App.openModal(event)" href="">ВХОД</a>`;
        }
        if (authMessage) authMessage.style.display = 'block';
        if (commentForm) commentForm.style.display = 'none';
        if (commentButton) commentButton.style.display = 'none';
    }
};

window.App.findUser = function(email, password) {
    return window.App.users.find(u => u.email === email && u.password === password);
};

window.App.loginUser = function(email) {
    localStorage.setItem('loggedInUser', email);
    window.App.updateHeader();
    window.App.closeModal();
    window.App.showToast('Успешный вход!');
};

window.App.logoutUser = function() {
    localStorage.removeItem('loggedInUser');
    window.App.updateHeader();
    window.App.showToast('Вы вышли из аккаунта!');
};

// Обработчики форм
document.addEventListener('submit', function(e) {
    if (e.target.id === 'loginForm') {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;
        const user = window.App.findUser(email, password);
        if (user) {
            window.App.loginUser(email);
            form.reset();
        } else {
            window.App.showToast('Неверный email или пароль!');
        }
    }

    if (e.target.id === 'registrationForm') {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[name="email"]').value;
        const password = form.querySelector('input[name="password"]').value;
        const captcha = form.querySelector('input[placeholder="Введите код"]').value;

        if (!window.App.checkCaptcha(captcha)) {
            window.App.showToast('Неверный код с картинки!');
            return;
        }
        if (window.App.checkEmailExists(email)) {
            window.App.showToast('Пользователь с таким email уже существует!');
            return;
        }

        window.App.registerUser(email, password);
        // Автоматический вход после регистрации: закроет модалку, обновит шапку, покажет тост
        window.App.loginUser(email);
    }
});