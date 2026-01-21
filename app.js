const scroller = document.querySelector(".scroller");
const header = document.querySelector(".header");

let poems = [];
const columns = [];
const MAX_STAGGER = 50;

// Determine column count based on screen size
function getColumnCount() {
  const w = window.innerWidth;
  if (w < 600) return 2;
  if (w < 900) return 3;
  if (w < 1200) return 4;
  return 5;
}

// Load poem data
fetch("poems.json")
  .then(res => res.json())
  .then(data => {
    poems = data;
    createColumns();
    distributeCards();
    applyStagger(0); // initial stagger on load
  });

// Create responsive columns
function createColumns() {
  const colCount = getColumnCount();
  scroller.innerHTML = "";
  columns.length = 0;

  for (let i = 0; i < colCount; i++) {
    const col = document.createElement("div");
    col.className = "column";
    col.dataset.index = i;
    col.style.transition = "transform 0.3s ease"; // smooth stagger transition
    columns.push(col);
    scroller.appendChild(col);
  }
}

// Distribute cards evenly
function distributeCards() {
  if (!poems.length) return;
  columns.forEach(col => (col.innerHTML = ""));

  poems.forEach((poem, i) => {
    const { img, title, text, explain } = poem;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${img}" 
           data-title="${title}" 
           data-text="${text}" 
           data-explain="${explain}">
    `;

    const imgEl = card.querySelector("img");
    // Pass both dataset and img element to modal
    imgEl.addEventListener("click", e => window.openModal(poem, e.target));

    columns[i % columns.length].appendChild(card);
  });
}

// Apply stagger based on fraction (0–1)
function applyStagger(fraction) {
  columns.forEach((col, i) => {
    const offset = (1 - fraction) * MAX_STAGGER * (i % 2);
    col.style.transform = `translateY(${offset}px)`;
  });
}

// Scroll listener: remove stagger as user scrolls down
scroller.addEventListener("scroll", () => {
  const scrollTop = scroller.scrollTop;
  const scrollHeight = scroller.scrollHeight - scroller.clientHeight;

  const fraction = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
  applyStagger(fraction);
});

// Recalculate on resize
window.addEventListener("resize", () => {
  createColumns();
  distributeCards();
  applyStagger(0);
});


//hide header

let lastScrollTop = 0;
scroller.addEventListener("scroll", () => {
  const scrollTop = scroller.scrollTop;
  
  // Hide header when scrolling down
  if (0 < scrollTop) {
    console.log('hidden',"lastScrollTop:", lastScrollTop, " scrollTop:", scrollTop);
    header.classList.add("hidden");
  } else {
    // Show header when scrolling up
    console.log("lastScrollTop:", lastScrollTop, " scrollTop:", scrollTop);
    header.classList.remove("hidden");
  }

  lastScrollTop = scrollTop < 0 ? 0 : scrollTop; // for mobile bounce
});