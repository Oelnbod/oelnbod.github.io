const themeToggleBtn = document.getElementById('theme-toggle-btn');
const lightIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 18a6 6 0 0 1-6-6a6 6 0 0 1 6-6a6 6 0 0 1 6 6a6 6 0 0 1-6 6m8-2.69L23.31 12L20 8.69V4h-4.69L12 .69L8.69 4H4v4.69L.69 12L4 15.31V20h4.69L12 23.31L15.31 20H20z"/></svg>';
const darkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#1a1a1a" d="M10 2c-1.82 0-3.53.5-5 1.35C8 5.08 10 8.3 10 12s-2 6.92-5 8.65C6.47 21.5 8.18 22 10 22a10 10 0 0 0 10-10A10 10 0 0 0 10 2"/></svg>';


let currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggleBtn.innerHTML = currentTheme === 'dark' ? lightIcon : darkIcon;

const GISCUS_CONFIG = {
    'repo': '{{ .Site.Params.comments.giscus.repo }}',
    'repo-id': '{{ .Site.Params.comments.giscus.repoId }}',
    'category': '{{ .Site.Params.comments.giscus.category }}',
    'category-id': '{{ .Site.Params.comments.giscus.categoryId }}',
    'mapping': '{{ .Site.Params.comments.giscus.mapping }}',
    'reactions-enabled': '1',
    'emit-metadata': '0',
    'lang': '{{ .Site.Params.comments.giscus.lang }}',
    'theme': currentTheme
};

function loadGiscus() {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    Object.entries(GISCUS_CONFIG).forEach(([key, value]) => {
        script.setAttribute(`data-${key}`, value);
    });

    const container = document.getElementById('giscus-container');
    container.innerHTML = '';
    container.appendChild(script);
}

loadGiscus();

themeToggleBtn.addEventListener('click', () => {

    const isDark = currentTheme === 'dark';
    currentTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggleBtn.innerHTML = isDark ? darkIcon : lightIcon;
    localStorage.setItem('theme', currentTheme);


    if (window.giscus) {
        window.giscus.setTheme(currentTheme);
    } else {
        GISCUS_CONFIG.theme = currentTheme;
        loadGiscus();
    }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newSystemTheme = e.matches ? 'dark' : 'light';
    if (localStorage.getItem('theme') === null) {
        currentTheme = newSystemTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeToggleBtn.innerHTML = currentTheme === 'dark' ? lightIcon : darkIcon;
        if (window.giscus) window.giscus.setTheme(currentTheme);
    }
});