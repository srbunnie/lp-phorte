const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

function activateTab(index, moveFocus = false) {
  tabs.forEach((tab, tabIndex) => {
    const active = tabIndex === index;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    panels[tabIndex].hidden = !active;
    panels[tabIndex].classList.toggle("is-visible", active);
  });

  if (moveFocus) tabs[index].focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(index));
  tab.addEventListener("keydown", (event) => {
    const next = event.key === "ArrowRight" ? (index + 1) % tabs.length
      : event.key === "ArrowLeft" ? (index - 1 + tabs.length) % tabs.length
      : event.key === "Home" ? 0
      : event.key === "End" ? tabs.length - 1
      : null;

    if (next === null) return;
    event.preventDefault();
    activateTab(next, true);
  });
});
