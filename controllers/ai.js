const { GoogleGenerativeAI } = require("@google/generative-ai");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();

module.exports.renderPlanForm = (req, res) => {
    res.render("ai/plan.ejs", { plan: null, destination: null, source: null });
};

module.exports.generatePlan = async (req, res) => {
    try {
        const { source, destination, days, budget, interests, transport } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            req.flash("error", "API Key is missing! Please set GEMINI_API_KEY in .env file.");
            return res.redirect("/ai/plan");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        const prompt = `Act as an expert travel agent. 
        Create a ${days}-day trip itinerary from ${source} to ${destination} via ${transport} with a budget of ${budget}/person. Interests: ${interests}.
        
        CRITICAL INSTRUCTION: Be extremely concise and fast. Use short bullet points. Do not write long paragraphs. 
        
        Include:
        - Route & Travel time
        - Short Daily Itinerary (Morning, Afternoon, Evening)
        - Cost Breakdown & Total Budget
        - 2-3 Must-Visit Places & Local Food
        
        Format in clean Markdown.`;

        const modelsToTry = ["gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-flash-latest"];
        let result;
        let lastError;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting to generate itinerary using ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                result = await model.generateContent(prompt);
                console.log(`Success! ${modelName} generated the plan.`);
                break; // Exit loop on success
            } catch (err) {
                console.error(`WARNING: ${modelName} failed with error -`, err.message);
                lastError = err;
            }
        }

        if (!result) {
            throw lastError || new Error("All backup AI models failed to generate content.");
        }

        const response = await result.response;
        const text = response.text();
        const htmlContent = md.render(text);

        res.render("ai/plan.ejs", { plan: htmlContent, destination, source });

    } catch (e) {
        console.error("AI GENERATION ERROR:", e);
        console.log("DEBUG: API Key present?", !!process.env.GEMINI_API_KEY);
        if (e.response && typeof e.response.text === 'function') {
            console.error("Response Error Details:", await e.response.text());
        }
        req.flash("error", `Failed to generate plan: ${e ? e.message : "Unknown Error"}`);
        res.redirect("/ai/plan");
    }
};
