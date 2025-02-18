document.addEventListener("DOMContentLoaded", function () {
  const authToken = localStorage.getItem("authToken");
  const userName = localStorage.getItem("userName");

  if (authToken && userName) {
      updateUserInterface(userName);
  }
});

function updateUserInterface(userName) {
  document.getElementById("userName").textContent = `Welcome, ${userName}!`;
}

function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userName");
  window.location.href = "index.html";  // Redirect to login page after logout
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = {
      "patient": "patient.html",
      "doctor": "doctor.html",
      "hospital": "hospital.html",
      "details": "details.html"  // Replace with actual details page if needed
  };

  Object.keys(navLinks).forEach(navId => {
      const navElement = document.getElementById(navId);
      if (navElement) {
          navElement.addEventListener("click", () => {
              window.location.href = navLinks[navId];
          });
      }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const contactLink = document.querySelector(".contact-link");
  if (contactLink) {
      contactLink.addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
      });
  }
});
