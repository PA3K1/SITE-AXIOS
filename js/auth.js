window.App = window.App || {};


window.App.users = []; // Пустой массив — заполняется с сервера

window.App.checkCaptcha = function(input) {
    return input === "6138B";
};

window.App.checkEmailExists = function(email) {
    return window.App.users.find(u => u.email === email);
};

window.App.registerUser = function(email, password) {
    // ⚠️ В реальном проекте — POST-запрос на сервер
    console.warn('Register:', email);
};

window.App.findUser = function(email, password) {
    // ⚠️ В реальном проекте — запрос на сервер
    console.warn('Login attempt:', email);
    return null;
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
            headerOpen.innerHTML = `<span class="header__user-email">${loggedInUser}</span> <a class="header__link open__modal" onclick="window.App.logoutUser()" href="#">ВЫХОД</a>`;
        }
        if (mobileActions) {
            mobileActions.innerHTML = `<span class="header__user-email" style="color:white;">${loggedInUser}</span> <a class="header__link open__modal" onclick="window.App.logoutUser()" href="#">ВЫХОД</a>`;
        }
        if (authMessage) authMessage.style.display = 'none';
        if (commentForm) commentForm.style.display = 'block';
        if (commentButton) commentButton.style.display = 'flex';
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

document.addEventListener('submit', function(e) {
    if (e.target.id === 'loginForm') {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        // ⚠️ ЗАГЛУШКА: в реальном проекте — запрос на сервер
        if (email && password) {
            window.App.loginUser(email);
            form.reset();
        } else {
            window.App.showToast('Введите email и пароль');
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
        if (!email || password.length < 5) {
            window.App.showToast('Пароль минимум 5 символов!');
            return;
        }

        window.App.registerUser(email, password);
        window.App.loginUser(email);
    }
});