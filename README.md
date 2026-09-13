# 📸 Responsive Filterable Image Gallery & Lightbox Application

A modern, highly optimized, interactive, and responsive web application built to display dynamically filterable image galleries with a custom-built Lightbox modal engine. Built using pure, dependency-free HTML5, CSS3, and modern ES6+ Vanilla JavaScript to deliver high performance, instant responsiveness, and seamless media downloading.

---

## 📑 Table of Contents

- [Project Overview & Core Motivations](#project-overview--core-motivations)
- [Features](#features)
- [Project Development Roadmap](#project-development-roadmap)
- [Detailed Tech Stack & Specifications](#detailed-tech-stack--specifications)
- [Screenshots](#screenshots)
- [Usage & Implementation Examples](#usage--implementation-examples)
- [Documentation](#documentation)
  - [Architecture Guide](#-architecture-guide)
  - [Component Deep Dive](#-component-deep-dive)
  - [Developer Manual](#-developer-manual)
- [Quick Start & Setup Guide](#quick-start--setup-guide)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Execution](#installation--local-execution)
- [Repository Structure](#repository-structure)
- [Detailed System Architecture](#detailed-system-architecture)
- [Component & Dynamic Scripting Deep Dive](#component--dynamic-scripting-deep-dive)
  - [Individual Card Download & Event Stop Propagation](#individual-card-download--event-stop-propagation)
  - [Asynchronous Cross-Origin Image Downloader](#asynchronous-cross-origin-image-downloader)
  - [Interactive Lightbox Modal Engine](#interactive-lightbox-modal-engine)
- [Developer Customization Manual](#developer-customization-manual)
  - [CSS Design Tokens & Theme Variables](#css-design-tokens--theme-variables)
  - [Adding New Gallery Items](#adding-new-gallery-items)
- [Quality Assurance & Automated Testing](#quality-assurance--automated-testing)
- [Versioning & Semantic Changelog](#versioning--semantic-changelog)
- [FAQ](#faq)
- [Feedback & Support](#feedback--support)
- [Video Explanation & Social Demonstration](#-video-explanation--social-demonstration)
- [Contribution Guidelines & Workflow](#contribution-guidelines--workflow)
- [Deployment & Production Hosting](#deployment--production-hosting)
- [License](#license)
- [Pre-Flight Developer Checklist](#pre-flight-developer-checklist)
- [Common Pitfalls & Architectural Solutions](#common-pitfalls--architectural-solutions)

---

## Project Overview & Core Motivations

Modern web applications frequently rely on bloated lightbox dependencies or heavy framework wrappers just to provide image filtering and modal previews. This project demonstrates a pure, zero-dependency web application capable of delivering rapid category filtering, interactive card overlays, instant binary file downloading, and accessible Lightbox previews without external libraries.

* **Zero-Framework Architecture:** Eliminates build-tool overhead (`npm`, Webpack, Vite) to ensure instant site rendering, zero vulnerability audits, and straightforward hosting.
* **Modular CSS System:** Separates core variables (`style.css`), structural grid resets, responsive breakpoints (`responsive.css`), and micro-interactions (`animation.css`) into clean, isolated modules.
* **Asynchronous Media Downloading:** Leverages modern JavaScript Fetch and Blob APIs to allow visitors to download high-resolution images directly from both card overlays and fullscreen Lightbox modals without triggering page navigations.
* **Accessible UI Componentry:** Implements semantic HTML structure (`<figure>`, `<article>`, `<button>`) along with dynamic ARIA landmarks (`aria-label`, `aria-hidden`) and keyboard event listeners (`Escape`, Arrow Keys).

---

## Features

* **⚡ High Performance & Optimization:** Built with `content-visibility: auto` and `loading="lazy"` attributes for instant image rendering and high Lighthouse performance scores.
* **🎯 Interactive Category Filtering:** Filter gallery collections instantly with active state indicators and smooth fade transitions.
* **🖼️ Fullscreen Lightbox Modal:** Built-in preview modal equipped with smooth image transitions and dynamic caption bindings.
* **⬇️ Dual-Layer Image Downloader:** Download images directly via the individual card overlay button or inside the Lightbox modal.
* **📱 Fully Responsive Layout:** Mobile-first responsive Grid and Flexbox layouts that automatically adjust across mobile, tablet, and desktop viewports.
* **⌨️ Full Keyboard Navigation:** Navigate through the Lightbox gallery using Left/Right Arrow keys and dismiss using the Escape key.

---

## Project Development Roadmap

- [x] **Phase 1: Core Foundation & Layout**
  - Implement dynamic CSS Grid gallery layout and mobile navigation.
  - Configure CSS custom properties design tokens and responsive breakpoints.
- [x] **Phase 2: Interactive Lightbox & Filtering**
  - Integrate JavaScript category filter logic and dynamic class updates.
  - Build Lightbox modal container with keyboard event bindings.
- [x] **Phase 3: Asynchronous Binary Downloads**
  - Develop reusable `downloadImage()` helper leveraging JS `fetch()` and `Blob` APIs.
  - Inject individual card download buttons dynamically with event propagation stoppers.
- [ ] **Phase 4: Advanced Features & Testing**
  - Integrate touch-swipe gestures for mobile Lightbox navigation.
  - Implement full WebP image conversion pipeline and PWA offline caching.

---

## Detailed Tech Stack & Specifications

* **Markup Layer:** HTML5 (Semantic elements, `<picture>`, native form controls, ARIA attributes)
* **Styling Layer:** CSS3 (Custom properties tokens, CSS Grid, Flexbox, media query breakpoints, keyframe animations)
* **Scripting Layer:** Modern JavaScript ES6+ (DOM Events, `fetch()` API, Blob Object URLs, Event Delegation, async/await handlers)
* **Asset Pipeline:** Vector SVG icons, web-optimized raster media (`WEBP`/`JPG`), clean modular stylesheets
* **Version Control & Hosting:** Git versioning, GitHub Actions CI validation, deployment support for GitHub Pages, Vercel, or Netlify

---

## Screenshots

### Core Desktop Application Views
| Primary Gallery View |
| :---: |
| ![Desktop View](https://github.com/123anjan/Task-1_CodeAlpha_Image-Gallary/blob/main/assets/Images/desktopimg_3.png) | 

### Interactive Lightbox & Overlay Features
| Dynamic Lightbox Modal | Card Hover & Download Overlay |
| :---: | :---: |
| ![Lightbox View](https://github.com/123anjan/Task-1_CodeAlpha_Image-Gallary/blob/main/assets/Images/desktopimg_2.png) | ![Card Download Overlay](https://github.com/123anjan/Task-1_CodeAlpha_Image-Gallary/blob/main/assets/Images/desktopimg_1.png) |

---

## Mobile Version Screenshots

### Core Responsive Viewports
| Mobile Gallery Grid | Mobile Lightbox Modal |
| :---: | :---: |
| ![Mobile View](https://github.com/123anjan/Task-1_CodeAlpha_Image-Gallary/blob/main/assets/Images/Mobileimg.png) | ![Mobile Lightbox](https://github.com/123anjan/Task-1_CodeAlpha_Image-Gallary/blob/main/assets/Images/mobileimg3.png) |

---
### Mobile Hamburger menu Views
| Hamburger menu toggle View |
| :---: |
| ![Mobile menu toggle View](https://github.com/123anjan/Task-1_CodeAlpha_Image-Gallary/blob/main/assets/Images/Hamburger_menu_Toggle.mp4) | 

---

## Usage & Implementation Examples

### Standard Gallery Item Markup Structure

To add a new image card to your gallery grid inside `index.html`, append the following structure:

```
html
<article class="gallery-item" data-category="nature">
  <div class="image-wrapper">
    <img src="./assets/images/nature-1.jpg" alt="Mountain Landscape" loading="lazy" />
    <div class="overlay">
      <h3 class="image-title">Mountain Sunrise</h3>
      <p class="image-category">Nature</p>
      <!-- JavaScript automatically injects the .card-download-btn here -->
    </div>
  </div>
</article>
```
## Documentation

### 🏛️ Architecture Guide

- **Asset Loading Hierarchy:** Complete separation of presentation (`assets/css/`) and interaction logic (`script.js`). Stylesheets execute render-critical rules while scripts run deferred.
- **Event Propagation Strategy:** Individual card download triggers stop event propagation (`e.stopPropagation()`) to prevent accidental Lightbox modal triggers when attempting a file download.
- **Memory Management:** Blob URLs created during binary image downloads are automatically revoked via `URL.revokeObjectURL()` immediately after execution to prevent browser memory leaks.

## Component Deep Dive

- **Lightbox Controller (`script.js`):** Intercepts gallery image clicks, populates the modal container dynamically, and manages focus traps and keyboard bindings (`Escape`, `ArrowLeft`, `ArrowRight`).
- **Filtering Engine:** Iterates over `.gallery-item` data attributes, calculating dynamic display values while maintaining CSS animation keyframes.
- **Styling Tokens (`assets/css/style.css`):** Centralized CSS custom properties managing themes, backdrop blurs, transition timings, and glassmorphic card overlays.

### 🛠️ Developer Manual

- **Customizing Design Tokens:** Edit values inside `:root` inside `style.css` to update primary gradients, overlay colors, and border radii across the site.
- **Extending Download Behaviors:** Modify `downloadImage()` in `script.js` to handle custom fallback endpoints or third-party image hosting services.

## Quick Start & Setup Guide

### Prerequisites

Ensure your development environment contains:

- **Modern Web Browser:** Google Chrome (v90+), Mozilla Firefox (v88+), Microsoft Edge (v90+).
- **Code Editor:** Visual Studio Code (Recommended), Sublime Text, or WebStorm.
- **Version Control:** Git CLI and GitHub (v2.25+).
## Installation & Local Execution

1. **Clone the Git Repository:**
   ```
   bash
   git clone [https://github.com/your-username/filterable-image-gallery.git](https://github.com/your-username/filterable-image-gallery.git)

   ```

   2. **Navigate to the Root Directory:**
   ```
   bash
   cd filterable-image-gallery
   ```

   **Launch the Local Application:**

* **Method 1 (VS Code Live Server - Recommended):** Right-click `index.html` and select **Open with Live Server**.
* **Method 2 (Node Static Server):** Run `npx serve .` inside the root directory.
* **Method 3 (Direct Browser File):** Open `index.html` directly in any web browser.

## Repository Structure

```
plaintext
Task-1_CodeAlpha_Image Gallary/
├── assets/
│   ├── css/
│   │   ├── style.css         # Custom variables, design tokens, & base styling
│   │   ├── responsive.css    # Responsive viewports & media query breakpoints
│   │   └── animations.css    # Keyframes, modal transitions, & hover states
│   ├── images/               # High-resolution gallery & project assets
│   │   ├── desktop-preview.png
│   │   ├── mobile-view.png
│   │   └── lightbox-preview.png
│   └── script.js              # Core JS module (Filtering, Lightbox, Downloads)
├── index.html                # Semantic single-page HTML gallery layout
├── README.md                 # Project documentation & developer manual
└── .gitignore                # Environment & workspace exclusions
```

### Detailed System Architecture

```
plaintext
[ User Interaction on .gallery-item ]
           │
           ├──> Clicked on Gallery Card Overlay / Image
           │          │
           │          ├──> Target: Download Button (.card-download-btn)
           │          │       │
           │          │       └──> e.stopPropagation() ➔ Invoke downloadImage(img.src)
           │          │                └──> Fetch Binary Blob ➔ Trigger Native File Save
           │          │
           │          └──> Target: Card Body / Preview Region
           │                  │
           │                  └──> Open Lightbox Modal ➔ Inject Source & Bind Key Listeners
           │
[ Filtering Action on Category Buttons ]
           │
           └──> Filter Button Clicked (.filter-btn)
                      │
                      ├──> Remove '.active' from siblings ➔ Add '.active' to target
                      └──> Match data-filter against item data-category
                               ├──> Match True  ──> Remove '.hide' class (Fade In)
                               └──> Match False ──> Add '.hide' class (Fade Out)
```

## Component & Dynamic Scripting Deep Dive

### Individual Card Download & Event Stop Propagation

Injecting download triggers directly into item overlays without opening the Lightbox modal:

```
javascript
// Dynamic Gallery Card Download Injector
document.querySelectorAll(".gallery-item").forEach((item) => {
  const overlay = item.querySelector(".overlay");
  const img = item.querySelector("img");
  if (!overlay || !img) return;

  const cardDownloadBtn = document.createElement("button");
  cardDownloadBtn.className = "card-download-btn";
  cardDownloadBtn.setAttribute("aria-label", "Download image");
  cardDownloadBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `;

  // Stop propagation to prevent opening the Lightbox modal
  cardDownloadBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    downloadImage(img.src);
  });

  overlay.appendChild(cardDownloadBtn);
});
```
# Asynchronous Cross-Origin Image Downloader

Reusable asynchronous fetch module executing cross-origin or local binary object downloads:

```
javascript
async function downloadImage(imageSrc) {
  try {
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const tempLink = document.createElement("a");
    tempLink.href = blobUrl;
    tempLink.download = imageSrc.split("/").pop() || "download.jpg";

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    // Revoke memory reference
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    // Fallback trigger for direct browser navigation download
    const tempLink = document.createElement("a");
    tempLink.href = imageSrc;
    tempLink.download = imageSrc.split("/").pop() || "download.jpg";
    tempLink.target = "_blank";
    tempLink.click();
  }
}
```
# Developer Customization Manual

## CSS Design Tokens & Theme Variables

Modify design parameters directly within `assets/css_files/style.css`:

```
css
/* CSS Variables */
:root {
  --bg-gradient: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%);

  --bg-card: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;

  /* Gradients */
  --primary-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  --overlay-gradient: linear-gradient(
    to top,
    rgba(15, 23, 42, 0.95),
    rgba(15, 23, 42, 0)
  );
  --card-gradient: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.01)
  );

  /* Dimensions & Effects */
  --radius-sm: 8px;
  --radius-lg: 16px;
  --shadow-lg: 0 10px 25px -5px rgba(99, 102, 241, 0.12);
  --shadow-hover: 0 20px 30px -10px rgba(99, 102, 241, 0.25);
  --transition-fast: 0.3s ease;
  --transition-smooth: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```
## Quality Assurance & Automated Testing

* **Markup Integrity:** Validated against W3C HTML5 standards.
* **Accessibility Compliance:** Audited using Chrome DevTools Lighthouse to ensure clean contrast ratios, explicit ARIA labels, and full keyboard accessibility.
* **Cross-Browser Testing:** Verified across Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari across desktop and mobile devices.

---

## Versioning & Semantic Changelog

### v1.0.0 — Initial Stable Release

* **Category Filtering Engine:** Instant client-side gallery sorting.
* **Lightbox System:** Responsive modal with keyboard navigation bindings.
* **Dual Download Functionality:** Binary download capabilities on both individual card overlays and modal viewers via Blob APIs.

---

## FAQ

### Feedback & Support

For questions, issues, or suggestions:

* **Submit an Issue:** Report bugs or suggest feature requests on the GitHub Issues page.
* **Direct Email Support:** Reach out to [anjan0306basak@gmail.com](mailto:anjan0306basak@gmail.com).

---

## 📹 Video Explanation & Social Demonstration

Check out the full walkthrough and live demonstration of this project on LinkedIn!

I posted a video breaking down the overall project structure, how the download logic handles asynchronous image blobs, and how the responsive layout holds up across mobile and desktop viewports.

👉 **[Watch the Project Explanation Video on LinkedIn](https://linkedin.com)**

---

## Contribution Guidelines & Workflow

1. **Fork the Repository** on GitHub.
2. **Create a Feature Branch:** `git checkout -b feat/NewFeature`
3. **Commit Your Changes:** `git commit -m "feat: add touch swipe support to lightbox"`
4. **Push to the Branch:** `git push origin feat/NewFeature`
5. **Open a Pull Request** with a detailed summary of your additions.

## Deployment & Production Hosting

### GitHub Pages (Recommended)

1. Push your repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch** and choose **main / root**.
4. Click **Save**.
5. Your site will be live at:

   `https://<your-username>.github.io/<repo-name>/`

## License

Distributed under the MIT License.

## Pre-Flight Developer Checklist

- [ ] **Path Resolution:** Verified that all style and script links use correct relative references (`./assets/`).

- [ ] **Event Bubbling:** Confirmed `e.stopPropagation()` prevents the Lightbox modal from triggering when clicking individual card download buttons.

- [ ] **Viewport Scalability:** Tested responsiveness across `320px`, `480px`, `768px`, `1024px`, and `1440px` viewports.

- [ ] **Memory Management:** Verified `URL.revokeObjectURL()` cleans up memory allocations after image downloads complete.

## Common Pitfalls & Architectural Solutions

### Cross-Origin Image Downloads Opening in New Tabs

**Solution:** Fetch the target image as an asynchronous `Blob`, convert it into an Object URL, and programmatically click a temporary `<a>` element configured with the `download` attribute.

### Lightbox Triggering Simultaneously on Download Click

**Solution:** Attach `e.stopPropagation()` inside the card download button's click event listener.
