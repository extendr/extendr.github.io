// Search functionality using Fuse.js
(async () => {
  const searchInput = document.getElementById('input-with-text');
  if (!searchInput) return;

  // The new navbar input lives alone in a <div>; wrap-position the results
  // dropdown inside it so it floats below the search box.
  const wrapper = searchInput.parentElement;
  wrapper.classList.add('relative');

  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'search-results';
  resultsContainer.className = 'hidden absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-background border border-border rounded-md shadow-lg z-50 p-1';
  wrapper.appendChild(resultsContainer);

  // Load Fuse.js from CDN
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js';
  document.head.appendChild(script);

  await new Promise(resolve => script.onload = resolve);

  const response = await fetch(window.SEARCH_INDEX_URL);
  const searchIndex = await response.json();

  // Initialize Fuse
  const fuse = new Fuse(searchIndex, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'body', weight: 0.3 }
    ],
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 2,
    includeMatches: true
  });

  // Helper to extract matching snippet
  function getSnippet(text, matches) {
    if (!matches || matches.length === 0) {
      return text.slice(0, 150) + (text.length > 150 ? '...' : '');
    }

    const match = matches[0];
    const start = Math.max(0, match.indices[0][0] - 50);
    const end = Math.min(text.length, match.indices[0][1] + 100);
    let snippet = text.slice(start, end);

    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';

    return snippet;
  }

  // Search on input
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();

    if (query.length < 2) {
      resultsContainer.classList.add('hidden');
      resultsContainer.innerHTML = '';
      return;
    }

    const results = fuse.search(query, { limit: 10 });

    if (results.length === 0) {
      resultsContainer.innerHTML = '<div class="px-2 py-2 text-xs text-gray-500 dark:text-gray-400">No results found</div>';
      resultsContainer.classList.remove('hidden');
      return;
    }

    resultsContainer.innerHTML = results.map(({ item, matches }) => {
      const bodyMatches = matches?.filter(m => m.key === 'body') || [];
      const snippet = getSnippet(item.body || '', bodyMatches);

      return `
        <a href="${item.url}" class="block py-2 px-2 rounded-md border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700">
          <div class="font-semibold text-sm">${item.title}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">${snippet}</div>
        </a>
      `;
    }).join('');

    resultsContainer.classList.remove('hidden');
  });

  // Close results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.parentElement.contains(e.target)) {
      resultsContainer.classList.add('hidden');
    }
  });

  // Navigate results with keyboard
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      resultsContainer.classList.add('hidden');
      searchInput.value = '';
    }
  });
})();