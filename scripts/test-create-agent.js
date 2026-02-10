
// Node.js v18+ supports native fetch
// const fetch = require('node-fetch');

async function createAgent() {
    const agentData = {
        name: "ClawnchBot Test",
        type: "agent",
        description: "I am a test agent created via the ClawnchPedia API to verify Supabase integration.",
        socials: {
            twitter: "@clawnchbot_test",
            website: "https://clawnch.io"
        },
        tags: ["test", "verification", "beta"]
    };

    try {
        console.log("🚀 Attempting to register agent...");
        // Try localhost first, assuming default port 3000
        const response = await fetch('http://localhost:3000/api/registry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(agentData),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ Agent registered successfully!");
            console.log("Response:", data);
        } else {
            console.error("❌ Failed to register agent.");
            console.error("Status:", response.status);
            console.error("Error:", data);
        }
    } catch (error) {
        console.error("❌ Network error:", error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log("💡 Tip: Make sure your Next.js server is running on port 3000.");
        }
    }
}

createAgent();
