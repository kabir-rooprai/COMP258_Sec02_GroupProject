const API_URL = "http://127.0.0.1:5000";

export const predictPersistence = async (data) => {
    const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: Object.values(data) }),
    });
    if (!response.ok) throw new Error("Failed to fetch prediction");
    return response.json();
};
