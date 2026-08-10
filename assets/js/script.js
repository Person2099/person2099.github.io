'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    if (!modalImg || !modalTitle || !modalText) return;

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.textContent = this.querySelector("[data-testimonials-title]").textContent;
    modalText.textContent = this.querySelector("[data-testimonials-text]").textContent;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}

if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    if (!selectValue || !select) return;

    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(this.dataset.filterValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0] || null;

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    if (!selectValue || !lastClickedBtn) return;

    selectValue.innerText = this.innerText;
    filterFunc(this.dataset.filterValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formBtnText = document.querySelector("[data-form-btn-text]");
const formStatus = document.querySelector("[data-form-status]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    if (!form || !formBtn) return;

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// intercept form submit — use formsubmit.co AJAX endpoint for in-page feedback
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!formBtn || !formBtnText || !formStatus) return;

    // loading state
    formBtn.setAttribute("disabled", "");
    formBtn.classList.add("is-loading");
    formBtnText.textContent = "Sending…";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    const data = {
      name: form.querySelector("[name='name']").value,
      email: form.querySelector("[name='email']").value,
      message: form.querySelector("[name='message']").value,
    };

    try {
      const res = await fetch("https://formsubmit.co/ajax/d20e8b3effb7bf372014806d06fb9326", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        formStatus.textContent = "Message sent! I'll get back to you soon.";
        formStatus.classList.add("success");
        form.reset();
        formBtn.setAttribute("disabled", "");
      } else {
        throw new Error("Server error");
      }
    } catch {
      formStatus.textContent = "Something went wrong. Please try again or email me directly.";
      formStatus.classList.add("error");
      formBtn.removeAttribute("disabled");
    } finally {
      formBtn.classList.remove("is-loading");
      formBtnText.textContent = "Send Message";
    }
  });
}



// project modal variables
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalDesc = document.querySelector("[data-project-modal-desc]");
const projectModalTechList = document.querySelector("[data-project-modal-tech]");
const projectModalLink = document.querySelector("[data-project-modal-link]");
const projectModalTermPath = document.querySelector("[data-project-modal-term-path]");
const projectModalTermCmd = document.querySelector("[data-project-modal-term-cmd]");
const projectModalTermOut = document.querySelector("[data-project-modal-term-out]");
const projectModalRole = document.querySelector("[data-project-modal-role]");
const projectModalNote = document.querySelector("[data-project-modal-note]");
const projectModalStatusDot = document.querySelector("[data-project-modal-status-dot]");
const projectModalStatusText = document.querySelector("[data-project-modal-status-text]");
const projectModalPrivatePill = document.querySelector("[data-project-modal-private-pill]");
const projectModalPrivateText = document.querySelector("[data-project-modal-private-text]");
const projectModalExtraLinks = document.querySelector("[data-project-modal-extra]");

/**
 * @param {string} raw - "Label::url;;Label::url" formatted extra links
 * @returns {{label: string, url: string}[]}
 */
function parseProjectLinks(raw) {
  if (!raw) return [];
  return raw.split(";;").map((pair) => {
    const [label, url] = pair.split("::");
    return { label: (label || "").trim(), url: (url || "").trim() };
  }).filter((link) => link.label && link.url);
}

function openProjectModal(item, url) {
  if (!projectModalContainer || !projectOverlay) return;

  const title = item.querySelector(".project-title");
  const category = item.querySelector(".project-category");
  const termPath = item.querySelector(".term-path");
  const termCmd = item.querySelector(".term-cmd");
  const termOut = item.querySelector(".term-out");
  const desc = item.dataset.projectDesc || "";
  const tech = item.dataset.projectTech ? item.dataset.projectTech.split(",") : [];
  const role = item.dataset.projectRole || "";
  const status = item.dataset.projectStatus || "";
  const accent = item.dataset.projectAccent || "var(--mist-500)";
  const note = item.dataset.projectNote || "";
  const isPrivate = item.dataset.projectPrivate === "true";
  const extraLinks = parseProjectLinks(item.dataset.projectLinks);

  if (projectModalTitle && title) projectModalTitle.textContent = title.textContent;
  if (projectModalCategory && category) {
    projectModalCategory.textContent = category.textContent.trim();
  }
  if (projectModalTermPath && termPath) projectModalTermPath.textContent = termPath.textContent;
  if (projectModalTermCmd && termCmd) {
    projectModalTermCmd.textContent = "";
    for (const node of termCmd.childNodes) {
      projectModalTermCmd.appendChild(node.cloneNode(true));
    }
  }
  if (projectModalTermOut && termOut) {
    projectModalTermOut.textContent = termOut.textContent;
    projectModalTermOut.className = "term-out " + (termOut.className.replace("term-out", "").trim());
  }
  if (projectModalStatusDot) projectModalStatusDot.style.background = accent;
  if (projectModalStatusText) projectModalStatusText.textContent = status;
  if (projectModalRole) projectModalRole.textContent = role;
  if (projectModalDesc) projectModalDesc.textContent = desc;
  if (projectModalNote) {
    projectModalNote.textContent = note;
    projectModalNote.hidden = !note;
  }
  if (projectModalTechList) {
    projectModalTechList.textContent = "";
    for (let t = 0; t < tech.length; t++) {
      const li = document.createElement("li");
      li.textContent = tech[t].trim();
      projectModalTechList.appendChild(li);
    }
  }

  if (projectModalLink) {
    projectModalLink.href = url || "#";
    projectModalLink.hidden = isPrivate;
  }
  if (projectModalPrivatePill) projectModalPrivatePill.hidden = !isPrivate;
  if (projectModalPrivateText) projectModalPrivateText.textContent = status || "Private";

  if (projectModalExtraLinks) {
    projectModalExtraLinks.textContent = "";
    for (let l = 0; l < extraLinks.length; l++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = extraLinks[l].url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = extraLinks[l].label;
      li.appendChild(a);
      projectModalExtraLinks.appendChild(li);
    }
  }

  projectModalContainer.classList.add("active");
  projectOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  if (!projectModalContainer || !projectOverlay) return;
  projectModalContainer.classList.remove("active");
  projectOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

const projectLinks = document.querySelectorAll("[data-project-item] > a");

for (let i = 0; i < projectLinks.length; i++) {
  projectLinks[i].addEventListener("click", function (e) {
    e.preventDefault();
    openProjectModal(this.closest("[data-project-item]"), this.href);
  });
}

if (projectModalCloseBtn) {
  projectModalCloseBtn.addEventListener("click", closeProjectModal);
}

if (projectOverlay) {
  projectOverlay.addEventListener("click", closeProjectModal);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && projectModalContainer && projectModalContainer.classList.contains("active")) {
    closeProjectModal();
  }
});



// github live stats
(async function fetchGithubStats() {
  const reposEl = document.querySelector("[data-github-repos]");
  if (!reposEl) return;
  try {
    const res = await fetch("https://api.github.com/users/Person2099");
    if (!res.ok) return;
    const data = await res.json();
    reposEl.textContent = data.public_repos;
  } catch {
    // non-critical — leave placeholder
  }
})();



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const target = this.dataset.pageTarget;

    for (let i = 0; i < pages.length; i++) {
      if (target === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// terminal-style typing intro on the About page — respects reduced motion
(function typingIntro() {
  const line = document.querySelector("[data-typing]");
  const target = document.querySelector("[data-typed-text]");
  if (!line || !target) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fullText = target.dataset.typedText;

  if (prefersReducedMotion) return;

  target.textContent = "";
  let i = 0;

  const type = function () {
    if (i <= fullText.length) {
      target.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, 90);
    }
  };

  type();
})();