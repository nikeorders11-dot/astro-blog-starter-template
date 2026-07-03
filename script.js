// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      drawer.classList.toggle("open");
    });
  }

  // Contact form: submits natively to Formspree once a real form ID is set.
  // Falls back to opening the visitor's email client if Formspree isn't configured yet.
  const form = document.querySelector("#contact-form");
  if (form) {
    const formspreeConfigured = !form.action.includes("YOUR_FORM_ID");

    if (!formspreeConfigured) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = form.querySelector("#name").value.trim();
        const email = form.querySelector("#email").value.trim();
        const message = form.querySelector("#message").value.trim();
        const subject = encodeURIComponent(`Inquiry from ${name || "website"}`);
        const body = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\n${message}`
        );
        window.location.href = `mailto:syncipr@gmail.com?subject=${subject}&body=${body}`;
      });
    } else {
      // Native Formspree submission with a lightweight "thank you" swap,
      // avoiding a full page redirect.
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        try {
          const res = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });
          if (res.ok) {
            form.innerHTML =
              '<p style="font-family: var(--font-display); font-size: 1.3rem; color: var(--navy);">Thanks — your message is in. We\'ll get back to you within one to two business days.</p>';
          } else {
            form.querySelector("button").textContent = "Something went wrong — try again";
          }
        } catch {
          form.querySelector("button").textContent = "Something went wrong — try again";
        }
      });
    }
  }
});
