(() => {
  document.querySelectorAll(".accordion").forEach((accordion) => {
    accordion.addEventListener("click", (event) => {
      const summary = event.target.closest("summary");
      if (!summary) return;
      const details = summary.closest("details");
      if (!details) return;
      accordion.querySelectorAll("details").forEach((d) => {
        if (d !== details) d.removeAttribute("open");
      });
    });
  });
})();
