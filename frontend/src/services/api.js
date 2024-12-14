const API_URL = "http://127.0.0.1:5000"; // Ensure Flask is running on this URL

export const predictPersistence = async (data) => {
    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch prediction.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in API call:", error);
        throw error;
    }
};
