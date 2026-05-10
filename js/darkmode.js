function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
    document.getElementById('giallo-light').disabled = isDark;
    document.getElementById('giallo-dark').disabled = !isDark;
}