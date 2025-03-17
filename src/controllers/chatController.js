// const fetch = require('node-fetch'); // Keep dynamic import for node-fetch
const dotenv = require('dotenv').config();

const handleChatRequest = async (req, res) => {
    const userMessage = req.body.message;
    const apiKey = process.env.GOOGLE_API_KEY; // Use GOOGLE_API_KEY

    if (!apiKey) {
        return res.status(500).send({ error: "Google Gemini API key not configured." }); // Update error message
    }

    try {
        const fetchModule = await import('node-fetch');
        const fetch = fetchModule.default;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, { // Gemini API Endpoint - UPDATED MODEL NAME
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gemini-2.0-flash", // Using gemini-2.0-flash model
                contents: [{
                    parts: [{ text: userMessage }] // Gemini message format
                }]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Google Gemini API error:", errorData); // Update error log
            return res.status(500).send({ error: "Error communicating with Google Gemini API", details: errorData }); // Update error message
        }

        const data = await response.json();
        // Gemini API response parsing - adjust based on actual response structure
        const botReply = data.candidates[0].content.parts[0].text.trim(); // Gemini response format
        res.send({ reply: botReply });

    } catch (error) {
        console.error("Error processing chat request:", error);
        res.status(500).send({ error: "Failed to process chat request" });
    }
};

module.exports = {
    handleChatRequest,
}; 