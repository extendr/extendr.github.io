(() => {
  const list = document.querySelector('[data-filterable-list]');
  if (!list) return;

  const searchInput = document.querySelector('[data-filter-search]');
  const sortButtons = document.querySelectorAll('[data-filter-sort]');
  const cards = document.querySelectorAll('[data-filter-item]');
  const checkboxes = document.querySelectorAll('[data-tag-checkbox]');
  const selectAllButtons = document.querySelectorAll('[data-tag-select-all]');
  const empty = document.querySelector('[data-filter-empty]');

  const sortFns = {
    title: (a, b) => (a.dataset.sortName || '').localeCompare(b.dataset.sortName || ''),
    author: (a, b) => (a.dataset.sortAuthor || '').localeCompare(b.dataset.sortAuthor || ''),
    count: (a, b) => Number(b.dataset.sortCount || 0) - Number(a.dataset.sortCount || 0),
  };

  const sortActiveClasses = ['underline'];

  const applySort = (key, clicked) => {
    const fn = sortFns[key];
    if (!fn || !cards.length) return;
    const sorted = Array.from(cards).sort(fn);
    const parent = sorted[0].parentNode;
    sorted.forEach((card) => parent.insertBefore(card, empty || null));
    sortButtons.forEach((b) => {
      const active = b === clicked;
      sortActiveClasses.forEach((c) => b.classList.toggle(c, active));
    });
  };

  const apply = () => {
    const query = (searchInput?.value || '').trim().toLowerCase();
    const active = new Set(
      Array.from(checkboxes)
        .filter((c) => c.checked)
        .map((c) => c.value.toLowerCase()),
    );

    let visible = 0;
    cards.forEach((card) => {
      const title = (card.dataset.title || '').toLowerCase();
      const desc = (card.dataset.description || '').toLowerCase();
      const tags = (card.dataset.tags || '')
        .toLowerCase()
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const matchesText =
        !query ||
        title.includes(query) ||
        desc.includes(query) ||
        tags.some((t) => t.includes(query));
      const matchesTags = active.size === 0 || tags.some((t) => active.has(t));
      const show = matchesText && matchesTags;

      card.classList.toggle('hidden', !show);
      if (show) visible += 1;
    });

    if (empty) empty.classList.toggle('hidden', visible !== 0);
  };

  // Keep the sidebar and dropdown in sync when they share a tag value.
  checkboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      checkboxes.forEach((other) => {
        if (other !== cb && other.value === cb.value) other.checked = cb.checked;
      });
      apply();
    });
  });

  list.addEventListener('click', (e) => {
    const a = e.target.closest('a[href=""]');
    if (a && list.contains(a)) e.preventDefault();
  });

  searchInput?.addEventListener('input', apply);

  sortButtons.forEach((btn) => {
    btn.addEventListener('click', () => applySort(btn.dataset.filterSort, btn));
  });

  selectAllButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const anyChecked = Array.from(checkboxes).some((c) => c.checked);
      checkboxes.forEach((c) => {
        c.checked = !anyChecked;
      });
      btn.textContent = anyChecked ? 'Select all' : 'Clear all';
      selectAllButtons.forEach((b) => {
        if (b !== btn) b.textContent = btn.textContent;
      });
      apply();
    });
  });

  apply();

  if (sortButtons.length) {
    applySort(sortButtons[0].dataset.filterSort, sortButtons[0]);
  }
})();
