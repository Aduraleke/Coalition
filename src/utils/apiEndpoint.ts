import { BASE_URL } from "./config";

// Fetch function to get data from the API with Basic Auth
export const fetchPatientData = async () => {
  try {
    // Base64 encode the username and password for Basic Auth
    const auth = btoa("coalition:skills-test");

    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`, // Add the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of error
  }
};
