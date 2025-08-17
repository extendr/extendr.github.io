// Remove Quarto breadcrumb classes to allow custom styling
document.addEventListener('DOMContentLoaded', function() {
  const breadcrumbNavs = document.querySelectorAll('nav.quarto-page-breadcrumbs.quarto-title-breadcrumbs');
  breadcrumbNavs.forEach(function(nav) {
    nav.classList.remove('quarto-page-breadcrumbs', 'quarto-title-breadcrumbs', 'd-none', 'd-lg-block');
  });
});