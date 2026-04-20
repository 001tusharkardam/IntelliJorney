const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";

// Define default text styles
const bodyConfigTitle = { x: 0.5, y: 0.5, w: "90%", h: 1, fontSize: 32, color: "005599", bold: true };
const bodyConfigContent = { x: 0.5, y: 1.8, w: "90%", h: 4.5, fontSize: 20, color: "333333", valign: "top" };

// Slide 1: Title Slide
let slide1 = pres.addSlide();
slide1.addText("IntelliJourney AI", { x: 0.5, y: 2, w: "90%", h: 1, fontSize: 48, color: "005599", bold: true, align: "center" });
slide1.addText("A Smart Travel & Accommodation Booking Platform\nFull-Stack JavaScript (Node.js/Express + MongoDB + EJS)", { x: 0.5, y: 3.5, w: "90%", h: 1.5, fontSize: 24, color: "666666", align: "center" });

// Helper for other slides
function addStandardSlide(title, bulletPoints) {
    let slide = pres.addSlide();
    slide.addText(title, bodyConfigTitle);

    let formattedText = bulletPoints.map(t => ({ text: t, options: { bullet: true, fontSize: 22, breakLine: true, margin: [10, 10, 10, 10] } }));
    slide.addText(formattedText, bodyConfigContent);
}

// Slide 2: Project Overview
addStandardSlide("Project Overview", [
    "What is IntelliJourney AI? A comprehensive web application designed for property owners and avid travelers.",
    "Primary Goal: Provide a seamless platform for browsing accommodations.",
    "Key Feature: Utilizes Artificial Intelligence to plan exact day-to-day itineraries based on personal budget and interests."
]);

// Slide 3: Core Features
addStandardSlide("Core Features", [
    "Accommodation Management: Add, edit, delete, and view detailed global travel listings.",
    "Interactive Reviews: Users can leave ratings and comments on specific accommodations.",
    "Secure Authentication: Complete user signup, login, and robust session management.",
    "AI Travel Planner: Dynamically generates custom travel itineraries, packing lists, and budget estimates."
]);

// Slide 4: System Architecture (MVC)
addStandardSlide("System Architecture (MVC)", [
    "Model: Mongoose schemas map to MongoDB collections (Users, Listings, Reviews) ensuring data integrity.",
    "View: Server-Side Rendered (SSR) HTML pages using EJS templates for fast loading.",
    "Controller: Node.js & Express route handlers manage the core application operations and API calls."
]);

// Slide 5: Technology Stack - Backend
addStandardSlide("Technology Stack - Backend", [
    "Runtime Environment: Node.js",
    "Backend Framework: Express.js (Handles complex routing and HTTP server configuration).",
    "Data Validation: Joi library is used for server-side validation to ensure request payload integrity."
]);

// Slide 6: Technology Stack - Database
addStandardSlide("Technology Stack - Database", [
    "Database Engine: MongoDB (NoSQL DB, ideal for flexible, document-based storage).",
    "ODM (Object Data Modeling): Mongoose provides a strict schema definition for MongoDB.",
    "Cloud Hosting: MongoDB Atlas ensures secure, highly available database hosting in the cloud."
]);

// Slide 7: Technology Stack - Frontend
addStandardSlide("Technology Stack - Frontend", [
    "Templating: EJS (Embedded JavaScript) coupled with ejs-mate for reusable layouts.",
    "Rendering Strategy: Server-Side Rendering (SSR) delivers fast initial page loads.",
    "Styling: Custom CSS and modern frontend frameworks for a responsive design."
]);

// Slide 8: Authentication & Security
addStandardSlide("Authentication & Security", [
    "Library: Passport.js integrated with passport-local-mongoose.",
    "Password Security: Plain text passwords are not stored. PBKDF2 Salt and Hash is used.",
    "Session Management: express-session combined with connect-mongo manages secure sessions.",
    "User Feedback: connect-flash is used to trigger toast notifications."
]);

// Slide 9: Third-Party Integrations
addStandardSlide("Third-Party Integrations", [
    "Cloud Image Hosting: Cloudinary integrated via multer-storage-cloudinary to handle image uploads securely.",
    "Mapping & Geocoding: Mapbox API translates string locations into precise Latitude/Longitude coordinates."
]);

// Slide 10: The 'AI Feature' - Smart Travel Agent
addStandardSlide("The AI Feature - Smart Travel Agent", [
    "AI Provider: Google DeepMind (@google/generative-ai SDK).",
    "Configured Model: gemini-2.5-flash (with automatic failover to flash-lite).",
    "How it works: Backend captures user inputs (destination, budget, days, interests) into a specialized prompt.",
    "Output: AI returns a Markdown itinerary, dynamically converted to HTML using markdown-it."
]);

// Slide 11: MERN Stack vs IntelliJourney Stack
addStandardSlide("MERN Stack vs IntelliJourney Stack", [
    "Traditional MERN: MongoDB, Express.js, React (SPA), Node.js.",
    "IntelliJourney Setup: MongoDB, Express.js, EJS (SSR), Node.js.",
    "Why SSR? Server actively builds HTML pages on every request, ensuring superior initial load performance compared to single-page applications."
]);

// Slide 12: Conclusion & Future Scope
addStandardSlide("Conclusion & Future Scope", [
    "Accomplishments: Developed a full-stack booking system with powerful Gen-AI capabilities.",
    "Future: Transitioning EJS frontend to a modern React/Next.js interface.",
    "Future: Adding live integrations for real-time flight and hotel bookings.",
    "Future: Implementing WebSocket-based real-time chat support for users."
]);

pres.writeFile({ fileName: "IntelliJourney_Presentation.pptx" })
    .then(fileName => {
        console.log("PPTX created successfully: " + fileName);
    })
    .catch(err => {
        console.error("Error creating PPTX: ", err);
    });
