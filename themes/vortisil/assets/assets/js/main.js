console.log('%cVortisil (https://github.com/khitezza/vortisil)', 'font-style: italic;');

document.addEventListener('DOMContentLoaded', function () {
  const navbarBurger = document.getElementById('navbar-burger');
  const navbarMenu = document.getElementById('navbar-menu');

  navbarBurger.addEventListener('click', function () {
    navbarBurger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });
});

scrollToTop = function () {
  const duration = 350;
  const start = window.scrollY;
  const startTime = performance.now();

  function scroll() {
    const now = performance.now();
    const time = Math.min(1, (now - startTime) / duration);
    const easedTime = time * (2 - time);

    window.scrollTo(0, start * (1 - easedTime));

    if (time < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('div.code-wrapper').forEach(container => {
    const btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.textContent = 'Copy';
    container.appendChild(btn);

    btn.addEventListener('click', async () => {
      const code = container.querySelector('code').innerText;
      try {
        await navigator.clipboard.writeText(code);
        btn.classList.add('copied');
        btn.textContent = '✓ Copied';
        setTimeout(() => btn.classList.remove('copied'), 2000);
      } catch (err) {
        btn.textContent = 'Failed';
        setTimeout(() => btn.textContent = 'Copy', 2000);
      }
    });
  });
});