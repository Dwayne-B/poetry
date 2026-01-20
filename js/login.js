// Check if password matches today's date
const loginBtn = document.getElementById("loginBtn");
const datePass = document.getElementById("datePass");
const error = document.getElementById("error");

// Format today as YYYY-MM-DD
function todayPassword() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  // return `${y}-${m}-${dd}`;
  return '1'
}

loginBtn.addEventListener("click", () => {
  if (datePass.value.trim() === todayPassword()) {
    window.location = "app.html";
  } else {
    error.textContent = "Incorrect date — try again!";
  }
});
