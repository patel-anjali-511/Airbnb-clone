# 🏠 Airbnb Clone — AI Development Prompts (Architecture-Aligned)

This document contains a curated collection of **12 professional AI development prompts** designed to build, run, and scale this Airbnb-clone codebase. Every prompt is structured to align exactly with the system architecture diagram shown below:

```
[FRONTEND React App]                    [BACKEND Express API]             [DATA FILES]
┌────────────────────────┐              ┌────────────────────────┐        ┌──────────────┐
│  App Entry (main.tsx)  │              │     Express Server     │        │ listing.json │
│           │            │              │   (routes /api/...)    │──read──│ gallery.json │
│      API Service       │──fetch(HTTP)─│                        │        │ reviews.json │
│           │            │              │  • /api/listing        │        │  host.json   │
│           ▼            │              │  • /api/gallery        │        │amenities.json│
│     UI Components      │              │  • /api/reviews        │        └──────────────┘
│   (Image Gallery,      │              │  • /api/amenities      │
│    Booking Card,       │              │  • /api/host           │        ┌──────────────┐
│    Host Section,       │              │                        │        │   Images &   │
│    Amenities, etc.)    │              │      Image Server      │─serve──│    Media     │
└────────────────────────┘              └────────────────────────┘        └──────────────┘
```

---

## 📋 Table of Contents

1. [Monorepo Scaffold & Workspace Setup](#1-monorepo-scaffold--workspace-setup)
2. [Express Backend with JSON Data Endpoints](#2-express-backend-with-json-data-endpoints)
3. [Static Image & Media Server Middleware](#3-static-image--media-server-middleware)
4. [Frontend API Service & Data-Fetching Hook](#4-frontend-api-service--data-fetching-hook)
5. [Navbar & Property Header Components](#5-navbar--property-header-components)
6. [Hero Image Gallery Mosaic Component](#6-hero-image-gallery-mosaic-component)
7. [Property Info Component](#7-property-info-component)
8. [Amenities Grid & Show All Modal](#8-amenities-grid--show-all-modal)
9. [Reviews Section & Star Rating Breakdowns](#9-reviews-section--star-rating-breakdowns)
10. [Sticky Booking Card with Interactive Calendar Sync](#10-sticky-booking-card-with-interactive-calendar-sync)
11. [Host Section Component](#11-host-section-component)
12. [Location Section & Footer Components](#12-location-section--footer-components)

---

### 1. Monorepo Scaffold & Workspace Setup
**Category:** Architecture & Tooling

```markdown
You are a senior full-stack engineer. Scaffold a monorepo setup for an Airbnb-clone vacation rental marketplace based on the following project layout:

Tech stack:
  - Client  – React 19 + TypeScript 6, Vite 8, TailwindCSS 4, Framer Motion 12, Lucide React, Axios
  - Server  – Node.js 22, Express 5, TypeScript 6, tsx (watch mode)

Requirements:
  1. Create a root-level package.json with workspaces configured for "client" and "server".
  2. Implement a "dev" script at the root that concurrently starts the Vite dev server for the client and the tsx watch script for the server in a single terminal tab.
  3. Set up a shared base tsconfig configuration that both client and server extend.
  4. Build standard configuration files: .editorconfig, .gitignore, and .env.example showing configuration defaults (like PORT=5000, VITE_API_BASE_URL=http://localhost:5000).

Provide the file templates and a brief explanation of how workspaces share modules or typescript configurations.
```

---

### 2. Express Backend with JSON Data Endpoints
**Category:** Backend API

```markdown
You are building the Express API server that serves static property details. Based on the system architecture, the server must load data directly from JSON files instead of a database.

File structure:
  backend/
    data/
      listing.json
      gallery.json
      reviews.json
      host.json
      amenities.json
    src/
      index.ts
      routes/api.ts

Requirements:
  1. In backend/src/routes/api.ts, create the following GET endpoints:
       - /api/listing   -> Reads and returns listing.json
       - /api/gallery   -> Reads and returns gallery.json
       - /api/reviews   -> Reads and returns reviews.json
       - /api/host      -> Reads and returns host.json
       - /api/amenities -> Reads and returns amenities.json
  2. Use asynchronous file reading (`fs.promises.readFile`) to load the JSON files.
  3. Ensure responses use a uniform envelope format: { success: true, data: [...] }
  4. Type all routes using TypeScript interfaces matching the JSON data structures.
  5. Include simple route-specific error handling that returns a 500 status on file reading failure.

Write the code for backend/src/routes/api.ts and the main backend/src/index.ts file.
```

---

### 3. Static Image & Media Server Middleware
**Category:** Backend API

```markdown
You are implementing the Image Server component of the backend system. The frontend requests listing images that are stored locally inside the backend's directory structure.

Requirements:
  1. Add middleware to the Express server inside backend/src/index.ts to serve static assets (such as room pictures and host avatars) from a public folder or an assets directory.
  2. Set up caching headers (Cache-Control: public, max-age=31536000) for static images to optimize performance.
  3. Create a helper utility or fallback logic that automatically serves a placeholder image if a requested asset path does not exist on disk.
  4. Provide a sample directory layout and explain how images are referenced in listing.json (e.g. url: "/images/hero.webp").

Write the Express file-serving configurations.
```

---

### 4. Frontend API Service & Data-Fetching Hook
**Category:** React Hooks & API Service

```markdown
You are building the API Service and data-fetching hook layer inside the client app to connect to the backend server.

File structure:
  frontend/src/
    services/api.ts   ← Axios client and endpoints definition
    hooks/useFetch.ts ← Hook to handle fetching state, data caching, and loading state

Requirements:
  1. In frontend/src/services/api.ts, configure an Axios instance pointing to the backend API base url (from import.meta.env.VITE_API_BASE_URL).
  2. Write explicit fetcher functions: fetchListing(), fetchGallery(), fetchHost(), fetchAmenities(), fetchReviews().
  3. Implement the custom `useFetch` hook in frontend/src/hooks/useFetch.ts:
       - Generic interface to support different type inputs: useFetch<T>(fetcher: () => Promise<T>)
       - Manage `data` (T | null), `loading` (boolean), and `error` (string | null) state.
       - Abort request on unmount using AbortController.
  4. Expose refetch capability from the hook.

Deliver api.ts and useFetch.ts.
```

---

### 5. Navbar & Property Header Components
**Category:** Frontend UI

```markdown
You are building the Navbar and PropertyHeader UI components for the Airbnb clone.

File requirements:
  1. Navbar component (frontend/src/components/Navbar.tsx):
       - Desktop: Left logo (rose-500 SVG), center search bar (mocked to look like "Anywhere · Any week · Add guests"), right user actions (menu icon + avatar).
       - Mobile: Sticky bottom bar or simplified layout depending on viewport.
       - Transparent state at scroll Y = 0; transitions to white with shadow-sm when scrolled down.
  2. PropertyHeader component (frontend/src/components/PropertyHeader.tsx):
       - Displays listing title, rating (star + score), number of reviews, location details, and action buttons ("Share" / "Save").
       - Data is fed via props matching the `Listing` interface.

Deliver Navbar.tsx and PropertyHeader.tsx styled with TailwindCSS 4.
```

---

### 6. Hero Image Gallery Mosaic Component
**Category:** Frontend UI

```markdown
You are building the ImageGallery component that displays listing pictures as an interactive mosaic.

Current location: frontend/src/components/ImageGallery.tsx
Props:
  images: Photo[]
  onShowAll: () => void
  onShowPhoto: (index: number) => void

Design spec:
  - Desktop: 5-photo grid layout. 1 large photo on the left spanning 2 rows, and 4 smaller photos stacked 2x2 on the right.
  - Mobile: Simple swipeable carousel using standard CSS scroll-snap.
  - Interactive: Hovering over individual photos applies a slight dim overlay and zoom effect. Clicking a photo opens the Lightbox/Photo Tour modal.
  - Include the "Show all photos" floating pill button in the bottom-right corner.

Provide the complete updated code using React 19, TypeScript, and TailwindCSS 4 classes.
```

---

### 7. Property Info Component
**Category:** Frontend UI

```markdown
You are building the PropertyInfo component that displays property room metadata, description, and highlights.

File location: frontend/src/components/PropertyInfo.tsx
Props:
  listing: Listing
  host: Host

Design spec:
  - Displays property details: "[Type] hosted by [Host Name]" along with guest count, bedroom count, bed count, and bath count.
  - Renders the host avatar with a Superhost badge overlay if host.isSuperhost is true.
  - Displays key highlights with icons (e.g. Self Check-in, Dedicated Workspace, Free cancellation).
  - Displays the detailed markdown descriptions (such as property rules and descriptions).
  - Include horizontal rules to separate segments cleanly.

Provide the code for PropertyInfo.tsx styled with TailwindCSS.
```

---

### 8. Amenities Grid & Show All Modal
**Category:** Frontend UI

```markdown
You are building the Amenities component that lists what convenience items are available at the listing.

File location: frontend/src/components/Amenities.tsx
Props:
  amenities: Amenity[]

Requirements:
  1. Show a grid of the first 10 amenities (icon + label) categorized or sorted by highlight.
  2. Any amenity marked as unavailable should display with a strikethrough and muted gray text.
  3. Include a "Show all X amenities" button.
  4. Clicking the button opens a full-screen or large modal displaying all amenities grouped by category (e.g. "Bathroom", "Internet & office", "Outdoor").
  5. Resolve Lucide React icons dynamically by name (e.g. LucideIcons[amenity.icon]).

Deliver the complete code for Amenities.tsx.
```

---

### 9. Reviews Section & Star Rating Breakdowns
**Category:** Frontend UI

```markdown
You are building the Reviews component which visualizes guest feedback ratings and individual review comments.

File location: frontend/src/components/Reviews.tsx
Props:
  reviews: Review[]
  rating: number
  reviewCount: number

Design spec:
  - Show the average rating and total review count in a header.
  - Render progress bars for rating sub-metrics (Cleanliness, Accuracy, Communication, Location, Check-in, Value).
  - Grid of review cards (2 columns on desktop): displaying guest avatar, name, review date, and comment text.
  - Truncate long reviews (more than 3 lines) with a "Read more" toggle button.

Deliver the complete Reviews.tsx with dynamic rendering and animations.
```

---

### 10. Sticky Booking Card with Interactive Calendar Sync
**Category:** Frontend UI

```markdown
You are implementing the sticky BookingCard component alongside the date picker calendar.

File locations:
  frontend/src/components/BookingCard.tsx
  frontend/src/components/FullWidthCalendar.tsx

Requirements:
  1. BookingCard:
       - Displays pricing details (nightly rate, total calculated rate, service fees, and taxes).
       - Sticky placement on the right side of the screen on desktop viewports.
       - Selectable check-in and check-out dates.
  2. FullWidthCalendar:
       - Renders a multi-month calendar view next to the booking card or in the main layout.
       - Synchronizes selected dates with the booking card states.
       - Highlights check-in, checkout, and dates in-between.
       - Disables past dates.

Provide code implementations for both components ensuring state synchronization between checkIn and checkOut dates.
```

---

### 11. Host Section Component
**Category:** Frontend UI

```markdown
You are building the HostSection component that introduces the property host in detail.

File location: frontend/src/components/HostSection.tsx
Props:
  host: Host

Requirements:
  1. Display the host avatar, name, and joined date.
  2. If the host is a Superhost, show a dedicated badge with description explanation.
  3. Render stats: total reviews count, rating score, and response rate/time details.
  4. Render the bio/about text and list of languages spoken.
  5. Add a "Contact Host" interactive button.

Deliver the complete updated HostSection.tsx using React 19.
```

---

### 12. Location Section & Footer Components
**Category:** Frontend UI

```markdown
You are building the LocationSection and Footer components to complete the listing detail page.

File locations:
  frontend/src/components/LocationSection.tsx
  frontend/src/components/Footer.tsx

Requirements:
  1. LocationSection:
       - Renders the address/neighborhood details.
       - Displays a mock map area or embeds a responsive map iframe showing the relative property location coordinate.
       - Displays neighborhood description text.
  2. Footer:
       - Renders links grouped into structured columns (e.g. Support, Community, Hosting, Airbnb).
       - Bottom bar featuring copyright text, basic legal links, and language/currency selectors.

Deliver the implementation code for both components.
```
