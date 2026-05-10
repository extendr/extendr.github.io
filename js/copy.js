document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.content pre.z-code').forEach(pre => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'copy-btn';
        btn.setAttribute('aria-label', 'Copy code');

        const icon = document.createElement('span');
        icon.className = 'iconify material-symbols-light--content-copy-outline';
        btn.appendChild(icon);
        pre.appendChild(btn);

        btn.addEventListener('click', async () => {
            const code = pre.querySelector('code');
            if (!code) return;
            try {
                await navigator.clipboard.writeText(code.innerText);
                btn.dataset.copied = 'true';
                icon.className = 'iconify material-symbols-light--check';
                setTimeout(() => {
                    delete btn.dataset.copied;
                    icon.className = 'iconify material-symbols-light--content-copy-outline';
                }, 1500);
            } catch (err) {
                console.error('Copy failed:', err);
            }
        });
    });
});
