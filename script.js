// Week 5 SPA Simulation - client-side routing and state management
const app = document.querySelector("#app");
const nav = document.querySelector("#mainNav");
const menuToggle = document.querySelector("#menuToggle");

const pages = {
  home: () => `
    <section class="page hero">
      <div>
        <span class="eyebrow">Week 5 · SPA Simulation</span>
        <h1>Building web experiences that feel instant.</h1>
        <p class="lead">A small single-page application built with vanilla JavaScript. Navigation updates the URL and content without a full-page reload.</p>
        <div class="actions">
          <a class="btn primary" href="/projects" data-route>Explore Projects</a>
          <a class="btn secondary" href="/contact" data-route>Contact Me</a>
        </div>
      </div>
      <aside class="hero-card" aria-label="Application architecture">
        <div class="code">router()
  ↓
history.pushState()
  ↓
render(route)
  ↓
DOM update</div>
      </aside>
    </section>
    <section class="page">
      <div class="section-head"><span class="eyebrow">Highlights</span><h2>What this project demonstrates</h2></div>
      <div class="metric-grid">
        <div class="metric"><strong>4</strong><span class="muted">Client-side routes</span></div>
        <div class="metric"><strong>0</strong><span class="muted">Full page reloads</span></div>
        <div class="metric"><strong>2</strong><span class="muted">Responsive breakpoints</span></div>
      </div>
    </section>`,

  about: () => `
    <section class="page">
      <div class="section-head"><span class="eyebrow">About</span><h2>Learning by building.</h2><p class="lead">This simulation focuses on routing, DOM manipulation, responsive UI, and accessible navigation using browser-native APIs.</p></div>
      <div class="grid">
        <article class="card"><h3>Semantic HTML</h3><p>Uses header, nav, main, section, article, aside and footer elements to create a meaningful document structure.</p></article>
        <article class="card"><h3>Vanilla JavaScript</h3><p>Uses event delegation, route mapping, pushState and popstate instead of a framework or external router.</p></article>
        <article class="card"><h3>Accessibility</h3><p>Includes keyboard-friendly controls, focus states, descriptive labels, live content updates and reduced-motion support.</p></article>
      </div>
    </section>`,

  projects: () => `
    <section class="page">
      <div class="section-head"><span class="eyebrow">Projects</span><h2>Selected work</h2><p class="lead">Example cards showing how dynamic content can be presented as different SPA views.</p></div>
      <div class="grid">
        <article class="card"><h3>Responsive Landing Page</h3><p>Converted a visual concept into a responsive HTML/CSS interface with mobile-first adjustments.</p><span class="tag">HTML</span><span class="tag">CSS</span></article>
        <article class="card"><h3>Interactive Dashboard</h3><p>Added JavaScript interactions, validation, dynamic content and UI state changes.</p><span class="tag">JavaScript</span><span class="tag">DOM</span></article>
        <article class="card"><h3>SPA Simulation</h3><p>Implemented client-side routes with History API navigation and browser back/forward support.</p><span class="tag">SPA</span><span class="tag">History API</span></article>
      </div>
    </section>`,

  contact: () => `
    <section class="page">
      <div class="section-head"><span class="eyebrow">Contact</span><h2>Send a message.</h2><p class="lead">The form is intentionally client-side and demonstrates validation and state feedback.</p></div>
      <form id="contactForm" novalidate>
        <div class="field"><label for="name">Name</label><input id="name" name="name" autocomplete="name" required minlength="2"><div class="error" id="nameError"></div></div>
        <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required><div class="error" id="emailError"></div></div>
        <div class="field"><label for="message">Message</label><textarea id="message" name="message" rows="6" required minlength="10"></textarea><div class="error" id="messageError"></div></div>
        <button class="btn primary" type="submit">Submit Message</button>
        <div id="formStatus" class="success" hidden role="status"></div>
      </form>
    </section>`
};

function routeFromPath(path = window.location.pathname) {
  const clean = path.replace(/\/+$/, "") || "/";
  return ({"/":"home","/about":"about","/projects":"projects","/contact":"contact"})[clean] || "404";
}

function render(route = routeFromPath()) {
  app.innerHTML = route === "404" ? `
    <section class="page not-found">
      <span class="eyebrow">404</span><h1>Page not found</h1>
      <p class="lead">The requested route does not exist in this SPA simulation.</p>
      <a class="btn primary" href="/" data-route>Back Home</a>
    </section>` : pages[route]();
  updateActiveLink(route);
  window.scrollTo({top:0, behavior:"smooth"});
  if(route === "contact") setupForm();
}

function navigate(url) {
  history.pushState({}, "", url);
  render(routeFromPath(url));
}

function updateActiveLink(route) {
  nav.querySelectorAll("[data-page]").forEach(link => {
    link.classList.toggle("active", link.dataset.page === route);
    if(link.dataset.page === route) link.setAttribute("aria-current","page");
    else link.removeAttribute("aria-current");
  });
}

document.addEventListener("click", event => {
  const link = event.target.closest("a[data-route]");
  if(!link) return;
  const url = new URL(link.href, window.location.origin);
  if(url.origin !== window.location.origin) return;
  event.preventDefault();
  navigate(url.pathname);
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded","false");
});

window.addEventListener("popstate", () => render(routeFromPath()));

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

function setupForm() {
  const form = document.querySelector("#contactForm");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");
    const errors = {
      name: name.value.trim().length < 2 ? "Please enter at least 2 characters." : "",
      email: !/^\S+@\S+\.\S+$/.test(email.value.trim()) ? "Please enter a valid email address." : "",
      message: message.value.trim().length < 10 ? "Please enter at least 10 characters." : ""
    };
    document.querySelector("#nameError").textContent = errors.name;
    document.querySelector("#emailError").textContent = errors.email;
    document.querySelector("#messageError").textContent = errors.message;
    const valid = !Object.values(errors).some(Boolean);
    const status = document.querySelector("#formStatus");
    if(valid){
      status.hidden = false;
      status.textContent = `Thanks, ${name.value.trim()}! Your message passed client-side validation.`;
      form.reset();
    } else {
      status.hidden = true;
    }
  });
}

render();