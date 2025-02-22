const API_URL = "https://vltf1xbnxb.execute-api.ap-south-1.amazonaws.com/dev/storePatientData";

document.getElementById("patientForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form values
    const name = capitalizeFirstLetter(document.getElementById("patient-name").value.trim());
    const age = document.getElementById("age").value.trim();
    const gender = capitalizeFirstLetter(document.getElementById("gender").value);
    const phone = document.getElementById("phone").value.trim();
    const address = capitalizeFirstLetter(document.getElementById("address").value.trim());

    // Validate fields
    if (!name || !age || !gender || !phone || !address) {
        alert("All fields are required!");
        return;
    }
    if (gender === "") {
        alert("Please select a valid gender.");
        return;
    }

    try {
        // Debugging: Log payload being sent
        console.log("Sending data:", { Name: name, Age: age, Gender: gender, Phone: phone, Address: address });

        // Send POST request to the API Gateway endpoint
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Name: name,
                Age: age,
                Gender: gender,
                Phone: phone,
                Address: address,
            }),
        });

        // Parse response safely
        let result;
        try {
            result = await response.json();
        } catch (jsonError) {
            throw new Error(`Invalid JSON response: ${jsonError.message}`);
        }

        // Check if the response is okay
        if (response.ok) {
            alert("Patient registered successfully!");
            console.log("Patient ID:", result.patientId);
        } else {
            console.error("Error from server:", result);
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Registration error:", error);

        // Handling CORS issue explicitly
        if (error.message.includes("Failed to fetch")) {
            alert("CORS policy error: Make sure your API Gateway allows requests from localhost.");
        } else {
            alert("Something went wrong. Please try again later.");
        }
    }
});

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}