// ============================================================
// GTox Ltd — site behaviour
// ============================================================

document.getElementById("year").textContent = new Date().getFullYear();

// ---------------- Mobile nav toggle ----------------
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------------- Scroll reveal ----------------
const revealEls = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add("in"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// ---------------- Gallery lightbox ----------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const full = item.getAttribute("data-full");
    const alt = item.querySelector("img").getAttribute("alt");
    lightboxImg.src = full;
    lightboxImg.alt = alt;
    lightbox.classList.add("open");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
}
if (lightbox && lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

// ---------------- Contact form: spam-safe submission ----------------
// This form posts to Web3Forms (https://web3forms.com), a free service that
// relays submissions to your inbox without ever exposing your email address
// in the page source.

const WEB3FORMS_ACCESS_KEY = "939e1873-d714-4c9e-baf6-e68a532f929b";

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

if (form) {
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const honeypot = form.querySelector("#website").value;
  if (honeypot) {
    statusEl.dataset.state = "ok";
    statusEl.textContent = "Thanks — your message has been sent.";
    form.reset();
    return;
  }

  if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
    statusEl.dataset.state = "err";
    statusEl.textContent = "Form isn't connected yet — add your Web3Forms access key in script.js.";
    return;
  }

  submitBtn.disabled = true;
  statusEl.dataset.state = "";
  statusEl.textContent = "Sending…";

  const formData = new FormData(form);
  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("subject", "New enquiry from gtoxltd.com");
  formData.append("from_name", "GTox Ltd website");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    const result = await response.json();

    if (result.success) {
      statusEl.dataset.state = "ok";
      statusEl.textContent = "Thanks — your message has been sent. I'll be in touch shortly.";
      form.reset();
    } else {
      throw new Error(result.message || "Submission failed");
    }
  } catch (err) {
    statusEl.dataset.state = "err";
    statusEl.textContent = "Something went wrong — please try again, or reach out via LinkedIn.";
  } finally {
    submitBtn.disabled = false;
  }
});
}
