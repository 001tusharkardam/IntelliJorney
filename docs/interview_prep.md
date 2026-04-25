# IntelliJourney AI - Project Overview & Interview Preparation

## 1. Project Architecture (Start to End)
IntelliJourney AI is a Full-Stack Web Application similar to a travel and accommodation booking platform (like Airbnb), with an integrated Google Gemini AI for smart travel planning.

* **Backend:** Node.js + Express.js
* **Database:** MongoDB
* **Frontend:** EJS (Embedded JavaScript) templates

### Key Components:
#### 1. Main Entry Point: `app.js` (The Heart of the Project)
* **Server Setup:** Express framework running on port `8080`.
* **Database Connection:** Mongoose connects to `ATLASDB_URL` (MongoDB Atlas).
* **Middlewares:**
  * `express-session` & `connect-mongo` for session storage.
  * `passport` & `passport-local` for authentication.
  * `connect-flash` for flash messages.
* **Routing:** Routes like `/listings`, `/reviews`, `/ai` are configured here.

#### 2. Database Models (`models/` folder)
* **User Model (`user.js`):** Stores user details. Uses `passport-local-mongoose` for secure password hashing.
* **Listing Model (`listing.js`):** Details of places (title, price, description, Mapbox coordinates, Cloudinary images).
* **Review Model (`review.js`):** User reviews (rating and comments) for listings.

#### 3. Separation of Concerns (Routes & Controllers)
* **Routes (`classroom/routes/`):** Direct incoming requests to the specific controllers.
* **Controllers (`controllers/`):** Contains the core logic.
  * `listing.js`: Handles CRUD operations, Mapbox Geocoding, and Cloudinary integrations.
  * `user.js`: Handles Signup, Login, Logout.
  * `review.js`: Handles adding/deleting reviews.
  * `ai.js`: Sends user preferences to Google Gemini AI API and converts the markdown response to HTML using `markdown-it`.

#### 4. Frontend Views (`models/views/` folder)
Uses EJS templates combined with `ejs-mate`:
* `layouts/boilerplate.ejs`: Main skeleton (header, footer, basic CSS).
* `listings/`: Index (all listings), show (details & map), new/edit forms.
* `users/`: Login and Signup pages.
* `ai/`: Travel planner form and result page.

#### 5. Utilities (`utils/`, `.env`, `schema.js`)
* **`utils/ExpressError.js`**: Custom error handling.
* **`schema.js`**: Server-side data validation using `Joi`.
* **`.env`**: Stores sensitive info (Database URL, Mapbox Token, Gemini API Key).

---

## 2. Important Interview Questions

### 1. Project Overview & General Questions
* **Q: Apne IntelliJourney AI project ke baare mein bataiye. Iska main purpose kya hai?**
  *Ans: Yeh ek travel platform hai jahan log listings add/view kar sakte hain, aur Gemini AI ka use karke custom trip plan karwa sakte hain.*
* **Q: Aapne is project mein kaunsa tech stack use kiya hai aur kyun?**
  *Ans: Node.js/Express for scalable server, MongoDB for NoSQL flexibility, aur EJS templating kyunki initial render fast hota hai.*
* **Q: MVC architecture kya hota hai? Aapne apne project mein isko kaise implement kiya hai?**
  *Ans: Views `ejs` files hain, Models `mongoose` schemas hain, aur Controllers request handle karke data modify karte hain.*

### 2. Node.js & Express.js (Backend Logic)
* **Q: `app.use()` ka kya kaam hota hai?**
  *Ans: Express mein middlewares ko register karne ke liye.*
* **Q: Middleware kya hota hai?**
  *Ans: Middleware request aur response ke beech ki ek function chain hoti hai (e.g., `isLoggedIn` validation).*
* **Q: Session aur Cookies mein kya difference hai?**
  *Ans: Session server pe store hota hai (via `connect-mongo`), cookie browser mein.*

### 3. Database (MongoDB & Mongoose)
* **Q: Mongoose Models mein `populate()` function ka kya use hota hai?**
  *Ans: Connected documents (jaise Listing ke andar user Reviews) ki full details laane ke liye (SQL ke 'JOIN' jaisa).*
* **Q: Aapne validation ke liye `Joi` library ka use kyun kiya?**
  *Ans: Joi request aane par hi validate kar deta hai, DB query se pehle hi invalid data rok leta hai jisse server performance bachti hai.*

### 4. Authentication & Security (Passport.js)
* **Q: Passwords plaintext mein save kyu nahi hote?**
  *Ans: `passport-local-mongoose` automatically password ko "salt and hash" (pbkdf2 hash) karke securely MongoDB me save karta hai.*

### 5. Third-Party APIs (Mapbox & Cloudinary)
* **Q: Image upload kaise handle kiya hai?**
  *Ans: `multer` form data parse karta hai aur `multer-storage-cloudinary` seedha push karta hai. DB mein sirf URL aur Filename save hota hai.*
* **Q: Mapbox (Geocoding) kaise kaam karta hai?**
  *Ans: Location ka naam dene par API uska exact Latitude aur Longitude return karti hai, jo frontend map pe render hota hai.*

### 6. The "AI Feature" (Google Gemini AI)
* **Q: IntelliJourney AI feature kaise kaam karta hai?**
  *Ans: Backend `@google/generative-ai` SDK ke through prompt bhejta hai. AI markdown format mein itinerary deta hai, jise `markdown-it` EJS form mein HTML banakar render karta hai.*

---

## 3. MERN Stack vs IntelliJourney Stack
* **MERN Stack:** MongoDB (Database), Express.js (Backend), React.js (Frontend), Node.js (Runtime).
* **IntelliJourney Stack:** MongoDB, Express.js, Node.js + **EJS (Embedded JavaScript)** for Server-Side Rendering (Frontend).
* **Interview Tip:** Agar pucha jaye ki kya yeh MERN stack project hai, toh batayein: *"Mera project Full-Stack JavaScript par based hai (Node/Express/MongoDB), lekin Frontend SPA(Single Page Application) (React) ki jagah maine SSR(Server-Side Rendering) ke liye EJS templates use kiye hain."*

## 4. SPA kya hota hai? (Single Page Application)
**SPA (Single Page Application)** ek aisi website hoti hai jo kewal ek hi HTML page server se load karti hai. Uske baad jab aap website pe dusre pages (jaise Home se About) par click karte hain, toh pura page dubara reload nahi hota. Javascript (jaise React) sirf utna hi data update karti hai jitna chahiye hota hai. isse webpage bahot fast, smooth aur mobile app jaisa feel deta hai. (Example: Gmail, Facebook, Netflix).

Aapke project mein EJS use hua hai jo **SSR (Server-Side Rendering)** hai, jisme har nayi URL par server ek naya HTML banakar bhejta hai aur page reload hota hai.
