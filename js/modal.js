const modal = document.getElementById("imageModal");
const modalContent = modal.querySelector(".modal-content");
const modalImg = document.getElementById("modalImg");
const poemTitle = document.getElementById("poemTitle");
const poemText = document.getElementById("poemText");
const poemExplain = document.getElementById("poemExplain");
const closeBtn = modal.querySelector(".closeBtn");

let lastImageRect;

// GLOBAL modal function
window.openModal = function (data, imgEl) {
  if (!imgEl) return;

  window.isModalOpen = true;
  document.body.classList.add("modal-open");


  lastImageRect = imgEl.getBoundingClientRect();

  const scaleX = lastImageRect.width / window.innerWidth;
  const scaleY = lastImageRect.height / window.innerHeight;
  const translateX = lastImageRect.left + lastImageRect.width / 2 - window.innerWidth / 2;
  const translateY = lastImageRect.top + lastImageRect.height / 2 - window.innerHeight / 2;

  // Initial state (small circle at image)
  modalContent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
  modalContent.style.borderRadius = "50%";
  modalContent.style.opacity = "0";

  // modalImg.src = data.img;
  poemTitle.textContent = data.title;
  poemText.textContent = data.text;
  poemExplain.textContent = data.explain;

  modal.style.display = "block";

  // Fade in + grow
  requestAnimationFrame(() => {
    modal.classList.add("show");
    modalContent.classList.add("show");
    modalContent.style.transform = `translate(0px, 0px) scale(1, 1)`;
    modalContent.style.borderRadius = "12px";
    modalContent.style.opacity = "1";
    // modalImg.style.width = "80%";
  });
};

// Close modal with fade + shrink
function closeModal() {
  if (!lastImageRect) return;

  const scaleX = lastImageRect.width / window.innerWidth;
  const scaleY = lastImageRect.height / window.innerHeight;
  const translateX = lastImageRect.left + lastImageRect.width / 2 - window.innerWidth / 2;
  const translateY = lastImageRect.top + lastImageRect.height / 2 - window.innerHeight / 2;

  // Fade out + shrink back to image
  modalContent.style.opacity = "0";
  modalContent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
  modalContent.style.borderRadius = "50%";
  // modalImg.style.width = "30%";
  modal.classList.remove("show");

  modalContent.addEventListener(
    "transitionend",
    () => {
      modal.style.display = "none";
      window.isModalOpen = false;
      document.body.classList.remove("modal-open");
      window.resumeAutoScroll();
    },
    { once: true }
  );
}

closeBtn.addEventListener("click", closeModal);
