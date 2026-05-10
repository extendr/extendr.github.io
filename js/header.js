(() => {
    const header = document.querySelector('header');
    if (!header) return;
    const setHeaderH = () => {
        document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
    };
    setHeaderH();
    new ResizeObserver(setHeaderH).observe(header);
})();
