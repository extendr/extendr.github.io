(() => {
    const ACTIVE = ['text-blue-600', 'dark:text-blue-400', 'font-semibold'];
    const INACTIVE = ['text-gray-600', 'dark:text-gray-400'];

    function applyFilter() {
        const m = location.hash.match(/tag=([^&]+)/);
        const tag = m ? decodeURIComponent(m[1]) : null;

        document.querySelectorAll('[data-tags]').forEach(el => {
            el.hidden = tag && !el.dataset.tags.split(' ').includes(tag);
        });

        document.querySelectorAll('[data-tag-link]').forEach(a => {
            const isActive = a.dataset.tagLink === (tag || '');
            ACTIVE.forEach(c => a.classList.toggle(c, isActive));
            INACTIVE.forEach(c => a.classList.toggle(c, !isActive));
        });
    }
    addEventListener('hashchange', applyFilter);
    applyFilter();
})();
