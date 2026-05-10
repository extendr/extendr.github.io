(function () {
    var aside = document.querySelector('aside[aria-label="On this page"]');
    if (!aside) return;
    var tocLinks = Array.from(aside.querySelectorAll('a.toc-link'));
    if (!tocLinks.length) return;

    var headingIds = tocLinks.map(function (a) { return a.getAttribute('href').slice(1); });
    var headingEls = headingIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var idToLi = {};
    tocLinks.forEach(function (a) { idToLi[a.getAttribute('href').slice(1)] = a.closest('li'); });

    var activeLi = null;
    function setActive(id) {
        if (activeLi) activeLi.classList.remove('toc-active');
        activeLi = idToLi[id] || null;
        if (activeLi) activeLi.classList.add('toc-active');
    }

    var visible = new Set();
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) visible.add(e.target.id);
            else visible.delete(e.target.id);
        });
        var active = headingIds.find(function (id) { return visible.has(id); });
        if (active) setActive(active);
    }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

    headingEls.forEach(function (el) { observer.observe(el); });
})();
