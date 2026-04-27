# 💒 Wedding Invitation — Technical Documentation

This document outlines the libraries, technologies, and technical approaches used to build the responsive, interactive "Enchanted Forest" wedding invitation. 

## 🛠️ Core Technologies Stack

The project was intentionally built using a zero-dependency architecture to ensure lightning-fast load times, complete standalone functionality, and independence from external hosting limitations.

*   **HTML5:** Semantic markup structure ensuring accessibility and proper document flow.
*   **CSS3 (Vanilla):** Advanced modern CSS was heavily utilized instead of relying on external frameworks (like Tailwind or Bootstrap).
*   **Vanilla JavaScript (ES6+):** Pure JavaScript to handle all interactivity, scroll events, and state management without the need for jQuery or React.

---

## 🎨 Design & Aesthetic Engineering

Since external background images were initially unavailable due to system setup constraints, the entire "Enchanted Forest" aesthetic was engineered purely using CSS techniques:

### Pure CSS Art & Illustration
*   **Venue Illustration:** The mountains, Hill Paradise Hotel building, and surrounding pine trees are rendered entirely using CSS borders, gradients, and clip-paths.
*   **Forest Background:** Trees, hanging vines, light rays, and gradient overlays in the Hero section are generated via radial/linear gradients and `clip-path` calculations.
*   **Glassmorphism:** Utilized `backdrop-filter: blur()` combined with semi-transparent rgba backgrounds to create the elegant, frosted-glass looks for the Music toggle and Countdown Timer.

### Typography (Google Fonts)
Four distinct typefaces were fetched via the Google Fonts API to achieve the premium look:
1.  **Great Vibes** - Used for the elegant, cursive couple names.
2.  **Cinzel** - A classic serif font used for formal section headers and crucial dates.
3.  **Montserrat** - A clean sans-serif used for numbers, UI labels, and modern contrasts.
4.  **Cormorant Garamond** - Used for the invitation body text, offering high legibility and a classical feel.

---

## ✨ Interactivity & JavaScript Features

### 1. Scroll-Triggered Animations (Intersection Observer API)
Instead of using external libraries like AOS (Animate On Scroll) or GSAP, the project uses the native browser **Intersection Observer API**. 
*   **How it works:** JavaScript monitors when elements enter the browser viewport. As soon as an element (like a timeline card) crosses the threshold, a `data-animation` dataset attribute triggers a specific CSS keyframe animation (`fadeIn`, `slideLeft`, `scaleIn`, etc.).

### 2. Entrance Screen & Preloader
*   **CSS Keyframes:** A triple-ring CSS spinner utilizing `@keyframes spin`.
*   **Event Handling:** Listens for the window `load` event, hides the native spinner after a simulated delay, and presents a clickable "Envelope" (`#entrance-screen`).
*   **DOM Manipulation:** Clicking "Open Invitation" removes the scroll lock (`document.body.classList.remove('locked')`) and dynamically triggers the hero timeline animations.

### 3. Real-Time Countdown Timer
*   Calculates the exact time difference (in milliseconds) between `Date.now()` and the target wedding date (`2033-01-10T16:00:00`).
*   Uses `Math.floor()` to perform modulus operations, converting the remaining milliseconds into Days, Hours, Minutes, and Seconds.
*   Updates the DOM natively every 1,000 milliseconds using `setInterval()`.

### 4. Background Particle Generators
To create the dynamic "magical" feel:
*   **Floating Petals:** JavaScript dynamically parses a DOM container, randomly generating `<div>` elements containing flower emojis, injecting randomized CSS properties for size, fall-speed, and horizontal position every few seconds, then garbage-collects (removes) them from the DOM to prevent memory leaks.
*   **Fireflies:** Pre-populates pulsing, glowing, gold CSS dots that have independent `animationDelay` properties to simulate randomized movement paths.

### 5. Scroll Spy Navigation
*   A vertical dot navigation system is tied to the Intersection Observer. As the user scrolls through different sections (`<section id="...">`), the active dot updates in real-time, providing tactile feedback on the user's current location.

---

## 📱 Responsive & Layout Approach

*   **CSS Grid & Flexbox:** Used extensively for aligning items. The Venue details and RSVP form use Grid, while Flexbox handles centering logic and timeline formatting.
*   **CSS Clamp() Function:** Used for typography (e.g., `font-size: clamp(3rem, 10vw, 5.5rem);`). This ensures the couple's names and primary fonts smoothly scale between mobile devices and massive desktop monitors without relying on dozens of media queries.
*   **Mobile-First Adaptations:** Media queries (max-width: 768px) reposition the Details timeline (converting it from an alternating left/right snake-path to a uniform single-column layout) and squishes complex grids into vertical stacks.

---

## 🚫 What We DID NOT Use (And Why)
*   **React/Vue/Angular:** Overkill for a one-page informational site; pure HTML/JS ensures a `<1 second` render time.
*   **Bootstrap/Tailwind:** Custom CSS guarantees complete control over the highly specific "magical" theme.
*   **Image Assets:** By doing 90% of the visual styling in pure code, the website requires virtually zero network requests for large JPG/PNG files, saving massive amounts of bandwidth.
