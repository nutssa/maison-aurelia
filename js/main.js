(function () {
  const header = document.getElementById("siteHeader");
  const burger = document.getElementById("burgerBtn");
  const drawer = document.getElementById("mobileDrawer");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();


  function setDrawer(open) {
    if (!drawer || !burger) return;
    drawer.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  }

  if (burger && drawer) {
    burger.addEventListener("click", () => {
      const isOpen = drawer.classList.contains("is-open");
      setDrawer(!isOpen);
    });

    drawer.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) setDrawer(false);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setDrawer(false);
    });
  }

  const current = document.body.getAttribute("data-page");
  if (current) {
    document.querySelectorAll(`[data-nav="${current}"]`).forEach((a) => {
      a.setAttribute("aria-current", "page");
    });
  }


  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("newsletterEmail");
  const status = document.getElementById("newsletterStatus");

  if (form && emailInput && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValid) {
        status.textContent = "Please enter a valid email address.";
        return;
      }


      localStorage.setItem("maisonAureliaNewsletter", email);
      status.textContent = "Thank you. Please check your inbox for confirmation.";
      emailInput.value = "";
    });
  }
})();
