App.initFAQ = function() {
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
};