document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let visibleItems = [];
  let currentIndex = 0;

  function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(
      (item) => !item.classList.contains("hide")
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
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
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
});