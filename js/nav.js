document.getElementById('nav-toggle')?.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dropdown]')) {
        document.querySelectorAll('[data-dropdown] > div').forEach(d => d.classList.add('hidden'));
    }
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden') && !e.target.closest('header')) {
        mobileMenu.classList.add('hidden');
    }
});

// Search modal: open via any [data-search-trigger], close on ESC or backdrop click
const searchModal = document.getElementById('search-modal');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
if (searchModal && searchInput) {
    const open = () => {
        searchModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        searchInput.focus();
    };
    const close = () => {
        searchModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        searchInput.value = '';
        searchResults?.classList.add('hidden');
    };
    document.querySelectorAll('[data-search-trigger]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // also collapse the mobile menu if open
            document.getElementById('mobile-menu')?.classList.add('hidden');
            open();
        });
    });
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) close();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) close();
    });
}
