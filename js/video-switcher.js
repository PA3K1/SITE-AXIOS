App.initVideoSwitcher = function() {
    const videoButtons = document.querySelectorAll('.mini-text');
    const videoFrame = document.getElementById('ax-mini');
    if (!videoButtons.length || !videoFrame) return;

    const videoUrls = {
        'rainbow-six': 'https://www.youtube.com/embed/HqpjPnctPtY',
        'rust': 'https://www.youtube.com/embed/ex1F_FYusYI',
        'pubg': 'https://www.youtube.com/embed/SghEK_6I0w0',
        'apex': 'https://www.youtube.com/embed/6hVBI7ZZe5s',
        'csgo': 'https://www.youtube.com/embed/-UNCF6lNNb8'
    };

    videoButtons[0].classList.add('active');

    videoButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            videoButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const videoKey = this.getAttribute('data-video');
            if (videoUrls[videoKey]) {
                videoFrame.src = videoUrls[videoKey];
            }
        });
    });

    //  payment modal
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
};