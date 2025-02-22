const AWS = require("aws-sdk");

// Initialize DynamoDB client
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// List of allowed origins
const ALLOWED_ORIGIN = "http://localhost:63343";

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event, null, 2));

    // ✅ Handle OPTIONS Preflight Requests for CORS
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200, // Necessary for OPTIONS preflight request
            headers: {
                "Access-Control-Allow-Origin": ALLOWED_ORIGIN, // Allow your frontend origin
                "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Credentials": "true", // For session-based authentication, if needed
            },
            body: JSON.stringify({ message: "CORS preflight successful" }),
        };
    }

    try {
        // ✅ Ensure event.body exists
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": ALLOWED_ORIGIN, // Maintain origin consistency
                    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
                body: JSON.stringify({ error: "Missing request body" }),
            };
        }

        // ✅ Parse request body
        const requestBody = JSON.parse(event.body);
        let { Name, Age, Gender, Phone, Address } = requestBody;

        // ✅ Validate required fields
        if (!Name || !Age || !Gender || !Phone || !Address) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
                    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
                body: JSON.stringify({ message: "All fields are required." }),
            };
        }

        // ✅ Capitalize values
        Name = capitalizeFirstLetter(Name);
        Gender = capitalizeFirstLetter(Gender);
        Address = capitalizeFirstLetter(Address);

        // ✅ Generate a unique PatientID
        const PatientID = `${Math.floor(Math.random() * 1000000)}`;

        const patientData = {
            PatientID,
            Name,
            Age: Number(Age), // Ensure Age is stored as a number
            Gender,
            Phone,
            Address,
            CreatedAt: new Date().toISOString(),
        };

        // ✅ Store patient data in DynamoDB
        await dynamoDB
            .put({
                TableName: "Patient",
                Item: patientData,
            })
            .promise();

        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
                "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Credentials": "true", // If needed
            },
            body: JSON.stringify({
                message: "Patient registered successfully!",
                patientId: PatientID,
            }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
                "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({ message: "Internal Server Error." }),
        };
    }
};