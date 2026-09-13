document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const filterWrapper = document.querySelector(".filter-wrapper");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxContent = document.querySelector(".lightbox-content");
  const lightboxClose = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let visibleItems = [];
  let currentIndex = 0;

  function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(
      (item) => !item.classList.contains("hide"),
    );
  }

  // 1. Filter Logic (Case-insensitive matching)
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter").toLowerCase();

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category").toLowerCase();

        if (filterValue === "all" || itemCategory === filterValue) {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });

      updateVisibleItems();
    });
  });

  // 2. Lightbox Logic
  function openLightbox(index) {
    currentIndex = index;
    const targetItem = visibleItems[currentIndex];
    const imgElement = targetItem.querySelector("img");
    const captionText = targetItem.querySelector(".overlay h3").textContent;

    lightboxImg.src = imgElement.src;
    lightboxImg.alt = imgElement.alt;
    lightboxCaption.textContent = captionText;

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    openLightbox(currentIndex);
  }

  function showPrevImage() {
    currentIndex =
      (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      updateVisibleItems();
      const indexInVisible = visibleItems.indexOf(item);
      if (indexInVisible !== -1) {
        openLightbox(indexInVisible);
      }
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNextImage);
  prevBtn.addEventListener("click", showPrevImage);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNextImage();
    if (e.key === "ArrowLeft") showPrevImage();
  });

  updateVisibleItems();
  galleryItems.forEach((item) => item.classList.add("show"));

  // Hamburger Menu Toggle Logic

if (hamburgerBtn && filterWrapper) {
  
  // 1. Toggle Menu Open / Close
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    filterWrapper.classList.toggle("active");
  });

  // 2. Auto-close menu when a filter button is clicked on mobile
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        hamburgerBtn.classList.remove("active");
        filterWrapper.classList.remove("active");
      }
    });
  });
}
  // Reusable image download function
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

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      const tempLink = document.createElement("a");
      tempLink.href = imageSrc;
      tempLink.download = imageSrc.split("/").pop() || "download.jpg";
      tempLink.target = "_blank";
      tempLink.click();
    }
  }

  // 1. Lightbox Download Button Setup
  const downloadBtn = document.createElement("a");
  downloadBtn.id = "lightboxDownloadBtn";
  downloadBtn.innerHTML = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
  <span>Download</span>
`;

  if (lightboxContent) {
    lightboxContent.appendChild(downloadBtn);
  }

  downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (lightboxImg && lightboxImg.src) {
      downloadImage(lightboxImg.src);
    }
  });

  // 2. Individual Gallery Card Download Buttons Setup
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

    cardDownloadBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents Lightbox from opening on download click
      downloadImage(img.src);
    });

    overlay.appendChild(cardDownloadBtn);
  });
});
