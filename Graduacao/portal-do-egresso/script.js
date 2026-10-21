(() => {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-site-navigation]");
  const demoForm = document.querySelector("[data-demo-form]");
  const formFeedback = document.querySelector("[data-form-feedback]");

  if (menuButton && navigation && typeof window.matchMedia === "function") {
    const mobileViewport = window.matchMedia("(max-width: 1023px)");

    const syncNavigation = () => {
      const isMobile = mobileViewport.matches;
      menuButton.hidden = !isMobile;
      menuButton.setAttribute("aria-expanded", String(!isMobile));
      navigation.hidden = isMobile;
    };

    syncNavigation();

    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      navigation.hidden = isExpanded;
    });

    navigation.addEventListener("click", (event) => {
      if (!mobileViewport.matches || !event.target.closest("a")) return;
      navigation.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
    });

    mobileViewport.addEventListener("change", syncNavigation);
  }

  if (demoForm && formFeedback) {
    demoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      formFeedback.textContent = "Esta prévia não enviou seus dados. Para registrar uma resposta, acesse o formulário externo do Google Forms.";
    });
  }
})();
