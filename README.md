# Cafe De Arte — Premium 3D Cinematic Demo Website

An agency-grade, highly interactive 3D digital experience created for **Cafe De Arte** (located at S.N. Yadav Road, near Toppo House, Nagra Toli, Lalpur, Ranchi, Jharkhand).

> **Important**: This is a high-fidelity **sales demo** created to showcase to the business owner what their future online presence could look like. It is built strictly using **HTML5, CSS3, and Vanilla JavaScript**, requiring zero build steps and deployable immediately to Vercel as a 100% static website.

---

## 🌟 Authentic Business Information (Ground Truth)

- **Business Name**: Cafe De Arte
- **Founder**: Anju Toppo (Part of the *Mandi Eddpa* heritage culinary initiative)
- **Heritage Location**: Ground floor of the ancestral Toppo House, Nagra Toli, Lalpur, Ranchi, Jharkhand 834001
- **Coordinates**: `23.3838613° N, 85.3301628° E`
- **Google Maps Link**: [https://maps.app.goo.gl/W1zDcsuxW36somATA](https://maps.app.goo.gl/W1zDcsuxW36somATA)
- **Contact Number**: `+91 83360 70979`
- **Verified Rating**: 4.5 / 5.0 Stars (440+ verified customer reviews on Swiggy & Google)
- **Concept & Vibe**: An artistic cultural sanctuary intertwining comfort **Korean cuisine** (Bibimbap, Chicken Ramyeon, Bulgogi, Mandu) with **indigenous tribal Jharkhandi roots** (handcrafted *Madua/Ragi* finger-millet momos, local herbs, ancestral dumpling recipes). The interior combines retro pop-culture posters (Darth Vader, Popeye) with heritage anthropological photography of Adivasi communities, warm ambient amber lamps, and a curated *Tribe Tree* indigenous handloom textile corner.

---

## 🚀 Key Interactive Features

1. **Animated Logo Opening with 3D Lens-Blur Reveal**:
   - Focus stage displaying the authentic **Cafe De Arte** emblem, tagline (*Korean Soul • Indigenous Roots*), and rotating terracotta portal ring.
   - Smooth 3D zoom-through (26x perspective scale) with camera-lens blur dissolving seamlessly into the main light-luxury experience.
   - Includes **Skip Experience** pill button and session storage persistence (with `?replay=true` support).
2. **Vibrant Light-Luxury Design Language**:
   - Luminous, eye-catching ("तड़कता-भड़कता") palette: Warm Ivory / Porcelain base (`#FBF8F3`), crisp surfaces (`#FFFFFF`), roasted espresso text (`#231C16`), fiery terracotta (`#E25822`), and warm amber gold (`#F09A24`).
3. **Animated Chef Pull-to-Refresh Mechanism**:
   - Interactive French-Asian chef character wearing a traditional toque hat, red neckerchief, and apron, holding a wooden spoon with animated rising steam bubbles (`♨`).
   - Triggerable via touch drag-down on mobile or floating **Kitchen Refresh** button on desktop. Pulls down the kitchen curtain, plays culinary soundscape, and smoothly scrolls to fresh offerings.
4. **Compact 2-Column Mobile Food Layout**:
   - Mobile-optimized grid displaying dishes 2-per-row for rapid, thumb-friendly browsing like modern food ordering apps.
5. **Multi-Panel Visual Gallery & Lightbox Showcase**:
   - Clicking any gallery photo opens a rich multi-panel showcase:
     - **Left Panel:** Heritage craftsmanship, tribal farming collectives, and cultural philosophy.
     - **Center Stage:** 3D perspective photo frame with corner metadata badges and navigation arrows.
     - **Right Panel:** Chef notes, recommended food pairings, ingredients breakdown, and direct "Add to Cart" / "Reserve Table" action buttons.
6. **WebGL Particle Nebula**:
   - Lightweight Three.js particle constellation running smoothly at 60fps with golden embers and warm terracotta dust.
7. **Interactive 3D Floating Hero Stage**:
   - Layered culinary stage featuring Dolsot Bibimbap, Korean Ramyeon, and Handcrafted Ragi Momos with real-time cursor tilt physics.
8. **Interactive 3D Menu Experience**:
   - Verified real menu items and prices:
     - Signature Dolsot Bibimbap (₹260)
     - Classic Chicken Ramyeon (₹260)
     - Handcrafted Veg Ragi Momos (₹180) & Chicken Ragi Momos (₹190)
     - Bulgogi Chicken Rice Bowl (₹290)
     - Artisan Mandu Dumpling Soup (₹210)
     - Wok Kimchi Fried Rice (₹230)
     - Signature Spiced Lemon Iced Tea (₹120)
     - Artisanal Heritage Filter Coffee (₹110)
   - Dynamic category filtering (*All*, *Korean Signatures*, *Indigenous Ragi Craft*, *Wok & Broths*, *Handcrafted Sips*).
9. **Interactive Demo Cart**:
   - Slide-out luxury cart drawer with animated item feedback, quantity modifiers, GST computation, and simulated checkout flow.
10. **Table Reservation System**:
    - Intuitive booking modal for party size, seating atmosphere (Indoor Living Room vs. Outdoor Patio), date, and time slot with reference codes.
11. **Integrated Google Maps & Directions**:
    - Custom styled light map viewport centered on `23.3838613, 85.3301628`.
    - One-tap "Get Directions" button to Google Maps listing and direct "Call Cafe" (`tel:+918336070979`).

---

## 📁 Project Structure

```text
/
├── index.html                  # Core semantic entry point
├── css/
│   └── style.css               # 3D perspective, design system, animations, responsive rules
├── js/
│   └── script.js               # Three.js background, 3D tilt, cart, modals, audio synth
├── assets/
│   ├── logo/
│   │   ├── logo.svg            # Primary brand mark
│   │   ├── emblem.svg          # 3D entrance brand badge
│   │   └── favicon.svg         # Favicon
│   ├── images/
│   │   ├── bibimbap.jpg        # Authentic Dolsot Bibimbap
│   │   ├── ramyeon.jpg         # Steaming Korean Ramyeon
│   │   ├── ragi-momos.jpg      # Handcrafted indigenous Ragi momos
│   │   ├── bulgogi.jpg         # Bulgogi chicken bowl
│   │   ├── mandu-soup.jpg      # Mandu dumpling soup
│   │   ├── fried-rice.jpg      # Kimchi fried rice
│   │   ├── iced-tea.jpg        # Handcrafted iced tea
│   │   ├── filter-coffee.jpg   # Artisanal filter coffee
│   │   ├── cafe-exterior.jpg   # Toppo House patio & entrance
│   │   ├── cafe-interior.jpg   # Cozy artistic interior
│   │   └── tribe-tree.jpg      # Tribe Tree indigenous textile craft corner
│   ├── menu/                   # Menu dish images
│   ├── icons/                  # 18 crisp vector SVG icons
│   └── videos/                 # Video placeholder directory
└── README.md                   # Documentation & Vercel deployment guide
```

---

## 💻 How to Run Locally

Because this is a pure static website with no dependencies:

### Option 1: Double-click
Simply open `index.html` in any modern web browser (Chrome, Edge, Safari, Firefox).

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

Using Node (if available):
```bash
npx serve .
```

---

## ☁️ How to Deploy to Vercel

1. Push this folder to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Cafe De Arte 3D Demo"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. **Framework Preset**: Select **"Other"**.
5. **Build & Output Settings**: Leave completely blank / default (No build command, output directory `./`).
6. Click **"Deploy"**.
7. Your high-end 3D demo website is live!

---

## 🔍 Demo vs. Production Integrations

This website is currently configured as a sales demonstration:

| Feature | Demo State (Current) | Production Requirement |
| :--- | :--- | :--- |
| **Online Ordering** | Interactive demo cart with live tally | Connect to Razorpay / UPI Gateway & POS printer |
| **Table Reservation** | Form captures data & generates demo ref code | Connect to WhatsApp Business API or Google Sheets/CRM |
| **Delivery Integration** | Direct CTAs | Embed Swiggy / Zomato order links or direct delivery fleet |
| **Customer Reviews** | Verified Google & Swiggy quotes | Live Google Places API review feed |
