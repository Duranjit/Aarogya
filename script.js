document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Registration successful! Please log in.");
        window.location.href = "index.html";
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error: Could not register.");
    }
  });
  