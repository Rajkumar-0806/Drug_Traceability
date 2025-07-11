export const fetchFDAData = async (productId) => {
  try {
    const API_URL = `https://api.fda.gov/drug/event.json?search=${productId}`;
    const response = await fetch(API_URL);

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch FDA data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || []; // Return an empty array if no results are found
  } catch (error) {
    console.error("Error fetching FDA data:", error);
    return { error: error.message }; // Return an error object for better debugging
  }
};