document.addEventListener("DOMContentLoaded", function () {
    // Get user info (This could be from localStorage or backend API)
    let userName = localStorage.getItem("userName") || "User";
    document.getElementById("userName").innerText = userName.charAt(0).toUpperCase() + userName.slice(1);

    // Logout function
    window.logout = function () {
        localStorage.removeItem("userName");  // Clear session
        window.location.href = "landing.html";  // Redirect to home
    };

    // Navbar Toggle for Mobile View
    const menuToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }
});
